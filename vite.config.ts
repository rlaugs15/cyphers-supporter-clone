import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/cyphers-supporter-clone/", //GitHub 저장소 이름으로 변경
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
