import { AxiosError } from "axios";

export async function handleAxiosError<T>(promise: Promise<T>): Promise<T> {
  try {
    const response = await promise;
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    // 오류 발생 시, 오류 데이터 타입을 유추하거나 기본 데이터를 반환
    throw (
      axiosError.response?.data ?? { code: 500, message: "알 수 없는 오류" }
    );
  }
}
