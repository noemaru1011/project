import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Elements/Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const CreateButton: Story = {
  args: {
    variant: 'Create',
    onClick: () => alert('クリックされました！'),
  },
};
export const ReradButton: Story = {
  args: {
    variant: 'Read',
    onClick: () => alert('クリックされました！'),
  },
};
export const UpdateButton: Story = {
  args: {
    variant: 'Update',
    onClick: () => alert('クリックされました！'),
  },
};
export const DeleteButton: Story = {
  args: {
    variant: 'Delete',
    onClick: () => alert('クリックされました！'),
    disabled: true,
  },
};
export const SearchButton: Story = {
  args: {
    variant: 'Search',
    onClick: () => alert('クリックされました！'),
  },
};

/** ボタン類まとめ */
export const GroupingButton: Story = {
  render: () => (
    <div className="space-x-2">
      <Button variant="Create" onClick={() => alert('クリックされました！')} />
      <Button variant="Read" onClick={() => alert('クリックされました！')} />
      <Button variant="Update" onClick={() => alert('クリックされました！')} />
      <Button variant="Delete" onClick={() => alert('クリックされました！')} />
      <Button variant="Search" onClick={() => alert('クリックされました！')} />
    </div>
  ),
};
