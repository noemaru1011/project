import { Button } from '@/components/ui/Button/Button';
import type { ButtonVariant } from '@/components/ui/Button/ButtonVariant';
import { useNavigate } from 'react-router-dom';

export type Action = 'Update' | 'Read' | 'Delete';

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
        const pathFn = routeMap[action];
        if (!pathFn) return null;

        const variant: ButtonVariant =
          action === 'Update' ? 'Primary' : action === 'Read' ? 'Secondary' : 'Danger';
        const label = action === 'Update' ? '更新' : action === 'Read' ? '参照' : '削除';

        return (
          <Button
            key={action}
            type="button"
            variant={variant}
            label={label}
            onClick={() => navigate(pathFn(rowKey))}
          />
        );
      })}
    </div>
  );
};
