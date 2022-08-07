import { ApolloCache, gql, useMutation } from "@apollo/client";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Shop } from "../../interface";
import { dateFormate } from "../../libs/dateFormat";

const FAV_TOGGLE_MUTATION = gql`
  mutation favsToggle($id: Int!) {
    favsToggle(id: $id) {
      ok
      error
    }
  }
`;

const ShopBox = styled.div`
  height: 8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadow.md};
  margin-bottom: 10rem;
  padding: 0 ${(props) => props.theme.mp.sm};
`;

const LeftCol = styled.div`
  display: flex;
  align-items: center;
`;
const PhotoImageBox = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 100%;
  margin-right: ${(props) => props.theme.mp.md};
`;
const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100%;
`;

const NoPhoto = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 100%;
  background-color: ${(props) => props.theme.color.active.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    color: ${(props) => props.theme.color.white};
    font-weight: 600;
  }
`;

const ShopInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(props) => props.theme.color.main.base};
`;
const ShopName = styled.span`
  color: ${(props) => props.theme.color.active.lg};
  font-weight: 600;
  font-size: ${(props) => props.theme.fontSize.lg};
`;
const ShopSlug = styled.span`
  margin: ${(props) => props.theme.mp.sm} 0;
  color: ${(props) => props.theme.color.active.lg};
`;

const ShopAndSlugSpan = styled.span`
  display: inline-block;
  color: white;
  background-color: ${(props) => props.theme.color.active.sm};
  padding: ${(props) => props.theme.mp.xs};
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: 400;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;
const ShopCreatedAt = styled.span`
  font-size: ${(props) => props.theme.fontSize.xs};
`;

const Border = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => props.theme.color.active.sm};
  margin-bottom: ${(props) => props.theme.mp.sm};
`;

const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-between;
  padding: ${(prosp) => prosp.theme.mp.md} 0;
`;

const GoShop = styled.div`
  color: white;
  background-color: ${(props) => props.theme.color.active.sm};
  font-size: ${(props) => props.theme.fontSize.sm};
  padding: ${(prosp) => prosp.theme.mp.xs};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.color.active.lg};
  }
`;

const FavIcon = styled.div<{ isLike?: boolean }>`
  color: ${(props) =>
    props.isLike ? props.theme.color.active.xl : props.theme.color.active.sm};
  font-size: ${(props) => props.theme.fontSize.xl};
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.color.active.base};
  }
`;

interface MainShopProps {
  shop: Shop;
  id: number;
}

interface FavToggleMutation {
  ok: boolean;
  error?: string;
}

const HomeAndSearchShop: React.FC<MainShopProps> = ({ shop, id }) => {
  const navigate = useNavigate();

  const onDetail = (id: number, name?: string) => {
    navigate(`/shops/about/${id}`, {
      state: {
        id,
        name,
      },
    });
  };

  const favToggleUpdate = (cache: ApolloCache<any>, result: any) => {
    const {
      data: {
        favsToggle: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `Shop:${id}`,
        fields: {
          isLike: (prev: any) => !prev,
        },
      });
    }
  };

  const [fav, { loading }] = useMutation<FavToggleMutation>(
    FAV_TOGGLE_MUTATION,
    {
      update: favToggleUpdate,
    }
  );

  const onFav = (id: number) => {
    if (loading) return;
    fav({
      variables: {
        id,
      },
    });
  };

  const latestId = shop.photos.length - 1;
  return (
    <ShopBox key={shop.id}>
      <LeftCol>
        <PhotoImageBox>
          {shop.photos[0] ? (
            <PhotoImage src={shop?.photos[latestId]?.url} />
          ) : (
            <NoPhoto>
              <span>Shop</span>
            </NoPhoto>
          )}
        </PhotoImageBox>
        <ShopInfoBox>
          <ShopName>
            <ShopAndSlugSpan>Shop</ShopAndSlugSpan> {shop.name}
          </ShopName>
          <ShopSlug>
            <ShopAndSlugSpan>slug</ShopAndSlugSpan> {shop.slug}
          </ShopSlug>
          <Border />
          <ShopCreatedAt>{dateFormate(shop.createdAt)}</ShopCreatedAt>
        </ShopInfoBox>
      </LeftCol>

      <RightCol>
        <GoShop onClick={() => onDetail(shop.id, shop.name)}>
          <span>About Shop</span>
        </GoShop>
        <FavIcon isLike={shop.isLike} onClick={() => onFav(shop.id)}>
          <FontAwesomeIcon icon={faHeart} size="1x" />
        </FavIcon>
      </RightCol>
    </ShopBox>
  );
};
export default HomeAndSearchShop;
