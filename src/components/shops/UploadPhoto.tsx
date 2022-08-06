import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EnterButton from "../enter/EnterButton";
import { useForm } from "react-hook-form";
import ErrorMessage from "../shared/ErrorMessage";
import { useNavigate } from "react-router-dom";

const UPLOAD_PHOTO_MUTATION = gql`
  mutation uploadPhoto($photoUrl: Upload!, $id: Int!) {
    uploadPhoto(photoUrl: $photoUrl, id: $id) {
      ok
    }
  }
`;

const Form = styled.form`
  width: 24rem;
  height: 24rem;
  margin: auto;
  margin-bottom: ${(props) => props.theme.mp.md};
  position: relative;
`;

const ImageBox = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  border: 2px dashed ${(props) => props.theme.color.active.sm};
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  border-radius: ${(props) => props.theme.borderRadius.md};

  &:hover {
    border-color: ${(props) => props.theme.color.active.lg};
  }
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

const UploadIcon = styled.div`
  width: 100%;
  height: 100%;
  font-size: ${(props) => props.theme.fontSize.xxxxl};
  color: ${(props) => props.theme.color.active.sm};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: ${(props) => props.theme.transition};
  &:hover {
    color: ${(props) => props.theme.color.active.lg};
  }
`;

const Input = styled.input`
  display: none;
`;

const Button = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

interface UploadMutation {
  uploadPhoto: {
    ok: boolean;
    error?: string;
  };
}

interface UploadPhotoProps {
  id?: number;
}

interface UploadForm {
  photoUrl: FileList;
  error?: string;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({ id }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<UploadForm>();
  const [preview, setPreview] = useState("");
  const onCompleted = (data: any) => {
    const {
      uploadPhoto: { ok, error },
    } = data;
    if (ok) {
      navigate("/");
    }
    if (error) {
      setError("error", { message: error });
    }
  };
  const [upload, { loading }] = useMutation<UploadMutation>(
    UPLOAD_PHOTO_MUTATION,
    {
      onCompleted,
    }
  );

  const onValid = (data: UploadForm) => {
    const { photoUrl } = data;
    const file = photoUrl && photoUrl[0];
    if (loading) return;
    upload({
      variables: {
        id,
        photoUrl: file ? file : null,
      },
    });
  };

  const image = watch("photoUrl");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);

  const errorState = errors.photoUrl?.message || errors.error?.message;
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <ImageBox htmlFor="upload">
        {preview ? (
          <Image src={preview} />
        ) : (
          <UploadIcon>
            <FontAwesomeIcon icon={faPlus} />
          </UploadIcon>
        )}
        <Input
          {...register("photoUrl")}
          id="upload"
          type="file"
          accept="image/*"
        />
      </ImageBox>
      <Button>
        <EnterButton text="Upload" loading={loading} />
      </Button>
      {errorState && <ErrorMessage text={errorState} />}
    </Form>
  );
};
export default UploadPhoto;
