import { createContext, FC } from 'react';
import { User } from '../types';

type AuthContextType = {
  user?: User;
  udpateAuthUser: (data: User) => void;
};

export const AuthContext = createContext<AuthContextType>({
  udpateAuthUser: () => {},
});
