import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles';

import carouselStyle from './carousel.styles';

@customElement('skm-carousel')
export default class SKMCarousel extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  current = 0;

  changeSlide = (next = true) => {
    const dots = this.shadowRoot?.querySelectorAll('.dots > .dot');
    const slides = this.shadowRoot?.querySelector('.slides');
    const slidesCount = this.shadowRoot?.querySelectorAll('.slides >.slide');

    console.log('slide count', slides?.childElementCount);
    console.log('current', this.current);

    if (next) {
      this.current = this.current > 1 ? 0 : this.current + 1;
    } else {
      this.current = this.current < 0 ? 0 : this.current - 1;
    }

    for (let i = 0; i < (slides?.childElementCount ?? 3); i++) {
      if (i !== this.current) {
        dots?.[i].classList.remove('active');
        slidesCount?.[i]?.classList.remove('block');
        slidesCount?.[i]?.classList.add('disappear');
      } else {
        dots?.[i].classList.add('active');
        slidesCount?.[i]?.classList.remove('disappear');
        slidesCount?.[i]?.classList.add('block');
      }
    }
  };

  firstUpdated() {
    // Controls
    this.shadowRoot?.querySelector('.next-slide')?.addEventListener('click', () => {
      this.changeSlide();
    });

    this.shadowRoot?.querySelector('.prev-slide')?.addEventListener('click', () => {
      this.changeSlide(false);
    });
  }

  render() {
    return html`<div>
      <div class="carousel">
        <div class="slides">
          <img src="https://picsum.photos/1280/720?random=1" alt="slide image" class="slide" />
          <img src="https://picsum.photos/1280/720?random=2" alt="slide image" class="slide" />
          <img src="https://picsum.photos/1280/720?random=3" alt="slide image" class="slide" />
        </div>
        <div class="controls">
          <div class="control prev-slide">&#9668;</div>
          <div class="control next-slide">&#9658;</div>
        </div>
      </div>

      <div class="dots">
        <div class="dot active"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skm-carousel': SKMCarousel;
  }
}
