import { test, expect } from '@playwright/test';

test.describe('Sequential Tests', () => {
    test('invalid login page test', async ({ page }) => {
        await page.goto('https://app.yarakuzen.com/ja/auth');
        await page.getByPlaceholder('メールアドレス', { exact: true }).click();
        await page.getByPlaceholder('メールアドレス', { exact: true }).fill('cloudfeliximas@yahoo.com');
        await page.getByPlaceholder('パスワード').click();
        await page.getByPlaceholder('パスワード').fill('asdfasdf');
        await page.getByRole('button', { name: 'ログイン', exact: true }).click();
        await expect(page.getByText('×メールアドレスもしくはパスワードが正しくありません')).toBeVisible();
      });

      test('login page test', async ({ page }) => {
        await page.goto('https://app.yarakuzen.com/ja/auth');
        await page.getByPlaceholder('メールアドレス', { exact: true }).click();
        await page.getByPlaceholder('メールアドレス', { exact: true }).fill('cloudfeliximas@yahoo.com');
        await page.getByPlaceholder('パスワード').click();
        await page.getByPlaceholder('パスワード').fill('ASDFasdf12');
        await page.getByRole('button', { name: 'ログイン', exact: true }).click();
        await page.waitForNavigation();
        await expect(page.url()).toBe('https://app.yarakuzen.com/');
      });
});