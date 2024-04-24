import { css } from 'lit';

export default css`

  @keyframes fadeIn {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
  }


  .body {
    background: #3e3e3e;
  }

  .container{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .carousel {
      position: relative;
      width: 100vw;
      height: 250px;
      border-radius: 3px;
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

        position: relative;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        display: flex;
        width: 100%;
  
        > .slide {
          min-width: 100%;
          animation: fadeIn 2s;
          position: relative;
          align-items: center;
          justify-content: center;
        }
  
        .text {
          color: red;
          z-index: 1000;
          font-size: 15px;
          padding: 8px 12px;
          position: absolute;
          bottom: 0px;
          width: 100%;
          text-align: center;
        }
      }
    }
  
    .dots {
      display: flex;
      justify-content: center;
      position: absolute;
      bottom: -20px;
  
      > .dot {
        cursor: pointer;
        background-color: #bbb;
        margin-left : 5px;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        border-radiu
        flex-grow: 1;
        margin-top: 10px;
        transition: background-color 0.6s ease;
  
        &.active {
          background: #717171;
        }
  
        :hover {
          background-color: #717171;
        }
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
