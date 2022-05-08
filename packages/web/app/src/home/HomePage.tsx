import { usePop } from './usePop'

export function HomePage() {
  const { handlePop } = usePop()

  return (
    <div>
      <main>
        <p className="font-bold cursor-pointer" onClick={handlePop}>POP</p>
      </main>
    </div>
  )
}