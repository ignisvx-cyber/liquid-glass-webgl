import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { vertexShader, fragmentShader } from "../src/shaders.js";
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));

test("library exports a direct ES module entry without a build step", () => {
  assert.equal(pkg.type, "module");
  assert.equal(pkg.exports["."].import, "./src/index.js");
  assert.equal(pkg.peerDependencies.react, ">=18 <20");
});
test("original refractive surface features are still in GLSL shader", () => {
  for (const keyword of [
    "sdRoundedRect", "surfaceHeight", "sampleBgBlurred",
    "uThickness", "uIOR", "uSpecular", "uBgTex", "uCanvasOrigin",
    "uBgRectOrigin", "uLightDir", "uTintColor"
  ]) assert.ok(fragmentShader.includes(keyword), `Missing ${keyword}`);
  assert.ok(vertexShader.includes("aPosition"));
});
