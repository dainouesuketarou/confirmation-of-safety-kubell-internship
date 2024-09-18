import { gql, FragmentType } from "__generated__/query";

export const GroupChatsFragment = gql(`
  fragment GroupChatsFragment on GroupChatOutput {
    id
    name
  }
`);

export type MaskedGroupChats = FragmentType<typeof GroupChatsFragment>
