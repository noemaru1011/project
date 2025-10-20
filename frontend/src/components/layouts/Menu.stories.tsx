import type { Meta, StoryObj } from "@storybook/react-vite";
import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  component: Menu,
  title: "layouts/Menu",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultMenu: Story = {
  args: {},
};
