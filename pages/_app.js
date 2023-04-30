import { CheckoutContextProvider } from "@/components/CheckoutContext"
import {createGlobalStyle} from "styled-components"

const GlobalStyles = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyles/>
      <CheckoutContextProvider>
        <Component {...pageProps} />
      </CheckoutContextProvider>
    </>
  )
}
