import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { store } from '@/config/redux/store'
import { LayoutGame } from '@/components/layout/LayoutGame'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <LayoutGame>
          <Component {...pageProps} />
        </LayoutGame>
      </Provider>
    </>
  )
}
