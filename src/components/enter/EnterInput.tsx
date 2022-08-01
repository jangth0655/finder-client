import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.input`
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid ${(props) => props.theme.color.main.xs};
  padding: ${(props) => props.theme.mp.sm};
  padding-left: ${(props) => props.theme.mp.md};
  margin-bottom: ${(props) => props.theme.mp.lg};
  box-shadow: ${(props) => props.theme.shadow.md};
  &:focus {
    border: 2px solid ${(props) => props.theme.color.main.sm};
  }
  &::placeholder {
    color: ${(props) => props.theme.color.main.sm};
  }
`;
const Label = styled.label`
  margin-bottom: ${(props) => props.theme.mp.sm};
  color: ${(props) => props.theme.color.main.base};
  font-weight: 600;
`;

type InputType = "text" | "password" | "number" | "email";

interface EnterInputProps {
  id: string;
  type?: InputType;
  placeholder: string;
  labelText: string;
}

const EnterInput: React.FC<EnterInputProps> = ({
  id,
  type,
  placeholder,
  labelText,
}) => {
  return (
    <>
      <InputBox>
        <Label htmlFor={id}>{labelText}</Label>
        <Input id={id} type={type} placeholder={placeholder} />
      </InputBox>
    </>
  );
};
export default EnterInput;
