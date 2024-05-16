import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';

import questionStyle from './questionStyle';

@customElement('quiz-questions')
export class QuizQuestions extends LitElement {
  static readonly styles = [questionStyle];

  @property({ type: Array }) questions: any[] = [];
  @property({ type: Number }) totalQuestions = 0;
  @state() currentQuestion = 0;
  @state() selectedOptions: { questionIndex: number; optionId: string; isCorrect: boolean }[] = [];
  @state() response: { question: number; answers: string[]; text_answer?: string }[] = [];

  render() {
    const isLastQuestion = this.currentQuestion === this.totalQuestions - 1;
    const hasSelectedOption =
      this.selectedOptions.some((option) => option.questionIndex === this.currentQuestion) ||
      this.response.some((res) => res.question === this.currentQuestion);
    return html`<div class="skm-quiz-outer-wrapper">
      <sl-badge>${this.totalQuestions} questions</sl-badge>
      <div class="question-wrapper">
        <div class="question">${this.questions[this.currentQuestion].title}</div>
        <div class="answers">${this.renderAnswerInput(this.questions[this.currentQuestion])}</div>
        <div class="question-nav">
          <sl-button
            variant="default"
            ?disabled=${this.currentQuestion === 0}
            @click=${this.handlePrevious}
            >Previous</sl-button
          >
          ${!isLastQuestion
            ? html`<sl-button
                variant="default"
                ?disabled=${!hasSelectedOption}
                @click=${this.handleNext}
                >Next</sl-button
              >`
            : html``}
          ${isLastQuestion
            ? html`<sl-button variant="primary" @click=${this.handleSubmit}>Submit</sl-button>`
            : html``}
        </div>
      </div>
    </div>`;
  }

  renderAnswerInput(question: any) {
    switch (question.technique) {
      case 0: // One choice
      case 3: // Survey
        return html`
          <sl-radio-group name="answer" @sl-change=${(e: any) => this.handleOptionClick(e)}>
            ${question.answer.map(
              (option: any) =>
                html`
                  <sl-radio
                    value=${option.answer_text}
                    ?checked=${this.isOptionSelected(question.id, option.answer_text)}>
                    ${option.answer_text}
                  </sl-radio>
                `
            )}
          </sl-radio-group>
        `;
      case 1: // Multiple choices
        return html`
          ${question.answer.map(
            (option: any) => html`
              <sl-checkbox
                name="answer"
                .value=${option.answer_text}
                ?checked=${this.isOptionSelected(question.id, option.answer_text)}
                @sl-change=${(e: any) => this.handleOptionClick(e, option.answer_text)}
                >${option.answer_text}</sl-checkbox
              >
            `
          )}
        `;
      case 2: // Text answer
        return html`<sl-textarea
          name="answer"
          @input=${(e: any) => this.handleFreeTextChange(e)}></sl-textarea>`;
      default:
        return html``;
    }
  }

  isOptionSelected(questionId: number, optionId: string) {
    console.log(
      'selectedOptions:',
      this.selectedOptions.some(
        (option) => option.questionIndex === questionId && option.optionId === optionId
      )
    );

    return this.selectedOptions.some(
      (option) => option.questionIndex === questionId && option.optionId === optionId
    );
  }

  handleOptionClick(event: any) {
    const optionId = event.target.value;
    const questionIndex = this.currentQuestion;
    const isCorrect = this.questions[questionIndex].answer.find(
      (answer: any) => answer.answer_text === optionId
    )?.is_correct_answer;

    this.selectedOptions = [{ questionIndex, optionId, isCorrect }];
  }

  handleFreeTextChange(event: any) {
    const value = event.target.value;
    const questionIndex = this.currentQuestion;
    this.selectedOptions = [{ questionIndex, optionId: value, isCorrect: true }];
  }

  handlePrevious() {
    if (this.currentQuestion > 0) {
      this.currentQuestion -= 1;
      this.selectedOptions = []; // Clear selected options when moving to previous question
    }
  }

  handleNext() {
    if (this.currentQuestion < this.totalQuestions - 1) {
      this.response.push({
        question: this.currentQuestion,
        answers: this.selectedOptions.map((option) => option.optionId),
        text_answer: this.selectedOptions[0]?.optionId
      });
      this.currentQuestion += 1;
    }
  }

  handleSubmit() {
    this.response.push({
      question: this.currentQuestion,
      answers: this.selectedOptions.map((option) => option.optionId),
      text_answer: this.selectedOptions[0]?.optionId
    });
    console.log('Response:', this.response);
    // Handle submission
  }

  protected firstUpdated(): void {
    console.log('firstUpdated', this.currentQuestion, this.questions[this.currentQuestion]);
  }
}
