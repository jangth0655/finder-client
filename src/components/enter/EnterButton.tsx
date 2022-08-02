import styled from "styled-components";

const Button = styled.button<{ disabled?: boolean }>`
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
  opacity: ${(props) => (props.disabled ? "0.5" : "1")};
  &:hover {
    background-color: ${(props) => props.theme.color.active.base};
  }
`;

interface EnterButtonProps {
  text: string;
  loading?: boolean;
  disabled?: boolean;
}

const EnterButton: React.FC<EnterButtonProps> = ({
  text,
  loading,
  disabled,
}) => {
  return <Button disabled={disabled}>{loading ? "loading" : text}</Button>;
};
export default EnterButton;
