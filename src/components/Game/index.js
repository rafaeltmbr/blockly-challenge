import React, { useState, useEffect, useCallback } from "react";

import Map from "../Map";
import apiFunctions from "../../util/apiFunctions";
import checkCollision from "../../util/checkCollision";

import "./styles.sass";

export default function Game({ gameRef, gameStatus, onGameStatusChange, map, player }) {
  const [, setRefresh] = useState();

  useEffect(() => {
    if (!map.start) return;

    player.position[0] = map.start[0];
    player.position[1] = map.start[1];
  }, [map, player]);

  const refresh = useCallback(() => {
    if (checkCollision({ player, map })) {
      onGameStatusChange("collision");
    }

    setRefresh({});
  }, [setRefresh, onGameStatusChange, player, map]);

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
