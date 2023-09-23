import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '@/components/shared/Loadable';

const StartingPage = Loadable(lazy(() => import('@/pages/StartingPage')));
const Home = Loadable(lazy(() => import('@/pages/Home')));

function Routes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <StartingPage />,
    },
    {
      path: '/home',
      element: <Home />,
    },
    // {
    //   path: '/',
    //   element: (
    //     <AuthGuard>
    //       <MainLayout />
    //     </AuthGuard>
    //   ),
    //   children: [
    //     {
    //       path: '/',
    //       element: <Dashboard />,
    //     },
    //     {
    //       path: '/classmarking',
    //       element: <ClassMarking />,
    //     },
    //     {
    //       path: '/classmarking-detail',
    //       element: <DetailedClassMarking />,
    //     },
    //   ],
    // },
  ]);

  return routes;
}

export default Routes;
