import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/authContext';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { CustomerProvider } from '@/contexts/customerContext';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <AuthProvider>
        <CustomerProvider>
          <Component {...pageProps} className={inter.className} />
        </CustomerProvider>
      </AuthProvider>
    </NextUIProvider>
  );
}
