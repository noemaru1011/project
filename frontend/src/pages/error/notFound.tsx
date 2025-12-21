import { useNavigate } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { ErrorLayout } from '@/components/layouts/ErrorLayout';
import { ROUTES } from '@/constants/routes';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      code="404"
      message="お探しのページが見つかりません。"
      icon={<AlertTriangle className="w-16 h-16 text-purple-600" strokeWidth={1.5} />}
      onButtonClick={() => navigate(ROUTES.HOME)}
      bgFrom="purple-50"
      bgVia="white"
      bgTo="purple-100"
    />
  );
};
