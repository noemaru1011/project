import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Atoms/Button',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const createButton: Story = {
  args: {
    variant: 'Create',
    onClick: () => alert('クリックされました！'),
  },
};
export const reradButton: Story = {
  args: {
    variant: 'Read',
    onClick: () => alert('クリックされました！'),
  },
};
export const updateButton: Story = {
  args: {
    variant: 'Update',
    onClick: () => alert('クリックされました！'),
  },
};
export const deleteButton: Story = {
  args: {
    variant: 'Delete',
    onClick: () => alert('クリックされました！'),
    disabled: true,
  },
};
export const searchButton: Story = {
  args: {
    variant: 'Search',
    onClick: () => alert('クリックされました！'),
  },
};
export const loginButton: Story = {
  args: {
    variant: 'Login',
    onClick: () => alert('クリックされました！'),
  },
};
export const returnButton: Story = {
  args: {
    variant: 'Back',
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
      <Button variant="Login" onClick={() => alert('クリックされました！')} />
      <Button variant="Back" onClick={() => alert('クリックされました！')} />
    </div>
  ),
};
