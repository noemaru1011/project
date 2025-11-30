import { test as setup } from '@playwright/test';
import { ROUTES } from '../../src/constants/routes';
import { users } from '../data/users';

setup('Save login', async ({ page }) => {
  await page.goto(ROUTES.AUTH.LOGIN);

  await page.fill('#email', users.admin.email);
  await page.fill('#password', users.admin.password);
  await page.click('button[type="submit"]');

  // セッション（Cookie, localStorage）を保存
  await page.context().storageState({ path: 'storageState.json' });
});
