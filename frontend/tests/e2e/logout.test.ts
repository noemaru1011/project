import { test, expect } from '@playwright/test';

test.describe('ログアウト機能', () => {
  test('ヘッダーのログアウトボタンを押すとログイン画面へ遷移する', async ({ page }) => {
    // ヘッダーの「ログアウト」ボタンをクリック
    await page.getByRole('button', { name: 'ログアウト' }).click();

    // ログイン画面にリダイレクトされることを確認
    await expect(page).toHaveURL('/login');

    // トーストの成功メッセージが表示されていることを確認（任意）
    const toast = page.locator('.Toastify__toast--success');
    await expect(toast).toBeVisible();
  });
});

