import React, { useState, useEffect } from "react";

import { Map, Row, Column, Player } from "./styles";
import { GameStatus } from "../Game";
import { Map as IMap } from "../../util/challenges";
import { PlayerCoordinates } from "../../util/getInitialPlayerCoordinates";
import makeMapMatrix from "../../util/makeMapMatrix";
import gameStatusToString from "../../util/gameStatusToString";

export interface Props {
  gameStatus: GameStatus;
  map: IMap;
  player: PlayerCoordinates;
}

export default function Maps({ gameStatus, map, player }: Props) {
  const [mapWidth, setMapWidth] = useState(0);

  useEffect(() => {
    function updateMapWidth() {
      const mapElement = document.querySelector(".map");
      const { width } = mapElement ? window.getComputedStyle(mapElement) : { width: "0" };
      setMapWidth(parseInt(width || "0"));
    }

    updateMapWidth();

    window.addEventListener("resize", updateMapWidth);
    return () => window.removeEventListener("resize", updateMapWidth);
  }, [setMapWidth]);

  const rows = map.size.rows;
  const columns = map.size.columns;

  const mapMatrix = makeMapMatrix({ map, rows, columns });

  const mapDimensiosn = {
    columns: columns,
    rows: rows,
    width: mapWidth,
  };

  return (
    <Map className="map">
      {mapMatrix.map((row, index) => (
        <Row key={`row-${index}`}>
          {row.map((column, index) => (
            <Column
              mapDimensions={mapDimensiosn}
              key={`column-${index}`}
              className={`column ${column}`}
            >
              {column === "finish" ? "⚐" : ""}
            </Column>
          ))}
        </Row>
      ))}
      <Player
        mapDimensions={mapDimensiosn}
        coordinates={player}
        className={gameStatusToString(gameStatus)}
      >
        ➤
      </Player>
    </Map>
  );
}
