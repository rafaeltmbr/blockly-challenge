import React, { useState, useMemo, useRef } from "react";
import BlocklyWidget from "./components/BlocklyWidget";
import Blockly from "blockly";

import "./App.sass";
import challenges from "./util/challenges";
import Game from "./components/Game";

const playerInitialCoordinate = {
  angle: 0,
  position: [0, 0],
};

export default function App() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState("");
  const blocklyWorkspaceRef = useRef(null);
  const gameRef = useRef(null);
  const player = useMemo(() => playerInitialCoordinate, []);

  const blocklyToolboxConfig = useMemo(() => {
    return challenges[challengeIndex] && challenges[challengeIndex].toolbox;
  }, [challengeIndex]);

  const map = useMemo(() => {
    return challenges[challengeIndex] && challenges[challengeIndex].map;
  }, [challengeIndex]);

  function handleRunClick() {
    if (!blocklyWorkspaceRef.current) return;

    const code = Blockly.JavaScript.workspaceToCode(blocklyWorkspaceRef.current);
    const interpreter = new window.Interpreter(
      code,
      gameRef.current && gameRef.current.interpreterInitHandler
    );

    function nextStep() {
      if (interpreter.step()) setTimeout(nextStep, 200);
    }

    nextStep();
  }

  function handleCollision() {
    console.log("COLLISION");
  }

  function handleFinish() {
    console.log("FINISH");
  }

  return (
    <div className="app">
      <div className="game-button-container">
        <Game
          gameRef={gameRef}
          gameStatus={gameStatus}
          onGameStatusChange={setGameStatus}
          map={map}
          player={player}
          onCollision={handleCollision}
          onFinish={handleFinish}
        />
        <button onClick={handleRunClick} className="run-button">
          Run
        </button>
      </div>
      <BlocklyWidget
        blocklyToolboxConfig={blocklyToolboxConfig}
        blocklyWorkspaceRef={blocklyWorkspaceRef}
      />
    </div>
  );
}
