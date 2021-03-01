import React, { useState, useEffect, useCallback, useMemo } from "react";

import "./styles.sass";

const player = {
  angle: 0,
  position: [0, 0],
};

export default function Game({ gameRef, map }) {
  const [mapWidth, setMapWidth] = useState(0);
  const [, setRefresh] = useState();

  useEffect(() => {
    if (!map.start) return;

    player.position[0] = map.start[0];
    player.position[1] = map.start[1];
  }, [map.start]);

  const refreshScreen = useCallback(() => {
    setRefresh({});
  }, [setRefresh]);

  const forward = useCallback(() => {
    console.log({ player });
    if (player.angle === 0 && player.position[0] + 1 < map.size.columns) player.position[0]++;
    else if (player.angle === 90 && player.position[1]) player.position[1]--;
    else if (player.angle === 180 && player.position[0]) player.position[0]--;
    else if (player.angle === 180 && player.position[1] + 1 < map.size.rows) player.position[1]++;

    refreshScreen();

    console.log(`exec: forward ${player.position}`);
  }, [refreshScreen, map.size]);

  const turnLeft = useCallback(() => {
    player.angle = (player.angle + 90) % 360;
    refreshScreen();
    console.log(`exec: turnLeft ${player.angle}`);
  }, [refreshScreen]);

  const turnRight = useCallback(() => {
    player.angle = (player.angle - 90 + 360) % 360;
    refreshScreen();
    console.log(`exec: turnRight ${player.angle}`);
  }, [refreshScreen]);

  const gameAPIList = useMemo(
    () => ({
      forward,
      turnLeft,
      turnRight,
    }),
    [forward, turnLeft, turnRight]
  );

  const interpreterInitHandler = useCallback(
    (interpreter, globalObject) => {
      Object.keys(gameAPIList).forEach((key) => {
        interpreter.setProperty(
          globalObject,
          key,
          interpreter.createNativeFunction(gameAPIList[key])
        );
      });
    },
    [gameAPIList]
  );

  useEffect(() => {
    gameRef.current = { interpreterInitHandler };
  }, [gameRef, interpreterInitHandler]);

  useEffect(() => {
    function updateMapWidth() {
      const { width } = window.getComputedStyle(document.querySelector(".game .map"));
      setMapWidth(parseInt(width) || 0);
    }

    updateMapWidth();

    window.addEventListener("resize", updateMapWidth);
    return () => window.removeEventListener("resize", updateMapWidth);
  }, [setMapWidth]);

  const mapMatrix = [];

  const mapMatrixRows = map.size && map.size.rows ? map.size.rows : 10;
  const mapMatrixColumns = map.size && map.size.columns ? map.size.columns : 10;

  for (let row = 0; row < mapMatrixRows; row++) {
    mapMatrix[row] = [];
    mapMatrix[row].length = mapMatrixColumns;
  }

  for (let row = 0; row < mapMatrixRows; row++)
    for (let column = 0; column < mapMatrixColumns; column++) {
      const found = map.path.find((point) => point[0] === column && point[1] === row);
      mapMatrix[row][column] = found ? "path" : "extern";
    }

  if (map.start) mapMatrix[map.start[1]][map.start[0]] = "start";
  if (map.finish) mapMatrix[map.finish[1]][map.finish[0]] = "finish";

  return (
    <div className="game">
      <div
        className="map"
        style={{ "--columns": mapMatrixColumns, "--rows": mapMatrixRows, "--map-width": mapWidth }}
      >
        {mapMatrix.map((row, index) => (
          <div key={`row-${index}`} className="row">
            {row.map((column, index) => (
              <div key={`column-${index}`} className={`column ${column}`}>
                {column === "finish" ? "⚐" : ""}
              </div>
            ))}
          </div>
        ))}
        <div
          className="player"
          style={{
            "--column": player.position[0],
            "--row": player.position[1],
            "--angle": -player.angle,
          }}
        >
          ➤
        </div>
      </div>
    </div>
  );
}
