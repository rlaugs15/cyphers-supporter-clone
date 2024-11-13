import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// 배포 환경에서도 MSW를 활성화
worker.start({
  onUnhandledRequest: "bypass", // 실제 서버 요청은 무시하지 않고 그대로 전달
});
