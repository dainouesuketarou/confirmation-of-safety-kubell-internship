import { graphql, HttpResponse } from "msw";
import {
  GroupChatFragmentFragmentDoc,
  type GetGroupChatWithMessagesQueryQuery,
  GroupChatMessagesFragmentFragmentDoc,
} from "../../../__generated__/query/graphql";
import { makeFragmentData } from "__generated__/query";

export const mockSuccessGetGroupChatWithMessages = [
  graphql.query<GetGroupChatWithMessagesQueryQuery>(
    "GetGroupChatWithMessagesQuery",
    () => {
      return HttpResponse.json({
        data: {
          getGroupChat: {
            __typename: "GroupChatOutput",
            ...makeFragmentData(
              {
                id: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Z",
                name: "Group Chat 1",
              },
              GroupChatFragmentFragmentDoc
            ),
          },
          getMessages: [
            {
              __typename: "MessageOutput",
              ...makeFragmentData(
                {
                  id: "Message-01H42K4ABWQ5V2XQEP3A48VE0Z",
                  groupChatId: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Z",
                  text: "Hello",
                  createdAt: "2021-07-01T00:00:00Z",
                  updatedAt: "2021-07-01T00:00:00Z",
                  userAccountId: "UserAccount-01H42K4ABWQ5V2XQEP3A48VE0Z",
                },
                GroupChatMessagesFragmentFragmentDoc
              ),
            },
            {
              __typename: "MessageOutput",
              ...makeFragmentData(
                {
                  id: "Message-01H42K4ABWQ5V2XQEP3A48VE0Y",
                  groupChatId: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Z",
                  text: "Hello",
                  createdAt: "2021-07-01T00:00:00Z",
                  updatedAt: "2021-07-01T00:00:00Z",
                  userAccountId: "UserAccount-01H42K4ABWQ5V2XQEP3A48VE0",
                },
                GroupChatMessagesFragmentFragmentDoc
              ),
            },
          ],
        },
      });
    }
  ),
];
