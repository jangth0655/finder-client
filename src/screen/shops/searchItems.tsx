import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";
import ShopItems from "../../components/shops/ShopItems";
import { Shop } from "../../interface";

type LocationState = Shop[];

const SearchItems = () => {
  const searchItems = useLocation().state as LocationState;

  return (
    <Layout>
      <ShopItems shops={searchItems} />
    </Layout>
  );
};
export default SearchItems;
