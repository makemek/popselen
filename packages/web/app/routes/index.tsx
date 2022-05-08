import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import config from '~/src/config'
import { HomePage } from '../src/home/HomePage'

export default function() {
  return (
    <>
      {!config.RECAPTCHA_SITE_KEY && <script>{'window.process = {}'}</script>}
      <GoogleReCaptchaProvider reCaptchaKey={config.RECAPTCHA_SITE_KEY}>
        <HomePage />
      </GoogleReCaptchaProvider>
    </>
  )
}
