import React from 'react';
import App, {AppProps} from 'next/app';
import {Provider as StyletronProvider} from 'styletron-react';
import {LightTheme, BaseProvider} from 'baseui';
import {styletron} from '../styletron';
import {SnackbarProvider,} from 'baseui/snackbar';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <React.Fragment>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>PhoneNumber Extractor | Extract Phone Number from PDF</title>
        </Head>
        <StyletronProvider value={styletron}>
          <BaseProvider theme={LightTheme}>
              <SnackbarProvider>
                <Component {...pageProps} />
              </SnackbarProvider>
          </BaseProvider>
        </StyletronProvider>
      </React.Fragment>
  )
}

export default MyApp
