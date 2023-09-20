import { FC, PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();

  if (loading) {
    return <div>{children}</div>;
  } else {
    /* if (user)  */ return <>{children}</>;
    /*   return <Navigate to="/login" state={{ from: location }} />; */
  }
};
