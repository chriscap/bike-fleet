'use strict';

const STORAGE_KEY = 'fleet-os-v1-data';
const BACKUP_META_KEY = 'fleet-os-backup-meta';
const SETTINGS_KEY = 'fleet-os-settings';
const APP_VERSION = '1.1.0';

const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9"/><path d="M9 20v-6h6v6"/></svg>',
  bike: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5.5" cy="16.5" r="3.5"/><circle cx="18.5" cy="16.5" r="3.5"/><path d="m5.5 16.5 4-7h4l5 7M9.5 9.5l4 7h-8M13.5 9.5l2-3M12.5 6.5h5"/></svg>',
  tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.7 6.3a4 4 0 0 0-5 5L3 18l3 3 6.7-6.7a4 4 0 0 0 5-5l-2.2 2.2-3-3z"/><path d="m14 17 3-3 4 4-3 3z"/></svg>',
  route: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 19h3a4 4 0 0 0 4-4V9a4 4 0 0 1 4-4"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.8"/><circle cx="12" cy="12" r="1.8"/><circle cx="19" cy="12" r="1.8"/></svg>',
  theme: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9c0-1-.2-2-.5-2.8A7 7 0 0 1 12 3Z"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
  backup: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 23a16 16 0 1 1-2 21"/><path d="M8 24h12V12"/><path d="M32 20v20M24 32l8 8 8-8"/></svg>',
  bikeLarge: '<svg viewBox="0 0 120 80" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="25" cy="55" r="18"/><circle cx="95" cy="55" r="18"/><path d="m25 55 23-38h18l29 38M48 17l19 38H25M66 17l14-9M76 8h18"/></svg>',
  wheel: '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><circle cx="50" cy="50" r="40"/><circle cx="50" cy="50" r="7"/><path d="M50 10v33M50 57v33M10 50h33M57 50h33M22 22l23 23M55 55l23 23M78 22 55 45M45 55 22 78"/></svg>'
};

document.querySelectorAll('[data-icon]').forEach(node => { node.innerHTML = ICONS[node.dataset.icon] || ''; });

const seedData = {
  version: APP_VERSION,
  owner: 'Chris Capellini',
  rider: {
    heightIn: 65,
    weightLb: 155,
    fitSource: '2022 Retül fit performed on Parlee Chebacco',
    saddleHeightMm: 669,
    saddleSetbackMm: -52,
    saddleAngleDeg: 1,
    notes: 'Retül fit is a road/gravel baseline, not a direct mountain-bike prescription. The report uses a minus sign to denote nose-down, so +1° is slightly nose-up.'
  },
  bikes: [
    {
      id: 'blur', brand: 'Santa Cruz', model: 'Blur TR', year: 2023, category: 'XC / Downcountry', size: 'Small', status: 'active',
      role: 'Fast XC, technical trail, and long pedal days', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', drivetrainSpeed: 12,
      drivetrainFamily: 'SRAM Eagle conventional', maxCassetteCog: null, brakes: 'Formula Cura — planned installation', brakeFluid: 'Mineral oil', rotorInterface: 'Unknown',
      fork: 'Fox 34 Step-Cast Performance, 120 mm', shock: 'Fox Float DPS', currentWheelsetId: null, photo: '', weightLb: null,
      purchaseDate: '', serialNumber: '', geometryNotes: '', buildNotes: '',
      notes: 'Primary pedal bike. Current SRAM Level brakes are being replaced with Formula Cura brakes.'
    },
    {
      id: 'sb140', brand: 'Yeti', model: 'SB140 C2 Factory', year: 2024, category: 'Trail / All-mountain', size: 'Small', status: 'active',
      role: 'Aggressive trail, Killington, and rough Vermont terrain', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', drivetrainSpeed: 12,
      drivetrainFamily: 'SRAM GX Eagle conventional', maxCassetteCog: 52, brakes: 'SRAM G2 R', brakeFluid: 'DOT', rotorInterface: 'Unknown',
      fork: 'Fox 36 Factory FIT4, 150 mm', shock: 'Fox Float DPS Factory, 140 mm rear travel', currentWheelsetId: 'synthesis', photo: 'assets/images/yeti-sb140.jpg', weightLb: null,
      purchaseDate: '', serialNumber: '', geometryNotes: '',
      buildNotes: 'Samox Platinum 155 mm cranks, Absolute Black 32T oval ring, OneUp 150 mm dropper, SRAM GX Eagle mechanical drivetrain.',
      notes: 'Purchased used from Ranch Camp for $3,300. Seller disclosed chain and brake-pad wear that should be addressed before hard riding.'
    },
    {
      id: 'chebacco', brand: 'Parlee', model: 'Chebacco XD', year: 2022, category: 'Gravel', size: 'Small', status: 'active',
      role: 'Gravel and all-road', wheelSize: '700c', axleFront: 'Unknown', axleRear: 'Unknown', freehub: 'Unknown', drivetrainSpeed: null,
      drivetrainFamily: 'Not documented', maxCassetteCog: null, brakes: 'Not documented', brakeFluid: 'Unknown', rotorInterface: 'Unknown',
      fork: 'Rigid', shock: 'None', currentWheelsetId: null, photo: '', weightLb: null, purchaseDate: '', serialNumber: '',
      geometryNotes: '', buildNotes: '',
      fit: { saddleHeightMm: 669, saddleSetbackMm: -52, saddleAngleDeg: 1, stemMm: 90, stemAngleDeg: 0, spacerStackMm: 35, crankLengthMm: 170, handlebarStackMm: 632, handlebarReachMm: 438 },
      notes: 'Retül fit baseline documented in April 2022. Component build, axle standards, wheels, tires, gearing, and brakes remain to be documented.'
    },
    {
      id: 'z5', brand: 'Parlee', model: 'Z5', year: 2012, category: 'Road', size: 'Unknown', status: 'active',
      role: 'Road', wheelSize: '700c', axleFront: 'Unknown', axleRear: 'Unknown', freehub: 'Unknown', drivetrainSpeed: null,
      drivetrainFamily: 'Not documented', maxCassetteCog: null, brakes: 'Not documented', brakeFluid: 'Unknown', rotorInterface: 'Unknown',
      fork: 'Rigid', shock: 'None', currentWheelsetId: null, photo: '', weightLb: null, purchaseDate: '', serialNumber: '', geometryNotes: '', buildNotes: '',
      notes: 'Stub profile. Specifications, fit, wheels, and maintenance history remain to be documented.'
    },
    {
      id: 'wraith', brand: 'Wraith', model: 'Paycheck', year: null, category: 'All-road / Gravel / CX', size: 'Small', status: 'active',
      role: 'All-road, gravel, and cyclocross', wheelSize: '700c', axleFront: 'QR', axleRear: 'QR', freehub: 'HG', drivetrainSpeed: 11,
      drivetrainFamily: 'Shimano Ultegra 6800', maxCassetteCog: 32, brakes: 'Shimano RS785 hydraulic disc', brakeFluid: 'Mineral oil', rotorInterface: '6-bolt',
      fork: 'ENVE tapered CX disc', shock: 'None', currentWheelsetId: null, photo: '', weightLb: null, purchaseDate: '', serialNumber: '',
      geometryNotes: '53 cm effective top tube; 53 cm effective seat tube; 130 mm head tube; 71° head angle; 73.5° seat angle; 430 mm chainstays; 70 mm BB drop; 732 mm standover.',
      buildNotes: 'Matte-black powder-coated steel frame; Columbus Life main triangle and Zona rear triangle; English threaded BB; White Industries CX11/Pacenti SL25 wheels; GravelKing SS 40 mm tires; Shimano Ultegra 6800 11-speed; 170 mm 50/34 Stages crank; 11–32 cassette; RS685 levers and RS785 calipers; 160 mm six-bolt Ice-Tech rotors; Salsa Cowbell 2 42 cm bar; Thomson 80 mm +10° stem and 27.2 mm post; two titanium King cages.',
      notes: 'Custom drilled for a second water-bottle mount.'
    }
  ],
  wheelsets: [
    {
      id: 'hunt', name: 'Hunt XC Wide', category: 'XC', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', rotorInterface: 'Unknown',
      cassette: 'Not documented', frontRotorMm: null, rearRotorMm: null, tires: 'Schwalbe Racing Ray 2.35 / Racing Ralph 2.35 (measure narrow)',
      role: 'Maximum speed and climbing efficiency', pressure: { trail: '20 / 22 psi', park: 'Not recommended' }, notes: 'Best for long pedal days and smoother terrain.'
    },
    {
      id: 'raceface', name: 'RaceFace AR27', category: 'Aggressive trail', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', rotorInterface: 'Unknown',
      cassette: 'Not documented', frontRotorMm: null, rearRotorMm: null, tires: 'Continental Kryptotal FR 2.4 Trail Soft / RE 2.4 Trail Endurance',
      role: 'Maximum grip and rough-terrain confidence', pressure: { trail: '20–21 / 22–23 psi', park: '22 / 24 psi' }, notes: 'Primary Killington and technical New England setup.'
    },
    {
      id: 'synthesis', name: 'Crankbrothers Synthesis', category: 'Balanced trail', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', rotorInterface: 'Unknown',
      cassette: 'SRAM GX Eagle, exact model to verify', frontRotorMm: null, rearRotorMm: null, tires: 'Maxxis Minion DHF (size to verify) / Aggressor 2.3',
      role: 'Everyday trail balance', pressure: { trail: '20–21 / 23 psi', park: '22 / 24 psi' }, notes: 'Stock SB140 wheelset. Verify exact hub and rotor standards.'
    }
  ],
  parts: [
    { id: 'formula-pads', category: 'Brake pads', brand: 'Formula', model: 'Cura R1 Mega Sintered', quantity: 1, condition: 'New', location: 'Home', brakeSystem: 'Formula Cura', fluidType: 'Mineral oil', padShape: 'Formula Cura', notes: 'Spare pad set for Blur after Cura installation.', overrides: { blur: { status: 'direct', reason: 'Correct pad family for Formula Cura brakes.', verifiedDate: '', method: 'Owner purchase' } } },
    { id: 'formula-bleed', category: 'Brake service', brand: 'Formula', model: 'Mineral oil bleed kit', quantity: 1, condition: 'New', location: 'Home', brakeSystem: 'Formula Cura', fluidType: 'Mineral oil', notes: 'For Formula Cura service.', overrides: { blur: { status: 'direct', reason: 'Correct bleed system for Formula Cura.', verifiedDate: '', method: 'Owner purchase' }, sb140: { status: 'not', reason: 'SB140 SRAM G2 R uses DOT fluid.', verifiedDate: '', method: 'Documented fluid type' } } },
    { id: 'formula-hardware', category: 'Brake hardware', brand: 'Formula', model: 'Olive / insert / O-ring kits', quantity: 1, condition: 'New', location: 'Home', brakeSystem: 'Formula Cura', fluidType: 'Mineral oil', notes: 'Hydraulic hose installation spares.', overrides: { blur: { status: 'direct', reason: 'Intended for Formula Cura hose installation.', verifiedDate: '', method: 'Owner purchase' } } },
    { id: 'road-cassettes-stub', category: 'Cassette', brand: 'Mixed', model: 'Road / gravel cassette inventory — details needed', quantity: 0, condition: 'Unknown', location: 'Home', speed: null, freehub: '', minCog: null, maxCog: null, drivetrainFamily: '', notes: 'Add each cassette separately with speed, ratio, and freehub standard.', overrides: {} },
    { id: 'chains-stub', category: 'Chain', brand: 'Mixed', model: 'Spare chain inventory — details needed', quantity: 0, condition: 'Unknown', location: 'Home', speed: null, drivetrainFamily: '', chainType: '', notes: 'Add each chain type separately with speed and drivetrain family.', overrides: {} }
  ],
  maintenance: [
    { id: 'm1', bikeId: 'sb140', title: 'Replace chain', priority: 'high', status: 'open', dueDate: '', dueLabel: 'Now', repeatDays: 0, cost: '', notes: 'Seller disclosed chain over 50% worn.', completedDate: '' },
    { id: 'm2', bikeId: 'sb140', title: 'Replace rear brake pads', priority: 'high', status: 'open', dueDate: '', dueLabel: 'Soon', repeatDays: 0, cost: '', notes: 'Seller disclosed rear pads approximately 75% worn.', completedDate: '' },
    { id: 'm3', bikeId: 'sb140', title: 'Inspect front brake pads', priority: 'medium', status: 'open', dueDate: '', dueLabel: 'Monitor', repeatDays: 0, cost: '', notes: 'Seller disclosed front pads approximately 25% worn.', completedDate: '' },
    { id: 'm4', bikeId: 'blur', title: 'Install Formula Cura brakes', priority: 'medium', status: 'open', dueDate: '', dueLabel: 'Planned', repeatDays: 0, cost: '', notes: 'Replace SRAM Level brakes.', completedDate: '' },
    { id: 'm5', bikeId: 'sb140', title: 'Document Switch Infinity service date', priority: 'low', status: 'open', dueDate: '', dueLabel: 'Before first season', repeatDays: 0, cost: '', notes: 'Service history not yet recorded.', completedDate: '' }
  ],
  presets: [
    { id: 'preset-killington', name: 'Killington mode', destination: 'Killington Bike Park', type: 'lift', conditions: 'damp', priority: 'grip', mileage: 15, technical: 'technical', bikeId: 'sb140', wheelId: 'raceface', pressure: '22 / 24 psi', suspension: 'Fork about 20% sag; shock about 30% sag; compression open; verify rebound on trail.' }
  ],
  rideHistory: [],
  activity: [
    { id: 'a1', at: new Date().toISOString(), text: 'Fleet OS upgraded to v1.1.' },
    { id: 'a2', at: new Date(Date.now() - 3600000).toISOString(), text: 'Yeti SB140 added to the active fleet.' },
    { id: 'a3', at: new Date(Date.now() - 7200000).toISOString(), text: 'Three mountain-bike wheelsets documented.' }
  ],
  compatibilityOverrides: {},
  meta: { createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
};

const BIKE_COMPLETENESS_FIELDS = [
  ['brand','Brand'], ['model','Model'], ['year','Year'], ['category','Category'], ['size','Size'], ['role','Ride role'], ['wheelSize','Wheel size'],
  ['axleFront','Front axle'], ['axleRear','Rear axle'], ['freehub','Freehub'], ['drivetrainSpeed','Drivetrain speed'], ['drivetrainFamily','Drivetrain family'],
  ['brakes','Brakes'], ['brakeFluid','Brake fluid'], ['rotorInterface','Rotor interface'], ['fork','Fork'], ['shock','Rear suspension'], ['notes','Notes']
];

const state = {
  data: null,
  route: 'home',
  fleetTab: 'bikes',
  workshopTab: 'inventory',
  editor: null,
  currentRecommendation: null,
  importCandidate: null,
  confirmAction: null
};

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function uid(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`; }
function esc(value = '') { return String(value).replace(/[&<>'"]/g, ch => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[ch]); }
function isKnown(value) {
  if (value === 0) return true;
  if (value === null || value === undefined) return false;
  const text = String(value).trim().toLowerCase();
  return text !== '' && !['unknown','not documented','not verified','tbd','to verify'].includes(text);
}
function formatDate(value, options = { month:'short', day:'numeric', year:'numeric' }) {
  if (!value) return 'Not recorded';
  const date = new Date(value.length === 10 ? `${value}T12:00:00` : value);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('en-US', options).format(date);
}
function bikeName(id) {
  const bike = state.data.bikes.find(item => item.id === id);
  return bike ? `${bike.year || ''} ${bike.brand} ${bike.model}`.trim() : 'Unknown bike';
}
function wheelName(id) {
  const wheel = state.data.wheelsets.find(item => item.id === id);
  return wheel ? wheel.name : 'Not assigned';
}
function statusLabel(status) { return ({ direct:'Direct fit', conditional:'Conditional fit', emergency:'Emergency use', not:'Not compatible', unknown:'Unknown' })[status] || 'Unknown'; }
function statusClass(status) { return ['direct','conditional','emergency','not','unknown'].includes(status) ? status : 'unknown'; }
function profileCompleteness(bike) {
  const missing = BIKE_COMPLETENESS_FIELDS.filter(([key]) => !isKnown(bike[key]));
  return { percent: Math.round(((BIKE_COMPLETENESS_FIELDS.length - missing.length) / BIKE_COMPLETENESS_FIELDS.length) * 100), missing: missing.map(([,label]) => label) };
}
function completionBadge(bike) {
  const result = profileCompleteness(bike);
  const cls = result.percent >= 85 ? 'success' : result.percent >= 55 ? 'warning' : 'unknown';
  return `<span class="badge ${cls}">${result.percent}% documented</span>`;
}

function migrateData(raw) {
  if (!raw || typeof raw !== 'object') return clone(seedData);
  const next = { ...clone(seedData), ...raw };
  next.bikes = Array.isArray(raw.bikes) ? raw.bikes.map(bike => {
    const defaults = seedData.bikes.find(item => item.id === bike.id) || {};
    const merged = { ...defaults, ...bike };
    delete merged.completeness;
    if (bike.id === 'sb140' && !merged.photo) merged.photo = defaults.photo;
    return merged;
  }) : clone(seedData.bikes);
  next.wheelsets = Array.isArray(raw.wheelsets) ? raw.wheelsets.map(wheel => ({ ...wheel, pressure: { trail:'', park:'', ...(wheel.pressure || {}) } })) : clone(seedData.wheelsets);
  next.parts = Array.isArray(raw.parts) ? raw.parts.map(part => ({ quantity:0, condition:'Unknown', location:'Unknown', overrides:{}, ...part, overrides: part.overrides || {} })) : clone(seedData.parts);
  next.maintenance = Array.isArray(raw.maintenance) ? raw.maintenance.map(task => ({
    dueDate:'', dueLabel: task.due || '', repeatDays:0, cost:'', completedDate:'', ...task
  })) : clone(seedData.maintenance);
  next.presets = Array.isArray(raw.presets) ? raw.presets : clone(seedData.presets);
  next.rideHistory = Array.isArray(raw.rideHistory) ? raw.rideHistory : [];
  next.activity = Array.isArray(raw.activity) ? raw.activity : [];
  next.compatibilityOverrides = raw.compatibilityOverrides || {};
  next.meta = { ...seedData.meta, ...(raw.meta || {}) };
  next.version = APP_VERSION;
  if (next.rider?.fitSource === seedData.rider.fitSource && next.rider.saddleAngleDeg === -1 && String(raw.version || '').startsWith('1.0')) {
    next.rider.saddleAngleDeg = 1;
    next.rider.notes = seedData.rider.notes;
  }
  return next;
}

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? migrateData(JSON.parse(saved)) : clone(seedData);
  } catch (error) {
    console.warn('Fleet OS could not load saved data.', error);
    return clone(seedData);
  }
}
function loadBackupMeta() {
  try { return { lastBackupAt:'', changesSinceBackup:0, ...JSON.parse(localStorage.getItem(BACKUP_META_KEY) || '{}') }; }
  catch { return { lastBackupAt:'', changesSinceBackup:0 }; }
}
function loadSettings() {
  try { return { theme:'system', ...JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}') }; }
  catch { return { theme:'system' }; }
}
let backupMeta = loadBackupMeta();
let settings = loadSettings();
state.data = loadData();
localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));

function addActivity(text) {
  state.data.activity = state.data.activity || [];
  state.data.activity.unshift({ id: uid('activity'), at: new Date().toISOString(), text });
  state.data.activity = state.data.activity.slice(0, 50);
}
function saveData({ toast = 'Changes saved', activity = '' } = {}) {
  if (activity) addActivity(activity);
  state.data.version = APP_VERSION;
  state.data.meta = state.data.meta || {};
  state.data.meta.updatedAt = new Date().toISOString();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.data));
  backupMeta.changesSinceBackup = Number(backupMeta.changesSinceBackup || 0) + 1;
  localStorage.setItem(BACKUP_META_KEY, JSON.stringify(backupMeta));
  renderAll();
  if (toast) showToast(toast);
}

function applyTheme(theme) {
  settings.theme = theme;
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  const select = document.getElementById('themeSelect');
  if (select) select.value = theme;
}
applyTheme(settings.theme);

function routeHash(route, id = '', subview = '') {
  if (route === 'bike-detail') return `#/bike/${encodeURIComponent(id)}`;
  if (route === 'wheel-detail') return `#/wheel/${encodeURIComponent(id)}`;
  if (subview) return `#/${route}/${subview}`;
  return `#/${route}`;
}
function go(route, options = {}) {
  const hash = routeHash(route, options.id || '', options.subview || '');
  if (location.hash === hash) renderRoute(); else location.hash = hash;
}
function parseRoute() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  if (!parts.length) return { route:'home' };
  if (parts[0] === 'bike') return { route:'bike-detail', id:decodeURIComponent(parts[1] || '') };
  if (parts[0] === 'wheel') return { route:'wheel-detail', id:decodeURIComponent(parts[1] || '') };
  const route = ['home','fleet','workshop','ride','more'].includes(parts[0]) ? parts[0] : 'home';
  return { route, subview:parts[1] || '' };
}
function renderRoute() {
  const parsed = parseRoute();
  state.route = parsed.route;
  if (parsed.route === 'fleet' && ['bikes','wheels'].includes(parsed.subview)) state.fleetTab = parsed.subview;
  if (parsed.route === 'workshop' && ['inventory','compatibility','maintenance'].includes(parsed.subview)) state.workshopTab = parsed.subview;

  document.querySelectorAll('.view').forEach(view => view.classList.toggle('active', view.id === `view-${parsed.route}`));
  const topRoute = parsed.route.endsWith('-detail') ? 'fleet' : parsed.route;
  document.querySelectorAll('[data-route]').forEach(button => {
    const active = button.dataset.route === topRoute;
    if (button.classList.contains('nav-item') || button.classList.contains('mobile-nav-item')) {
      if (active) button.setAttribute('aria-current','page'); else button.removeAttribute('aria-current');
    }
  });
  setFleetTab(state.fleetTab, false);
  setWorkshopTab(state.workshopTab, false);

  if (parsed.route === 'bike-detail') renderBikeDetail(parsed.id);
  if (parsed.route === 'wheel-detail') renderWheelDetail(parsed.id);
  const activeView = document.getElementById(`view-${parsed.route}`);
  document.getElementById('pageTitle').textContent = activeView?.dataset.title || 'Fleet OS';
  document.getElementById('pageEyebrow').textContent = activeView?.dataset.eyebrow || 'Bike fleet manager';
  document.getElementById('topbarPlanRide').hidden = parsed.route === 'ride';
  document.title = `${document.getElementById('pageTitle').textContent} — Fleet OS`;
  window.scrollTo({ top:0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
function setFleetTab(tab, updateHash = true) {
  state.fleetTab = ['bikes','wheels'].includes(tab) ? tab : 'bikes';
  document.querySelectorAll('[data-fleet-tab]').forEach(button => {
    const active = button.dataset.fleetTab === state.fleetTab;
    button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('#view-fleet .subview').forEach(view => view.classList.toggle('active', view.id === `fleet-${state.fleetTab}`));
  if (updateHash && state.route === 'fleet') go('fleet', { subview:state.fleetTab });
}
function setWorkshopTab(tab, updateHash = true) {
  state.workshopTab = ['inventory','compatibility','maintenance'].includes(tab) ? tab : 'inventory';
  document.querySelectorAll('[data-workshop-tab]').forEach(button => {
    const active = button.dataset.workshopTab === state.workshopTab;
    button.classList.toggle('active', active); button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('#view-workshop .subview').forEach(view => view.classList.toggle('active', view.id === `workshop-${state.workshopTab}`));
  if (updateHash && state.route === 'workshop') go('workshop', { subview:state.workshopTab });
}

function showToast(title, detail = '') {
  const region = document.getElementById('toastRegion');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<strong>${esc(title)}</strong>${detail ? `<small>${esc(detail)}</small>` : ''}`;
  region.appendChild(toast);
  setTimeout(() => toast.remove(), 3600);
}
function confirmAction(title, message, callback, actionLabel = 'Continue') {
  state.confirmAction = callback;
  document.getElementById('confirmTitle').textContent = title;
  document.getElementById('confirmMessage').textContent = message;
  document.getElementById('confirmAction').textContent = actionLabel;
  document.getElementById('confirmDialog').showModal();
}

function renderDashboard() {
  const openTasks = state.data.maintenance.filter(task => task.status !== 'completed');
  const activeBikes = state.data.bikes.filter(bike => bike.status === 'active');
  const lastBackup = backupMeta.lastBackupAt ? formatDate(backupMeta.lastBackupAt, { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' }) : 'Never';
  document.getElementById('sidebarBackupStatus').textContent = backupMeta.lastBackupAt ? `Last backup ${lastBackup}` : 'No backup yet';
  document.getElementById('backupCard').innerHTML = `
    <div class="backup-illustration">${ICONS.backup}</div>
    <div><p class="kicker">Data on this device</p><strong>${backupMeta.changesSinceBackup || 0} change${Number(backupMeta.changesSinceBackup || 0) === 1 ? '' : 's'} since backup</strong><p class="muted">Last backup: ${esc(lastBackup)}</p></div>
    <button class="button secondary" id="dashboardExport" type="button">Export backup</button>`;

  const attention = openTasks.sort(prioritySort).slice(0, 6);
  document.getElementById('attentionQueue').innerHTML = attention.length ? attention.map(task => `
    <article class="attention-card ${esc(task.priority)}">
      <div><span class="badge ${task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'unknown'}">${esc(task.priority)} priority</span></div>
      <h3>${esc(task.title)}</h3>
      <p class="muted">${esc(task.notes || 'No notes recorded.')}</p>
      <footer><span>${esc(bikeName(task.bikeId))}</span><span>${esc(task.dueDate ? formatDate(task.dueDate) : task.dueLabel || 'No due date')}</span></footer>
    </article>`).join('') : '<div class="empty">Nothing needs attention. Your fleet is ready.</div>';

  document.getElementById('dashboardBikes').innerHTML = activeBikes.map(bike => bikeCard(bike, true)).join('');
  const configs = [
    ['blur','hunt','XC race car','Fastest and lightest configuration.'],
    ['blur','synthesis','Balanced trail','More grip without abandoning efficiency.'],
    ['blur','raceface','Technical downcountry','Maximum Blur confidence for wet roots and rocks.'],
    ['sb140','hunt','Marathon trail','Long, smoother pedal days; verify casing and rim protection.'],
    ['sb140','synthesis','Everyday all-mountain','Default balanced configuration.'],
    ['sb140','raceface','Killington mode','Maximum grip, braking traction, and confidence.']
  ];
  document.getElementById('configurationGrid').innerHTML = configs.map(([bikeId,wheelId,name,note]) => `
    <div class="configuration-row"><strong>${esc(`${bikeName(bikeId)} + ${wheelName(wheelId)}`)}</strong><span class="badge">${esc(name)}</span><p class="muted">${esc(note)}</p></div>`).join('');

  const activity = (state.data.activity || []).slice(0, 6);
  document.getElementById('recentActivity').innerHTML = activity.length ? `<div class="activity-list">${activity.map(item => `
    <div class="activity-item"><span class="activity-dot"></span><div><strong>${esc(item.text)}</strong><small>${esc(formatDate(item.at, { month:'short', day:'numeric', hour:'numeric', minute:'2-digit' }))}</small></div></div>`).join('')}</div>` : '<div class="empty">No activity has been recorded yet.</div>';
}
function prioritySort(a,b) {
  const rank = { high:0, medium:1, low:2 };
  return (rank[a.priority] ?? 3) - (rank[b.priority] ?? 3);
}

function bikeCard(bike, compact = false) {
  const complete = profileCompleteness(bike);
  const currentWheel = bike.currentWheelsetId ? wheelName(bike.currentWheelsetId) : 'No wheelset assigned';
  const photo = bike.photo ? `<img src="${esc(bike.photo)}" alt="${esc(`${bike.brand} ${bike.model}`)}" loading="lazy" />` : `<div class="placeholder">${ICONS.bikeLarge}</div>`;
  return `<article class="entity-card">
    <div class="entity-media">${photo}<div class="entity-status">${completionBadge(bike)}</div></div>
    <div class="entity-body">
      <div class="entity-title-row"><div><p class="kicker">${esc(bike.category)}</p><h3>${esc(`${bike.year || ''} ${bike.brand} ${bike.model}`.trim())}</h3><p class="meta">Size ${esc(bike.size || 'Unknown')} · ${esc(bike.role || 'Role not documented')}</p></div></div>
      <div class="spec-chips"><span class="chip">${esc(bike.wheelSize || 'Wheel ?')}</span><span class="chip">${esc(bike.drivetrainSpeed ? `${bike.drivetrainSpeed}-speed` : 'Speed ?')}</span><span class="chip">${esc(currentWheel)}</span></div>
      <div class="progress" aria-label="Profile ${complete.percent}% documented"><span style="width:${complete.percent}%"></span></div>
      <div class="actions"><button class="button small open-bike" data-id="${esc(bike.id)}" type="button">Open bike</button>${compact ? '' : `<button class="button small secondary edit-bike" data-id="${esc(bike.id)}" type="button">Edit</button>`}</div>
    </div>
  </article>`;
}
function renderBikes() {
  const categorySelect = document.getElementById('bikeCategoryFilter');
  const previous = categorySelect.value;
  const categories = [...new Set(state.data.bikes.map(bike => bike.category).filter(Boolean))].sort();
  categorySelect.innerHTML = '<option value="all">All categories</option>' + categories.map(category => `<option value="${esc(category)}">${esc(category)}</option>`).join('');
  categorySelect.value = categories.includes(previous) ? previous : 'all';
  const category = categorySelect.value;
  const status = document.getElementById('bikeStatusFilter').value;
  const search = document.getElementById('bikeSearch').value.trim().toLowerCase();
  const bikes = state.data.bikes.filter(bike => (category === 'all' || bike.category === category) && (status === 'all' || bike.status === status) && (!search || JSON.stringify(bike).toLowerCase().includes(search)));
  document.getElementById('bikeGrid').innerHTML = bikes.length ? bikes.map(bike => bikeCard(bike)).join('') : '<div class="empty">No bikes match these filters.</div>';
}
function wheelCard(wheel) {
  const fits = state.data.bikes.map(bike => ({ bike, result:computeWheelCompatibility(wheel,bike) })).filter(item => ['direct','conditional'].includes(item.result.status));
  return `<article class="entity-card">
    <div class="entity-media"><div class="placeholder">${ICONS.wheel}</div><div class="entity-status"><span class="badge">${esc(wheel.wheelSize || 'Unknown')}</span></div></div>
    <div class="entity-body">
      <div><p class="kicker">${esc(wheel.category || 'Wheelset')}</p><h3>${esc(wheel.name)}</h3><p class="meta">${esc(wheel.tires || 'Tires not documented')}</p></div>
      <div class="spec-chips"><span class="chip">${esc(wheel.freehub || 'Freehub ?')}</span><span class="chip">${esc(wheel.axleFront || 'Front axle ?')}</span><span class="chip">Fits ${fits.length} bike${fits.length === 1 ? '' : 's'}</span></div>
      <div class="actions"><button class="button small open-wheel" data-id="${esc(wheel.id)}" type="button">Open wheelset</button><button class="button small secondary edit-wheel" data-id="${esc(wheel.id)}" type="button">Edit</button></div>
    </div>
  </article>`;
}
function renderWheels() {
  document.getElementById('wheelGrid').innerHTML = state.data.wheelsets.length ? state.data.wheelsets.map(wheelCard).join('') : '<div class="empty">No wheelsets have been added.</div>';
}

function renderBikeDetail(id) {
  const bike = state.data.bikes.find(item => item.id === id);
  const target = document.getElementById('bikeDetail');
  if (!bike) { target.innerHTML = '<div class="empty">Bike not found.</div>'; return; }
  const complete = profileCompleteness(bike);
  const photo = bike.photo ? `<img src="${esc(bike.photo)}" alt="${esc(`${bike.brand} ${bike.model}`)}" />` : `<div class="placeholder">${ICONS.bikeLarge}</div>`;
  const currentWheelOptions = '<option value="">Not assigned</option>' + state.data.wheelsets.map(wheel => `<option value="${wheel.id}" ${bike.currentWheelsetId === wheel.id ? 'selected' : ''}>${esc(wheel.name)}</option>`).join('');
  const tasks = state.data.maintenance.filter(task => task.bikeId === bike.id && task.status !== 'completed');
  const fit = bike.fit;
  target.innerHTML = `
    <button class="text-button detail-back" data-route="fleet" data-subview="bikes" type="button">← Back to fleet</button>
    <section class="detail-hero">
      <div class="detail-photo">${photo}</div>
      <div class="detail-summary">
        <div><p class="kicker">${esc(bike.category)}</p><h2>${esc(`${bike.year || ''} ${bike.brand} ${bike.model}`.trim())}</h2><p class="meta">Size ${esc(bike.size || 'Unknown')} · ${esc(bike.status || 'Unknown')}</p></div>
        <p>${esc(bike.role || 'Ride role not documented.')}</p>
        <div>${completionBadge(bike)}<div class="progress" style="margin-top:.55rem"><span style="width:${complete.percent}%"></span></div></div>
        <div class="detail-actions"><button class="button edit-bike" data-id="${esc(bike.id)}" type="button">Edit profile</button><button class="button secondary plan-bike" data-id="${esc(bike.id)}" type="button">Plan a ride</button></div>
      </div>
    </section>
    <div class="detail-grid">
      <section class="panel"><div class="section-heading"><div><p class="kicker">Current configuration</p><h2>Core standards</h2></div></div>${definitionList([
        ['Wheel size',bike.wheelSize],['Front axle',bike.axleFront],['Rear axle',bike.axleRear],['Freehub',bike.freehub],['Drivetrain',bike.drivetrainFamily],['Speed',bike.drivetrainSpeed ? `${bike.drivetrainSpeed}-speed` : 'Unknown'],['Brakes',bike.brakes],['Brake fluid',bike.brakeFluid],['Rotor interface',bike.rotorInterface],['Fork',bike.fork],['Shock',bike.shock]
      ])}</section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Modular setup</p><h2>Wheelset assignment</h2></div></div><label><span>Currently installed</span><select id="bikeWheelAssignment" data-bike-id="${esc(bike.id)}">${currentWheelOptions}</select></label><p class="muted" style="margin-top:.75rem">Assignments help Fleet OS show the current build and prevent a wheelset from appearing on two bikes accidentally.</p><button class="button secondary" id="saveWheelAssignment" data-bike-id="${esc(bike.id)}" type="button">Save assignment</button></section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Profile health</p><h2>Missing documentation</h2></div></div>${complete.missing.length ? `<div class="missing-list">${complete.missing.map(item => `<span class="chip warning">${esc(item)}</span>`).join('')}</div>` : '<div class="notice">This profile is fully documented against the current checklist.</div>'}</section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Workshop</p><h2>Open maintenance</h2></div></div>${tasks.length ? `<div class="maintenance-list">${tasks.slice(0,4).map(maintenanceCard).join('')}</div>` : '<div class="empty">No open tasks for this bike.</div>'}</section>
      ${fit ? `<section class="panel wide"><div class="section-heading"><div><p class="kicker">Fit baseline</p><h2>Retül measurements</h2><p>These measurements came from the Chebacco fit and should not be treated as direct mountain-bike prescriptions.</p></div></div>${definitionList([
        ['Saddle height',`${fit.saddleHeightMm} mm`],['Saddle setback',`${Math.abs(fit.saddleSetbackMm)} mm behind BB`],['Saddle angle',`${fit.saddleAngleDeg}° per report convention`],['Stem',`${fit.stemMm} mm · ${fit.stemAngleDeg}°`],['Spacer stack',`${fit.spacerStackMm} mm`],['Crank length',`${fit.crankLengthMm} mm`],['Handlebar stack',`${fit.handlebarStackMm} mm`],['Handlebar reach',`${fit.handlebarReachMm} mm`]
      ])}</section>` : ''}
      <section class="panel wide"><div class="section-heading"><div><p class="kicker">Compatible inventory</p><h2>Spares and wheelsets</h2><p>Rule-based results stay conservative until every relevant standard is documented.</p></div></div>${compatibleGroupsForBike(bike.id)}</section>
      <section class="panel wide"><div class="section-heading"><div><p class="kicker">Build notes</p><h2>Details and history</h2></div></div>${bike.geometryNotes ? `<h3>Geometry</h3><p>${esc(bike.geometryNotes)}</p>` : ''}${bike.buildNotes ? `<h3>Build</h3><p>${esc(bike.buildNotes)}</p>` : ''}<h3>Notes</h3><p>${esc(bike.notes || 'No notes recorded.')}</p></section>
    </div>`;
}
function definitionList(items) {
  return `<dl class="definition-grid">${items.map(([term,value]) => `<div><dt>${esc(term)}</dt><dd>${esc(isKnown(value) ? value : 'Unknown')}</dd></div>`).join('')}</dl>`;
}
function renderWheelDetail(id) {
  const wheel = state.data.wheelsets.find(item => item.id === id);
  const target = document.getElementById('wheelDetail');
  if (!wheel) { target.innerHTML = '<div class="empty">Wheelset not found.</div>'; return; }
  const bikeResults = state.data.bikes.map(bike => ({ bike, result:computeWheelCompatibility(wheel,bike) }));
  const installed = state.data.bikes.filter(bike => bike.currentWheelsetId === wheel.id);
  target.innerHTML = `
    <button class="text-button detail-back" data-route="fleet" data-subview="wheels" type="button">← Back to wheelsets</button>
    <section class="detail-hero">
      <div class="detail-photo"><div class="placeholder">${ICONS.wheel}</div></div>
      <div class="detail-summary"><div><p class="kicker">${esc(wheel.category || 'Wheelset')}</p><h2>${esc(wheel.name)}</h2><p class="meta">${esc(wheel.role || 'Role not documented')}</p></div><p>${esc(wheel.tires || 'Tires not documented.')}</p><div class="spec-chips"><span class="chip">${esc(wheel.wheelSize)}</span><span class="chip">${esc(wheel.freehub || 'Freehub ?')}</span><span class="chip">Installed on ${installed.length || 0}</span></div><div class="detail-actions"><button class="button edit-wheel" data-id="${esc(wheel.id)}" type="button">Edit wheelset</button></div></div>
    </section>
    <div class="detail-grid">
      <section class="panel"><div class="section-heading"><div><p class="kicker">Standards</p><h2>Wheel specifications</h2></div></div>${definitionList([
        ['Wheel size',wheel.wheelSize],['Front axle',wheel.axleFront],['Rear axle',wheel.axleRear],['Freehub',wheel.freehub],['Rotor interface',wheel.rotorInterface],['Cassette',wheel.cassette],['Front rotor',wheel.frontRotorMm ? `${wheel.frontRotorMm} mm` : 'Unknown'],['Rear rotor',wheel.rearRotorMm ? `${wheel.rearRotorMm} mm` : 'Unknown']
      ])}</section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Pressure presets</p><h2>Starting points</h2></div></div>${definitionList([['Trail',wheel.pressure?.trail || 'Not recorded'],['Bike park',wheel.pressure?.park || 'Not recorded']])}<div class="notice warning" style="margin-top:1rem">Pressure values are starting points only. Adjust for rider weight, casing, inserts, terrain, and rim-strike history.</div></section>
      <section class="panel wide"><div class="section-heading"><div><p class="kicker">Compatibility</p><h2>Bike-by-bike check</h2></div></div><div class="compat-groups">${bikeResults.map(({bike,result}) => `<div class="compat-group"><div class="compat-item"><strong>${esc(bikeName(bike.id))}</strong><span class="badge ${badgeClass(result.status)}">${esc(statusLabel(result.status))}</span></div><p class="muted">${esc(result.reason)}</p></div>`).join('')}</div></section>
      <section class="panel wide"><div class="section-heading"><div><p class="kicker">Notes</p><h2>Usage guidance</h2></div></div><p>${esc(wheel.notes || 'No notes recorded.')}</p></section>
    </div>`;
}

function partStandard(part) {
  if (part.category === 'Cassette') return [part.speed ? `${part.speed}-speed` : '', part.freehub, part.minCog && part.maxCog ? `${part.minCog}–${part.maxCog}` : ''].filter(Boolean).join(' · ') || 'Not documented';
  if (part.category === 'Chain') return [part.speed ? `${part.speed}-speed` : '', part.chainType, part.drivetrainFamily].filter(Boolean).join(' · ') || 'Not documented';
  if (part.category?.startsWith('Brake')) return [part.brakeSystem, part.fluidType, part.padShape].filter(Boolean).join(' · ') || 'Not documented';
  if (part.category === 'Rotor') return [part.rotorInterface, part.rotorDiameterMm ? `${part.rotorDiameterMm} mm` : '', part.rotorThicknessMm ? `${part.rotorThicknessMm} mm` : ''].filter(Boolean).join(' · ') || 'Not documented';
  if (part.category === 'Tire') return [part.wheelSize, part.tireWidth, part.casing, part.compound].filter(Boolean).join(' · ') || 'Not documented';
  return [part.speed ? `${part.speed}-speed` : '', part.freehub, part.wheelSize, part.brakeSystem].filter(Boolean).join(' · ') || 'Not documented';
}
function renderInventory() {
  const categorySelect = document.getElementById('partCategoryFilter');
  const locationSelect = document.getElementById('partLocationFilter');
  const bikeSelect = document.getElementById('partBikeFilter');
  const oldCategory = categorySelect.value, oldLocation = locationSelect.value, oldBike = bikeSelect.value;
  const categories = [...new Set(state.data.parts.map(part => part.category || 'Other'))].sort();
  const locations = [...new Set(state.data.parts.map(part => part.location || 'Unknown'))].sort();
  categorySelect.innerHTML = '<option value="all">All categories</option>' + categories.map(value => `<option value="${esc(value)}">${esc(value)}</option>`).join('');
  locationSelect.innerHTML = '<option value="all">All locations</option>' + locations.map(value => `<option value="${esc(value)}">${esc(value)}</option>`).join('');
  bikeSelect.innerHTML = '<option value="all">Any bike</option>' + state.data.bikes.map(bike => `<option value="${bike.id}">${esc(bikeName(bike.id))}</option>`).join('');
  categorySelect.value = categories.includes(oldCategory) ? oldCategory : 'all';
  locationSelect.value = locations.includes(oldLocation) ? oldLocation : 'all';
  bikeSelect.value = state.data.bikes.some(bike => bike.id === oldBike) ? oldBike : 'all';
  const search = document.getElementById('partSearch').value.trim().toLowerCase();
  const parts = state.data.parts.filter(part => {
    if (categorySelect.value !== 'all' && part.category !== categorySelect.value) return false;
    if (locationSelect.value !== 'all' && part.location !== locationSelect.value) return false;
    if (search && !JSON.stringify(part).toLowerCase().includes(search)) return false;
    if (bikeSelect.value !== 'all') {
      const bike = state.data.bikes.find(item => item.id === bikeSelect.value);
      const result = computePartCompatibility(part,bike);
      if (!['direct','conditional','emergency'].includes(result.status)) return false;
    }
    return true;
  });
  const totalUnits = parts.reduce((sum,part) => sum + Number(part.quantity || 0),0);
  const low = parts.filter(part => Number(part.quantity || 0) <= 1).length;
  const newCount = parts.filter(part => String(part.condition).toLowerCase() === 'new').length;
  const locationCount = new Set(parts.map(part => part.location)).size;
  document.getElementById('inventorySummary').innerHTML = [
    [totalUnits,'Units in view'],[parts.length,'Inventory records'],[low,'Low / zero stock'],[locationCount,'Storage locations']
  ].map(([value,label]) => `<div class="summary-card"><strong>${value}</strong><span>${esc(label)}</span></div>`).join('');
  if (!parts.length) { document.getElementById('inventoryTableWrap').innerHTML = '<div class="empty">No parts match these filters.</div>'; return; }
  const desktop = `<div class="table-wrap inventory-desktop"><table><thead><tr><th>Component</th><th>Category</th><th>Quantity</th><th>Condition</th><th>Location</th><th>Key standard</th><th>Compatibility</th><th>Actions</th></tr></thead><tbody>${parts.map(part => {
    const compatibleCount = state.data.bikes.filter(bike => ['direct','conditional','emergency'].includes(computePartCompatibility(part,bike).status)).length;
    return `<tr><td><strong>${esc(`${part.brand || ''} ${part.model || ''}`.trim())}</strong><div class="muted">${esc(part.notes || '')}</div></td><td>${esc(part.category)}</td><td>${quantityControl(part)}</td><td>${esc(part.condition || 'Unknown')}</td><td>${esc(part.location || 'Unknown')}</td><td>${esc(partStandard(part))}</td><td>${compatibleCount} bike${compatibleCount === 1 ? '' : 's'}</td><td><button class="button small secondary edit-part" data-id="${part.id}" type="button">Edit</button></td></tr>`;
  }).join('')}</tbody></table></div>`;
  const mobile = `<div class="inventory-mobile">${parts.map(part => {
    const fits = state.data.bikes.filter(bike => ['direct','conditional','emergency'].includes(computePartCompatibility(part,bike).status)).map(bike => bike.brand + ' ' + bike.model);
    return `<article class="inventory-card"><header><div><p class="kicker">${esc(part.category)}</p><h3>${esc(`${part.brand || ''} ${part.model || ''}`.trim())}</h3></div><span class="badge ${Number(part.quantity || 0) <= 1 ? 'warning' : 'success'}">${Number(part.quantity || 0)} owned</span></header><div class="spec-chips"><span class="chip">${esc(partStandard(part))}</span><span class="chip">${esc(part.location || 'Unknown')}</span></div><div class="row"><span>Quantity</span>${quantityControl(part)}</div><div class="row"><span>Fits</span><strong>${esc(fits.length ? fits.join(', ') : 'No verified bike')}</strong></div><button class="button secondary edit-part" data-id="${part.id}" type="button">Edit component</button></article>`;
  }).join('')}</div>`;
  document.getElementById('inventoryTableWrap').innerHTML = desktop + mobile;
}
function quantityControl(part) {
  return `<span class="qty-control"><button class="qty-change" data-id="${part.id}" data-delta="-1" type="button" aria-label="Decrease ${esc(part.model)} quantity">−</button><span>${Number(part.quantity || 0)}</span><button class="qty-change" data-id="${part.id}" data-delta="1" type="button" aria-label="Increase ${esc(part.model)} quantity">+</button></span>`;
}

function manualOverride(part, bike) { return part?.overrides?.[bike.id] || state.data.compatibilityOverrides?.[`${part?.id}::${bike.id}`] || null; }
function criterion(label, status, detail) { return { label, status, detail }; }
function summarizeCriteria(criteria, defaultReason) {
  if (criteria.some(item => item.status === 'not')) return { status:'not', reason:criteria.find(item => item.status === 'not').detail || defaultReason };
  if (criteria.every(item => item.status === 'direct')) return { status:'direct', reason:defaultReason };
  if (criteria.some(item => item.status === 'conditional')) return { status:'conditional', reason:defaultReason };
  return { status:'unknown', reason:defaultReason };
}
function textMatches(a,b) { return isKnown(a) && isKnown(b) && String(a).trim().toLowerCase() === String(b).trim().toLowerCase(); }
function familyCompatible(partFamily,bikeFamily) {
  if (!isKnown(partFamily) || !isKnown(bikeFamily)) return null;
  const p = String(partFamily).toLowerCase(); const b = String(bikeFamily).toLowerCase();
  return b.includes(p) || p.includes(b) || (p.includes('shimano') && b.includes('shimano')) || (p.includes('sram eagle') && b.includes('sram') && b.includes('eagle'));
}
function computePartCompatibility(part,bike) {
  const manual = manualOverride(part,bike);
  if (manual) return { ...manual, source:'Manual verification', criteria:[criterion('Manual verification','direct',`${manual.method || 'Verified'}${manual.verifiedDate ? ` on ${formatDate(manual.verifiedDate)}` : ''}`)] };
  if (!part || !bike) return { status:'unknown', reason:'Select a component and bike.', source:'Rule-based', criteria:[] };
  const category = part.category || 'Other';
  let criteria = [];
  if (category === 'Chain') {
    criteria = [
      criterion('Speed', !part.speed || !bike.drivetrainSpeed ? 'unknown' : Number(part.speed) === Number(bike.drivetrainSpeed) ? 'direct' : 'not', !part.speed || !bike.drivetrainSpeed ? 'Chain or bike speed is missing.' : `${part.speed}-speed chain vs ${bike.drivetrainSpeed}-speed drivetrain.`),
      criterion('Drivetrain family', familyCompatible(part.drivetrainFamily,bike.drivetrainFamily) === null ? 'unknown' : familyCompatible(part.drivetrainFamily,bike.drivetrainFamily) ? 'direct' : 'conditional', !isKnown(part.drivetrainFamily) ? 'Chain family is not documented.' : `${part.drivetrainFamily} compared with ${bike.drivetrainFamily}.`),
      criterion('Required length', 'unknown', 'Chain length must be sized on the bike before installation.')
    ];
    const summary = summarizeCriteria(criteria,'Speed is compatible; verify chain family, connecting link, and required length.');
    if (summary.status === 'unknown' && criteria[0].status === 'direct') summary.status = 'conditional';
    return { ...summary, source:'Rule-based', criteria };
  }
  if (category === 'Cassette') {
    criteria = [
      criterion('Speed', !part.speed || !bike.drivetrainSpeed ? 'unknown' : Number(part.speed) === Number(bike.drivetrainSpeed) ? 'direct' : 'not', !part.speed || !bike.drivetrainSpeed ? 'Cassette or bike speed is missing.' : `${part.speed}-speed cassette vs ${bike.drivetrainSpeed}-speed drivetrain.`),
      criterion('Freehub', !isKnown(part.freehub) || !isKnown(bike.freehub) ? 'unknown' : textMatches(part.freehub,bike.freehub) ? 'direct' : 'not', !isKnown(part.freehub) || !isKnown(bike.freehub) ? 'Cassette or bike freehub is missing.' : `${part.freehub} cassette vs ${bike.freehub} freehub.`),
      criterion('Derailleur capacity', !part.maxCog || !bike.maxCassetteCog ? 'unknown' : Number(part.maxCog) <= Number(bike.maxCassetteCog) ? 'direct' : 'not', !part.maxCog || !bike.maxCassetteCog ? 'Maximum cog or bike derailleur capacity is not documented.' : `${part.maxCog}T cassette vs ${bike.maxCassetteCog}T documented maximum.`),
      criterion('Chain family', 'unknown', 'Confirm chain and cassette generation compatibility.')
    ];
    const summary = summarizeCriteria(criteria,'Speed and interface may fit; verify derailleur capacity, chain family, and indexing.');
    if (summary.status === 'unknown' && criteria.slice(0,2).every(item => item.status === 'direct')) summary.status = 'conditional';
    return { ...summary, source:'Rule-based', criteria };
  }
  if (category === 'Tire') {
    criteria = [
      criterion('Wheel size', !isKnown(part.wheelSize) || !isKnown(bike.wheelSize) ? 'unknown' : textMatches(part.wheelSize,bike.wheelSize) ? 'direct' : 'not', `${part.wheelSize || 'Unknown'} tire vs ${bike.wheelSize || 'Unknown'} bike.`),
      criterion('Frame clearance', 'unknown', 'Maximum tire clearance and measured casing width are not fully documented.'),
      criterion('Intended use', 'conditional', 'Casing and compound should match the terrain and rim width.')
    ];
    const summary = summarizeCriteria(criteria,'Wheel size must match; clearance and rim-width suitability still require verification.');
    if (summary.status === 'unknown' && criteria[0].status === 'direct') summary.status = 'conditional';
    return { ...summary, source:'Rule-based', criteria };
  }
  if (category === 'Rotor') {
    criteria = [
      criterion('Rotor interface', !isKnown(part.rotorInterface) || !isKnown(bike.rotorInterface) ? 'unknown' : textMatches(part.rotorInterface,bike.rotorInterface) ? 'direct' : 'not', `${part.rotorInterface || 'Unknown'} rotor vs ${bike.rotorInterface || 'Unknown'} hub interface.`),
      criterion('Diameter', 'unknown', 'Frame/fork mount and adapter requirements are not fully documented.'),
      criterion('Thickness', 'unknown', 'Confirm rotor thickness is supported by the brake caliper.')
    ];
    const summary = summarizeCriteria(criteria,'Rotor interface, diameter, thickness, and adapter requirements must all be verified.');
    if (summary.status === 'unknown' && criteria[0].status === 'direct') summary.status = 'conditional';
    return { ...summary, source:'Rule-based', criteria };
  }
  if (category.startsWith('Brake')) {
    const brandToken = String(part.brakeSystem || '').toLowerCase().split(/\s+/)[0];
    const brakeMatch = brandToken && String(bike.brakes || '').toLowerCase().includes(brandToken);
    criteria = [
      criterion('Brake family', !isKnown(part.brakeSystem) || !isKnown(bike.brakes) ? 'unknown' : brakeMatch ? 'direct' : 'not', `${part.brakeSystem || 'Unknown'} component vs ${bike.brakes || 'Unknown'} brakes.`),
      criterion('Fluid', !isKnown(part.fluidType) || !isKnown(bike.brakeFluid) ? 'unknown' : textMatches(part.fluidType,bike.brakeFluid) ? 'direct' : 'not', `${part.fluidType || 'Unknown'} vs ${bike.brakeFluid || 'Unknown'}.`),
      criterion('Exact model / shape', part.padShape ? 'conditional' : 'unknown', part.padShape ? `Pad or hardware family recorded as ${part.padShape}; confirm exact model.` : 'Exact pad shape or hardware model is missing.')
    ];
    const summary = summarizeCriteria(criteria,'Brake family and fluid must match; exact consumable shape or hose hardware still needs confirmation.');
    if (summary.status === 'unknown' && criteria[0].status === 'direct') summary.status = 'conditional';
    return { ...summary, source:'Rule-based', criteria };
  }
  return { status:'unknown', reason:'No automatic rule exists for this component category. Add a manual verification.', source:'Rule-based', criteria:[criterion('Automatic rule','unknown',`No rule is defined for ${category}.`)] };
}
function computeWheelCompatibility(wheel,bike) {
  const criteria = [
    criterion('Wheel size', !isKnown(wheel.wheelSize) || !isKnown(bike.wheelSize) ? 'unknown' : textMatches(wheel.wheelSize,bike.wheelSize) ? 'direct' : 'not', `${wheel.wheelSize || 'Unknown'} wheel vs ${bike.wheelSize || 'Unknown'} bike.`),
    criterion('Front axle', !isKnown(wheel.axleFront) || !isKnown(bike.axleFront) ? 'unknown' : textMatches(wheel.axleFront,bike.axleFront) ? 'direct' : 'not', `${wheel.axleFront || 'Unknown'} vs ${bike.axleFront || 'Unknown'}.`),
    criterion('Rear axle', !isKnown(wheel.axleRear) || !isKnown(bike.axleRear) ? 'unknown' : textMatches(wheel.axleRear,bike.axleRear) ? 'direct' : 'not', `${wheel.axleRear || 'Unknown'} vs ${bike.axleRear || 'Unknown'}.`),
    criterion('Freehub', !isKnown(wheel.freehub) || !isKnown(bike.freehub) ? 'unknown' : textMatches(wheel.freehub,bike.freehub) ? 'direct' : 'conditional', `${wheel.freehub || 'Unknown'} wheel vs ${bike.freehub || 'Unknown'} bike.`),
    criterion('Rotor interface / offset', !isKnown(wheel.rotorInterface) || !isKnown(bike.rotorInterface) ? 'unknown' : textMatches(wheel.rotorInterface,bike.rotorInterface) ? 'direct' : 'conditional', 'Rotor interface, diameter, and caliper alignment must be checked.'),
    criterion('Tire clearance', 'unknown', 'Confirm mounted tire width and frame/fork clearance.')
  ];
  const summary = summarizeCriteria(criteria,'Core wheel standards align; cassette, rotors, caliper alignment, and tire clearance still need verification.');
  if (summary.status === 'unknown' && criteria.slice(0,3).every(item => item.status === 'direct')) summary.status = 'conditional';
  if (summary.status === 'direct') summary.status = 'conditional';
  return { ...summary, source:'Rule-based', criteria };
}
function getComponent(token) {
  const [type,id] = String(token || '').split(':');
  if (type === 'wheel') return { type:'wheel', item:state.data.wheelsets.find(wheel => wheel.id === id) };
  return { type:'part', item:state.data.parts.find(part => part.id === id) };
}
function componentCompatibility(component,bike) {
  return component.type === 'wheel' ? computeWheelCompatibility(component.item,bike) : computePartCompatibility(component.item,bike);
}
function badgeClass(status) { return status === 'direct' ? 'success' : status === 'not' ? 'danger' : ['conditional','emergency'].includes(status) ? 'warning' : 'unknown'; }
function renderCompatibilitySelectors() {
  const componentSelect = document.getElementById('compatPart');
  const bikeSelect = document.getElementById('compatBike');
  const sparesSelect = document.getElementById('sparesBike');
  const oldComponent = componentSelect.value, oldBike = bikeSelect.value, oldSpares = sparesSelect.value;
  componentSelect.innerHTML = `<optgroup label="Spare components">${state.data.parts.map(part => `<option value="part:${part.id}">${esc(`${part.brand || ''} ${part.model || ''}`.trim())}</option>`).join('')}</optgroup><optgroup label="Wheelsets">${state.data.wheelsets.map(wheel => `<option value="wheel:${wheel.id}">${esc(wheel.name)}</option>`).join('')}</optgroup>`;
  const bikes = state.data.bikes.map(bike => `<option value="${bike.id}">${esc(bikeName(bike.id))}</option>`).join('');
  bikeSelect.innerHTML = bikes; sparesSelect.innerHTML = bikes;
  if ([...componentSelect.options].some(option => option.value === oldComponent)) componentSelect.value = oldComponent;
  if (state.data.bikes.some(bike => bike.id === oldBike)) bikeSelect.value = oldBike;
  if (state.data.bikes.some(bike => bike.id === oldSpares)) sparesSelect.value = oldSpares;
  if (!document.getElementById('overrideDate').value) document.getElementById('overrideDate').value = new Date().toISOString().slice(0,10);
}
function showCompatibility() {
  const component = getComponent(document.getElementById('compatPart').value);
  const bike = state.data.bikes.find(item => item.id === document.getElementById('compatBike').value);
  if (!component.item || !bike) return;
  const result = componentCompatibility(component,bike);
  const name = component.type === 'wheel' ? component.item.name : `${component.item.brand || ''} ${component.item.model || ''}`.trim();
  document.getElementById('compatibilityResult').innerHTML = `<article class="compat-card ${statusClass(result.status)}">
    <div class="compat-summary"><div><p class="kicker">${esc(result.source)}</p><h2>${esc(statusLabel(result.status))}</h2><p><strong>${esc(name)}</strong> → <strong>${esc(bikeName(bike.id))}</strong></p></div><span class="badge ${badgeClass(result.status)}">${esc(statusLabel(result.status))}</span></div>
    <p>${esc(result.reason)}</p>
    <div class="criteria-list">${result.criteria.map(item => `<div class="criterion"><strong>${esc(item.label)}</strong><span class="badge ${badgeClass(item.status)}">${esc(statusLabel(item.status))}</span><p>${esc(item.detail)}</p></div>`).join('')}</div>
  </article>`;
  if (component.type === 'part') {
    const override = manualOverride(component.item,bike);
    document.getElementById('overrideStatus').value = override?.status || result.status;
    document.getElementById('overrideReason').value = override?.reason || '';
    document.getElementById('overrideDate').value = override?.verifiedDate || new Date().toISOString().slice(0,10);
    document.getElementById('overrideMethod').value = override?.method || 'Physical fit check';
  } else {
    document.getElementById('overrideReason').value = 'Wheelset manual overrides are not stored in v1.1. Document the confirmed standards on the wheelset profile.';
  }
}
function compatibleGroupsForBike(bikeId) {
  const bike = state.data.bikes.find(item => item.id === bikeId);
  if (!bike) return '<div class="empty">Bike not found.</div>';
  const records = [
    ...state.data.parts.map(part => ({ name:`${part.brand || ''} ${part.model || ''}`.trim(), result:computePartCompatibility(part,bike), type:'Spare' })),
    ...state.data.wheelsets.map(wheel => ({ name:wheel.name, result:computeWheelCompatibility(wheel,bike), type:'Wheelset' }))
  ];
  const groups = [ ['direct','Direct fit'],['conditional','Conditional'],['emergency','Emergency'],['unknown','Unknown'],['not','Not compatible'] ];
  return `<div class="compat-groups">${groups.map(([status,label]) => {
    const items = records.filter(record => record.result.status === status);
    return `<div class="compat-group"><h3>${esc(label)} <span class="badge ${badgeClass(status)}">${items.length}</span></h3>${items.length ? items.map(record => `<div class="compat-item"><span><strong>${esc(record.name)}</strong><small class="muted" style="display:block">${esc(record.type)}</small></span><span class="badge ${badgeClass(status)}">${esc(statusLabel(status))}</span></div>`).join('') : '<p class="muted">No items in this group.</p>'}</div>`;
  }).join('')}</div>`;
}
function renderCompatibleSpares() {
  const bikeId = document.getElementById('sparesBike').value || state.data.bikes[0]?.id;
  document.getElementById('compatibleSpares').innerHTML = compatibleGroupsForBike(bikeId);
}

function maintenanceCard(task) {
  const priority = task.priority === 'high' ? 'danger' : task.priority === 'medium' ? 'warning' : 'unknown';
  const due = task.dueDate ? formatDate(task.dueDate) : task.dueLabel || 'No due date';
  return `<article class="maintenance-card ${task.status === 'completed' ? 'completed' : ''}">
    <input class="maintenance-check maintenance-toggle" type="checkbox" data-id="${task.id}" ${task.status === 'completed' ? 'checked' : ''} aria-label="Mark ${esc(task.title)} complete" />
    <div><h3>${esc(task.title)}</h3><div class="maintenance-meta"><span>${esc(bikeName(task.bikeId))}</span><span>${esc(due)}</span>${task.repeatDays ? `<span>Repeats every ${task.repeatDays} days</span>` : ''}</div><p class="muted">${esc(task.notes || '')}</p></div>
    <div class="maintenance-actions"><span class="badge ${priority}">${esc(task.priority)}</span><button class="icon-button edit-maintenance" data-id="${task.id}" type="button" aria-label="Edit task">✎</button><button class="icon-button delete-maintenance" data-id="${task.id}" type="button" aria-label="Delete task">×</button></div>
  </article>`;
}
function renderMaintenance() {
  const bikeFilter = document.getElementById('maintenanceBikeFilter');
  const previous = bikeFilter.value;
  bikeFilter.innerHTML = '<option value="all">All bikes</option>' + state.data.bikes.map(bike => `<option value="${bike.id}">${esc(bikeName(bike.id))}</option>`).join('');
  bikeFilter.value = state.data.bikes.some(bike => bike.id === previous) ? previous : 'all';
  const status = document.getElementById('maintenanceStatusFilter').value;
  const priority = document.getElementById('maintenancePriorityFilter').value;
  const tasks = state.data.maintenance.filter(task => (bikeFilter.value === 'all' || task.bikeId === bikeFilter.value) && (status === 'all' || task.status === status) && (priority === 'all' || task.priority === priority)).sort((a,b) => {
    if (a.status !== b.status) return a.status === 'open' ? -1 : 1;
    return prioritySort(a,b);
  });
  document.getElementById('maintenanceList').innerHTML = tasks.length ? `<div class="maintenance-list">${tasks.map(maintenanceCard).join('')}</div>` : '<div class="empty">No maintenance tasks match these filters.</div>';
}
function completeMaintenance(task, completed) {
  task.status = completed ? 'completed' : 'open';
  task.completedDate = completed ? new Date().toISOString().slice(0,10) : '';
  if (completed && Number(task.repeatDays || 0) > 0) {
    const nextDate = new Date(); nextDate.setDate(nextDate.getDate() + Number(task.repeatDays));
    state.data.maintenance.push({ ...task, id:uid('m'), status:'open', completedDate:'', dueDate:nextDate.toISOString().slice(0,10), dueLabel:'' });
    saveData({ toast:'Task completed and next service created', activity:`Completed ${task.title}; created the next recurring task.` });
  } else saveData({ toast:completed ? 'Task completed' : 'Task reopened', activity:`${completed ? 'Completed' : 'Reopened'} maintenance: ${task.title}.` });
}

function buildRideRecommendation(overrides = null) {
  const destination = overrides?.destination || document.getElementById('rideDestination').value;
  const type = overrides?.type || document.getElementById('rideType').value;
  const conditions = overrides?.conditions || document.getElementById('rideConditions').value;
  const priority = overrides?.priority || document.getElementById('ridePriority').value;
  const mileage = Number(overrides?.mileage ?? document.getElementById('rideMileage').value ?? 0);
  const technical = overrides?.technical || document.getElementById('rideTechnical').value;
  const parkDestinations = ['Killington Bike Park','Highland Mountain','Thunder Mountain'];
  const isPark = type === 'lift' || parkDestinations.includes(destination);
  let bike = state.data.bikes.find(item => item.id === (overrides?.bikeId || (isPark ? 'sb140' : 'blur')));
  if (!overrides?.bikeId && !isPark && (technical === 'technical' || priority === 'grip') && mileage < 20) bike = state.data.bikes.find(item => item.id === 'sb140');
  let wheel = state.data.wheelsets.find(item => item.id === (overrides?.wheelId || 'synthesis'));
  if (!overrides?.wheelId && priority === 'speed' && conditions === 'dry' && !isPark) wheel = state.data.wheelsets.find(item => item.id === 'hunt');
  if (!overrides?.wheelId && (conditions !== 'dry' || priority === 'grip' || isPark || technical === 'technical')) wheel = state.data.wheelsets.find(item => item.id === 'raceface');
  if (!bike || !wheel) return;
  const pressure = overrides?.pressure || (isPark ? wheel.pressure?.park : wheel.pressure?.trail) || 'Not recorded';
  const suspension = overrides?.suspension || (bike.id === 'sb140'
    ? (isPark ? 'Fork about 20% sag; shock about 30% sag; compression open; verify rebound on trail.' : 'Fork about 20% sag; shock 28–30% sag; use the climb switch only on smooth climbs.')
    : 'Fork about 20% sag; shock 25–28% sag; keep suspension open for technical descents.');
  const gear = isPark ? 'Full-face helmet, knee and elbow pads, tire plugs, tube, pump, multi-tool, and brake-pad check.' : 'Helmet, tire plugs, tube, pump, multi-tool, quick link, hydration, and weather layer.';
  const recommendation = { id:uid('recommendation'), destination, type, conditions, priority, mileage, technical, bikeId:bike.id, wheelId:wheel.id, pressure, suspension, gear, createdAt:new Date().toISOString() };
  state.currentRecommendation = recommendation;
  document.getElementById('rideResult').innerHTML = `<article class="panel ride-recommendation">
    <div class="recommendation-hero"><p class="kicker">Recommended setup</p><h2>${esc(destination)}</h2><p>${esc(`${technical} terrain · ${conditions} conditions · ${priority} priority`)}</p></div>
    <div class="recommendation-metrics"><div class="recommendation-metric"><span>Bike</span><strong>${esc(bikeName(bike.id))}</strong></div><div class="recommendation-metric"><span>Wheelset</span><strong>${esc(wheel.name)}</strong></div><div class="recommendation-metric"><span>Tire pressure F / R</span><strong>${esc(pressure)}</strong></div><div class="recommendation-metric"><span>Distance</span><strong>${mileage} mi</strong></div></div>
    <div class="recommendation-details">${definitionList([['Suspension',suspension],['Pack',gear]])}<div class="notice warning" style="margin-top:1rem">This is a starting point. Adjust for rider gear, tire casing, inserts, terrain, and actual trail feel.</div></div>
    <div class="recommendation-actions"><button class="button" id="savePresetButton" type="button">Save preset</button><button class="button secondary" id="logRideButton" type="button">Log this ride</button><button class="button secondary" id="printRideButton" type="button">Print setup card</button></div>
  </article>`;
}
function renderRidePresets() {
  document.getElementById('ridePresets').innerHTML = state.data.presets.length ? state.data.presets.map(preset => `<article class="preset-card"><header><div><h3>${esc(preset.name)}</h3><p class="meta">${esc(`${bikeName(preset.bikeId)} · ${wheelName(preset.wheelId)}`)}</p></div><span class="badge">${esc(preset.destination)}</span></header><p class="muted">${esc(preset.pressure || 'Pressure not recorded')}</p><div class="actions"><button class="button small use-preset" data-id="${preset.id}" type="button">Use preset</button><button class="button small secondary delete-preset" data-id="${preset.id}" type="button">Delete</button></div></article>`).join('') : '<div class="empty">No saved presets yet.</div>';
}
function renderRideHistory() {
  const history = [...state.data.rideHistory].sort((a,b) => String(b.date || b.createdAt).localeCompare(String(a.date || a.createdAt))).slice(0,8);
  document.getElementById('rideHistory').innerHTML = history.length ? history.map(ride => `<article class="ride-log-card"><header><div><h3>${esc(ride.destination || ride.trail || 'Ride')}</h3><p class="meta">${esc(formatDate(ride.date || ride.createdAt))} · ${esc(bikeName(ride.bikeId))}</p></div><span class="badge success">${esc(ride.rating ? `${ride.rating}/5` : 'Logged')}</span></header><p class="muted">${esc(ride.notes || `${wheelName(ride.wheelId)} · ${ride.pressure || 'pressure not recorded'}`)}</p></article>`).join('') : '<div class="empty">No rides logged yet.</div>';
}

const STANDARD_OPTIONS = {
  categoryBike: ['XC / Downcountry','Trail / All-mountain','Gravel','All-road / Gravel / CX','Road','Cyclocross','Touring','Commuter','Indoor / Trainer','Other'],
  wheelSize: ['29','27.5','26','700c','650b','Unknown'],
  frontAxle: ['15x110','15x100','12x100','QR','Unknown'],
  rearAxle: ['12x148','12x142','12x157','QR','Unknown'],
  freehub: ['HG','XD','XDR','Micro Spline','Campagnolo','N3W','Unknown'],
  rotorInterface: ['6-bolt','Center Lock','Unknown'],
  fluid: ['Mineral oil','DOT','Cable / mechanical','Unknown'],
  status: ['active','retired','sold'],
  partCategory: ['Cassette','Chain','Brake pads','Brake service','Brake hardware','Rotor','Tire','Derailleur hanger','Bottom bracket','Crank','Other'],
  condition: ['New','Like new','Lightly used','Used — serviceable','Worn','Unknown'],
  location: ['Home','Vermont condo','Ride toolbox','Vehicle','Installed','Other']
};
function optionList(options,value) {
  const values = [...options];
  if (isKnown(value) && !values.includes(String(value))) values.unshift(String(value));
  return values.map(option => `<option value="${esc(option)}" ${String(value ?? '') === option ? 'selected' : ''}>${esc(option)}</option>`).join('');
}
function field(key,label,type='text',options={},record={}) {
  return { key,label,type,record,...options };
}
function editorSections(type,record) {
  if (type === 'bike') return [
    { title:'Identity', fields:[field('brand','Brand','text',{ required:true },record),field('model','Model','text',{ required:true },record),field('year','Year','number',{},record),field('category','Category','select',{ options:STANDARD_OPTIONS.categoryBike },record),field('size','Size','text',{},record),field('status','Status','select',{ options:STANDARD_OPTIONS.status },record),field('role','Primary ride role','text',{ full:true },record),field('photo','Photo path or URL','text',{ full:true, help:'Use a relative path such as assets/images/my-bike.jpg for a photo committed to the repository.' },record)] },
    { title:'Fit and standards', fields:[field('wheelSize','Wheel size','select',{ options:STANDARD_OPTIONS.wheelSize },record),field('axleFront','Front axle','select',{ options:STANDARD_OPTIONS.frontAxle },record),field('axleRear','Rear axle','select',{ options:STANDARD_OPTIONS.rearAxle },record),field('freehub','Freehub','select',{ options:STANDARD_OPTIONS.freehub },record),field('drivetrainSpeed','Drivetrain speed','number',{ unit:'speed' },record),field('drivetrainFamily','Drivetrain family','text',{},record),field('maxCassetteCog','Maximum cassette cog','number',{ unit:'T' },record),field('currentWheelsetId','Installed wheelset','wheel-select',{},record)] },
    { title:'Components', fields:[field('brakes','Brakes','text',{ full:true },record),field('brakeFluid','Brake fluid','select',{ options:STANDARD_OPTIONS.fluid },record),field('rotorInterface','Rotor interface','select',{ options:STANDARD_OPTIONS.rotorInterface },record),field('fork','Fork','text',{ full:true },record),field('shock','Shock / rear suspension','text',{ full:true },record),field('weightLb','Weight','number',{ unit:'lb' },record)] },
    { title:'Ownership and notes', fields:[field('purchaseDate','Purchase date','date',{},record),field('serialNumber','Serial number','text',{},record),field('geometryNotes','Geometry notes','textarea',{ full:true },record),field('buildNotes','Build notes','textarea',{ full:true },record),field('notes','General notes','textarea',{ full:true },record)] }
  ];
  if (type === 'wheel') return [
    { title:'Identity', fields:[field('name','Wheelset name','text',{ required:true },record),field('category','Category','text',{},record),field('role','Primary role','text',{ full:true },record)] },
    { title:'Standards', fields:[field('wheelSize','Wheel size','select',{ options:STANDARD_OPTIONS.wheelSize },record),field('axleFront','Front axle','select',{ options:STANDARD_OPTIONS.frontAxle },record),field('axleRear','Rear axle','select',{ options:STANDARD_OPTIONS.rearAxle },record),field('freehub','Freehub','select',{ options:STANDARD_OPTIONS.freehub },record),field('rotorInterface','Rotor interface','select',{ options:STANDARD_OPTIONS.rotorInterface },record),field('frontRotorMm','Front rotor','number',{ unit:'mm' },record),field('rearRotorMm','Rear rotor','number',{ unit:'mm' },record),field('cassette','Cassette','text',{ full:true },record)] },
    { title:'Tires and presets', fields:[field('tires','Tires','textarea',{ full:true },record),field('trailPressure','Trail pressure F / R','text',{ help:'Example: 20 / 22 psi' },record),field('parkPressure','Bike-park pressure F / R','text',{ help:'Example: 22 / 24 psi' },record),field('notes','Notes','textarea',{ full:true },record)] }
  ];
  if (type === 'part') {
    const category = record.category || 'Other';
    const specific = [];
    if (category === 'Cassette') specific.push(field('speed','Speed count','number',{},record),field('freehub','Freehub','select',{ options:STANDARD_OPTIONS.freehub },record),field('minCog','Smallest cog','number',{ unit:'T' },record),field('maxCog','Largest cog','number',{ unit:'T' },record),field('drivetrainFamily','Drivetrain family','text',{ full:true },record));
    else if (category === 'Chain') specific.push(field('speed','Speed count','number',{},record),field('chainType','Chain type / generation','text',{},record),field('drivetrainFamily','Drivetrain family','text',{ full:true },record));
    else if (category.startsWith('Brake')) specific.push(field('brakeSystem','Brake system / family','text',{},record),field('fluidType','Fluid type','select',{ options:STANDARD_OPTIONS.fluid },record),field('padShape','Pad / hose hardware family','text',{ full:true },record));
    else if (category === 'Rotor') specific.push(field('rotorInterface','Rotor interface','select',{ options:STANDARD_OPTIONS.rotorInterface },record),field('rotorDiameterMm','Diameter','number',{ unit:'mm' },record),field('rotorThicknessMm','Thickness','number',{ unit:'mm', step:'0.1' },record));
    else if (category === 'Tire') specific.push(field('wheelSize','Wheel size','select',{ options:STANDARD_OPTIONS.wheelSize },record),field('tireWidth','Labeled width','text',{ help:'Example: 2.4 or 40 mm' },record),field('casing','Casing','text',{},record),field('compound','Compound','text',{},record));
    else specific.push(field('standard','Key standard / interface','text',{ full:true },record));
    return [
      { title:'Component', fields:[field('category','Category','select',{ options:STANDARD_OPTIONS.partCategory },record),field('brand','Brand','text',{},record),field('model','Model','text',{ full:true, required:true },record)] },
      { title:'Compatibility details', fields:specific },
      { title:'Inventory', fields:[field('quantity','Quantity','number',{ min:'0' },record),field('condition','Condition','select',{ options:STANDARD_OPTIONS.condition },record),field('location','Storage location','select',{ options:STANDARD_OPTIONS.location },record),field('purchaseDate','Purchase date','date',{},record),field('cost','Cost','number',{ unit:'$' },record),field('notes','Notes','textarea',{ full:true },record)] }
    ];
  }
  if (type === 'maintenance') return [
    { title:'Task', fields:[field('bikeId','Bike','bike-select',{},record),field('title','Task','text',{ full:true, required:true },record),field('priority','Priority','select',{ options:['high','medium','low'] },record),field('status','Status','select',{ options:['open','completed'] },record)] },
    { title:'Schedule and history', fields:[field('dueDate','Due date','date',{},record),field('dueLabel','Flexible timing note','text',{ help:'Example: Before first season' },record),field('repeatDays','Repeat interval','number',{ unit:'days', help:'Set to 0 for a one-time task.' },record),field('cost','Service cost','number',{ unit:'$' },record),field('notes','Notes','textarea',{ full:true },record)] }
  ];
  if (type === 'preset') return [ { title:'Saved setup', fields:[field('name','Preset name','text',{ full:true, required:true },record)] } ];
  if (type === 'rideLog') return [
    { title:'Ride', fields:[field('date','Date','date',{},record),field('destination','Trail / destination','text',{ full:true },record),field('rating','Overall rating','select',{ options:['5','4','3','2','1'] },record),field('actualPressure','Actual tire pressure F / R','text',{},record),field('notes','What worked and what should change?','textarea',{ full:true },record)] }
  ];
  return [];
}
function renderField(item) {
  const value = item.record[item.key] ?? '';
  const full = item.full ? 'full' : '';
  const required = item.required ? 'required' : '';
  let control = '';
  if (item.type === 'textarea') control = `<textarea name="${item.key}" ${required}>${esc(value)}</textarea>`;
  else if (item.type === 'select') control = `<select name="${item.key}" ${required}>${optionList(item.options || [], value)}</select>`;
  else if (item.type === 'bike-select') control = `<select name="${item.key}">${state.data.bikes.map(bike => `<option value="${bike.id}" ${value === bike.id ? 'selected' : ''}>${esc(bikeName(bike.id))}</option>`).join('')}</select>`;
  else if (item.type === 'wheel-select') control = `<select name="${item.key}"><option value="">Not assigned</option>${state.data.wheelsets.map(wheel => `<option value="${wheel.id}" ${value === wheel.id ? 'selected' : ''}>${esc(wheel.name)}</option>`).join('')}</select>`;
  else if (item.type === 'date') control = `<span class="date-wrap"><input name="${item.key}" type="date" value="${esc(value)}" /></span>`;
  else if (item.unit) control = `<div class="unit-input"><input name="${item.key}" type="${item.type}" value="${esc(value)}" ${item.min !== undefined ? `min="${item.min}"` : ''} ${item.step ? `step="${item.step}"` : ''} ${required}/><span>${esc(item.unit)}</span></div>`;
  else control = `<input name="${item.key}" type="${item.type}" value="${esc(value)}" ${item.min !== undefined ? `min="${item.min}"` : ''} ${item.step ? `step="${item.step}"` : ''} ${required}/>`;
  return `<label class="${full}"><span>${esc(item.label)}${item.required ? ' *' : ''}</span>${control}${item.help ? `<small class="help-text">${esc(item.help)}</small>` : ''}</label>`;
}
function collectEditorForm() {
  return Object.fromEntries(new FormData(document.getElementById('editorForm')).entries());
}
function renderEditorFields(type,record) {
  document.getElementById('dialogFields').innerHTML = `<div class="editor-sections">${editorSections(type,record).map(section => `<section class="editor-section"><h3>${esc(section.title)}</h3><div class="editor-grid">${section.fields.map(renderField).join('')}</div></section>`).join('')}</div>`;
}
function openEditor(type,record = {}) {
  state.editor = { type, id:record.id || null, base:clone(record) };
  const labels = { bike:'Bike profile', wheel:'Wheelset', part:'Spare component', maintenance:'Maintenance task', preset:'Ride preset', rideLog:'Ride log' };
  document.getElementById('dialogEyebrow').textContent = record.id ? 'Edit record' : 'New record';
  document.getElementById('dialogTitle').textContent = labels[type] || 'Record';
  renderEditorFields(type,record);
  document.getElementById('editorDialog').showModal();
}
function upsert(array,record) {
  const index = array.findIndex(item => item.id === record.id);
  if (index >= 0) array[index] = { ...array[index], ...record }; else array.push(record);
}
function numeric(value) { return value === '' || value === null || value === undefined ? null : Number(value); }
function saveEditor(event) {
  event.preventDefault();
  if (event.submitter?.value === 'cancel') { document.getElementById('editorDialog').close(); state.editor = null; return; }
  if (!state.editor) return;
  const type = state.editor.type;
  const values = collectEditorForm();
  const existing = state.editor.base || {};
  if (type === 'bike') {
    const record = { ...existing, ...values, id:state.editor.id || uid('bike'), year:numeric(values.year), drivetrainSpeed:numeric(values.drivetrainSpeed), maxCassetteCog:numeric(values.maxCassetteCog), weightLb:numeric(values.weightLb), fit:existing.fit };
    upsert(state.data.bikes,record); saveData({ toast:'Bike profile saved', activity:`Updated ${record.brand} ${record.model}.` });
  } else if (type === 'wheel') {
    const record = { ...existing, ...values, id:state.editor.id || uid('wheel'), frontRotorMm:numeric(values.frontRotorMm), rearRotorMm:numeric(values.rearRotorMm), pressure:{ trail:values.trailPressure || '', park:values.parkPressure || '' } };
    delete record.trailPressure; delete record.parkPressure; upsert(state.data.wheelsets,record); saveData({ toast:'Wheelset saved', activity:`Updated wheelset ${record.name}.` });
  } else if (type === 'part') {
    const record = { ...existing, ...values, id:state.editor.id || uid('part'), quantity:Number(values.quantity || 0), speed:numeric(values.speed), minCog:numeric(values.minCog), maxCog:numeric(values.maxCog), rotorDiameterMm:numeric(values.rotorDiameterMm), rotorThicknessMm:numeric(values.rotorThicknessMm), cost:numeric(values.cost), overrides:existing.overrides || {} };
    upsert(state.data.parts,record); saveData({ toast:'Component saved', activity:`Updated inventory: ${record.brand || ''} ${record.model}.` });
  } else if (type === 'maintenance') {
    const record = { ...existing, ...values, id:state.editor.id || uid('m'), repeatDays:Number(values.repeatDays || 0), cost:numeric(values.cost), completedDate:values.status === 'completed' ? existing.completedDate || new Date().toISOString().slice(0,10) : '' };
    upsert(state.data.maintenance,record); saveData({ toast:'Maintenance task saved', activity:`Updated maintenance: ${record.title}.` });
  } else if (type === 'preset') {
    const record = { ...state.currentRecommendation, ...existing, name:values.name, id:state.editor.id || uid('preset') };
    upsert(state.data.presets,record); saveData({ toast:'Ride preset saved', activity:`Saved ride preset ${record.name}.` });
  } else if (type === 'rideLog') {
    const record = { ...state.currentRecommendation, ...existing, ...values, id:state.editor.id || uid('ride'), createdAt:new Date().toISOString() };
    state.data.rideHistory.push(record); saveData({ toast:'Ride logged', activity:`Logged ride at ${record.destination}.` });
  }
  document.getElementById('editorDialog').close(); state.editor = null;
}

function renderDataStatus() {
  const records = state.data.bikes.length + state.data.wheelsets.length + state.data.parts.length + state.data.maintenance.length + state.data.rideHistory.length;
  const lastBackup = backupMeta.lastBackupAt ? formatDate(backupMeta.lastBackupAt, { month:'short', day:'numeric', year:'numeric', hour:'numeric', minute:'2-digit' }) : 'Never';
  document.getElementById('dataStatus').innerHTML = `<div class="data-row"><span>Local records</span><strong>${records}</strong></div><div class="data-row"><span>Last backup</span><strong>${esc(lastBackup)}</strong></div><div class="data-row"><span>Changes since backup</span><strong>${Number(backupMeta.changesSinceBackup || 0)}</strong></div><div class="data-row"><span>Database version</span><strong>${esc(state.data.version || APP_VERSION)}</strong></div>`;
  document.getElementById('themeSelect').value = settings.theme;
}
function exportData() {
  const blob = new Blob([JSON.stringify(state.data,null,2)],{ type:'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a'); link.href = url; link.download = `fleet-os-backup-${new Date().toISOString().slice(0,10)}.json`; link.click();
  setTimeout(() => URL.revokeObjectURL(url),0);
  backupMeta.lastBackupAt = new Date().toISOString(); backupMeta.changesSinceBackup = 0;
  localStorage.setItem(BACKUP_META_KEY,JSON.stringify(backupMeta));
  renderDashboard(); renderDataStatus(); showToast('Backup downloaded','Keep the JSON file somewhere safe.');
}
function previewImport(candidate) {
  const counts = ['bikes','wheelsets','parts','maintenance','presets','rideHistory'].map(key => [key,Array.isArray(candidate[key]) ? candidate[key].length : 0]);
  document.getElementById('importPreview').innerHTML = `<p><strong>Fleet OS ${esc(candidate.version || 'unknown version')}</strong></p><div class="data-status">${counts.map(([key,count]) => `<div class="data-row"><span>${esc(key)}</span><strong>${count}</strong></div>`).join('')}</div>`;
  document.getElementById('importDialog').showModal();
}
function mergeById(current,incoming) {
  const map = new Map(current.map(item => [item.id,item]));
  incoming.forEach(item => { if (!map.has(item.id)) map.set(item.id,item); });
  return [...map.values()];
}
function applyImport(mode) {
  const candidate = migrateData(state.importCandidate);
  if (mode === 'replace') state.data = candidate;
  else {
    ['bikes','wheelsets','parts','maintenance','presets','rideHistory','activity'].forEach(key => { state.data[key] = mergeById(state.data[key] || [],candidate[key] || []); });
  }
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state.data));
  backupMeta.changesSinceBackup += 1; localStorage.setItem(BACKUP_META_KEY,JSON.stringify(backupMeta));
  document.getElementById('importDialog').close(); state.importCandidate = null; renderAll(); showToast(mode === 'replace' ? 'Backup restored' : 'Backup merged');
}

function renderAll() {
  renderDashboard(); renderBikes(); renderWheels(); renderInventory(); renderCompatibilitySelectors(); renderMaintenance(); renderRidePresets(); renderRideHistory(); renderDataStatus();
  renderCompatibleSpares();
  if (state.route === 'bike-detail') renderBikeDetail(parseRoute().id);
  if (state.route === 'wheel-detail') renderWheelDetail(parseRoute().id);
}

function bindEvents() {
  window.addEventListener('hashchange',renderRoute);
  document.addEventListener('click',event => {
    const closeDialog = event.target.closest('.close-dialog');
    if (closeDialog) { document.getElementById('editorDialog').close(); state.editor = null; return; }
    const routeButton = event.target.closest('[data-route]');
    if (routeButton) { go(routeButton.dataset.route,{ subview:routeButton.dataset.subview || '' }); }
    const fleetTab = event.target.closest('[data-fleet-tab]'); if (fleetTab) setFleetTab(fleetTab.dataset.fleetTab);
    const workshopTab = event.target.closest('[data-workshop-tab]'); if (workshopTab) setWorkshopTab(workshopTab.dataset.workshopTab);
    const openBike = event.target.closest('.open-bike'); if (openBike) go('bike-detail',{ id:openBike.dataset.id });
    const openWheel = event.target.closest('.open-wheel'); if (openWheel) go('wheel-detail',{ id:openWheel.dataset.id });
    const editBike = event.target.closest('.edit-bike'); if (editBike) openEditor('bike',state.data.bikes.find(item => item.id === editBike.dataset.id));
    const editWheel = event.target.closest('.edit-wheel'); if (editWheel) openEditor('wheel',state.data.wheelsets.find(item => item.id === editWheel.dataset.id));
    const editPart = event.target.closest('.edit-part'); if (editPart) openEditor('part',state.data.parts.find(item => item.id === editPart.dataset.id));
    const editMaintenance = event.target.closest('.edit-maintenance'); if (editMaintenance) openEditor('maintenance',state.data.maintenance.find(item => item.id === editMaintenance.dataset.id));
    const deleteMaintenance = event.target.closest('.delete-maintenance'); if (deleteMaintenance) {
      const task = state.data.maintenance.find(item => item.id === deleteMaintenance.dataset.id);
      if (task) confirmAction('Delete maintenance task',`Delete “${task.title}”? This cannot be undone.`,() => { state.data.maintenance = state.data.maintenance.filter(item => item.id !== task.id); saveData({ toast:'Task deleted', activity:`Deleted maintenance task ${task.title}.` }); },'Delete task');
    }
    const quantity = event.target.closest('.qty-change'); if (quantity) {
      const part = state.data.parts.find(item => item.id === quantity.dataset.id); if (part) { part.quantity = Math.max(0,Number(part.quantity || 0) + Number(quantity.dataset.delta)); saveData({ toast:'Quantity updated', activity:`Adjusted inventory quantity for ${part.model}.` }); }
    }
    const toggle = event.target.closest('.maintenance-toggle'); if (toggle) { const task = state.data.maintenance.find(item => item.id === toggle.dataset.id); if (task) completeMaintenance(task,toggle.checked); }
    const saveAssignment = event.target.closest('#saveWheelAssignment'); if (saveAssignment) saveWheelAssignment(saveAssignment);
    const planBike = event.target.closest('.plan-bike'); if (planBike) { go('ride'); setTimeout(() => buildRideRecommendation({ bikeId:planBike.dataset.id }),0); }
    const usePreset = event.target.closest('.use-preset'); if (usePreset) { const preset = state.data.presets.find(item => item.id === usePreset.dataset.id); if (preset) { fillRideForm(preset); buildRideRecommendation(preset); go('ride'); } }
    const deletePreset = event.target.closest('.delete-preset'); if (deletePreset) { const preset = state.data.presets.find(item => item.id === deletePreset.dataset.id); if (preset) confirmAction('Delete ride preset',`Delete “${preset.name}”?`,() => { state.data.presets = state.data.presets.filter(item => item.id !== preset.id); saveData({ toast:'Preset deleted', activity:`Deleted ride preset ${preset.name}.` }); },'Delete preset'); }
    if (event.target.closest('#dashboardExport')) exportData();
    if (event.target.closest('#savePresetButton') && state.currentRecommendation) openEditor('preset',{ name:`${state.currentRecommendation.destination} setup` });
    if (event.target.closest('#logRideButton') && state.currentRecommendation) openEditor('rideLog',{ date:new Date().toISOString().slice(0,10), destination:state.currentRecommendation.destination, rating:'5', actualPressure:state.currentRecommendation.pressure, notes:'' });
    if (event.target.closest('#printRideButton')) window.print();
  });

  document.getElementById('addBikeButton').addEventListener('click',() => openEditor('bike',{ status:'active', category:'Other', wheelSize:'Unknown', axleFront:'Unknown', axleRear:'Unknown', freehub:'Unknown', brakeFluid:'Unknown', rotorInterface:'Unknown' }));
  document.getElementById('addWheelButton').addEventListener('click',() => openEditor('wheel',{ wheelSize:'Unknown', axleFront:'Unknown', axleRear:'Unknown', freehub:'Unknown', rotorInterface:'Unknown' }));
  document.getElementById('addPartButton').addEventListener('click',() => openEditor('part',{ category:'Cassette', quantity:1, condition:'New', location:'Home' }));
  document.getElementById('addMaintenanceButton').addEventListener('click',() => openEditor('maintenance',{ bikeId:state.data.bikes[0]?.id || '', priority:'medium', status:'open', repeatDays:0 }));
  document.getElementById('editorForm').addEventListener('submit',saveEditor);
  document.getElementById('dialogFields').addEventListener('change',event => {
    if (state.editor?.type === 'part' && event.target.name === 'category') {
      const values = { ...state.editor.base, ...collectEditorForm(), category:event.target.value };
      state.editor.base = values; renderEditorFields('part',values);
    }
  });
  ['bikeCategoryFilter','bikeStatusFilter','bikeSearch'].forEach(id => document.getElementById(id).addEventListener('input',renderBikes));
  ['partCategoryFilter','partLocationFilter','partBikeFilter','partSearch'].forEach(id => document.getElementById(id).addEventListener('input',renderInventory));
  ['maintenanceBikeFilter','maintenanceStatusFilter','maintenancePriorityFilter'].forEach(id => document.getElementById(id).addEventListener('input',renderMaintenance));
  document.getElementById('checkCompatibility').addEventListener('click',showCompatibility);
  document.getElementById('compatPart').addEventListener('change',showCompatibility);
  document.getElementById('compatBike').addEventListener('change',showCompatibility);
  document.getElementById('sparesBike').addEventListener('change',renderCompatibleSpares);
  document.getElementById('saveOverride').addEventListener('click',() => {
    const component = getComponent(document.getElementById('compatPart').value);
    const bike = state.data.bikes.find(item => item.id === document.getElementById('compatBike').value);
    if (!component.item || !bike) return;
    if (component.type !== 'part') { showToast('Wheelset override not saved','Edit the wheelset standards or document the result in its notes.'); return; }
    component.item.overrides = component.item.overrides || {};
    component.item.overrides[bike.id] = { status:document.getElementById('overrideStatus').value, reason:document.getElementById('overrideReason').value || 'Manual compatibility status saved.', verifiedDate:document.getElementById('overrideDate').value, method:document.getElementById('overrideMethod').value };
    saveData({ toast:'Compatibility verification saved', activity:`Verified ${component.item.model} compatibility with ${bike.brand} ${bike.model}.` }); showCompatibility();
  });
  document.getElementById('buildRide').addEventListener('click',() => buildRideRecommendation());
  document.getElementById('quickExport').addEventListener('click',exportData);
  document.getElementById('exportData').addEventListener('click',exportData);
  document.getElementById('themeSelect').addEventListener('change',event => { applyTheme(event.target.value); showToast(`Theme set to ${event.target.options[event.target.selectedIndex].text}`); });
  document.getElementById('themeCycle').addEventListener('click',() => { const themes=['system','light','dark']; applyTheme(themes[(themes.indexOf(settings.theme)+1)%themes.length]); showToast(`Appearance: ${settings.theme}`); });
  document.getElementById('importData').addEventListener('change',async event => {
    const file = event.target.files?.[0]; if (!file) return;
    try { state.importCandidate = JSON.parse(await file.text()); previewImport(state.importCandidate); } catch { showToast('Import failed','That file is not valid Fleet OS JSON.'); }
    event.target.value = '';
  });
  document.getElementById('closeImport').addEventListener('click',() => document.getElementById('importDialog').close());
  document.getElementById('mergeImport').addEventListener('click',() => applyImport('merge'));
  document.getElementById('replaceImport').addEventListener('click',() => applyImport('replace'));
  document.getElementById('resetData').addEventListener('click',() => confirmAction('Reset local data','This will erase edits on this device and restore the Fleet OS v1.1 sample database.',() => { state.data = clone(seedData); localStorage.setItem(STORAGE_KEY,JSON.stringify(state.data)); backupMeta = { lastBackupAt:'', changesSinceBackup:0 }; localStorage.setItem(BACKUP_META_KEY,JSON.stringify(backupMeta)); renderAll(); showToast('Local data reset'); },'Reset data'));
  document.getElementById('confirmCancel').addEventListener('click',() => { state.confirmAction = null; document.getElementById('confirmDialog').close(); });
  document.getElementById('confirmAction').addEventListener('click',() => { const action = state.confirmAction; state.confirmAction = null; document.getElementById('confirmDialog').close(); if (action) action(); });
  document.addEventListener('change',event => { if (event.target.id === 'bikeWheelAssignment') state.pendingWheelAssignment = event.target.value; });
  document.getElementById('reloadApp').addEventListener('click',() => location.reload());
}
function saveWheelAssignment(button) {
  const bike = state.data.bikes.find(item => item.id === button.dataset.bikeId);
  const select = document.getElementById('bikeWheelAssignment');
  if (!bike || !select) return;
  const wheelId = select.value;
  if (wheelId) state.data.bikes.forEach(other => { if (other.id !== bike.id && other.currentWheelsetId === wheelId) other.currentWheelsetId = null; });
  bike.currentWheelsetId = wheelId || null;
  saveData({ toast:'Wheelset assignment saved', activity:`Assigned ${wheelId ? wheelName(wheelId) : 'no wheelset'} to ${bike.brand} ${bike.model}.` });
}
function fillRideForm(preset) {
  ['Destination','Type','Conditions','Priority','Mileage','Technical'].forEach(suffix => {
    const element = document.getElementById(`ride${suffix}`); const key = suffix.charAt(0).toLowerCase() + suffix.slice(1); if (element && preset[key] !== undefined) element.value = preset[key];
  });
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('service-worker.js').then(registration => {
    registration.addEventListener('updatefound',() => {
      const worker = registration.installing;
      worker?.addEventListener('statechange',() => { if (worker.state === 'installed' && navigator.serviceWorker.controller) document.getElementById('updateBanner').hidden = false; });
    });
  }).catch(error => console.warn('Service worker registration failed.',error));
}

bindEvents();
renderAll();
if (!location.hash) location.hash = '#/home'; else renderRoute();
buildRideRecommendation();
showCompatibility();
registerServiceWorker();
