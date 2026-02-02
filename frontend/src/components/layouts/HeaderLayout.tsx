import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Header } from '@/components/ui/Header/Header';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useLogDownload } from '@/features/auth/hooks/useLogDownload';
import { ROUTES } from '@/routes/routes';
import { headerOptions } from '@/components/ui/option';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/authContext';
import { handleApiErrorWithUI, downloadBlob } from '@/utils';

export const HeaderLayout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setRole, role } = useAuth();
  const { setPasswordUpdateRequired, passwordUpdateRequired } = usePasswordUpdateContext();

  const { logout, loading: logouting } = useLogout();
  const { logDownload, loading: downloading } = useLogDownload();

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

  // --- ハンドラ: ログダウンロード ---
  const handleLogDownload = () => {
    logDownload(undefined, {
      onSuccess: (blob) => {
        downloadBlob(blob, 'logs.zip');
        toast.success('ログをダウンロードしました');
      },
      onError: (err) => handleApiErrorWithUI(err, navigate),
    });
  };

  const options = headerOptions.map((opt) => {
    if (opt.kind === 'action' && opt.action === 'logDownload') {
      return { ...opt, visible: isAdmin };
    }
    if (opt.kind === 'link' && opt.to === ROUTES.AUTH.PASSWORD_CHANGE) {
      return { ...opt, visible: isStudent };
    }
    return { ...opt, visible: true };
  });

  return (
    <Header
      options={options}
      onLogout={handleLogout}
      onLogDownload={handleLogDownload}
      loading={logouting || downloading}
      passwordUpdateRequired={passwordUpdateRequired}
      isAdmin={isAdmin}
      menuOpen={open}
      onToggleMenu={() => setOpen(!open)}
    />
  );
};
