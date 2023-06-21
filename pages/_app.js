import { CheckoutContextProvider } from "@/components/CheckoutContext"
import React from 'react'
import {Helmet} from 'react-helmet'
import {createGlobalStyle} from "styled-components"
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; 

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif;
    color: var(--main-dark-blue);
  }
  :root {
    --main-dark-blue: #1D242C;
    --main-lighter-blue: #a2a9b3;
    --main-light-blue: #EAEEF2;
    --main-blue: #A2A8AD;
    --main-lightish-blue: #dcdfe3;
  }
  
  html {
    height: 100%;
  }
  
  body {
    -ms-overflow-style: none;
    height: 100%;
    ::-webkit-scrollbar {
      display: none;
    }
    display: flex;
    flex-direction: column;
  }
  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  button:hover {
    cursor: pointer;
  }
`

export default function App({ Component, pageProps }) {
  return (
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"/>
      </Helmet>
      <GlobalStyles/>
      <CheckoutContextProvider>
        <Component {...pageProps} />
      </CheckoutContextProvider>
    </>
  )
}
