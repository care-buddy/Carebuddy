## 프로젝트 : carebuddy

제작 기간 : 2024.07.01 ~ 2024.10.30

## 프로젝트 소개


**반려동물 질병 관련 소셜 네트워크 서비스, 케어버디**

커뮤니티와 건강 다이어리를 통해 반려 동물의 건강을 관리하며 사랑하는 나의 가족과 오랫동안 행복한 시간을 보내세요.

## 폴더 구조


### front-end

```markdown
.
└── src
    ├── assets
    ├── components
    ├── constants
    ├── hooks
    ├── lib
    ├── pages
    ├── recoil
    │   ├── atoms
    │   └── selectors    
    ├── routes
    ├── types
    └── utils
```

### back-end

```markdown
.
├── public
├── server
│   ├── constants
│   ├── controller
│   ├── db
│   │   ├── models
│   │   └── schemas
│   ├── middlewares
│   ├── passport
│   │   └── strategies
│   ├── routes
│   ├── services
│   └── utils
├── types
│   └── passport
├── uploads
│   └── public
└── views
```

## 배포 주소


[carebuddy](http://kdt-sw-8-team01.elicecoding.com/)

### 시작 가이드

**installation**

```bash
git clone [주소]
cd 폴더명
npm install
npm run dev
```

**.env (완)**

```jsx
MONGODB_PASSWORD=
MONGO_URI=
PORT=

SECRET_KEY=
ACCESS_SECRET=
REFRESH_SECRET=
AUTH_KEY=
JWT_EXP=
JWT_ALG=

ADMIN_EMAIL=
NODEMAILER_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY
AWS_S3_BUCKET_NAME=
```

## 기술 스택(하는중)

**Front-End**
<div>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
<img src="https://img.shields.io/badge/styled--components-DB7093?style=flat&logo=Styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=Axios&logoColor=white" />
<img src="https://img.shields.io/badge/Recoil-3578E5?style=flat&logo=Recoil&logoColor=white" />
</div>

**Back-End**
<div>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=TypeScript&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white" />
<img src="https://img.shields.io/badge/Express-000000?style=flat&logo=Express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=MongoDB&logoColor=white" />
<img src="https://img.shields.io/badge/Mongoose-880000?style=flat&logo=Mongoose&logoColor=white" />
<img src="https://img.shields.io/badge/jsonwebtokens-000000?style=flat&logo=jsonwebtokens&logoColor=white" />
</div>

**Deploy**
<div>
<img src="https://img.shields.io/badge/docker-2496ED?style=flat&logo=Docker&logoColor=white">
<img src="https://img.shields.io/badge/amazons3-569A31?style=flat&logo=Amazons3&logoColor=white">
</div>

**Tools**
<div>
<img src="https://img.shields.io/badge/Notion-000000?style=flat&logo=Notion&logoColor=white" />
<img src="https://img.shields.io/badge/Discord-5865F2?style=flat&logo=Discord&logoColor=white" />
<img src="https://img.shields.io/badge/dotenv-ECD53F?style=flat&logo=dotenv&logoColor=white" />
<img src="https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=Figma&logoColor=white" />
<img src="https://img.shields.io/badge/Postman-FF6C37?style=flat&logo=Postman&logoColor=white" />
</div>
---

## 전체 기능


| 사용자 관련 기능 | 로그인, 회원가입, 회원탈퇴, 회원정보 CRUD |
| --- | --- |
| 커뮤니티 관련 기능 | 게시글 목록 및 상세 조회, 게시글 작성 및 삭제, 좋아요, 댓글 CRUD, 카테고리 CRUD |
| 반려동물 관련 기능 | 반려동물정보 CRUD, 진료기록 CRUD |
| 검색 관련 기능 | 병원 전체 조회 및 검색, 약국 전체 조회 및 검색 |

## 기능 예시


- 회원가입
    - 이메일 인증 이후 회원가입
- 로그인 및 로그아웃
    - JWT 를 이용한 로그인/ 로그아웃
    - silent-refresh를 이용한 자동 로그인 연장
- 게시글
    - 게시글 조회
    - 게시글 작성 및 수정, 삭제
    - 게시글 좋아요
- 댓글
    - 댓글 조회, 작성 및 수정, 삭제
- 커뮤니티
    - 카테고리별 커뮤니티 그룹 조회
    - 내가 원하는 커뮤니티 그룹에 가입/탈퇴
- 마이페이지
    - 커뮤니티 그룹 가입 및 탈퇴
    - 반려동물 추가 및 수정, 삭제
    - 본인 정보 조회 및 수정/ 회원 탈퇴
- 유저페이지
    - 다른 유저의 정보 조회
- 반려동물 다이어리
    - 진료기록 조회, 작성 및 수정, 삭제
    - 반려동물 정보 조회 작성 및 수정, 삭제
- 검색
    - 병원 및 약국 지역별 검색
    - 헤더에서 전체 게시글 검색어를 통한 조회

## 프로젝트 팀원

| <img src="https://avatars.githubusercontent.com/u/82208408?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/17975448?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/153361838?v=4" width="150" height="150"/> | <img src="https://avatars.githubusercontent.com/u/114378301?v=4" width="150" height="150"/> |
| --- | --- | --- | --- |
| JiYeon Kim<br/>[@k65860](https://github.com/k65860) | [@petitesize](https://github.com/petitesize) | yushin pak<br/>[@yushinpak](https://github.com/yushinpak) | Dayeon<br/>[@dayyeun](https://github.com/dayyeun) |
| Frontend | Frontend | Frontend | Backend |
