// cartSlice.js - This file defines our shopping cart state and actions

import { createSlice } from '@reduxjs/toolkit';

// Initial state: what our cart looks like when the app starts
const initialState = {
  items: [], // Array to hold cart items
  totalQuantity: 0, // Total number of items in cart
  totalPrice: 0, // Total price of all items
};

// Create a "slice" - a collection of Redux reducer logic and actions
const cartSlice = createSlice({
  name: 'cart', // Name of this slice (used in action types)
  initialState, // The initial state defined above
  
  // Reducers: functions that define how state changes
  reducers: {
    
    // Action: Add an item to the cart
    addToCart: (state, action) => {
      const newItem = action.payload; // The item being added (from dispatch)
      
      // Check if item already exists in cart
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // If exists, increase quantity
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      } else {
        // If new, add to cart
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      }
      
      // Update cart totals
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },
    
    // Action: Remove an item from the cart
    removeFromCart: (state, action) => {
      const id = action.payload; // The id of item to remove
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        // Update totals
        state.totalQuantity--;
        state.totalPrice -= existingItem.price;
        
        if (existingItem.quantity === 1) {
          // If only 1 left, remove item completely
          state.items = state.items.filter(item => item.id !== id);
        } else {
          // If more than 1, decrease quantity
          existingItem.quantity--;
          existingItem.totalPrice -= existingItem.price;
        }
      }
    },
    
    // Action: Clear the entire cart
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

// Export actions so components can use them with useDispatch()
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

// Export the reducer to be used in the store
export default cartSlice.reducer;

