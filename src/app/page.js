'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import DummyData from '@/utils/dummyData.json';

import classicHeader from '@/assets/classic-header.png';
import CardItemMain from '@/components/CardItemMain';

const HomePage = () => {
  const [productData, setProductData] = useState(DummyData);
  const search = useSelector((state) => state.search);
  const router = useRouter();

  useEffect(() => {
    if (search.query !== '') {
      router.push('/#products');
    }
  }, [search]);

  //sorting logic for products
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    switch (selectedValue) {
      case 'CL':
        const sortedDataCL = [...productData].sort((a, b) => a.price - b.price);
        setProductData(() => sortedDataCL);
        break;

      case 'CH':
        const sortedDataCH = [...productData].sort((a, b) => b.price - a.price);
        setProductData(() => sortedDataCH);
        break;

      case 'NA':
        const sortedDataNA = [...productData].sort((a, b) =>
          a.title.localeCompare(b.title)
        );
        setProductData(() => sortedDataNA);
        break;

      case 'NZ':
        const sortedDataNZ = [...productData].sort((a, b) =>
          b.title.localeCompare(a.title)
        );
        setProductData(() => sortedDataNZ);
        break;

      default:
        setProductData(() => DummyData);
        break;
    }
  };

  return (
    <div className="p-16 flex flex-col gap-6">
      <Link href="#products">
        <Image
          src={classicHeader}
          alt="classic header"
          className="w-full hover:cursor-pointer"
          priority={true}
        />
      </Link>
      <div className="w-full h-[1px] solid bg-red-600 opacity-25"></div>
      <section id="products">
        <h1 className="text-red-600 font-extrabold text-xl pb-8">
          Explore Products
        </h1>

        <select
          onChange={handleSelectChange}
          id="default"
          className=" cursor-pointer bg-red-50 border border-red-300 text-red-900 mb-6 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block p-2.5 dark:bg-red-700 dark:border-red-600 dark:placeholder-gray-400 dark:text-red dark:focus:ring-red-500 dark:focus:border-red-500"
        >
          <option defaultValue value="DF">
            Sort Products (Default)
          </option>
          <option value="CL">Cost: Low to High</option>
          <option value="CH">Cost: High to Low</option>
          <option value="NA">Name: A to Z</option>
          <option value="NZ">Name: Z to A</option>
        </select>

        <ul className="flex gap-8 pt-8 flex-wrap items-center md:justify-evenly justify-center">
          {productData
            .filter((product) =>
              product?.title?.toLowerCase()?.includes(search.query)
            )
            .map((product) => {
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
