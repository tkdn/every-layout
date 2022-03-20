import "./Box.css";

/**
 * @module box-l
 * @property {string} padding initial padding: var(--s1)
 * @property {string} borderWidth initial border-width: var(--border-thin)
 * @property {boolean} invert initial false
 */

export default class Box extends HTMLElement {
  get padding() {
    return this.getAttribute("padding") || "var(--s1)";
  }
  set padding(val) {
    this.setAttribute("padding", val);
  }

  get borderWidth() {
    return this.getAttribute("borderWidth") || "var(--border-thin)";
  }
  set borderWidth(val) {
    this.setAttribute("borderWidth", val);
  }

  get invert() {
    return this.hasAttribute("invert");
  }
  set invert(val) {
    if (val) {
      this.setAttribute("invert", "");
    }
  }

  i = `Stack-${[this.padding, this.borderWidth, this.invert].join("")}`;

  constructor() {
    super();
    this.render();
  }

  render() {
    this.dataset.i = this.i;
    if (!document.getElementById(this.i)) {
      let styleEl = document.createElement("style");
      styleEl.id = this.i;
      styleEl.innerHTML = `
        [data-i="${this.i}"] {
          padding: ${this.padding};
          border: ${this.borderWidth} solid;
          ${
            this.invert
              ? `background-color: var(--color-light);
            filter: invert(100%);`
              : ""
          }
        }

        [data-i="${this.i}"] * {
          background-color: inherit;
        }
      `
        .replace(/\s\s+/g, " ")
        .trim();
      document.head.appendChild(styleEl);
    }
  }

  static get observedAttributes() {
    return ["padding", "borderWidth", "invert"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("box-l", Box);
}
