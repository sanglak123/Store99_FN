import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head />
      <title>CỬA HÀNG 99</title>
      <meta name="description" content="DI ĐỘNG 99 - CỬA HÀNG 99" />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A==" crossOrigin="anonymous" referrerPolicy="no-referrer" />
      <link rel='stylesheet' href='/css/main.css'></link>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}