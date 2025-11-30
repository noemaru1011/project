import { test, expect } from '@playwright/test';
import { ROUTES } from '../../src/constants/routes';
import { users } from '../data/users';

test.describe('Login E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // ページ遷移とロード確認
    await page.goto(ROUTES.AUTH.LOGIN);
    await page.waitForSelector('#email');
    await expect(page.locator('h2')).toHaveText(/ログイン/i);
  });

  test('Student can login successfully', async ({ page }) => {
    await page.fill('#email', users.student.email);
    await page.fill('#studentPassword', users.student.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(ROUTES.HOME);
    //await expect(page.locator('h1')).toHaveText(/ダッシュボード/i);
  });

  test('Admin can login successfully', async ({ page }) => {
    await page.fill('#email', users.admin.email);
    await page.fill('#studentPassword', users.admin.password);
    await page.click('button[type="submit"]');
    await page.waitForURL(ROUTES.HOME);
    //await expect(page.locator('h1')).toHaveText(/ダッシュボード/i);
  });

  test('Student login fails with wrong password', async ({ page }) => {
    await page.fill('#email', users.student.email);
    await page.fill('#studentPassword', 'wrong-password');
    await page.click('button[type="submit"]');
    // エラーメッセージ表示確認
    const toast = page.getByText('メールアドレスかパスワードが違います');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });

  test('Admin login fails with wrong password', async ({ page }) => {
    await page.fill('#email', users.admin.email);
    await page.fill('#studentPassword', 'wrong-password');
    await page.click('button[type="submit"]');
    const toast = page.getByText('メールアドレスかパスワードが違います');
    await expect(toast).toBeVisible({ timeout: 5000 });
  });
});
