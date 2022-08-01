import React from "react";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Nav = styled.nav``;

const Main = styled.main``;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <section>
      <Nav></Nav>
      <Main>{children}</Main>
    </section>
  );
};
export default Layout;
