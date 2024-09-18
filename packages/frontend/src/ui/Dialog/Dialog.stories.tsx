import type { Meta, StoryObj } from '@storybook/react';

import { ExampleLayout } from './storybook.layout';

export default {
  title: 'ui/Dialog',
  component: ExampleLayout,
} satisfies Meta<typeof ExampleLayout>;

type Story = StoryObj<typeof ExampleLayout>;

export const Default: Story = {}
