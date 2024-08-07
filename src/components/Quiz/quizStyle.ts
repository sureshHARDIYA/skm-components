import { css } from 'lit';

export default css`
  sl-skeleton {
    height: 50px;
    margin-bottom: 10px;
  }

  sl-skeleton:nth-child(3) {
    height: 150px;
  }

  sl-skeleton::part(indicator) {
    border-radius: 0;
  }

  sl-dialog::part(body) {
    border-top: 1px solid #dadada;
    border-bottom: 1px solid #dadada;
  }

  .skm-quiz-container {
    display: flex;
    border: 1px solid #dadada;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;

    .quiz-title {
      font-size: 1.1rem;
      margin: 0;
    }

    .start-quiz {
      background-color: #1d3d6f;
      border: none;
      color: white;
      padding: 0 10px;
      font-weight: bold;
      height: 35px;
      display: inline-block;
      cursor: pointer;
      border-radius: 5px;
    }
  }
`;
