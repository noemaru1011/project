import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import Input from "./Input";

const meta: Meta<typeof Input> = {
  component: Input,
  title: "Elements/Input",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value || "");
    return (
      <Input
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const textInput: Story = {
  ...Template,
  args: {
    id: "textInput",
    label: "テキスト",
    type: "text",
  },
};

export const requiredInput: Story = {
  ...Template,
  args: {
    id: "requiredInput",
    type: "password",
    label: "パスワード",
    required: true,
  },
};

export const noLabelInput: Story = {
  ...Template,
  args: {
    id: "noLabelInput",
    type: "text",
  },
};

export const disabeledInput: Story = {
  ...Template,
  args: {
    id: "disabeledInput",
    label: "非活性テキスト",
    type: "text",
    disabled: true,
  },
};
