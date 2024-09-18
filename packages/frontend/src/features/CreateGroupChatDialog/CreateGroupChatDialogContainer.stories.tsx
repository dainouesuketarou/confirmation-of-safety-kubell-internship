import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, waitFor, within } from "@storybook/test";

import { CreateGroupChatDialogContainer } from ".";
import { mockSuccessCreateGroupChat } from "./apis/mockCreateGroupChat";
import { mockSuccessAddMember } from "./apis/mockAddMember";

export default {
  title: "features/CreateGroupChatDialogContainer",
  component: CreateGroupChatDialogContainer,
} satisfies Meta<typeof CreateGroupChatDialogContainer>;

type Story = StoryObj<typeof CreateGroupChatDialogContainer>;

export const Default: Story = {};

export const OpenDialog: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole("button", { name: "Open" }));

    await userEvent.click(canvas.getByText("pl01"));
    await userEvent.click(canvas.getByText("pl02"));
  },
};

export const SuccessCreatingGroupChat: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Open" }));

    await waitFor(() => canvas.getByRole("textbox"));
    await userEvent.type(canvas.getByRole("textbox"), "Group Chat 1");
    await userEvent.click(canvas.getByText("pl01"));
    await userEvent.click(canvas.getByText("pl02"));
    await userEvent.click(canvas.getByRole("button", { name: "作成" }));
  },
  parameters: {
    msw: {
      handlers: [...mockSuccessCreateGroupChat, ...mockSuccessAddMember],
    },
  },
};
