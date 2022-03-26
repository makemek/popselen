import { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { apiHttp, API_PATHS } from "../api";
import config from "../config";
import { getReCaptchaToken } from "../utils/recaptcha";

export const HomePage: NextPage = () => {

  async function handlePop() {
    const token = await getReCaptchaToken('pop')
    await apiHttp.post(API_PATHS.POP, { count: 1, recaptcha: token })
  }

  return (
    <div>
      <Head>
        <title>PopSelen</title>
      </Head>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${config.RECAPTCHA_SITE_KEY}`}
      ></Script>

      <main>
        <p className="font-bold cursor-pointer" onClick={handlePop}>POP</p>
      </main>
    </div>
  )
}