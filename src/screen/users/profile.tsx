import { ApolloCache, gql, useMutation, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import ShopItems from "../../components/shops/ShopItems";
import { Shop, User } from "../../interface";
import { dateFormate } from "../../libs/dateFormat";
import { SHOP_FRAGMENT, USER_FRAGMENT } from "../../libs/fragment";
import IsAvatar from "../../components/shared/IsAvatar";
import { Border } from "../../components/shared/Shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Followers from "../../components/followers/Followers";
import Pagination from "../../components/shared/Pagination";

const SEE_PROFILE = gql`
  ${USER_FRAGMENT}
  ${SHOP_FRAGMENT}
  query seeProfile($id: Int!, $page: Int) {
    seeProfile(id: $id) {
      ok
      error
      user {
        ...UserFragment
        name
        createdAt
        isFollowing
        shops(page: $page) {
          ...ShopFragemnt
          photos {
            url
          }
        }
      }
    }
  }
`;

const FAV_SHOPS = gql`
  ${SHOP_FRAGMENT}
  query favShops($id: Int!, $page: Int) {
    favShops(id: $id, page: $page) {
      ok
      error
      shops {
        shop {
          ...ShopFragemnt
          photos {
            url
          }
        }
      }
    }
  }
`;

const FOLLOWER_USER = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
      error
    }
  }
`;

const MainSection = styled.section``;

const UserSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const UsernameBox = styled.div`
  display: flex;
  align-items: center;
`;

const FollowerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Follower = styled.span`
  color: ${(props) => props.theme.color.active.base};
  font-size: ${(prosp) => prosp.theme.fontSize.xs};
  margin-bottom: ${(props) => props.theme.mp.sm};
`;
const FollowerIcon = styled.div<{ isFollowing?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background-color: ${(props) =>
    props.isFollowing
      ? props.theme.color.active.xl
      : props.theme.color.active.sm};
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.active.xl};
  }
`;

const Username = styled.span`
  margin-right: ${(props) => props.theme.mp.md};
  color: ${(props) => props.theme.color.main.xl};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.xxl};
`;
const Name = styled.span`
  color: ${(props) => props.theme.color.main.base};
  margin: ${(props) => props.theme.mp.md} 0;
`;
const CreatedAt = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  color: ${(props) => props.theme.color.main.base};
`;
const EditBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.mp.md};
  background-color: ${(props) => props.theme.color.active.sm};
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.mp.sm};
  cursor: pointer;
  font-size: ${(props) => props.theme.fontSize.sm};
  transition: ${(props) => props.theme.transition};
  &:hover {
    background-color: ${(props) => props.theme.color.active.base};
  }
`;

const ShopSection = styled.section`
  margin-top: ${(props) => props.theme.mp.xxxxl};
`;
const ShopSectionTitle = styled.span`
  color: ${(props) => props.theme.color.active.sm};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.xl};
  margin-right: ${(props) => props.theme.mp.xxxxl};
  position: relative;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.color.active.base};
  }
`;

const Shops = styled.div``;

const Mark = styled(motion.div)`
  position: absolute;
  width: ${(props) => props.theme.mp.xs};
  height: ${(props) => props.theme.mp.xs};
  border-radius: 50%;
  background-color: ${(props) => props.theme.color.active.xl};
  left: 0;
  right: 0;
  margin: auto;
`;

interface UserWithShop extends User {
  shops: Shop[];
}

interface SeeProfile {
  seeProfile: {
    ok: boolean;
    error?: string;
    user: UserWithShop;
  };
}

export interface FavShopObject {
  shop: Shop;
}

interface FavShops {
  favShops: {
    ok: boolean;
    error: string;
    shops: FavShopObject[];
  };
}

interface LocationState {
  username: string;
  id: number;
  ok?: boolean;
}

interface FollowerUserMutation {
  followUser: {
    ok: boolean;
    error?: string;
  };
}

const shopSectionTitle = [
  { title: "Shops", id: "seeProfile" },
  { title: "Favorite", id: "favShops" },
  { title: "Followers", id: "follower" },
];

const Profile: React.FC = () => {
  const [followRefetch, setFollowRefetch] = useState(false);
  const [page, setPage] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const [selectTitle, setSelectTitle] = useState("Shops");
  const { id, ok } = location.state as LocationState;

  const {
    data: profileData,
    loading,
    refetch,
  } = useQuery<SeeProfile>(SEE_PROFILE, {
    variables: {
      id: id && Number(id),
      page,
    },
  });

  const { data: favShopsData } = useQuery<FavShops>(FAV_SHOPS, {
    variables: {
      id: id && id,
    },
  });

  const updateToggleFollower = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        followUser: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `User:${id}`;
      const fragment = gql`
        fragment BSName on User {
          isFollowing
        }
      `;
      const resultFragemnt: any = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("isFollowing" in resultFragemnt) {
        const { isFollowing } = resultFragemnt;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            isFollowing: !isFollowing,
          },
        });
        setFollowRefetch(isFollowing);
      }
    }
  };

  const [following] = useMutation<FollowerUserMutation>(FOLLOWER_USER, {
    update: updateToggleFollower,
  });

  const onFollowing = (username?: string) => {
    following({
      variables: {
        username,
      },
    });
    setFollowRefetch((prev) => !prev);
  };

  const onEditProfile = () => {
    navigate("/users/edit");
  };

  const onSelectTitle = (title: string) => {
    setSelectTitle(title);
  };

  useEffect(() => {
    if (ok && id) {
      refetch({ id });
    }
  }, [ok, refetch, id]);

  return (
    <Layout title="Profile">
      {loading ? (
        "Loading..."
      ) : (
        <MainSection>
          <UserSection>
            <IsAvatar avatar={profileData?.seeProfile.user?.avatar} />
            <InfoBox>
              <UsernameBox>
                <Username>{profileData?.seeProfile?.user?.username}</Username>
                <FollowerBox>
                  <Follower>Follower</Follower>
                  <FollowerIcon
                    onClick={() =>
                      onFollowing(profileData?.seeProfile?.user?.username)
                    }
                    isFollowing={profileData?.seeProfile.user?.isFollowing}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                  </FollowerIcon>
                </FollowerBox>
              </UsernameBox>
              <Name>{profileData?.seeProfile.user?.name}</Name>
              <CreatedAt>
                {dateFormate(profileData?.seeProfile?.user?.createdAt)}
              </CreatedAt>
              {profileData?.seeProfile.user?.isMe && (
                <EditBox onClick={onEditProfile}>Edit</EditBox>
              )}
            </InfoBox>
          </UserSection>
          <ShopSection>
            {shopSectionTitle.map((title) => (
              <ShopSectionTitle
                onClick={() => onSelectTitle(title?.title)}
                key={title.id}
              >
                {title.title}
                {title.title === selectTitle && <Mark layoutId="title" />}
              </ShopSectionTitle>
            ))}
            <Border />
            <Shops>
              {selectTitle === "Shops" && (
                <>
                  <ShopItems shops={profileData?.seeProfile.user?.shops} />
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalLength={profileData?.seeProfile.user?.shops.length}
                  />
                </>
              )}
              {selectTitle === "Favorite" && (
                <>
                  <ShopItems favShops={favShopsData?.favShops?.shops} />
                  <Pagination
                    page={page}
                    setPage={setPage}
                    totalLength={favShopsData?.favShops.shops?.length}
                  />
                </>
              )}
              {selectTitle === "Followers" && (
                <Followers
                  followRefetch={followRefetch}
                  username={profileData?.seeProfile?.user?.username}
                />
              )}
            </Shops>
          </ShopSection>
        </MainSection>
      )}
    </Layout>
  );
};

export default Profile;
