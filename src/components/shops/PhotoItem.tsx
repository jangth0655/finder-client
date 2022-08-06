import styled from "styled-components";
import { Photo } from "../../interface";

const Main = styled.main`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  @media (max-width: ${(props) => props.theme.respnosive.sm}) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const ShopImage = styled.div<{ url?: string }>`
  height: 24rem;
  background-image: url(${(props) => props.url});
  background-position: center center;
  object-fit: cover;
  background-size: cover;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

interface PhotoItemProps {
  photos?: Photo[];
}

const PhotoItem: React.FC<PhotoItemProps> = ({ photos }) => {
  return (
    <Main>
      {photos &&
        photos.map((photo) => <ShopImage key={photo.id} url={photo.url} />)}
    </Main>
  );
};
export default PhotoItem;
