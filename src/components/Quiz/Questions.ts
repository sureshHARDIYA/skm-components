import { html, LitElement, PropertyValueMap } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';

import { API_ROOT } from './constants';
import { prepareHeaders } from './utils';
import questionStyle from './questionStyle';

@customElement('quiz-questions')
export class QuizQuestions extends LitElement {
  static readonly styles = [questionStyle];

  @property({ type: Array }) questions: any[] = [];
  @property({ type: Number }) totalQuestions = 0;
  @property({ type: Boolean, attribute: true }) isDisabled = false;

  @state() currentQuestionIndex = 0;
  @state() selectedOptions: { [key: number]: { optionId: string; isCorrect: boolean } } = {};
  @state() response: { question: number; answers: string[]; text_answer?: string }[] = [];
  @state() currentAnswer: string | null | undefined = null;

  render() {
    const currentQuestionIndex = this.currentQuestionIndex;

    const isLastQuestion = currentQuestionIndex === this.totalQuestions - 1;
    const currentQuestion = this.questions[currentQuestionIndex];
    const selectedOption = this.selectedOptions[currentQuestionIndex];
    const hasSelectedOption = selectedOption && Boolean(selectedOption.optionId);

    return html`
      <div class="skm-quiz-outer-wrapper">
        <div class="meta-info">
          <sl-badge>${this.totalQuestions} questions</sl-badge>
          <sl-badge variant="primary" pill pulse
            >${currentQuestionIndex + 1}/${this.totalQuestions}</sl-badge
          >
        </div>
        <div class="question-wrapper">
          <div class="question">${currentQuestion.title}</div>
          <div class="answers">${this.renderAnswerInput()}</div>
          <div class="question-nav">
            <button
              variant="default"
              class="previous-button"
              ?disabled=${currentQuestionIndex === 0}
              @click=${this.handlePrevious}>
              Previous
            </button>
            ${!isLastQuestion
              ? html`<button
                  class="next-button"
                  ?disabled=${!hasSelectedOption}
                  @click=${this.handleNext}>
                  Next
                </button>`
              : html``}
            ${isLastQuestion
              ? html`<sl-button
                  variant="primary"
                  @click=${this.handleSubmit}
                  ?disabled=${!hasSelectedOption}
                  >Submit</sl-button
                >`
              : html``}
          </div>
        </div>
        <div class="alert-toast">
          <sl-alert variant="success" duration="5000" closable>
            <strong>Your answers have been submitted successfully. </strong><br />
            You can safely close the dialog now.
          </sl-alert>
          <sl-alert variant="danger" closable duration="5000">
            <strong>Failed to submit your answers. </strong><br />
            Please try again later. Admin has been notified about this issue.
          </sl-alert>
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
                html` <sl-radio value=${option.id}> ${option.answer_text} </sl-radio> `
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
          autofocus
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

    const questionId = this.questions[this.currentQuestionIndex].id;

    const isCorrect = this.questions[this.currentQuestionIndex].answer.find(
      (answer: any) => answer.answer_text === optionId
    )?.is_correct_answer;

    this.updateSelectedOptions(questionId, optionId, isCorrect);
  }

  handleFreeTextChange(event: any) {
    const value = event.target.value;
    const questionId = this.questions[this.currentQuestionIndex].id;

    this.updateSelectedOptions(questionId, value, true);
  }

  updateSelectedOptions(questionId: number, optionId: string, isCorrect: boolean) {
    this.selectedOptions = {
      ...this.selectedOptions,
      [this.currentQuestionIndex]: { optionId, isCorrect }
    };
    this.updateResponse(questionId, optionId);
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

  async handleSubmit() {
    try {
      const activeQuizSession = localStorage.getItem('activeQuizSession');
      if (activeQuizSession) {
        const session = JSON.parse(activeQuizSession);
        const activeSessionId = session.activeSessionId;
        const sessionSlug = session.dataSlug;

        const headers = prepareHeaders();

        const response = await fetch(
          `${API_ROOT}v1/quizzes/${sessionSlug}/complete/${activeSessionId}/`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify(this.response)
          }
        );

        const container = this.shadowRoot?.querySelector('.alert-toast');

        if (response?.ok) {
          const alert = container?.querySelector(`sl-alert[variant="success"]`);
          (alert as any)?.toast();

          // Emit custom event to inform parent component to close the dialog after submission
          this.dispatchEvent(new CustomEvent('quiz-submitted', { bubbles: true, composed: true }));

          localStorage.removeItem('activeQuizSession');
        } else {
          const dangerAlert = container?.querySelector(`sl-alert[variant="danger"]`);
          (dangerAlert as any)?.toast();
        }
      }
    } catch (error) {
      console.error('Failed to parse active quiz session from localStorage:', error);
    }
  }

  updateResponse(questionId: number, optionId: string) {
    const currentResponse = this.response.find((res) => res.question === questionId);
    const isFreeText = this.questions[this.currentQuestionIndex].technique === 2;

    /** If already responsed */
    if (currentResponse) {
      if (isFreeText) {
        currentResponse.text_answer = optionId;
        currentResponse.answers = [];
      } else {
        currentResponse.answers = [optionId];
      }
    }

    if (!currentResponse) {
      this.response = [
        ...this.response,
        {
          question: questionId,
          answers: isFreeText ? [] : [optionId],
          ...(isFreeText && {
            text_answer: optionId
          })
        }
      ];
    }
  }
}
