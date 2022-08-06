import styled from "styled-components";
import { Shop } from "../../interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ShopBox = styled.div`
  height: 24rem;
  border: 2px solid ${(props) => props.theme.color.main.xs};
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ShopImageBox = styled.div<{ isPhoto?: boolean }>`
  height: 90%;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-color: ${(props) =>
    props.isPhoto ? "" : props.theme.color.active.sm};
  span {
    color: ${(props) => props.theme.color.main.xl};
    display: inline-block;
    padding: ${(props) => props.theme.mp.sm};
  }
`;

const ShopImage = styled.div<{ url?: string }>`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center center;
  object-fit: cover;
`;
const ShopInfo = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${(props) => props.theme.mp.sm};
  color: ${(props) => props.theme.color.main.base};
`;
const ShopName = styled.span``;
const ShopFavBox = styled.div`
  display: flex;
  align-items: center;
`;
const ShopFav = styled.div<{ like: boolean }>`
  color: ${(props) =>
    props.like ? props.theme.color.active.lg : props.theme.color.active.sm};
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.color.active.sm};
  }
`;
const ShopFavSpan = styled.span`
  font-size: ${(props) => props.theme.fontSize.sm};
  margin-left: ${(props) => props.theme.mp.sm};
`;

interface ShopItemProps {
  shop: Shop;
}

const ShopItem: React.FC<ShopItemProps> = ({ shop }) => {
  const navigate = useNavigate();
  const onDetailShop = (id: number) => {
    navigate(`/shops/about/${id}`, {
      state: {
        id,
      },
    });
  };

  return (
    <ShopBox onClick={() => onDetailShop(shop.id)}>
      {shop.photos[0] ? (
        <ShopImageBox isPhoto={Boolean(shop.photos[0].url)}>
          <ShopImage url={shop.photos[0].url} />
        </ShopImageBox>
      ) : (
        <ShopImageBox>
          <span>there is not image...</span>
        </ShopImageBox>
      )}
      <ShopInfo>
        <ShopName>{shop.name}</ShopName>
        <ShopFavBox>
          <ShopFav like={shop.isLike}>
            <FontAwesomeIcon icon={faHeart} />
          </ShopFav>
          <ShopFavSpan>{shop.favCount}</ShopFavSpan>
        </ShopFavBox>
      </ShopInfo>
    </ShopBox>
  );
};
export default ShopItem;
