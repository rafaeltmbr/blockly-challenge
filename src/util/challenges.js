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
    blockly: {
      maxBlocks: 5,
    },
  },
  {
    toolbox: {
      blocks: {
        builtin: [],
        custom: [movementForward, movementRotate, controlsIfPath, controlsRepeatUntilReachEnd],
      },
    },
    map: {
      size: { rows: 20, columns: 20 },
      path: [
        [9, 10],
        [10, 10],
        [11, 10],
        [12, 10],
        [12, 9],
        [12, 8],
        [12, 7],
        [12, 6],
        [12, 5],
        [11, 5],
        [10, 5],
        [9, 5],
        [8, 5],
        [7, 5],
        [6, 5],
        [6, 6],
        [6, 7],
        [6, 8],
        [6, 9],
        [6, 10],
      ],
      start: [9, 10],
      finish: [6, 10],
    },
    blockly: {
      maxBlocks: 4,
    },
  },
  {
    toolbox: {
      blocks: {
        builtin: [],
        custom: [movementForward, movementRotate, controlsIfPath, controlsRepeatUntilReachEnd],
      },
    },
    map: {
      size: { rows: 20, columns: 20 },
      path: [
        [8, 10],
        [9, 10],
        [10, 10],
        [11, 10],
        [11, 9],
        [11, 8],
        [11, 7],
        [11, 6],
        [11, 5],
        [11, 4],
        [12, 4],
        [13, 4],
        [14, 4],
      ],
      start: [8, 10],
      finish: [14, 4],
    },
    blockly: {
      maxBlocks: 6,
    },
  },
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
    map: {
      size: { rows: 20, columns: 20 },
      path: [
        [10, 12],
        [11, 12],
        [12, 12],
        [13, 12],
        [13, 11],
        [13, 10],
        [13, 9],
        [13, 8],
        [13, 7],
        [13, 6],
        [13, 5],
        [13, 4],
        [12, 4],
        [11, 4],
        [10, 4],
        [9, 4],
        [8, 4],
        [7, 4],
        [6, 4],
        [5, 4],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],

        //little square
        [12, 6],
        [11, 6],
        [11, 5],

        //path to the right
        [8, 3],
        [8, 2],
        [8, 1],
        [9, 1],
        [10, 1],

        //path to the left
        [5, 5],
        [5, 6],
        [5, 7],
        [5, 8],
        [5, 9],
        [5, 10],
        [5, 11],
        [5, 12],
        [4, 10],
        [3, 10],
        [6, 10],
        [7, 10],
      ],
      start: [10, 12],
      finish: [1, 4],
    },
    blockly: {
      maxBlocks: 7,
    },
  },
];

export default challenges;
