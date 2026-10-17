# Reusable Liquid Glass component for React / Lovable

This repository is now an **installable React library**, not just a static demo. It provides a `<LiquidGlass />` component with the original project's physically inspired GLSL refraction and a CSS fallback. No webpack, Vite library build step, Three.js, or npm publishing is necessary.

## Install in any Lovable / Vite React project

```bash
npm install github:ignisvx-cyber/liquid-glass-webgl
```

Or tell Lovable:

> Install the public GitHub dependency `github:ignisvx-cyber/liquid-glass-webgl`. Import `LiquidGlass` from `@ignisvx/liquid-glass-webgl`. Use the same licensed background image for both the hero section (`background-size: cover; background-position: center`) and the component's `backgroundImage` prop. Follow the example in `examples/LovableHero.jsx`. Apply it only to the floating CTAs/navigation I name. Preserve the shader-based refraction (don't replace it with plain CSS blur), with a CSS fallback. Do not redesign the site.

## Usage

```jsx
import { useRef } from "react";
import { LiquidGlass } from "@ignisvx/liquid-glass-webgl";

function Hero() {
  const backgroundRef = useRef(null);
  const image = "/images/hero.jpg";

  return (
    <section
      ref={backgroundRef}
      style={{
        minHeight: "65vh",
        background: `url("${image}") center / cover no-repeat`,
        display: "grid", placeItems: "center"
      }}
    >
      <LiquidGlass
        backgroundImage={image}
        backgroundContainerRef={backgroundRef}
        width={260}
        height={72}
        radius={36}
        ior={1.5}
        thickness={50}
        bezel={32}
        specular={0.55}
        tint={0.08}
      >
        <span>Entre em contato →</span>
      </LiquidGlass>
    </section>
  );
}
```

See `examples/LovableHero.jsx` for a complete example.

## API

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `backgroundImage` | string | none | Required for real WebGL refraction; URL must be accessible with CORS |
| `backgroundContainerRef` | React ref | parent element | Parent background area to align sampling |
| `width`, `height` | CSS size | 280, 80 | Glass dimensions |
| `radius` | number | 32 | Corner radius in px |
| `thickness` | number | 50 | Optical glass thickness |
| `bezel` | number | 40 | Refracting edge thickness |
| `ior` | number | 1.5 | Index of refraction |
| `blur` | number | 1.5 | Texture sample blur |
| `specular` | number (0–1) | 0.55 | Highlights |
| `tint`, `tintColor` | number, hex | 0.08, #ffffff | Glass coloring |
| `shadow` | number (0–1) | 0.5 | Shadow strength |
| `followPointer` | boolean | true | Moving light highlight |
| `children` | ReactNode | none | Interactive content above the glass |
| `onError` | function(Error) | none | Detect load/WebGL failures |

Other common React div props (e.g. `onClick`, `className`, `style`) also work.

## Important limitations

- This is the **WebGL effect derived from Archis Vaze**, not Apple's proprietary native material.
- Shader refraction samples an **image texture**, **not arbitrary underlying HTML, video, gradients, or changing DOM**. For correct alignment, use the same image with `background-size: cover; background-position: center` on the container indicated by `backgroundContainerRef`.
- If no image is supplied, WebGL is unavailable, or image loading fails (including cross-origin restrictions), a simpler accessible CSS glass fallback renders instead.
- The compositor renders only on image loading, resize, scroll, hover and prop changes, not continuously. DPR is capped at 2. It does not run on a server.
- Image licensing is separate from the MIT software license. Use your own properly licensed background images on commercial sites.
- This package uses ESM/React and **does not require Three.js**: the original GLSL shader is run directly on WebGL 1.

## Origin / credits

Shader adapted from [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass) by Archis Vaze (MIT License, copyright 2026). Original demos are retained under `index.html` (SVG) and `webgl.html` (Three.js). `LICENSE` includes the original notice.

This repository is installed straight from GitHub; it is **not** published to the npm registry.
