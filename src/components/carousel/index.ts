import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import carouselStyle from './carousel.styles';
import componentStyles from '../../styles/component.styles';

@customElement('skm-flip-carousel')
export default class SKMCarousel extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  @property({ type: Number })
  currentSlide: number = 1;

  checkActive = (currentSlide: number = 0) => {
    this.currentSlide = currentSlide;
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
      this.currentSlide = this.currentSlide > 1 ? 0 : this.currentSlide + 1;
    } else {
      this.currentSlide =
        this.currentSlide === 0 ? this.children.length - 1 : this.currentSlide - 1;
    }

    this.checkActive(this.currentSlide);
  };

  firstUpdated() {
    this.checkActive(this.currentSlide);
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
