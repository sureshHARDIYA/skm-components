import { html, LitElement } from 'lit';
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

const techniqueLabels: { [key: number]: string | number } = {
  2: 'Free Text',
  3: 'Survey'
};

@customElement('quiz-questions')
export class QuizQuestions extends LitElement {
  static readonly styles = [questionStyle];

  @property({ type: Array }) questions: any[] = [];
  @property({ type: Number }) totalQuestions = 0;
  @property({ type: Boolean, attribute: true }) isDisabled = false;

  @state() currentQuestionIndex = 0;
  @state() selectedOptions: { [key: number]: { optionId: string[] | string; isCorrect: boolean } } =
    {};
  @state() response: { question: number; answers: string[]; text_answer?: string }[] = [];
  @state() currentAnswer: string | null | undefined = null;

  render() {
    const currentQuestionIndex = this.currentQuestionIndex;
    const isLastQuestion = currentQuestionIndex === this.totalQuestions - 1;
    const currentQuestion = this.questions[currentQuestionIndex];
    const selectedOption = this.selectedOptions[currentQuestionIndex];
    const hasSelectedOption = selectedOption && Boolean(selectedOption.optionId);
    const allAnswersSelected = this.areAllAnswersSelected();

    const totalAnswers =
      techniqueLabels[currentQuestion.technique] ??
      `${
        currentQuestion.answer.filter((item: any) => item.is_correct_answer).length
      } correct answers`;

    return html`
      <div class="skm-quiz-outer-wrapper">
        <div class="meta-info">
          <div>
            <sl-badge>${this.totalQuestions} questions</sl-badge>
            <sl-badge>${totalAnswers}</sl-badge>
          </div>
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
                  ?disabled=${!hasSelectedOption || !allAnswersSelected}
                  @click=${this.handleNext}>
                  Next
                </button>`
              : html``}
            ${isLastQuestion
              ? html`<sl-button
                  variant="primary"
                  @click=${this.handleSubmit}
                  ?disabled=${!hasSelectedOption || !allAnswersSelected}
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
                .checked=${this.isOptionSelected(option.id)}
                .value=${option.id}
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
    const question = this.questions[this.currentQuestionIndex];
    const hasMultipleAnswers = question.technique === 1;

    if (hasMultipleAnswers) {
      const selectedOptionsForQuestion =
        this.selectedOptions[this.currentQuestionIndex]?.optionId || [];
      return selectedOptionsForQuestion.includes(optionId);
    }

    return this.selectedOptions[this.currentQuestionIndex]?.optionId === optionId;
  }

  areAllAnswersSelected() {
    const currentQuestion = this.questions[this.currentQuestionIndex];
    const hasMultipleAnswers = currentQuestion.technique === 1;

    if (hasMultipleAnswers) {
      const correctAnswers = currentQuestion.answer.filter((item: any) => item.is_correct_answer);
      const selectedOptions = this.selectedOptions[this.currentQuestionIndex]?.optionId || [];
      return selectedOptions.length === correctAnswers.length;
    }

    return true;
  }

  handleOptionClick(event: any) {
    const optionId = event.target.value;
    const questionId = this.questions[this.currentQuestionIndex].id;
    const isCorrect = this.questions[this.currentQuestionIndex].answer.find(
      (answer: any) => answer.id === optionId
    )?.is_correct_answer;

    this.updateSelectedOptions(questionId, optionId, isCorrect);
  }

  handleFreeTextChange(event: any) {
    const value = event.target.value;
    const questionId = this.questions[this.currentQuestionIndex].id;

    this.updateSelectedOptions(questionId, value, true);
  }

  updateSelectedOptions(questionId: number, optionId: string, isCorrect: boolean) {
    const hasMultipleAnswers = this.questions[this.currentQuestionIndex].technique === 1;

    if (hasMultipleAnswers) {
      const currentSelected: any = this.selectedOptions[this.currentQuestionIndex]?.optionId || [];
      const newSelected = currentSelected.includes(optionId)
        ? currentSelected.filter((id: string) => id !== optionId)
        : [...currentSelected, optionId];

      this.selectedOptions = {
        ...this.selectedOptions,
        [this.currentQuestionIndex]: { optionId: newSelected, isCorrect }
      };
      this.updateResponse(questionId, newSelected);
    } else {
      this.selectedOptions = {
        ...this.selectedOptions,
        [this.currentQuestionIndex]: { optionId, isCorrect }
      };
      this.updateResponse(questionId, optionId);
    }
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

  updateResponse(questionId: number, optionId: string | string[]) {
    const currentResponse = this.response.find((res) => res.question === questionId);
    const isFreeText = this.questions[this.currentQuestionIndex].technique === 2;
    const hasMultipleAnswers = this.questions[this.currentQuestionIndex].technique === 1;

    if (currentResponse) {
      if (isFreeText) {
        currentResponse.text_answer = optionId as string;
        currentResponse.answers = [];
      } else if (hasMultipleAnswers) {
        currentResponse.answers = optionId as string[];
      } else {
        currentResponse.answers = [optionId as string];
      }
    } else {
      this.response = [
        ...this.response,
        {
          question: questionId,
          answers: isFreeText
            ? []
            : hasMultipleAnswers
            ? (optionId as string[])
            : [optionId as string],
          ...(isFreeText && { text_answer: optionId as string })
        }
      ];
    }
  }
}
