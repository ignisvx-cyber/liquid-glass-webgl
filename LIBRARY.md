# IGNIS Liquid Glass — reusable buttons for React / Lovable

Install straight from GitHub (no npm publication or extra build):

```bash
npm install github:ignisvx-cyber/liquid-glass-webgl
# Or in a Bun-managed Lovable project:
bun add github:ignisvx-cyber/liquid-glass-webgl
```

```jsx
import { LiquidGlassButton, LiquidGlassIconButton, LiquidGlass } from "@ignisvx/liquid-glass-webgl";
import "@ignisvx/liquid-glass-webgl/styles.css";
```

Import the CSS **once** in your app entry or component tree. It provides focus-visible, hover, loading-spinner and reduced-motion styles. Without the CSS, semantic buttons and basic inline styles still render.

## Copy/paste Lovable example

See [examples/LovableButtons.jsx](examples/LovableButtons.jsx). A simple hero CTA:

```jsx
import { useRef } from "react";
import { LiquidGlassButton } from "@ignisvx/liquid-glass-webgl";
import "@ignisvx/liquid-glass-webgl/styles.css";

export default function Hero() {
  const heroRef = useRef(null);
  const image = "/images/hero.jpg"; // Put your licensed image in public/images
  return (
    <section ref={heroRef} style={{
      minHeight: "70vh",
      display: "grid", placeItems: "center",
      background: `url("${image}") center / cover no-repeat`,
      color: "#fff"
    }}>
      <LiquidGlassButton
        href="#contato"
        backgroundImage={image}
        backgroundContainerRef={heroRef}
        variant="frosted"
        size="lg"
      >
        Solicitar orçamento →
      </LiquidGlassButton>
    </section>
  );
}
```

Use `onClick={() => ...}` without `href` for a native button. Use `type="submit"` in forms. When `href` is present it renders an anchor; `target="_blank"` automatically adds `rel="noopener noreferrer"` unless overridden. `disabled` and `loading` prevent activation; a disabled link has its `href` removed. `LiquidGlassIconButton` requires an `aria-label` to be accessible.

## Components

| Component | Purpose |
| --- | --- |
| `LiquidGlass` | Flexible decorative refracting container (original API). Wrap arbitrary content. |
| `LiquidGlassButton` | Semantic button or link, native keyboard behavior and focus, supports glass variants. |
| `LiquidGlassIconButton` | Circular icon button/link; provide `aria-label`. |

### Button props

| Prop | Defaults | Meaning |
| --- | --- | --- |
| `children` | — | Button text/content |
| `href`, `target`, `rel` | — | Use anchor semantics when href is passed |
| `type` | `button` | Native button type (`submit`/`reset` supported) |
| `size` | `md` | `sm`, `md`, `lg` |
| `shape` | `pill` | `pill`, `rounded`, `circle` |
| `variant` | `clear` | `clear`, `frosted`, `tinted` |
| `width`, `height`, `radius` | Per size/shape | Surface dimensions; can override |
| `icon`, `iconPosition` | —, `left` | Icon ReactNode and `left`/`right` placement |
| `disabled`, `loading`, `loadingLabel` | `false`, `false`, `Carregando` | Safe inert state and label |
| `className`, `style` | — | Native button/link styles |
| `glassClassName`, `glassStyle` | — | Outer glass surface styles |
| `backgroundImage`, `backgroundContainerRef` | — | Image texture and matching background container for WebGL |
| Optical props | Preset | `thickness`, `bezel`, `ior`, `blur`, `specular`, `tint`, `tintColor`, `shadow`, `followPointer` |
| `onError` | — | Called when image/WebGL fails (CSS fallback remains visible) |

Other standard DOM props such as `aria-label`, `id`, `title`, `onClick` are forwarded to the native interactive element. Both buttons support React `ref`.

### Original LiquidGlass API

`LiquidGlass` also accepts `children`, `backgroundImage`, `backgroundContainerRef`, `width` (default 280), `height` (default 80), `radius` (32), `thickness` (50), `bezel` (40), `ior` (1.5), `blur` (1.5), `specular` (0.55), `tint` (0.08), `tintColor` (#ffffff), `shadow` (0.5), `followPointer` (true), `onError`, `style` and `className`.

## Important rendering limitations

- **This is image-texture refraction, not DOM capture.** The WebGL shader samples `backgroundImage`, not live HTML, videos, gradients or animated DOM behind the button.
- For correct refraction, place the button within an area styled with exactly the **same image** using `background-size: cover; background-position: center`; pass that area's ref via `backgroundContainerRef`. A CORS-enabled image URL is required; serving it from the same project's `public/` directory is simplest.
- On complex live backgrounds without a matching image, **omit `backgroundImage`** and use the CSS glass fallback. Never promise live video/text refraction.
- Each independent WebGL surface uses a GPU context and its own image texture. Prefer **one LiquidGlass surface around a multi-item floating navigation**, rather than many separate WebGL contexts. Validate mobile performance for several simultaneous buttons.
- WebGL renders on resize/scroll/pointer/prop changes, not continuously. DPR is limited to 2. Server rendering works without WebGL. The fallback uses `backdrop-filter`.
- CSS hover uses `:has()` in modern browsers; older browsers keep functional controls without this optional animation.
- `style` is for the semantic control and `glassStyle` is for its outer surface. Do not use an opaque `glassStyle.background` if you want the actual WebGL texture to show.
- `styles.css` exposes `--ignis-lg-focus` to customize keyboard focus color.

## Verification

```bash
npm install
npm run check
npm test
npm pack --dry-run
```

GitHub Actions runs these steps for commits on `main` and for pull requests. CI currently covers Node/SSR, package structure and GLSL source checks; it **does not** certify pixel-perfect browser appearance. Test the visual result on an actual Lovable site.

Code is MIT-derived from [Archis Vaze](https://github.com/archisvaze/liquid-glass), copyright (c) 2026 Archis Vaze (see LICENSE). Background photos are separately licensed. No npm registry publication is required; install from GitHub.
