import { css } from 'lit';

export default css`
  .skm-quiz-container {
    width: 100%;
    display: flex;
    border: 1px solid #dadada;
    padding: 10px;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    margin-top: 1rem;

    .quiz-title {
      font-size: 1.2rem;
      margin: 0;
    }

    .start-quiz {
      background-color: #4caf50;
      border: none;
      color: white;
      padding: 0 10px;
      font-weight: bold;
      height: 35px;
      display: inline-block;
      cursor: pointer;
      border-radius: 10px;
    }
  }
`;
