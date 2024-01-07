import Image from 'next/image';
import { Inter } from 'next/font/google';

import './globals.css';
import StoreProvider from './StoreProvider';

import classicLogo from '../assets/classic-closet-logo.png';
import cartIcon from '../assets/cart_ico.svg';
import searchIcon from '../assets/search_ico.svg';
import Link from 'next/link';

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
        <nav className="w-full max-h-24 shadow-xl z-10 px-6 flex justify-between items-center uppercase text-sm bg-white text-red-600 font-bold sticky top-0 right-0">
          <Link href="/" className="w-36 hover:cursor-pointer">
            <Image
              src={classicLogo}
              className="w-full"
              alt="classic closet logo"
              priority={true}
            />
          </Link>
          <ul className="nav-list gap-8 hidden md:flex">
            <Link href="/">Home</Link>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
          <ul className="flex gap-4">
            <li className="flex gap-2 items-center font-medium">
              <Image
                src={searchIcon}
                alt="search icon"
                height={36}
                width={36}
              />
              <span className="hidden md:block">Search</span>
            </li>
            <li className="flex gap-2 items-center font-medium relative">
              <span className="h-5 w-5 shadow-md bg-white rounded-full absolute -top-1 left-4 flex justify-center items-center text-red-600 text-xs">
                0
              </span>
              <Image src={cartIcon} alt="cart icon" height={36} width={36} />
              <span className="hidden md:block">Cart</span>
            </li>
          </ul>
        </nav>
        <StoreProvider>{children}</StoreProvider>
        <footer className="w-full max-h-16 bg-red-600 flex justify-center items-center py-4 text-white font-xs font-semibold">
          Made with &hearts; by Ayush.
        </footer>
      </body>
    </html>
  );
}
