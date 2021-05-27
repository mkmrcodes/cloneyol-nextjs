import '../styles/globals.css';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'next-auth/client';
import Layout from '../components/layout/layout';
import { BasketProvider } from '../store/BasketProvider';

function MyApp({ Component, pageProps }) {
  return (
    <Provider session={pageProps.session}>
      <CookiesProvider>
        <BasketProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </BasketProvider>
      </CookiesProvider>
    </Provider>
  );
}

export default MyApp;
