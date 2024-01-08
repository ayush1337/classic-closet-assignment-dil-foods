'use client';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Image from 'next/image';

import DummyData from '@/utils/dummyData.json';
import { add, remove } from '../../lib/features/cartSlice';

import cartIconWhite from '@/assets/cart_ico_white.svg';
import plusIcon from '@/assets/plus_ico.svg';
import minusIcon from '@/assets/minus_ico.svg';

const ProductId = ({ params }) => {
  const [productCount, setproductCount] = useState(0);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //Initialize Product cart info from local storage on first render.

  useEffect(() => {
    const localProductData = JSON.parse(localStorage.getItem('cart'))?.products;
    localProductData?.forEach((product) => {
      if (Number(product.id) === Number(params.productId)) {
        setproductCount(() => product.quantity);
      }
    });
  }, []);

  //Refresh Local Storage Everytime cart is updated

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  //Filter Product according to product ID

  const getProduct = DummyData.filter(
    (product) => product.id == params.productId
  );

  if (getProduct.length === 0) {
    return <div>Product not found</div>;
  }

  const [product] = getProduct;

  return (
    <div className="w-full min-h-[100dvh]">
      <div className="mx-auto w-full max-w-[1400px] flex flex-col lg:flex-row">
        <Image
          src={product.image}
          width={750}
          height={200}
          alt={product.title}
          priority={true}
          className="shadow-box p-16 aspect-[1/1] object-contain"
        />
        <div className="flex flex-col gap-8 md:p-16 p-8">
          <span className="uppercase text-xs font-bold text-red-600">
            {product.category}
          </span>
          <span className="text-2xl font-semibold">{product.title}</span>
          <span className="text-base md:text-lg">{product.description}</span>
          <div className="flex justify-between">
            <span className="font-extrabold">&#8377; {product.price}</span>
            <span className="text-sm">{product.rating.rate}/5</span>
          </div>

          {productCount === 0 && (
            <button
              onClick={() => {
                dispatch(add({ quantity: 1, ...product }));
                setproductCount((p) => {
                  return p + 1;
                });
              }}
              className="w-full bg-red-600 uppercase font-medium rounded-md py-2 text-white flex justify-center items-center gap-4 hover:bg-red-500"
            >
              <Image
                src={cartIconWhite}
                alt="cart icon"
                height={36}
                width={36}
              />
              <span className="text-xs md:text-sm">
                Add to cart - &#8377; {product.price}
              </span>
            </button>
          )}

          {productCount !== 0 && (
            <div className="w-full flex justify-center items-center gap-6">
              <Image
                src={plusIcon}
                alt="cart icon"
                height={36}
                width={36}
                className="cursor-pointer rounded-full border-[1px] border-solid border-red-600"
                onClick={() => {
                  dispatch(add({ quantity: 1, ...product }));
                  setproductCount((p) => {
                    return p + 1;
                  });
                }}
              />

              <span className="text-red-600">{productCount}</span>
              <Image
                src={minusIcon}
                alt="cart icon"
                height={36}
                width={36}
                className="cursor-pointer rounded-full border-[1px] border-solid border-red-600"
                onClick={() => {
                  dispatch(remove(product.id));
                  setproductCount((p) => {
                    if (p === 0) {
                      return p;
                    }
                    return p - 1;
                  });
                }}
              />
            </div>
          )}
          <p className="flex items-center justify-center gap-2 mt-2 font-sans text-sm antialiased font-medium leading-normal text-gray-700 opacity-60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="-mt-0.5 h-4 w-4"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              ></path>
            </svg>
            All Information are secure and encrypted
          </p>
          {product.category === "men's clothing" ||
            (product.category === "women's clothing" && (
              <span className="text-xs opacity-75">
                please follow care label on clothing. all our clothing is hand
                wash,
                <br />
                please ensure to always use cold water.
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductId;
