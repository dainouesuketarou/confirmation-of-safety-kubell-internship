import { gql, FragmentType } from "__generated__/query";

export const GroupChatFragment = gql(`
  fragment GroupChatFragment on GroupChatOutput {
    id
    name
  }
`);

export type MaskedGroupChat = FragmentType<typeof GroupChatFragment>;

export const GroupChatMessagesFragment = gql(`
  fragment GroupChatMessagesFragment on MessageOutput {
    id
    groupChatId
    text
    createdAt
    updatedAt
    userAccountId
  }
`);

export type MaskedGroupChatMessages = FragmentType<typeof GroupChatMessagesFragment>;
