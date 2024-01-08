import React from 'react';
import Image from 'next/image';

import DummyData from '@/utils/dummyData.json';

import classicHeader from '@/assets/classic-header.png';
import filterIcon from '@/assets/filter_ico.svg';
import CardItemMain from '@/components/CardItemMain';

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
                <CardItemMain
                  id={product.id}
                  category={product.category}
                  image={product.image}
                  price={product.price}
                  quantity={0}
                  rating={product.rating}
                  title={product.title}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;
