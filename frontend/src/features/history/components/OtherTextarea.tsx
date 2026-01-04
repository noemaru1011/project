import { Textarea } from '@/components/ui/Textarea/Textarea';

type Props = Omit<React.ComponentProps<typeof Textarea>, 'id' | 'label' | 'helperText'>;

export const OtherTextarea = ({ ...rest }: Props) => {
  return <Textarea {...rest} id="other" label="備考欄" helperText="例 「於:〇〇病院」" />;
};
