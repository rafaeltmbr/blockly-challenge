import React, { useState, useEffect, useCallback } from "react";

import Map from "../Map";
import apiFunctions from "../../util/apiFunctions";
import checkCollision from "../../util/checkCollision";
import checkFinish from "../../util/checkFinish";

import "./styles.sass";

export default function Game({
  gameRef,
  gameStatus,
  onGameStatusChange,
  map,
  player,
  onCollision,
  onFinish,
}) {
  const [, setRefresh] = useState();

  useEffect(() => {
    if (gameStatus === "collision") {
      onCollision && onCollision();
    } else if (gameStatus === "finish") {
      onFinish && onFinish();
    }
  }, [gameStatus, onCollision, onFinish]);

  useEffect(() => {
    if (!map.start) return;

    player.position[0] = map.start[0];
    player.position[1] = map.start[1];
  }, [map, player]);

  const refresh = useCallback(() => {
    if (checkCollision({ player, map })) {
      onGameStatusChange("collision");
    } else if (checkFinish({ player, map })) {
      onGameStatusChange("finish");
    }

    setRefresh({});
  }, [setRefresh]);

  function interpreterInitHandler(interpreter, globalObject) {
    const that = { player, map, refresh };
    Object.keys(apiFunctions).forEach((key) => {
      interpreter.setProperty(
        globalObject,
        key,
        interpreter.createNativeFunction(apiFunctions[key].bind(that))
      );
    });
  }

  gameRef.current = { interpreterInitHandler };

  return (
    <div className="game">
      <Map gameStatus={gameStatus} player={player} map={map} />
    </div>
  );
}
