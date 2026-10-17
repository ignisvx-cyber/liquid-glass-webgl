import React, { useEffect, useRef, useState } from "react";
import { createGlassRenderer } from "./gl.js";

/**
 * A reusable iOS-inspired WebGL refractive glass surface.
 *
 * IMPORTANT: this samples backgroundImage as a GPU texture, not the DOM.
 * Set the SAME image as CSS background-image on backgroundContainerRef's element,
 * with background-size: cover and background-position: center.
 */
export function LiquidGlass({
  backgroundImage,
  backgroundContainerRef,
  width = 280,
  height = 80,
  radius = 32,
  thickness = 50,
  bezel = 40,
  ior = 1.5,
  blur = 1.5,
  specular = 0.55,
  tint = 0.08,
  tintColor = "#ffffff",
  shadow = 0.5,
  followPointer = true,
  className,
  style,
  children,
  onError,
  onPointerMove,
  onPointerLeave,
  ...rest
}) {
  const outerRef = useRef(null);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const scheduleDrawRef = useRef(() => {});
  const lightRef = useRef({ x: 0.5, y: -0.7 });
  const errorCallbackRef = useRef(onError);
  const [active, setActive] = useState(false);

  errorCallbackRef.current = onError;
  const paramsRef = useRef({});
  paramsRef.current = { radius, thickness, bezel, ior, blur, specular, tint, tintColor, shadow };

  useEffect(() => {
    if (typeof window === "undefined" || !backgroundImage) {
      setActive(false);
      return;
    }
    const wrapper = outerRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    let frame = 0;
    let disposed = false;
    let renderer = null;
    let observer = null;

    const draw = () => {
      frame = 0;
      if (disposed || !renderer) return;
      const bg = backgroundContainerRef?.current || wrapper.parentElement || document.documentElement;
      const glassRect = wrapper.getBoundingClientRect();
      const backgroundRect = bg.getBoundingClientRect();
      renderer.draw({
        glassRect, backgroundRect,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
        ...paramsRef.current,
        lightX: lightRef.current.x,
        lightY: lightRef.current.y,
      });
    };

    const scheduleDraw = () => {
      if (!disposed && !frame) frame = window.requestAnimationFrame(draw);
    };
    scheduleDrawRef.current = scheduleDraw;

    try {
      renderer = createGlassRenderer(
        canvas,
        backgroundImage,
        () => {
          if (disposed) return;
          rendererRef.current = renderer;
          setActive(true);
          scheduleDraw();
        },
        (error) => {
          if (disposed) return;
          setActive(false);
          errorCallbackRef.current?.(error instanceof Error ? error : new Error(String(error)));
        }
      );
      rendererRef.current = renderer;
    } catch (error) {
      setActive(false);
      errorCallbackRef.current?.(error instanceof Error ? error : new Error(String(error)));
    }

    if (typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(scheduleDraw);
      observer.observe(wrapper);
      const bg = backgroundContainerRef?.current || wrapper.parentElement;
      if (bg && bg !== wrapper) observer.observe(bg);
    }
    window.addEventListener("resize", scheduleDraw, { passive: true });
    window.addEventListener("scroll", scheduleDraw, true);
    scheduleDraw();

    return () => {
      disposed = true;
      window.removeEventListener("resize", scheduleDraw);
      window.removeEventListener("scroll", scheduleDraw, true);
      observer?.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
      renderer?.dispose();
      rendererRef.current = null;
      scheduleDrawRef.current = () => {};
    };
  }, [backgroundImage, backgroundContainerRef]);

  useEffect(() => { scheduleDrawRef.current(); }, [
    radius, thickness, bezel, ior, blur, specular, tint, tintColor, shadow, width, height
  ]);

  const handlePointerMove = (event) => {
    if (followPointer) {
      const rect = event.currentTarget.getBoundingClientRect();
      if (rect.width && rect.height) {
        lightRef.current = {
          x: ((event.clientX - rect.left) / rect.width - 0.5) * 1.6 + 0.5,
          y: -(((event.clientY - rect.top) / rect.height - 0.5) * 1.6 + 0.7),
        };
        scheduleDrawRef.current();
      }
    }
    onPointerMove?.(event);
  };

  const handlePointerLeave = (event) => {
    lightRef.current = { x: 0.5, y: -0.7 };
    scheduleDrawRef.current();
    onPointerLeave?.(event);
  };

  const clampedShadow = Math.max(0, Math.min(1, shadow));
  return React.createElement(
    "div",
    {
      ...rest,
      ref: outerRef,
      className,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      style: {
        boxSizing: "border-box",
        position: "relative",
        width,
        height,
        display: "inline-flex",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
        borderRadius: radius,
        isolation: "isolate",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.35)",
        boxShadow: `0 ${Math.round(8 + clampedShadow * 15)}px ${Math.round(22 + clampedShadow * 30)}px rgba(0,0,0,${(clampedShadow * 0.28).toFixed(3)})`,
        backgroundColor: active ? "transparent" : "rgba(255,255,255,0.16)",
        backdropFilter: active ? "none" : "blur(16px) saturate(1.3)",
        WebkitBackdropFilter: active ? "none" : "blur(16px) saturate(1.3)",
        color: "inherit",
        ...style,
      },
    },
    React.createElement("canvas", {
      ref: canvasRef,
      "aria-hidden": "true",
      style: {
        display: active ? "block" : "none",
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        borderRadius: "inherit",
      },
    }),
    React.createElement("div", {
      style: {
        position: "relative",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        minWidth: 0,
        minHeight: 0,
      },
    }, children)
  );
}
