import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';



@customElement('quiz-questions')
export class QuizQuestions extends LitElement {
  static readonly styles = [];

    @property({ type: Array }) questions: any[] = [];

  render() {
    return html`<div class="skm-quiz-outer-wrapper">
       questions list is coming
       </div>`;
  }

  protected firstUpdated(): void {
    console.log('firstUpdated', this.questions[0]);
  }
 
}
