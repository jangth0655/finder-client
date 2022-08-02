import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Input = styled.input<{ hasError?: boolean }>`
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.color.active.lg : props.theme.color.main.sm};
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
  span {
    display: inline-block;
    color: ${(props) => props.theme.color.active.lg};
    font-size: ${(props) => props.theme.fontSize.xs};
    margin-left: ${(props) => props.theme.mp.xs};
  }
`;

type InputType = "text" | "password" | "email";

interface EnterInputProps {
  id: string;
  type?: InputType;
  placeholder: string;
  labelText: string;
  register?: UseFormRegisterReturn;
  hasError?: boolean;
  required?: boolean;
}

const EnterInput: React.FC<EnterInputProps> = ({
  id,
  type,
  placeholder,
  labelText,
  register,
  hasError,
  required,
}) => {
  return (
    <>
      <InputBox>
        <Label htmlFor={id}>
          {labelText}
          {required && <span>*</span>}
        </Label>
        <Input
          hasError={hasError}
          {...register}
          id={id}
          type={type}
          placeholder={placeholder}
        />
      </InputBox>
    </>
  );
};
export default EnterInput;
