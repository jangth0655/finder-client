import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

interface PaginationProps {
  totalLength?: number;
  setPage: Dispatch<SetStateAction<number>>;
  page: number;
}

const Main = styled.main`
  margin-top: ${(props) => props.theme.mp.xxxxl};
  margin-bottom: ${(props) => props.theme.mp.md};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ArrowIcon = styled.div`
  color: ${(props) => props.theme.color.active.sm};
  transition: ${(props) => props.theme.transition};
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.color.active.lg};
  }
`;

const PageNumberBox = styled.div`
  margin: 0 ${(props) => props.theme.mp.md};
  color: ${(props) => props.theme.color.active.xl};
  font-weight: 600;
`;

const PageNumberSpan = styled.span``;

const Pagination: React.FC<PaginationProps> = ({
  totalLength,
  setPage,
  page,
}) => {
  const totalPage = totalLength ? totalLength : 1;
  const offset = 5;

  const onNext = () => {
    setPage((prev) => (totalPage < offset ? prev : prev + 1));
  };

  const onBack = () => {
    setPage((prev) => (prev === 1 ? 1 : prev - 1));
  };

  return (
    <Main>
      <ArrowIcon onClick={() => onBack()}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </ArrowIcon>
      <PageNumberBox>
        <PageNumberSpan>{page}</PageNumberSpan>
      </PageNumberBox>
      <ArrowIcon onClick={() => onNext()}>
        <FontAwesomeIcon icon={faArrowRight} />
      </ArrowIcon>
    </Main>
  );
};

export default Pagination;
