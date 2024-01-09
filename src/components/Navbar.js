'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import classicLogo from '@/assets/classic-closet-logo.png';
import cartIcon from '@/assets/cart_ico.svg';
import searchIcon from '@/assets/search_ico.svg';
import { useEffect, useState } from 'react';
import { searchTerm } from '@/app/lib/features/searchSlice';
const Navbar = () => {
  const [totalItems, setTotalItems] = useState(0);
  const [query, setQuery] = useState('');
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchTerm(query));
  }, [query]);

  useEffect(() => {
    let calc = 0;
    cart?.products?.forEach((product) => {
      calc += product?.quantity;
    });
    setTotalItems(() => calc);
  }, [cart]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };
  return (
    <nav className="w-full max-h-24 shadow-xl z-10 px-6 flex justify-between items-center uppercase text-sm bg-white text-red-600 font-bold sticky top-0 right-0">
      <Link href="/" className="w-24 md:w-36 hover:cursor-pointer">
        <Image
          src={classicLogo}
          className=" w-full"
          alt="classic closet logo"
          priority={true}
        />
      </Link>
      <ul className="nav-list gap-8 hidden md:flex">
        <li>
          <Link
            href="/"
            className="hover:underline hover:decoration-red-600 hover:decoration-solid hover:decoration-1"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/#products"
            className="hover:underline hover:decoration-red-600 hover:decoration-solid hover:decoration-1"
          >
            Products
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="hover:underline hover:decoration-red-600 hover:decoration-solid hover:decoration-1"
          >
            About Us
          </Link>
        </li>
      </ul>
      <ul className="flex gap-4">
        <li className="flex gap-2 items-center font-medium px-4 rounded-full shadow">
          <input
            type="text"
            placeholder="Search Products..."
            className="focus:outline-none w-32 placeholder-red-600"
            onChange={handleSearch}
          />
          <Image
            src={searchIcon}
            alt="search icon"
            className="h-[24px] w-[24px] md:h-[36px] md:w-[36px] cursor-pointer"
          />
        </li>
        <li>
          <Link
            href="/cart"
            className="flex gap-2 items-center font-medium relative"
          >
            <span className="h-5 w-5 shadow-md bg-white rounded-full absolute -top-1 left-4 flex justify-center items-center text-red-600 text-xs">
              {totalItems}
            </span>
            <Image
              src={cartIcon}
              alt="cart icon"
              className="h-[24px] w-[24px] md:h-[36px] md:w-[36px]"
            />
            <span className="hidden md:block">Cart</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
