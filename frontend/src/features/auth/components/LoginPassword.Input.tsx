import { useState } from 'react';
import { Input } from '@/components/ui/Input/Input';
import { Lock, Eye, EyeOff } from 'lucide-react';

type Props = Omit<
  React.ComponentProps<typeof Input>,
  'type' | 'id' | 'label' | 'leftIcon' | 'rightIcon'
>;

export const LoginPasswordInput = ({ ...rest }: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Input
      {...rest}
      id="password"
      label="パスワード"
      type={showPassword ? 'text' : 'password'}
      leftIcon={<Lock className="size-5 text-indigo-500" />}
      rightIcon={
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="pointer-events-auto hover:text-indigo-600 transition-colors"
          tabIndex={-1}
          aria-label="パスワードの表示/非表示"
        >
          {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
        </button>
      }
    />
  );
};
