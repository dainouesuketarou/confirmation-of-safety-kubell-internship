import { useQuery } from "@apollo/client";

import { useSignedInUser } from "local-service/auth/hooks";
import { GetGroupChatsQuery } from "./apis/getGroupChats.query";
import { GroupChats } from "./components/GroupChats";

interface Props {
  handleChangeGroupChat: (groupChatId: string) => void;
}

export const GroupChatsContainer = ({ handleChangeGroupChat }: Props) => {
  const {id: myID} = useSignedInUser();

  const { data, loading, error, refetch } = useQuery(GetGroupChatsQuery, {
    variables: { accountId: myID },
  });

  const handleUpdate = () => refetch();

  if (error) return <p>Error Happened</p>;

  if (loading || data?.getGroupChats === undefined) return <></>;

  return (
    <GroupChats
      groupChatsFragment={data.getGroupChats}
      onUpdate={handleUpdate}
      onChangeGroupChat={handleChangeGroupChat}
    />
  );
};
