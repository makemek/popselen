import { useCallback, useState } from "react";
import { debounce } from "lodash";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import config from "../config";
import { apiHttp, API_PATHS } from "../api";

export function usePop() {
  const [count, setCount] = useState<number>(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const debounceFn = useCallback(debounce(mutatePop, 200, { maxWait: 1000 }), [
    executeRecaptcha,
  ]);

  async function handlePop() {
    setCount((cnt) => cnt + 1);
    await debounceFn(count + 1);
  }

  async function mutatePop(cnt: number) {
    if (!executeRecaptcha) {
      setCount(0);
      return;
    }
    const token = await getCaptchaToken("pop");
    await apiHttp.post(API_PATHS.POP, { count: cnt, recaptcha: token });
    setCount(0);
  }

  function getCaptchaToken(action?: string) {
    const siteKey = config.RECAPTCHA_SITE_KEY;

    if (!siteKey || !executeRecaptcha) {
      return Promise.resolve("DISABLED");
    }

    return executeRecaptcha(action);
  }

  return {
    handlePop,
  };
}
