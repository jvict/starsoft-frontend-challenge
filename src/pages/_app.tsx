import React from "react";
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '../store';
import '../styles/global.scss';
import Layout from '@/components/Layout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;