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

- 🛠 [Built with](#built-with)
- 🚀 [Project](#project)
- 📖 [Pages](#pages)
- ✓ [Features](#features)
- 🔥 [Code](#code)
- 👍 [느낀점](#느낀점)

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

→ 마음에 드는 샵을 홍보하거나 탐색하는 등 여러사람이 모여 자유롭게 커뮤니케이션 하는 공간입니다.

✓ 모든 `이미지는 AWS S3`의 버킷에 저장됩니다.
<br /><br />

> 네비게이션

- 로그아웃 또는 로그인(로그인 여부), 아바타가 있습니다.
- 아바타를 통해 유저 프로필을 확인할 수 있습니다.
- 업로드와 프로필을 확인할 수 있습니다.
  <br /><br />

> 1. 회원가입, 로그인

- 유저네임, 이름, 이메일, 지역, 커리어, 비밀번호를 입력하여 로그인 할 수 있습니다.
- 유저네임과 이메일은 필수조건이며, 중복이 불가하도록 하였습니다.(유니크)
- 로그인이 성공적인 경우 `Apollo client`의 `Reactive variable`를 통해 local state를 업데이트합니다.

  <br />
  <img height="500" src="./preview/login-preview.gif" />
  <br></br>

> 2. Shops

- shop이름과 슬러그, 업로드일을 확인 할 수있습니다.
- shop 디테일페이지와 "좋아요"를 클릭 할 수 있습니다. (코드 ↓)

```typescript
// 해당 샵의 아이디를 fav로 뮤테이션합니다. (서버)
// 즉각적인 반응을 얻기 위해 아폴로 캐쉬를 변형하였습니다. (cache.modify)
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

> 3. 검색

- shop이름(제목)으로 검색을 할 수 있습니다.
- 관련된 shop들을 확인 할 수 있습니다.

  <br />
  <img height="500" src="./preview/search-preview.gif" />
  <br /><br />

> 4. 업로드

- 샵 정보  
  → 포토, 이름(제목), 슬러그, 지역, 전화번호 등을 입력하여 업로드 할 수 있습니다.
- `react-hook-form`을 활용하여 포토는 미리보기를 통해 업로드할 수 있습니다. (코드 ↓)

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

> 5. About Shop (상세정보)

- 샵 상세페이지에서 샵의 지역, 사이트, 전화번호 등 확인 할 수 있습니다.
- 업로드 한 유저네임을 클릭하여 유저의 프로필로 이동할 수 있습니다.
- 샵에서 게시한 포토를 확인할 수 있습니다.
- 샵에 대하여 유저들은 댓글을 게시 및 삭제를 할 수 있습니다.  
  → 댓글을 작성한다면, `Apollo client`를 통해 댓글을 캐시된 필드 값을 직접 생성합니다.  
  → 댓글을 삭제한다면(본인), `Apollo client`를 통해 댓글을 캐시된 필드 값을 filter합니다.
- 해당 `샵 유저`라면 사진을 업로드 할 수 있습니다.
- 해당 `샵 유저`라면 샵 수정페이지로 이동할 수 있습니다.

```typescript
// 캐스 수정 → 댓글 생성
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
// 댓글 삭제 (filter)
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

> 6. Edit Shop (샵 수정)

- 샵 정보  
  → 이름(제목), 슬러그, 지역, 전화번호 등을 수정할 수 있습니다.
- 샵의 이름(제목), 슬러그는 유니크하게 설정됩니다.
- 미리보기를 통해 샵의 포토를 확인 할 수 있습니다.
- 변경한 포토가 메인 포토로 설정됩니다.
- 샵의 포토를 변경할 수 있고 삭제 할 수 있습니다.  
  → 삭제할 경우 기본 배경으로 설정됩니다.
- 샵을 삭제할 수 있습니다.

  <br />
  <img height="500" src="./preview/editShop-preview.gif" />
  <br /><br />

> 7. 프로필

- 유저는 유저가 게시한 샵과 "좋아요"한 샵을 확인할 수 있습니다.
- 자신을 "팔로워"한 유저를 확인할 수 있습니다.
- 해당 유저(로그인한 자기자신)만 프로필 수정페이지로 이동할 수 있습니다.
- 다른 유저들이 "팔로워"할 수 있습니다.  
  → `Apollo client`를 통해 유저의 캐시를 수정하여 즉각적으로 UI를 업데이트합니다.
  <br /><br />

> 8. 프로필 수정

- 유저의 아바타와 유저의 정보를 수정할 수 있습니다.
- 미리보기를 통해 아바타를 변경할 수 있습니다.

  <br />
  <img height="500" src="./preview/profile-preview.gif" />
  <br /><br />

> 9. 기타 훅 (share)

- useUser hook : 로그인된 사용자를 확인하는 훅

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

- pagination : 페이지 구분 구현

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

- WindowSize : 윈도우 사이즈 변경 - 반응

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

- 회원가입
- 로그인

> 홈

- 업로드된 샵
- 업로드 샵
- 검색

> shop

- 상세페이지
- 샵 수정
- 업로드 포토
- 댓글 생성 및 삭제

> User

- 프로필
- 프로필 수정
  <br><br/>

## Features

### 🌈 Shop

- Info
- 게시한 포토
- 업로드 포토
- 샵 수정 (포토 미리보기, 삭제)
- "좋아요" 기능 (즉각적인 반응)
  <br />

### 🙋‍♂️ User

- 회원가입 / 로그인
- 아바타 업로드 (포토 미리보기)
- 프로필 수정 (포토 미리보기, 삭제)
- 회원정보 변경
  <br />

### Comment

- 댓글 작성 및 삭제
- 즉각적인 반응

<br />

## Code

<a href="https://github.com/jangth0655/finder-client">🔥 GitHub</a>

<br /><br />

## 느낀점 

- REST와 달리 Graphql은 서버에서 필요한 데이터만 받아올 수 있다는 점에 흥미롭고 재밌었다.
- `Apollo client`의 `useQuery`와 `useMutation`을 사용하여 서버와 상호작용 하는것을 좀 더 이해할 수 있었다.
- `React variables`을 사용하여 전역적으로 상태관리를 해보며 필요성을 알 수 있었다.
- `fragment`와 `modify`을 활용하여 `cache`를 조작하는 것을 좀 더 이해할 수 있는 계기가 되었다.
- 데이터를 캐쉬하는 점에서 로딩이 필요없고, 캐쉬한 데이터를 조작하여 즉각적인 UI를 나타낼 수 있다는 점에서 애플리케이션이 좀 더 성능이 좋아 지는 것을 배울 수 있었다.
- 여러 input에 대하여 `react-hook-form` 이용함으로써 코듸의 복잡성과 유효성검사를 보다 쉽게 할 수 있었다.
- 하지만 아직 `cache`를 조작하는 것에 있어서 부족함을 느꼈고 또 다른 프로젝트를 만들면서 좀 더 연습이 필요하다고 생각이 들었다.
