'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';

import classicLogo from '@/assets/classic-closet-logo.png';
import cartIcon from '@/assets/cart_ico.svg';
import searchIcon from '@/assets/search_ico.svg';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let calc = 0;
    cart?.products?.forEach((product) => {
      calc += product?.quantity;
    });
    setTotalItems(() => calc);
  }, [cart]);

  return (
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
          <Image src={searchIcon} alt="search icon" height={36} width={36} />
          <span className="hidden md:block">Search</span>
        </li>
        <li>
          <Link
            href="/cart"
            className="flex gap-2 items-center font-medium relative"
          >
            <span className="h-5 w-5 shadow-md bg-white rounded-full absolute -top-1 left-4 flex justify-center items-center text-red-600 text-xs">
              {totalItems}
            </span>
            <Image src={cartIcon} alt="cart icon" height={36} width={36} />
            <span className="hidden md:block">Cart</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
