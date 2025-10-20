// StoreProvider.js - This wraps our app with the Redux Provider

'use client'; // This is a Client Component (required for Redux)

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';

// This component wraps the app and provides the Redux store to all children
export default function StoreProvider({ children }) {
  // Create store once and keep it in a ref (prevents recreating on re-renders)
  const storeRef = useRef();
  
  if (!storeRef.current) {
    // First render: create the store
    storeRef.current = makeStore();
  }
  
  // Provider makes the store available to all nested components
  return <Provider store={storeRef.current}>{children}</Provider>;
}

