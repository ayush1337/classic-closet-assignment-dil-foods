import { createSlice } from '@reduxjs/toolkit';

const getLocalCartData = () => {
  if (typeof window !== 'undefined') {
    // Check if running on the client side
    return JSON.parse(localStorage.getItem('cart'))?.products || [];
  } else {
    return [];
  }
};

const initialState = {
  products: getLocalCartData(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //Add item to cart
    add: (state, action) => {
      let found = false;
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i]?.id === action.payload.id) {
          found = true;
          state.products[i].quantity += 1;
        }
      }
      if (!found) {
        state.products.push(action.payload);
      }
    },

    //Remove an item from cart
    remove: (state, action) => {
      for (let i = 0; i < state.products.length; i++) {
        if (state.products[i]?.id === action.payload) {
          if (state.products[i].quantity === 1) {
            state.products.splice(i, 1);
          } else {
            state.products[i].quantity -= 1;
          }
        }
      }
    },
    //Remove whole item from cart
    deleteItem: (state, action) => {
      let i = -1;
      let found = false;
      for (i = 0; i < state.products.length; i++) {
        if (state.products[i]?.id === action.payload) {
          found = true;
          break;
        }
      }
      if (found) delete state.products[i];
    },
    //Empty whole cart
    empty: (state) => {
      state.products = [];
    },
  },
});

export const { add, remove, deleteItem, empty } = cartSlice.actions;
export default cartSlice.reducer;
