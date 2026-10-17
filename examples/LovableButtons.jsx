import { useRef, useState } from "react";
import { LiquidGlassButton, LiquidGlassIconButton } from "@ignisvx/liquid-glass-webgl";
import "@ignisvx/liquid-glass-webgl/styles.css";

const image = "/images/hero.jpg"; // Place a licensed image at public/images/hero.jpg

export default function LovableButtons() {
  const heroRef = useRef(null);
  const [loading, setLoading] = useState(false);

  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "70vh",
        background: `url("${image}") center / cover no-repeat`,
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 18,
        flexWrap: "wrap",
      }}
    >
      <LiquidGlassButton
        href="#contato"
        backgroundImage={image}
        backgroundContainerRef={heroRef}
        variant="frosted"
        size="lg"
      >
        Solicitar orçamento →
      </LiquidGlassButton>

      <LiquidGlassButton
        backgroundImage={image}
        backgroundContainerRef={heroRef}
        variant="tinted"
        tintColor="#6e48ff"
        loading={loading}
        onClick={() => setLoading(true)}
      >
        Testar carregamento
      </LiquidGlassButton>

      <LiquidGlassIconButton
        aria-label="Ir para o início"
        href="#inicio"
        icon={<span aria-hidden="true">↑</span>}
        backgroundImage={image}
        backgroundContainerRef={heroRef}
      />
    </section>
  );
}
