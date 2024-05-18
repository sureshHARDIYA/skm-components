import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';

import questionStyle from './questionStyle';

@customElement('quiz-questions')
export class QuizQuestions extends LitElement {
  static readonly styles = [questionStyle];

  @property({ type: Array }) questions: any[] = [];
  @property({ type: Number }) totalQuestions = 0;

  @state() currentQuestionIndex = 0;
  @state() selectedOptions: { [key: number]: { optionId: string; isCorrect: boolean } } = {};
  @state() response: { question: number; answers: string[]; text_answer?: string }[] = [];

  render() {
    const isLastQuestion = this.currentQuestionIndex === this.totalQuestions - 1;
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const hasSelectedOption = this.selectedOptions[this.currentQuestionIndex] !== undefined;

    return html`
      <div class="skm-quiz-outer-wrapper">
        <sl-badge>${this.totalQuestions} questions</sl-badge>
        <div class="question-wrapper">
          <div class="question">${currentQuestion.title}</div>
          <div class="answers">${this.renderAnswerInput()}</div>
          <div class="question-nav">
            <sl-button
              variant="default"
              ?disabled=${this.currentQuestionIndex === 0}
              @click=${this.handlePrevious}
              >Previous</sl-button
            >
            ${!isLastQuestion
              ? html`<button
                  class="next-button"
                  ?disabled=${!hasSelectedOption}
                  @click=${this.handleNext}>
                  Next
                </button>`
              : html``}
            ${isLastQuestion
              ? html`<sl-button variant="primary" @click=${this.handleSubmit}>Submit</sl-button>`
              : html``}
          </div>
        </div>
      </div>
    `;
  }

  renderAnswerInput() {
    const question = this.questions[this.currentQuestionIndex];
    const selectedOption = this.selectedOptions[this.currentQuestionIndex]?.optionId || '';

    switch (question.technique) {
      case 0: // One choice
      case 3: // Survey
        return html`
          <sl-radio-group
            id="answer-${this.currentQuestionIndex}"
            name="answer-${this.currentQuestionIndex}"
            @sl-change=${this.handleOptionClick}
            value=${selectedOption}>
            ${question.answer.map(
              (option: any) =>
                html` <sl-radio value=${option.answer_text}> ${option.answer_text} </sl-radio> `
            )}
          </sl-radio-group>
        `;
      case 1: // Multiple choices
        return html`
          ${question.answer.map(
            (option: any) => html`
              <sl-checkbox
                name="answer"
                .checked=${this.isOptionSelected(option.answer_text)}
                .value=${option.answer_text}
                @sl-change=${this.handleOptionClick}
                >${option.answer_text}</sl-checkbox
              >
            `
          )}
        `;
      case 2: // Text answer
        return html`<sl-textarea
          name="answer"
          @input=${this.handleFreeTextChange}
          value=${selectedOption}
          placeholder="Enter your answer here"></sl-textarea>`;
      default:
        return html``;
    }
  }

  isOptionSelected(optionId: string) {
    return this.selectedOptions[this.currentQuestionIndex]?.optionId === optionId;
  }

  handleOptionClick(event: any) {
    const optionId = event.target.value;
    const questionIndex = this.currentQuestionIndex;

    const isCorrect = this.questions[questionIndex].answer.find(
      (answer: any) => answer.answer_text === optionId
    )?.is_correct_answer;

    this.updateSelectedOptions(questionIndex, optionId, isCorrect);
  }

  handleFreeTextChange(event: any) {
    const value = event.target.value;
    const questionIndex = this.currentQuestionIndex;

    this.updateSelectedOptions(questionIndex, value, true);
  }

  updateSelectedOptions(questionIndex: number, optionId: string, isCorrect: boolean) {
    this.selectedOptions = {
      ...this.selectedOptions,
      [questionIndex]: { optionId, isCorrect }
    };
    this.updateResponse(questionIndex, optionId, isCorrect);
  }

  handlePrevious() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex -= 1;
    }
  }

  handleNext() {
    if (this.currentQuestionIndex < this.totalQuestions - 1) {
      this.currentQuestionIndex += 1;
    }
  }

  handleSubmit() {
    console.log('Response:', this.response);
    // Handle submission
  }

  updateResponse(questionIndex: number, optionId: string, isTextAnswer: boolean = false) {
    const currentResponse = this.response.find((res) => res.question === questionIndex);

    if (currentResponse) {
      if (isTextAnswer) {
        currentResponse.text_answer = optionId;
        currentResponse.answers = [];
      } else {
        currentResponse.answers = [optionId];
        currentResponse.text_answer = '';
      }
    } else {
      this.response = [
        ...this.response,
        {
          question: questionIndex,
          answers: isTextAnswer ? [] : [optionId],
          text_answer: isTextAnswer ? optionId : ''
        }
      ];
    }
  }
}
