import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { HeaderMain } from '@/components/ui/Header/HeaderMain';
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
