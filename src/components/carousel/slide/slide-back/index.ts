import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('skm-back-front')
export default class SKMBackFront extends LitElement {
  render() {
    return html`<div><slot></slot></div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'back-front': SKMBackFront;
  }
}
