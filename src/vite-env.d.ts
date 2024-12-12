/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_KEY: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_LOCAL_API_BASE_URL: string;
  readonly VITE_ENABLE_MSW: string;
  readonly VITE_LOCAL_PUBLIC_URL: string;
  readonly VITE_DEPLOY_PUBLIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
