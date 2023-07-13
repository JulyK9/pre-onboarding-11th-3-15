import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { RouterProvider } from 'react-router-dom';
import { router } from 'router/router';
// import { HttpClient } from 'api/httpClient';
import { GetIssueProvider } from 'context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <GetIssueProvider>
      <RouterProvider router={router} />
      <App />
    </GetIssueProvider>
  </React.StrictMode>,
);
