import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../interface";
import { USER_FRAGMENT } from "./fragment";

const ME_QUERY = gql`
  ${USER_FRAGMENT}
  query me {
    me {
      ...UserFragment
    }
  }
`;

interface UseUserProps {
  isPrivate: boolean;
}

interface Me {
  me: User;
}

const useUser = ({ isPrivate }: UseUserProps) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<Me>(ME_QUERY);

  useEffect(() => {
    if (isPrivate) {
      if (!data?.me.id) {
        navigate("/enter", { replace: true });
      }
    }
  }, [data?.me.id, isPrivate, navigate]);

  return { loading, error, user: data?.me };
};
export default useUser;
