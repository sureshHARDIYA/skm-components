import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { asyncReplace } from 'lit/directives/async-replace.js';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';

import quizStyle from './quizStyle';

import './Questions';

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
  @property() loading: boolean;
  @property() quizData: null;
  @property() totalQuestions = 0;

  constructor() {
    super();
    this.dataId = '';
    this.dataSlug = '';
    this.dataTitle = '';
    this.loading = false;
    this.quizData = null;
  }

  render() {
    return html`<div class="skm-quiz-outer-wrapper">
      <div class="skm-quiz-container">
        <p class="quiz-title">${this.dataTitle}</p>
        <button @click="${this._handleClick}" class="start-quiz">Start Quiz</button>
      </div>
      <sl-dialog label="${this.dataTitle}" class="dialog-width" style="--width: 50vw;">
        ${asyncReplace(this.renderSecondComponent())}
        <sl-button slot="footer" variant="primary">Close</sl-button>
      </sl-dialog>
    </div>`;
  }

  async *renderSecondComponent() {
    if (this.loading) {
      yield html`<div>Loading...</div>`;
    }
    if (this.quizData) {
      yield html`<quiz-questions
        .questions=${this.quizData}
        .totalQuestions=${this.totalQuestions}></quiz-questions>`;
    }
  }

  async _handleClick() {
    const drawer = this.shadowRoot?.querySelector('.dialog-width') as HTMLElement;
    if (drawer) {
      (drawer as any).show();
    }
    const closeButton = drawer.querySelector('sl-button[variant="primary"]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        (drawer as any).hide();
      });
    }
    await this.fetchData();
  }

  async fetchData() {
    this.loading = true;
    const username = 'itsmeskm99@gmail.com';
    const password = 'Testing123#';
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

    const response = await fetch(
      `https://dev.api.inspireu2iti.com/api/v1/quiz/${this.dataSlug}/?expand=questions`,
      {
        headers
      }
    );
    const data = await response.json();

    this.quizData = data.questions;
    this.totalQuestions = (this.quizData || [])?.length;
    this.loading = false;
    this.requestUpdate();
  }
}
