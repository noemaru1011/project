// 1. label クリックでチェックボックスが切り替わる
it('label クリックでチェックボックスが切り替わる', async () => {
  await user.click(screen.getByText('同意する'));
  expect(handleChange).toHaveBeenCalledTimes(1);
});

// 2. チェック状態が切り替わる
it('チェック状態が切り替わる', async () => {
  const checkbox = screen.getByRole('checkbox');
  expect(checkbox).not.toBeChecked();
  
  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  
  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
});

// 3. キーボード操作（Space）
it('キーボード操作（Space）でチェックできる', async () => {
  const checkbox = screen.getByRole('checkbox');
  checkbox.focus();
  await user.keyboard(' ');
  expect(handleChange).toHaveBeenCalledTimes(1);
});

// 4. ref 経由で checked 状態を取得
it('ref 経由で checked 状態を取得できる', () => {
  const ref = React.createRef<HTMLInputElement>();
  render(<Checkbox ref={ref} defaultChecked />);
  expect(ref.current?.checked).toBe(true);
});

// 5. select-none スタイル（label のテキスト選択防止）
it('label に select-none が適用される', () => {
  render(<Checkbox label="同意する" />);
  expect(screen.getByText('同意する')).toHaveClass('select-none');
});
