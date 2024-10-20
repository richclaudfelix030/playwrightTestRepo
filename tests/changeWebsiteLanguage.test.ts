import { test, expect } from '@playwright/test';

test('E2E', async ({ page }) => {
    await page.goto('https://app.yarakuzen.com/ja/auth');
    await page.getByPlaceholder('メールアドレス', { exact: true }).click();
    await page.getByPlaceholder('メールアドレス', { exact: true }).fill('cloudfeliximas@yahoo.com');
    await page.getByPlaceholder('パスワード').click();
    await page.getByPlaceholder('パスワード').fill('ASDFasdf12');
    await page.getByRole('button', { name: 'ログイン', exact: true }).click();
    await page.waitForNavigation();
    await expect(page.url()).toBe('https://app.yarakuzen.com/');

    await page.goto('https://app.yarakuzen.com/user/my-account-settings');
    const langOptions = page.locator('xpath=//*[@id="user-settings-page-container"]/div/div[3]/div');
    await langOptions.click();
    await page.getByRole('combobox').selectOption('ja');
    await page.waitForNavigation();
    const languageLabel = page.locator('xpath=//*[@id="user-settings-page-container"]/div/div[3]/label');
    await expect(languageLabel).toHaveText('言語'); //asserts that the website language is changed to Japanese
    await page.waitForTimeout(1000);

    await langOptions.click();
    await page.getByRole('combobox').selectOption('zh');
    await page.waitForNavigation();
    await expect(languageLabel).toHaveText('语言'); //asserts that the website language is changed to Chinese
    await page.waitForTimeout(1000);

    await langOptions.click();
    await page.getByRole('combobox').selectOption('ko');
    await page.waitForNavigation();
    await expect(languageLabel).toHaveText('언어'); //asserts that the website language is changed to Korean
    await page.waitForTimeout(1000);

    await langOptions.click();
    await page.getByRole('combobox').selectOption('en');
    await page.waitForNavigation();
    await expect(languageLabel).toHaveText('Language'); //asserts that the website language is changed to English
    await page.waitForTimeout(1000);
});