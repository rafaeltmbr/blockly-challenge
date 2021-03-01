import React, { useState, useMemo, useRef, useEffect } from "react";
import BlocklyWidget from "./components/BlocklyWidget";
import Blockly from "blockly";

import "./App.sass";
import challenges from "./challenges";
import Game from "./components/Game";

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

  const map = useMemo(() => {
    return challenges[challengeIndex] && challenges[challengeIndex].map;
  }, [challengeIndex]);

  return (
    <div className="app">
      <div className="game-button-container">
        <Game map={map} />
        <button className="run-button">Run</button>
      </div>
      <BlocklyWidget toolboxConfig={toolboxConfig} workspaceRef={workspace} />
    </div>
  );
}
