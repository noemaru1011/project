import { LogoutController } from '@/features/auth/controllers/logoutController';
import { tokenBlacklist } from '@/utils/tokenBlacklist';

export const createLogoutModule = () => {
  const logoutController = new LogoutController(tokenBlacklist);

  return {
    logoutController,
  };
};
