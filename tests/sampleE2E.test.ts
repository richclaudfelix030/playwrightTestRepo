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

    const mtOptions = page.locator('xpath=//*[@id="headlessui-popover-button-:r2:"]');
    await mtOptions.click();
    const toggleMT = page.locator('xpath=//*[@id="toggle-mt"]');
    const isChecked = await toggleMT.isChecked();
    if (isChecked) {
      await toggleMT.check();
    } else {
      await toggleMT.uncheck();
    }
    
    const inputLangButton = page.locator('xpath=//*[@id="headlessui-listbox-button-:r0:"]');
    await inputLangButton.click();
    const inputLang = page.locator('xpath=//*[@id[starts-with(., "headlessui-listbox-option-")]]/span[text()="Detect Language"]');
    await inputLang.click();
    await expect(inputLangButton).toHaveText('Detect Language'); //asserts the input language

    const outputLangButton = page.locator('xpath=//*[@id="headlessui-listbox-button-:r1:"]');
    await outputLangButton.click();
    const outputLang = page.locator('xpath=//*[@id[starts-with(., "headlessui-listbox-option-")]]/span[text()="Japanese"]').first();
    await outputLang.click();
    await page.waitForTimeout(2000);
    //intermittent fail in this step, please run again
    await expect(outputLangButton).toHaveText('Japanese'); //asserts the output language

    const inputLangText = page.locator('xpath=//*[@id="document-source"]/div[2]');
    await inputLangText.fill('I like coffee');
    await page.waitForTimeout(3000);
    const outputLangText = page.locator('xpath=//*[@id="modes"]/div[2]/div/div/div/div[2]');
    await expect(outputLangText).toHaveText('コーヒーが好き'); //asserts the translation is working properly

    const outputLangOptions = page.locator('xpath=//*[@id="modes"]/div[2]/div/div/div/div[2]/div');
    await outputLangOptions.click();
    const savePhraseButton = page.locator('xpath=//*[@id="modes"]/div[2]/div/div/div/div[2]/div/div[1]/div[1]/div/div[3]');
    await savePhraseButton.click();
    const action = page.locator('xpath=//*[@id="main-document-header"]/div[1]/div[4]/div');
    await page.waitForTimeout(2000);
    //intermittent fail in this step, please run again
    await expect(action).toHaveText('The segment has been saved to My Phrases'); //asserts the translated phrase is saved

    await page.goto('https://app.yarakuzen.com/phrases');
    await page.reload();
    await page.waitForTimeout(2000);
    const selectAllPhrase = page.locator('xpath=/html/body/div[24]/div/div[4]/div/div/table/thead/tr/th[1]/div/div');
    await selectAllPhrase.click();
    await page.getByRole('button', { name: 'Delete All' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForTimeout(5000);
    const phrasesTable = page.locator('xpath=//*[@id="phrases-page-container"]/div/div/table[2]');
    const phrasesRowCount = await phrasesTable.locator('xpath=//*[@id="phrases-page-container"]/div/div/table[2]/tbody').count();
    expect(phrasesRowCount).toBe(0); //asserts phrases table is empty

    await page.goto('https://app.yarakuzen.com/documents');
    await page.reload();
    const selectAllDocument = page.locator('xpath=/html/body/div[24]/div/div[7]/table/thead/tr/th[1]/div/div');
    await selectAllDocument.click();
    const deleteAllDocument = page.locator('xpath=//*[@id="documents-page-container"]/div[1]/div[1]/span/button[1]');
    await deleteAllDocument.click();
    const deleteAllDocumentConfirm = page.locator('xpath=/html/body/div[26]/div/div/div/div[3]/button[2]');
    await deleteAllDocumentConfirm.click();
    const documentTable = page.locator('xpath=//*[@id="documents-page-container"]/table[2]');
    const documentRowCount = await documentTable.locator('xpath=//*[@id="documents-page-container"]/table[2]/tbody').count();
    expect(documentRowCount).toBe(0); //asserts document table is empty

    await page.locator('.sign-out-btn').click();
    await page.waitForNavigation();
    await expect(page.url()).toBe('https://app.yarakuzen.com/auth'); //asserts successful logout
});