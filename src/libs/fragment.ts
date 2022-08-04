import { gql } from "@apollo/client";
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    isMe
    id
    username
    avatar
  }
`;

export const SHOP_FRAGMENT = gql`
  fragment ShopFragemnt on Shop {
    id
    name
    slug
    isMine
    isLike
    favCount
  }
`;
