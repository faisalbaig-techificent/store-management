// layout.js - Root layout for App Router

import StoreProvider from '../redux/StoreProvider';
import '../styles/globals.css';

export const metadata = {
  title: 'Shopping Cart with Redux',
  description: 'A simple Next.js App Router example with Redux Toolkit',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap entire app with StoreProvider to give all components access to Redux store */}
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}

