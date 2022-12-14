import { gql, useQuery } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";
import { Shop } from "../../interface";
import { SHOP_FRAGMENT } from "../../libs/fragment";
import styled from "styled-components";
import { Border } from "../../components/shared/Shared";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PhotoItem from "../../components/shops/PhotoItem";
import Pagination from "../../components/shared/Pagination";
import UploadPhoto from "../../components/shops/UploadPhoto";
import useUser from "../../libs/useUser";
import ShopSubInfo from "../../components/shops/ShopSubInfo";
import CommentItem from "../../components/comment/CommentItem";

const SEE_SHOP_QUERY = gql`
  ${SHOP_FRAGMENT}
  query seeShop($id: Int!, $page: Int) {
    seeShop(id: $id) {
      ...ShopFragemnt
      createdAt
      website
      region
      description
      phone
      isMine
      user {
        id
        username
      }
      comments(page: $page) {
        comment
        id
        createdAt
        user {
          avatar
          username
          id
        }
      }
      photos(page: $page) {
        url
        id
      }
    }
  }
`;

const ShopPhotoSection = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: 22rem;
  margin: auto;
  margin-bottom: 4rem;
`;
const ShopImageBox = styled.div`
  width: 60%;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin: auto;
  margin-right: ${(props) => props.theme.mp.sm};
`;
const ShopImage = styled.div<{ url?: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  object-fit: cover;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const NoShopImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.mp.lg};
  color: ${(props) => props.theme.color.main.lg};
`;

const ShopMainInfoBox = styled.div`
  width: 30%;
  padding: ${(props) => props.theme.mp.md};
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ShopLabel = styled.span`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.mp.sm};
`;
const ShopMainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-weight: 600;
  color: ${(props) => props.theme.color.active.base};
  font-size: ${(props) => props.theme.fontSize.sm};
`;
const ShopName = styled(ShopMainInfo)``;
const ShopSlug = styled(ShopMainInfo)`
  margin: ${(props) => props.theme.mp.xxl} 0;
`;
const ShopUser = styled(ShopMainInfo)``;

const EditShop = styled.div`
  padding: ${(props) => props.theme.mp.sm};
  font-size: ${(props) => props.theme.fontSize.sm};
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  text-align: center;
  color: white;
  transition: ${(props) => props.theme.transition};
  margin-top: ${(props) => props.theme.mp.lg};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.active.lg};
  }
`;

const ShopNameAndSlugSpan = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.color.active.xl};
  font-size: ${(props) => props.theme.fontSize.xl};
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const ShopUsername = styled(ShopNameAndSlugSpan)`
  width: 40%;
  cursor: pointer;
  color: ${(props) => props.theme.color.active.sm};
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.color.active.xl};
  }
`;

const ShopSubInfoTitleSection = styled.section`
  display: flex;
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const ShopSubInfoTitleBox = styled.div`
  color: ${(props) => props.theme.color.active.sm};
  font-weight: 700;
  font-size: ${(props) => props.theme.fontSize.xl};
  margin-right: ${(props) => props.theme.mp.xxxxl};
  position: relative;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  margin-right: ${(props) => props.theme.mp.xxxxl};
  &:hover {
    color: ${(props) => props.theme.color.active.base};
  }
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    font-size: ${(props) => props.theme.fontSize.lg};
    margin-right: ${(props) => props.theme.mp.lg};
  }
`;
const ShopSubInfoTitle = styled.span``;

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

const ShopSubInfoSection = styled.section`
  margin-top: ${(props) => props.theme.mp.xxxxl};
`;

interface LocationSate {
  id: number;
  name?: string;
  ok?: boolean;
}

interface SeeShopResponse {
  seeShop: Shop;
}

const shopInfoTitle = [
  { title: "Info", id: "seeSubInfo" },
  { title: "Photo", id: "seePhoto" },
  { title: "Comment", id: "comment" },
  { title: "UploadPhoto", id: "upload" },
];

const AboutShop: React.FC = () => {
  const { user } = useUser({ isPrivate: false });
  const navigate = useNavigate();
  const [selectTitle, setSelectTitle] = useState("Info");
  const [page, setPage] = useState(1);
  const location = useLocation();
  const { id, name, ok } = location.state as LocationSate;

  const { data, refetch } = useQuery<SeeShopResponse>(SEE_SHOP_QUERY, {
    variables: {
      id,
      page,
    },
  });

  const onSelectTitle = (title: string) => {
    setSelectTitle(title);
  };

  const onEditShop = (id?: number) => {
    navigate(`/shops/edit/${id}`, {
      state: {
        shop: data?.seeShop,
        id,
      },
    });
  };

  const onProfile = (id?: number, username?: string) => {
    navigate(`/users/profile/${id}`, {
      state: {
        username,
        id,
      },
    });
  };

  const rangeTitle = (title: string) => {
    if (title === "UploadPhoto") {
      return "";
    } else {
      return title;
    }
  };

  useEffect(() => {
    if (ok && id) {
      refetch({ id });
    }
  }, [id, ok, refetch]);

  const latestId = data?.seeShop?.photos ? data?.seeShop?.photos.length - 1 : 0;

  return (
    <Layout title={`${name}`}>
      <ShopPhotoSection>
        <ShopImageBox>
          {data?.seeShop?.photos[latestId] ? (
            <ShopImage url={data?.seeShop?.photos[latestId]?.url} />
          ) : (
            <NoShopImage>There is not photo...</NoShopImage>
          )}
        </ShopImageBox>
        <ShopMainInfoBox>
          <div>
            <ShopName>
              <ShopLabel>Name</ShopLabel>
              <ShopNameAndSlugSpan>
                <span>{data?.seeShop.name}</span>
              </ShopNameAndSlugSpan>
            </ShopName>
            <ShopSlug>
              <ShopLabel>Slug</ShopLabel>
              <ShopNameAndSlugSpan>{data?.seeShop.slug}</ShopNameAndSlugSpan>
            </ShopSlug>
            <ShopUser>
              <ShopLabel>Username</ShopLabel>
              <ShopUsername
                onClick={() =>
                  onProfile(data?.seeShop.user.id, data?.seeShop.user.username)
                }
              >
                {data?.seeShop?.user?.username}
              </ShopUsername>
            </ShopUser>
          </div>
          {data?.seeShop.isMine && (
            <EditShop onClick={() => onEditShop(data?.seeShop.id)}>
              <span>Edit</span>
            </EditShop>
          )}
        </ShopMainInfoBox>
      </ShopPhotoSection>

      <ShopSubInfoTitleSection>
        {shopInfoTitle.map((title) => (
          <ShopSubInfoTitleBox
            onClick={() => onSelectTitle(title.title)}
            key={title.id}
          >
            <ShopSubInfoTitle>
              {data?.seeShop.isMine ? title.title : rangeTitle(title.title)}
              {title.title === selectTitle && <Mark layoutId="title" />}
            </ShopSubInfoTitle>
          </ShopSubInfoTitleBox>
        ))}
      </ShopSubInfoTitleSection>
      <Border />

      <ShopSubInfoSection>
        {selectTitle === "Photo" && (
          <>
            <PhotoItem photos={data?.seeShop?.photos} />
            <Pagination
              page={page}
              setPage={setPage}
              totalLength={data?.seeShop.photos.length}
            />
          </>
        )}
        {selectTitle === "Info" && <ShopSubInfo shop={data?.seeShop} />}
        {selectTitle === "UploadPhoto" && data?.seeShop.isMine && (
          <>
            <UploadPhoto id={id} />
          </>
        )}
        {selectTitle === "Comment" && user?.id && (
          <>
            <CommentItem comments={data?.seeShop?.comments} shopId={id} />
            <Pagination
              page={page}
              setPage={setPage}
              totalLength={data?.seeShop.comments.length}
            />
          </>
        )}
      </ShopSubInfoSection>
    </Layout>
  );
};
export default AboutShop;
