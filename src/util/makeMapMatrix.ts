import { Map } from "./challenges";

export interface Params {
  map: Map;
  rows: number;
  columns: number;
}

export default function makeMapMatrix({ map, rows, columns }: Params) {
  const mapMatrix: string[][] = [];

  for (let row = 0; row < rows; row++) {
    mapMatrix[row] = [];
    mapMatrix[row].length = columns;
  }

  for (let row = 0; row < rows; row++)
    for (let column = 0; column < columns; column++) {
      const found = map.path.find((point) => point.x === column && point.y === row);
      mapMatrix[row][column] = found ? "path" : "extern";
    }

  if (map.start) mapMatrix[map.start.y][map.start.x] = "start";
  if (map.finish) mapMatrix[map.finish.y][map.finish.x] = "finish";

  return mapMatrix;
}
