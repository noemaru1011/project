import { toast } from 'react-toastify';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/ui/Header/Header';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useLogDownload } from '@/features/auth/hooks/useLogDownload';
import { ROUTES } from '@/routes/routes';
import { headerOptions } from '@/components/ui/option';
import { handleApiErrorWithUI, downloadBlob } from '@/utils';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/authContext';

export const HeaderLayout = () => {
  const navigate = useNavigate();
  const { logout, loading: logouting } = useLogout();
  const { logDownload, loading: downloading } = useLogDownload();
  const { passwordUpdateRequired } = usePasswordUpdateContext();
  const { role } = useAuth();
  const isAdmin = role === 'ADMIN';
  const isStudent = role === 'STUDENT';
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message);
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
  };

  const handleLogDownload = async () => {
    try {
      const blob = await logDownload();
      downloadBlob(blob, 'logs.zip');
    } catch (err) {
      handleApiErrorWithUI(err, navigate);
    }
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
