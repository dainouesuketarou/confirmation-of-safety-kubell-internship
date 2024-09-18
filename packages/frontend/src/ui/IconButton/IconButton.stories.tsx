import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from '.';

export default {
  title: 'ui/IconButton',
  component: IconButton,
  args: {
    icon: 'circle-cross',
  }
} satisfies Meta<typeof IconButton>;

type Story = StoryObj<typeof IconButton>;

export const Primary: Story = {
  args: {
    buttonType: 'primary',
  }
}

export const Default: Story = {
  args: {
    buttonType: 'default',
  }
}

export const Danger: Story = {
  args: {
    buttonType: 'danger',
  }
}

export const None: Story = {
  args: {
    buttonType: 'none',
  }
}
