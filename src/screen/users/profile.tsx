import { gql, useQuery } from "@apollo/client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Layout from "../../components/Layout";
import ShopItems from "../../components/shops/ShopItems";
import { Shop, User } from "../../interface";
import { dateFormate } from "../../libs/dateFormat";
import { SHOP_FRAGMENT, USER_FRAGMENT } from "../../libs/fragment";

const SEE_PROFILE = gql`
  ${USER_FRAGMENT}
  ${SHOP_FRAGMENT}
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      ok
      error
      user {
        ...UserFragment
        name
        createdAt
        shops {
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
  query favShops($id: Int!) {
    favShops(id: $id) {
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

const MainSection = styled.section``;

const UserSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const AvatarBox = styled.div`
  width: 10rem;
  height: 10rem;
  margin-right: ${(props) => props.theme.mp.lg};
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
`;
const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
`;
const Username = styled.span`
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
const Border = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${(props) => props.theme.color.active.sm};
  margin-top: ${(props) => props.theme.mp.md};
  margin-bottom: ${(props) => props.theme.mp.xxl};
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
}

const shopSectionTitle = [
  { title: "Shops", id: "seeProfile" },
  { title: "Favorite", id: "favShops" },
];

const Profile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectTitle, setSelectTitle] = useState("Shops");
  const { username, id } = location.state as LocationState;
  const { data: profileData, loading } = useQuery<SeeProfile>(SEE_PROFILE, {
    variables: {
      username: username && username,
    },
  });

  const { data: favShopsData } = useQuery<FavShops>(FAV_SHOPS, {
    variables: {
      id: id && id,
    },
  });

  const onEditProfile = () => {
    navigate("/users/edit");
  };

  const onSelectTitle = (title: string) => {
    setSelectTitle(title);
  };

  return (
    <Layout title="Profile">
      {loading ? (
        "Loading..."
      ) : (
        <MainSection>
          <UserSection>
            <AvatarBox>
              <Avatar src={profileData?.seeProfile.user.avatar} />
            </AvatarBox>
            <InfoBox>
              <Username>{username}</Username>
              <Name>{profileData?.seeProfile.user.name}</Name>
              <CreatedAt>
                {dateFormate(profileData?.seeProfile?.user.createdAt)}
              </CreatedAt>
              {profileData?.seeProfile.user.isMe && (
                <EditBox onClick={onEditProfile}>Edit Profile</EditBox>
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
                <ShopItems shops={profileData?.seeProfile.user.shops} />
              )}
              {selectTitle === "Favorite" && (
                <ShopItems favShops={favShopsData?.favShops.shops} />
              )}
            </Shops>
          </ShopSection>
        </MainSection>
      )}
    </Layout>
  );
};

export default Profile;
