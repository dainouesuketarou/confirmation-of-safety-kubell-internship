import type { Meta, StoryObj } from "@storybook/react";

import { mockSuccessGetGroupChatWithMessages } from "./apis/mockGetGroupChatWithMessage";
import { GroupChatContainer } from "./GroupChatContainer";

export default {
  title: "features/GroupChatContainer",
  component: GroupChatContainer,
} satisfies Meta<typeof GroupChatContainer>;

type Story = StoryObj<typeof GroupChatContainer>;

export const SeveralMessages: Story = {
  parameters: {
    msw: {
      handlers: mockSuccessGetGroupChatWithMessages,
    },
  },
};
