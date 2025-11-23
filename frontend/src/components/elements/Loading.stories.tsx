import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loading } from './Loading';

const meta: Meta<typeof Loading> = {
  component: Loading,
  title: 'Elements/Loading',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const defaultLoading: Story = {
  args: {
    loading: true,
  },
};
