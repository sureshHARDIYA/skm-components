import { css } from 'lit';

export default css`
  .body {
    background: #3e3e3e;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .carousel {
    width: 100vw;
    height: 250px;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);

    &:hover .controls {
      opacity: 1;
    }

    .controls {
      opacity: 0;
      display: flex;
      position: absolute;
      top: 50%;
      left: 0;
      justify-content: space-between;
      width: 100%;
      z-index: 99999;
      transition: all ease 0.5s;

      .control {
        margin: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.7);
        opacity: 0.5;
        transition: ease 0.3s;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    .slides {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      display: flex;
      width: 100%;
      transition: 1s ease-in-out all;

      > .slide {
        min-width: 100%;
        min-height: 250px;
        height: auto;
      }
    }
  }

  .dots {
    display: flex;
    justify-content: center;
    z-index: 1000000;
    > .dot {
      background: #fff;
      height: 0.5vw;
      flex-grow: 1;
      margin-top: 10px;
      &.active {
        background: red;
      }
    }
  }

  .block {
    display: block;
  }

  .disappear {
    display: none;
  }
`;
