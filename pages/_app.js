import '../styles/globals.css'
import { NextUIProvider, createTheme } from '@nextui-org/react';

import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'
import Head from 'next/head';
import { ErrorBoundary } from '../utils/ErrorBoundary';
Chart.register(BarElement)
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);

const theme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

function MyApp({ Component, pageProps }) {
  return (<>
    <Head>
      <title>MHB - My Home Budget </title>
      <meta name="apple-mobile-web-app-capable" content="yes" />

    </Head>

    <NextUIProvider>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </NextUIProvider>
  </>)
}

export default MyApp
