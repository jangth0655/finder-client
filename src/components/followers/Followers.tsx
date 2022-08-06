import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { User } from "../../interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Pagination from "../shared/Pagination";

const SEE_FOLLOWERS = gql`
  query seeFollowers($username: String!, $page: Int) {
    seeFollowers(username: $username, page: $page) {
      ok
      error
      users {
        id
        username
        avatar
      }
    }
  }
`;

const Main = styled.div``;
const ItemBox = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: ${(props) => props.theme.mp.xxxxl};
`;
const AvatarBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  margin-right: ${(props) => props.theme.mp.sm};
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const NoAvatar = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: ${(props) => props.theme.color.active.sm};
  color: ${(props) => props.theme.color.active.base};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Username = styled.span`
  color: ${(props) => props.theme.color.main.xl};
  font-weight: 500;
`;

interface SeeProfileProps {
  username?: string;
}

interface SeeFollowerResponse {
  seeFollowers: {
    ok: boolean;
    error?: string;
    users: User[];
  };
}

const Followers: React.FC<SeeProfileProps> = ({ username }) => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<SeeFollowerResponse>(SEE_FOLLOWERS, {
    variables: {
      username,
      page,
    },
  });

  return (
    <>
      <Main>
        {data?.seeFollowers.users.map((user) => (
          <ItemBox key={user.id}>
            <AvatarBox>
              {user.avatar ? (
                <Avatar src={user.avatar} alt="" />
              ) : (
                <NoAvatar>
                  <FontAwesomeIcon icon={faUser} />
                </NoAvatar>
              )}
            </AvatarBox>
            <Username>{user.username}</Username>
          </ItemBox>
        ))}
      </Main>
      <Pagination
        page={page}
        setPage={setPage}
        totalLength={data?.seeFollowers.users.length}
      />
    </>
  );
};

export default Followers;