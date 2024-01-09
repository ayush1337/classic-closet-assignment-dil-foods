'use client';
import React, { useState } from 'react';
import Image from 'next/image';

import VisaLogo from '@/assets/visa.svg';

const Checkout = () => {
  const [paymentDetail, setPaymentDetails] = useState({
    cardNumber: '',
    expirationDate: '',
    cvv: '',
    cardHolder: '',
  });

  const handleInput = (event) => {
    const { name, value } = event.target;
    setPaymentDetails((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', paymentDetail);
  };
  return (
    <div className="w-full min-h-[100dvh]">
      <div className="max-w-[1400px] mx-auto p-8 flex flex-col gap-8">
        <div class="block text-sm font-medium text-gray-700 mb-2">
          Payment Option
        </div>
        <Image
          src={VisaLogo}
          width={100}
          height={100}
          alt="visa logo"
          className="cursor-pointer border-2 border-gray-50 border-solid rounded p-2"
        />
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div>
            <label
              for="card-number"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Card Number
            </label>
            <input
              type="number"
              name="cardNumber"
              id="card-number"
              value={paymentDetail.cardNumber}
              placeholder="0000 0000 0000 0000"
              class="w-64 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500"
              onChange={handleInput}
              required
            ></input>
          </div>
          <div className="flex gap-4">
            <div>
              <label
                for="expiration-date"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                Expiration Date
              </label>
              <input
                type="number"
                name="expirationDate"
                id="expiration-date"
                value={paymentDetail.expirationDate}
                placeholder="MM / YY"
                className="w-36 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500"
                onChange={handleInput}
                required
              ></input>
            </div>

            <div>
              <label
                for="cvv"
                class="block text-sm font-medium text-gray-700 mb-2"
              >
                CVV
              </label>
              <input
                type="password"
                name="cvv"
                id="cvv"
                value={paymentDetail.cvv}
                placeholder="000"
                className="w-16 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500"
                onChange={handleInput}
                required
              ></input>
            </div>
          </div>
          <div>
            <label
              for="card-holder"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Card Holder Name
            </label>
            <input
              type="text"
              name="cardHolder"
              id="card-holder"
              value={paymentDetail.cardHolder}
              placeholder="Full Name"
              className="w-64 py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-red-500"
              onChange={handleInput}
              required
            ></input>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-red-600 text-white font-medium max-w-32 rounded-full"
            onClick={() => {
              document.getElementById('my_modal_1').showModal();
            }}
          >
            Submit
          </button>
        </form>

        <dialog id="my_modal_1" className="px-16 py-32 rounded-lg">
          <div className="flex flex-col gap-8 items-center">
            <h3 className="font-bold text-lg">🥳 Payment Successful</h3>
            <div>Thanks {paymentDetail.cardHolder}</div>
            <div className="modal-action">
              <form method="dialog">
                <button className="bg-gray-100 px-6 py-2 rounded-full">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Checkout;
