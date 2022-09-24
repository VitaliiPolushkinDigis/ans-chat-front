import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthUser } from '../utils/api';
import { User } from '../utils/types';

function useAuth() {
  const [user, setUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const controller = new AbortController();
  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        setUser(data);
        setTimeout(() => setLoading(false), 100);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => setLoading(false), 100);
      });

    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, loading };
}

export const AuthenticatedRoute: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();

  if (loading) {
    return <div>{children}</div>;
  } else {
    if (user) return <>{children}</>;
    return <Navigate to="/login" state={{ from: location }} />;
  }
};
