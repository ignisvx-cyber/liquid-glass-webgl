# Integração Liquid Glass com Lovable (React)

Este repositório é uma cópia do projeto [archisvaze/liquid-glass](https://github.com/archisvaze/liquid-glass), originalmente criado por **Archis Vaze** e distribuído sob a licença MIT (veja `LICENSE`). O código de efeito (SVG e WebGL) foi preservado.

## Demonstração

- `index.html`: versão SVG com `feDisplacementMap` e `backdrop-filter`. A refração avançada funciona principalmente em navegadores Chromium.
- `webgl.html`: versão WebGL / Three.js com shader de refração. Funciona nos principais navegadores com WebGL.
- `ui.js`: controles e interações; `bg-picker.js`: seletor de planos de fundo; `index.css`: estilos.

Para visualizar localmente, sirva a pasta por HTTP, por exemplo `python -m http.server 8000`, e abra `http://localhost:8000/webgl.html`. Algumas funcionalidades não funcionam corretamente com `file://`.

## Uso em projetos Lovable

Este projeto original é composto por HTML, CSS e JavaScript; **não é um componente React pronto**. Para integrá-lo em um projeto Lovable React/Tailwind:

1. Use `webgl.html` como referência do shader e da configuração de cena Three.js.
2. Implemente um componente `LiquidGlass` React, com propriedades para largura, altura, raio, IOR, espessura, desfoque, brilho e cor.
3. Crie e descarte corretamente recursos WebGL dentro de hooks React (resize, cleanup, cancelamento da renderização) e carregue o Three.js como dependência npm em vez de depender de um CDN global.
4. A versão original refrata uma **textura de imagem de fundo**, não elementos HTML arbitrários que estejam atrás dela. Não prometa refração de DOM ao integrar, sem implementar uma estratégia adicional de captura/composição.
5. Adicione uma alternativa CSS para aparelhos com WebGL desativado ou reduzida capacidade gráfica, respeitando `prefers-reduced-motion`.

**Prompt sugerido:** "Utilize o código WebGL de https://github.com/ignisvx-cyber/liquid-glass-webgl como referência. Implemente o shader de refração em um componente React reutilizável com Three.js, preserve controles visuais e ofereça fallback de desempenho. Não substitua o shader por simples glassmorphism, nem afirme que WebGL automaticamente refrata qualquer HTML atrás do componente."

## Notas sobre esta cópia

- Os arquivos originais do efeito foram copiados da fonte; o autor e os avisos de copyright foram preservados.
- A foto de exemplo `backgrounds/image2.jpg` excede o limite de transferência da integração usada nesta cópia. Por isso, somente ela é carregada diretamente de `raw.githubusercontent.com/archisvaze/liquid-glass` pelo `bg-picker.js`. A página depende de conexão à internet para esse exemplo. Substitua o link pela sua própria imagem se preferir não depender dessa URL.
- **As imagens fotográficas de `backgrounds/` não estão cobertas pela licença MIT do código.** Confira as condições de uso de cada foto e substitua-as por imagens licenciadas para o seu projeto antes de distribuir comercialmente.
