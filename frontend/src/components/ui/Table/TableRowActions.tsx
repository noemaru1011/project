import { Button } from '@/components/ui/Button/Button';
import type { ButtonVariant } from '@/components/ui/Button/ButtonVariant';

export type Action = 'Update' | 'Read' | 'Delete';

type Props = {
  rowKey: string;
  actions?: Action[];
  onAction?: Partial<Record<Action, (id: string) => void>>;
};

const ACTION_SETTINGS: Record<Action, { variant: ButtonVariant; label: string }> = {
  Update: { variant: 'Primary', label: '更新' },
  Read: { variant: 'Secondary', label: '参照' },
  Delete: { variant: 'Danger', label: '削除' },
};

export const RowActions = ({ rowKey, actions = [], onAction = {} }: Props) => {
  return (
    <div className="flex gap-2">
      {actions.map((action) => {
        const handler = onAction[action];
        if (!handler) return null;

        const { variant, label } = ACTION_SETTINGS[action];

        return (
          <Button
            key={action}
            type="button"
            variant={variant}
            label={label}
            onClick={() => handler(rowKey)}
          />
        );
      })}
    </div>
  );
};
