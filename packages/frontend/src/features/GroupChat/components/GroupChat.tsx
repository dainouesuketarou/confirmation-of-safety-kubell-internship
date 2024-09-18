import { useFragment } from "__generated__/query";
import { useMemo } from "react";
import styled from "styled-components";
import { gutterBy } from "styles/spaces";
import { FONTSIZE_HEADER, FONTWEIGHT_IMPORTANT } from "styles/typography";
import { Message } from "./Message";
import { MessageForm } from "./MessageForm";
import type {
  MaskedGroupChat,
  MaskedGroupChatMessages,
} from "./groupChatFragment.query";
import {
  GroupChatFragment,
  GroupChatMessagesFragment,
} from "./groupChatFragment.query";

// import { AnswerProvider } from "local-service/answer/AnswerProvider";

interface Props {
  groupChatFragment: MaskedGroupChat;
  getMessagesFragment: MaskedGroupChatMessages[];
  onPostMessage: (message: string) => Promise<void>;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const GroupChatTitle = styled.h2`
  font-size: ${FONTSIZE_HEADER};
  font-weight: ${FONTWEIGHT_IMPORTANT};
  padding: ${gutterBy(3)} 0;
`
const MessagesContainer = styled.div`
  overflow-y: auto;
`

const MessageFormWrapper = styled.div`
  margin-top: auto;
  padding: ${gutterBy(2)} 0;
`;

const useGetMessagesFragment = (getMessagesFragment: MaskedGroupChatMessages) =>
  useFragment(GroupChatMessagesFragment, getMessagesFragment);



export const GroupChat = ({
  groupChatFragment,
  getMessagesFragment,
  onPostMessage
}: Props) => {
  const groupChat = useFragment(GroupChatFragment, groupChatFragment);
  const messages = useMemo(
    () => getMessagesFragment.map(useGetMessagesFragment),
    [getMessagesFragment]
  );


  return (
    <Container>
      <GroupChatTitle>{groupChat.name}</GroupChatTitle>
      <MessagesContainer>
        {messages.map((message, index) => (
          
            <Message key={message.id} message={message} onPostMessage={onPostMessage} hiddenButton={index == messages.length - 1 ? messages.length == 6 ? true : false : true} botOn={index % 2 == 0 ? true : false} />
          
        ))}
      </MessagesContainer>
      {groupChat.name != "安否確認ボット"&&(
      <MessageFormWrapper>
        <MessageForm onPostMessage={onPostMessage} />
      </MessageFormWrapper>
      )
    }
    </Container>
  );
};
