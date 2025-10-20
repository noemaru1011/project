import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Input from "./Input";

//props毎にテスト

describe("Input component", () => {
  it("labelは表示されるか", () => {
    render(
      <Input
        id="labelTest"
        type="text"
        value=""
        onChange={() => {}}
        label="ラベル"
      />
    );
    expect(screen.getByText("ラベル")).toBeInTheDocument();
    expect(screen.getByLabelText("ラベル")).toBeInTheDocument();
  });

  it("labelは表示されないか", () => {
    render(<Input id="noLabelTest" type="text" value="" onChange={() => {}} />);
    expect(
      screen.queryByText("ラベルは存在しないのでnullを返します")
    ).not.toBeInTheDocument();
  });

  it("初期値の制御はできるか", () => {
    render(
      <Input
        id="defaultValueTest"
        type="text"
        value="HelloWorld"
        onChange={() => {}}
      />
    );
    expect(screen.getByDisplayValue("HelloWorld")).toBeInTheDocument();
  });

  it("onChangeイベントが発火するか", () => {
    const handleChange = vi.fn();
    render(<Input id="input" type="text" value="" onChange={handleChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "テスト" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("errorは表示されるか", () => {
    render(
      <Input
        id="errorTest"
        type="text"
        value=""
        onChange={() => {}}
        error="エラーがあります"
      />
    );
    expect(screen.getByText("エラーがあります")).toBeInTheDocument();
  });

  it("typeが正しく反映されるか", () => {
    render(
      <Input id="typeTest" type="number" value="123" onChange={() => {}} />
    );
    const input = screen.getByDisplayValue("123");
    expect(input).toHaveAttribute("type", "number");
  });

  it("disabledは反映されるか", () => {
    render(
      <Input
        id="disabledTest"
        type="text"
        value="非活性テスト"
        onChange={() => {}}
        disabled
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("disabled時にpostできるか", () => {
    render(
      <Input
        id="disabledTest"
        type="text"
        value="非活性テスト"
        onChange={() => {}}
        disabled
      />
    );
    const hiddenInput = screen.getByRole("textbox", { hidden: true });
    expect(hiddenInput).toBeInTheDocument();
  });

  it("required時に必須マークは表示されるか", () => {
    render(
      <Input
        id="labelTest"
        type="text"
        value=""
        onChange={() => {}}
        required
        label="ラベル"
      />
    );
    expect(screen.getByText("ラベル*")).toBeInTheDocument();
    expect(screen.getByLabelText("ラベル*")).toBeInTheDocument();
  });

  it("スナップショットテスト", () => {
    const { asFragment } = render(
      <Input id="snapshot" type="text" value="abc" onChange={() => {}} />
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
