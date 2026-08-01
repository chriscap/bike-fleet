const { test, expect } = require('@playwright/test');

test('a bike edit survives reload', async ({ page }) => {
  const failures = [];
  page.on('pageerror', error => failures.push(`pageerror: ${error.message}`));
  page.on('console', message => {
    if (message.type() === 'error') failures.push(`console.error: ${message.text()}`);
  });
  page.on('requestfailed', request => {
    const url = new URL(request.url());
    if (url.origin === 'http://127.0.0.1:4173') {
      failures.push(`requestfailed: ${request.method()} ${url.pathname} (${request.failure()?.errorText || 'unknown'})`);
    }
  });

  const updatedRole = `Persistence check ${Date.now()}`;
  await page.goto('/#/fleet/bikes');

  await page.locator('.edit-bike[data-id="blur"]').click();
  await page.locator('#editorDialog [name="role"]').fill(updatedRole);
  await page.locator('#saveEditorButton').click();
  await expect(page.locator('#editorDialog')).not.toBeVisible();

  await page.reload();
  await page.locator('.edit-bike[data-id="blur"]').click();
  await expect(page.locator('#editorDialog [name="role"]')).toHaveValue(updatedRole);

  const storedRole = await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem('fleet-os-v1-data'));
    return data.bikes.find(bike => bike.id === 'blur').role;
  });
  expect(storedRole).toBe(updatedRole);
  expect(failures).toEqual([]);
});
