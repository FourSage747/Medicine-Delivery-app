import { createSlice } from '@reduxjs/toolkit';
import { getProductsThunk, postShoppingThunk } from './thunk';

const InitialState = {
    isLoading: false,
    error: '',
    products: [],
    shopping: []
  };
  

export const productsSlice = createSlice({
  name: 'products',
  initialState: InitialState,
  reducers: {
    shoppingCart: (state, action) => {
      state.shopping = [action.payload, ...state.shopping]
    },
    deleteProducts: (state, action) => {
      state.shopping = state.shopping.filter((el) => el._id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getProductsThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        state.error = '';
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postShoppingThunk.pending, state => {
        state.isLoading = true;
      })
      .addCase(postShoppingThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopping = [];
        state.error = '';
      })
      .addCase(postShoppingThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const productsReducer = productsSlice.reducer;
export const { shoppingCart, deleteProducts } = productsSlice.actions;