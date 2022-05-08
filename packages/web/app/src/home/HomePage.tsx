import { apiHttp, API_PATHS } from "../api";
import { useGoogleRecaptcha } from "../utils/useGoogleRecaptcha";

export function HomePage() {
  const { executeRecaptcha } = useGoogleRecaptcha()

  async function handlePop() {
    const token = executeRecaptcha && await executeRecaptcha('pop')
    await apiHttp.post(API_PATHS.POP, { count: 1, recaptcha: token })
  }

  return (
    <div>
      <main>
        <p className="font-bold cursor-pointer" onClick={handlePop}>POP</p>
      </main>
    </div>
  )
}