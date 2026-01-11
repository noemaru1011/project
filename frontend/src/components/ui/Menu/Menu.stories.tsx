import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'UI/Menu',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// ------------------------
// Menu Story
// ------------------------
export const defaultMenu: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <MemoryRouter>
        {' '}
        <Menu open={open} onClick={() => setOpen((prev) => !prev)} />
      </MemoryRouter>
    );
  },
};
