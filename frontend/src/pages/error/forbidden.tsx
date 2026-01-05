import { useNavigate } from 'react-router-dom';
import { ErrorLayout } from '@/components/layouts/ErrorLayout';
import { ROUTES } from '@/routes/routes';

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <ErrorLayout type="403" onGoHome={() => navigate(ROUTES.HOME)} onGoBack={() => navigate(-1)} />
  );
};
