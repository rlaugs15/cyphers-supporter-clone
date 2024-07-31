import { AxiosError } from "axios";
import { MutationResult } from "../api";

export async function handleAxiosError<T>(
  promise: Promise<T>
): Promise<T | MutationResult> {
  try {
    const response = await promise;
    return response;
  } catch (error) {
    const axiosError = error as AxiosError<MutationResult>;
    return axiosError.response?.data ?? { code: 500, message: "Unknown error" };
  }
}
