// import { test, expect } from '@playwright/test';
// import { ROUTES } from '../../src/constants/routes';
// import { API_ROUTES } from '../../src/constants/apiRoutes';
// import { mockData } from '../data/category';

// test.use({ storageState: 'storageState.json' });

// test.describe('Category index E2E Tests', () => {
//   test('Api success', async ({ page }) => {
//     // API モック
//     await page.route(API_ROUTES.CATEGORY.INDEX, async (route) => {
//       await route.fulfill({
//         status: 200,
//         body: JSON.stringify(mockData),
//         headers: { 'Content-Type': 'application/json' },
//       });
//     });

//     await page.goto(ROUTES.CATEGORY.INDEX);

//     // API レスポンスを安全に待機
//     await page.waitForResponse(
//       (response) => response.url().includes(API_ROUTES.CATEGORY.INDEX) && response.status() === 200,
//     );

//     // DOM の反映を確認
//     await expect(page.getByText('カテゴリー1')).toBeVisible();
//     await expect(page.getByText('カテゴリー2')).toBeVisible();
//     await expect(page.getByText('大分類名')).toBeVisible();
//   });
// });
