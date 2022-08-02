import styled from "styled-components";
import signUpImage from "../../assets/images/sign-up.jpg";
import loginImage from "../../assets/images/login.jpg";

import { Helmet } from "react-helmet-async";
import WindowSize from "../../components/shared/WindowSize";

const Section = styled.section`
  background-color: ${(props) => props.theme.color.bgColor};
  display: flex;
`;
const Main = styled.main`
  padding-top: 4rem;
  margin-bottom: ${(props) => props.theme.mp.sm};
  width: 100%;
  min-height: 100vh;
`;
const ImageBox = styled.div`
  width: 100%;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  object-fit: cover;
`;

interface EnterLayoutProps {
  children: React.ReactNode;
  login?: boolean;
  title?: string;
}

const EnterLayout: React.FC<EnterLayoutProps> = ({
  children,
  login,
  title,
}) => {
  const { windowSize } = WindowSize();

  return (
    <Section>
      <Helmet>
        <title>{`${title} | Finder`}</title>
      </Helmet>
      {windowSize < 768 ? null : (
        <ImageBox>
          <Image src={login ? loginImage : signUpImage} />
        </ImageBox>
      )}
      <Main>{children}</Main>
    </Section>
  );
};
export default EnterLayout;
