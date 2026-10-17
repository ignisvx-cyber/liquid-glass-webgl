import type * as React from "react";

export interface LiquidGlassProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onError"> {
  /** Image URL used as a GPU texture for refraction. Must match the parent CSS background image. */
  backgroundImage?: string;
  /** Element with matching background-size: cover and background-position: center. Defaults to the direct parent. */
  backgroundContainerRef?: React.RefObject<HTMLElement | null>;
  width?: number | string;
  height?: number | string;
  radius?: number;
  thickness?: number;
  bezel?: number;
  /** Index of refraction, typically 1.3-2.0. */
  ior?: number;
  blur?: number;
  /** Strength from 0 to 1. */
  specular?: number;
  /** Tint opacity from 0 to 1. */
  tint?: number;
  /** Hexadecimal RGB color, e.g. #ffffff or #def. */
  tintColor?: string;
  /** Shadow intensity from 0 to 1. */
  shadow?: number;
  followPointer?: boolean;
  onError?: (error: Error) => void;
  children?: React.ReactNode;
}

export declare function LiquidGlass(props: LiquidGlassProps): React.ReactElement;
