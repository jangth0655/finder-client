import styled from "styled-components";
import Layout from "../../components/Layout";
import { Border, SmallBurtton } from "../../components/shared/Shared";
import useUser from "../../libs/useUser";
import IsAvatar from "../../components/shared/IsAvatar";
import { useEffect, useRef, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import EnterInput from "../../components/enter/EnterInput";
import TextArea from "../../components/shared/TextArea";
import EnterButton from "../../components/enter/EnterButton";
import { useForm } from "react-hook-form";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { logUserOut } from "../../apollo";

const REMOVE_AVATAR_MUTATION = gql`
  mutation removeAvatar($avatar: String!) {
    removeAvatar(avatar: $avatar) {
      ok
      error
    }
  }
`;

const DELETE_ACCOUNT_MUTATION = gql`
  mutation deleteAccount($id: Int!) {
    deleteAccount(id: $id) {
      ok
      error
    }
  }
`;

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile(
    $email: String
    $username: String
    $password: String
    $avatar: Upload
    $bio: String
    $careers: String
    $region: String
    $phone: String
    $name: String
  ) {
    editProfile(
      username: $username
      email: $email
      password: $password
      avatar: $avatar
      bio: $bio
      careers: $careers
      region: $region
      phone: $phone
      name: $name
    ) {
      ok
      error
    }
  }
`;

const UploadForm = styled.form``;
const AvatarSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: ${(props) => props.theme.mp.xxxxl};
`;
const UploadAvatarBox = styled.label`
  width: 10rem;
  height: 10rem;
  border-radius: 100%;
  margin-right: ${(props) => props.theme.mp.lg};
  input {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
    object-fit: cover;
  }
`;

const ConfigAvatar = styled.div`
  width: 30%;
`;

const Reset = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.mp.lg};
`;

const Remove = styled.div`
  width: 100%;
  margin-bottom: ${(props) => props.theme.mp.lg};
`;

const DeleteAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: red;
  opacity: 0.5;
  color: white;
  border-radius: ${(props) => props.theme.borderRadius.md};
  padding: ${(props) => props.theme.mp.sm};
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    opacity: 1;
  }
`;

const UserInfoSection = styled.section`
  width: 70%;
  margin: auto;
`;

interface EditMutation {
  ok: boolean;
  error?: string;
}

interface EditProfileMutation {
  editProfile: {
    ok: boolean;
    error?: string;
  };
}

interface EditForm {
  email: string;
  username: string;
  password: string;
  avatar: FileList;
  bio: string;
  careers: string;
  region: string;
  phone: string;
  name: string;
  error?: string;
}

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const SectionRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState("");
  const { user } = useUser({ isPrivate: true });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    clearErrors,
    setValue,
  } = useForm<EditForm>({
    mode: "onChange",
  });

  const onCompleted = (data: any) => {
    const {
      editProfile: { ok, error },
    } = data;
    if (ok) {
      navigate("/");
    }
    if (error) {
      setError("error", { message: error });
      SectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };
  const [edit, { loading: editLoading }] = useMutation<EditProfileMutation>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = ({
    email,
    username,
    password,
    avatar,
    bio,
    careers,
    region,
    phone,
    name,
  }: EditForm) => {
    const avatarImgae = avatar[0];
    if (editLoading) return;
    edit({
      variables: {
        email,
        username,
        password,
        avatar: avatarImgae ? avatarImgae : null,
        bio,
        careers,
        region,
        phone,
        name,
      },
    });
  };

  const [remove, { loading: removeAvatarLoading }] = useMutation<EditMutation>(
    REMOVE_AVATAR_MUTATION
  );

  const onRemoveAvatar = (avatar: string) => {
    remove({
      variables: {
        avatar,
      },
    });
  };

  const onDeleteAccountComplete = (data: any) => {
    const {
      deleteAccount: { ok, error },
    } = data;
    if (ok) {
      logUserOut(navigate);
      navigate("/");
    }
    if (error) {
      return;
    }
  };
  const [deleteAccount, { loading: deleteAccountLoading }] =
    useMutation<EditMutation>(DELETE_ACCOUNT_MUTATION, {
      onCompleted: onDeleteAccountComplete,
    });

  const onDeleteAccount = (id?: number) => {
    console.log(id);
    window.confirm("Really???");
    if (deleteAccountLoading) return;
    deleteAccount({
      variables: {
        id,
      },
    });
  };

  const onReset = () => {
    setPreview("");
  };

  const image = watch("avatar");
  useEffect(() => {
    if (image && image.length > 0) {
      const imageFile = image[0];
      const previewFile = URL.createObjectURL(imageFile);
      setPreview(previewFile);
    }
  }, [image]);

  useEffect(() => {
    user?.username && setValue("username", user.username);
    user?.email && setValue("email", user.email);
  }, [setValue, user?.email, user?.username]);

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

  return (
    <Layout title="Edit-Profile">
      <UploadForm onSubmit={handleSubmit(onValid)}>
        <AvatarSection ref={SectionRef}>
          <UploadAvatarBox htmlFor="avatar">
            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <>
                <IsAvatar avatar={user?.avatar} />
                <input
                  {...register("avatar")}
                  id="avatar"
                  type="file"
                  accept="image/*"
                />
              </>
            )}
          </UploadAvatarBox>
          <ConfigAvatar>
            <Reset onClick={onReset}>
              <SmallBurtton>Reset</SmallBurtton>
            </Reset>
            {user?.avatar ? (
              <Remove onClick={() => onRemoveAvatar(user.avatar)}>
                <SmallBurtton>
                  {removeAvatarLoading ? "Loading" : "Remove"}
                </SmallBurtton>
              </Remove>
            ) : null}
            {user?.isMe && (
              <DeleteAccount onClick={() => onDeleteAccount(user?.id)}>
                Delete Account
              </DeleteAccount>
            )}
          </ConfigAvatar>
        </AvatarSection>

        <Border />
        <UserInfoSection>
          {errorStateMessage && <ErrorMessage text={errorStateMessage} />}
          <EnterInput
            register={register("username", {
              onChange: () => clearErrors("error"),
            })}
            id="username"
            labelText="Username"
            placeholder="Username"
          />

          <EnterInput
            register={register("name")}
            id="name"
            labelText="Name"
            placeholder="Name"
          />
          <EnterInput
            register={register("email", {
              validate: {
                emailform: (value) =>
                  value.includes("@") || "Please email form",
              },
              onChange: () => clearErrors("error"),
            })}
            id="email"
            labelText="Email"
            placeholder="Email"
          />

          <EnterInput
            register={register("careers")}
            id="careers"
            labelText="Careers"
            placeholder="Careers"
          />
          <EnterInput
            register={register("region")}
            id="region"
            labelText="Region"
            placeholder="Region"
          />
          <EnterInput
            register={register("phone")}
            id="phone"
            labelText="Phone"
            placeholder="Phone"
          />
          <EnterInput
            register={register("password")}
            id="password"
            labelText="Password"
            placeholder="Password"
            type="password"
          />
          <TextArea register={register("bio")} label="Bio" />
          <EnterButton text="Edit" loading={editLoading} />
        </UserInfoSection>
      </UploadForm>
    </Layout>
  );
};
export default EditProfile;
