import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/atoms/Button';
import { ROUTES } from '@/constants/routes';

export const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">お探しのページが見つかりません。</p>

      <Button type="button" variant="Home" onClick={() => navigate(ROUTES.HOME)} />
    </div>
  );
};
