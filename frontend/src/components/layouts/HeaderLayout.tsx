import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Header } from '@/components/ui/Header/Header';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { ROUTES } from '@/routes/routes';
import { headerOptions } from '@/components/ui/option';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/authContext';
import { handleApiErrorWithUI } from '@/utils';

export const HeaderLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setRole, role } = useAuth();
  const { setPasswordUpdateRequired, passwordUpdateRequired } = usePasswordUpdateContext();

  const { logout, loading: logouting } = useLogout();

  const isAdmin = role === 'ADMIN';
  const isStudent = role === 'STUDENT';
  const [open, setOpen] = useState(false);

  // --- ハンドラ: ログアウト ---
  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (res) => {
        setRole(null);
        setPasswordUpdateRequired(false);
        localStorage.clear();
        queryClient.clear();
        toast.success(res.message);
        navigate(ROUTES.AUTH.LOGIN);
      },
      onError: (err) => handleApiErrorWithUI(err, navigate),
    });
  };

  const options = headerOptions.map((opt) => {
    if (opt.kind === 'link' && opt.to === ROUTES.AUTH.PASSWORD_CHANGE) {
      return { ...opt, visible: isStudent };
    }
    return { ...opt, visible: true };
  });

  return (
    <Header
      options={options}
      onLogout={handleLogout}
      loading={logouting}
      passwordUpdateRequired={passwordUpdateRequired}
      isAdmin={isAdmin}
      menuOpen={open}
      onToggleMenu={() => setOpen(!open)}
    />
  );
};
