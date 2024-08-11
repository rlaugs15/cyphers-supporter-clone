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
 - __메인 페이지__
   - 리코일을 이용하여 검색기록을 로컬스토리지에 넣어서 관리
   - 검색한 캐릭터의 닉네임을 이용해 React Query로 유저ID를 받아와 추가 데이터 패칭 및 프론트단에서 데이터 수정
   - 파티원 목록 생성 및 관리
 - __전적비교 및 매칭정보 조회 페이지__
   - 검색창에 입력된 2명의 유저를 쉼표로 구분하여 각각 조회
   - 해당 판의 매칭 상세정보를 받아와 프론트단에서 승리팀과 패배팀을 분리하고, 함께 플레이한 파티원 프로퍼티 추가
### 주요 개발 스택
| Category          | Package Name      | Version |
|-------------------|-------------------|---------|
| Bundler           | Vite              | 5.2.0   |
| Runtime           | Node.js           | 20.11.1 |
| Language          | TypeScript        | 5.2.2   |
| Library           | React             | 18.2.0  |
| Data Fetching     | React Query       | 3.39.3  |
| HTTP Client       | Axios             | 1.6.8   |
| State Management  | Recoil            | 0.7.7   |
| Routing           | React Router      | 6.22.3  |
| Form Handling     | React Hook Form   | 7.51.2  |
| Styling           | TailwindCSS       | 3.4.3   |
| Skeleton Screens  | React Loading Skeleton | 3.4.0   |

# 프로젝트 상세
### 클론 사이트를 선택한 이유
스스로 생각해서 만든 것은 내 능력의 범주 안에 있다고 생각하여 나보다 뛰어난 사람의 UIUX를 보며 실력을 키우기 위함이다.   
또한 해당 사이트의 특성상 백엔드와 소통을 할 수 없는 상태이므로 프론트단에서 API 데이터를 상당하게 수정해야 한다.  
이는 추후 백엔드와 협력하여 사이트를 만듦에 있어서 상당히 유용하다고 생각한다.

__프론트엔드에서 비즈니스 로직을 어느정도 감당했을 때 장점__
 - __서버 부하 감소:__ 
클라이언트 측에서 자원을 사용하여 서버의 부담을 줄일 수 있다. 특히 트래픽이 많은 애플리케이션의 경우 유리할 수 있다.
 - __응답 속도 개선:__ 
사용자 입력 데이터의 클라이언트 측 처리를 통해 빠른 응답을 제공한다.
 - __비용 절감:__ 
서버 리소스를 아끼고, 클라이언트 측에서 처리함으로써 서버 비용을 절감할 수 있다.

# 트러블 슈팅
### CORS 에러
오픈 api를 가져오는 도중 CORS에러가 발생  
 - __시도한 방법__  
   - __https://cors-anywhere.herokuapp.com/ 프록시 서버를 이용__  
     일시적인 방법이다.  
     IP가 바뀌거나 일정시간이 지나면 무효화된다. 특정 사이트에 접속하여 버튼을 눌러 정기적으로 활성화 시켜야 한다.
   ```typescript
   export async function getPlayerInfo(playerId: string) {
     const response = await axios.get(
       `https://cors-anywhere.herokuapp.com/${BASE_PATH}/cy/players/${playerId}?apikey=${API_KEY}`
     );
     return response.data;
   }
   ```
   - __vite.config.js 수정__  
     로컬 개발 환경에서 CORS 우회를 위해 프록시 설정을 유지  
     https://cors-anywhere.herokuapp.com/ 프록시 서버를 이용할 때의 불편함은 해결했다.
     하지만 배포된 환경에선 적용되지 않았다.
     ```typescript
     import { defineConfig } from "vite";
     import react from "@vitejs/plugin-react-swc";

     // https://vitejs.dev/config/
     export default defineConfig({
       plugins: [react()],
       base: "/cyphers-supporter-clone/",
       server: {
         proxy: {
           "/api": {
             target: "https://api.neople.co.kr",
             changeOrigin: true,
             rewrite: (path) => path.replace(/^\/api/, ""),
           },
         },
       },
     });
     ```
         
  - __해결한 방법__  
    따로 노드js 서버를 만들어서 오픈 api의 CORS에러를 해결했다.

### 테일윈드에서 클래스가 동적으로 적용되지 않는 문제
 - __문제코드__
```typescript
function MyComponent ({win, text}) {
  return (
    <div className={`${win ? "bg-blue-500" : "bg-red-500"} font-semibold`}>{text}</div>
  )
}
```

 - __해결__
```typescript
function MyComponent ({win, text}) {
  return (
    <div
      className="font-semibold">{text}</div>
      style={{ backgroundColor: `${win ? "blue" : "red"}` }}
  )
}
```
 - __추정되는 원인__
   
   - __잘못된 파일 경로 설정__
     - 테일윈드 설정에서 CSS 클래스가 포함된 파일들을 스캔할 경로가 잘못 지정된 경우, 테일윈드가 해당 파일들을 인식하지 못해 클래스가 누락될 수 있다.  
   - __복잡한 동적 문자열 조합__
     - 템플릿 리터럴이나 함수 호출 등 복잡한 방식으로 클래스 이름이 구성된 경우, 테일윈드가 이를 완전히 이해하지 못할 수 있다.  
     하지만, 제시된 방식(win ? "bg-blue-500" : "bg-red-500")은 비교적 단순한 방식이라 이 경우에는 해당하지 않을 것  
   - __빌드 과정의 문제__
     때때로 빌드 도구(예: Webpack, Vite 등)의 설정에 문제가 있어 테일윈드의 클래스를 제대로 포함하지 못하는 경우가 있을 수 있다.
 - __해결__  
   빌드 과정의 문제로 추정된다. 여러 시도를 한 결과 styleProps에 동적인 속성을 넣는 것으로 해결했다.

###  페이지네이션 시에 화면 깜빡임 현상
다음 페이지로 넘어갈 때 데이터를 불러오는 짦은 시간 동안 로딩상태가 되어 스켈레톤ui가 보인다.  
새로운 데이터가 패칭될 때까지 이전 캐시 데이터 유지가 필요하다고 느꼈다.

 - __해결__
   ```typescript
   const { data: recordData, isLoading: isLoadingRecord } = useQuery({
     queryFn: ({ headers }) =>
       getDailyRecord(headers, {recordDate: date }),
       queryKey: [API_GET_DAILY_RECORD_KEY, {recordDate: date }],
       enabled: !!date,
  
       // 이전 데이터를 유지할 경우(해당 방식으로 해결)
  	    keepPreviousData: true, 
  
       //더미 데이터를 사용할 경우
       placeholderData: {
         // 데이터가 처음 로드될 때 사용할 기본 데이터
         data: {
           records: [],
           totalRecords: 0,
         },
   });
   ```
    - __placeholderData__
       - __목적:__ 데이터가 로딩되는 동안 사용자에게 초기 화면을 제공하기 위해 기본값이나 더미 데이터를 설정
       - __동작 방식:__
          - 쿼리가 처음 시작될 때 data의 초기값을 설정
          - 쿼리가 성공적으로 완료되면 실제 데이터로 대체
          - isLoading 상태는 여전히 true이며, 로딩이 끝나면 isLoading이 false로 변경
            
    - __keepPreviousData__
       - __목적:__ 페이지네이션이나 데이터가 변경될 때, 새로운 데이터가 로딩되는 동안 이전 데이터를 화면에 유지하여 깜빡임을 방지
       - __동작 방식:__
          - 쿼리 키가 변경되어 새로운 데이터를 로드할 때까지 이전 데이터를 유지
          - 쿼페이지 전환이나 쿼리 파라미터가 변경될 때 유용
          - isLoading 상태가 true로 설정되지 않는다. 대신 isFetching 상태가 사용

### PlayerBasicInfo 하위 컴포넌트 로딩현상 해결
해당 페이지는 유저 닉네임을 검색하면 PlayerBasicInfo 컴포넌트가 렌더링 된 후, 전체/공식/일반 탭을 클릭하여 각각의 기록을 볼 수 있다.
<img width="833" alt="PlayerBasicInfo 하위 로딩현상 해결" src="https://github.com/user-attachments/assets/3a1f8003-2096-4fbc-bf2e-1fb64be9340c">

 - __문제__  
   전체/공식/일반 탭을 클릭할 때마다 로딩 현상이 발생

 - __원인__  
   이전엔 PlayerBasicInfo의 하위 컴포넌트에서 각각 리액트쿼리로 로딩  
   그로 인해 홈 화면에서 유저 검색 후 전체, 일반, 공식 탭을 누르면 각각의 하위 컴포넌트에 매번 로딩현상이 발생

 - __해결__  
   유저를 검색하는 PlayerBasicInfo 컴포넌트에서 유저 검색 시 하위 컴포넌트에서 필요한 데이터도 한꺼번에 가져옴  
   이후 리코일로 하위 컴포넌트들에게 각각 데이터를 공유하여 로딩현상 해결

### CharWindAndPick 컴포넌트 버그 수정
winRateList의 계산과정을 기다리지 못 하고 winRate가 실행되어 버그가 발생

 - __기존 코드__  
   winRateList을 인자로 받는 calculateAverage 함수가 winRateList의 계산 과정을 기다리지 못 하고 인자로 받아가서 에러 발생
   ```typescript
   if (!charactersLoading && charactersData) {
      let winRateList: number[] = [];
      let winRate = 0;
      let pickRate = 0;
      for (const character of charactersData.rows) {
        winRateList = [...winRateList, character.winRate];
      }
      winRate = calculateAverage(winRateList); //문제 발생 지점
      pickRate = charactersData.rows.length;
      setCharWindAndPick((prev) => [
        ...prev,
        { characterId, characterName, winRate, pickRate },
      ]);
    }
   ```  
   
 - __개선된 코드__
   winRateList의 계산 과정을 함수로 만들어 calculateAverage 함수에 콜백함수로 전달하여 해결
   ```typescript
   //utils.ts
   //숫자가 들어있는 배열의 평균 값 구하기
   export function calculateAverage(
     charactersData: CharacterRanking,
     averrageArg: AverrageArg
   ) {
     const callwinRateList = averrageArg(charactersData);
     if (!callwinRateList) {
       throw new Error("잘못된 입력: 콜백함수가 올바르게 작동하지 않습니다.");
     }

     const sum = callwinRateList.reduce((accumulator, currentValue) => {
       if (typeof currentValue !== "number") {
         throw new Error("잘못된 입력: 배열에는 숫자만 포함되어야 합니다.");
       }
       return accumulator + currentValue;
     }, 0);

     const average = sum / callwinRateList.length;

     return Math.round(average * 10000) / 10000;
   }

   //CharWinAndPick.tsx
   if (!charactersLoading && charactersData) {
      let winRate = 0;
      let pickRate = 0;
      const setwinRateList = (charactersData: CharacterRanking) => {
        let winRateList: number[] = [];
        for (const character of charactersData.rows) {
          winRateList = [...winRateList, character.winRate];
        }
        return winRateList;
      };

      winRate = calculateAverage(charactersData, setwinRateList); //setwinRateList를 콜백함수로 전달

      pickRate = charactersData.rows.length;
      setCharWindAndPick((prev) => [
        ...prev,
        { characterId, characterName, winRate, pickRate },
      ]);
    }
   ```

### 리액트 라우터 경로 설정 문제(새로고침 시 경로 오류 발생)
로컬호스트에서 오픈API의 데이터를 불러오는 페이지에서 처음엔 데이터가 제대로 불러와졌다.  
하지만 새로고침을 했을 때 다음과 같은 에러 페이지가 나타났다.
![](https://velog.velcdn.com/images/rlaugs15/post/5c75d7f0-be8c-4d80-9960-bec48e44b6a8/image.png)

 - __원인__  
이 문제는 __리액트 라우터를 사용할 때 `basename`이 제대로 설정되지 않아 발생__  
`basename`을 설정하지 않으면, 경로를 해석할 때 기본 경로를 인식하지 못하여 잘못된 경로로 접근하게 된다.

 - __해결__  
   `createBrowserRouter` 함수를 사용할 때 두 번째 인자로 `basename`을 설정해 주어야 한다.  
   이렇게 하면 모든 경로가 지정된 기본 경로를 기준으로 작동하게 된다.

 - __[코드 수정 등 자세한 해결 과정](https://velog.io/@rlaugs15/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EA%B2%BD%EB%A1%9C-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-%EC%8B%9C-%EA%B2%BD%EB%A1%9C-%EC%98%A4%EB%A5%98-%EB%B0%9C%EC%83%9D)__

### Vite 환경에서 MSW 경로 설정으로 발생한 에러 해결
msw를 활성화하면 하얀 페이지만 뜨는 현상 발생

 - __원인__  
   Vite 프로젝트에서 MSW(Service Worker) 파일의 경로가 잘못 설정되어 발생한 문제로, 서비스 워커 파일을 찾을 수 없어 페이지가 정상적으로 로드되지 않았다.

 - __해결__  
   worker.start 메서드에 serviceWorker.url 옵션을 추가하여 서비스 워커 파일의 정확한 경로를 명시적으로 설정  
   이를 통해 Vite 서버가 해당 파일을 올바르게 찾을 수 있게 되었다.

 - __[코드 수정 내용](https://github.com/rlaugs15/cyphers-supporter-clone/commit/f768e29b2f48b014c6826fc815d0154be3d3029a)__

### 승률 및 픽률 계산 오류 수정  
승률 및 픽률 계산 시, 간헐적으로 pickNum + 1이 characterLenth보다 크게 나타남

 - __원인__  
   CharWindAndPick 컴포넌트에서 승률, 픽률 데이터 계산 시 중복된 값들이 업데이트

 - __해결__  
   some 메소드를 이용해 계산된 배열에 중복된 값이 없을 경우에만 업데이트
    - calcWinRate 함수 삭제
    - convertRank 함수 생성
  
 - __[핵심 수정 코드](https://github.com/rlaugs15/cyphers-supporter-clone/commit/a05dba111b69ded1a71dc12058ee3811a3cea904#diff-518720e67556ceeaad26181773c8a21a6daa2788c29e11c658ffb11afcfac560)__

   
