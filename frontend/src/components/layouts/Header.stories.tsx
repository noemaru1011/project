import type { Meta, StoryObj } from '@storybook/react-vite';
import Header from './Header';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'layouts/Header',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultHeader: Story = {
  args: {},
};
