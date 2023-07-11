import { createBrowserRouter } from 'react-router-dom';
import Item from 'pages/Item';
import List from 'pages/List';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <List />,
  },
  {
    path: 'issues/:issueId',
    element: <Item />,
  },
]);
