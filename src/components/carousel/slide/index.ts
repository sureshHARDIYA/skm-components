import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import carouselStyle from './flipbox.style';
import componentStyles from '../../../styles/component.styles';

@customElement('skm-flip-slide')
export default class SKMFlipSlide extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  firstUpdated() {
    this.shadowRoot?.querySelector('.flip-box')?.addEventListener('click', () => {
      const slides = this.shadowRoot?.querySelector('.flip-box-inner');

      console.log('slide ', slides);

      slides?.classList?.add('rotate');
    });
  }

  render() {
    return html`<div class="flip-box slide">
      <div class="flip-box-inner">
        <div class="flip-box-front">
          <slot name="slide-front"></slot>
        </div>
        <div class="flip-box-back">
          <slot name="slide-back"></slot>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skm-flip-slide': SKMFlipSlide;
  }
}
