# IGNIS Liquid Glass buttons — Lovable integration

This repository is a public, installable ESM React 18/19 library.

```bash
bun add github:ignisvx-cyber/liquid-glass-webgl
```

```jsx
import { LiquidGlassButton, LiquidGlassIconButton, LiquidGlass } from "@ignisvx/liquid-glass-webgl";
import "@ignisvx/liquid-glass-webgl/styles.css";
```

## Prompt to paste into Lovable

> Instale a dependência pública do GitHub `github:ignisvx-cyber/liquid-glass-webgl`. Importe `LiquidGlassButton` e/ou `LiquidGlassIconButton` de `@ignisvx/liquid-glass-webgl` e importe uma vez `@ignisvx/liquid-glass-webgl/styles.css`. Consulte `LIBRARY.md` e `examples/LovableButtons.jsx`. Aplique o estilo aos CTAs indicados, preservando o layout, links, acessibilidade e marca. Para refração WebGL real, use a mesma imagem do hero com cover/center e informe `backgroundImage` e `backgroundContainerRef`. Se o fundo for vídeo, gradiente, HTML dinâmico ou a imagem não puder ser carregada, use o fallback CSS sem afirmar que há refração real do DOM. Não recrie a biblioteca e não substitua seu shader WebGL por um simples blur quando houver imagem compatível. Execute build e verifique desktop/mobile e cliques.

## Components & requirements

- `LiquidGlassButton`: native button by default; anchor when `href` is provided. Size sm/md/lg, shape pill/rounded/circle, variants clear/frosted/tinted, loading and disabled.
- `LiquidGlassIconButton`: circular icon action (always provide an accessible `aria-label`).
- `LiquidGlass`: configurable low-level refractive container.
- CSS import provides focus-visible, hover, loading and reduced-motion behavior.
- Existing demo HTML/SVG/WebGL files remain untouched.
- React 18/19; no Three.js runtime dependency; WebGL 1; CSS fallback. Images must be properly licensed and CORS-readable.

Reference: [LIBRARY.md](LIBRARY.md).
