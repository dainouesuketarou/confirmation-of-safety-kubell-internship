import type { Meta, StoryObj } from "@storybook/react";

import { GroupChatsContainer } from ".";
import { mockEmptyGetGroupChats, mockErrorGetGroupChats, mockSuccessGetGroupChats } from "./apis/mockGetGroupChats";

export default {
  title: "features/GroupChatsContainer",
  component: GroupChatsContainer,
} satisfies Meta<typeof GroupChatsContainer>;

type Story = StoryObj<typeof GroupChatsContainer>;

export const SeveralGroupChats: Story = {
  parameters: {
    msw: {
      handlers: mockSuccessGetGroupChats,
    },
  },
};

export const NoGroupChats: Story = {
  parameters: {
    msw: {
      handlers: mockEmptyGetGroupChats,
    },
  },
};

export const ErrorFetchingGroupChats: Story = {
  parameters: {
    msw: {
      handlers: mockErrorGetGroupChats,
    },
  },
};
