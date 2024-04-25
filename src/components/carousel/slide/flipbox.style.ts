import { css } from 'lit';

export default css`
  @keyframes fadeIn {
    0% {
      opacity: 0.2;
    }
    100% {
      opacity: 1;
    }
  }

  .flip-box {
    width: 100%;
    background-color: transparent;
    height: 200px;
    border: 1px solid #f1f1f1;
    perspective: 1000px;
    animation: fadeIn 2s;
  }

  .flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .rotation {
    transform: rotateX(180deg);
  }

  .rotationBack {
    transform: rotateX(0deg);
  }

  .flip-box-front,
  .flip-box-back {
    position: absolute;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .flip-box-front {
    background-color: #bbb;
    color: black;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .flip-box-back {
    background-color: dodgerblue;
    color: white;
    transform: rotateY(180deg);
    text-align: center;
    align-item: center;
  }
`;
