import { PlayerCoordinates } from "./getInitialPlayerCoordinates";
import { Map } from "./challenges";

export interface Params {
  player: PlayerCoordinates;
  map: Map;
}

export default function checkCollision({ player, map }: Params) {
  for (let i = 0; i < map.path.length; i++)
    if (map.path[i].x === player.position.x && map.path[i].y === player.position.y) return false;

  return true;
}
