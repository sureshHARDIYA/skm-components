import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { asyncReplace } from 'lit/directives/async-replace.js';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';

import quizStyle from './quizStyle';

import './Questions';
import { API_ROOT } from './constants';
import { isValidJSON, prepareHeaders } from './utils';

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

  protected firstUpdated(): void {
    const dialog = this.shadowRoot?.querySelector('.dialog-width') as HTMLElement;
    const alertDialog = this.shadowRoot?.querySelector('.quiz-progress-alert') as HTMLElement;

    dialog?.addEventListener('sl-request-close', (event: any) => {
      if (event.detail.source === 'overlay') {
        event.preventDefault();
      }

      if (event.detail.source === 'close-button') {
        event.preventDefault();
        (alertDialog as any)?.show();
      }
    });

    alertDialog?.addEventListener('sl-request-close', (event: any) => {
      if (event.detail.source === 'overlay') {
        event.preventDefault();
      }
    });

    const closeButton = this.shadowRoot?.querySelector('sl-button[class="close-active-quiz"]');
    const continueButton = this.shadowRoot?.querySelector(
      'sl-button[class="continue-active-quiz"]'
    );
    continueButton?.addEventListener('click', () => {
      (alertDialog as any)?.hide();
    });

    /**
     * If the user decides to close the active quiz session, we hide both the dialogs.
     * And remove the active quiz session from localStorage.
     */
    closeButton?.addEventListener('click', () => {
      (alertDialog as any)?.hide();
      (dialog as any)?.hide();
      localStorage.removeItem('activeQuizSession');
    });

    /**
     * Listen for the custom event emitted from the child component to close the dialog
     */
    this.addEventListener('quiz-submitted', () => {
      (dialog as any)?.hide();
    });
  }

  render() {
    return html`<div class="skm-quiz-outer-wrapper">
      <div class="skm-quiz-container">
        <p class="quiz-title">${this.dataTitle}</p>
        <button @click="${this._handleClick}" class="start-quiz">Start Quiz</button>
      </div>
      <sl-dialog
        label="${this.dataTitle}"
        class="dialog-width dialog-deny-close"
        style="--width: 50vw;">
        ${asyncReplace(this.renderSecondComponent())}
      </sl-dialog>
      <sl-dialog label="Active Quiz Session" class="quiz-progress-alert">
        You have an active quiz session running.
        <strong>Are you sure you want to close it?</strong> Your progress will be
        <strong>lost</strong>.
        <div slot="footer" class="alert-footer-quiz">
          <sl-button variant="danger" class="close-active-quiz">Close the quiz</sl-button>
          <sl-button variant="success" class="continue-active-quiz">Continue with Quiz</sl-button>
        </div>
      </sl-dialog>
    </div>`;
  }

  async *renderSecondComponent() {
    if (this.loading) {
      yield html`<div class="loading-quiz">
        <sl-skeleton effect="pulse"></sl-skeleton>
        <sl-skeleton effect="pulse"></sl-skeleton>
        <sl-skeleton effect="pulse"></sl-skeleton>
      </div>`;
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
    await this.fetchData();

    await this.createSession();
  }

  async fetchData() {
    this.loading = true;

    const headers = prepareHeaders();

    const response = await fetch(`${API_ROOT}v1/quiz/${this.dataSlug}/?expand=questions`, {
      headers
    });
    const data = await response.json();

    this.quizData = data.questions;
    this.totalQuestions = (this.quizData || [])?.length;
    this.loading = false;
    this.requestUpdate();
  }

  async createSession() {
    const activeQuizSession = localStorage.getItem('activeQuizSession');

    if (activeQuizSession && isValidJSON(activeQuizSession)) {
      return null;
    }

    // If no valid session exists, create a new one
    try {
      const headers = prepareHeaders();

      const response = await fetch(`${API_ROOT}v1/quizzes/${this.dataSlug}/start/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          quiz: this.dataId,
          slug: this.dataSlug
        })
      });

      if (!response.ok) {
        throw new Error(`Error creating session: ${response.statusText}`);
      }

      const data = await response.json();

      // Store the new session data in localStorage
      const sessionData = {
        activeSessionId: data.id,
        dataSlug: this.dataSlug
      };
      localStorage.setItem('activeQuizSession', JSON.stringify(sessionData));

      return sessionData;
    } catch (error) {
      console.error('Failed to create a new session:', error);
      throw error;
    }
  }
}
