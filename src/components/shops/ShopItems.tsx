import React from "react";
import styled from "styled-components";
import { Shop } from "../../interface";
import { FavShopObject } from "../../screen/users/profile";
import ShopItem from "./ShopItem";

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
  @media (max-width: ${(props) => props.theme.respnosive.md}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

interface ShopItemsProps {
  shops?: Shop[];
  favShops?: FavShopObject[];
}

const ShopItems: React.FC<ShopItemsProps> = ({ shops, favShops }) => {
  return (
    <Main>
      {shops && shops.map((shop) => <ShopItem key={shop.id} shop={shop} />)}
      {favShops?.map((shop) => (
        <ShopItem key={shop.shop.id} shop={shop.shop} />
      ))}
    </Main>
  );
};
export default ShopItems;
