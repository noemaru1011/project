import ReactSelect from "react-select";
import type { SingleValue } from "react-select";
import type { Option } from "@/types/ui";

type Props = {
  id: string;
  label?: string;
  options: Option[];
  value: string;
  disabled?: boolean;
  onChange: (value: Option | null) => void;
  error?: string;
};

const Select = ({
  id,
  label,
  value,
  options,
  disabled,
  onChange,
  error,
}: Props) => {
  const selected = options.find((opt) => opt.value === value) ?? null;

  const handleChange = (newValue: SingleValue<Option>) => {
    onChange(newValue ?? null);
  };

  return (
    <div className="flex flex-col space-y-1">
      {label && (
        <label htmlFor={id} className="font-bold text-gray-700">
          {label}
        </label>
      )}
      <ReactSelect
        inputId={id}
        value={selected}
        onChange={handleChange}
        options={options}
        className="react-select-container"
        classNamePrefix="react-select"
        noOptionsMessage={() => "該当する候補がありません"}
        placeholder=""
        isClearable
        isSearchable
        isDisabled={disabled}
      />
      {error && <p className="text-red-500 text-sm ml-1">{error}</p>}
      {disabled && selected && (
        <input type="hidden" id={id} value={selected.value} />
      )}
    </div>
  );
};

export default Select;
