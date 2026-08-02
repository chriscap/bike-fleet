import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const nextVersion = process.argv[2];
const dryRun = process.argv.includes('--dry-run');

if (!/^\d+\.\d+\.\d+$/.test(nextVersion || '')) {
  throw new Error('Usage: npm run release -- <major.minor.patch> [--dry-run]');
}

const packagePath = resolve(root, 'package.json');
const lockPath = resolve(root, 'package-lock.json');
const packageData = JSON.parse(await readFile(packagePath, 'utf8'));
const lockData = JSON.parse(await readFile(lockPath, 'utf8'));
const currentVersion = packageData.version;

if (currentVersion === nextVersion) throw new Error(`Release is already ${nextVersion}.`);

function replaceRequired(content, from, to, relativePath) {
  if (!content.includes(from)) throw new Error(`${relativePath}: expected text not found: ${from}`);
  return content.replace(from, to);
}

const updates = new Map();
const textFiles = ['assets/app.js', 'index.html', 'service-worker.js', 'README.md', 'CHANGELOG.md', 'docs/00-START-HERE.md', 'docs/01-PRD.md', 'docs/02-TECHNICAL-SPEC-AND-PLAN.md', 'docs/03-HANDOVER.md'];
for (const relativePath of textFiles) updates.set(relativePath, await readFile(resolve(root, relativePath), 'utf8'));

let app = updates.get('assets/app.js');
app = replaceRequired(app, `const APP_VERSION = '${currentVersion}';`, `const APP_VERSION = '${nextVersion}';`, 'assets/app.js');
app = replaceRequired(app, `service-worker.js?v=${currentVersion}`, `service-worker.js?v=${nextVersion}`, 'assets/app.js');
updates.set('assets/app.js', app);

let index = updates.get('index.html');
for (const [from, to] of [
  [`assets/styles.css?v=${currentVersion}`, `assets/styles.css?v=${nextVersion}`],
  [`Fleet OS v${currentVersion}`, `Fleet OS v${nextVersion}`],
  [`assets/app.js?v=${currentVersion}`, `assets/app.js?v=${nextVersion}`]
]) index = replaceRequired(index, from, to, 'index.html');
updates.set('index.html', index);

let worker = updates.get('service-worker.js');
for (const [from, to] of [
  [`fleet-os-v${currentVersion}`, `fleet-os-v${nextVersion}`],
  [`assets/styles.css?v=${currentVersion}`, `assets/styles.css?v=${nextVersion}`],
  [`assets/app.js?v=${currentVersion}`, `assets/app.js?v=${nextVersion}`]
]) worker = replaceRequired(worker, from, to, 'service-worker.js');
updates.set('service-worker.js', worker);

let readme = updates.get('README.md');
readme = replaceRequired(readme, `# Fleet OS v${currentVersion}`, `# Fleet OS v${nextVersion}`, 'README.md');
readme = readme.replaceAll(`fleet-os-v${currentVersion}`, `fleet-os-v${nextVersion}`);
readme = replaceRequired(readme, `## What changed in v${currentVersion}`, `## What changed in v${nextVersion}\n\n- Release notes pending.\n\n## What changed in v${currentVersion}`, 'README.md');
updates.set('README.md', readme);

updates.set('CHANGELOG.md', replaceRequired(updates.get('CHANGELOG.md'), '# Changelog\n', `# Changelog\n\n## ${nextVersion}\n\n- Release notes pending.\n`, 'CHANGELOG.md'));

const docReplacements = [
  ['docs/00-START-HERE.md', `**Handover package:** v${currentVersion}`, `**Handover package:** v${nextVersion}`],
  ['docs/00-START-HERE.md', `The latest generated source package is **Fleet OS v${currentVersion}**`, `The latest generated source package is **Fleet OS v${nextVersion}**`],
  ['docs/00-START-HERE.md', `not been reconfirmed for v${currentVersion}`, `not been reconfirmed for v${nextVersion}`],
  ['docs/00-START-HERE.md', `Fleet OS v${currentVersion}`, `Fleet OS v${nextVersion}`],
  ['docs/00-START-HERE.md', `fleet-os-v${currentVersion}`, `fleet-os-v${nextVersion}`],
  ['docs/01-PRD.md', `**Current prototype version:** ${currentVersion}`, `**Current prototype version:** ${nextVersion}`],
  ['docs/02-TECHNICAL-SPEC-AND-PLAN.md', `**Current source version:** ${currentVersion}`, `**Current source version:** ${nextVersion}`],
  ['docs/03-HANDOVER.md', `**Latest generated release:** v${currentVersion}`, `**Latest generated release:** v${nextVersion}`],
  ['docs/03-HANDOVER.md', `**Production status:** Not reconfirmed for v${currentVersion}`, `**Production status:** Not reconfirmed for v${nextVersion}`],
  ['docs/03-HANDOVER.md', `The latest generated code is v${currentVersion}.`, `The latest generated code is v${nextVersion}.`],
  ['docs/03-HANDOVER.md', `**v${currentVersion} is not yet deployment-verified.**`, `**v${nextVersion} is not yet deployment-verified.**`],
  ['docs/03-HANDOVER.md', `production are actually on v${currentVersion}`, `production are actually on v${nextVersion}`],
  ['docs/03-HANDOVER.md', `Has v${currentVersion} been deployed`, `Has v${nextVersion} been deployed`]
];
for (const [relativePath, from, to] of docReplacements) {
  updates.set(relativePath, replaceRequired(updates.get(relativePath), from, to, relativePath));
}

packageData.version = nextVersion;
lockData.version = nextVersion;
lockData.packages[''].version = nextVersion;

if (dryRun) {
  console.log(`Would update ${currentVersion} to ${nextVersion} in ${updates.size + 2} files.`);
} else {
  await Promise.all([
    ...[...updates].map(([relativePath, content]) => writeFile(resolve(root, relativePath), content)),
    writeFile(packagePath, `${JSON.stringify(packageData, null, 2)}\n`),
    writeFile(lockPath, `${JSON.stringify(lockData, null, 2)}\n`)
  ]);
  console.log(`Updated Fleet OS from ${currentVersion} to ${nextVersion}. Replace pending release notes before committing.`);
}
