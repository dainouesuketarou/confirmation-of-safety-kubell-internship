import { useSignInUseCase } from "local-service/auth/hooks"
import { Authenticate } from "./components/Authenticate";

export const AuthenticateContainer = () => {
  const handleSignin = useSignInUseCase();

  return (
    <Authenticate onSignIn={handleSignin} />
  )
}
