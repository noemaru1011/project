import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderMain } from '@/components/ui/Header/HeaderMain';
import { HeaderNav } from '@/components/ui/Header/HeaderNav';
import { Menu } from '@/components/ui/Menu/Menu';
import { useLogout } from '@/features/auth/hooks/useLogout';
import type { Option } from '@/components/ui/option';
import { ROUTES } from '@/constants/routes';
import { handleApiError } from '@/utils/handleApiError';
import { useLoginContext } from '@/hooks/passwordUpdateContext';
import { RoleVisibility } from '@/hooks/roleVisibility';

const HeaderOptions: Option[] = [
  { value: ROUTES.HOME, label: 'メインページへ' },
  { value: ROUTES.HISTORY.INDEX, label: '履歴一覧' },
  { value: ROUTES.HISTORY.CREATE, label: '履歴作成' },
  { value: ROUTES.STUDENT.CHANGE, label: 'パスワード変更' },
  { value: 'LOGOUT', label: 'ログアウト' },
];

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { logout, loading } = useLogout();
  const main = HeaderOptions[0];
  const { passwordUpdateRequired } = useLoginContext();
  const navOptions = HeaderOptions.slice(1);
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logout();
      toast.success(res.message);
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      handleApiError(err, navigate);
    }
  };

  return (
    <header className="border-b">
      <div className="px-5 py-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <HeaderMain to={main.value} label={main.label} />

        <div className="flex flex-col sm:flex-row items-center">
          <HeaderNav
            options={navOptions}
            onLogout={handleLogout}
            loading={loading}
            passwordUpdateRequired={passwordUpdateRequired}
          />

          <RoleVisibility allowedRoles={['ADMIN']}>
            <div className="ml-5 mt-2 sm:mt-0">
              <Menu open={open} onClick={() => setOpen(!open)} />
            </div>
          </RoleVisibility>
        </div>
      </div>
    </header>
  );
};
