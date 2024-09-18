import { gql } from "__generated__/query";

export const GetGroupChatsQuery = gql(`
  query GetGroupChatsQuery($accountId: String!) {
    getGroupChats(userAccountId: $accountId) {
      ...GroupChatsFragment
    }
  }
`);
