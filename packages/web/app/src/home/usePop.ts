import { useCallback, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import config from "../config";
import { apiHttp, API_PATHS } from "../api";
import { asyncDebounce } from "../utils/asyncDebounce";

export function usePop() {
  const [count, setCount] = useState<number>(0);
  const { executeRecaptcha } = useGoogleReCaptcha();
  const debounceFn = useCallback(
    asyncDebounce(mutatePop, 200, { maxWait: 1000 }),
    [executeRecaptcha],
  );

  async function handlePop() {
    setCount((cnt) => cnt + 1);
    try {
      await debounceFn(count + 1);
    } catch (error) {
      if (error === null) {
        return;
      }
      console.error(error);
    }
  }

  async function mutatePop(cnt: number) {
    if (!executeRecaptcha) {
      setCount(0);
      return;
    }
    const token = await getCaptchaToken("pop");
    try {
      await apiHttp.post(API_PATHS.POP, { count: cnt, recaptcha: token });
    } finally {
      setCount(0);
    }
  }

  function getCaptchaToken(action?: string) {
    const siteKey = config.RECAPTCHA_SITE_KEY;

    if (!siteKey || !executeRecaptcha) {
      return Promise.resolve("DISABLED");
    }

    return executeRecaptcha(action);
  }

  return {
    count,
    handlePop,
  };
}
