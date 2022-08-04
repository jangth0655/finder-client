import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const TextAreaBox = styled.div`
  margin-bottom: ${(props) => props.theme.mp.sm};
  width: 100%;
`;

const TextAreaLabel = styled.label`
  color: ${(props) => props.theme.color.main.base};
  font-weight: 600;
`;

const TextAreaInput = styled.textarea<{ hasError?: boolean }>`
  color: ${(props) => props.theme.color.main.base};
  outline: none;
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border: 1px solid
    ${(props) =>
      props.hasError ? props.theme.color.active.lg : props.theme.color.main.sm};
  padding: ${(props) => props.theme.mp.sm};
  margin-top: ${(props) => props.theme.mp.sm};
  box-shadow: ${(props) => props.theme.shadow.md};
  &:focus {
    border: 2px solid ${(props) => props.theme.color.main.sm};
  }
`;

interface TextAreaProps {
  label?: string;
  register?: UseFormRegisterReturn;
  hasError?: boolean;
}
const TextArea: React.FC<TextAreaProps> = ({ label, register, hasError }) => {
  return (
    <TextAreaBox>
      <TextAreaLabel>{label}</TextAreaLabel>
      <TextAreaInput hasError={hasError} {...register} rows={8} />
    </TextAreaBox>
  );
};
export default TextArea;
