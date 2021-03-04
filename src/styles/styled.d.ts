import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      game: {
        background: string;
      };
      map: {
        background: string;
        path: {
          background: string;
          border: string;
        };
      };
      player: {
        collision: string;
        finish: string;
      };
    };
  }
}
