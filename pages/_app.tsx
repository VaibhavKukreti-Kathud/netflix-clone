import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"


// export default function App({ Component, pageProps :}) {
//   return <SessionProvider session={session}><Component {...pageProps} /> 
//   </SessionProvider>
// }

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session} children={<Component {...pageProps} />}/>
  )
}