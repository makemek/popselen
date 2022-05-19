export type AppConfig = {
  RECAPTCHA_ENTERPRISE: string;
  RECAPTCHA_SITE_KEY: string;
  API_BASE_URL: string;
  WEBSOCKET_PATH: string;
};

export type Manifest = {
  worker: string;
  sharedWorker: string;
};

const serverside =
  process.env.NODE_ENV === "test" || typeof document === "undefined";
const env: AppConfig = serverside
  ? process.env
  : window.__remixContext.routeData.root.$env;

const manifest: Manifest = serverside
  ? process.env
  : window.__remixContext.routeData.root.$manifest;

const config = Object.freeze({
  RECAPTCHA_ENTERPRISE: env.RECAPTCHA_ENTERPRISE,
  RECAPTCHA_SITE_KEY: env.RECAPTCHA_SITE_KEY,
  API_BASE_URL: env.API_BASE_URL,
  WEBSOCKET_PATH: env.WEBSOCKET_PATH,
  WORKER: manifest.worker,
  SHARED_WORKER: manifest.sharedWorker,
});

export default config;
