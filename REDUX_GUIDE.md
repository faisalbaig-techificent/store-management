# 🛒 Shopping Cart with Redux Toolkit - Complete Guide

This is a simple Next.js App Router example demonstrating Redux Toolkit with a Shopping Cart.

## 📁 Project Structure

```
src/
├── redux/
│   ├── slices/
│   │   └── cartSlice.js      # State + Actions (addToCart, removeFromCart, clearCart)
│   ├── store.js               # Redux store configuration
│   └── StoreProvider.js       # Provider wrapper component
└── app/
    ├── layout.js              # Root layout with StoreProvider
    ├── page.js                # Main component using useSelector & useDispatch
    └── page.module.css        # Styles
```

## 🔑 Key Concepts

### 1. **Slice** (`cartSlice.js`)
- Defines the **state structure** (items, totalQuantity, totalPrice)
- Contains **reducers** (functions that update state)
- Exports **actions** (addToCart, removeFromCart, clearCart)

### 2. **Store** (`store.js`)
- Central place that holds all app state
- Configured with `configureStore()` from Redux Toolkit
- Combines all reducers (in this case, just `cart`)

### 3. **Provider** (`StoreProvider.js`)
- Wraps the entire app
- Makes the Redux store available to all components
- Used in `layout.js` to provide store to whole app

### 4. **Reading State** (useSelector)
```javascript
const cart = useSelector((state) => state.cart);
// Now you can access: cart.items, cart.totalQuantity, cart.totalPrice
```

### 5. **Updating State** (useDispatch)
```javascript
const dispatch = useDispatch();
dispatch(addToCart({ id: 1, name: 'Laptop', price: 999 }));
```

## 🚀 How to Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 How It Works Together

1. **User clicks "Add to Cart"** → triggers `handleAddToCart()`
2. **Component dispatches action** → `dispatch(addToCart(product))`
3. **Redux calls the reducer** → updates state immutably
4. **Store notifies subscribers** → component re-renders with new data
5. **UI updates automatically** → cart displays new items

## 🎯 Adapting for Other App Ideas

### Todo App
```javascript
// todoSlice.js
const todoSlice = createSlice({
  name: 'todos',
  initialState: { items: [] },
  reducers: {
    addTodo: (state, action) => { /* ... */ },
    removeTodo: (state, action) => { /* ... */ },
    toggleTodo: (state, action) => { /* ... */ },
  }
});
```

### Notes App
```javascript
// notesSlice.js
const notesSlice = createSlice({
  name: 'notes',
  initialState: { notes: [] },
  reducers: {
    addNote: (state, action) => { /* ... */ },
    deleteNote: (state, action) => { /* ... */ },
    updateNote: (state, action) => { /* ... */ },
  }
});
```

### Auth App
```javascript
// authSlice.js
const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    login: (state, action) => { /* ... */ },
    logout: (state) => { /* ... */ },
  }
});
```

## 📚 Learn More

- [Redux Toolkit Docs](https://redux-toolkit.js.org/)
- [Next.js App Router](https://nextjs.org/docs/app)
- [React Redux Hooks](https://react-redux.js.org/api/hooks)

