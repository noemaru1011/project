import { useNavigate } from 'react-router-dom';
import { ErrorLayout } from '@/components/layouts/ErrorLayout';
import { ROUTES } from '@/constants/routes';

export const ServerError = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout
      type="500"
      onGoHome={() => navigate(ROUTES.HOME)}
      onGoBack={() => navigate(-1)}
      onRetry={() => window.location.reload()}
    />
  );
};
