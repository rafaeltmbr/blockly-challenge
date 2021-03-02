import React, { useState, useMemo, useRef, useEffect } from "react";
import BlocklyWidget from "./components/BlocklyWidget";
import Blockly from "blockly";

import "./App.sass";
import challenges from "./util/challenges";
import Game from "./components/Game";
import checkCollision from "./util/checkCollision";
import checkFinish from "./util/checkFinish";

function getPlayerInitialCoordinates(start) {
  const x = (Array.isArray(start) && start[0]) || 0;
  const y = (Array.isArray(start) && start[1]) || 0;

  return {
    angle: 0,
    position: [x, y],
  };
}

export default function App() {
  const [challengeIndex, setChallengeIndex] = useState(2);
  const [gameStatus, setGameStatus] = useState("stop");
  const blocklyWorkspaceRef = useRef(null);
  const gameRef = useRef(null);
  const player = useMemo(getPlayerInitialCoordinates, []);
  const simulationStatus = useMemo(() => ({ status: "stop" }), []);

  useEffect(() => {
    simulationStatus.status = gameStatus;
  }, [gameStatus, simulationStatus]);

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

    function endOfSimulation() {
      if (checkCollision({ player, map })) setGameStatus("collision");
      else if (checkFinish({ player, map })) setGameStatus("finish");
      else setGameStatus("fail");
    }

    simulationStatus.status = "running";
    setGameStatus("running");

    function nextStep() {
      if (simulationStatus.status !== "running") return;

      if (interpreter.step()) setTimeout(nextStep, 50);
      else endOfSimulation();
    }

    nextStep();
  }

  function handleStopResetClick() {
    Object.assign(player, getPlayerInitialCoordinates(challenges[challengeIndex].map.start));
    setGameStatus("stop");
  }

  function handleNextClick() {
    if (challengeIndex + 1 < challenges.length) {
      setChallengeIndex(challengeIndex + 1);
      Object.assign(player, getPlayerInitialCoordinates(challenges[challengeIndex].map.start));
      setGameStatus("stop");
    }
  }

  const buttonClickHandlers = {
    stop: handleRunClick,
    running: handleStopResetClick,
    collision: handleStopResetClick,
    fail: handleStopResetClick,
    finish: handleNextClick,
  };

  return (
    <div className="app">
      <div className="game-button-container">
        <Game
          gameRef={gameRef}
          gameStatus={gameStatus}
          onGameStatusChange={setGameStatus}
          map={map}
          player={player}
        />
        <button onClick={buttonClickHandlers[gameStatus]} className={`run-button ${gameStatus}`} />
      </div>
      <BlocklyWidget
        blocklyToolboxConfig={blocklyToolboxConfig}
        blocklyWorkspaceRef={blocklyWorkspaceRef}
      />
    </div>
  );
}
