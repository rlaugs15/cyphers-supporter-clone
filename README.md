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

- heroku 프록시 서버를 이용하여 CORS 에러 해결
- 네오플 오픈 API 홈페이지에서 KEY 발급 및 AXIOS로 사이퍼즈 오픈 API 패칭
- **메인 페이지**
  - 리코일을 이용하여 검색기록을 로컬스토리지에 넣어서 관리
  - 검색한 캐릭터의 닉네임을 이용해 React Query로 유저ID를 받아와 추가 데이터 패칭 및 프론트단에서 데이터 수정
  - 파티원 목록 생성 및 관리
- **전적비교 및 매칭정보 조회 페이지**
  - 검색창에 입력된 2명의 유저를 쉼표로 구분하여 각각 조회
  - 해당 판의 매칭 상세정보를 받아와 프론트단에서 승리팀과 패배팀을 분리하고, 함께 플레이한 파티원 프로퍼티 추가

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

# [트러블 슈팅](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md)

### [CORS 에러](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#cors-%EC%97%90%EB%9F%AC)
### [테일윈드에서 클래스가 동적으로 적용되지 않는 문제](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#%ED%85%8C%EC%9D%BC%EC%9C%88%EB%93%9C%EC%97%90%EC%84%9C-%ED%81%B4%EB%9E%98%EC%8A%A4%EA%B0%80-%EB%8F%99%EC%A0%81%EC%9C%BC%EB%A1%9C-%EC%A0%81%EC%9A%A9%EB%90%98%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%AC%B8%EC%A0%9C)
### [페이지네이션 시에 화면 깜빡임 현상](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EC%8B%9C%EC%97%90-%ED%99%94%EB%A9%B4-%EA%B9%9C%EB%B9%A1%EC%9E%84-%ED%98%84%EC%83%81)
### [PlayerBasicInfo 하위 컴포넌트 로딩현상 해결](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#playerbasicinfo-%ED%95%98%EC%9C%84-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%A1%9C%EB%94%A9%ED%98%84%EC%83%81-%ED%95%B4%EA%B2%B0)
### [CharWindAndPick 컴포넌트 버그 수정](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#charwindandpick-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%EB%B2%84%EA%B7%B8-%EC%88%98%EC%A0%95)
### [리액트 라우터 경로 설정 문제(새로고침 시 경로 오류 발생)](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EA%B2%BD%EB%A1%9C-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-%EC%8B%9C-%EA%B2%BD%EB%A1%9C-%EC%98%A4%EB%A5%98-%EB%B0%9C%EC%83%9D)
### [Vite 환경에서 MSW 경로 설정으로 발생한 에러 해결](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#vite-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-msw-%EA%B2%BD%EB%A1%9C-%EC%84%A4%EC%A0%95%EC%9C%BC%EB%A1%9C-%EB%B0%9C%EC%83%9D%ED%95%9C-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0)
### [승률 및 픽률 계산 오류 수정](https://github.com/rlaugs15/cyphers-supporter-clone/blob/main/docs/TROUBLESHOOTING.md#%EC%8A%B9%EB%A5%A0-%EB%B0%8F-%ED%94%BD%EB%A5%A0-%EA%B3%84%EC%82%B0-%EC%98%A4%EB%A5%98-%EC%88%98%EC%A0%95)
