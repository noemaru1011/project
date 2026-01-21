import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // baseURLがconfigで設定されている場合はそれを使う
  const baseURL = config.projects[0].use.baseURL || 'http://localhost:3000';
  await page.goto(baseURL + '/login');

  await page.fill('input[name="email"]', 'admin@example.com');
  await page.fill('input[name="password"]', 'admin123');
  await page.getByRole('button', { name: 'ログイン' }).click();

  await page.waitForURL(baseURL + '/');

  // ログイン状態を保存
  await page.context().storageState({ path: 'storageState.json' });

  await browser.close();
}

export default globalSetup;
