// tests/utils/auth.ts
import { Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('http://localhost:5173/login');

  // ラベル名で要素を特定して入力
  await page.getByLabel('メールアドレス').fill('admin@example.com');
  await page.getByRole('textbox', { name: 'パスワード' }).fill('admin123');

  // 「ログイン」という名前のボタンをクリック
  await page.getByRole('button', { name: 'ログイン' }).click();

  // ログイン後の画面（ダッシュボードなど）に遷移するのを待つ
  await page.waitForURL('**/dashboard');
}
