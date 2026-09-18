const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");
const vm = require("node:vm");
const { transformSync } = require("next/dist/build/swc");

const { code } = transformSync(
  fs.readFileSync(path.join(__dirname, "../src/app/components/projects/TransitionLink.jsx"), "utf8"),
  {
    filename: "TransitionLink.jsx",
    jsc: { parser: { syntax: "ecmascript", jsx: true }, transform: { react: { runtime: "automatic" } }, target: "es2020" },
    module: { type: "commonjs" },
  },
);

function setup({ reducedMotion = false, target = "", download = false, ...props } = {}) {
  const events = [];
  const card = { dataset: {} };
  const exports = {};
  const Link = () => null;
  vm.runInNewContext(code, {
    exports,
    require: (id) => id === "next/link" ? Link : require(id),
    window: {
      matchMedia: () => ({ matches: reducedMotion }),
      dispatchEvent: (event) => events.push(event),
      requestAnimationFrame: () => assert.fail("Navigation must not wait for a render frame"),
    },
    document: {
      startViewTransition: () => assert.fail("Navigation must not freeze rendering during an async route update"),
    },
    CustomEvent: class {
      constructor(type, { detail }) { this.type = type; this.detail = detail; }
    },
  });
  const element = exports.default({ href: "/projects/sikafa", transitionLabel: "SIKAFA", transitionNumber: "03", ...props });
  const event = {
    button: 0,
    defaultPrevented: false,
    currentTarget: { target, hasAttribute: (name) => name === "download" && download, closest: () => card },
    preventDefault() { this.defaultPrevented = true; },
  };
  return { element, event, events, card, Link };
}

test("ordinary navigation leaves Next Link in control even when native view transitions are available", () => {
  const { element, event, events, card, Link } = setup({ replace: true, scroll: false });
  element.props.onClick(event);
  assert.equal(element.type, Link);
  assert.equal(element.props.href, "/projects/sikafa");
  assert.equal(element.props.replace, true);
  assert.equal(element.props.scroll, false);
  assert.equal(event.defaultPrevented, false);
  assert.equal(card.dataset.navigating, "true");
  assert.equal(events.length, 1);
  assert.equal(events[0].type, "portfolio:project-navigation");
  assert.equal(events[0].detail.label, "SIKAFA");
});

for (const [name, options, modifiers] of [
  ["reduced motion", { reducedMotion: true }, {}],
  ["new tab", { target: "_blank" }, {}],
  ["download", { download: true }, {}],
  ["caller cancellation", { onClick: (event) => event.preventDefault() }, {}],
  ["middle click", {}, { button: 1 }],
  ...["metaKey", "ctrlKey", "shiftKey", "altKey"].map((key) => [key, {}, { [key]: true }]),
]) {
  test(`${name} does not start a decorative transition`, () => {
    const { element, event, events, card } = setup(options);
    Object.assign(event, modifiers);
    element.props.onClick(event);
    assert.equal(events.length, 0);
    assert.equal(card.dataset.navigating, undefined);
    assert.equal(event.defaultPrevented, name === "caller cancellation");
  });
}
