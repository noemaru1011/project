import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { HeaderHome } from '@/components/ui/Header/HeaderHome';
import type { HeaderOption } from '@/components/ui/option';

const meta: Meta<typeof Header> = {
  title: 'UI/Header',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Header>;

// サンプルオプション
const mainOption = { value: '/*', label: 'メインページへ' };
const navOptions: HeaderOption[] = [
  { kind: 'link', to: '/*', label: '事故一覧' },
  { kind: 'link', to: '/*', label: 'パスワード変更' },
  { kind: 'link', to: '/*', label: 'ログアウト' },
];

// ------------------------
// HeaderHome Story
// ------------------------
export const MainLink: Story = {
  render: () => (
    <MemoryRouter>
      <HeaderHome to={mainOption.value} label={mainOption.label} />
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
        <HeaderNav passwordUpdateRequired={true} options={navOptions} onLogout={handleLogout} />
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
