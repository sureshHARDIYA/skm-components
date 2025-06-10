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
    justify-content: left;
    height: 100%;
    width: 90%;
    line-height: 22px;
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
    text-align: left;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    padding: 24px;
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
    display: flex;
    height: 100%;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    top: 0;
    left: 0;
    flex-direction: column;
    justify-content: left;
    padding: 24px;

    .slide-trigger {
      position: absolute;
      bottom: 7px;
      border: none;
      float: right;
      right: 10px;
      padding: 1rem;
      cursor: pointer;
      background: transparent;

      &:hover {
        color: green;
      }
    }
  }

  .flip-box-front {
    // color: #000;
    // background-color: #eaecee;
    // color: black;
    // display: flex;
    // justify-content: left;
    // width: 100%;
    // padding: 24px;
    // flex-direction: column;
    // align-items: left;
  }

  .flip-box-back {
    transform: rotateX(180deg);
    text-align: left;
    background-color: #f5f6f7;
    font-size: 16px;
  }

  .slide-header {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 22px;
    color: #022410;
    padding: 22px 0;
    display: flex;
    width: 100%;
  }
`;
