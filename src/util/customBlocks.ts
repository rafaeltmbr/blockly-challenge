// source: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#8wpthh
interface BlocklyArgs {
  type: string;
  name?: string;
  options?: Array<Array<string>>;
}

export interface BlocklyComponent {
  type: string;
  message0: string;
  args0?: BlocklyArgs[];
  inputsInline?: boolean;
  previousStatement: object | null;
  nextStatement: object | null;
  colour: number;
  tooltip: string;
  helpUrl: string;
  generatorCallback(block?: any): void;
}

export const movementForward: BlocklyComponent = {
  type: "movement_forward",
  message0: "forward",
  previousStatement: null,
  nextStatement: null,
  colour: 285,
  tooltip: "Moves one step forward",
  helpUrl: "",
  generatorCallback: () => "forward();\n",
};

// source: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#83j9gt
export const movementRotate: BlocklyComponent = {
  type: "movement_rotate",
  message0: "turn %1 %2",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "field_dropdown",
      name: "direction",
      options: [
        ["left ↺", "L"],
        ["right ↻", "R"],
      ],
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 285,
  tooltip: "Turn to the specified direction",
  helpUrl: "",
  generatorCallback: (block) =>
    block.getFieldValue("direction") === "L" ? "turnLeft();\n" : "turnRight();\n",
};

// source: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#m5x4ff
export const controlsIfPath: BlocklyComponent = {
  type: "controls_if_path",
  message0: "if path %1 %2 %3 do %4",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "field_dropdown",
      name: "direction",
      options: [
        ["ahead", "A"],
        ["to the left ↺", "L"],
        ["to the right ↻", "R"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "statement",
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 210,
  tooltip: "Execute the 'do' statement if is possible to go to the specified direction",
  helpUrl: "",
  generatorCallback: (block) => {
    const direction = block.getFieldValue("direction");
    const condition =
      direction === "A"
        ? "isPathForward()"
        : direction === "L"
        ? "isPathToLeft()"
        : "isPathToRight()";

    return `if (${condition}) {
  ${(window as any).Blockly.JavaScript.statementToCode(block, "statement") || ""}
}`;
  },
};

// source: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#buty92
export const controlsIfElsePath: BlocklyComponent = {
  type: "controls_if_else_path",
  message0: "if path %1 %2 %3 do %4 else %5",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "field_dropdown",
      name: "direction",
      options: [
        ["ahead", "A"],
        ["to the left ↺", "L"],
        ["to the right ↻", "R"],
      ],
    },
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "truthy_statement",
    },
    {
      type: "input_statement",
      name: "falsy_statement",
    },
  ],
  inputsInline: true,
  previousStatement: null,
  nextStatement: null,
  colour: 210,
  tooltip:
    "Execute the 'do' statement if is possible to go to the specified direction. Otherwise, it executes the 'else' statement.",
  helpUrl: "",
  generatorCallback: (block) => {
    const direction = block.getFieldValue("direction");
    const condition =
      direction === "A"
        ? "isPathForward()"
        : direction === "L"
        ? "isPathToLeft()"
        : "isPathToRight()";

    return `if (${condition}) {
  ${(window as any).Blockly.JavaScript.statementToCode(block, "truthy_statement") || ""}
} else {
  ${(window as any).Blockly.JavaScript.statementToCode(block, "falsy_statement") || ""}
}`;
  },
};

// source: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#9ag263
export const controlsRepeatUntilReachEnd: BlocklyComponent = {
  type: "controls_repeat_until_reach_end",
  message0: "repeat until ⚐ %1 do %2",
  args0: [
    {
      type: "input_dummy",
    },
    {
      type: "input_statement",
      name: "statement",
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 120,
  tooltip: "Repeat the inside code until end is reached",
  helpUrl: "",
  generatorCallback: (block) => `while (notDone()) {
  ${(window as any).Blockly.JavaScript.statementToCode(block, "statement") || ""}
}`,
};

const customBlocks = {
  movementForward,
  movementRotate,
  controlsIfPath,
  controlsIfElsePath,
  controlsRepeatUntilReachEnd,
};

export default customBlocks;
