/* eslint-disable react/jsx-no-useless-fragment */
import { lazy, ReactNode, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import ComponentLoading from '@/components/shared/ComponentLoading';
import Loadable from '@/components/shared/Loadable';

const Login = Loadable(lazy(() => import('@/pages/Login')));

export type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <ComponentLoading />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
