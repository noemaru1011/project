import { EmailInput } from '@/components/form/Email.Input';

export type StudentEmailInputProps = {
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
};

export const StudentEmailInput = ({
  required,
  error,
  disabled,
  className,
}: StudentEmailInputProps) => {
  return (
    <EmailInput
      id="mail"
      label="メールアドレス"
      helperText="メールアドレスは重複しないように"
      error={error}
      disabled={disabled}
      required={required}
      className={className}
    />
  );
};
