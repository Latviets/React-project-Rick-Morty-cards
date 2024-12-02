import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});


test.describe('Should be able to see Rick and Morty characters', () => {
  test('should see characters', async ({ page }) => {
    await page.waitForTimeout(2000);

    await expect(page.getByRole('heading', { name: 'Rick Sanchez' })).toBeVisible();

    await page.getByRole('heading', { name: 'Rick Sanchez' }).click();

    await expect(page.getByText('Location:', { exact: false })).toBeVisible();
  });

})
