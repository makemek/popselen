/**
 * For testing custom hook that uses Remix's useLoaderData() hook internally
 */

import { FC } from "react"
import { MemoryRouter } from "react-router";
import { RemixEntryContext, RemixRoute } from '@remix-run/react/components'

export function makeLoaderDataWrapper(outData: any) {
  const wrapper: FC<void> = ({ children }) => (
    <RemixEntryContext.Provider value={{
      routeData: {
        test: outData
      },
      routeModules: {
        test: {
          default: () => <>{children}</>
        }
      }
    } as any}>
      <MemoryRouter>
        <RemixRoute id="test" />
      </MemoryRouter>
    </RemixEntryContext.Provider>
  )

  return wrapper
}
