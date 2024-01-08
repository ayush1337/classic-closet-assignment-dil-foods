import { Inter } from 'next/font/google';
import StoreProvider from './StoreProvider';

import './globals.css';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Classic`s Closet',
  description:
    'Classic`s Closet ecommerce app for dil foods frontend assingment',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={(inter.className, `relative`)}>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
