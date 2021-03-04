import {
  movementForward,
  movementRotate,
  controlsIfPath,
  controlsIfElsePath,
  controlsRepeatUntilReachEnd,
  BlocklyComponent,
} from "./customBlocks";

export interface Challenge {
  toolbox: ToolboxConfig;
  map: Map;
  blockly: IBlockly;
}

export interface ToolboxConfig {
  blocks: {
    builtin?: string[];
    custom?: BlocklyComponent[];
  };
}

export interface Map {
  size: {
    rows: number;
    columns: number;
  };
  path: MapPoint[];
  start: MapPoint;
  finish: MapPoint;
}

export interface MapPoint {
  x: number; // x axis coordinate from the left
  y: number; // y axis coordinate from the top
}

export interface IBlockly {
  maxBlocks?: number;
}

const challenges: Challenge[] = [
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
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 10 },
      ],
      start: { x: 9, y: 10 },
      finish: { x: 11, y: 10 },
    },
    blockly: {},
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
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 10 },
        { x: 11, y: 9 },
        { x: 11, y: 8 },
        { x: 11, y: 7 },
        { x: 11, y: 6 },
        { x: 11, y: 5 },
      ],
      start: { x: 9, y: 10 },
      finish: { x: 11, y: 5 },
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
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 10 },
        { x: 12, y: 10 },
        { x: 12, y: 9 },
        { x: 12, y: 8 },
        { x: 12, y: 7 },
        { x: 12, y: 6 },
        { x: 12, y: 5 },
        { x: 11, y: 5 },
        { x: 10, y: 5 },
        { x: 9, y: 5 },
        { x: 8, y: 5 },
        { x: 7, y: 5 },
        { x: 6, y: 5 },
        { x: 6, y: 6 },
        { x: 6, y: 7 },
        { x: 6, y: 8 },
        { x: 6, y: 9 },
        { x: 6, y: 10 },
      ],
      start: { x: 9, y: 10 },
      finish: { x: 6, y: 10 },
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
        { x: 8, y: 10 },
        { x: 9, y: 10 },
        { x: 10, y: 10 },
        { x: 11, y: 10 },
        { x: 11, y: 9 },
        { x: 11, y: 8 },
        { x: 11, y: 7 },
        { x: 11, y: 6 },
        { x: 11, y: 5 },
        { x: 11, y: 4 },
        { x: 12, y: 4 },
        { x: 13, y: 4 },
        { x: 14, y: 4 },
      ],
      start: { x: 8, y: 10 },
      finish: { x: 14, y: 4 },
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
        { x: 10, y: 12 },
        { x: 11, y: 12 },
        { x: 12, y: 12 },
        { x: 13, y: 12 },
        { x: 13, y: 11 },
        { x: 13, y: 10 },
        { x: 13, y: 9 },
        { x: 13, y: 8 },
        { x: 13, y: 7 },
        { x: 13, y: 6 },
        { x: 13, y: 5 },
        { x: 13, y: 4 },
        { x: 12, y: 4 },
        { x: 11, y: 4 },
        { x: 10, y: 4 },
        { x: 9, y: 4 },
        { x: 8, y: 4 },
        { x: 7, y: 4 },
        { x: 6, y: 4 },
        { x: 5, y: 4 },
        { x: 4, y: 4 },
        { x: 3, y: 4 },
        { x: 2, y: 4 },
        { x: 1, y: 4 },

        //little quare y:
        { x: 12, y: 6 },
        { x: 11, y: 6 },
        { x: 11, y: 5 },

        //path to the right
        { x: 8, y: 3 },
        { x: 8, y: 2 },
        { x: 8, y: 1 },
        { x: 9, y: 1 },
        { x: 10, y: 1 },

        //path to the left
        { x: 5, y: 5 },
        { x: 5, y: 6 },
        { x: 5, y: 7 },
        { x: 5, y: 8 },
        { x: 5, y: 9 },
        { x: 5, y: 10 },
        { x: 5, y: 11 },
        { x: 5, y: 12 },
        { x: 4, y: 10 },
        { x: 3, y: 10 },
        { x: 6, y: 10 },
        { x: 7, y: 10 },
      ],
      start: { x: 10, y: 12 },
      finish: { x: 1, y: 4 },
    },
    blockly: {
      maxBlocks: 7,
    },
  },
];

export default challenges;
