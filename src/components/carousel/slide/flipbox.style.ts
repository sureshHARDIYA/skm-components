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

  *::slotted(div) {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .fullheight {
    height: 100%;
  }

  .flip-box {
    width: 100%;
    background-color: transparent;
    height: 300px;
    perspective: 1000px;
    animation: fadeIn 1s ease-out;
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
    color: #000;
    position: absolute;
    width: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    padding: 5rem;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);

    .slide-trigger {
      position: absolute;
      bottom: 7px;
      border: none;
      float: right;
      right: 10px;
      padding: 1rem;
      cursor: pointer;
      background: transparent;
    }
  }

  .flip-box-front {
    color: #000;
    background-color: #eaecee;
    color: black;
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .flip-box-back {
    transform: rotateX(180deg);
    text-align: center;
    align-item: center;
    background-color: #f5f6f7;
  }
`;
