export default function makeMapMatrix({ map, rows, columns }) {
  const mapMatrix = [];

  for (let row = 0; row < rows; row++) {
    mapMatrix[row] = [];
    mapMatrix[row].length = columns;
  }

  for (let row = 0; row < rows; row++)
    for (let column = 0; column < columns; column++) {
      const found = map.path.find((point) => point[0] === column && point[1] === row);
      mapMatrix[row][column] = found ? "path" : "extern";
    }

  if (map.start) mapMatrix[map.start[1]][map.start[0]] = "start";
  if (map.finish) mapMatrix[map.finish[1]][map.finish[0]] = "finish";

  return mapMatrix;
}
