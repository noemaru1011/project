import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Textarea from "./Textarea";

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: "Elements/Textarea",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || "");
    return (
      <Textarea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const textarea: Story = {
  ...Template,
  args: {
    id: "textarea",
    label: "備考欄",
  },
};

export const disabeldTaxtarea: Story = {
  ...Template,
  args: {
    id: "disabledTextarea",
    label: "備考欄参照",
    disabled: true,
  },
};
