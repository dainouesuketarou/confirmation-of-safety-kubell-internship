import { graphql, HttpResponse } from "msw";
import type { CreateGroupChatDialogContainerCreateGroupChatMutationMutation } from "__generated__/command/graphql";

export const mockSuccessCreateGroupChat = [
  graphql.mutation<CreateGroupChatDialogContainerCreateGroupChatMutationMutation>(
    "CreateGroupChatDialogContainerCreateGroupChatMutation",
    () => {
      return HttpResponse.json({
        data: {
          createGroupChat: {
            groupChatId: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Z",
          },
        },
      });
    }
  ),
];
