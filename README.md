# 사이퍼즈 서포터 클론

![메인로고](https://github.com/user-attachments/assets/47fd8890-eda9-4a63-82d2-db77d9d2bfcd)
<img src="https://img.shields.io/badge/VITE-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/NODE.JS-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/TYPESCRIPT-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/REACT-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/REACT QUERY-FF4154?style=for-the-badge&logo=reactquery&logoColor=white">
<img src="https://img.shields.io/badge/AXIOS-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/RECOIL-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/REACT ROUTER-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/REACT HOOK FORM-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white">
<img src="https://img.shields.io/badge/TAILWINDCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/SKELETON-166BFF?style=for-the-badge&logo=keystone&logoColor=white">

사이퍼즈 서포터란 네오플에서 제공하는 사이퍼즈의 Open API를 활용하여 제작된 비공식 웹사이트이다.
이 사이트는 사이퍼즈 게임과 관련된 다양한 정보와 통계, 플레이어 전적 등을 제공한다.

# 프로젝트 소개

### 개발내역

- 네오플 오픈 API 홈페이지에서 KEY 발급 및 AXIOS로 사이퍼즈 오픈 API 패칭
- **CORS에러 해결(개발)**

  - ~~vite.config.js 수정~~
  - ~~heroku 프록시 서버를 이용하여 CORS 에러 해결~~
  - 노드js Express 프록시 서버를 구축하여 cors 미들웨어 적용 및 API 요청 프록시 처리
  - 빌드된 리액트 파일을 Express에서 정적 제공하여 백엔드와 프론트엔드 통합 배포

- **CORS에러 해결(배포)**

  - axiosInstance 인스턴스를 이용하여 배포 환경에서 API 키 자동 추가 설정
    - 기존엔 api 키를 노드js 서버에서 처리했기 때문

# 기능 상세

| 메인 페이지[(API 수정 과정)](./docs/APIDocumentation/APICombination/HOME.md)                      | 전적비교 페이지                                                                                   |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/rlaugs15/post/da729bc1-3040-4c77-84eb-a0cdecb6a496/image.jpg) | ![](https://velog.velcdn.com/images/rlaugs15/post/d06fa52b-6ed8-4ffe-8304-40376e50dd9c/image.png) |

| 매칭정보 조회 페이지[(API 수정 과정)](./docs/APIDocumentation/APICombination/PLAYERS.md)          | 캐릭터 조회 페이지[(API 수정 과정)](./docs/APIDocumentation/APICombination/CHAR_WIN_AND_PICK.md)  |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| ![](https://velog.velcdn.com/images/rlaugs15/post/0d5b21fe-b9b2-4325-afa9-2066c9f1bcb0/image.jpg) | ![](https://velog.velcdn.com/images/rlaugs15/post/9144a35f-04e8-42f5-84fa-077391c9f305/image.gif) |

| 프로필 이미지 변경                                                                                | 게시판                                                                                     |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| ![회원정보-수정](https://github.com/user-attachments/assets/dad77119-ba81-414f-ba94-6c4f869fa196) | ![게시판](https://github.com/user-attachments/assets/10a38c16-97ab-44ff-8f4a-e1c69762171b) |

- **메인 페이지**
  - 리코일을 이용하여 검색기록을 로컬스토리지에 넣어서 관리
  - 검색한 캐릭터의 닉네임을 이용해 React Query로 유저ID를 받아와 추가 데이터 패칭 및 프론트단에서 데이터 수정
  - 파티원 목록 생성 및 관리
- **전적비교 및 매칭정보 조회 페이지**
  - 검색창에 입력된 2명의 유저를 쉼표로 구분하여 각각 조회
  - 해당 판의 매칭 상세정보를 받아와 프론트단에서 승리팀과 패배팀을 분리하고, 함께 플레이한 파티원 프로퍼티 추가
- **캐릭터 정보 조회 페이지**
  - 캐릭터 이름을 입력할 때 submit을 보낼 필요 없이 실시간으로 조회
  - 로컬스토리지에 캐릭터 정보를 저장하여 즐겨찾기 기능 추가
  - 캐릭터 정보 데이터와 캐릭터 랭킹 데이터를 조합하여 캐릭터 승률 및 픽률 통계 구현
  - 각 캐릭터마다 댓글 기능 추가
  - 캐릭터 댓글 무한스크롤 페이지 추가
- **회원가입 페이지**
  - 로그인ID, 닉네임, 이메일 중복체크 기능 구현
  - 모든 중복체크가 완료되어야 회원가입 버튼 활성화
- **로그인 페이지**
  - 가입한 ID와 비밀번호를 이용하여 로그인
- **회원정보 수정 페이지**
  - URL.createObjectURL()로 빠른 미리보기 제공, URL.revokeObjectURL()로 메모리 누수 방지
  - 기존 프로필 이미지 유지 및 변경 시 즉시 반영
- **게시판 페이지**
  - 한 페이지마다 게시글 최대 10개 조회
  - 버튼 클릭으로 페이지를 이동할 경우 첫페이지 혹은 마지막 페이지에 도달할 시 버튼 비활성화
  - 숫자 입력으로 페이지를 이동할 경우 전체 페이지 범위에서 벗어나면 0 페이지 혹은 마지막 페이지로 이동
  - 리액트 쿼리의 낙관적 업데이트를 이용한 실시간과 같은 댓글 작성과 좋아요 기능

### 주요 개발 스택

| Category         | Package Name           | Version | 
| ---------------- | ---------------------- | ------- |
| Bundler          | Vite                   | 5.2.0   |
| Runtime          | Node.js                | 20.11.1 |
| Language         | TypeScript             | 5.2.2   |
| Library          | React                  | 18.2.0  |
| Data Fetching    | React Query            | 3.39.3  |
| HTTP Client      | Axios                  | 1.6.8   |
| State Management | Recoil                 | 0.7.7   |
| Routing          | React Router           | 6.22.3  |
| Form Handling    | React Hook Form        | 7.51.2  |
| Styling          | TailwindCSS            | 3.4.3   |
| Skeleton Screens | React Loading Skeleton | 3.4.0   |
| UI Components | Shadcn | Latest   |

# 프로젝트 상세

### 클론 사이트를 선택한 이유

스스로 생각해서 만든 것은 내 능력의 범주 안에 있다고 생각하여 나보다 뛰어난 사람의 UIUX를 보며 실력을 키우기 위함이다.  
또한 해당 사이트의 특성상 백엔드와 소통을 할 수 없는 상태이므로 프론트단에서 API 데이터를 상당하게 수정해야 한다.  
이는 추후 백엔드와 협력하여 사이트를 만듦에 있어서 상당히 유용하다고 생각한다.

**프론트엔드에서 비즈니스 로직을 어느정도 감당했을 때 장점**

- **서버 부하 감소:**
  클라이언트 측에서 자원을 사용하여 서버의 부담을 줄일 수 있다. 특히 트래픽이 많은 애플리케이션의 경우 유리할 수 있다.
- **응답 속도 개선:**
  사용자 입력 데이터의 클라이언트 측 처리를 통해 빠른 응답을 제공한다.
- **비용 절감:**
  서버 리소스를 아끼고, 클라이언트 측에서 처리함으로써 서버 비용을 절감할 수 있다.

# API 명세서

### API 응답 형식 예시

- 성공시 code, message , data(전송해야 할 데이터가 있는 경우)로 나뉨
- 실패시 status, code , message로 나뉨
- 로그인 성공
  ```json
  {
    "code": 200,
    "message": "로그인 성공"
  }
  ```
- 로그인 실패
  ```json
  {
    "code": 401,
    "message": "로그인 실패"
  }
  ```
- 회원정보 조회

```json
{
  "code": 200,
  "message": "회원정보 조회에 성공",
  "data": {
    "id": 4,
    "email": "test@test.com",
    "nickname": null,
    "profileImg": null,
    "createdAt": null
  }
}
```

### [캐릭터 댓글 기능 API 문서](./docs/APIDocumentation/CHAMP_COMMENT_API.md)

### [Member 기능 API 문서](./docs/APIDocumentation/MEMBER_API.md)

### [Board 기능 API 문서](./docs/APIDocumentation/BOARD_API.md)

# [버그 해결](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md)

### [CORS 에러](./docs/TROUBLESHOOTING.md#cors-에러)

### [테일윈드에서 클래스가 동적으로 적용되지 않는 문제](./docs/TROUBLESHOOTING.md#테일윈드에서-클래스가-동적으로-적용되지-않는-문제)

### [페이지네이션 시에 화면 깜빡임 현상](./docs/TROUBLESHOOTING.md#페이지네이션-시에-화면-깜빡임-현상)

### [PlayerBasicInfo 하위 컴포넌트 로딩현상 해결](./docs/TROUBLESHOOTING.md#playerbasicinfo-하위-컴포넌트-로딩현상-해결)

### [CharWindAndPick 컴포넌트 버그 수정](./docs/TROUBLESHOOTING.md#charwindandpick-컴포넌트-버그-수정)

- winRateList을 인자로 받는 calculateAverage 함수가 winRateList의 계산 과정을 기다리지 못 하고 인자로 받아가서 에러 발생

### [리액트 라우터 경로 설정 문제(새로고침 시 경로 오류 발생)](./docs/TROUBLESHOOTING.md#리액트-라우터-경로-설정-문제새로고침-시-경로-오류-발생)

### [Vite 환경에서 MSW 경로 설정으로 발생한 에러 해결](./docs/TROUBLESHOOTING.md#vite-환경에서-msw-경로-설정으로-발생한-에러-해결)

### [승률 및 픽률 계산 오류 수정](./docs/TROUBLESHOOTING.md#승률-및-픽률-계산-오류-수정)

- CharWindAndPick 컴포넌트에서 승률, 픽률 데이터 계산 시 중복된 값들이 업데이트

### [AXIOS DELETE 요청 에러 수정(data 속성에 body 전달)](./docs/TROUBLESHOOTING.md#axios-delete-요청-에러-수정data-속성에-body-전달)

- RESTful 관점에서 DELETE 요청은 데이터(payload)를 포함하는 것은 일반적이지 않지만 이번엔 포함해봤다.
- 다른 방법으로는 URL 쿼리 파라미터를 사용하는 것도 있다.

### [useEffect 내 조건문에서 undefined 처리로 인한 잘못된 라우팅 문제 해결](./docs/TROUBLESHOOTING.md#useeffect-내-조건문에서-undefined-처리로-인한-잘못된-라우팅-문제-해결)

- if문 내에서의 data?.ok와 data && data.ok의 차이

### [타입스크립트: 컴포넌트에서 동적으로 객체의 속성에 접근](./docs/TROUBLESHOOTING.md#컴포넌트에서-동적으로-객체의-속성에-접근)

### [요소가 들어있는 자식태그의 크기보다 부모태그의 크기가 작아 일어나는 줄바꿈 현상](./docs/TROUBLESHOOTING.md#요소가-들어있는-자식태그의-크기보다-부모태그의-크기가-작아-일어나는-줄바꿈-현상)

### [form 태그 내부의 id 중복검사를 위한 버튼 클릭 시 form 전체가 submit 되는 문제](./docs/TROUBLESHOOTING.md#form-태그-내부의-id-중복검사를-위한-버튼-클릭-시-form-전체가-submit-되는-문제)

### [문자열 내의 `\n`로 인한 줄바꿈이 이루어지지 않는 현상](./docs/TROUBLESHOOTING.md#문자열-내의-n로-인한-줄바꿈이-이루어지지-않는-현상)
