import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles';
import carouselStyle from './carousel.styles';
import { SlideProps } from '../../type/type';

@customElement('skm-carousel')
export default class SKMCarousel extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  current = 0;

  checkActive = (currentSlide: number) => {
    const dots = this.shadowRoot?.querySelectorAll('.dots > .dot');
    const slides = this.shadowRoot?.querySelector('.slides');
    const slidesCount = this.shadowRoot?.querySelectorAll('.slides >.slide');

    for (let i = 0; i < (slides?.childElementCount ?? 3); i++) {
      if (i !== currentSlide) {
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

  changeSlide = (next = true) => {
    if (next) {
      this.current = this.current > 1 ? 0 : this.current + 1;
    } else {
      this.current = this.current < 0 ? 0 : this.current - 1;
    }

    this.checkActive(this.current);
  };

  firstUpdated() {
    console.log('firstUpdated', this.children);

    // Controls
    this.shadowRoot?.querySelector('.next-slide')?.addEventListener('click', () => {
      this.changeSlide();
    });

    this.shadowRoot?.querySelector('.prev-slide')?.addEventListener('click', () => {
      this.changeSlide(false);
    });

    this.slideData.map((e, index) => {
      this.shadowRoot
        ?.getElementById(`slide_${index}`)
        ?.addEventListener('click', () => this.checkActive(index));
    });
  }

  render() {
    return html`<div class="container">
      <div class="carousel">
        <div class="slides">
          ${Array.from(
            { length: this.children.length },
            (_, index) => html` <div class="slide">${this.children[index]}</div>`
          )}
        </div>
        <div class="controls">
          <div class="control prev-slide">&#9668;</div>
          <div class="control next-slide">&#9658;</div>
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
    'skm-carousel': SKMCarousel;
  }
}
