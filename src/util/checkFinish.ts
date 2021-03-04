import { PlayerCoordinates } from "./getInitialPlayerCoordinates";
import { Map } from "./challenges";

export interface Params {
  player: PlayerCoordinates;
  map: Map;
}

export default function checkFinish({ player, map }: Params) {
  return player.position.x === map.finish.x && player.position.y === map.finish.y;
}
