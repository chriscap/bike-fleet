import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const packageData = JSON.parse(await readFile(resolve(root, 'package.json'), 'utf8'));
const packageLock = JSON.parse(await readFile(resolve(root, 'package-lock.json'), 'utf8'));
const version = packageData.version;

const expectations = [
  ['assets/app.js', `const APP_VERSION = '${version}';`],
  ['assets/app.js', `service-worker.js?v=${version}`],
  ['index.html', `assets/styles.css?v=${version}`],
  ['index.html', `Fleet OS v${version}`],
  ['index.html', `assets/app.js?v=${version}`],
  ['service-worker.js', `fleet-os-v${version}`],
  ['service-worker.js', `assets/styles.css?v=${version}`],
  ['service-worker.js', `assets/app.js?v=${version}`],
  ['README.md', `# Fleet OS v${version}`],
  ['README.md', `## What changed in v${version}`],
  ['CHANGELOG.md', `## ${version}`],
  ['docs/00-START-HERE.md', `**Handover package:** v${version}`],
  ['docs/00-START-HERE.md', `The latest generated source package is **Fleet OS v${version}**`],
  ['docs/01-PRD.md', `**Current prototype version:** ${version}`],
  ['docs/02-TECHNICAL-SPEC-AND-PLAN.md', `**Current source version:** ${version}`],
  ['docs/03-HANDOVER.md', `**Latest generated release:** v${version}`]
];

const contents = new Map();
const failures = [];

if (packageLock.version !== version) failures.push(`package-lock.json: top-level version is ${packageLock.version || 'missing'}, expected ${version}`);
if (packageLock.packages?.['']?.version !== version) failures.push(`package-lock.json: root package version is ${packageLock.packages?.['']?.version || 'missing'}, expected ${version}`);

for (const [relativePath, expected] of expectations) {
  if (!contents.has(relativePath)) {
    contents.set(relativePath, await readFile(resolve(root, relativePath), 'utf8'));
  }
  if (!contents.get(relativePath).includes(expected)) failures.push(`${relativePath}: missing ${expected}`);
}

const changelogHeading = contents.get('CHANGELOG.md').match(/^## (\d+\.\d+\.\d+)$/m)?.[1];
if (changelogHeading !== version) failures.push(`CHANGELOG.md: first release heading is ${changelogHeading || 'missing'}, expected ${version}`);

if (failures.length) {
  console.error(`Release version ${version} is inconsistent:\n- ${failures.join('\n- ')}`);
  process.exitCode = 1;
} else {
  console.log(`Release version ${version} is consistent across ${expectations.length} references.`);
}
