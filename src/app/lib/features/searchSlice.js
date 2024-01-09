import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchTerm: (state, action) => {
      state.query = action.payload;
    },
  },
});

export const { searchTerm } = searchSlice.actions;
export default searchSlice.reducer;
