import { NextUIProvider, createTheme } from '@nextui-org/react';

import { Chart, ArcElement, CategoryScale, LinearScale, BarElement } from 'chart.js'
import Head from 'next/head';
import { ErrorBoundary } from '../utils/ErrorBoundary';
Chart.register(BarElement)
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);

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
