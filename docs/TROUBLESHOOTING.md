## CORS 에러

오픈 api를 가져오는 도중 CORS에러가 발생

- **시도한 방법**

  - **https://cors-anywhere.herokuapp.com/ 프록시 서버를 이용**  
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

  - **vite.config.js 수정**  
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

- **해결한 방법**  
  따로 노드js 서버를 만들어서 오픈 api의 CORS에러를 해결했다.

## 테일윈드에서 클래스가 동적으로 적용되지 않는 문제

- **문제코드**

```typescript
function MyComponent({ win, text }) {
  return (
    <div className={`${win ? "bg-blue-500" : "bg-red-500"} font-semibold`}>
      {text}
    </div>
  );
}
```

- **해결**

```typescript
function MyComponent ({win, text}) {
  return (
    <div
      className="font-semibold">{text}</div>
      style={{ backgroundColor: `${win ? "blue" : "red"}` }}
  )
}
```

- **추정되는 원인**

  - **잘못된 파일 경로 설정**
    - 테일윈드 설정에서 CSS 클래스가 포함된 파일들을 스캔할 경로가 잘못 지정된 경우, 테일윈드가 해당 파일들을 인식하지 못해 클래스가 누락될 수 있다.
  - **복잡한 동적 문자열 조합**
    - 템플릿 리터럴이나 함수 호출 등 복잡한 방식으로 클래스 이름이 구성된 경우, 테일윈드가 이를 완전히 이해하지 못할 수 있다.  
      하지만, 제시된 방식(win ? "bg-blue-500" : "bg-red-500")은 비교적 단순한 방식이라 이 경우에는 해당하지 않을 것
  - **빌드 과정의 문제**
    때때로 빌드 도구(예: Webpack, Vite 등)의 설정에 문제가 있어 테일윈드의 클래스를 제대로 포함하지 못하는 경우가 있을 수 있다.

- **해결**  
  빌드 과정의 문제로 추정된다. 여러 시도를 한 결과 styleProps에 동적인 속성을 넣는 것으로 해결했다.

## 페이지네이션 시에 화면 깜빡임 현상

다음 페이지로 넘어갈 때 데이터를 불러오는 짦은 시간 동안 로딩상태가 되어 스켈레톤ui가 보인다.  
새로운 데이터가 패칭될 때까지 이전 캐시 데이터 유지가 필요하다고 느꼈다.

- **해결**

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

  - **placeholderData**
    - **목적:** 데이터가 로딩되는 동안 사용자에게 초기 화면을 제공하기 위해 기본값이나 더미 데이터를 설정
    - **동작 방식:**
      - 쿼리가 처음 시작될 때 data의 초기값을 설정
      - 쿼리가 성공적으로 완료되면 실제 데이터로 대체
      - isLoading 상태는 여전히 true이며, 로딩이 끝나면 isLoading이 false로 변경
  - **keepPreviousData**
    - **목적:** 페이지네이션이나 데이터가 변경될 때, 새로운 데이터가 로딩되는 동안 이전 데이터를 화면에 유지하여 깜빡임을 방지
    - **동작 방식:**
      - 쿼리 키가 변경되어 새로운 데이터를 로드할 때까지 이전 데이터를 유지
      - 쿼페이지 전환이나 쿼리 파라미터가 변경될 때 유용
      - isLoading 상태가 true로 설정되지 않는다. 대신 isFetching 상태가 사용

## PlayerBasicInfo 하위 컴포넌트 로딩현상 해결

해당 페이지는 유저 닉네임을 검색하면 PlayerBasicInfo 컴포넌트가 렌더링 된 후, 전체/공식/일반 탭을 클릭하여 각각의 기록을 볼 수 있다.
<img width="833" alt="PlayerBasicInfo 하위 로딩현상 해결" src="https://github.com/user-attachments/assets/3a1f8003-2096-4fbc-bf2e-1fb64be9340c">

- **문제**  
  전체/공식/일반 탭을 클릭할 때마다 로딩 현상이 발생

- **원인**  
  이전엔 PlayerBasicInfo의 하위 컴포넌트에서 각각 리액트쿼리로 로딩  
  그로 인해 홈 화면에서 유저 검색 후 전체, 일반, 공식 탭을 누르면 각각의 하위 컴포넌트에 매번 로딩현상이 발생

- **해결**  
  유저를 검색하는 PlayerBasicInfo 컴포넌트에서 유저 검색 시 하위 컴포넌트에서 필요한 데이터도 한꺼번에 가져옴  
  이후 리코일로 하위 컴포넌트들에게 각각 데이터를 공유하여 로딩현상 해결

## CharWindAndPick 컴포넌트 버그 수정

winRateList의 계산과정을 기다리지 못 하고 winRate가 실행되어 버그가 발생

- **기존 코드**  
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
- **개선된 코드**
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

## 리액트 라우터 경로 설정 문제(새로고침 시 경로 오류 발생)

로컬호스트에서 오픈API의 데이터를 불러오는 페이지에서 처음엔 데이터가 제대로 불러와졌다.  
하지만 새로고침을 했을 때 다음과 같은 에러 페이지가 나타났다.
![](https://velog.velcdn.com/images/rlaugs15/post/5c75d7f0-be8c-4d80-9960-bec48e44b6a8/image.png)

- **원인**  
  이 문제는 **리액트 라우터를 사용할 때 `basename`이 제대로 설정되지 않아 발생**  
  `basename`을 설정하지 않으면, 경로를 해석할 때 기본 경로를 인식하지 못하여 잘못된 경로로 접근하게 된다.

- **해결**  
  `createBrowserRouter` 함수를 사용할 때 두 번째 인자로 `basename`을 설정해 주어야 한다.  
  이렇게 하면 모든 경로가 지정된 기본 경로를 기준으로 작동하게 된다.

- **[코드 수정 등 자세한 해결 과정](https://velog.io/@rlaugs15/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9A%B0%ED%84%B0-%EA%B2%BD%EB%A1%9C-%EC%84%A4%EC%A0%95-%EB%AC%B8%EC%A0%9C%EC%83%88%EB%A1%9C%EA%B3%A0%EC%B9%A8-%EC%8B%9C-%EA%B2%BD%EB%A1%9C-%EC%98%A4%EB%A5%98-%EB%B0%9C%EC%83%9D)**

## Vite 환경에서 MSW 경로 설정으로 발생한 에러 해결

msw를 활성화하면 하얀 페이지만 뜨는 현상 발생

- **원인**  
  Vite 프로젝트에서 MSW(Service Worker) 파일의 경로가 잘못 설정되어 발생한 문제로, 서비스 워커 파일을 찾을 수 없어 페이지가 정상적으로 로드되지 않았다.

- **해결**  
  worker.start 메서드에 serviceWorker.url 옵션을 추가하여 서비스 워커 파일의 정확한 경로를 명시적으로 설정  
  이를 통해 Vite 서버가 해당 파일을 올바르게 찾을 수 있게 되었다.

- **[코드 수정 내용](https://github.com/rlaugs15/cyphers-supporter-clone/commit/f768e29b2f48b014c6826fc815d0154be3d3029a)**

## 승률 및 픽률 계산 오류 수정

승률 및 픽률 계산 시, 간헐적으로 pickNum + 1이 characterLenth보다 크게 나타남

- **원인**  
  CharWindAndPick 컴포넌트에서 승률, 픽률 데이터 계산 시 중복된 값들이 업데이트

- **해결**  
  some 메소드를 이용해 계산된 배열에 중복된 값이 없을 경우에만 업데이트

  - calcWinRate 함수 삭제
  - convertRank 함수 생성

- **[핵심 수정 코드](https://github.com/rlaugs15/cyphers-supporter-clone/commit/a05dba111b69ded1a71dc12058ee3811a3cea904#diff-518720e67556ceeaad26181773c8a21a6daa2788c29e11c658ffb11afcfac560)**

## AXIOS DELETE 요청 에러 수정(data 속성에 body 전달)

- **증상**
  개발자 도구에서 "Cannot read properties of undefined (reading 'password')"라는 에러가 발생

- **문제 코드**
  ```typescript
  export async function deleteUserProfile(
    body: Pick<User, "loginId" | "password">
  ) {
    return handleAxiosError<MutationResult>(
      axios
        .delete("/api/v1/me", {
          data: {
            body,
          },
        })
        .then((res) => res.data)
    );
  }
  ```
- **수정된 코드**

  ```typescript
  export async function deleteUserProfile(
    body: Pick<User, "loginId" | "password">
  ) {
    return handleAxiosError<MutationResult>(
      axios
        .delete("/api/v1/me", {
          data: {
            loginId: body.loginId,
            password: body.password,
          },
        })
        .then((res) => res.data)
    );
  }
  ```

- **원인**
  원래 사용한 코드에서 axios.delete 메소드 호출 시 data가 올바르게 전달되지 않았다.

- **이유**
  - axios.delete는 일반적으로 데이터(payload)를 전달할 때 data 속성을 사용하지 않는 경우가 많다.  
    하지만, 데이터를 전달해야 할 경우 data 속성을 명시적으로 추가해야 한다. 수정한 코드에서는 data 속성을 통해 loginId와 password를 명확히 전달하였다.
