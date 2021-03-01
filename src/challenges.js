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
        custom: [movementForward, movementRotate],
      },
    },
    map: {
      size: { rows: 20, columns: 20 },
      path: [
        [9, 10],
        [10, 10],
        [11, 10],
      ],
      start: [9, 10],
      finish: [11, 10],
    },
  },
];

export default challenges;
