import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const AvatarBox = styled.div`
  width: 10rem;
  height: 10rem;
  margin-right: ${(props) => props.theme.mp.lg};
`;

const NoAvatarBox = styled(AvatarBox)`
  border-radius: 100%;
  color: ${(props) => props.theme.color.active.lg};
  background-color: ${(props) => props.theme.color.active.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

interface IsAvatarProps {
  avatar?: string;
}

const IsAvatar: React.FC<IsAvatarProps> = ({ avatar }) => {
  return (
    <>
      {avatar ? (
        <AvatarBox>
          <Avatar src={avatar} />
        </AvatarBox>
      ) : (
        <NoAvatarBox>
          <FontAwesomeIcon icon={faUser} size="3x" />
        </NoAvatarBox>
      )}
    </>
  );
};
export default IsAvatar;
