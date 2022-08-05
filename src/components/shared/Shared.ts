import styled from "styled-components";

export const SmallBurtton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.mp.sm};
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: ${(props) => props.theme.transition};
  color: white;
  width: 100%;
  margin: auto;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: ${(props) => props.theme.color.active.base};
  }
`;

export const Border = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.color.active.sm};
  margin-top: ${(props) => props.theme.mp.md};
  margin-bottom: ${(props) => props.theme.mp.xxl};
`;
