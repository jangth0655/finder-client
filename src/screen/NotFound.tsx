import React from "react";
import styled from "styled-components";

const Section = styled.section`
  padding: 10rem;
  background-color: ${(props) => props.theme.color.bgColor};
  min-height: 100vh;
`;
const Title = styled.h1`
  font-weight: 800;
  color: ${(props) => props.theme.color.main.xl};
  font-size: ${(props) => props.theme.fontSize.xxxxl};
`;

const NotFoundPage: React.FC = () => {
  return (
    <Section>
      <Title>Sorry Not Found ...</Title>
    </Section>
  );
};

export default NotFoundPage;
