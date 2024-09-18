import { useMutation } from "@apollo/client";
import { useCallback, useMemo } from "react";

import { useSignedInUser } from "local-service/auth/hooks";
import { REGISTERED_USERS } from "mocks/dummy-user";
import { useDialog } from "ui/Dialog";
import { TextButton } from "ui/TextButton";
import { AddMemberMutation } from "./apis/addMember.command";
import { CreateGroupChatMutation } from "./apis/createGroupChat.command";
import { CreateGroupChat } from "./components/CreateGroupChat";

export const CreateGroupChatDialogContainer = () => {
  const [createGroupChat] = useMutation(CreateGroupChatMutation, {
    context: { clientName: "command" },
  });
  const [addMember] = useMutation(AddMemberMutation, {
    context: { clientName: "command" },
  });

  const [Dialog, openDialog, closeDialog] = useDialog();
  const {id: myID} = useSignedInUser();


  // idは一旦仮で固定、ログインユーザーを実装した時に対応する
  const otherUsers = useMemo(() => REGISTERED_USERS.filter((user) => user.id !== myID), [myID]);

  const handleCreateGroupChat = useCallback(
    async (title: string, userIds: string[]) => {
      const createGroupChatResponse = await createGroupChat({
        variables: {
          input: {
            name: title,
            executorId: myID,
          },
        },
      });

      const newGroupChatId = createGroupChatResponse.data?.createGroupChat.groupChatId;
      if (!newGroupChatId) {
        return;
      }

      const addMemberPromise = userIds.map((userID) =>
        addMember({
          variables: {
            input: {
              executorId: myID,
              groupChatId: newGroupChatId,
              role: "member",
              userAccountId: userID,
            },
          },
        })
      );

      await Promise.all(addMemberPromise);
    },
    [addMember, createGroupChat, myID]
  );

  return (
    <>
      <TextButton buttonType="primary" text="グループチャットを作成する" onClick={openDialog} />
      <Dialog>
        <CreateGroupChat users={otherUsers} onCreate={handleCreateGroupChat} onClose={closeDialog} />
      </Dialog>
    </>
  );
};
