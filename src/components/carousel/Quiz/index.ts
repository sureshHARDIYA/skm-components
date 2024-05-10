import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import quizStyle from './quizStyle';

@customElement('sas-quiz-loader')
export class SKMQuiz extends LitElement {
  static readonly styles = [quizStyle];
  static properties = {
    dataId: { type: String, attribute: 'data-id' },
    dataSlug: { type: String, attribute: 'data-slug' },
    dataTitle: { type: String, attribute: 'data-title' }
  };

  @property({ type: String, attribute: 'data-id' }) dataId: string;
  @property({ type: String, attribute: 'data-slug' }) dataSlug: string;
  @property({ type: String, attribute: 'data-title' }) dataTitle: string;

  constructor() {
    super();
    this.dataId = '';
    this.dataSlug = '';
    this.dataTitle = '';
  }

  render() {
    return html`<div class="skm-quiz-container">
      <p class="quiz-title">${this.dataTitle}!</p>
      <button @click="${this._handleClick}" class="start-quiz">Start Quiz</button>
    </div>`;
  }

  _handleClick() {
    console.log('Clicked!');
  }
}
