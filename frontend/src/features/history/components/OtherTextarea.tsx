import { Textarea } from '@/components/ui/Textarea/Textarea';
import type { Props } from '@/components/ui/Textarea/Textarea';

type OtherTextareaProps = Omit<Props, 'id'> & { disabled?: boolean };

export const OtherTextarea = ({ disabled, ...props }: OtherTextareaProps) => {
  return <Textarea {...props} id="other" helperText="例 「於:〇〇病院」" disabled={disabled} />;
};
