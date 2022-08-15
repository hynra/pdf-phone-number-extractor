import React from 'react';
import App, {AppProps} from 'next/app';

import Head from 'next/head';

import {SSRProvider, Provider, defaultTheme} from '@adobe/react-spectrum';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <React.Fragment>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Extract Number</title>
            </Head>
            <SSRProvider>
                <Provider theme={defaultTheme}>
                    <Component {...pageProps} />
                </Provider>
            </SSRProvider>
        </React.Fragment>
    )
}

export default MyApp
