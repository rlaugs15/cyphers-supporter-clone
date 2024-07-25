import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
  statusCode?: number;
}

type Method = "POST" | "DELETE" | "PATCH" | "PUT";

// useMutation의 리턴타입
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

// 제네릭 타입으로 해당 훅을 사용하는 개발자에게 받을 것 같은 응답의 타입을 보내줌
export default function useMutation<T = any>(
  url: string,
  method: Method = "POST"
): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
    statusCode: undefined,
  });
  function mutation(data: any) {
    setState((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json().catch(() => {})) // catch로 에러 무시, api가 data 받지 않아도 에러 안뜸
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, loading: false })));
  }

  // 사용자는 배열의 두 번째 요소로 받은 상태 객체 {...state}를 마음대로 변경해도 내부적으로 사용되는 state에는 영향을 미치지 않음
  // 다양한 곳에서 훅으로 사용하기 위해 디폴트 값들을 유지
  return [mutation, { ...state }];
}
