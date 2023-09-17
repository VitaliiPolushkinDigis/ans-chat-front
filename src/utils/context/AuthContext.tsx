import { createContext } from 'react';
import { UserWithoutPassword } from '../types';

type AuthContextType = {
  user?: UserWithoutPassword;
  udpateAuthUser: (data: UserWithoutPassword) => void;
};

export const AuthContext = createContext<AuthContextType>({
  udpateAuthUser: () => ({}),
});
