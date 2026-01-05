import { useNavigate } from 'react-router-dom';
import { ErrorLayout } from '@/components/layouts/ErrorLayout';
import { ROUTES } from '@/routes/routes';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout type="404" onGoHome={() => navigate(ROUTES.HOME)} onGoBack={() => navigate(-1)} />
  );
};
