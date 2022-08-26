import { gql, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Shop } from "../interface";
import Pagination from "../components/shared/Pagination";
import HomeAndSearchShop from "../components/shops/HomeAndSearchShop";
import { useLocation } from "react-router-dom";

const SEE_SHOP_MUTATION = gql`
  query seeShops($page: Int) {
    seeShops(page: $page) {
      id
      name
      slug
      isLike
      favCount
      createdAt
      photos {
        url
      }
    }
  }
`;

interface SeeShopResponse {
  seeShops: Shop[];
}

interface LocationState {
  ok?: boolean;
}

const Home: React.FC = () => {
  const location = useLocation();

  const [page, setPage] = useState(1);
  const { data, loading, refetch } = useQuery<SeeShopResponse>(
    SEE_SHOP_MUTATION,
    {
      variables: {
        page,
      },
    }
  );

  useEffect(() => {
    if (location.state !== null) {
      const { ok } = location.state as LocationState;
      ok && refetch({});
    }
  }, [location.state, refetch]);

  return (
    <Layout title="Main">
      {loading
        ? "Loading..."
        : data?.seeShops.map((shop) => (
            <HomeAndSearchShop key={shop.id} id={shop.id} shop={shop} />
          ))}
      <Pagination
        page={page}
        setPage={setPage}
        totalLength={data?.seeShops.length}
      />
    </Layout>
  );
};

export default Home;
