import { gql } from "__generated__/query";

export const GetGroupChatWithMessagesQuery = gql(`
  query GetGroupChatWithMessagesQuery($groupChatId: String!, $userAccountId: String!) {
    getGroupChat(groupChatId: $groupChatId, userAccountId: $userAccountId) {
      ...GroupChatFragment
    }
    getMessages(groupChatId: $groupChatId, userAccountId: $userAccountId) {
      ...GroupChatMessagesFragment
    }
  }
`);
