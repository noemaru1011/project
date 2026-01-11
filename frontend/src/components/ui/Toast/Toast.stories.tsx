import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast } from './Toast';
import { toast } from 'react-toastify';
import { Button } from '../Button/Button';

const meta: Meta<typeof Toast> = {
  component: Toast,
  title: 'UI/Toast',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div>
      <div className="flex gap-2 mb-4">
        <Button
          variant="Create"
          type="button"
          onClick={() => toast.success('成功メッセージです')}
        />

        <Button
          variant="Delete"
          type="button"
          onClick={() => toast.error('エラーメッセージです')}
        />

        <Button variant="Search" type="button" onClick={() => toast.info('情報メッセージです')} />
      </div>
      <Toast />
    </div>
  ),
};
