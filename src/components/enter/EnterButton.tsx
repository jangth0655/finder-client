import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  color: ${(props) => props.theme.color.white};
  text-transform: uppercase;
  padding: ${(props) => props.theme.mp.sm};
  width: 100%;
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.lg};
  font-weight: 700;
  transition: ${(props) => props.theme.transition};
  box-shadow: ${(props) => props.theme.shadow.md};
  &:hover {
    background-color: ${(props) => props.theme.color.active.base};
  }
`;

interface EnterButtonProps {
  text: string;
  loading?: boolean;
}

const EnterButton: React.FC<EnterButtonProps> = ({ text, loading }) => {
  return <Button>Sign Up</Button>;
};
export default EnterButton;
