import styled from "styled-components";

export const PagingList = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const PagingItem = styled.li`
  list-style: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  background-color: ${(props) => props.theme.colors.secondary};
  color: white;
  margin-right: 1rem;
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.3);

  &:last-child {
    margin-right: 0;
  }

  &[data-selected="true"] {
    pointer-events: none;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;
