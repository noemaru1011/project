import type { Meta, StoryObj } from "@storybook/react-vite";
import Select from "./Select";
import React from "react";
import type { Option } from "@/types/ui";

const sampleOptions: Option[] = [
  { value: "1", label: "サンプル1" },
  { value: "2", label: "サンプル2" },
  { value: "3", label: "サンプル3" },
  { value: "4", label: "サンプル4" },
];
const meta: Meta<typeof Select> = {
  component: Select,
  title: "Elements/Select",
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

const Template: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? "");
    return (
      <Select
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const DefaultSelect: Story = {
  ...Template,
  args: {
    id: "sample",
    label: "サンプルリストボックス",
    options: sampleOptions,
    value: "1",
  },
};

export const DisabledSelect: Story = {
  ...Template,
  args: {
    id: "disabledSample",
    label: "サンプルリストボックス",
    options: sampleOptions,
    value: "3",
    disabled: true,
  },
};
