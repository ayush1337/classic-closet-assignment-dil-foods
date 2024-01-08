'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { add, remove } from '@/app/lib/features/cartSlice';
import plusIcon from '@/assets/plus_ico.svg';
import minusIcon from '@/assets/minus_ico.svg';

const CardItemMain = ({
  id,
  category,
  image,
  price,
  quantity,
  rating,
  title,
}) => {
  const [productCount, setProductCount] = useState(quantity);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const localProductData = JSON.parse(localStorage.getItem('cart'))?.products;
    localProductData?.forEach((product) => {
      if (Number(product.id) === Number(id)) {
        setProductCount(product.quantity);
      }
    });
  }, []);

  //updates the cart evertime it changes.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  return (
    <>
      <Link href={`/products/${id}`} className="flex flex-col gap-2">
        <Image
          src={image}
          width={350}
          height={200}
          alt={title}
          className="shadow-box p-16 aspect-[1/1] object-contain"
        />

        <span className="uppercase text-xs font-semibold opacity-75 text-black">
          {category}
        </span>

        <h2 className="max-w-[85%] text-sm">{title}</h2>

        <div className="flex justify-between">
          <span className="font-extrabold">&#8377; {price}</span>
          <span className="text-xs">{rating?.rate}/5</span>
        </div>
      </Link>
      {productCount === 0 && (
        <button
          onClick={() => {
            setProductCount(() => 1);
            dispatch(
              add({
                id,
                category,
                image,
                price,
                rating,
                title,
                quantity: 1,
              })
            );
          }}
          className="rounded-xl font-bold bg-red-600 text-white uppercase text-xs py-2 hover:opacity-85"
        >
          Add to Cart
        </button>
      )}
      {productCount > 0 && (
        <div className="w-full flex justify-center items-center gap-6">
          <Image
            src={plusIcon}
            alt="cart icon"
            height={36}
            width={36}
            className="cursor-pointer rounded-full border-[1px] border-solid border-red-600"
            onClick={() => {
              dispatch(
                add({
                  id,
                  category,
                  image,
                  price,
                  rating,
                  title,
                })
              );
              setProductCount((p) => {
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
              dispatch(remove(id));
              setProductCount((p) => {
                if (p === 0) {
                  return p;
                }
                return p - 1;
              });
            }}
          />
        </div>
      )}
    </>
  );
};

export default CardItemMain;
