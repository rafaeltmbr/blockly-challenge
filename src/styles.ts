import styled, { createGlobalStyle } from "styled-components";

export const App = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100%;
  padding: 1rem;
`;

export const GameButtonContainer = styled.div`
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding-right: 1rem;
  flex: 1;
  max-width: calc(100vh - 9rem);
`;

export const Button = styled.button`
  border: none;
  background-color: royalblue;
  color: white;
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  outline: none;
  user-select: none;
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.5);

  &::before {
    content: "Run";
  }

  &.running {
    background-color: #6387f3;
    &::before {
      content: "Restart";
    }
  }

  &.collision,
  &.fail {
    &::before {
      content: "Restart";
    }
  }

  &.finish {
    &::before {
      content: "Next";
    }
  }
`;

export const AppGlobal = createGlobalStyle`
  .blockly-div {
    flex: 1;
    height: calc(100vh - 2rem);
  }

  .game-button-container ul {
    margin-bottom: 1rem;
  }

  .game-button-container .game {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 700px) {
    .app {
      flex-direction: column;
      padding: 0.5rem;
    }

    .game-button-container {
      width: 100%;
      padding-right: 0;
    }

    .game, .paging-list {
      margin-bottom: 0.5rem;
    }

    .blockly-div {
      width: 100%;
      height: 70vh;
      margin-top: 0.5rem;
    }
  }
`;
