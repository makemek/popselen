import { NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import config from "../config";

export const HomePage: NextPage = () => {
  return (
    <div>
      <Head>
        <title>PopSelen</title>
      </Head>
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${config.RECAPTCHA_SITE_KEY}`}
      ></Script>

      <main>
        <p className="font-bold">Hello World</p>
      </main>
    </div>
  )
}