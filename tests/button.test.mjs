import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LiquidGlass, LiquidGlassButton, LiquidGlassIconButton } from "../src/index.js";

const render = (component) => renderToStaticMarkup(component);

test("all three public components are exported and SSR-safe", () => {
  assert.equal(typeof LiquidGlass, "function");
  assert.equal(typeof LiquidGlassButton, "object"); // React.forwardRef
  assert.equal(typeof LiquidGlassIconButton, "object");
  assert.match(render(React.createElement(LiquidGlassButton, null, "Contato")), /<button/);
});

test("button is natively interactive, keyboard accessible and defaults to type button", () => {
  const html = render(React.createElement(LiquidGlassButton, { "aria-label": "Abrir contato", size: "sm" }, "Contato"));
  assert.match(html, /<button[^>]*type="button"/);
  assert.match(html, /aria-label="Abrir contato"/);
  assert.match(html, /Contato/);
  assert.match(html, /<canvas/);
  assert.doesNotMatch(html, /<button[^>]*><button/);
});

test("href creates an anchor and protects external links", () => {
  const html = render(React.createElement(LiquidGlassButton, { href: "https://example.com", target: "_blank" }, "Abrir"));
  assert.match(html, /<a[^>]*href="https:\/\/example.com"/);
  assert.match(html, /rel="noopener noreferrer"/);
  assert.doesNotMatch(html, /<button/);
});

test("disabled links lose navigation, while loading buttons become disabled", () => {
  const link = render(React.createElement(LiquidGlassButton, { href: "/contato", disabled: true }, "Contato"));
  assert.match(link, /aria-disabled="true"/);
  assert.doesNotMatch(link, /href="/);
  const busy = render(React.createElement(LiquidGlassButton, { loading: true }, "Enviar"));
  assert.match(busy, /disabled=""/);
  assert.match(busy, /aria-busy="true"/);
  assert.match(busy, /Carregando/);
});

test("icon button is circular and accepts an accessible name", () => {
  const html = render(React.createElement(LiquidGlassIconButton, { "aria-label": "Menu", icon: React.createElement("svg") }));
  assert.match(html, /data-shape="circle"/);
  assert.match(html, /aria-label="Menu"/);
  assert.match(html, /<svg/);
});

test("package exposes importable stylesheet and keeps it from tree shaking", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.equal(pkg.exports["./styles.css"], "./src/styles.css");
  assert.ok(pkg.sideEffects.includes("./src/styles.css"));
  assert.equal(pkg.version, "0.2.0");
});
