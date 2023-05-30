import { Html, Head, Main, NextScript } from 'next/document'
import Header from '@/layout/Header/Header'
import Footer from '@/layout/Footer/Footer'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Header/>
        <Main />
        <NextScript />
        <Footer/>
      </body>
    </Html>
  )
}
