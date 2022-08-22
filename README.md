![header](https://capsule-render.vercel.app/api?type=rounded&color=auto&height=100&section=header&text=Finder&fontSize=50)

<div align="center">
  <a href="https://finder-web.netlify.app/>
    <img  height="70" src="./src/assets/images/logo.jpeg" />
    <br /><br />
    <a display="block" href="https://finder-web.netlify.app/">https://finder-web.netlify.app/</a>
    <br /><br />
    <img height="700" src="./previews/1.gif" />
  </a>
</div>

## Content

- 🛠 [Built with](#built-with)
- 🚀 [Project](#project)
- 📖 [Pages](#pages)
- ✓ [Features](#features)
- 🔥 [Code](#code)

---

## Built with

### Front-end

- `React`
- `Typescript`
- `Styled-components`
- `Framer-motion`
- `Apollo-client`

### Back-end

- `Apollo-server`
- `Graphql`
- `Postgres`

### Deploy

- Client : `Netlify`
- Server : `Heroku`

## Project

✓ 모든 `이미지는 AWS S3`의 버킷에 저장됩니다.

> 네비게이션

- 로그아웃 또는 로그인(로그인 여부), 아바타가 있습니다.
- 아바타를 통해 유저 프로필을 확인할 수 있습니다.
- 업로드와 프로필을 확인할 수 있습니다.

> 1. 회원가입, 로그인

- 유저네임, 이름, 이메일, 지역, 커리어, 비밀번호를 입력하여 로그인 할 수 있습니다.
- 비밀번호는 `bcrypt`를 사용하여 해시화 되고 DB에 저장됩니다.
- `jwt`를 통해 유저를 인증하여 로그인됩니다.
  <br></br>

> 2. Shops

- shop이름과 슬러그, 업로드일을 확인 할 수있습니다.
- shop 디테일페이지와 "좋아요"를 클릭 할 수 있습니다.
  <br /><br />

> 3. 검색

- shop이름(제목)으로 검색을 할 수 있습니다.
- 관련된 shop들을 확인 할 수 있습니다.
  <br /><br />

> 4. 업로드

- 샵 정보  
  → 포토, 이름(제목), 슬러그, 지역, 전화번호 등을 입력하여 업로드 할 수 있습니다.
- 포토는 미리보기를 통해 업로드할 수 있습니다.
  <br /><br />

> 5. About Shop (상세정보)

- 샵 상세페이지에서 샵의 지역, 사이트, 전화번호 등 확인 할 수 있습니다.
- 업로드 한 유저네임을 클릭하여 유저의 프로필로 이동할 수 있습니다.
- 샵에서 게시한 포토를 확인할 수 있습니다.
- 샵에 대하여 유저들은 댓글을 게시 및 삭제를 할 수 있습니다.
- 해당 `샵 유저`라면 사진을 업로드 할 수 있습니다.
- 해당 `샵 유저`라면 샵 수정페이지로 이동할 수 있습니다.
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
  <br /><br />

> 7. 프로필

- 유저는 유저가 게시한 샵과 "좋아요"한 샵을 확인할 수 있습니다.
- 자신을 "팔로워"한 유저를 확인할 수 있습니다.
- 해당 유저(로그인한 자기자신)만 프로필 수정페이지로 이동할 수 있습니다.
- 다른 유저들이 "팔로워"할 수 있습니다.

> 8. 프로필 수정

- 유저의 아바타와 유저의 정보를 수정할 수 있습니다.
- 미리보기를 통해 아바타를 변경할 수 있습니다.

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

## Feature

### 🌈 Shop

- Info
- 게시한 포토
- 댓글 게시 및 삭제
- 업로드 포토
- 샵 수정 (포토 미리보기, 삭제)

### 🙋‍♂️ User

- 회원가입 / 로그인
- 아바타 업로드 (포토 미리보기)
- 프로필 수정 (포토 미리보기, 삭제)
- 회원정보 변경

## Code

<a href="https://github.com/jangth0655/finder-client">🔥 GitHub</a>
