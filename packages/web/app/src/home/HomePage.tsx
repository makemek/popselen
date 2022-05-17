import { useEffect } from 'react'
import { loadWorker } from '../utils/workerAdapter'
import { useLeaderboard } from './useLeaderboard'
import { usePop } from './usePop'

export function HomePage() {
  const { handlePop } = usePop()
  const { handleUpdate } = useLeaderboard()

  useEffect(() => {
    const worker = loadWorker()
    worker.subscribeLeaderboard(handleUpdate)
    worker.listenLeaderboard()
  }, [])

  return (
    <div>
      <main>
        <p className="font-bold cursor-pointer" onClick={handlePop}>POP</p>
      </main>
    </div>
  )
}