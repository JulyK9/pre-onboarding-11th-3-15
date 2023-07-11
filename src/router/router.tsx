import { createBrowserRouter } from 'react-router-dom';
import Item from 'pages/Item';
import List from 'pages/List';
import Layout from 'components/common/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'issues',
        element: <List />,
      },
      {
        path: 'issues/:issueId',
        element: <Item />,
      },
    ],
  },
]);
