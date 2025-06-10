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
    height: 300px;
    perspective: 1000px;
    animation: fadeIn 1s ease-out;
  }

  .flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
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
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .flip-box-back {
    transform: rotateX(180deg);
    text-align: left;
    background-color: #919eab14;
    font-size: 16px;
  }

  .slide-content {
    overflow-y: auto;
    padding: 24px;
    max-height: 100%;
    box-sizing: border-box;
  }

  .slide-content::-webkit-scrollbar {
    width: 8px;
  }

  .slide-content::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  .slide-trigger {
    position: absolute;
    bottom: 7px;
    right: 10px;
    padding: 1rem;
    cursor: pointer;
    background: transparent;
    border: none;
    font-size: 14px;
    color: #0b3d25;
  }

  .slide-trigger:hover {
    color: green;
  }

  .slide-header {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    padding: 24px 0;
    width: 100%;
  }
`;
