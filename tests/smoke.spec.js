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
  { id: 'saddle-height', title: 'Saddle height' },
  { id: 'saddle-setback', title: 'Saddle setback' },
  { id: 'saddle-angle', title: 'Saddle angle' },
  { id: 'crank-length', title: 'Crank length' },
  { id: 'handlebar-stack', title: 'BB-to-handlebar stack' },
  { id: 'handlebar-reach', title: 'BB-to-handlebar reach' },
  { id: 'saddle-to-bar-reach', title: 'Saddle-to-bar reach' },
  { id: 'handlebar-drop', title: 'Handlebar drop' },
  { id: 'grip-reach', title: 'Saddle-to-grip reach' },
  { id: 'grip-drop', title: 'Grip drop' },
  { id: 'grip-width', title: 'Grip width' },
  { id: 'frame-reach-stack', title: 'Frame reach and stack' },
  { id: 'wheelbase', title: 'Wheelbase, chainstay, and front center' }
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

test('wheelbase guide uses center-to-center dimensions', async ({ page }) => {
  await page.goto('/#/fleet/geometry');
  await page.locator('#measurementGuideSelect').selectOption('wheelbase');

  const geometry = await page.locator('#measurementGuideContent').evaluate(container => {
    const values = {};
    for (const label of container.querySelectorAll('.diagram-label')) {
      if (['Wheelbase', 'Front center', 'Chainstay'].includes(label.textContent)) {
        const line = label.previousElementSibling;
        values[label.textContent] = ['x1', 'y1', 'x2', 'y2'].map(attribute => Number(line.getAttribute(attribute)));
      }
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

  expect(Object.keys(geometry.dimensions).sort()).toEqual(['Chainstay', 'Front center', 'Wheelbase'].sort());
  expect([geometry.dimensions.Wheelbase[0], geometry.dimensions.Wheelbase[2]]).toEqual([geometry.rearAxle[0], geometry.frontAxle[0]]);
  expect(geometry.dimensions.Wheelbase[1]).toBe(geometry.dimensions.Wheelbase[3]);
  expect(geometry.dimensions['Front center']).toEqual([...geometry.bottomBracket, ...geometry.frontAxle]);
  expect(geometry.dimensions.Chainstay).toEqual([...geometry.bottomBracket, ...geometry.rearAxle]);
});

test('measurement guide fits a mobile viewport without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#/fleet/geometry');

  const overflow = await page.locator('#fleet-geometry').evaluate(element => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
});

test('registers the release-versioned service worker', async ({ page }) => {
  await page.goto('/#/home');

  await expect.poll(async () => page.evaluate(async () => {
    const registration = await navigator.serviceWorker.getRegistration();
    return registration?.active?.scriptURL || registration?.installing?.scriptURL || '';
  })).toMatch(new RegExp(`service-worker\\.js\\?v=${version.replaceAll('.', '\\.')}$`));
});
