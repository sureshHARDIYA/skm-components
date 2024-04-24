import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles';
import carouselStyle from './flipbox.style';

@customElement('skm-flip-slide')
export default class SKMFlipBox extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  @property({ type: String }) frontSlide = 'frontSlide';
  @property({ type: String }) backSlide = 'backSlide';

  render() {
    return html`<div class="flip-box">
      <div class="flip-box-inner">
        <div class="flip-box-front">
          <h2>${this.frontSlide}</h2>
        </div>
        <div class="flip-box-back">
          <h2>${this.backSlide}</h2>
        </div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skm-flip-slide': SKMFlipBox;
  }
}
