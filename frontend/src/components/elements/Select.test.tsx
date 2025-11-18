import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Select from './Select';

const TestOptions = [
  { value: '0', label: 'テスト0' },
  { value: '1', label: 'テスト1' },
];

describe('Select component', () => {
  it('labelは表示されるか', () => {
    render(
      <Select id="labelTest" options={TestOptions} value="" onChange={() => {}} label="ラベル" />,
    );
    expect(screen.getByText('ラベル')).toBeInTheDocument();
  });

  it('labelが表示されない場合', () => {
    render(<Select id="noLabelTest" options={TestOptions} value="" onChange={() => {}} />);
    expect(screen.queryByText('ラベル')).not.toBeInTheDocument();
  });

  it('初期値が反映されるか', () => {
    render(<Select id="defaultValueTest" options={TestOptions} value="0" onChange={() => {}} />);
    expect(screen.getByText('テスト0')).toBeInTheDocument();
  });

  it('onChangeイベントが発火するか', async () => {
    const handleChange = vi.fn();
    render(<Select id="changeTest" options={TestOptions} value="" onChange={handleChange} />);

    // react-select のメニューを開く
    const selectControl = screen
      .getByText('該当する候補がありません', { exact: false })
      .closest('div.react-select-container')!;
    fireEvent.keyDown(selectControl, { key: 'ArrowDown' });
    fireEvent.click(screen.getByText('テスト0'));

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('disabled時に操作できないか', () => {
    render(
      <Select id="disabledTest" options={TestOptions} value="" onChange={() => {}} disabled />,
    );
    // react-select は <input> ではなく div なので role では取れない
    const container = screen
      .getByText('該当する候補がありません', {
        exact: false,
      })
      .closest('.react-select-container');
    expect(container).toHaveClass('react-select__control--is-disabled');
  });

  it('disabled時にhidden inputが存在するか', () => {
    render(
      <Select id="disabledHidden" options={TestOptions} value="0" onChange={() => {}} disabled />,
    );
    const hidden = screen.getByDisplayValue('0');
    expect(hidden).toBeInTheDocument();
  });

  it('スナップショットテスト', () => {
    const { asFragment } = render(
      <Select id="snapshot" options={TestOptions} value="0" onChange={() => {}} />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
