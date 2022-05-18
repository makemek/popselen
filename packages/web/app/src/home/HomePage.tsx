import { json } from '@remix-run/node'
import { useEffect } from 'react'
import { apiHttp, API_PATHS } from '../api'
import { loadWorker } from '../utils/workerAdapter'
import { useLeaderboard } from './useLeaderboard'
import { usePop } from './usePop'

export async function homePageLoader() {
  const res = await apiHttp.get<Record<string, number>>(API_PATHS.LEADERBOARD)

  return json(res.data)
}

export function HomePage() {
  const { handlePop } = usePop()
  const { handleUpdate, leaderboard } = useLeaderboard()

  useEffect(() => {
    const worker = loadWorker()
    worker.subscribeLeaderboard(handleUpdate)
    worker.listenLeaderboard()
  }, [])

  return (
    <div>
      <main>
        <p className="font-bold cursor-pointer" onClick={handlePop}>POP</p>
          {Object.keys(leaderboard).map(key => (
            <div key={key}>
              <div className="font-bold text-blue-500">Country: {key}</div>
              <div>Value: {leaderboard[key]}</div>
            </div>
          ))}
      </main>
    </div>
  )
}