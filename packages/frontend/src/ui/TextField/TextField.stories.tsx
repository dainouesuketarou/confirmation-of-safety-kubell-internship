import type { Meta, StoryObj } from '@storybook/react';

import { TextField } from '.';

export default {
  title: 'ui/TextField',
  component: TextField,
  args: {
    placeholder: 'Type here',
  }
} satisfies Meta<typeof TextField>;

type Story = StoryObj<typeof TextField>;

export const SecretSingleLine: Story = {
  args: {
    line: 'single',
    texttype: 'secret',
  }
}

export const SecretMultiLine: Story = {
  args: {
    line: 'multi',
    texttype: 'secret',
  }
}

export const PlainSingleLine: Story = {
  args: {
    line: 'single',
    texttype: 'plain',
  }
}

export const PlainMultiLine: Story = {
  args: {
    line: 'multi',
    texttype: 'plain',
  }
}
