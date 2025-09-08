import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Handle ethereum property conflicts
if (typeof window !== 'undefined') {
  try {
    const originalDefineProperty = Object.defineProperty;
    Object.defineProperty = function(obj: any, prop: PropertyKey, descriptor: PropertyDescriptor) {
      if (prop === 'ethereum' && obj === window) {
        return obj;
      }
      return originalDefineProperty.call(this, obj, prop, descriptor);
    };
  } catch (error) {
    // Ignore ethereum property conflicts
    console.warn('Ethereum property conflict handled:', error);
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
