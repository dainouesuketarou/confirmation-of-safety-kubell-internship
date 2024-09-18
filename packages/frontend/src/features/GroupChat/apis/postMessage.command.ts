import { gql } from "__generated__/command";

export const PostMessageMutation = gql(`
  mutation PostMessageMutation($input: PostMessageInput!) {
    postMessage(input: $input) {
      groupChatId
      messageId
    }
  }
`);
