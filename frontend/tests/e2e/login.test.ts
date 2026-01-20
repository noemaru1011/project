import { test, expect } from '@playwright/test';

test.describe('ログイン機能', () => {
  // テストの前にログインページに移動
  test.beforeEach(async ({ page }) => {
    await page.goto('/login'); // アプリのログインURLに合わせて調整してください
  });

  test('正しい資格情報を入力してログインに成功し、ホーム画面へ遷移する', async ({ page }) => {
    // Arrange: 入力データの準備
    const email = 'admin@example.com';
    const password = 'admin123';

    // Act: ログイン操作
    // input[name="email"] または #mail を使用
    await page.locator('input[name="email"]').fill(email);

    // input[name="password"] または #password を使用
    await page.locator('input[name="password"]').fill(password);

    // ログインボタンをクリック（ボタンのテキストや役割で指定するのが推奨）
    await page.getByRole('button', { name: 'ログイン' }).click();

    // Assert: 結果の確認
    // 1. ホーム画面への遷移を確認 (URLの変更)
    await expect(page).toHaveURL('/');

    // 2. 成功トーストの表示確認 (React-Toastifyのデフォルトクラスやテキストで判定)
    // res.message の内容が含まれているか確認
    const toast = page.locator('.Toastify__toast--success');
    await expect(toast).toBeVisible();
  });

  test('未入力などでログインボタンを押した場合、バリデーションが働くこと', async ({ page }) => {
    // Act: 何も入力せずにクリック
    await page.getByRole('button', { name: 'ログイン' }).click();

    // Assert: エラーメッセージ等の表示確認
    const emailInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    await expect(emailInput).toHaveAttribute('aria-invalid', 'true');
    await expect(passwordInput).toHaveAttribute('aria-invalid', 'true');
  });
});
