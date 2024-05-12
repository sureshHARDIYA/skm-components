import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';


@customElement('quiz-questions')
export class QuizQuestions extends LitElement {
  static readonly styles = [];

    @property({ type: Array }) questions: any[] = [];
    @property({ type: Number }) totalQuestions = 0;
    @property({ type: Number }) currentQuestion = 0;

  render() {
    return html`<div class="skm-quiz-outer-wrapper">
        <sl-badge>${this.totalQuestions} questions</sl-badge>
            <div class="question-wrapper">
                <div class="question">
                    ${this.questions[this.currentQuestion].title}
                </div>
                <div class="answers">
                    ${this.questions[this.currentQuestion].answer.map((answer: any, index: number) => html`
                        <div class="answer" @click="${() => this._handleAnswerClick(index)}">
                            ${answer.answer_text}
                        </div>
                    `)}
                </div>
            </div>
       </div>`;
  }

  protected firstUpdated(): void {
    this.totalQuestions = this.questions.length;
  }
 
}
