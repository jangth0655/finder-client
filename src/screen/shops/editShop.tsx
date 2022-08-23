import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import EnterButton from "../../components/enter/EnterButton";
import EnterInput from "../../components/enter/EnterInput";
import Layout from "../../components/Layout";
import ErrorMessage from "../../components/shared/ErrorMessage";
import { Border, SmallBurtton } from "../../components/shared/Shared";
import TextArea from "../../components/shared/TextArea";
import { Shop } from "../../interface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { gql, useMutation } from "@apollo/client";

const DELETE_PHOTO_MUTATION = gql`
  mutation deletePhoto($id: id) {
    deletePhoto(id: $id) {
      ok
      error
    }
  }
`;

const EDIT_SHOP_MUTATION = gql`
  mutation editShop(
    $id: Int!
    $website: String
    $region: String
    $description: String
    $name: String
    $slug: String
    $url: Upload
    $photoId: Int
    $photoUrl: String
    $phone: String
  ) {
    editShop(
      id: $id
      website: $website
      region: $region
      description: $description
      name: $name
      slug: $slug
      url: $url
      photoId: $photoId
      photoUrl: $photoUrl
      phone: $phone
    ) {
      ok
      error
    }
  }
`;

const DELETE_SHOP_MUTATION = gql`
  mutation deleteShop($id: Int!) {
    deleteShop(id: $id) {
      ok
      error
      id
    }
  }
`;

const UploadForm = styled.form``;
const EditShopSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  margin: auto;
  margin-bottom: ${(props) => props.theme.mp.xxxxl};
`;
const UploadPhotoBox = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed ${(props) => props.theme.color.active.sm};
  width: 15rem;
  height: 15rem;
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin-right: ${(props) => props.theme.mp.lg};
  transition: ${(props) => props.theme.transition};
  font-size: ${(props) => props.theme.fontSize.xxxl};
  color: ${(props) => props.theme.color.active.sm};
  cursor: pointer;
  &:hover {
    border-color: ${(props) => props.theme.color.active.lg};
    color: ${(props) => props.theme.color.active.lg};
  }
  input {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: ${(props) => props.theme.borderRadius.md};
    object-fit: cover;
  }
`;

const Config = styled.div`
  width: 30%;
`;

const Reset = styled.div`
  width: 100%;
`;

const Remove = styled.div`
  width: 100%;
  margin: ${(props) => props.theme.mp.lg} 0;
`;

const DeleteShop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${(props) => props.theme.mp.sm};
  background-color: red;
  opacity: 0.6;
  border-radius: ${(props) => props.theme.borderRadius.md};
  transition: ${(props) => props.theme.transition};
  color: white;
  width: 100%;
  margin: auto;
  cursor: pointer;
  font-weight: 600;
  text-align: center;
  &:hover {
    opacity: 1;
  }
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    font-size: ${(props) => props.theme.fontSize.sm};
  }
`;

const InfoSection = styled.section`
  width: 70%;
  margin: auto;
`;

interface EditForm {
  website: string;
  region: string;
  description: string;
  name: string;
  slug: string;
  url: FileList;
  phone: string;
  error?: string;
}

interface LocationState {
  shop: Shop;
  id: number;
}

interface ShopMutation {
  ok: boolean;
  error?: string;
}

const EditShop: React.FC = () => {
  const navigate = useNavigate();
  const [preview, setPreview] = useState("");
  const location = useLocation();
  const { shop, id } = location.state as LocationState;
  const SectionRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
    setValue,
  } = useForm<EditForm>();

  const [deletePhoto, { loading: deletePhotoLoading }] =
    useMutation<ShopMutation>(DELETE_PHOTO_MUTATION);

  const onCompleted = (data: any) => {
    const {
      editShop: { ok, error },
    } = data;
    if (ok) {
      navigate("/");
    }
    if (error) {
      setError("error", { message: error });
    }
  };
  const [Edit, { loading: editLoading }] = useMutation<ShopMutation>(
    EDIT_SHOP_MUTATION,
    {
      onCompleted,
    }
  );

  const onDeleteShopCompleted = (data: any) => {
    const {
      deleteShop: { ok, error },
    } = data;
    if (ok) {
      navigate("/");
    }
    if (error) {
      setError("error", { message: error });
    }
  };
  const [deleteShop, { loading: deleteShopLoading }] =
    useMutation<ShopMutation>(DELETE_SHOP_MUTATION, {
      onCompleted: onDeleteShopCompleted,
    });

  const onValid = (data: EditForm) => {
    const { website, region, description, name, slug, url, phone } = data;
    const file = url.length > 0 && url[0];
    if (editLoading) return;
    Edit({
      variables: {
        id,
        website,
        region,
        description,
        name,
        slug,
        url: file ? file : null,
        photoId: shop.photos ? shop.photos[0].id : null,
        photoUrl: shop.photos ? shop.photos[0].url : null,
        phone,
      },
    });
  };

  const onReset = () => {
    setPreview("");
  };

  const onRemovePhoto = (photoId: string) => {
    if (deletePhotoLoading) return;
    deletePhoto({
      variables: {
        photoId,
      },
    });
  };

  const onDeleteShop = (id: number) => {
    if (deleteShopLoading) return;
    deleteShop({
      variables: {
        id,
      },
    });
  };

  const latestId = shop?.photos?.length - 1;

  useEffect(() => {
    if (shop) {
      shop.photos[0]?.url && setPreview(shop.photos[latestId].url);
      shop.name && setValue("name", shop.name);
      shop.slug && setValue("slug", shop.slug);
      shop.region && setValue("region", shop.region);
      shop.phone && setValue("phone", shop.phone);
    }
  }, [latestId, setValue, shop]);

  const image = watch("url");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);

  const errorStateMessage =
    errors.name?.message || errors.slug?.message || errors.error?.message;

  return (
    <Layout>
      <UploadForm onSubmit={handleSubmit(onValid)}>
        <EditShopSection ref={SectionRef}>
          <UploadPhotoBox htmlFor="url">
            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <FontAwesomeIcon icon={faPlus} />
            )}

            <input {...register("url")} id="url" type="file" accept="image/*" />
          </UploadPhotoBox>
          <Config>
            <Reset onClick={onReset}>
              <SmallBurtton>Reset</SmallBurtton>
            </Reset>
            {shop?.photos && (
              <Remove onClick={() => onRemovePhoto(shop.photos[latestId].url)}>
                <SmallBurtton>
                  {deletePhotoLoading ? "Loading" : "Remove"}
                </SmallBurtton>
              </Remove>
            )}
            <DeleteShop onClick={() => onDeleteShop(shop.id)}>
              {deleteShopLoading ? "Loading" : "Delete Shop"}
            </DeleteShop>
          </Config>
        </EditShopSection>

        <Border />
        <InfoSection>
          {errorStateMessage && <ErrorMessage text={errorStateMessage} />}
          <EnterInput
            register={register("name", {
              onChange: () => clearErrors("error"),
            })}
            id="Name"
            labelText="Name"
            placeholder="Name"
          />

          <EnterInput
            register={register("slug", {
              onChange: () => clearErrors("error"),
            })}
            id="slug"
            labelText="Slug"
            placeholder="Slug"
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
          <TextArea register={register("description")} label="Description" />
          <EnterButton text="Edit" loading={editLoading} />
        </InfoSection>
      </UploadForm>
    </Layout>
  );
};
export default EditShop;
