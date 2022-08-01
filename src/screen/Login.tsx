import React from "react";
import styled from "styled-components";
import EnterButton from "../components/enter/EnterButton";
import EnterInput from "../components/enter/EnterInput";
import EnterLayout from "../components/enter/EnterLayout";
import EnterTitleBox from "../components/enter/EnterTitleBox";
import EnterToggleLink from "../components/enter/EnterToggleLink";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: auto;
`;

const Login: React.FC = () => {
  return (
    <EnterLayout login>
      <EnterTitleBox title="Login" />
      <Form>
        <EnterInput
          id="email"
          type="email"
          labelText="Email"
          placeholder="email"
        />
        <EnterInput
          id="password"
          type="password"
          labelText="Password"
          placeholder="password"
        />
        <EnterButton text="Login" />
      </Form>
      <EnterToggleLink
        text="You don't have an account?"
        pushText="Go Sign Up"
        login={true}
      />
    </EnterLayout>
  );
};

export default Login;
