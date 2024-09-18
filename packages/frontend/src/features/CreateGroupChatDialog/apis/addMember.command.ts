import { gql } from "__generated__/command";

export const AddMemberMutation = gql(`
  mutation AddMemberMutation($input: AddMemberInput!) {
    addMember(input: $input) {
      groupChatId
    }
  }
`);
