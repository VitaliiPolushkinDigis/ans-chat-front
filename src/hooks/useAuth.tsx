import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../utils/context/AuthContext';
import { useLazyStatusQuery } from '../utils/services/api';
import { UserWithoutPassword } from '../utils/types';

export function useAuth() {
  const [loading, setLoading] = useState(true);

  const { user, udpateAuthUser } = useContext(AuthContext);

  const [getStatus] = useLazyStatusQuery();

  const controller = new AbortController();
  useEffect(() => {
    getStatus()
      .then((res) => {
        const { data } = res as { data: UserWithoutPassword };

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
