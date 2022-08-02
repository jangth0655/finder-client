import styled from "styled-components";

const ErrorBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.mp.md};
`;

const ErrorText = styled.span`
  color: red;
  font-weight: 600;
`;

interface ErrorMessageProps {
  text: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  return (
    <ErrorBox>
      <ErrorText>{text}</ErrorText>
    </ErrorBox>
  );
};
export default ErrorMessage;
