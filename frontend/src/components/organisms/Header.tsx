import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderMain } from '@/components/atoms/HeaderMain';
import { HeaderNav } from '@/components/atoms/HeaderNav';
import { Menu } from '@/components/molecules/Menu';
import { useLogout } from '@/hooks/useLogout';
import type { Option } from '@/interface/ui';
import { ROUTES } from '@/constants/routes';
import { handleApiError } from '@/utils/handleApiError';
import { useLoginContext } from '@/hooks/useLoginContext';

const HeaderOptions: Option[] = [
  { value: ROUTES.HOME, label: 'メインページへ' },
  { value: ROUTES.HISTORY.INDEX, label: '事故一覧' },
  { value: ROUTES.HISTORY.CREATE, label: '事故作成' },
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
    } catch (err: any) {
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

          <div className="ml-5 mt-2 sm:mt-0">
            <Menu open={open} onClick={() => setOpen(!open)} />
          </div>
        </div>
      </div>
    </header>
  );
};
