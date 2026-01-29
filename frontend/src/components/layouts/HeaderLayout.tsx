import { useState } from 'react';
import { Header } from '@/components/ui/Header/Header';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useLogDownload } from '@/features/auth/hooks/useLogDownload';
import { ROUTES } from '@/routes/routes';
import { headerOptions } from '@/components/ui/option';
import { usePasswordUpdateContext } from '@/contexts/passwordUpdateContext';
import { useAuth } from '@/contexts/authContext';

export const HeaderLayout = () => {
  const { logout, loading: logouting } = useLogout();
  const { logDownload, loading: downloading } = useLogDownload();
  const { passwordUpdateRequired } = usePasswordUpdateContext();
  const { role } = useAuth();

  const isAdmin = role === 'ADMIN';
  const isStudent = role === 'STUDENT';
  const [open, setOpen] = useState(false);

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
      onLogout={logout}
      onLogDownload={logDownload}
      loading={logouting || downloading}
      passwordUpdateRequired={passwordUpdateRequired}
      isAdmin={isAdmin}
      menuOpen={open}
      onToggleMenu={() => setOpen(!open)}
    />
  );
};
