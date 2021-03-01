import React, { useState, useMemo, useRef, useEffect } from "react";
import BlocklyWidget from "./components/BlocklyWidget";
import Blockly from "blockly";

import "./App.sass";
import challenges from "./challenges";

export default function App() {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const workspace = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      workspace.current.addChangeListener(() => {
        const code = Blockly.JavaScript.workspaceToCode(workspace.current);
        console.log(code);
      });
    }, 0);
  }, [workspace]);

  const toolboxConfig = useMemo(() => {
    return challenges[challengeIndex] && challenges[challengeIndex].toolbox;
  }, [challengeIndex]);

  return <BlocklyWidget toolboxConfig={toolboxConfig} workspaceRef={workspace} />;
}
