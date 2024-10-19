import { test, expect } from '@playwright/test';

test('login page test', async ({ page }) => {
  await page.goto('https://app.yarakuzen.com/ja/auth');
  await page.getByPlaceholder('メールアドレス', { exact: true }).click();
  await page.getByPlaceholder('メールアドレス', { exact: true }).fill('cloudfeliximas@yahoo.com');
  await page.getByPlaceholder('パスワード').click();
  await page.getByPlaceholder('パスワード').fill('12345678Ri');
  await page.getByRole('button', { name: 'ログイン', exact: true }).click();
  expect(page.url()).toBe('https://app.yarakuzen.com/');
});