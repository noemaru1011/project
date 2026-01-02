import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MenuOptions } from '@/components/ui/option';
import { Menu } from './Menu';
import { MenuToggle } from '@/components/ui/Menu/MenuToggle';
import { MenuOverlay } from '@/components/ui/Menu/MenuOverlay';
import { MenuPanel } from '@/components/ui/Menu/MenuPanel';

const meta: Meta<typeof Menu> = {
  title: 'UI/Menu',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

// ------------------------
// MenuToggle Story
// ------------------------
export const Toggle: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <div className="p-4">
        <MenuToggle open={open} onClick={() => setOpen((prev) => !prev)} />
        <p>Menu is {open ? 'Open' : 'Closed'}</p>
      </div>
    );
  },
};

// ------------------------
// MenuOverlay Story
// ------------------------
export const Overlay: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div className="relative">
        {open && <MenuOverlay onClick={() => setOpen(false)} />}
        <p className="absolute top-4 left-4 z-10 text-white">Overlay Example</p>
      </div>
    );
  },
};

// ------------------------
// MenuPanel Story
// ------------------------
export const Panel: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <MemoryRouter>
        {' '}
        <div className="relative">
          {open && <MenuPanel options={MenuOptions} onClick={() => setOpen(false)} />}
        </div>
      </MemoryRouter>
    );
  },
};

// ------------------------
// Full Menu Story
// ------------------------
export const FullMenu: Story = {
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
