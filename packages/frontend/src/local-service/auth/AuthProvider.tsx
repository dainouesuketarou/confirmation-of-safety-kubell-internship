import type { ReactElement } from 'react';
import { createContext, useState } from 'react';

import type { User } from './models';

interface AuthContextType {
  signedInUser: User | null;
  setSignedInUser: (loginUser: User | null) => void;
}
export const AuthContext = createContext<AuthContextType>({
  signedInUser: null,
  setSignedInUser: () => {},
});

interface Props {
  children: ReactElement;
}

export const AuthProvider = ({ children }: Props) =>{
  const [signedInUser, setSignedInUser] = useState<User | null>(null);
  return (
    <AuthContext.Provider value={{ signedInUser, setSignedInUser }}>
      {children}
    </AuthContext.Provider>
  );
}
