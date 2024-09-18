import type { User } from "local-service/auth/models";
import { useRef } from "react";
import styled from "styled-components";
import { gutterBy } from "styles/spaces";
import * as Typography from 'styles/typography';
import { CheckBox, TextButton, TextField } from "ui/";

interface Props {
  users: User[];
  onCreate: (title: string, userIds: string[]) => void;
  onClose: () => void;
}

const Caption = styled.p`
  font-size: ${Typography.FONTSIZE_CAPTION};
  margin: ${gutterBy(2)};
`

const UserCheckboxContainer = styled.div`
  width: calc(100% - ${gutterBy(2)} * 2);
  margin: 0 ${gutterBy(2)};
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

const ActionButtonContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: calc(100% - ${gutterBy(2)} * 2);
  margin: ${gutterBy(2)};
  text-align: center;
`;

export function CreateGroupChat({ users, onCreate, onClose }: Props) {
  const titleRef = useRef("");
  const userIdsRef = useRef<Set<string>>(new Set());

  const handleClickCreate = () => {
    onCreate(titleRef.current, [...userIdsRef.current]);
    onClose();
  };

  const handleInputTitle = (value: string) => {
    titleRef.current = value;
  };

  const handleChangeSelectedUser = (id: string) => (selected: boolean) => {
    if (selected) {
      userIdsRef.current.add(id);
    } else {
      userIdsRef.current.delete(id);
    }
  };

  return (
    <>
      <Caption>グループチャットのタイトルを入力してください：</Caption>
      <TextField
        texttype="plain"
        line="single"
        placeholder="グループチャットのタイトル"
        onInput={handleInputTitle}
      />
      <Caption>グループチャットに所属させるユーザーを選択してください：</Caption>
      <UserCheckboxContainer>
        {users.map((user) => (
          <CheckBox
            key={user.id}
            label={user.name}
            onChange={handleChangeSelectedUser(user.id)}
          />
        ))}
      </UserCheckboxContainer>
      <ActionButtonContainer>
        <TextButton buttonType="danger" text="キャンセル" onClick={onClose} />
        <TextButton buttonType="primary" text="作成" onClick={handleClickCreate} />
      </ActionButtonContainer>
    </>
  );
}
