import "./Icon.css";

/**
 * @module icon-l
 * @description
 * A custom element for inline icon insertion
 * @property {string} space=null The space between the text and the icon. If null, natural word spacing is preserved
 * @property {string} label=null Turns the element into an image in assistive technologies and adds an aria-label of the value
 */
export default class Icon extends HTMLElement {
  i = `Icon-${this.space}`;

  constructor() {
    super();
    this.render();
  }

  render() {
    if (this.label) {
      this.setAttribute("role", "img");
      this.setAttribute("aria-label", this.label);
    }
    if (this.space) {
      this.dataset.i = this.i;
      if (!document.getElementById(this.i)) {
        let styleEl = document.createElement("style");
        styleEl.id = this.i;
        styleEl.innerHTML = `
          [data-i="${this.i}"] {
            display: inline-flex;
            align-items: baseline;
          }

          [data-i="${this.i}"] > svg {
            margin-inline-end: ${this.space};
          }
        `
          .replace(/\s\s+/g, " ")
          .trim();
        document.head.appendChild(styleEl);
      }
    }
  }

  get space() {
    return this.getAttribute("space") || null;
  }

  set space(val) {
    // @ts-expect-error
    this.setAttribute("space", val);
  }

  get label() {
    return this.getAttribute("label") || null;
  }

  set label(val) {
    // @ts-expect-error
    this.setAttribute("label", val);
  }

  static get observedAttributes() {
    return ["space", "label"];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }
}

if ("customElements" in window) {
  customElements.define("icon-l", Icon);
}
