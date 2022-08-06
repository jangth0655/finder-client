import { useLocation } from "react-router-dom";
import Layout from "../../components/Layout";

interface LocationSate {
  id: number;
}

const AboutShop: React.FC = () => {
  const location = useLocation();
  const { id } = location.state as LocationSate;
  console.log(id);
  return (
    <Layout>
      <h1>About shop</h1>
    </Layout>
  );
};
export default AboutShop;
