import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('slide-front')
export default class SKMFlipSlide extends LitElement {
  render() {
    return html`<div><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'slide-front': SKMFlipSlide;
  }
}
