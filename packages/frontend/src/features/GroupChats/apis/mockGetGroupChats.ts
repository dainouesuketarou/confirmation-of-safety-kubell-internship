import { graphql, HttpResponse } from "msw";
import { GroupChatsFragmentFragmentDoc, type GetGroupChatsQueryQuery } from "__generated__/query/graphql";
import { makeFragmentData } from "__generated__/query";

export const mockSuccessGetGroupChats = [
  graphql.query<GetGroupChatsQueryQuery>("GetGroupChatsQuery", () => {
    return HttpResponse.json({
      data: {
        getGroupChats: [
          {
            __typename: "GroupChatOutput",
            ...makeFragmentData({
              id: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Z",
              name: "Group Chat 1",
            }, GroupChatsFragmentFragmentDoc),
          },
          {
            __typename: "GroupChatOutput",
            ...makeFragmentData({
              id: "GroupChat-01H42K4ABWQ5V2XQEP3A48VE0Y",
              name: "Group Chat 2",
            }, GroupChatsFragmentFragmentDoc),
          },
        ],
      },
    });
  })
]

export const mockEmptyGetGroupChats = [
  graphql.query<GetGroupChatsQueryQuery>("GetGroupChatsQuery", () => {
    return HttpResponse.json({
      data: {
        getGroupChats: [],
      },
    });
  })
]

export const mockErrorGetGroupChats = [
  graphql.query<GetGroupChatsQueryQuery>("GetGroupChatsQuery", () => {
    return HttpResponse.json({
      errors: [{ message: "Error happened" }],
    })
  })
]
