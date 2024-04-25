import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import carouselStyle from './carousel.styles';
import componentStyles from '../../styles/component.styles';

@customElement('skm-flip-carousel')
export default class SKMCarousel extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  current: number = 0;

  checkActive = (currentSlide: number = 0) => {
    this.current = currentSlide;
    const dots = this.shadowRoot?.querySelectorAll('.dots > .dot');

    this.querySelectorAll('skm-flip-slide').forEach((slide, index) => {
      slide.setAttribute('selected', index === currentSlide ? 'true' : 'false');
    });

    for (let i = 0; i < this.children.length; i++) {
      if (i === currentSlide) {
        dots?.[currentSlide].classList.add('active');
      } else {
        dots?.[i].classList.remove('active');
      }
    }
  };

  changeSlide = (next = true) => {
    if (next) {
      this.current = this.current > 1 ? 0 : this.current + 1;
    } else {
      this.current = this.current === 0 ? this.children.length - 1 : this.current - 1;
    }

    this.checkActive(this.current);
  };

  firstUpdated() {
    this.checkActive(0);
    if (this.children.length)
      setInterval(() => {
        this.current =
          this.current < this.children.length - 1 ? this.current + 1 : (this.current = 0);

        this.checkActive(this.current);
      }, 5000);

    this.shadowRoot?.querySelector('.next-slide')?.addEventListener('click', () => {
      this.changeSlide();
    });
    this.shadowRoot?.querySelector('.prev-slide')?.addEventListener('click', () => {
      this.changeSlide(false);
    });

    Array.from({ length: this.children.length }, (_, index) =>
      this.shadowRoot
        ?.getElementById(`slide_${index}`)
        ?.addEventListener('click', () => this.checkActive(index))
    );
  }

  render() {
    return html`<div class="container">
      <div class="carousel">
        <div class="slides">
          <slot></slot>
        </div>
        <div class="controls">
          <img src="./backButton.svg" class="control prev-slide" />
          <img src="./nextButton.svg" class="control next-slide" />
        </div>
      </div>

      <div class="dots">
        ${Array.from(
          { length: this.children.length },
          (_, index) => html`<div class="dot" id="slide_${index}"></div>`
        )}
      </div>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skm-flip-carousel': SKMCarousel;
  }
}
