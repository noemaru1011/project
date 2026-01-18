import { Button } from '@/components/ui/Button/Button';
import type { ButtonVariant } from '@/components/ui/Button/ButtonVariants';
import { useNavigate } from 'react-router-dom';

export type Action = Extract<ButtonVariant, 'Update' | 'Read' | 'Delete'>;

type Props = {
  rowKey: string;
  actions?: Action[];
  routeMap?: Partial<Record<Action, (id: string) => string>>;
};

export const RowActions = ({ rowKey, actions = [], routeMap = {} }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {actions.map((action) => {
        const path = routeMap[action];
        if (!path) return null;
        return (
          <Button
            type="button"
            key={action}
            variant={action == 'Update' ? 'Primary' : action === 'Read' ? 'Secondary' : 'Danger'}
            label={action === 'Update' ? '更新' : action === 'Read' ? '参照' : '削除'}
            onClick={() => navigate(path(rowKey))}
          />
        );
      })}
    </div>
  );
};
