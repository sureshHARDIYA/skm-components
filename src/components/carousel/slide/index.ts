import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import carouselStyle from './flipbox.style';
import componentStyles from '../../../styles/component.styles';

@customElement('skm-flip-slide')
export default class SKMFlipSlide extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];
  public static readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true
  };

  clickFront = true;
  headerText = 'Insights';

  firstUpdated() {
    this.shadowRoot?.querySelector('.flip-box')?.addEventListener('click', () => {
      const slides = this.shadowRoot?.querySelector('.flip-box-inner');
      if (this.clickFront) {
        slides?.classList.add('rotation');
        slides?.classList.remove('rotationBack');
      } else {
        slides?.classList.remove('rotation');
        slides?.classList.add('rotationBack');
      }
      this.clickFront = !this.clickFront;
    });
  }

  render() {
    return html`
      <div class="flip-box slide">
        <div class="flip-box-inner">
          <div class="flip-box-back bg-[#919EAB14] dark:bg-[#919EAB14]">
            <div class="slide-content">
              <header class="slide-header">${this.headerText}</header>
              <div class="slot-wrapper"><slot name="slide-back"></slot></div>
            </div>
            <button class="slide-trigger">Click to flip</button>
          </div>
          <div class="flip-box-front">
            <div class="slide-content">
              <header class="slide-header">${this.headerText}</header>
              <div class="slot-wrapper"><slot name="slide-front"></slot></div>
            </div>
            <button class="slide-trigger text-black dark:text-white">Click to flip</button>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skm-flip-slide': SKMFlipSlide;
  }
}
