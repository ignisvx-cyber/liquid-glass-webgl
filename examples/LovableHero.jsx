import { useRef } from "react";
import { LiquidGlass } from "@ignisvx/liquid-glass-webgl";

const heroImage = "/images/hero.jpg"; // Put your own licensed image in public/images/

export default function LovableHero() {
  const heroRef = useRef(null);
  return (
    <section
      ref={heroRef}
      style={{
        minHeight: "70vh",
        backgroundImage: `url("${heroImage}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LiquidGlass
        backgroundImage={heroImage}
        backgroundContainerRef={heroRef}
        width={280}
        height={76}
        radius={38}
        thickness={50}
        bezel={32}
        ior={1.5}
        blur={1.5}
        specular={0.65}
        tint={0.08}
        tintColor="#ffffff"
      >
        <a href="#contato" style={{ color: "#fff", fontWeight: 700, textDecoration: "none" }}>
          Solicitar orçamento →
        </a>
      </LiquidGlass>
    </section>
  );
}
