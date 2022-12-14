![header](https://capsule-render.vercel.app/api?type=wave&color=auto&height=400&section=header&text=Finder&fontSize=70)

<div>
    <div>
      <img style="border-radius:10px" height="70" src="./src/assets/images/logo.jpeg" />  
      <a display="block" href="https://finder-web.netlify.app/" >
      https://finder-web.netlify.app/
    </a>
    </div>
    <br />
</div>

<br /><br />

## Content

- ๐  [Built with](#built-with)
- ๐ [Project](#project)
- ๐ [Pages](#pages)
- โ [Features](#features)
- ๐ฅ [Code](#code)
- ๐ [๋๋์ ](#๋๋์ )

---

## Built with

### Front-end

- `React`
- `Typescript`
- `Styled-components`
- `Framer-motion`
- `React-hook-form`
- `Apollo-client`

### Back-end

- `Apollo-server`
- `Express`
- `Graphql`
- `PostgresSQL`
- `Prisma`
- `AWS S3`
- code : <a>https://github.com/jangth0655/finder-server</a>

### Deploy

- Client : `Netlify`
- Server : `Heroku`

---

## Project

โ ๋ง์์ ๋๋ ์ต์ ํ๋ณดํ๊ฑฐ๋ ํ์ํ๋ ๋ฑ ์ฌ๋ฌ์ฌ๋์ด ๋ชจ์ฌ ์์ ๋กญ๊ฒ ์ปค๋ฎค๋์ผ์ด์ ํ๋ ๊ณต๊ฐ์๋๋ค.

โ ๋ชจ๋  `์ด๋ฏธ์ง๋ AWS S3`์ ๋ฒํท์ ์ ์ฅ๋ฉ๋๋ค.
<br /><br />

> ๋ค๋น๊ฒ์ด์

- ๋ก๊ทธ์์ ๋๋ ๋ก๊ทธ์ธ(๋ก๊ทธ์ธ ์ฌ๋ถ), ์๋ฐํ๊ฐ ์์ต๋๋ค.
- ์๋ฐํ๋ฅผ ํตํด ์ ์  ํ๋กํ์ ํ์ธํ  ์ ์์ต๋๋ค.
- ์๋ก๋์ ํ๋กํ์ ํ์ธํ  ์ ์์ต๋๋ค.
  <br /><br />

> 1. ํ์๊ฐ์, ๋ก๊ทธ์ธ

- ์ ์ ๋ค์, ์ด๋ฆ, ์ด๋ฉ์ผ, ์ง์ญ, ์ปค๋ฆฌ์ด, ๋น๋ฐ๋ฒํธ๋ฅผ ์๋ ฅํ์ฌ ๋ก๊ทธ์ธ ํ  ์ ์์ต๋๋ค.
- ์ ์ ๋ค์๊ณผ ์ด๋ฉ์ผ์ ํ์์กฐ๊ฑด์ด๋ฉฐ, ์ค๋ณต์ด ๋ถ๊ฐํ๋๋ก ํ์์ต๋๋ค.(์ ๋ํฌ)
- ๋ก๊ทธ์ธ์ด ์ฑ๊ณต์ ์ธ ๊ฒฝ์ฐ `Apollo client`์ `Reactive variable`๋ฅผ ํตํด local state๋ฅผ ์๋ฐ์ดํธํฉ๋๋ค.

  <br />
  <img height="500" src="./preview/login-preview.gif" />
  <br></br>

> 2. Shops

- shop์ด๋ฆ๊ณผ ์ฌ๋ฌ๊ทธ, ์๋ก๋์ผ์ ํ์ธ ํ  ์์์ต๋๋ค.
- shop ๋ํ์ผํ์ด์ง์ "์ข์์"๋ฅผ ํด๋ฆญ ํ  ์ ์์ต๋๋ค. (์ฝ๋ โ)

```typescript
// ํด๋น ์ต์ ์์ด๋๋ฅผ fav๋ก ๋ฎคํ์ด์ํฉ๋๋ค. (์๋ฒ)
// ์ฆ๊ฐ์ ์ธ ๋ฐ์์ ์ป๊ธฐ ์ํด ์ํด๋ก ์บ์ฌ๋ฅผ ๋ณํํ์์ต๋๋ค. (cache.modify)
const [fav, { loading }] = useMutation<FavToggleMutation>(FAV_TOGGLE_MUTATION, {
  update: favToggleUpdate,
});
const favToggleUpdate = (cache: ApolloCache<any>, result: any) => {
  const {
    data: {
      favsToggle: { ok },
    },
  } = result;
  if (ok) {
    cache.modify({
      id: `Shop:${id}`,
      fields: {
        isLike: (prev: any) => !prev,
      },
    });
  }
};
```

<br /><br />

> 3. ๊ฒ์

- shop์ด๋ฆ(์ ๋ชฉ)์ผ๋ก ๊ฒ์์ ํ  ์ ์์ต๋๋ค.
- ๊ด๋ จ๋ shop๋ค์ ํ์ธ ํ  ์ ์์ต๋๋ค.

  <br />
  <img height="500" src="./preview/search-preview.gif" />
  <br /><br />

> 4. ์๋ก๋

- ์ต ์ ๋ณด  
  โ ํฌํ , ์ด๋ฆ(์ ๋ชฉ), ์ฌ๋ฌ๊ทธ, ์ง์ญ, ์ ํ๋ฒํธ ๋ฑ์ ์๋ ฅํ์ฌ ์๋ก๋ ํ  ์ ์์ต๋๋ค.
- `react-hook-form`์ ํ์ฉํ์ฌ ํฌํ ๋ ๋ฏธ๋ฆฌ๋ณด๊ธฐ๋ฅผ ํตํด ์๋ก๋ํ  ์ ์์ต๋๋ค. (์ฝ๋ โ)

```typescript
const [preview, setPreview] = useState("");
const { watch } = useForm<IUploadForm>();
const image = watch("url");
useEffect(() => {
  if (image && image.length > 0) {
    const file = image[0];
    const imageFile = URL.createObjectURL(file);
    setPreview(imageFile);
  }
}, [image]);
```

<br />
<img height="500" src="./preview/upload-preveiw.gif" />
<br /><br />

> 5. About Shop (์์ธ์ ๋ณด)

- ์ต ์์ธํ์ด์ง์์ ์ต์ ์ง์ญ, ์ฌ์ดํธ, ์ ํ๋ฒํธ ๋ฑ ํ์ธ ํ  ์ ์์ต๋๋ค.
- ์๋ก๋ ํ ์ ์ ๋ค์์ ํด๋ฆญํ์ฌ ์ ์ ์ ํ๋กํ๋ก ์ด๋ํ  ์ ์์ต๋๋ค.
- ์ต์์ ๊ฒ์ํ ํฌํ ๋ฅผ ํ์ธํ  ์ ์์ต๋๋ค.
- ์ต์ ๋ํ์ฌ ์ ์ ๋ค์ ๋๊ธ์ ๊ฒ์ ๋ฐ ์ญ์ ๋ฅผ ํ  ์ ์์ต๋๋ค.  
  โ ๋๊ธ์ ์์ฑํ๋ค๋ฉด, `Apollo client`๋ฅผ ํตํด ๋๊ธ์ ์บ์๋ ํ๋ ๊ฐ์ ์ง์  ์์ฑํฉ๋๋ค.  
  โ ๋๊ธ์ ์ญ์ ํ๋ค๋ฉด(๋ณธ์ธ), `Apollo client`๋ฅผ ํตํด ๋๊ธ์ ์บ์๋ ํ๋ ๊ฐ์ filterํฉ๋๋ค.
- ํด๋น `์ต ์ ์ `๋ผ๋ฉด ์ฌ์ง์ ์๋ก๋ ํ  ์ ์์ต๋๋ค.
- ํด๋น `์ต ์ ์ `๋ผ๋ฉด ์ต ์์ ํ์ด์ง๋ก ์ด๋ํ  ์ ์์ต๋๋ค.

```typescript
// ์บ์ค ์์  โ ๋๊ธ ์์ฑ
  const createCommentUpdate = (cache:ApolloCache(any), result:any) => {
    // ...
     if (ok && user) {
      newComment = {
        __typename: "Comment",
        createdAt: Date.now(),
        id,
        isMine: true,
        comment,
        user: { ...user },
      };
    }

    cache.modify({
      id: `Shop:${shopId}`,
      fields: {
        comments: (prev) => [...prev, newComment],
      },
    });
  };
// ๋๊ธ ์ญ์  (filter)
      cache.modify({
          id: `Shop:${shopId}`,
          fields: {
            comments: (prev, { readField }) => {
              const newComments = prev.filter((comment: any) => {
                return id !== readField("id", comment);
              });
              return newComments;
            },
          },
        });
```

<br />
<img height="500" src="./preview/shopComment-preveiw.gif" />
<br /><br />

> 6. Edit Shop (์ต ์์ )

- ์ต ์ ๋ณด  
  โ ์ด๋ฆ(์ ๋ชฉ), ์ฌ๋ฌ๊ทธ, ์ง์ญ, ์ ํ๋ฒํธ ๋ฑ์ ์์ ํ  ์ ์์ต๋๋ค.
- ์ต์ ์ด๋ฆ(์ ๋ชฉ), ์ฌ๋ฌ๊ทธ๋ ์ ๋ํฌํ๊ฒ ์ค์ ๋ฉ๋๋ค.
- ๋ฏธ๋ฆฌ๋ณด๊ธฐ๋ฅผ ํตํด ์ต์ ํฌํ ๋ฅผ ํ์ธ ํ  ์ ์์ต๋๋ค.
- ๋ณ๊ฒฝํ ํฌํ ๊ฐ ๋ฉ์ธ ํฌํ ๋ก ์ค์ ๋ฉ๋๋ค.
- ์ต์ ํฌํ ๋ฅผ ๋ณ๊ฒฝํ  ์ ์๊ณ  ์ญ์  ํ  ์ ์์ต๋๋ค.  
  โ ์ญ์ ํ  ๊ฒฝ์ฐ ๊ธฐ๋ณธ ๋ฐฐ๊ฒฝ์ผ๋ก ์ค์ ๋ฉ๋๋ค.
- ์ต์ ์ญ์ ํ  ์ ์์ต๋๋ค.

  <br />
  <img height="500" src="./preview/editShop-preview.gif" />
  <br /><br />

> 7. ํ๋กํ

- ์ ์ ๋ ์ ์ ๊ฐ ๊ฒ์ํ ์ต๊ณผ "์ข์์"ํ ์ต์ ํ์ธํ  ์ ์์ต๋๋ค.
- ์์ ์ "ํ๋ก์"ํ ์ ์ ๋ฅผ ํ์ธํ  ์ ์์ต๋๋ค.
- ํด๋น ์ ์ (๋ก๊ทธ์ธํ ์๊ธฐ์์ )๋ง ํ๋กํ ์์ ํ์ด์ง๋ก ์ด๋ํ  ์ ์์ต๋๋ค.
- ๋ค๋ฅธ ์ ์ ๋ค์ด "ํ๋ก์"ํ  ์ ์์ต๋๋ค.  
  โ `Apollo client`๋ฅผ ํตํด ์ ์ ์ ์บ์๋ฅผ ์์ ํ์ฌ ์ฆ๊ฐ์ ์ผ๋ก UI๋ฅผ ์๋ฐ์ดํธํฉ๋๋ค.
  <br /><br />

> 8. ํ๋กํ ์์ 

- ์ ์ ์ ์๋ฐํ์ ์ ์ ์ ์ ๋ณด๋ฅผ ์์ ํ  ์ ์์ต๋๋ค.
- ๋ฏธ๋ฆฌ๋ณด๊ธฐ๋ฅผ ํตํด ์๋ฐํ๋ฅผ ๋ณ๊ฒฝํ  ์ ์์ต๋๋ค.

  <br />
  <img height="500" src="./preview/profile-preview.gif" />
  <br /><br />

> 9. ๊ธฐํ ํ (share)

- useUser hook : ๋ก๊ทธ์ธ๋ ์ฌ์ฉ์๋ฅผ ํ์ธํ๋ ํ

```typescript
const useUser = ({ isPrivate }: UseUserProps) => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<Me>(ME_QUERY);

  useEffect(() => {
    if (isPrivate && !data?.me) {
      navigate("/", { replace: true });
      return;
    }
  }, [data?.me, isPrivate, navigate]);

  return { loading, error, user: data?.me };
};
```

<br />

- pagination : ํ์ด์ง ๊ตฌ๋ถ ๊ตฌํ

```typescript
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
```

<br />

- WindowSize : ์๋์ฐ ์ฌ์ด์ฆ ๋ณ๊ฒฝ - ๋ฐ์

```typescript
const WindowSize = () => {
  const [windowSize, setWindowSize] = useState(0);

  const handleSize = useCallback(() => {
    setWindowSize(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleSize);
    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, [handleSize, windowSize]);

  useEffect(() => {
    setWindowSize(window.innerWidth);
  }, []);

  return { windowSize };
};
```

<br />

## Pages

- ํ์๊ฐ์
- ๋ก๊ทธ์ธ

> ํ

- ์๋ก๋๋ ์ต
- ์๋ก๋ ์ต
- ๊ฒ์

> shop

- ์์ธํ์ด์ง
- ์ต ์์ 
- ์๋ก๋ ํฌํ 
- ๋๊ธ ์์ฑ ๋ฐ ์ญ์ 

> User

- ํ๋กํ
- ํ๋กํ ์์ 
  <br><br/>

## Features

### ๐ Shop

- Info
- ๊ฒ์ํ ํฌํ 
- ์๋ก๋ ํฌํ 
- ์ต ์์  (ํฌํ  ๋ฏธ๋ฆฌ๋ณด๊ธฐ, ์ญ์ )
- "์ข์์" ๊ธฐ๋ฅ (์ฆ๊ฐ์ ์ธ ๋ฐ์)
  <br />

### ๐โโ๏ธ User

- ํ์๊ฐ์ / ๋ก๊ทธ์ธ
- ์๋ฐํ ์๋ก๋ (ํฌํ  ๋ฏธ๋ฆฌ๋ณด๊ธฐ)
- ํ๋กํ ์์  (ํฌํ  ๋ฏธ๋ฆฌ๋ณด๊ธฐ, ์ญ์ )
- ํ์์ ๋ณด ๋ณ๊ฒฝ
  <br />

### Comment

- ๋๊ธ ์์ฑ ๋ฐ ์ญ์ 
- ์ฆ๊ฐ์ ์ธ ๋ฐ์

<br />

## Code

<a href="https://github.com/jangth0655/finder-client">๐ฅ GitHub</a>

<br /><br />

## ๋๋์  

- REST์ ๋ฌ๋ฆฌ Graphql์ ์๋ฒ์์ ํ์ํ ๋ฐ์ดํฐ๋ง ๋ฐ์์ฌ ์ ์๋ค๋ ์ ์ ํฅ๋ฏธ๋กญ๊ณ  ์ฌ๋ฐ์๋ค.
- `Apollo client`์ `useQuery`์ `useMutation`์ ์ฌ์ฉํ์ฌ ์๋ฒ์ ์ํธ์์ฉ ํ๋๊ฒ์ ์ข ๋ ์ดํดํ  ์ ์์๋ค.
- `React variables`์ ์ฌ์ฉํ์ฌ ์ ์ญ์ ์ผ๋ก ์ํ๊ด๋ฆฌ๋ฅผ ํด๋ณด๋ฉฐ ํ์์ฑ์ ์ ์ ์์๋ค.
- `fragment`์ `modify`์ ํ์ฉํ์ฌ `cache`๋ฅผ ์กฐ์ํ๋ ๊ฒ์ ์ข ๋ ์ดํดํ  ์ ์๋ ๊ณ๊ธฐ๊ฐ ๋์๋ค.
- ๋ฐ์ดํฐ๋ฅผ ์บ์ฌํ๋ ์ ์์ ๋ก๋ฉ์ด ํ์์๊ณ , ์บ์ฌํ ๋ฐ์ดํฐ๋ฅผ ์กฐ์ํ์ฌ ์ฆ๊ฐ์ ์ธ UI๋ฅผ ๋ํ๋ผ ์ ์๋ค๋ ์ ์์ ์ ํ๋ฆฌ์ผ์ด์์ด ์ข ๋ ์ฑ๋ฅ์ด ์ข์ ์ง๋ ๊ฒ์ ๋ฐฐ์ธ ์ ์์๋ค.
- ์ฌ๋ฌ input์ ๋ํ์ฌ `react-hook-form` ์ด์ฉํจ์ผ๋ก์จ ์ฝ๋ธ์ ๋ณต์ก์ฑ๊ณผ ์ ํจ์ฑ๊ฒ์ฌ๋ฅผ ๋ณด๋ค ์ฝ๊ฒ ํ  ์ ์์๋ค.
- ํ์ง๋ง ์์ง `cache`๋ฅผ ์กฐ์ํ๋ ๊ฒ์ ์์ด์ ๋ถ์กฑํจ์ ๋๊ผ๊ณ  ๋ ๋ค๋ฅธ ํ๋ก์ ํธ๋ฅผ ๋ง๋ค๋ฉด์ ์ข ๋ ์ฐ์ต์ด ํ์ํ๋ค๊ณ  ์๊ฐ์ด ๋ค์๋ค.
