import { gql } from "@apollo/client";
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    isMe
    id
    username
    avatar
  }
`;
