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
    }
  }
`;
