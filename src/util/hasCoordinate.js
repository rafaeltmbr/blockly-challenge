export default function hasCoordinate([x, y], list) {
  if (!Array.isArray(list)) return false;

  return list.find((e) => e[0] === x && e[1] === y);
}
