import React from "react";
import Blockly from "blockly";

import checkFinish from "./checkFinish";
import hasCoordinate from "./hasCoordinate";
import { PlayerCoordinates } from "./getInitialPlayerCoordinates";
import { Map } from "./challenges";

export interface This {
  player: PlayerCoordinates;
  map: Map;
  workspace: Blockly.WorkspaceSvg | null;
  refresh: React.Dispatch<React.SetStateAction<object>>;
}

export interface ApiFunctions {
  forward(this: This): void;
  turnLeft(this: This): void;
  turnRight(this: This): void;
  notDone(this: This): boolean;
  isPathForward(this: This): boolean;
  isPathToLeft(this: This): boolean;
  isPathToRight(this: This): boolean;
  highlightBlock(this: This, id: string): void;
}

export function forward(this: This) {
  if (this.workspace) (this as any).workspace.lastExecutedFunction = "forward";

  const angle = Math.abs((this.player.angle % 360) + 360) % 360;
  const x = this.player.position.x;
  const y = this.player.position.y;
  const { columns, rows } = this.map.size;

  if (angle === 0 && x + 1 < columns) this.player.position.x++;
  else if (angle === 90 && y) this.player.position.y--;
  else if (angle === 180 && x) this.player.position.x--;
  else if (angle === 270 && y + 1 < rows) this.player.position.y++;

  this.refresh({});
}

export function turnLeft(this: This) {
  (this as any).workspace.lastExecutedFunction = "turnLeft";

  this.player.angle += 90;
  this.refresh({});
}

export function turnRight(this: This) {
  (this as any).workspace.lastExecutedFunction = "turnRight";

  this.player.angle -= 90;
  this.refresh({});
}

export function notDone(this: This) {
  (this as any).workspace.lastExecutedFunction = "notDone";

  return !checkFinish({ player: this.player, map: this.map });
}

function hasPathForward(angle: number, player: PlayerCoordinates, map: Map) {
  angle = Math.abs((angle % 360) + 360) % 360;
  const x = player.position.x;
  const y = player.position.y;
  const { columns, rows } = map.size;

  if (angle === 0) return x < columns - 1 && hasCoordinate({ x: x + 1, y }, map.path);
  if (angle === 90) return y > 0 && hasCoordinate({ x: x, y: y - 1 }, map.path);
  if (angle === 180) return x > 0 && hasCoordinate({ x: x - 1, y }, map.path);
  if (angle === 270) return y < rows - 1 && hasCoordinate({ x: x, y: y + 1 }, map.path);

  return false;
}

export function isPathForward(this: This) {
  (this as any).workspace.lastExecutedFunction = "isPathForward";

  return hasPathForward(this.player.angle, this.player, this.map);
}

export function isPathToLeft(this: This) {
  (this as any).workspace.lastExecutedFunction = "isPathToLeft";

  return hasPathForward(this.player.angle + 90, this.player, this.map);
}

export function isPathToRight(this: This) {
  (this as any).workspace.lastExecutedFunction = "isPathToRight";

  return hasPathForward(this.player.angle - 90, this.player, this.map);
}

export function highlightBlock(this: This, id: string) {
  (this as any).workspace.highlightBlock(id);
}

const functions: ApiFunctions = {
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
