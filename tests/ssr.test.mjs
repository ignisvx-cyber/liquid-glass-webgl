import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { LiquidGlass } from "../src/index.js";

test("component renders accessible content on SSR without window or WebGL", () => {
  const html = renderToStaticMarkup(React.createElement(LiquidGlass, { width: 240, height: 64 }, "Contato"));
  assert.ok(html.includes("Contato"));
  assert.ok(html.includes("<canvas"));
  assert.ok(html.includes("backdrop-filter"));
});
