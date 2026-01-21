import { test, expect } from '@playwright/test';

test.describe('ログアウト機能', () => {
  test('ヘッダーのログアウトボタンを押すとログイン画面へ遷移する', async ({ page }) => {
    // Arrange: 事前にログイン状態にする
    await page.goto('/');
    // Act:ヘッダーの「ログアウト」ボタンをクリック
    await page.getByRole('button', { name: 'ログアウト' }).click();
    // Assert:ログイン画面にリダイレクトされることを確認
    await expect(page).toHaveURL('/login');
  });
});
