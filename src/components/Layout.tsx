import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/images/logo.jpeg";
import WindowSize from "./shared/WindowSize";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Search from "./Search";
import useUser from "../libs/useUser";
import { logUserOut } from "../apollo";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

const Section = styled.section`
  width: 100vw;
  position: relative;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => props.theme.mp.sm} ${(props) => props.theme.mp.md};
  border-bottom: 1px solid ${(props) => props.theme.color.active.sm};
`;
const ColLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ColRight = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const LogoBox = styled.div`
  margin-right: ${(props) => props.theme.mp.sm};
  cursor: pointer;
`;
const Logo = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
`;

const Title = styled.div`
  span {
    color: ${(props) => props.theme.color.active.lg};
    font-weight: 700;
    font-size: ${(props) => props.theme.fontSize.lg};
  }
`;

const LinkSpan = styled.span`
  position: relative;
  padding: ${(props) => props.theme.mp.xs};
  font-weight: 600;
  transition: ${(props) => props.theme.transition};
  font-size: ${(props) => props.theme.fontSize.lg};
  color: ${(props) => props.theme.color.active.sm};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.active.base};
  }
`;

const LinkProfile = styled(LinkSpan)`
  display: inline-block;
  margin: 0 ${(props) => props.theme.mp.sm};
`;
const LinkUpload = styled(LinkSpan)``;

const LinkLogOut = styled(LinkSpan)`
  margin-right: ${(props) => props.theme.mp.sm};
`;

const AvatarBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  color: ${(props) => props.theme.color.active.lg};
  background-color: ${(props) => props.theme.color.active.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const Avatar = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100%;
`;

const BarIcon = styled.div`
  color: ${(props) => props.theme.color.active.lg};
  opacity: 0.5;
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const LayerBox = styled(motion.div)`
  transform-origin: top center;
  position: absolute;
  background-color: ${(props) => props.theme.color.black};
  opacity: 0.8;
  width: 100%;
  height: 6rem;
`;

const ActiveLayer = styled.div`
  position: absolute;
  width: 100%;
  height: 6rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  z-index: 1;
  color: ${(props) => props.theme.color.active.sm};
`;

const Main = styled.main`
  padding: ${(props) => props.theme.mp.lg} ${(props) => props.theme.mp.sm};
  min-height: 100vh;
  margin: auto;
  margin-top: ${(props) => props.theme.mp.xxxxl};
  max-width: ${(props) => props.theme.maxWidth.xl};
`;

const Mark = styled(motion.span)`
  background-color: ${(props) => props.theme.color.active.lg};
  position: absolute;
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
`;

const activeNavVar: Variants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      type: "linear",
    },
  },
  exit: {
    scaleY: 0,
  },
};

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const navigate = useNavigate();
  const uploadMatch = useMatch("/shops/upload");
  const profileMatch = useMatch("/users/profile");
  const { windowSize } = WindowSize();
  const [active, setActiv] = useState(false);
  const { user } = useUser({ isPrivate: false });

  const onHome = () => {
    navigate("/");
  };

  const onProfile = () => {
    navigate("/users/profile");
  };

  const onActive = () => {
    setActiv((pre) => !pre);
  };

  return (
    <Section>
      <Helmet>
        <title>{`${title} | Finder`}</title>
      </Helmet>
      <Nav>
        <ColLeft>
          <LogoBox onClick={() => onHome()}>
            <Logo src={logo} />
          </LogoBox>
          <Title>
            <span>Finder</span>
          </Title>
        </ColLeft>
        <Search />
        {windowSize > 768 ? (
          <ColRight>
            <Link to={"/shops/upload"}>
              <LinkUpload>
                Upload
                {uploadMatch && <Mark layoutId="circle" />}
              </LinkUpload>
            </Link>
            <Link to={"/users/profile"}>
              <LinkProfile>
                Profile {profileMatch && <Mark layoutId="circle" />}
              </LinkProfile>
            </Link>
            {user?.isMe && (
              <Link to={"/"}>
                <LinkLogOut onClick={() => logUserOut(navigate)}>
                  LogOut
                </LinkLogOut>
              </Link>
            )}
            <AvatarBox onClick={() => onProfile()}>
              {false ? (
                <Avatar src={logo} />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}
            </AvatarBox>
          </ColRight>
        ) : (
          <BarIcon onClick={() => onActive()}>
            <FontAwesomeIcon icon={faBars} />
          </BarIcon>
        )}
      </Nav>
      <AnimatePresence>
        {windowSize < 768 && active && (
          <LayerBox
            variants={activeNavVar}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ActiveLayer>
              <Link to={"/users/upload"}>
                <LinkUpload>Upload</LinkUpload>
              </Link>
              <Link to={"/users/profile"}>
                <LinkProfile>Profile</LinkProfile>
              </Link>
              <Link to={"/"}>
                <LinkLogOut onClick={() => logUserOut(navigate)}>
                  LogOut
                </LinkLogOut>
              </Link>
            </ActiveLayer>
          </LayerBox>
        )}
      </AnimatePresence>
      <Main onClick={() => setActiv(false)}>{children}</Main>
    </Section>
  );
};
export default Layout;
