import { css } from 'lit';

export default css`

  @keyframes fadeIn {
    0% { opacity: 0.2; }
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
        top: 45%;
        left: 0;
        justify-content: space-between;
        width: 100%;
        transition: all ease 0.5s;
  
        .control {
          margin: 0 20px;
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
        align-items: center;
        justify-content: center;
        animation:  fadeIn 2s;

        > ::slotted(skm-flip-slide) {
          cursor: pointer;
          width: 100%;
          position: relative;
          align-items: center;
          justify-content: center;
          display: none;
          animation:  fadeIn 2s;
        }

        ::slotted(skm-flip-slide[selected="true"]) {
          display: block; 
        }

        ::slotted(skm-flip-slide[selected="false"]) {
          display: none;
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
`;
