import { Input } from '@/components/ui/Input/Input';
import { Mail } from 'lucide-react';

type Props = Omit<React.ComponentProps<typeof Input>, 'id' | 'type' | 'label' | 'leftIcon'>;

export const LoginEmailInput = ({ ...rest }: Props) => {
  return (
    <Input
      {...rest}
      type="mail"
      id="mail"
      label="メールアドレス"
      leftIcon={<Mail className="size-5 text-indigo-500" />}
      //新規作成、更新用でヘルパーテキストを分ける
      //helperText="メールアドレスは重複しないように"
      //helperText="メールアドレスは変更できません"
    />
  );
};
