import { Button } from '@/components/atoms/Button';
import type { ButtonVariant } from '@/interface/ui';
import { useNavigate } from 'react-router-dom';

export type Action = Extract<ButtonVariant, 'Update' | 'Read' | 'Delete'>;

type Props = {
  rowKey: string;
  actions: Action[];
  routeMap: Record<Action, (id: string) => string>;
};

export const RowActions = ({ rowKey, actions, routeMap }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-2">
      {actions.map((action) => (
        <Button key={action} variant={action} onClick={() => navigate(routeMap[action](rowKey))} />
      ))}
    </div>
  );
};
