import React, { useState, useEffect } from "react";

import "./styles.sass";

export default function Map({ map, player }) {
  const [mapWidth, setMapWidth] = useState(0);

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
  );
}
