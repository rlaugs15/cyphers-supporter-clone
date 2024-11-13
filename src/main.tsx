import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router.tsx";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient({
  defaultOptions: {
    // 전역적인 캐싱 시간
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

async function enableMocking() {
  // 프로덕션 환경에서 MSW를 사용할지 여부를 환경변수로 제어
  const isProduction = process.env.NODE_ENV === "production";
  const enableMswInProd = import.meta.env.VITE_ENABLE_MSW === "true";

  if (import.meta.env.DEV || (isProduction && enableMswInProd)) {
    const { worker } = await import("./mocks/browser");
    return worker.start({
      serviceWorker: {
        //import.meta.env.DEV가 true일 때는 개발 환경
        url: import.meta.env.DEV
          ? "/cyphers-supporter-clone/mockServiceWorker.js"
          : "/mockServiceWorker.js",
      },
      onUnhandledRequest: "bypass", // 모킹되지 않은 요청은 실제 API로 전달
    });
  }
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </RecoilRoot>
    </React.StrictMode>
  );
});
