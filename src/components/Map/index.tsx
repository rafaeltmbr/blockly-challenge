import React, { useState, useEffect } from "react";

import { GameStatus } from "../Game";
import { Map as IMap } from "../../util/challenges";
import { PlayerCoordinates } from "../../util/getInitialPlayerCoordinates";
import makeMapMatrix from "../../util/makeMapMatrix";
import gameStatusToString from "../../util/gameStatusToString";
import "./styles.sass";

export interface Props {
  gameStatus: GameStatus;
  map: IMap;
  player: PlayerCoordinates;
}

export default function Map({ gameStatus, map, player }: Props) {
  const [mapWidth, setMapWidth] = useState(0);

  useEffect(() => {
    function updateMapWidth() {
      const mapElement = document.querySelector(".game .map");
      const { width } = mapElement ? window.getComputedStyle(mapElement) : { width: "0" };
      setMapWidth(parseInt(width || "0"));
    }

    updateMapWidth();

    window.addEventListener("resize", updateMapWidth);
    return () => window.removeEventListener("resize", updateMapWidth);
  }, [setMapWidth]);

  const rows = map.size && map.size.rows ? map.size.rows : 10;
  const columns = map.size && map.size.columns ? map.size.columns : 10;

  const mapMatrix = makeMapMatrix({ map, rows, columns });

  const mapStyle = {
    "--columns": columns,
    "--rows": rows,
    "--map-width": mapWidth,
  } as React.CSSProperties;

  const playerStyle = {
    "--column": player.position.x,
    "--row": player.position.y,
    "--angle": -player.angle,
  } as React.CSSProperties;

  return (
    <div className="map" style={mapStyle}>
      {mapMatrix.map((row, index) => (
        <div key={`row-${index}`} className="row">
          {row.map((column, index) => (
            <div key={`column-${index}`} className={`column ${column}`}>
              {column === "finish" ? "⚐" : ""}
            </div>
          ))}
        </div>
      ))}
      <div className={`player ${gameStatusToString(gameStatus)}`} style={playerStyle}>
        ➤
      </div>
    </div>
  );
}
