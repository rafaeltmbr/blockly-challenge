import checkFinish from "./checkFinish";
import hasCoordinate from "./hasCoordinate";

export function forward() {
  this.workspace.lastExecutedFunction = "forward";

  const angle = Math.abs((this.player.angle % 360) + 360) % 360;
  const x = this.player.position[0];
  const y = this.player.position[1];
  const { columns, rows } = this.map.size;

  if (angle === 0 && x + 1 < columns) this.player.position[0]++;
  else if (angle === 90 && y) this.player.position[1]--;
  else if (angle === 180 && x) this.player.position[0]--;
  else if (angle === 270 && y + 1 < rows) this.player.position[1]++;

  this.refresh();
}

export function turnLeft() {
  this.workspace.lastExecutedFunction = "turnLeft";

  this.player.angle += 90;
  this.refresh();
}

export function turnRight() {
  this.workspace.lastExecutedFunction = "turnRight";

  this.player.angle -= 90;
  this.refresh();
}

export function notDone() {
  this.workspace.lastExecutedFunction = "notDone";

  return !checkFinish({ player: this.player, map: this.map });
}

function hasPathForward(angle, player, map) {
  angle = Math.abs((angle % 360) + 360) % 360;
  const x = player.position[0];
  const y = player.position[1];
  const { columns, rows } = map.size;

  if (angle === 0) return x < columns - 1 && hasCoordinate([x + 1, y], map.path);
  if (angle === 90) return y > 0 && hasCoordinate([x, y - 1], map.path);
  if (angle === 180) return x > 0 && hasCoordinate([x - 1, y], map.path);
  if (angle === 270) return y < rows - 1 && hasCoordinate([x, y + 1], map.path);

  return false;
}

export function isPathForward() {
  this.workspace.lastExecutedFunction = "isPathForward";

  return hasPathForward(this.player.angle, this.player, this.map);
}

export function isPathToLeft() {
  this.workspace.lastExecutedFunction = "isPathToLeft";

  return hasPathForward(this.player.angle + 90, this.player, this.map);
}

export function isPathToRight() {
  this.workspace.lastExecutedFunction = "isPathToRight";

  return hasPathForward(this.player.angle - 90, this.player, this.map);
}

export function highlightBlock(id) {
  this.workspace.highlightBlock(id);
}

const functions = {
  forward,
  turnLeft,
  turnRight,
  notDone,
  isPathForward,
  isPathToLeft,
  isPathToRight,
  highlightBlock,
};

export default functions;
