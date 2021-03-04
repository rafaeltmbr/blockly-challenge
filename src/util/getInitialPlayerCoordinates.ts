import { MapPoint } from "./challenges";

export interface PlayerCoordinates {
  angle: number;
  position: MapPoint;
}

export default function getInitialPlayerCoordinates(start?: MapPoint): PlayerCoordinates {
  const x = start ? start.x : 0;
  const y = start ? start.y : 0;

  return {
    angle: 0,
    position: { x, y },
  };
}
