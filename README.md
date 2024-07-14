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
 - 네오플 오픈 API 홈페이지에서 KEY 발급
   - AXIOS로 사이퍼즈 오픈 API 패칭
 - 메인 페이지
   - 리코일을 이용하여 검색기록을 로컬스토리지에 넣어서 관리
   - 검색한 캐릭터의 ID를 리액트 쿼리로 받아온 후 해당 ID로 또다시 리액트 쿼리로 매칭기록을 받아와서 프론트단에서 전체, 공식, 일반으로 분리하여 리코일로 관리
   - 프론트 단에서 데이터를 수정하여 함께 플레이한 파티원 목록을 담은 배열을 생성
### 주요 개발 스택

# 프로젝트 상세
### 클론 사이트를 선택한 이유
스스로 생각해서 만든 것은 내 능력의 범주 안에 있다고 생각하여 나보다 뛰어난 사람의 UIUX를 보며 실력을 키우기 위함이다.
또한 해당 사이트의 특성상 백엔드와 소통을 할 수 없는 상태이므로 프론트단에서 API 데이터를 상당하게 수정해야 한다.
이는 추후 백엔드와 협력하여 사이트를 만듦에 있어서 상당히 유용하다고 생각한다.

__프론트엔드에서 비즈니스 로직을 어느정도 감당했을 때 장점__
 - __서버 부하 감소:__ 
클라이언트 측에서 자원을 사용하여 서버의 부담을 줄일 수 있다. 특히 트래픽이 많은 애플리케이션의 경우 유리할 수 있다.
 - __응답 속도 개선:__ 
사용자가 입력한 데이터에 대한 처리를 클라이언트 측에서 바로 할 수 있어 응답 속도가 빨라진다.
 - __비용 절감:__ 
서버 리소스를 아끼고, 클라이언트 측에서 처리함으로써 서버 비용을 절감할 수 있다.
