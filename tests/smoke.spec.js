const { test, expect } = require('@playwright/test');
const { version } = require('../package.json');

const destinations = [
  { name: 'Home', hash: '#/home', view: '#view-home', heading: 'Choose the right bike, wheels, and setup in one place.' },
  { name: 'Fleet / Bikes', hash: '#/fleet/bikes', view: '#fleet-bikes', heading: 'Your fleet library' },
  { name: 'Fleet / Wheelsets', hash: '#/fleet/wheels', view: '#fleet-wheels', heading: 'Your fleet library' },
  { name: 'Fleet / Geometry & Fit', hash: '#/fleet/geometry', view: '#fleet-geometry', heading: 'Compare bikes by the numbers' },
  { name: 'Workshop / Inventory', hash: '#/workshop/inventory', view: '#workshop-inventory', heading: 'Workshop management' },
  { name: 'Workshop / Compatibility', hash: '#/workshop/compatibility', view: '#workshop-compatibility', heading: 'Will this component fit?' },
  { name: 'Workshop / Maintenance', hash: '#/workshop/maintenance', view: '#workshop-maintenance', heading: 'Workshop management' },
  { name: 'Ride', hash: '#/ride', view: '#view-ride', heading: 'Ride configurator' },
  { name: 'More', hash: '#/more', view: '#view-more', heading: 'Backup and restore' }
];

const measurementGuides = [
  { id: 'saddle-height', title: 'Saddle height', dimensions: ['Saddle height'] },
  { id: 'saddle-setback', title: 'Saddle setback', dimensions: ['Setback'] },
  { id: 'saddle-angle', title: 'Saddle angle', dimensions: [] },
  { id: 'crank-length', title: 'Crank length', dimensions: ['Crank length'] },
  { id: 'handlebar-stack', title: 'BB-to-handlebar stack', dimensions: ['Bar stack'] },
  { id: 'handlebar-reach', title: 'BB-to-handlebar reach', dimensions: ['Bar reach'] },
  { id: 'saddle-to-bar-reach', title: 'Saddle-to-bar reach', dimensions: ['Saddle-to-bar reach'] },
  { id: 'handlebar-drop', title: 'Handlebar drop', dimensions: ['Bar drop'] },
  { id: 'grip-reach', title: 'Saddle-to-grip reach', dimensions: ['Grip reach'] },
  { id: 'grip-drop', title: 'Grip drop', dimensions: ['Grip drop'] },
  { id: 'grip-width', title: 'Grip width', dimensions: ['Grip width'] },
  { id: 'frame-reach-stack', title: 'Frame reach and stack', dimensions: ['Frame reach', 'Frame stack'] },
  { id: 'wheelbase', title: 'Wheelbase, rear center, and front center', dimensions: ['Wheelbase', 'Front center (projection)', 'Rear center (projection)'] }
];

function collectBrowserFailures(page) {
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
  return failures;
}

test.describe('primary routes', () => {
  for (const destination of destinations) {
    test(`${destination.name} renders`, async ({ page }) => {
      const failures = collectBrowserFailures(page);

      await page.goto(`/${destination.hash}`);

      await expect(page.locator(destination.view)).toBeVisible();
      await expect(page.getByRole('heading', { name: destination.heading })).toBeVisible();
      expect(failures).toEqual([]);
    });
  }
});

test('every measurement guide renders its diagram and instructions', async ({ page }) => {
  const failures = collectBrowserFailures(page);
  await page.goto('/#/fleet/geometry');

  const guideSelect = page.locator('#measurementGuideSelect');
  const measurementGuideIds = measurementGuides.map(guide => guide.id);
  await expect(guideSelect.locator('option')).toHaveCount(measurementGuides.length);
  const renderedGuideIds = await guideSelect.locator('option').evaluateAll(options => options.map(option => option.value));
  expect(renderedGuideIds).toEqual(measurementGuideIds);

  for (const guide of measurementGuides) {
    await guideSelect.selectOption(guide.id);
    await expect(page.locator('#measurementGuideContent .measurement-guide-card')).toBeVisible();
    await expect(page.locator('#measurementGuideContent .measurement-diagram')).toBeVisible();
    await expect(page.locator('#measurementGuideContent').getByRole('heading', { name: guide.title, exact: true })).toBeVisible();
    await expect(page.locator('#measurementGuideContent').getByRole('heading', { name: 'Definition' })).toBeVisible();
    await expect(page.locator('#measurementGuideContent').getByRole('heading', { name: 'How to measure it' })).toBeVisible();
    await expect(page.locator('#measurementGuideContent').getByRole('heading', { name: 'Consistency tips' })).toBeVisible();
    const dimensions = await page.locator('#measurementGuideContent [data-measurement]').evaluateAll(lines => lines.map(line => line.dataset.measurement));
    expect(dimensions).toEqual(guide.dimensions);
    await expect(page.locator('#measurementGuideContent')).not.toContainText('could not render');
  }

  expect(failures).toEqual([]);
});

test('side-view wheels share axle height and meet the ground line', async ({ page }) => {
  await page.goto('/#/fleet/geometry');
  await page.locator('#measurementGuideSelect').selectOption('saddle-height');

  const geometry = await page.locator('#measurementGuideContent').evaluate(container => {
    const tires = [...container.querySelectorAll('.diagram-tire')].map(tire => ({
      centerY: Number(tire.getAttribute('cy')),
      radius: Number(tire.getAttribute('r'))
    }));
    const groundY = Number(container.querySelector('.diagram-ground').getAttribute('y1'));
    return { tires, groundY };
  });

  expect(geometry.tires).toHaveLength(2);
  expect(geometry.tires[0].centerY).toBe(geometry.tires[1].centerY);
  for (const tire of geometry.tires) expect(tire.centerY + tire.radius).toBe(geometry.groundY);
});

test('wheelbase guide preserves source-defined projected references', async ({ page }) => {
  await page.goto('/#/fleet/geometry');
  await page.locator('#measurementGuideSelect').selectOption('wheelbase');

  const geometry = await page.locator('#measurementGuideContent').evaluate(container => {
    const values = {};
    for (const line of container.querySelectorAll('[data-measurement]')) {
      values[line.dataset.measurement] = ['x1', 'y1', 'x2', 'y2'].map(attribute => Number(line.getAttribute(attribute)));
    }
    const hubs = [...container.querySelectorAll('.diagram-hub')].map(hub => [Number(hub.getAttribute('cx')), Number(hub.getAttribute('cy'))]);
    const chainring = container.querySelector('.diagram-chainring');
    return {
      dimensions: values,
      rearAxle: hubs[0],
      frontAxle: hubs[1],
      bottomBracket: [Number(chainring.getAttribute('cx')), Number(chainring.getAttribute('cy'))]
    };
  });

  expect(Object.keys(geometry.dimensions).sort()).toEqual(['Rear center (projection)', 'Front center (projection)', 'Wheelbase'].sort());
  expect([geometry.dimensions.Wheelbase[0], geometry.dimensions.Wheelbase[2]]).toEqual([geometry.rearAxle[0], geometry.frontAxle[0]]);
  expect(geometry.dimensions.Wheelbase[1]).toBe(geometry.dimensions.Wheelbase[3]);
  expect([geometry.dimensions['Front center (projection)'][0], geometry.dimensions['Front center (projection)'][2]]).toEqual([geometry.bottomBracket[0], geometry.frontAxle[0]]);
  expect(geometry.dimensions['Front center (projection)'][1]).toBe(geometry.dimensions['Front center (projection)'][3]);
  expect([geometry.dimensions['Rear center (projection)'][0], geometry.dimensions['Rear center (projection)'][2]]).toEqual([geometry.rearAxle[0], geometry.bottomBracket[0]]);
  expect(geometry.dimensions['Rear center (projection)'][1]).toBe(geometry.dimensions['Rear center (projection)'][3]);
});

test('every measurement guide fits a mobile viewport without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/fleet/geometry');

  for (const guide of measurementGuides) {
    await page.locator('#measurementGuideSelect').selectOption(guide.id);
    const overflow = await page.locator('#fleet-geometry').evaluate(element => ({
      clientWidth: element.clientWidth,
      scrollWidth: element.scrollWidth
    }));
    expect(overflow.scrollWidth, guide.id).toBeLessThanOrEqual(overflow.clientWidth);
  }
});

test('Retül road conventions remain explicit', async ({ page }) => {
  await page.goto('/#/fleet/geometry');
  const guideSelect = page.locator('#measurementGuideSelect');

  await guideSelect.selectOption('saddle-to-bar-reach');
  await expect(page.locator('#measurementGuideContent')).toContainText('uses the top of the handlebar');

  await guideSelect.selectOption('handlebar-drop');
  await expect(page.locator('#measurementGuideContent')).toContainText('Negative means the handlebar is below the saddle');

  await guideSelect.selectOption('grip-reach');
  await expect(page.locator('#measurementGuideContent')).toContainText('grip trough for this Retül road report');

  await guideSelect.selectOption('grip-width');
  await expect(page.locator('#measurementGuideContent')).toContainText('must not be stored in this field');
});

test('registers the release-versioned service worker', async ({ page }) => {
  await page.goto('/#/home');

  await expect.poll(async () => page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration?.active?.scriptURL || registration?.installing?.scriptURL || '';
  })).toMatch(new RegExp(`service-worker\\.js\\?v=${version.replaceAll('.', '\\.')}$`));
});

test('app shell reloads offline after initial service-worker installation', async ({ context, page }) => {
  await page.goto('/#/home');
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  await context.setOffline(true);
  await page.reload();

  await expect(page.getByRole('heading', { name: 'Choose the right bike, wheels, and setup in one place.' })).toBeVisible();
});

test('service-worker activation removes stale Fleet OS caches', async ({ page }) => {
  const staleCache = 'fleet-os-stale-test-cache';
  const unrelatedCache = 'unrelated-app-cache';
  await page.goto('/#/home');
  await expect.poll(() => page.evaluate(() => Boolean(navigator.serviceWorker.controller))).toBe(true);

  await page.evaluate(async ({ staleCacheName, unrelatedCacheName }) => {
    await Promise.all([caches.open(staleCacheName), caches.open(unrelatedCacheName)]);
    const registration = await navigator.serviceWorker.getRegistration();
    await registration.unregister();
    await navigator.serviceWorker.register(`service-worker.js?cache-test=${Date.now()}`, { updateViaCache: 'none' });
  }, { staleCacheName: staleCache, unrelatedCacheName: unrelatedCache });

  await expect.poll(() => page.evaluate(async cacheName => (await caches.keys()).includes(cacheName), staleCache)).toBe(false);
  await expect.poll(() => page.evaluate(async cacheName => (await caches.keys()).includes(cacheName), unrelatedCache)).toBe(true);
  await page.evaluate(cacheName => caches.delete(cacheName), unrelatedCache);
});
