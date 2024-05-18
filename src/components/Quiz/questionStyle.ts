import { css } from 'lit';

export default css`
  .question-wrapper {
    .question {
      background-color: #f6f6f6;
      margin-top: 10px;
      margin-bottom: 10px;
      padding: 1rem;
    }
    .answers {
      padding: 10px;
      background: #f6f6f6;
    }
    sl-radio {
      padding: 10px;

      &:hover {
        background: #f0f0f0;
      }
    }
    sl-radio:not(:last-child) {
      border-bottom: 1px solid #dadada;
    }

    .question-nav {
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;

      .next-button {
        background-color: var(--sl-color-neutral-0);
        border-color: var(--sl-color-neutral-300);
        color: var(--sl-color-neutral-700);
        border-style: solid;
        border-width: var(--sl-input-border-width);
        cursor: pointer;
        padding-left: var(--sl-spacing-large);
        padding-right: var(--sl-spacing-large);

        &:disabled {
          color: var(--sl-color-neutral-400);
          border-color: var(--sl-color-neutral-300);
        }

        &:hover:not(:disabled) {
          background-color: var(--sl-color-primary-50);
          border-color: var(--sl-color-primary-300);
          color: var(--sl-color-primary-700);
        }
      }
    }
  }
`;
