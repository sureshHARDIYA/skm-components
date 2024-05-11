import { Task } from '@lit/task';
import { html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
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

  @state() isOpen = false;

  constructor() {
    super();
    this.dataId = '';
    this.dataSlug = '';
    this.dataTitle = '';
  }

  render() {
    return html`<div class="skm-quiz-outer-wrapper">
      <div class="skm-quiz-container">
        <p class="quiz-title">${this.dataTitle}!</p>
        <button @click="${this._handleClick}" class="start-quiz">Start Quiz</button>
      </div>
      <sl-drawer label="Drawer" class="drawer-overview" style="--size: 50vw;">
        something iwll this.compareDocumentPosition..
        <sl-button slot="footer" variant="primary">Close</sl-button>
      </sl-drawer>
      <sl-button>Open Drawer</sl-button>
    </div>`;
  }

  protected firstUpdated(): void {
    console.log('firstUpdated');
    console.log(this.isOpen);
  }

  _handleClick() {
    const drawer = this.shadowRoot?.querySelector('.drawer-overview') as HTMLElement;
    if (drawer) {
      (drawer as any).show();
    }
    const closeButton = drawer.querySelector('sl-button[variant="primary"]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        (drawer as any).hide();
      });
    }
    this._fetchQuizDataTask.run([this.dataSlug]);
  }

  private _fetchQuizDataTask = new Task(this, {
    task: async () => {
      const username = 'itsmeskm99@gmail.com';
      const password = 'Testing123#';
      const headers = new Headers();
      headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

      const response = await fetch(
        `https://dev.api.inspireu2iti.com/api/v1/quiz/${slug}?expand=questions`,
        {
          headers
        }
      );
      return response.json();
    },
    args: () => []
  });
}
