import React, { useEffect, useState, useMemo, memo } from "react";
import Blockly from "blockly";

import "./styles.sass";

import { IBlockly, ToolboxConfig } from "../../util/challenges";
import { BlocklyComponent } from "../../util/customBlocks";

export interface Props {
  blocklyConfig: IBlockly;
  blocklyToolboxConfig: ToolboxConfig;
  blocklyWorkspaceRef: React.MutableRefObject<Blockly.WorkspaceSvg | null>;
  setRemainingBlocks: React.Dispatch<React.SetStateAction<number>>;
  style?: React.CSSProperties;
}

export interface Toolbox {
  kind: string;
  contents: {
    kind: string;
    type: BlocklyComponent | string;
  }[];
}

export default memo(function BlocklyWidget({
  blocklyConfig,
  blocklyToolboxConfig,
  blocklyWorkspaceRef,
  setRemainingBlocks,
  style,
}: Props) {
  const [workspace, setWorkspace] = useState<Blockly.WorkspaceSvg | null>(null);

  const blocks = blocklyToolboxConfig.blocks;

  useEffect(() => {
    window.Blockly = Blockly;
  }, []);

  useEffect(() => {
    if (!blocks.custom) return;

    blocks.custom.forEach((block) => {
      Blockly.Blocks[block.type] = {
        init: function () {
          (this as any).jsonInit(block);
        },
      };

      (Blockly as any).JavaScript[block.type] = block.generatorCallback;
    });
  }, [workspace, blocks]);

  useEffect(() => {
    if (!workspace) return;

    workspace.addChangeListener(() => {
      setRemainingBlocks(workspace.remainingCapacity());
    });

    setRemainingBlocks(workspace.remainingCapacity());
  }, [workspace, setRemainingBlocks]);

  const toolbox: Toolbox = useMemo(() => {
    if (!blocks.builtin && !blocks.custom) return { kind: "", contents: [] };

    const toolbox: Toolbox = {
      kind: "flyoutToolbox",
      contents: [],
    };

    if (blocks.builtin && Array.isArray(blocks.builtin))
      blocks.builtin.forEach((type) => toolbox.contents.push({ kind: "block", type }));

    if (blocks.custom && Array.isArray(blocks.custom))
      blocks.custom.forEach(({ type }) => toolbox.contents.push({ kind: "block", type }));

    return toolbox;
  }, [blocks]);

  useEffect(() => {
    const config: Blockly.BlocklyOptions = {
      ...(blocklyConfig || {}),
      toolbox: (toolbox as unknown) as HTMLElement,
      trashcan: true,
    };
    const blocklyDiv = document.querySelector(".blockly-div");

    if (!blocklyDiv) return;
    const workspace = Blockly.inject(blocklyDiv, config);
    setWorkspace(workspace);

    (Blockly as any).JavaScript.STATEMENT_PREFIX = "highlightBlock(%1);\n";
    (Blockly as any).JavaScript.addReservedWords("highlightBlock");

    return workspace.dispose.bind(workspace);
  }, [toolbox, blocklyConfig]);

  useEffect(() => {
    blocklyWorkspaceRef.current = workspace;
  }, [workspace, blocklyWorkspaceRef]);

  return <div className="blockly-div" style={style} />;
});
