import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  // 환경 변수를 로드합니다.
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    base: "/cyphers-supporter-clone/",
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
