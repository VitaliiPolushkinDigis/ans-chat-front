import { useContext, useEffect, useState } from 'react';
import { getAuthUser } from '../utils/api';
import { AuthContext } from '../utils/context/AuthContext';

export function useAuth() {
  const [loading, setLoading] = useState(true);

  const { user, udpateAuthUser } = useContext(AuthContext);

  const controller = new AbortController();
  useEffect(() => {
    getAuthUser()
      .then(({ data }) => {
        udpateAuthUser(data);
        setTimeout(() => setLoading(false), 100);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => setLoading(false), 100);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return { user, loading };
}
