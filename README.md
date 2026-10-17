# IGNIS Liquid Glass — React button library + original WebGL demo

Reusable Liquid Glass **buttons, links and icon buttons** for Lovable / React. Install directly from this public GitHub repository (no npm publication required):

```bash
npm install github:ignisvx-cyber/liquid-glass-webgl
# Lovable / Bun projects:
bun add github:ignisvx-cyber/liquid-glass-webgl
```

```jsx
import { LiquidGlassButton, LiquidGlassIconButton, LiquidGlass } from "@ignisvx/liquid-glass-webgl";
import "@ignisvx/liquid-glass-webgl/styles.css";
```

- **[Installation, API, limitations & examples → LIBRARY.md](LIBRARY.md)**
- **[Copy/paste prompt for Lovable → LOVABLE.md](LOVABLE.md)**
- **[Example page with buttons → examples/LovableButtons.jsx](examples/LovableButtons.jsx)**
- **[Original configurable LiquidGlass hero example → examples/LovableHero.jsx](examples/LovableHero.jsx)**

**Important:** Real GLSL refraction samples a matching **static background image**. It cannot refract arbitrary live DOM, gradients or video behind the button. The CSS fallback is automatic when an image/WebGL is unavailable. Native button/link semantics and accessible focus are preserved.

## Original demo

Original project: [Archis Vaze's liquid-glass](https://github.com/archisvaze/liquid-glass) (MIT). The original SVG and Three.js WebGL demos remain under `index.html` and `webgl.html`.

[**Live original demo → liquid-glass-eta.vercel.app**](https://liquid-glass-eta.vercel.app/)

This React package uses a standalone WebGL 1 renderer (no Three.js runtime dependency). Its extra React button components, stylesheet and package metadata are maintained here. Code is MIT; example background photos have separate rights. See LICENSE.

## Quality checks

```bash
npm install
npm run check
npm test
npm pack --dry-run
```

GitHub Actions runs these checks on push and PR. Visual/browser integration needs to be validated in your Lovable project.
