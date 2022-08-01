import styled from "styled-components";

const TextAreaBox = styled.div`
  margin-bottom: ${(props) => props.theme.mp.sm};
  width: 100%;
`;

const TextAreaLabel = styled.label`
  color: ${(props) => props.theme.color.main.base};
  font-weight: 600;
`;

const TextAreaInput = styled.textarea`
  width: 100%;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.mp.sm};
  margin-top: ${(props) => props.theme.mp.sm};
  border: 1px solid ${(props) => props.theme.color.main.xs};
  box-shadow: ${(props) => props.theme.shadow.md};
  &:focus {
    border: 2px dotted ${(props) => props.theme.color.main.sm};
  }
`;

interface TextAreaProps {
  label?: string;
}
const TextArea: React.FC<TextAreaProps> = ({ label }) => {
  return (
    <TextAreaBox>
      <TextAreaLabel>{label}</TextAreaLabel>
      <TextAreaInput rows={8} />
    </TextAreaBox>
  );
};
export default TextArea;
