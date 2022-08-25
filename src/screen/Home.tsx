import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import Layout from "../components/Layout";
import { Shop } from "../interface";
import Pagination from "../components/shared/Pagination";
import HomeAndSearchShop from "../components/shops/HomeAndSearchShop";

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

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data } = useQuery<SeeShopResponse>(SEE_SHOP_MUTATION, {
    variables: {
      page,
    },
  });

  return (
    <Layout title="Main">
      {data?.seeShops
        ? data?.seeShops.map((shop) => (
            <HomeAndSearchShop key={shop.id} id={shop.id} shop={shop} />
          ))
        : "Loading..."}
      <Pagination
        page={page}
        setPage={setPage}
        totalLength={data?.seeShops.length}
      />
    </Layout>
  );
};

export default Home;
