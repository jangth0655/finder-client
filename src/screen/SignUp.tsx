import React from "react";
import styled from "styled-components";
import EnterButton from "../components/enter/EnterButton";
import EnterInput from "../components/enter/EnterInput";
import EnterLayout from "../components/enter/EnterLayout";
import EnterTitleBox from "../components/enter/EnterTitleBox";
import EnterToggleLink from "../components/enter/EnterToggleLink";
import TextArea from "../components/TextArea";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: auto;
`;

const SignUp: React.FC = () => {
  return (
    <EnterLayout>
      <EnterTitleBox title="Sign Up" />
      <Form>
        <EnterInput
          type="text"
          id="username"
          placeholder="username"
          labelText="Username"
        />
        <EnterInput type="text" id="name" placeholder="name" labelText="Name" />
        <EnterInput
          type="email"
          id="email"
          placeholder="email"
          labelText="Email"
        />
        <EnterInput
          type="text"
          id="region"
          placeholder="region"
          labelText="Region"
        />
        <EnterInput
          type="text"
          id="careers"
          placeholder="careers"
          labelText="Careers"
        />
        <EnterInput
          type="number"
          id="phone"
          placeholder="phone"
          labelText="Phone"
        />
        <EnterInput
          type="password"
          id="password"
          placeholder="password"
          labelText="Password"
        />
        <TextArea label="Bio" />
        <EnterButton text="Sign Up" />
      </Form>

      <EnterToggleLink
        login={false}
        text="Already have an account?"
        pushText="Go Log In"
      />
    </EnterLayout>
  );
};

export default SignUp;
