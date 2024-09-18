import type { Meta, StoryObj } from '@storybook/react';

import { CheckBox } from './';

export default {
  title: 'ui/CheckBox',
  component: CheckBox,
  args: {
    label: 'Check me',
  }
} satisfies Meta<typeof CheckBox>;

type Story = StoryObj<typeof CheckBox>;

export const Primary: Story = {}
