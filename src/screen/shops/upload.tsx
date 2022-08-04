import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Layout from "../../components/Layout";
import UploadImage from "../../assets/images/upload.png";
import EnterInput from "../../components/enter/EnterInput";
import TextArea from "../../components/TextArea";
import EnterButton from "../../components/enter/EnterButton";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { useNavigate } from "react-router-dom";

const UPLOAD_MUTATION = gql`
  mutation createShops(
    $url: Upload
    $website: String
    $region: String!
    $description: String!
    $name: String!
    $slug: String!
  ) {
    createShops(
      url: $url
      website: $website
      region: $region
      description: $description
      name: $name
      slug: $slug
    ) {
      ok
      error
    }
  }
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  padding: ${(props) => props.theme.mp.sm};
  margin-bottom: ${(props) => props.theme.mp.xxxl};
`;
const Title = styled.span`
  font-size: ${(props) => props.theme.fontSize.xxl};
  font-weight: 800;
  color: ${(props) => props.theme.color.active.base};
`;

const UploadForm = styled.form``;
const UploadImageBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: auto;
  margin-bottom: ${(props) => props.theme.mp.md};
  width: 24rem;
  height: 24rem;
`;
const UploadImageLabel = styled.label`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  transition: ${(props) => props.theme.transition};
  &:hover {
    border: 2px dashed ${(props) => props.theme.color.active.lg};
  }
  img {
    width: 10rem;
    height: 10rem;
  }
`;

const PreviewImage = styled.div<{ url?: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  object-fit: cover;
  background-image: url(${(props) => props.url});
  border-radius: ${(props) => props.theme.mp.sm};
`;

const UploadImageInput = styled.input`
  display: none;
`;

const UploadInfo = styled.div`
  margin: auto;
  width: 50%;
`;

const SelectBox = styled.div`
  width: 40%;
  margin-bottom: ${(props) => props.theme.mp.xl};
  margin-top: ${(props) => props.theme.mp.sm};
`;
const Reset = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.mp.sm};
  background-color: ${(props) => props.theme.color.active.sm};
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: ${(props) => props.theme.transition};
  color: white;
  width: 100%;
  margin: auto;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: ${(props) => props.theme.color.active.base};
  }
`;

const SelectImage = styled.div`
  input {
    display: none;
  }
`;

interface IUploadForm {
  url: FileList;
  website: string;
  region: string;
  description: string;
  name: string;
  slug: string;
  error?: string;
}

interface UploadMutation {
  createShops: {
    ok: boolean;
    error?: string;
  };
}

const Upload: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IUploadForm>();
  const [preview, setPreview] = useState("");

  const onCompleted = (data: any) => {
    const {
      createShops: { ok, error },
    } = data;
    if (ok) {
      navigate("/");
    }
    if (error) {
      setError("error", { message: error });
    }
  };
  const [upload, { loading, data }] = useMutation<UploadMutation>(
    UPLOAD_MUTATION,
    {
      onCompleted,
    }
  );

  const errorStateMessage =
    errors.description?.message ||
    errors.name?.message ||
    errors.region?.message ||
    errors.slug?.message ||
    errors.website?.message ||
    errors.error?.message;

  const onValid = ({
    url,
    website,
    region,
    description,
    name,
    slug,
  }: IUploadForm) => {
    let file;
    if (url && url.length > 0) {
      file = url[0];
    }
    if (loading) return;
    console.log(file);
    upload({
      variables: {
        url: file ? file : null,
        website,
        region,
        description,
        name,
        slug,
      },
    });
  };

  const onReset = () => {
    setPreview("");
  };

  const image = watch("url");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      const imageFile = URL.createObjectURL(file);
      setPreview(imageFile);
    }
  }, [image]);

  return (
    <Layout title="Upload">
      <TitleBox>
        <Title>Upload Your Awesome Shop</Title>
      </TitleBox>
      <UploadForm onSubmit={handleSubmit(onValid)}>
        <UploadImageBox>
          <UploadImageLabel htmlFor="upload">
            {preview ? (
              <PreviewImage url={preview} />
            ) : (
              <img src={UploadImage} alt="" />
            )}
            <UploadImageInput
              {...register("url")}
              id="upload"
              type="file"
              accept="image/*"
            />
          </UploadImageLabel>
          <SelectBox>
            <Reset onClick={onReset}>Reset</Reset>
          </SelectBox>
        </UploadImageBox>

        <UploadInfo>
          <EnterInput
            register={register("name", { required: true })}
            id="name"
            labelText="Name"
            placeholder="Name"
          />
          <EnterInput
            register={register("slug", { required: true })}
            id="slug"
            labelText="Slug"
            placeholder="Slug"
          />
          <EnterInput
            register={register("region", { required: true })}
            id="region"
            labelText="Region"
            placeholder="Region"
          />
          <EnterInput
            register={register("website")}
            id="website"
            labelText="Website"
            placeholder="Website"
          />
          <TextArea
            register={register("description", {
              required: true,
              minLength: {
                value: 2,
                message: "Please, 2 more than",
              },
            })}
            label="Description"
          />
          {errorStateMessage && <ErrorMessage text={errorStateMessage} />}
          <EnterButton text="Upload" loading={loading} />
        </UploadInfo>
      </UploadForm>
    </Layout>
  );
};

export default Upload;
