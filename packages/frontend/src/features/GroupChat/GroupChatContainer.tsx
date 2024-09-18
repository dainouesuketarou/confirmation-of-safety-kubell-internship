import { useMutation, useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";

import { useSignedInUser } from "local-service/auth/hooks";
import { GetGroupChatWithMessagesQuery } from "./apis/getGroupChatWithMessages.query";
import { PostMessageMutation } from "./apis/postMessage.command";
import { EmptyGroupChat } from "./components/EmptyGroupChat";
import { GroupChat } from "./components/GroupChat";

interface Props {
  groupChatId: string;
}
export const GroupChatContainer = ({ groupChatId }: Props) => {
  const {id: myID} = useSignedInUser();

  const { data, loading, refetch } = useQuery(GetGroupChatWithMessagesQuery, {
    variables: {
      groupChatId,
      userAccountId: myID,
    },
  });
  const [postMessage] = useMutation(PostMessageMutation, {
    context: { clientName: "command" },
  });

  // 本来はGraphQLのsubscriptionなどでメッセージの変更を取得するべき
  // see: https://www.apollographql.com/docs/react/data/subscriptions/
  // 今回は簡易実装なので、2秒間隔のポーリングで変更を取得する
  useEffect(() => {
    const timer = globalThis.setInterval(refetch, 2000);
    return () => globalThis.clearInterval(timer);
  }, [refetch]);

  const handlePostMessage = useCallback(async (message: string) => {
    await postMessage({
      variables: {
        input: {
          groupChatId,
          executorId: myID,
          content: message,
        },
      },
    });
  }, [groupChatId, postMessage, myID]);

  if (groupChatId === "") return <EmptyGroupChat />;
  if (loading || data === undefined) return <></>;

  return (
    <GroupChat
      groupChatFragment={data.getGroupChat}
      getMessagesFragment={data.getMessages}
      onPostMessage={handlePostMessage}
    />
  );
};
