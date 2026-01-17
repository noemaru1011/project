import { test, expect } from '@playwright/test';
import { login } from '../../tests/utils/auth';

test.describe('学生登録フォームのバリデーション', () => {
  test.beforeEach(async ({ page }) => {
    // 共通ログイン関数を呼び出す
    await login(page);
    // ログイン後、テストしたいページへ遷移
    await page.goto('http://localhost:5173/students/create');
  });

  test('必須項目が空のときにエラーが出る', async ({ page }) => {
    // 送信ボタンをクリック
    await page.getByRole('button', { name: '登録' }).click();

    // エラーメッセージの出現を確認
    await expect(page.locator('text=学生名は必須です。')).toBeVisible();
    await expect(page.locator('text=学年は必須です。')).toBeVisible();
    await expect(page.locator('text=小分類は必須です。')).toBeVisible();
  });

  test('メールアドレスの形式チェック', async ({ page }) => {
    const emailInput = page.getByLabel('メールアドレス'); // label要素がある場合

    await emailInput.fill('incorrect-email');
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page.locator('text=正しいメールアドレスの形式で入力してください。')).toBeVisible();
  });

  test('学生名の文字数超過チェック', async ({ page }) => {
    const nameInput = page.getByLabel('学生名');

    // 21文字入力
    await nameInput.fill('あ'.repeat(21));
    await page.getByRole('button', { name: '登録' }).click();

    await expect(page.locator('text=学生名は20文字以内で入力してください。')).toBeVisible();
  });
});
