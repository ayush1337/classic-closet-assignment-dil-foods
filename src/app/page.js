import Image from 'next/image';
import React from 'react';

import DummyData from '../utils/dummyData.json';

import classicHeader from '../assets/classic-header.png';
import filterIcon from '../assets/filter_ico.svg';
import Link from 'next/link';
const HomePage = () => {
  return (
    <div className="p-16 flex flex-col gap-6">
      <Image
        src={classicHeader}
        alt="classic header"
        className="w-full hover:cursor-pointer"
        priority={true}
      />
      <div className="w-full h-[1px] solid bg-red-600 opacity-25"></div>
      <section>
        <h1 className="text-red-600 font-extrabold text-xl">
          Explore Products
        </h1>
        <div>
          <ul className="flex gap-4 flex-wrap pt-6">
            <li className="filter-btn">
              Filter
              <Image
                src={filterIcon}
                alt="filter_ico icon"
                height={18}
                width={18}
                className="opacity-85 fill-red-600 text-red-600"
              />
            </li>
            <li className="filter-btn">Category</li>
          </ul>
        </div>

        <ul className="flex gap-8 pt-8 flex-wrap items-center md:justify-evenly justify-center">
          {DummyData.map((product) => {
            return (
              <li
                key={product.id}
                className="rounded  min-h-[500px] max-w-[350px] flex flex-col justify-between"
              >
                <Link
                  href={`/products/${product.id}`}
                  className="flex flex-col gap-2"
                >
                  <Image
                    src={product.image}
                    width={350}
                    height={200}
                    alt={product.title}
                    className="shadow-box p-16 aspect-[1/1] object-contain"
                  />

                  <span className="uppercase text-xs font-semibold opacity-75 text-black">
                    {product.category}
                  </span>

                  <h2 className="max-w-[85%] text-sm">{product.title}</h2>

                  <div className="flex justify-between">
                    <span className="font-extrabold">
                      &#8377; {product.price}
                    </span>
                    <span className="text-xs">{product.rating.rate}/5</span>
                  </div>
                </Link>
                <button className="rounded-xl font-bold bg-red-600 text-white uppercase text-xs py-2 hover:opacity-85">
                  Add to Cart
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
