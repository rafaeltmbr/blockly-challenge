import styled from "styled-components";

export const Game = styled.div`
  overflow-x: auto;
  background-color: ${(props) => props.theme.colors.game.background};
  border: 1px solid ${(props) => props.theme.colors.map.path};
  position: relative;

  --animation-duration: 250ms;
`;

export const RemainingBlocksContainer = styled.div`
  position: absolute;
  bottom: 0;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};
  text-shadow: 0 0 0.1rem rgba(0, 0, 0, 0.3);
  padding: 0.2rem;
`;
