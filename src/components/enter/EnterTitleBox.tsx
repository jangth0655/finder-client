import styled from "styled-components";

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;
const Title = styled.h1`
  font-weight: 900;
  color: ${(props) => props.theme.color.active.base};
  font-size: ${(props) => props.theme.fontSize.xxxxl};
  text-transform: uppercase;
  margin-bottom: ${(props) => props.theme.mp.lg};
`;
const Subtitle = styled.span`
  color: ${(props) => props.theme.color.active.sm};
`;

interface EnterTitleBoxProps {
  title: string;
}

const EnterTitleBox: React.FC<EnterTitleBoxProps> = ({ title }) => {
  return (
    <TitleBox>
      <Title>{title}</Title>
      <Subtitle>Finde your favorite Shops</Subtitle>
    </TitleBox>
  );
};
export default EnterTitleBox;
