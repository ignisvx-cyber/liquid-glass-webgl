import { vertexShader, fragmentShader } from "./shaders.js";

// Small WebGL 1 renderer, using the original Archis Vaze refraction shader.
// No global THREE dependency and no bundler-specific imports.
function compile(gl, kind, source) {
  const shader = gl.createShader(kind);
  if (!shader) throw new Error("Unable to allocate WebGL shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader) || "Shader compilation failed";
    gl.deleteShader(shader);
    throw new Error(error);
  }
  return shader;
}

function toRgb(value) {
  const clean = String(value || "#ffffff").trim().replace(/^#/, "");
  const hex = clean.length === 3 ? clean.split("").map((x) => x + x).join("") : clean;
  if (!/^[a-fA-F0-9]{6}$/.test(hex)) return [1, 1, 1];
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
}

export function createGlassRenderer(canvas, source, onReady, onError) {
  const gl = canvas.getContext("webgl", { alpha: true, antialias: true, premultipliedAlpha: false });
  if (!gl) throw new Error("WebGL is unavailable. CSS fallback will be used.");

  let vertex, fragment, program, buffer, texture;
  let disposed = false;
  let imageReady = false;
  let bgAspect = 1;
  let image;
  let contextLost = false;

  const onContextLost = (event) => {
    event.preventDefault();
    contextLost = true;
    onError?.(new Error("WebGL context lost"));
  };

  canvas.addEventListener("webglcontextlost", onContextLost);

  try {
    vertex = compile(gl, gl.VERTEX_SHADER, vertexShader);
    fragment = compile(gl, gl.FRAGMENT_SHADER, fragmentShader);
    program = gl.createProgram();
    if (!program) throw new Error("Unable to create WebGL program");
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "WebGL program link failed");
    }

    buffer = gl.createBuffer();
    if (!buffer) throw new Error("Unable to create WebGL vertex buffer");
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);

    gl.useProgram(program);
    const position = gl.getAttribLocation(program, "aPosition");
    if (position < 0) throw new Error("WebGL position attribute unavailable");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    texture = gl.createTexture();
    if (!texture) throw new Error("Unable to allocate WebGL texture");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0,0,0,0]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(gl.getUniformLocation(program, "uBgTex"), 0);
  } catch (error) {
    canvas.removeEventListener("webglcontextlost", onContextLost);
    if (buffer) gl.deleteBuffer(buffer);
    if (texture) gl.deleteTexture(texture);
    if (program) gl.deleteProgram(program);
    if (vertex) gl.deleteShader(vertex);
    if (fragment) gl.deleteShader(fragment);
    throw error;
  }

  const uniform = {};
  for (const name of [
    "uResolution", "uCanvasOrigin", "uBgRectOrigin", "uBgRectSize",
    "uGlassCenter", "uGlassSize", "uLightDir", "uTintColor",
    "uRadius", "uBezel", "uThickness", "uIOR", "uBlur",
    "uSpecular", "uTint", "uShadow", "uBgAspect"
  ]) uniform[name] = gl.getUniformLocation(program, name);

  image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    if (disposed || contextLost) return;
    try {
      bgAspect = image.naturalWidth / image.naturalHeight;
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
      imageReady = true;
      onReady?.();
    } catch (error) {
      onError?.(error);
    }
  };
  image.onerror = () => { if (!disposed) onError?.(new Error("Background image unavailable or blocked by CORS")); };
  image.src = source;

  function draw(params) {
    if (disposed || contextLost || !imageReady) return;
    const { glassRect, backgroundRect, dpr, radius, thickness, bezel, ior, blur, specular, tint, tintColor, shadow, lightX, lightY } = params;
    if (!glassRect.width || !glassRect.height || !backgroundRect.width || !backgroundRect.height) return;

    const w = Math.max(1, Math.round(glassRect.width * dpr));
    const h = Math.max(1, Math.round(glassRect.height * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    gl.uniform2f(uniform.uResolution, glassRect.width, glassRect.height);
    gl.uniform2f(uniform.uCanvasOrigin, glassRect.left, glassRect.top);
    gl.uniform2f(uniform.uBgRectOrigin, backgroundRect.left, backgroundRect.top);
    gl.uniform2f(uniform.uBgRectSize, backgroundRect.width, backgroundRect.height);
    gl.uniform2f(uniform.uGlassCenter, glassRect.width / 2, glassRect.height / 2);
    gl.uniform2f(uniform.uGlassSize, glassRect.width, glassRect.height);
    gl.uniform2f(uniform.uLightDir, lightX, lightY);
    gl.uniform3fv(uniform.uTintColor, new Float32Array(toRgb(tintColor)));
    gl.uniform1f(uniform.uRadius, Math.min(Math.max(2, radius), glassRect.width / 2, glassRect.height / 2));
    gl.uniform1f(uniform.uBezel, Math.max(2, bezel));
    gl.uniform1f(uniform.uThickness, Math.max(0, thickness));
    gl.uniform1f(uniform.uIOR, Math.max(1, ior));
    gl.uniform1f(uniform.uBlur, Math.max(0, blur));
    gl.uniform1f(uniform.uSpecular, Math.max(0, Math.min(1, specular)));
    gl.uniform1f(uniform.uTint, Math.max(0, Math.min(1, tint)));
    gl.uniform1f(uniform.uShadow, Math.max(0, Math.min(1, shadow)));
    gl.uniform1f(uniform.uBgAspect, bgAspect);

    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    image.onload = null;
    image.onerror = null;
    image.src = "";
    canvas.removeEventListener("webglcontextlost", onContextLost);
    if (!contextLost) {
      if (texture) gl.deleteTexture(texture);
      if (buffer) gl.deleteBuffer(buffer);
      if (program) gl.deleteProgram(program);
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
    }
  }

  return { draw, dispose };
}
