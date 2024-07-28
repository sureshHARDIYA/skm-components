import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import carouselStyle from './carousel.styles';
import componentStyles from '../../styles/component.styles';

@customElement('skm-flip-carousel')
export default class SKMCarousel extends LitElement {
  static readonly styles = [componentStyles, carouselStyle];

  @property({ type: Number })
  currentSlide: number = 0;

  checkActive = (currentSlide: number = 0) => {
    this.currentSlide = currentSlide;
    const dots = this.shadowRoot?.querySelectorAll('.dots > .dot');

    this.querySelectorAll('skm-flip-slide').forEach((slide, index) => {
      slide.setAttribute('selected', index === currentSlide ? 'true' : 'false');

      /**
       * Make sure the current slide is always showing front by default
       */
      if (index === currentSlide) {
        const currentInner = slide.shadowRoot?.querySelector('.flip-box-inner');
        currentInner?.classList.add('rotationBack');
      }
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
      this.currentSlide = (this.currentSlide + 1) % this.children.length;
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
    return html`<div class="skm-container">
      <div class="carousel">
        <div class="slides">
          <slot></slot>
        </div>
        <div class="controls">
          <span class="control prev-slide">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_27_3)">
                <path
                  d="M12.5001 25C19.3925 25 24.9998 19.3924 24.9998 12.4999C24.9998 5.60755 19.3925 0 12.5001 0C5.60768 0 0.000244141 5.60755 0.000244141 12.4999C0.000244141 19.3924 5.60768 25 12.5001 25ZM12.5001 1.71115C18.4489 1.71115 23.2886 6.55096 23.2888 12.4999C23.2888 18.4489 18.4491 23.2887 12.5001 23.2889C6.55121 23.2887 1.71151 18.4489 1.71151 12.4998C1.71151 6.55108 6.55121 1.71115 12.5001 1.71115Z"
                  fill="black" />
                <path
                  d="M10.8214 17.8538C11.1556 18.1878 11.6973 18.1877 12.0313 17.8538C12.3656 17.5196 12.3656 16.9779 12.0312 16.6437L8.74352 13.3561L18.264 13.3552C18.7365 13.3551 19.1195 12.9721 19.1195 12.4994C19.1194 12.0269 18.7364 11.644 18.2639 11.644L8.74307 11.645L12.0316 8.35669C12.3657 8.02256 12.3657 7.4807 12.0316 7.14668C11.8644 6.97968 11.6455 6.89606 11.4265 6.89606C11.2076 6.89606 10.9887 6.97968 10.8215 7.14657L6.07265 11.8954C5.91214 12.0557 5.82202 12.2733 5.82202 12.5003C5.82214 12.7273 5.91226 12.9447 6.07276 13.1055L10.8214 17.8538Z"
                  fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_27_3">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          <span class="control next-slide">
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_27_7)">
                <path
                  d="M12.5 0C5.6075 0 0 5.60758 0 12.5001C0 19.3925 5.6075 25 12.5 25C19.3925 25 25 19.3925 25 12.5001C25 5.60758 19.3925 0 12.5 0ZM12.5 22.7273C6.86061 22.7273 2.27273 18.1393 2.27273 12.5001C2.27273 6.86076 6.86061 2.27273 12.5 2.27273C18.1394 2.27273 22.7273 6.86076 22.7273 12.5001C22.7273 18.1393 18.1393 22.7273 12.5 22.7273Z"
                  fill="black" />
                <path
                  d="M14.0611 7.15114C13.6174 6.70743 12.8978 6.70743 12.454 7.15114C12.0102 7.59486 12.0102 8.3144 12.454 8.75819L15.0597 11.3639L7.19683 11.3643C6.56926 11.3643 6.06047 11.8732 6.06055 12.5008C6.06055 13.1283 6.56941 13.6371 7.19699 13.6371L15.0594 13.6366L12.454 16.2421C12.0102 16.6858 12.0102 17.4054 12.454 17.8492C12.6758 18.0711 12.9666 18.1821 13.2574 18.1821C13.5483 18.1821 13.8391 18.0711 14.0609 17.8492L18.6064 13.3036C18.8197 13.0904 18.9394 12.8014 18.9394 12.5C18.9394 12.1986 18.8196 11.9096 18.6065 11.6965L14.0611 7.15114Z"
                  fill="black" />
              </g>
              <defs>
                <clipPath id="clip0_27_7">
                  <rect width="25" height="25" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
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
