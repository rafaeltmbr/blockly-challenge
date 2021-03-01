import React, { useState, useEffect, useCallback } from "react";

import Map from "../Map";
import apiFunctions from "../../util/apiFunctions";

import "./styles.sass";

export default function Game({ gameRef, map, player }) {
  const [, setRefresh] = useState();

  useEffect(() => {
    if (!map.start) return;

    player.position[0] = map.start[0];
    player.position[1] = map.start[1];
  }, [map, player]);

  const refreshScreen = useCallback(() => {
    setRefresh({});
  }, [setRefresh]);

  function interpreterInitHandler(interpreter, globalObject) {
    const that = { player, map, refreshScreen };
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
      <Map player={player} map={map} />
    </div>
  );
}
