import { useCallback, useRef } from "react";
import styled from "styled-components";
import { TextButton } from "ui/TextButton";
import { TextField } from "ui/TextField";

interface Props {
  onPostMessage: (message: string) => Promise<void>;
}

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 80px;
`;

const MessageField = styled(TextField)`
  width: calc(100% - 115px);
`;

const PostButton = styled(TextButton)`
  width: 100px;
`;

export const MessageForm = ({ onPostMessage }: Props) => {
  const textRef = useRef("");
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputText = useCallback((value: string) => {
    textRef.current = value;
  }, []);

  const handleClickPost = () => {
    onPostMessage(textRef.current);
    // MEMO: TextField は非制御コンポーネントのため、HTML の機能を用いてリセット
    formRef.current?.reset();
    textRef.current = "";
  };

  return (
    <Form ref={formRef}>
      <MessageField
        texttype="plain"
        line="multi"
        placeholder="メッセージを入力してください"
        onInput={handleInputText}
      />
      <PostButton buttonType="primary" text="投稿" onClick={handleClickPost} />
    </Form>
  );
};
