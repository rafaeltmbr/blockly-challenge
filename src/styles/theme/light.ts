import { DefaultTheme } from "styled-components";

const theme: DefaultTheme = {
  title: "light",

  colors: {
    primary: "#1542c7",
    secondary: "royalblue",
    text: "#ffffff",
    game: {
      background: "#f0f0ff",
    },
    map: {
      background: "#a1aaf8",
      path: {
        background: "#e2e4f7",
        border: "rgb(161, 170, 248, 0.4)",
      },
    },
    background: "#f5f5f5",
    player: {
      collision: "red",
      finish: "#00ff00",
    },
  },
};

export default theme;
