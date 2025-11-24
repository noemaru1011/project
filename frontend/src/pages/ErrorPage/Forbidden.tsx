import { Button } from '@/components/atoms/Button';
import { ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

export const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-6xl font-bold mb-4">403</h1>
      <p className="text-xl mb-6">アクセス権限がありません。</p>
      <Button type="button" variant="Home" onClick={() => navigate(ROUTES.HOME)} />
    </div>
  );
};
