import axios from "axios";

// 로그아웃 처리 함수
export const logout = () => {
  localStorage.removeItem("accessToken");
  // 로그아웃 상태를 반영할 수 있도록 리다이렉트 또는 상태 관리 추가
  // 예: window.location.href = '/login';
};

// Axios 인스턴스 생성
const tokenInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // httpOnly 쿠키를 포함하는 경우
});

// Access Token을 요청 헤더에 추가하는 인터셉터
tokenInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Access Token 갱신 로직
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "/auth/reissue-token", // 여기에서 /api/v1를 중복하지 않도록 함
      {},
      { withCredentials: true }
    );
    const newAccessToken = response.data.newToken;
    localStorage.setItem("accessToken", newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    // 갱신 실패 시 로그아웃 처리
    logout();
    return null;
  }
};

// 응답 인터셉터: 401 에러가 발생하면 Access Token 갱신
tokenInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return tokenInstance(originalRequest);
      }
    }
    // Access Token 갱신이 실패한 경우 로그아웃 처리
    if (error.response && error.response.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }
);

export default tokenInstance;
