import { createBrowserRouter } from 'react-router-dom';
import List from 'pages/List';
import Detail from 'pages/Detail';
import Layout from 'components/common/Layout';
import Error from 'components/common/Error';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: 'issues',
        element: <List />,
      },
      {
        path: 'issues/:issueNumber',
        element: <Detail />,
      },
    ],
  },
]);
