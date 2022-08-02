import { gql, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import EnterButton from "../components/enter/EnterButton";
import EnterInput from "../components/enter/EnterInput";
import EnterLayout from "../components/enter/EnterLayout";
import EnterTitleBox from "../components/enter/EnterTitleBox";
import EnterToggleLink from "../components/enter/EnterToggleLink";
import ErrorMessage from "../components/shared/ErrorMessage";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: auto;
`;

const StateMessage = styled.div`
  margin-bottom: ${(props) => props.theme.mp.md};

  text-align: center;
  span {
    color: ${(props) => props.theme.color.active.lg};
    font-weight: 700;
  }
`;

interface LoginForm {
  username: string;
  password: string;
  error?: string;
}

interface LoginMutationResponse {
  login: {
    ok: boolean;
    error?: string;
  };
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

interface LocationState {
  username?: string;
  message?: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const onCompleted = (data: any) => {
    const {
      login: { error, ok, token },
    } = data;
    if (!ok) {
      setError("error", { message: error });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { data, loading }] = useMutation<LoginMutationResponse>(
    LOGIN_MUTATION,
    {
      onCompleted,
    }
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const errorStateMessage =
    errors.username?.message ||
    errors.password?.message ||
    errors.error?.message;
  const onValid = ({ username, password }: LoginForm) => {
    if (loading) return;
    login({
      variables: {
        username,
        password,
      },
    });
  };

  useEffect(() => {
    if (data && data.login.ok) {
      navigate("/");
    }
  }, [navigate, data]);

  useEffect(() => {
    if (state) {
      state.username && setValue("username", state.username);
    }
  }, [state, setValue]);

  return (
    <EnterLayout login title="Log In">
      <EnterTitleBox title="Login" />
      {state?.message && (
        <StateMessage>
          <span>{state.message}</span>
        </StateMessage>
      )}
      <Form onSubmit={handleSubmit(onValid)}>
        <EnterInput
          id="username"
          type="text"
          labelText="username"
          placeholder="username"
          register={register("username", {
            required: "username is required.",
            onChange: () => clearErrors("error"),
          })}
          hasError={Boolean(errors?.username)}
          required={true}
        />
        <EnterInput
          id="password"
          type="password"
          labelText="Password"
          placeholder="password"
          register={register("password", { required: "Password is required." })}
          hasError={Boolean(errors.password)}
          required={true}
        />
        <EnterButton text="Login" disabled={!isValid} loading={loading} />
        {errorStateMessage && <ErrorMessage text={errorStateMessage} />}
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
