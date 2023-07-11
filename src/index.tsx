import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <App />
  </React.StrictMode>,
);
