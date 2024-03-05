import { createAsyncThunk } from '@reduxjs/toolkit';
import { getProducts, postShopping } from './productsApi';


export const getProductsThunk = createAsyncThunk('product/getProducts', () => 
  getProducts()
);

export const postShoppingThunk = createAsyncThunk('shopping/postShopping', (body) => 
  postShopping(body)
);

// export const addContactsThunk = createAsyncThunk('contact/addContacts', (res) =>
//   addContacts(res)
// );

// export const deleteContactsThunk = createAsyncThunk('contact/deleteContacts', (id) =>
//   deleteContacts(id)
// );