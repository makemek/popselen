export type AppConfig = {
  RECAPTCHA_SITE_KEY: string;
  API_BASE_URL: string;
};

const env: AppConfig =
  typeof document === "undefined"
    ? process.env
    : window.__remixContext.routeData.root.$env;

const config = Object.freeze({
  RECAPTCHA_SITE_KEY: env.RECAPTCHA_SITE_KEY,
  API_BASE_URL: env.API_BASE_URL,
});

export default config;
