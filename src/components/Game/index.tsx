import React, { useState, useEffect, useCallback } from "react";
import Blockly from "blockly";

import { Game, RemainingBlocksContainer } from "./styles";
import Map from "../Map";
import apiFunctions, { ApiFunctions } from "../../util/apiFunctions";
import checkCollision from "../../util/checkCollision";
import { Map as IMap } from "../../util/challenges";
import { PlayerCoordinates } from "../../util/getInitialPlayerCoordinates";
import { This } from "../../util/apiFunctions";

export enum GameStatus {
  Running,
  Stop,
  Collision,
  Fail,
  Finish,
}

export interface Props {
  gameRef: React.MutableRefObject<GameRef | null>;
  gameStatus: GameStatus;
  onGameStatusChange(status: GameStatus): void;
  map: IMap;
  player: PlayerCoordinates;
  blocklyWorkspaceRef: React.MutableRefObject<Blockly.WorkspaceSvg | null>;
  remainingBlocks: number;
}

export interface GameRef {
  interpreterInitHandler(interpreter: object, globalObject: object): void;
}

export default function Games({
  gameRef,
  gameStatus,
  onGameStatusChange,
  map,
  player,
  blocklyWorkspaceRef,
  remainingBlocks,
}: Props) {
  const [, setRefresh] = useState<object>({});

  useEffect(() => {
    if (!map.start) return;

    player.position.x = map.start.x;
    player.position.y = map.start.y;
  }, [map, player]);

  const refresh = useCallback(() => {
    if (checkCollision({ player, map })) {
      onGameStatusChange(GameStatus.Collision);
    }

    setRefresh({});
  }, [setRefresh, onGameStatusChange, player, map]);

  function interpreterInitHandler(interpreter: object, globalObject: object) {
    const that: This = {
      player,
      map,
      workspace: blocklyWorkspaceRef.current,
      refresh,
    };

    Object.keys(apiFunctions).forEach((key) => {
      (interpreter as any).setProperty(
        globalObject,
        key,
        (interpreter as any).createNativeFunction(
          apiFunctions[key as keyof ApiFunctions].bind(that)
        )
      );
    });
  }

  gameRef.current = { interpreterInitHandler };

  return (
    <Game className="game">
      <Map gameStatus={gameStatus} player={player} map={map} />
      {remainingBlocks !== Infinity && (
        <RemainingBlocksContainer>{`Remaining blocks: ${remainingBlocks}`}</RemainingBlocksContainer>
      )}
    </Game>
  );
}
