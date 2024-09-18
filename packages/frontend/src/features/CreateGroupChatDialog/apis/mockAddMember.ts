import type { AddMemberMutationMutation } from "__generated__/command/graphql";
import { graphql, HttpResponse } from "msw";

export const mockSuccessAddMember = [
  graphql.mutation<AddMemberMutationMutation>("AddMemberMutation", () => {
    return HttpResponse.json({
      data: {
        addMember: {
          groupChatId: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Z",
        },
      },
    });
  }),
];
