import { createBrowserRouter } from 'react-router-dom';
import List from 'pages/List';
import Layout from 'components/common/Layout';
import Detail from 'pages/Detail';

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
        element: <Detail />,
      },
    ],
  },
]);
