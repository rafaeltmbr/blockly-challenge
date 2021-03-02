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
  {
    toolbox: {
      blocks: {
        builtin: [],
        custom: [movementForward, movementRotate, controlsRepeatUntilReachEnd],
      },
    },
    map: {
      size: { rows: 20, columns: 20 },
      path: [
        [9, 10],
        [10, 10],
        [11, 10],
        [11, 9],
        [11, 8],
        [11, 7],
        [11, 6],
        [11, 5],
      ],
      start: [9, 10],
      finish: [11, 5],
    },
  },
];

export default challenges;
