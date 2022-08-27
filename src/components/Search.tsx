import { motion } from "framer-motion";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { Shop } from "../interface";
import { useNavigate } from "react-router-dom";

const SEARCH_MUTATION = gql`
  mutation searchShop($name: String!) {
    searchShop(name: $name) {
      id
      createdAt
      updatedAt
      website
      region
      description
      name
      slug
      photos {
        url
      }
      user {
        avatar
        username
      }
      isMine
    }
  }
`;

const SearchForm = styled.form`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SearchInput = styled(motion.input)`
  width: 100%;
  padding: ${(props) => props.theme.mp.sm} ${(props) => props.theme.mp.md};
  border-radius: ${(props) => props.theme.borderRadius.md};
  margin-right: ${(props) => props.theme.mp.xs};
  background-color: ${(props) => props.theme.color.active.sm};
  color: ${(props) => props.theme.color.white};
  font-weight: 600;
  &::placeholder {
    color: white;
  }
`;

const SearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.color.active.sm};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.active.base};
  }
`;

interface ISearchForm {
  name: string;
}

interface SearchMutation {
  searchShop: Shop[];
}

const Search: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<ISearchForm>();
  const onCompleted = (data: any) => {
    if (data) {
      navigate("/shops/searchItems", { state: data.searchShop });
    }
  };

  const [search, { loading }] = useMutation<SearchMutation>(SEARCH_MUTATION, {
    onCompleted,
  });

  const onValid = (data: ISearchForm) => {
    if (data.name === "") return;
    if (loading) return;
    search({
      variables: {
        name: data.name,
      },
    });
  };

  return (
    <SearchForm onSubmit={handleSubmit(onValid)}>
      <SearchInput
        {...register("name", { required: "name is required." })}
        type="text"
        placeholder="Shop Name"
      />

      <SearchButton>
        <FontAwesomeIcon icon={faSearch} />
      </SearchButton>
    </SearchForm>
  );
};
export default Search;
