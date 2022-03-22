import "./Grid.css";

/**
 * @module grid-l
 * @description
 * A custom element for creating a responsive grid using the CSS Grid module
 * @property {string} min=250px A CSS length value representing x in `minmax(min(x, 100%), 1fr)`
 * @property {string} space=var(--s1) The space between grid cells
 */
export default class Grid extends HTMLElement {
  i = `Grid-${[this.min, this.space].join("")}`;

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
          grid-gap: ${this.space};
        }

        @supports (width: min(${this.min}, 100%)) {
          [data-i="${this.i}"] {
            grid-template-columns: repeat(auto-fill, minmax(min(${this.min}, 100%), 1fr));
          }
        }
      `
        .replace(/\s\s+/g, " ")
        .trim();
      document.head.appendChild(styleEl);
    }
  }

  get min() {
    return this.getAttribute("min") || "250px";
  }

  set min(val) {
    this.setAttribute("min", val);
  }

  get space() {
    return this.getAttribute("space") || "var(--s1)";
  }

  set space(val) {
    this.setAttribute("space", val);
  }

  static get observedAttributes() {
    return ["min", "space"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("grid-l", Grid);
}
