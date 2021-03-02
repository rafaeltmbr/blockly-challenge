import React, { useEffect, useState, useMemo, memo } from "react";
import Blockly from "blockly";

import "./styles.sass";

export default memo(function BlocklyWidget({ blocklyToolboxConfig, blocklyWorkspaceRef, style }) {
  const [workspace, setWorkspace] = useState(null);

  const blocks = blocklyToolboxConfig && blocklyToolboxConfig.blocks;

  useEffect(() => {
    window.Blockly = Blockly;
  });

  useEffect(() => {
    if (!blocks || !Array.isArray(blocks.custom)) return;

    blocks.custom.forEach((block) => {
      Blockly.Blocks[block.type] = {
        init: function () {
          this.jsonInit(block);
        },
      };

      Blockly.JavaScript[block.type] = block.generatorCallback;
    });
  }, [workspace, blocks]);

  const toolbox = useMemo(() => {
    if (!blocks || (!blocks.builtin && !blocks.custom)) return;

    const toolbox = {
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
    const workspace = Blockly.inject(document.querySelector(".blockly-div"), {
      toolbox,
      trashcan: true,
    });
    setWorkspace(workspace);

    return workspace.dispose.bind(workspace);
  }, [toolbox]);

  useEffect(() => {
    blocklyWorkspaceRef.current = workspace;
  }, [workspace, blocklyWorkspaceRef]);

  return <div className="blockly-div" style={style} />;
});
