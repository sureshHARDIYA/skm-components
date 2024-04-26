import { html, LitElement } from 'lit';
import {
  customElement,
  property,
  queryAssignedElements,
  queryAssignedNodes
} from 'lit/decorators.js';

import carouselStyle from './flipbox.style';
import componentStyles from '../../../styles/component.styles';

@customElement('skm-flip-slide')
export default class SKMFlipSlide extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];
  static shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  clickFront = true;

  firstUpdated() {
    const childrenSLot = this.shadowRoot?.querySelectorAll('slot');

    childrenSLot?.forEach((e) => {
      const el = e.assignedElements({ flatten: true });

      // check in case use pass children in slot

      if (el && el?.[0]?.childNodes?.[1]) {
        (el?.[0].childNodes[1] as HTMLElement).style.display = 'flex';
        (el?.[0].childNodes[1] as HTMLElement).style.height = '100%';
        (el?.[0].childNodes[1] as HTMLElement).style.justifyContent = 'center';
        (el?.[0].childNodes[1] as HTMLElement).style.alignItems = 'center';
        (el?.[0].childNodes[1] as HTMLElement).style.textAlign = 'center';
      }
    });

    this.shadowRoot?.querySelector('.flip-box')?.addEventListener('click', () => {
      const slides = this.shadowRoot?.querySelector('.flip-box-inner');

      if (this.clickFront) {
        slides?.classList?.add('rotation');
        slides?.classList?.remove('rotationBack');
      } else {
        slides?.classList?.remove('rotation');
        slides?.classList?.add('rotationBack');
      }
      this.clickFront = !this.clickFront;
    });
  }

  render() {
    return html`<div class="flip-box slide">
      <div class="flip-box-inner">
        <div class="flip-box-back">
          <slot name="slide-back"></slot>
        </div>
        <div class="flip-box-front">
          <slot name="slide-front"></slot>
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
