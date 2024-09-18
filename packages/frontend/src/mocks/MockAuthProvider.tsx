import { useState } from "react";
import type { ReactElement } from "react";

import type { User } from "../local-service/auth/models";
import { AuthContext } from "../local-service/auth/AuthProvider";
import { REGISTERED_USERS } from "./dummy-user";

interface Props {
  children: ReactElement;
}

export const MockAuthProvider = ({ children }: Props) => {
  const [signedInUser, setSignedInUser] = useState<User | null>(
    REGISTERED_USERS[0]
  );

  return (
    <AuthContext.Provider value={{ signedInUser, setSignedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};
