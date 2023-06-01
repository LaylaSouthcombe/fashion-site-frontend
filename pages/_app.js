import { CheckoutContextProvider } from "@/components/CheckoutContext"
import {createGlobalStyle} from "styled-components"
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: var(--main-dark-blue);
  }
  :root {
    --main-dark-blue: #1D242C;
    --main-light-blue: #EAEEF2;
    --main-blue: #A2A8AD;
    --main-lightish-blue: #dcdfe3;
  }
  ::-webkit-scrollbar {
    display: none;
  }
  html {
    height: 100%;
  }
  body {
    -ms-overflow-style: none;
    height: 100%;
  }
  #__next {
    height: 100%;
    display: flex;
    flex-direction: column;
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
