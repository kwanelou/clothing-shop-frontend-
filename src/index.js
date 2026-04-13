import React from 'react';
import ReactDOM from 'react-dom/client';


import App from './App';
import { AuthProvider } from './components/backened/context/Auth';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <AuthProvider>
       <App />

    </AuthProvider>
   
  </div>
);


