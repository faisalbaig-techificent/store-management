# 🚀 Redux Toolkit Quick Reference

## The Complete Flow (How Everything Connects)

```
┌─────────────────────────────────────────────────────────┐
│  1. USER INTERACTION (page.js)                          │
│     User clicks "Add to Cart" button                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  2. DISPATCH ACTION                                      │
│     dispatch(addToCart({ id: 1, name: 'Laptop' }))     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  3. REDUCER UPDATES STATE (cartSlice.js)                │
│     addToCart reducer runs and modifies state           │
│     - Adds item to cart.items[]                         │
│     - Updates cart.totalQuantity                        │
│     - Updates cart.totalPrice                           │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  4. STORE UPDATES (store.js)                            │
│     Redux store saves the new state                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  5. COMPONENT RE-RENDERS (page.js)                      │
│     useSelector detects state change                    │
│     Component re-renders with updated cart data         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│  6. UI UPDATES                                           │
│     Cart displays new item, updated totals              │
└─────────────────────────────────────────────────────────┘
```

## 📝 Code Snippets

### Reading State (useSelector)
```javascript
import { useSelector } from 'react-redux';

// Get entire cart state
const cart = useSelector((state) => state.cart);

// Or get specific values
const items = useSelector((state) => state.cart.items);
const totalPrice = useSelector((state) => state.cart.totalPrice);
```

### Updating State (useDispatch)
```javascript
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../redux/slices/cartSlice';

const dispatch = useDispatch();

// Add item
dispatch(addToCart({ id: 1, name: 'Laptop', price: 999 }));

// Remove item
dispatch(removeFromCart(1));
```

### Creating a New Action
```javascript
// In cartSlice.js, add to reducers:
reducers: {
  updateQuantity: (state, action) => {
    const { id, quantity } = action.payload;
    const item = state.items.find(item => item.id === id);
    if (item) {
      item.quantity = quantity;
      item.totalPrice = item.price * quantity;
    }
  }
}

// Export it
export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

// Use it in component
dispatch(updateQuantity({ id: 1, quantity: 5 }));
```

## 🎯 Key Rules to Remember

1. **Never mutate state directly** - Redux Toolkit uses Immer, so you can write "mutating" code in reducers
2. **Actions are plain objects** - They describe WHAT happened
3. **Reducers must be pure functions** - Same input = same output
4. **Only one store per app** - Single source of truth
5. **useSelector automatically subscribes** - Component re-renders when selected state changes

## 🔍 Debugging Tips

### View Redux State in DevTools
```javascript
// Already enabled by default in development mode
// Open browser DevTools → Redux tab
```

### Log state changes
```javascript
const cart = useSelector((state) => state.cart);
console.log('Current cart:', cart);
```

### Check if action was dispatched
```javascript
console.log('Dispatching addToCart');
dispatch(addToCart(product));
console.log('Action dispatched');
```

## ⚡ Common Patterns

### Conditional Dispatch
```javascript
const handleAddToCart = (product) => {
  if (product.inStock) {
    dispatch(addToCart(product));
  } else {
    alert('Product out of stock');
  }
};
```

### Multiple Dispatches
```javascript
const handleCheckout = () => {
  dispatch(processPayment());
  dispatch(clearCart());
  dispatch(showSuccessMessage());
};
```

### Async Actions (with Redux Thunk)
```javascript
// In slice, use createAsyncThunk for API calls
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk(
  'products/fetch',
  async () => {
    const response = await fetch('/api/products');
    return response.json();
  }
);
```

## 🎨 Project Files Summary

| File | Purpose | Key Exports |
|------|---------|-------------|
| `cartSlice.js` | State + Logic | actions: `addToCart`, `removeFromCart`, `clearCart` |
| `store.js` | Store Config | `makeStore()` function |
| `StoreProvider.js` | Context Provider | `StoreProvider` component |
| `layout.js` | App Wrapper | Wraps app with `<StoreProvider>` |
| `page.js` | Main UI | Uses `useSelector` + `useDispatch` |

---

**Happy Redux coding! 🎉**

