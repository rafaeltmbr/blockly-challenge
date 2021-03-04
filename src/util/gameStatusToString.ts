import { GameStatus } from "../components/Game";

export default function gameStatusToString(status: GameStatus) {
  switch (status) {
    case GameStatus.Running:
      return "running";
    case GameStatus.Stop:
      return "stop";
    case GameStatus.Collision:
      return "collision";
    case GameStatus.Fail:
      return "fail";
    case GameStatus.Finish:
      return "finish";
  }
}
