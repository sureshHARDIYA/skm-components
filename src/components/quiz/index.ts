import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import componentStyles from '../../styles/component.styles';

import quizStyles from './quiz.styles';

@customElement('skm-quiz')
export default class SKMquiz extends LitElement {
  static readonly styles = [componentStyles, quizStyles];

  @property()
  name = 'Somebody';

  // Setup event listeners once the component is updated and DOM elements are available
  firstUpdated() {
    const openButton = this.shadowRoot?.querySelector('.skm-quiz-start');
    const drawer: any = this.shadowRoot?.querySelector('.drawer-overview');
    const closeButton = drawer?.querySelector('sl-button[variant="primary"]');

    if (drawer && openButton && closeButton) {
      openButton.addEventListener('click', () => drawer.show());
      closeButton.addEventListener('click', () => drawer.hide());
    }
  }

  render() {
    return html`<div class="quiz-container">
      <div>${this.name}</div>
      <button class="skm-quiz-start">Start Quiz</button>
      <sl-drawer label="Drawer" class="drawer-overview">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <sl-button slot="footer" variant="primary">Close</sl-button>
      </sl-drawer>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'skm-quiz': SKMquiz;
  }
}
