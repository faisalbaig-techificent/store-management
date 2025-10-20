// page.js - Main page component demonstrating Redux usage

'use client'; // Client component to use hooks

import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../redux/slices/cartSlice';
import styles from './page.module.css';

// Sample products to add to cart
const PRODUCTS = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Mouse', price: 25 },
  { id: 3, name: 'Keyboard', price: 75 },
  { id: 4, name: 'Monitor', price: 299 },
];

export default function Home() {
  // useSelector: Read data from Redux store
  // This component will re-render when cart state changes
  const cart = useSelector((state) => state.cart);
  
  // useDispatch: Get the dispatch function to send actions to Redux
  const dispatch = useDispatch();
  
  // Handler to add product to cart
  const handleAddToCart = (product) => {
    // Dispatch the addToCart action with product data
    dispatch(addToCart(product));
  };
  
  // Handler to remove product from cart
  const handleRemoveFromCart = (productId) => {
    // Dispatch the removeFromCart action with product id
    dispatch(removeFromCart(productId));
  };
  
  // Handler to clear entire cart
  const handleClearCart = () => {
    // Dispatch the clearCart action
    dispatch(clearCart());
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🛒 Shopping Cart with Redux Toolkit</h1>
      
      <div className={styles.layout}>
        {/* Products Section */}
        <section className={styles.productsSection}>
          <h2>Available Products</h2>
          <div className={styles.productGrid}>
            {PRODUCTS.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <h3>{product.name}</h3>
                <p className={styles.price}>${product.price}</p>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className={styles.addButton}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>
        
        {/* Cart Section */}
        <section className={styles.cartSection}>
          <h2>Your Cart</h2>
          
          {/* Display cart summary using data from Redux store */}
          <div className={styles.cartSummary}>
            <p>Total Items: <strong>{cart.totalQuantity}</strong></p>
            <p>Total Price: <strong>${cart.totalPrice.toFixed(2)}</strong></p>
          </div>
          
          {/* Display cart items */}
          {cart.items.length === 0 ? (
            <p className={styles.emptyCart}>Your cart is empty</p>
          ) : (
            <>
              <ul className={styles.cartItems}>
                {cart.items.map((item) => (
                  <li key={item.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <strong>{item.name}</strong>
                      <span>Qty: {item.quantity}</span>
                      <span>${item.totalPrice.toFixed(2)}</span>
                    </div>
                    <button 
                      onClick={() => handleRemoveFromCart(item.id)}
                      className={styles.removeButton}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              
              <button 
                onClick={handleClearCart}
                className={styles.clearButton}
              >
                Clear Cart
              </button>
            </>
          )}
        </section>
      </div>
      
      {/* Explanation Section */}
      <section className={styles.explanation}>
        <h3>📚 How it Works:</h3>
        <ul>
          <li><strong>Store:</strong> Created in <code>src/redux/store.js</code> - holds all app state</li>
          <li><strong>Slice:</strong> Defined in <code>src/redux/slices/cartSlice.js</code> - contains state + actions</li>
          <li><strong>Provider:</strong> Wraps app in <code>src/app/layout.js</code> - makes store available everywhere</li>
          <li><strong>useSelector:</strong> Reads state from store (e.g., <code>useSelector(state =&gt; state.cart)</code>)</li>
          <li><strong>useDispatch:</strong> Sends actions to update state (e.g., <code>dispatch(addToCart(product))</code>)</li>
        </ul>
      </section>
    </div>
  );
}

