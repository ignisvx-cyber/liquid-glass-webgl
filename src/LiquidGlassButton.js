import React from "react";
import { LiquidGlass } from "./LiquidGlass.js";

const SIZES = Object.freeze({
  sm: { width: 148, height: 44, fontSize: 13 },
  md: { width: 196, height: 56, fontSize: 15 },
  lg: { width: 246, height: 68, fontSize: 17 },
});

const VARIANTS = Object.freeze({
  clear: { tint: 0.06, blur: 0.75, specular: 0.65 },
  frosted: { tint: 0.16, blur: 1.5, specular: 0.55 },
  tinted: { tint: 0.32, blur: 1.5, specular: 0.55 },
});

/**
 * Native button (or link when href is provided) inside a LiquidGlass surface.
 * Import @ignisvx/liquid-glass-webgl/styles.css for hover/focus/loading styles.
 * WebGL only refracts the supplied matching backgroundImage, never arbitrary DOM.
 */
export const LiquidGlassButton = React.forwardRef(function LiquidGlassButton({
  children,
  icon,
  iconPosition = "left",
  size = "md",
  shape = "pill",
  variant = "clear",
  width,
  height,
  radius,
  className = "",
  style,
  glassClassName = "",
  glassStyle,
  href,
  target,
  rel,
  type = "button",
  disabled = false,
  loading = false,
  loadingLabel = "Carregando",
  backgroundImage,
  backgroundContainerRef,
  thickness,
  bezel,
  ior,
  blur,
  specular,
  tint,
  tintColor,
  shadow,
  followPointer,
  onError,
  onClick,
  tabIndex,
  ...controlProps
}, ref) {
  const dimensions = SIZES[size] || SIZES.md;
  const optical = VARIANTS[variant] || VARIANTS.clear;
  const isCircle = shape === "circle";
  const buttonHeight = height ?? dimensions.height;
  const buttonWidth = width ?? (isCircle ? buttonHeight : dimensions.width);
  const numericHeight = typeof buttonHeight === "number" ? buttonHeight : dimensions.height;
  const buttonRadius = radius ?? (shape === "rounded" ? Math.min(18, numericHeight / 3) : numericHeight / 2);
  const inactive = Boolean(disabled || loading);
  const isLink = typeof href === "string";
  const tag = isLink ? "a" : "button";
  const userLabel = controlProps["aria-label"];

  const controlStyle = {
    appearance: "none",
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.55em",
    width: "100%",
    height: "100%",
    padding: isCircle ? 0 : "0 14px",
    margin: 0,
    border: 0,
    borderRadius: "inherit",
    background: "transparent",
    color: "inherit",
    font: "inherit",
    fontSize: dimensions.fontSize,
    fontWeight: 650,
    lineHeight: 1.2,
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: inactive ? "not-allowed" : "pointer",
    opacity: inactive ? 0.6 : 1,
    ...style,
  };

  const handleClick = (event) => {
    if (inactive) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  const nativeProps = {
    ...controlProps,
    ref,
    className: ["ignis-lg-control", className].filter(Boolean).join(" "),
    style: controlStyle,
    onClick: handleClick,
    tabIndex: isLink && inactive ? -1 : tabIndex,
    "aria-busy": loading || undefined,
    "aria-disabled": isLink && inactive ? true : undefined,
    "data-variant": variant,
    "data-shape": shape,
  };

  if (isLink) {
    nativeProps.href = inactive ? undefined : href;
    nativeProps.target = target;
    nativeProps.rel = rel || (target === "_blank" ? "noopener noreferrer" : undefined);
  } else {
    nativeProps.type = type;
    nativeProps.disabled = inactive;
  }

  const content = React.createElement(
    tag,
    nativeProps,
    loading && React.createElement("span", { className: "ignis-lg-spinner", "aria-hidden": "true" }),
    !loading && icon && iconPosition !== "right" && React.createElement("span", { className: "ignis-lg-icon", "aria-hidden": "true" }, icon),
    isCircle
      ? (loading ? React.createElement("span", { className: "ignis-lg-sr-only" }, loadingLabel) : children)
      : React.createElement("span", { className: "ignis-lg-label" }, loading ? loadingLabel : children),
    !loading && icon && iconPosition === "right" && React.createElement("span", { className: "ignis-lg-icon", "aria-hidden": "true" }, icon)
  );

  // The native element receives interaction, not the surrounding glass div.
  // This avoids nesting buttons and preserves normal keyboard behavior.
  return React.createElement(
    LiquidGlass,
    {
      backgroundImage,
      backgroundContainerRef,
      width: buttonWidth,
      height: buttonHeight,
      radius: buttonRadius,
      thickness,
      bezel,
      ior,
      blur: blur ?? optical.blur,
      specular: specular ?? optical.specular,
      tint: tint ?? optical.tint,
      tintColor,
      shadow,
      followPointer,
      onError,
      className: ["ignis-lg-surface", glassClassName].filter(Boolean).join(" "),
      style: glassStyle,
    },
    content
  );
});
LiquidGlassButton.displayName = "LiquidGlassButton";

/** A convenient circular button with an accessible name required by TypeScript. */
export const LiquidGlassIconButton = React.forwardRef(function LiquidGlassIconButton(props, ref) {
  return React.createElement(LiquidGlassButton, {
    ...props,
    shape: "circle",
    ref,
  });
});
LiquidGlassIconButton.displayName = "LiquidGlassIconButton";
