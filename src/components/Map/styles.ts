import styled from "styled-components";

import { PlayerCoordinates } from "../../util/getInitialPlayerCoordinates";

interface ColumnProps {
  mapDimensions: MapDimensions;
}

interface MapDimensions {
  columns: number;
  rows: number;
  width: number;
}

export const Map = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.map.background};
  position: relative;
  user-select: none;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Column = styled.div<ColumnProps>`
  --columns: ${(props) => props.mapDimensions.columns};
  --rows: ${(props) => props.mapDimensions.rows};
  --map-width: ${(props) => props.mapDimensions.width};
  --color-extern: ${(props) => props.theme.colors.map.background};
  --color-path: ${(props) => props.theme.colors.map.path.background};
  --color-path-line: ${(props) => props.theme.colors.map.path.border};
  --square-size: calc((1px * var(--map-width) - 2rem) / var(--columns));

  width: calc(100% / var(--columns));
  height: var(--square-size);

  &.path,
  &.finish,
  &.start {
    background-color: var(--color-path);
    border-top: 1px solid var(--color-path-line);
    border-right: 1px solid var(--color-path-line);
  }

  &.extern {
    background-color: var(--color-extern);
  }

  &.finish {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: calc(var(--square-size) * 0.9);
    color: ${(props) => props.theme.colors.primary};
  }
`;

interface PlayerProps {
  coordinates: PlayerCoordinates;
  mapDimensions: MapDimensions;
}

export const Player = styled.div<PlayerProps>`
  width: calc(100% / var(--columns));
  height: var(--square-size);
  position: absolute;
  left: calc(var(--column) * var(--square-size) + 1rem);
  top: calc(var(--row) * var(--square-size) + 1rem);
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotateZ(calc(var(--angle) * -1deg));
  line-height: var(--square-size);
  overflow: hidden;

  --row: ${(props) => props.coordinates.position.y};
  --column: ${(props) => props.coordinates.position.x};
  --angle: ${(props) => props.coordinates.angle};
  --columns: ${(props) => props.mapDimensions.columns};
  --map-width: ${(props) => props.mapDimensions.width};
  --square-size: calc((1px * var(--map-width) - 2rem) / var(--columns));

  &.running {
    transition-duration: var(--animation-duration);
  }

  &.collision {
    color: ${(props) => props.theme.colors.player.collision};
  }

  &.finish {
    color: ${(props) => props.theme.colors.player.finish};
  }
`;
