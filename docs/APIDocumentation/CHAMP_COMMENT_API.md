- 모든 응답 성공시 HttpStatus Code 200번 으로 응답
- 예외 발생시 각 코드별 에러 코드와 메시지로 응답

| 기능 설명                     | 요청 경로                              | 요청 메서드 |
| ----------------------------- | -------------------------------------- | ----------- |
| 캐릭터 댓글 조회              | /api/v1/character/comment/:characterId | GET         |
| 캐릭터 댓글 조회(무한 스크롤) | api/v1/character/comment/:characterId  | GET         |
| 캐릭터 댓글 작성              | /api/v1/character/comment/:characterId | POST        |

## 캐릭터 댓글 조회

### 요청 경로

`GET /api/v1/character/comment/:characterId`

### 요청 메서드

`GET`

### 요청 파라미터

| 파라미터 이름 | 타입   | 필수 여부 | 설명     |
| ------------- | ------ | --------- | -------- |
| characterId   | String | 예        | 캐릭터ID |

### 응답 파라미터

| 파라미터 이름 | 타입   | 설명      |
| ------------- | ------ | --------- |
| characterId   | String | 캐릭터ID  |
| userId        | String | 로그인ID  |
| userNickname  | String | 닉네임    |
| comment       | String | 댓글 내용 |

## 캐릭터 댓글 조회 (무한스크롤)

### 요청 경로

`GET /api/v1/character/comment/:characterId`

### 요청 메서드

`GET`

### 요청 파라미터

| 파라미터 이름 | 타입   | 필수 여부 | 설명                          |
| ------------- | ------ | --------- | ----------------------------- |
| characterId   | String | 예        | 캐릭터ID                      |
| page          | number | 아니요    | 페이지 번호 (기본값: 0)       |
| size          | number | 아니요    | 페이지당 항목 수 (기본값: 10) |

### 응답 파라미터

| 파라미터 이름 | 타입                | 설명                                     |
| ------------- | ------------------- | ---------------------------------------- |
| characterId   | String              | 캐릭터ID                                 |
| userId        | String              | 로그인ID                                 |
| userNickname  | String              | 닉네임                                   |
| comment       | String              | 댓글 내용                                |
| hasNextPage   | Boolean             | 다음 페이지 존재 여부                    |
| totalComments | int                 | 총 댓글 수                               |
| comments      | ICharacterComment[] | 댓글 리스트 (각 댓글은 위와 동일한 구조) |

## 캐릭터 댓글 작성

### 요청 경로

`POST /api/v1/character/comment/:characterId`

### 요청 메서드

`POST`

### 요청 파라미터

| 파라미터 이름 | 타입   | 필수 여부 | 설명     |
| ------------- | ------ | --------- | -------- |
| characterId   | String | 예        | 캐릭터ID |

### 응답 파라미터

| 파라미터 이름 | 타입 | 설명                                        |
| ------------- | ---- | ------------------------------------------- |
| N/A           | N/A  | 캐릭터 댓글 작성 성공 시에는 응답 바디 없음 |
