import { Provider } from "react-redux"
import type { ReactNode } from "react"
import store from "./lib/store"

export function Providers({ children }: { children: ReactNode }): JSX.Element {
  return <Provider store={store}>{children}</Provider>
}