import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Lock, Eye, EyeOff } from 'lucide-react';
import type { Props } from '@/components/atoms/Input';

type PasswordInputProps = Omit<Props, 'required' | 'type'>;
const [showPassword, setShowPassword] = useState(false);

export const PasswordInput = ({ disabled, ...props }: PasswordInputProps) => {
  return (
    <Input
      {...props}
      required
      type={showPassword ? 'text' : 'password'}
      leftIcon={<Lock className="size-5 text-indigo-500" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="pointer-events-auto hover:text-indigo-600 transition-colors"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      }
    />
  );
};
