import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { store } from '../store';
import '../styles/global.scss';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp;