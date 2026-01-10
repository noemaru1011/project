import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './Accordion';
import { Mail, Info, Settings } from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'UI/Accordion',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  {
    id: '1',
    title: 'アカウント設定',
    children: 'アカウントの基本設定を変更できます。',
    icon: <Settings size={20} />,
  },
  {
    id: '2',
    title: '通知設定',
    children: 'メールやプッシュ通知の設定を行います。',
    icon: <Mail size={20} />,
    badge: 'New',
  },
  {
    id: '3',
    title: 'ヘルプとサポート',
    children: 'よくある質問やサポートへの問い合わせはこちらです。',
    icon: <Info size={20} />,
  },
];

export const Default: Story = {
  args: {
    items: mockItems,
  },
};

export const AllowMultiple: Story = {
  args: {
    items: mockItems,
    allowMultiple: true,
  },
};

export const DefaultOpen: Story = {
  args: {
    items: [
      ...mockItems.slice(0, 1).map((item) => ({ ...item, defaultOpen: true })),
      ...mockItems.slice(1),
    ],
  },
};
