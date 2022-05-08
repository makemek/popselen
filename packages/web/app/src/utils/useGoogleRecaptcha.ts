import { useGoogleReCaptcha as _useGoogleRecaptcha } from "react-google-recaptcha-v3";
import config from "../config";

export function useGoogleRecaptcha() {
  const { executeRecaptcha: _executeRecaptcha } = _useGoogleRecaptcha();

  async function executeRecaptcha(action?: string) {
    const siteKey = config.RECAPTCHA_SITE_KEY;
    if (!siteKey || !_executeRecaptcha) {
      return Promise.resolve("DISABLED");
    }

    return _executeRecaptcha(action);
  }

  return { executeRecaptcha };
}
