import React, { useState, useMemo, useRef, useEffect } from "react";
import BlocklyWidget from "./components/BlocklyWidget";
import Blockly from "blockly";

import "./App.sass";
import challenges from "./util/challenges";
import Game from "./components/Game";

export default function App() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const workspace = useRef(null);
  const game = useRef(null);
  const player = useMemo(
    () => ({
      angle: 0,
      position: [0, 0],
    }),
    []
  );

  const toolboxConfig = useMemo(() => {
    return challenges[challengeIndex] && challenges[challengeIndex].toolbox;
  }, [challengeIndex]);

  const map = useMemo(() => {
    return challenges[challengeIndex] && challenges[challengeIndex].map;
  }, [challengeIndex]);

  function handleRunClick() {
    if (!workspace.current) return;

    const code = Blockly.JavaScript.workspaceToCode(workspace.current);
    const interpreter = new window.Interpreter(
      code,
      game.current && game.current.interpreterInitHandler
    );

    function nextStep() {
      if (interpreter.step()) setTimeout(nextStep, 200);
    }

    nextStep();
  }

  return (
    <div className="app">
      <div className="game-button-container">
        <Game gameRef={game} map={map} player={player} />
        <button onClick={handleRunClick} className="run-button">
          Run
        </button>
      </div>
      <BlocklyWidget toolboxConfig={toolboxConfig} workspaceRef={workspace} />
    </div>
  );
}
