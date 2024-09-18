import { useCallback, useRef, useState } from "react";
import styled from "styled-components";

import { TextButton, TextField } from "ui";
import { gutterBy } from "styles/spaces";

interface Props {
  onSignIn: (name: string) => void;
}

const AuthLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: ${gutterBy(8)};
`;
const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
  padding-top: ${gutterBy(2)};
`;
export const Authenticate = ({ onSignIn }: Props) => {
  const nameRef = useRef("");
  const [error, setError] = useState<string | null>(null);

  const handleInputName = useCallback((value: string) => {
    nameRef.current = value;
  }, []);

  const handleOnSignin = useCallback(() => {
    try {
      onSignIn(nameRef.current);
    } catch (e) {
      setError("ログインに失敗しました");
    }
  }, [onSignIn]);

  return (
    <AuthLayout>
      <TextField
        texttype="plain"
        line="single"
        placeholder="ユーザー名"
        onInput={handleInputName}
      />

      <TextButton
        buttonType="primary"
        text="じゅもんをとなえる 💥"
        onClick={handleOnSignin}
      />

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </AuthLayout>
  );
};
