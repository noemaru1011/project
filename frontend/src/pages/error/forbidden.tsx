import { useNavigate } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { ErrorLayout } from '@/components/layouts/ErrorLayout';
import { ROUTES } from '@/constants/routes';

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      code="403"
      message="アクセス権限がありません。"
      icon={<ShieldAlert className="w-16 h-16 text-orange-500" strokeWidth={1.5} />}
      onButtonClick={() => navigate(ROUTES.HOME)}
      bgFrom="orange-50"
      bgVia="white"
      bgTo="orange-100"
    />
  );
};
