# React Library Integration (Lovable)

This repository contains both the original Archis Vaze WebGL/SVG demos and **an installable React component**.

## Direct installation

```bash
npm install github:ignisvx-cyber/liquid-glass-webgl
```

Then:

```jsx
import { LiquidGlass } from "@ignisvx/liquid-glass-webgl";
```

Consult [LIBRARY.md](./LIBRARY.md) for the complete API and [examples/LovableHero.jsx](./examples/LovableHero.jsx) for a working integration pattern.

## Prompt for Lovable

> Install my public GitHub dependency `github:ignisvx-cyber/liquid-glass-webgl` and import `LiquidGlass` from `@ignisvx/liquid-glass-webgl`. Use `examples/LovableHero.jsx` as a reference. Apply realistic refractive Liquid Glass to the CTA button and floating navigation of this website, matching the backdrop hero image to the `backgroundImage` prop. Keep the source GLSL shader effect, the CSS fallback, and the site's existing visual design. Do not replace the effect with a basic backdrop-filter.

### How it works

- Native WebGL1 renderer with optical refraction adapted from Archis Vaze's original GLSL shader.
- **No additional Three.js runtime dependency** in the React package.
- React 18/19 compatible, TypeScript definitions provided, no package build step.
- Browser compatibility: modern browsers with WebGL, CSS fallback if WebGL fails.
- **Limitation:** accurately refracts a matched *image texture*, not arbitrary animated or live DOM behind the element.
- The original demo in `webgl.html` still uses Three.js and has not been modified.

### Licenses

Code: MIT © 2026 Archis Vaze, included in `LICENSE`. The example background photos are separate and are not automatically licensed for your projects.
