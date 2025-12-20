import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { HeaderNav } from '@/components/atoms/HeaderNav';
import { HeaderMain } from '@/components/atoms/HeaderMain';
import type { Option } from '@/components/ui/option';

const meta: Meta<typeof Header> = {
  title: 'organisms/Header',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

// サンプルオプション
const mainOption = { value: '/', label: 'メインページへ' };
const navOptions: Option[] = [
  { value: '/history', label: '事故一覧' },
  { value: '/change-password', label: 'パスワード変更' },
  { value: 'LOGOUT', label: 'ログアウト' },
];

// ------------------------
// HeaderMain Story
// ------------------------
export const MainLink: Story = {
  render: () => (
    <MemoryRouter>
      <HeaderMain to={mainOption.value} label={mainOption.label} />
    </MemoryRouter>
  ),
};

// ------------------------
// HeaderNav Story
// ------------------------
export const NavLinks: Story = {
  render: () => {
    const handleLogout = async () => alert('Logout called!');
    return (
      <MemoryRouter>
        <HeaderNav options={navOptions} onLogout={handleLogout} />
      </MemoryRouter>
    );
  },
};

// ------------------------
// Full Header Story
// ------------------------
export const FullHeader: Story = {
  render: () => {
    return (
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
  },
};
