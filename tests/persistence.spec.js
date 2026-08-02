const { test, expect } = require('@playwright/test');
const legacyData = require('./fixtures/v1.0-data.json');
const { version } = require('../package.json');

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

test('geometry and fit edits survive reload without changing unrelated records', async ({ page }) => {
  const updatedReach = 413.7;
  const updatedSaddleHeight = 672.3;
  await page.goto('/#/fleet/bikes');

  const before = await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem('fleet-os-v1-data'));
    return {
      owner: data.owner,
      yetiModel: data.bikes.find(bike => bike.id === 'sb140').model,
      blurRole: data.bikes.find(bike => bike.id === 'blur').role
    };
  });

  await page.locator('.edit-bike[data-id="blur"]').click();
  await page.locator('#editorDialog [name="geometryReachMm"]').fill(String(updatedReach));
  await page.locator('#editorDialog [name="fitSaddleHeightMm"]').fill(String(updatedSaddleHeight));
  await page.locator('#saveEditorButton').click();
  await expect(page.locator('#editorDialog')).not.toBeVisible();

  await page.reload();
  await page.locator('.edit-bike[data-id="blur"]').click();
  await expect(page.locator('#editorDialog [name="geometryReachMm"]')).toHaveValue(String(updatedReach));
  await expect(page.locator('#editorDialog [name="fitSaddleHeightMm"]')).toHaveValue(String(updatedSaddleHeight));

  const after = await page.evaluate(() => {
    const data = JSON.parse(localStorage.getItem('fleet-os-v1-data'));
    const blur = data.bikes.find(bike => bike.id === 'blur');
    return {
      owner: data.owner,
      yetiModel: data.bikes.find(bike => bike.id === 'sb140').model,
      blurRole: blur.role,
      reach: blur.geometry.reachMm,
      saddleHeight: blur.fit.saddleHeightMm
    };
  });

  expect(after).toEqual({ ...before, reach: updatedReach, saddleHeight: updatedSaddleHeight });
});

test('sanitized v1.0 data migrates without losing records or unknown fields', async ({ context, page }) => {
  await context.addInitScript(data => {
    localStorage.setItem('fleet-os-v1-data', JSON.stringify(data));
  }, legacyData);

  await page.goto('/#/fleet/bikes');
  const migrated = await page.evaluate(() => JSON.parse(localStorage.getItem('fleet-os-v1-data')));

  expect(migrated.version).toBe(version);
  expect(migrated.owner).toBe('Fixture Owner');
  expect(migrated.privateLegacyNote).toBe('preserve top-level unknown fields');
  expect(migrated.rider.ownerDefinedRiderField).toBe('preserve rider unknown fields');
  expect(migrated.rider.notes).toBe('preserve owner-authored fit notes');
  expect(migrated.rider.saddleAngleDeg).toBe(1);
  expect(migrated.bikes).toHaveLength(1);
  expect(migrated.bikes[0]).toMatchObject({
    id: 'legacy-bike',
    brand: 'Fixture',
    model: 'Keeper',
    ownerDefinedBikeField: 'preserve bike unknown fields'
  });
  await expect(page.getByRole('heading', { name: '2020 Fixture Keeper', exact: true })).toBeVisible();
});
