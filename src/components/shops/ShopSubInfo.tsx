import styled from "styled-components";
import { Shop } from "../../interface";

const Main = styled.div``;

const InfoBox = styled.div`
  height: 5rem;
  width: 70%;
  margin: auto;
  margin-bottom: ${(props) => props.theme.mp.xxxxl};
  box-shadow: ${(props) => props.theme.shadow.md};
  padding: ${(props) => props.theme.mp.sm};
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    width: 100%;
  }
`;
const Label = styled.span`
  display: inline-block;
  margin-bottom: ${(props) => props.theme.mp.md};
  color: ${(props) => props.theme.color.active.sm};
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSize.sm};
`;
const Info = styled.div`
  color: ${(props) => props.theme.color.active.lg};
  font-weight: 600;
`;

const DescriptionBox = styled(InfoBox)`
  height: 15rem;
`;
const Description = styled.div`
  overflow-y: scroll;
  color: ${(props) => props.theme.color.active.lg};
  font-weight: 600;
`;

interface ShopSubInfoProps {
  shop?: Shop;
}

const ShopSubInfo: React.FC<ShopSubInfoProps> = ({ shop }) => {
  return (
    <Main>
      {shop && (
        <>
          <InfoBox>
            <Label>Region</Label>
            <Info>{shop.region}</Info>
          </InfoBox>
          <InfoBox>
            <Label>Website</Label>
            <Info>{shop.website}</Info>
          </InfoBox>
          <InfoBox>
            <Label>Phone</Label>
            <Info>{shop.phone}</Info>
          </InfoBox>
          <DescriptionBox>
            <Label>Description</Label>
            <Description>{shop.description}</Description>
          </DescriptionBox>
        </>
      )}
    </Main>
  );
};
export default ShopSubInfo;
