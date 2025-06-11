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
    position: relative;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
  }

  .flip-box-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: left;
    transition: transform 0.8s ease;
    transform-style: preserve-3d;
    will-change: transform;
    backface-visibility: visible !important;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
    overflow: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
  }

  .flip-box-front {
    z-index: 2;
  }

  .flip-box-back {
    transform: rotateX(180deg);
    z-index: 1;
  }

  .slide-content {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 24px;
    margin-bottom: 24px;
    box-sizing: border-box;
    min-height: 0;

    -webkit-overflow-scrolling: touch;
    touch-action: pan-y;
    overscroll-behavior: contain;
    contain: layout style;
    will-change: scroll-position;
  }

  .slide-content::-webkit-scrollbar {
    width: 8px;
  }

  .slide-content::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 0;
  }

  .slot-wrapper::slotted(*) {
    display: block;
  }

  .slide-trigger {
    flex-shrink: 0;
    position: absolute;
    bottom: 7px;
    right: 10px;
    padding: 1rem;
    cursor: pointer;
    background: transparent;
    border: none;
    font-size: 14px;
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
