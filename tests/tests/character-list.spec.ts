import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.waitForTimeout(3000);
  await page.waitForSelector('.loading-container', { state: 'hidden' });
});


test.describe('Should be able to see Rick and Morty characters', () => {
  test('should see Rick Sanchez in the first page', async ({ page }) => {

    await expect(page.getByRole('heading', { name: 'Rick Sanchez' })).toBeVisible();

    await page.getByRole('heading', { name: 'Rick Sanchez' }).click();
    await expect(page.getByText('Location:', { exact: false })).toBeVisible();
  });
})

test.describe('Should see character information', () => {
  test('Should see character species and gender', async ({ page }) => {
    const firstCharacter = page.getByRole('heading', { name: 'Rick Sanchez' });
    await firstCharacter.waitFor({ state: 'visible' });
    
    await page.waitForTimeout(500);
    await firstCharacter.click({ force: true });

    await expect(page.getByText('Species:', { exact: false })).toBeVisible();
    await expect(page.getByText('Gender:', { exact: false })).toBeVisible();
  });

  test('Should display character image with correct alt text', async ({ page }) => {
    const characterImage = page.getByAltText('Rick Sanchez');
    await expect(characterImage).toBeVisible();
    await expect(characterImage).toHaveAttribute('src', /https:\/\/rickandmortyapi\.com\/api\/character\/avatar/);
  });

  test('Should close the additional character details when clicking close button', async ({ page }) => {
    const rickHeading = page.getByRole('heading', { name: 'Rick Sanchez' });
    await rickHeading.waitFor({ state: 'visible' });
    
    await page.waitForTimeout(500);
    await rickHeading.click({ force: true });
    
    await expect(page.getByText('Location:', { exact: false })).toBeVisible();
    await page.getByRole('button', { name: 'Close' }).click();
    await expect(page.getByText('Location:', { exact: false })).not.toBeVisible();
  });
});


