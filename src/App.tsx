import React, { useState, useMemo, useRef, useEffect } from "react";
import BlocklyWidget from "./components/BlocklyWidget";
import Blockly from "blockly";

import "./App.sass";
import challenges from "./util/challenges";
import Game, { GameStatus, GameRef } from "./components/Game";
import PagingList from "./components/PagingList";
import checkCollision from "./util/checkCollision";
import checkFinish from "./util/checkFinish";
import getInitialPlayerCoordinates from "./util/getInitialPlayerCoordinates";
import gameStatusToString from "./util/gameStatusToString";

const instructionStepDelay = 500; // milliseconds

export default function App() {
  const [challengeIndex, setChallengeIndex] = useState<number>(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Stop);
  const [remainingBlocks, setRemainingBlocks] = useState<number>(Infinity);
  const blocklyWorkspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const gameRef = useRef<GameRef | null>(null);
  const player = useMemo(getInitialPlayerCoordinates, []);
  const simulationStatus = useMemo(() => ({ status: GameStatus.Stop }), []);

  useEffect(() => {
    simulationStatus.status = gameStatus;
  }, [gameStatus, simulationStatus]);

  useEffect(turnLastHighlightedBlockOff, [gameStatus]);

  const blocklyToolboxConfig = useMemo(() => {
    return challenges[challengeIndex].toolbox;
  }, [challengeIndex]);

  const blocklyConfig = useMemo(() => {
    return challenges[challengeIndex].blockly;
  }, [challengeIndex]);

  const map = useMemo(() => {
    return challenges[challengeIndex].map;
  }, [challengeIndex]);

  function turnLastHighlightedBlockOff() {
    if (blocklyWorkspaceRef.current) blocklyWorkspaceRef.current.highlightBlock("");
  }

  function needExecutionDelay() {
    if (!blocklyWorkspaceRef.current) return false;

    const delayedFunctions = ["forward", "turnLeft", "turnRight"];
    const found = delayedFunctions.find(
      (f) => f === (blocklyWorkspaceRef.current as any).lastExecutedFunction
    );
    (blocklyWorkspaceRef.current as any).lastExecutedFunction = "";
    return found;
  }

  function handleRunClick() {
    if (!blocklyWorkspaceRef.current || !gameRef.current) return;

    const code: string = (Blockly as any).JavaScript.workspaceToCode(blocklyWorkspaceRef.current);
    const interpreter = new (window as any).Interpreter(
      code,
      (gameRef.current as any).interpreterInitHandler
    );

    function endOfSimulation() {
      if (checkCollision({ player, map })) setGameStatus(GameStatus.Collision);
      else if (checkFinish({ player, map })) setGameStatus(GameStatus.Finish);
      else setGameStatus(GameStatus.Fail);
    }

    simulationStatus.status = GameStatus.Running;
    setGameStatus(GameStatus.Running);

    function nextStep() {
      if (simulationStatus.status !== GameStatus.Running) return;

      if (interpreter.step()) setTimeout(nextStep, needExecutionDelay() ? instructionStepDelay : 0);
      else endOfSimulation();
    }

    nextStep();
  }

  function handleStopResetClick() {
    Object.assign(player, getInitialPlayerCoordinates(challenges[challengeIndex].map.start));
    setGameStatus(GameStatus.Stop);
  }

  function handleNextClick() {
    if (challengeIndex + 1 < challenges.length) {
      setChallengeIndex(challengeIndex + 1);
      Object.assign(player, getInitialPlayerCoordinates(challenges[challengeIndex + 1].map.start));
      setGameStatus(GameStatus.Stop);
    }
  }

  function handlePagingClick(pageIndex: number) {
    setChallengeIndex(pageIndex - 1);
    Object.assign(player, getInitialPlayerCoordinates(challenges[pageIndex - 1].map.start));
    setGameStatus(GameStatus.Stop);
  }

  function handleButtonClick() {
    switch (gameStatus) {
      case GameStatus.Running:
        handleStopResetClick();
        break;
      case GameStatus.Stop:
        handleRunClick();
        break;
      case GameStatus.Collision:
        handleStopResetClick();
        break;
      case GameStatus.Fail:
        handleStopResetClick();
        break;
      case GameStatus.Finish:
        handleNextClick();
        break;
      default:
    }
  }

  return (
    <div className="app">
      <div className="game-button-container">
        <PagingList
          total={challenges.length}
          current={challengeIndex + 1}
          onChange={handlePagingClick}
        />
        <Game
          remainingBlocks={remainingBlocks}
          gameRef={gameRef}
          gameStatus={gameStatus}
          onGameStatusChange={setGameStatus}
          map={map}
          player={player}
          blocklyWorkspaceRef={blocklyWorkspaceRef}
        />
        <button
          onClick={handleButtonClick}
          className={`run-button ${gameStatusToString(gameStatus)}`}
        />
      </div>
      <BlocklyWidget
        setRemainingBlocks={setRemainingBlocks}
        blocklyToolboxConfig={blocklyToolboxConfig}
        blocklyConfig={blocklyConfig}
        blocklyWorkspaceRef={blocklyWorkspaceRef}
      />
    </div>
  );
}
