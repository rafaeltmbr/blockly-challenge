import React, { useState, useEffect } from "react";

import makeMapMatrix from "../../util/makeMapMatrix";
import "./styles.sass";

export default function Map({ gameStatus, map, player }) {
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

  const rows = map.size && map.size.rows ? map.size.rows : 10;
  const columns = map.size && map.size.columns ? map.size.columns : 10;

  const mapMatrix = makeMapMatrix({ map, rows, columns });

  return (
    <div className="map" style={{ "--columns": columns, "--rows": rows, "--map-width": mapWidth }}>
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
        className={`player ${gameStatus || ""}`}
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
