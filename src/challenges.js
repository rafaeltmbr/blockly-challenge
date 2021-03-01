import {
  movementForward,
  movementRotate,
  controlsIfPath,
  controlsIfElsePath,
  controlsRepeatUntilReachEnd,
} from "./customBlocks";

const challenges = [
  {
    toolbox: {
      blocks: {
        builtin: [],
        custom: [
          movementForward,
          movementRotate,
          controlsIfPath,
          controlsIfElsePath,
          controlsRepeatUntilReachEnd,
        ],
      },
    },
  },
];

export default challenges;
