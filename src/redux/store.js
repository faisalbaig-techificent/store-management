// store.js - This file configures the Redux store


import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

// Configure and create the Redux store
// The store is the single source of truth for your app's state
export const makeStore = () => {
  return configureStore({
    reducer: {
      // Add reducers here - each key becomes a piece of state
      cart: cartReducer, // state.cart will be managed by cartReducer
    },
    
    // Optional: Add middleware, devTools config, etc.
    // devTools: process.env.NODE_ENV !== 'production',
  });
};

// Export a type for the store (useful for TypeScript)
// For JavaScript, this helps understand the structure

