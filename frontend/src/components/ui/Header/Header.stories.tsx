import type { Meta, StoryObj } from '@storybook/react-vite';
import { Header } from './Header';
import { BrowserRouter } from 'react-router-dom';
import { headerOptions } from '@/components/ui/option';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'UI/Header',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: headerOptions,
    onLogout: () => alert('ログアウトしました'),
    onLogDownload: () => alert('ログをダウンロードします'),
    loading: false,
    passwordUpdateRequired: false,
    isAdmin: true,
    menuOpen: false,
    onToggleMenu: () => alert('メニューを切り替えます'),
  },
};

export const PasswordUpdateRequired: Story = {
  args: {
    ...Default.args,
    passwordUpdateRequired: true,
  },
};
