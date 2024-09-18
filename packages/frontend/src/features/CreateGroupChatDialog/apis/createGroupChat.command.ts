import { gql } from "__generated__/command";

export const CreateGroupChatMutation = gql(`
  mutation CreateGroupChatDialogContainerCreateGroupChatMutation($input: CreateGroupChatInput!) {
    createGroupChat(input: $input) {
      groupChatId
    }
  }
`);
