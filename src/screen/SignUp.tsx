import React from "react";
import styled from "styled-components";
import EnterButton from "../components/enter/EnterButton";
import EnterInput from "../components/enter/EnterInput";
import EnterLayout from "../components/enter/EnterLayout";
import EnterTitleBox from "../components/enter/EnterTitleBox";
import EnterToggleLink from "../components/enter/EnterToggleLink";
import TextArea from "../components/shared/TextArea";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/shared/ErrorMessage";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

const CREATEACCOUNT_MUTATION = gql`
  mutation createAccount(
    $username: String!
    $name: String!
    $email: String!
    $region: String!
    $bio: String
    $careers: String!
    $phone: String
    $password: String!
  ) {
    createAccount(
      username: $username
      name: $name
      email: $email
      region: $region
      bio: $bio
      careers: $careers
      phone: $phone
      password: $password
    ) {
      ok
      error
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  margin: auto;
`;

interface SignUpForm {
  username: string;
  name: string;
  email: string;
  region: string;
  careers: string;
  phone: string;
  password: string;
  bio: string;
  error?: string;
}

interface CreateAccountMutation {
  createAccount: {
    ok: boolean;
    error?: string;
  };
}

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
    clearErrors,
  } = useForm<SignUpForm>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      createAccount: { error, ok },
    } = data;
    if (error) {
      setError("error", { message: error });
    }
    if (ok) {
      const username = getValues("username");
      navigate("/login", {
        state: {
          username,
          message: "Account created, Please log in.",
        },
      });
    }
  };

  const [createAccount, { loading }] = useMutation<CreateAccountMutation>(
    CREATEACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const errorStateMessage =
    errors.username?.message ||
    errors.name?.message ||
    errors.email?.message ||
    errors.careers?.message ||
    errors.password?.message ||
    errors.phone?.message ||
    errors.bio?.message ||
    errors.error?.message ||
    errors.region?.message;

  const onValid = ({
    username,
    name,
    email,
    region,
    careers,
    phone,
    password,
    bio,
  }: SignUpForm) => {
    console.log(typeof phone);
    if (loading) return;
    createAccount({
      variables: {
        username,
        name,
        email,
        region,
        careers,
        phone: phone + "",
        password,
        bio,
      },
    });
  };

  return (
    <EnterLayout title="Sign-Up">
      <EnterTitleBox title="Sign Up" />
      <Form onSubmit={handleSubmit(onValid)}>
        <EnterInput
          type="text"
          id="username"
          placeholder="username"
          labelText="Username"
          register={register("username", {
            required: "Username is required.",
            onChange: () => clearErrors("error"),
          })}
          hasError={Boolean(errors?.username)}
          required={true}
        />
        <EnterInput
          type="text"
          id="name"
          placeholder="name"
          labelText="Name"
          register={register("name", { required: "Name is required." })}
          hasError={Boolean(errors?.name)}
          required={true}
        />
        <EnterInput
          type="email"
          id="email"
          placeholder="email"
          labelText="Email"
          register={register("email", {
            required: "Email is required.",
            onChange: () => clearErrors("error"),
            validate: {
              emailform: (value) => value.includes("@") || "Please email form.",
            },
          })}
          hasError={Boolean(errors?.email)}
          required={true}
        />
        <EnterInput
          type="text"
          id="region"
          placeholder="region"
          labelText="Region"
          register={register("region", { required: "Region is required." })}
          hasError={Boolean(errors?.region)}
          required={true}
        />
        <EnterInput
          type="text"
          id="careers"
          placeholder="careers"
          labelText="Careers"
          register={register("careers", { required: "Career is required." })}
          hasError={Boolean(errors?.careers)}
          required={true}
        />
        <EnterInput
          type="text"
          id="phone"
          placeholder="phone"
          labelText="Phone"
          register={register("phone")}
          hasError={Boolean(errors?.phone)}
        />
        <EnterInput
          type="password"
          id="password"
          placeholder="password"
          labelText="Password"
          register={register("password", { required: "Password is required." })}
          hasError={Boolean(errors?.password)}
          required={true}
        />
        <TextArea
          label="Bio"
          register={register("bio", {
            minLength: {
              value: 2,
              message: "Please 2 more than.",
            },
          })}
          hasError={Boolean(errors?.bio?.message)}
        />
        <EnterButton text="Sign Up" loading={loading} />
        {errorStateMessage && <ErrorMessage text={errorStateMessage} />}
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
