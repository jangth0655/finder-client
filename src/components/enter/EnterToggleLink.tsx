import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../screen/routes";

const ToggleAuthLink = styled.div`
  color: ${(props) => props.theme.color.main.base};
  width: 70%;
  margin: auto;
  margin-top: ${(props) => props.theme.mp.lg};
  margin-bottom: ${(props) => props.theme.mp.md};
`;

const LinkText = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  margin-right: ${(props) => props.theme.mp.sm};
`;
const LinkPushText = styled.span`
  color: ${(props) => props.theme.color.active.sm};
  font-weight: 600;
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.color.active.lg};
  }
`;

interface EnterToggleLinkProps {
  text: string;
  pushText: string;
  login?: boolean;
}

const EnterToggleLink: React.FC<EnterToggleLinkProps> = ({
  text,
  pushText,
  login,
}) => {
  return (
    <ToggleAuthLink>
      <LinkText>{text}</LinkText>
      <Link to={login ? routes.signUp : routes.login}>
        <LinkPushText>{pushText}</LinkPushText>
      </Link>
    </ToggleAuthLink>
  );
};

export default EnterToggleLink;
