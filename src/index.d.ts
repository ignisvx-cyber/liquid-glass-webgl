import type * as React from "react";

export interface LiquidGlassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError"> {
  /** Texture for real refraction; must match the parent's cover/center CSS image. */
  backgroundImage?: string;
  backgroundContainerRef?: React.RefObject<HTMLElement | null>;
  width?: number | string;
  height?: number | string;
  radius?: number;
  thickness?: number;
  bezel?: number;
  ior?: number;
  blur?: number;
  specular?: number;
  tint?: number;
  tintColor?: string;
  shadow?: number;
  followPointer?: boolean;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
}
export declare function LiquidGlass(props: LiquidGlassProps): React.ReactElement;

export type LiquidGlassSize = "sm" | "md" | "lg";
export type LiquidGlassShape = "pill" | "rounded" | "circle";
export type LiquidGlassVariant = "clear" | "frosted" | "tinted";

/** Native button, or anchor when href is set. React/Vite clients import styles.css once. */
export interface LiquidGlassButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, "onError" | "color"> {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  size?: LiquidGlassSize;
  shape?: LiquidGlassShape;
  variant?: LiquidGlassVariant;
  width?: number | string;
  height?: number | string;
  radius?: number;
  backgroundImage?: string;
  backgroundContainerRef?: React.RefObject<HTMLElement | null>;
  thickness?: number;
  bezel?: number;
  ior?: number;
  blur?: number;
  specular?: number;
  tint?: number;
  tintColor?: string;
  shadow?: number;
  followPointer?: boolean;
  onError?: (error: Error) => void;
  /** Class and style of the semantic native <button> / <a>. */
  className?: string;
  style?: React.CSSProperties;
  /** Optional separate class and style of the outer glass surface. */
  glassClassName?: string;
  glassStyle?: React.CSSProperties;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  loadingLabel?: string;
  tabIndex?: number;
}
export declare const LiquidGlassButton: React.ForwardRefExoticComponent<LiquidGlassButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;

export interface LiquidGlassIconButtonProps extends Omit<LiquidGlassButtonProps, "shape"> {
  "aria-label": string;
}
export declare const LiquidGlassIconButton: React.ForwardRefExoticComponent<LiquidGlassIconButtonProps & React.RefAttributes<HTMLButtonElement | HTMLAnchorElement>>;
