import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { SessionProvider, useSession } from "next-auth/react";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useRouter } from 'next/router';
const MyApp = ({ Component, pageProps }) => {
  return (

    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <PayPalScriptProvider>
          {Component.auth ? (
            <Auth>
              <Component {...pageProps} />
            </Auth>
          ) : (
            <Component {...pageProps} />
          )}
        </PayPalScriptProvider>
      </Provider>
    </SessionProvider>
  )
}
function Auth({ children }) {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return children;
}

export default MyApp
