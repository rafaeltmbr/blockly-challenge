import checkFinish from "./checkFinish";

export function forward() {
  const angle = Math.abs(this.player.angle + 360) % 360;

  if (angle === 0 && this.player.position[0] + 1 < this.map.size.columns) this.player.position[0]++;
  else if (angle === 90 && this.player.position[1]) this.player.position[1]--;
  else if (angle === 180 && this.player.position[0]) this.player.position[0]--;
  else if (angle === 270 && this.player.position[1] + 1 < this.map.size.rows)
    this.player.position[1]++;

  this.refresh();
}

export function turnLeft() {
  this.player.angle += 90;
  this.refresh();
}

export function turnRight() {
  this.player.angle -= 90;
  this.refresh();
}

export function notDone() {
  return !checkFinish({ player: this.player, map: this.map });
}

const functions = {
  forward,
  turnLeft,
  turnRight,
  notDone,
};

export default functions;
