'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CardItem from '@/components/CardItem';
import { useSelector } from 'react-redux';

const Cart = () => {
  const [productData, setProductData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    let totalPrice = 0;
    cart?.products?.forEach((product) => {
      totalPrice = totalPrice + product.quantity * product.price;
    });
    totalPrice = totalPrice.toFixed(2);
    setGrandTotal(() => totalPrice);
    setProductData(() => cart?.products);
  }, [cart]);

  useEffect(() => {
    const localProductData = JSON.parse(localStorage.getItem('cart')).products;
    if (localProductData !== undefined && localProductData?.length !== 0) {
      setProductData(() => localProductData);
    }
  }, []);

  if (productData === undefined || productData.length === 0) {
    return (
      <div className="min-h-[100dvh] w-full">
        <div className="max-w-[1400px] mx-auto flex flex-col justify-center items-center min-h-[100dvh] gap-8">
          <h1 className="text-4xl font-semibold">
            😬 It seems your cart is empty.
          </h1>
          <Link href="/" className="bg-red-600 py-2 px-4 text-white rounded-lg">
            Start Shopping!
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[100dvh]">
      <div className="mx-auto max-w-[1400px] flex flex-col md:justify-between md:flex-row md:gap-2 md:items-start items-center gap-8">
        <ul className="flex gap-8  flex-wrap items-center md:justify-evenly justify-center">
          {productData.map((product) => {
            return (
              <li
                key={product.id}
                className="rounded  min-h-[500px] max-w-[300px] flex flex-col justify-evenly"
              >
                <CardItem
                  id={product.id}
                  category={product.category}
                  image={product.image}
                  price={product.price}
                  quantity={product.quantity}
                  rating={product.rating}
                  title={product.title}
                />
              </li>
            );
          })}
        </ul>
        <ul className="p-8 flex flex-col gap-8 text-sm min-w-max">
          <li className="flex justify-between font-bold">
            <span className="">Qtn. x Product</span>
            <span>Base Price</span>
            <span>Total Price</span>
          </li>
          {productData?.map((product) => {
            return (
              <li key={product.id} className="flex justify-between">
                <span className="max-w-32 min-w-32">
                  {product.quantity} x {product.title}
                </span>
                <span>&#8377; {product.price}</span>
                <span>
                  &#8377; {(product.price * product.quantity).toFixed(2)}
                </span>
              </li>
            );
          })}
          <li>
            --------------------------------------------------------------
          </li>
          <li className="flex justify-between font-bold text-base">
            <h1>Grand Total</h1>
            <span>&#8377; {grandTotal}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
