const STORAGE_KEY = 'fleet-os-v1-data';

const seedData = {
  version: '1.0.0',
  owner: 'Chris Capellini',
  rider: {
    heightIn: 65,
    weightLb: 155,
    fitSource: '2022 Retül fit performed on Parlee Chebacco',
    saddleHeightMm: 669,
    saddleSetbackMm: -52,
    saddleAngleDeg: -1,
    notes: 'Retül fit is a road/gravel baseline, not a direct mountain-bike prescription.'
  },
  bikes: [
    {
      id: 'blur', brand: 'Santa Cruz', model: 'Blur TR', year: 2023, category: 'XC / Downcountry', size: 'Small', status: 'active', completeness: 78,
      role: 'Fast XC, technical trail, long pedal days', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', drivetrainSpeed: 12, drivetrainFamily: 'SRAM Eagle conventional',
      brakes: 'Formula Cura — planned installation', brakeFluid: 'Mineral oil', rotorInterface: 'Unknown',
      fork: 'Fox 34 Step-Cast Performance, 120 mm', shock: 'Fox Float DPS',
      notes: 'Primary pedal bike. Current SRAM Level TL brakes are being replaced with Formula Cura brakes.'
    },
    {
      id: 'sb140', brand: 'Yeti', model: 'SB140 C2 Factory', year: 2024, category: 'Trail / All-mountain', size: 'Small', status: 'active', completeness: 92,
      role: 'Aggressive trail, Killington, rough Vermont terrain', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', drivetrainSpeed: 12, drivetrainFamily: 'SRAM GX Eagle conventional',
      brakes: 'SRAM G2 R', brakeFluid: 'DOT', rotorInterface: 'Unknown',
      fork: 'Fox 36 Factory FIT4, 150 mm', shock: 'Fox Float DPS Factory, 140 mm rear travel',
      notes: 'Purchased used from Ranch Camp for $3,300. Samox Platinum 155 mm cranks, OneUp 150 mm dropper, Crankbrothers Synthesis wheels.'
    },
    {
      id: 'chebacco', brand: 'Parlee', model: 'Chebacco XD', year: 2022, category: 'Gravel', size: 'Small', status: 'active', completeness: 42,
      role: 'Gravel and all-road', wheelSize: '700c', axleFront: 'Unknown', axleRear: 'Unknown', freehub: 'Unknown', drivetrainSpeed: null, drivetrainFamily: 'Not documented',
      brakes: 'Not documented', brakeFluid: 'Unknown', rotorInterface: 'Unknown',
      fork: 'Rigid', shock: 'None',
      notes: 'Retül baseline: 669 mm saddle height, 52 mm setback behind BB, 90 mm 0° stem, 35 mm spacer stack, 170 mm cranks.'
    },
    {
      id: 'z5', brand: 'Parlee', model: 'Z5', year: 2012, category: 'Road', size: 'Unknown', status: 'active', completeness: 14,
      role: 'Road', wheelSize: '700c', axleFront: 'Unknown', axleRear: 'Unknown', freehub: 'Unknown', drivetrainSpeed: null, drivetrainFamily: 'Not documented',
      brakes: 'Not documented', brakeFluid: 'Unknown', rotorInterface: 'Unknown', fork: 'Rigid', shock: 'None',
      notes: 'Stub profile. Specifications and fit to be documented.'
    },
    {
      id: 'wraith', brand: 'Wraith', model: 'Paycheck', year: null, category: 'All-road / Gravel / CX', size: 'Small', status: 'active', completeness: 82,
      role: 'All-road, gravel, cyclocross', wheelSize: '700c', axleFront: 'QR', axleRear: 'QR', freehub: 'HG', drivetrainSpeed: 11, drivetrainFamily: 'Shimano Ultegra 6800',
      brakes: 'Shimano RS785 hydraulic disc', brakeFluid: 'Mineral oil', rotorInterface: '6-bolt', fork: 'ENVE tapered CX disc', shock: 'None',
      notes: 'Matte black steel frame. 53 cm effective top and seat tubes; 71° HTA; 73.5° STA; 430 mm chainstays; 70 mm BB drop. White Industries CX11/Pacenti SL25 wheels, GravelKing SS 40 mm, 50/34, 11-32.'
    }
  ],
  wheelsets: [
    {
      id: 'hunt', name: 'Hunt XC Wide', category: 'XC', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', rotorInterface: 'Unknown',
      tires: 'Schwalbe Racing Ray 2.35 / Racing Ralph 2.35 (measure narrow)', role: 'Maximum speed and climbing efficiency',
      pressure: { trail: '20 / 22 psi', park: 'Not recommended' }, compatibility: ['blur', 'sb140'], notes: 'Best for long pedal days and smoother terrain.'
    },
    {
      id: 'raceface', name: 'RaceFace AR27', category: 'Aggressive trail', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', rotorInterface: 'Unknown',
      tires: 'Continental Kryptotal FR 2.4 Trail Soft / RE 2.4 Trail Endurance', role: 'Maximum grip and rough-terrain confidence',
      pressure: { trail: '20–21 / 22–23 psi', park: '22 / 24 psi' }, compatibility: ['blur', 'sb140'], notes: 'Primary Killington and technical New England setup.'
    },
    {
      id: 'synthesis', name: 'Crankbrothers Synthesis', category: 'Balanced trail', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', rotorInterface: 'Unknown',
      tires: 'Maxxis Minion DHF (size to verify) / Aggressor 2.3', role: 'Everyday trail balance',
      pressure: { trail: '20–21 / 23 psi', park: '22 / 24 psi' }, compatibility: ['blur', 'sb140'], notes: 'Stock SB140 wheelset. Verify exact hub and rotor standards.'
    }
  ],
  parts: [
    { id: 'formula-pads', category: 'Brake pads', brand: 'Formula', model: 'Cura R1 Mega Sintered', quantity: 1, condition: 'New', location: 'Home', speed: null, freehub: null, wheelSize: null, brakeSystem: 'Formula Cura', notes: 'Spare pad set for Blur after Cura installation.', overrides: { blur: { status: 'direct', reason: 'Correct pad family for Formula Cura brakes.' } } },
    { id: 'formula-bleed', category: 'Brake service', brand: 'Formula', model: 'Mineral oil bleed kit', quantity: 1, condition: 'New', location: 'Home', brakeSystem: 'Formula mineral oil', notes: 'For Formula Cura service.', overrides: { blur: { status: 'direct', reason: 'Correct bleed system for Formula Cura.' }, sb140: { status: 'not', reason: 'SB140 SRAM G2 R uses DOT fluid.' } } },
    { id: 'formula-hardware', category: 'Brake hardware', brand: 'Formula', model: 'Olive / insert / O-ring kits', quantity: 1, condition: 'New', location: 'Home', brakeSystem: 'Formula Cura', notes: 'Hydraulic hose installation spares.', overrides: { blur: { status: 'direct', reason: 'Intended for Formula Cura hose installation.' } } },
    { id: 'road-cassettes-stub', category: 'Cassette', brand: 'Mixed', model: 'Road / gravel cassette inventory — details needed', quantity: 0, condition: 'Unknown', location: 'Home', speed: null, freehub: null, notes: 'Add each cassette separately with speed, ratio, and freehub standard.', overrides: {} },
    { id: 'chains-stub', category: 'Chain', brand: 'Mixed', model: 'Spare chain inventory — details needed', quantity: 0, condition: 'Unknown', location: 'Home', speed: null, drivetrainFamily: null, notes: 'Add each chain type separately with speed and drivetrain family.', overrides: {} }
  ],
  maintenance: [
    { id: 'm1', bikeId: 'sb140', title: 'Replace chain', priority: 'high', status: 'open', due: 'Now', notes: 'Seller disclosed chain over 50% worn.' },
    { id: 'm2', bikeId: 'sb140', title: 'Replace rear brake pads', priority: 'high', status: 'open', due: 'Soon', notes: 'Seller disclosed rear pads approximately 75% worn.' },
    { id: 'm3', bikeId: 'sb140', title: 'Inspect front brake pads', priority: 'medium', status: 'open', due: 'Monitor', notes: 'Seller disclosed front pads approximately 25% worn.' },
    { id: 'm4', bikeId: 'blur', title: 'Install Formula Cura brakes', priority: 'medium', status: 'open', due: 'Planned', notes: 'Replace SRAM Level TL brakes.' },
    { id: 'm5', bikeId: 'sb140', title: 'Document Switch Infinity service date', priority: 'low', status: 'open', due: 'Before first season', notes: 'Service history not yet recorded.' }
  ],
  compatibilityOverrides: {},
  rideHistory: []
};

let data = loadData();
let editorState = null;

function clone(value) { return JSON.parse(JSON.stringify(value)); }
function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : clone(seedData);
  } catch {
    return clone(seedData);
  }
}
function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  renderAll();
}
function uid(prefix) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`; }
function esc(value = '') {
  return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
}
function bikeName(id) {
  const bike = data.bikes.find(b => b.id === id);
  return bike ? `${bike.year || ''} ${bike.brand} ${bike.model}`.trim() : 'Unknown bike';
}
function completionBadge(value) {
  const cls = value >= 80 ? 'success' : value >= 40 ? 'warning' : 'unknown';
  return `<span class="badge ${cls}">${value}% documented</span>`;
}
function navigate(view) {
  document.querySelectorAll('.view').forEach(v => v.classList.toggle('active', v.id === `view-${view}`));
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.view === view));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderDashboard() {
  const openTasks = data.maintenance.filter(m => m.status !== 'completed');
  const urgent = openTasks.filter(m => m.priority === 'high').length;
  const knownParts = data.parts.reduce((sum, p) => sum + Number(p.quantity || 0), 0);
  document.getElementById('dashboardMetrics').innerHTML = [
    ['Bikes', data.bikes.length, `${data.bikes.filter(b => b.status === 'active').length} active`],
    ['Wheelsets', data.wheelsets.length, 'Modular across mountain bikes'],
    ['Spare items', knownParts, `${data.parts.length} inventory records`],
    ['Open service', openTasks.length, urgent ? `${urgent} high priority` : 'Nothing urgent']
  ].map(([label, value, note]) => `<article class="metric-card"><div class="label">${label}</div><div class="value">${value}</div><div class="muted">${note}</div></article>`).join('');

  document.getElementById('dashboardBikes').innerHTML = data.bikes.filter(b => b.status === 'active').slice(0, 4).map(b => bikeCard(b, true)).join('');
  document.getElementById('dashboardMaintenance').innerHTML = openTasks.length ? openTasks.slice(0, 5).map(maintenanceItem).join('') : '<div class="empty">No open maintenance tasks.</div>';

  const configs = [
    ['Blur + Hunt', 'XC race car', 'Fastest and lightest configuration.'],
    ['Blur + Synthesis', 'Balanced trail', 'More grip without abandoning efficiency.'],
    ['Blur + RaceFace', 'Technical downcountry', 'Maximum Blur confidence for wet roots and rocks.'],
    ['SB140 + Hunt', 'Marathon trail', 'Possible for long, smoother pedal days; verify casing/rim protection.'],
    ['SB140 + Synthesis', 'Everyday all-mountain', 'Default balanced configuration.'],
    ['SB140 + RaceFace', 'Killington mode', 'Maximum grip, braking traction, and confidence.']
  ];
  document.getElementById('configurationGrid').innerHTML = configs.map(c => `<div class="configuration"><strong>${c[0]}</strong><span class="badge">${c[1]}</span><p class="muted">${c[2]}</p></div>`).join('');
}

function bikeCard(bike, compact = false) {
  return `<article class="entity-card">
    <header>
      <div><p class="eyebrow">${esc(bike.category)}</p><h3>${esc(`${bike.year || ''} ${bike.brand} ${bike.model}`.trim())}</h3><p class="meta">Size ${esc(bike.size || 'Unknown')} · ${esc(bike.role || 'Role not documented')}</p></div>
      ${completionBadge(Number(bike.completeness || 0))}
    </header>
    ${compact ? '' : `<dl class="key-list">
      <div><dt>Drivetrain</dt><dd>${esc(bike.drivetrainFamily || 'Unknown')}</dd></div>
      <div><dt>Brakes</dt><dd>${esc(bike.brakes || 'Unknown')}</dd></div>
      <div><dt>Wheels</dt><dd>${esc(bike.wheelSize || 'Unknown')}</dd></div>
      <div><dt>Freehub</dt><dd>${esc(bike.freehub || 'Unknown')}</dd></div>
    </dl><p class="muted">${esc(bike.notes || '')}</p>`}
    <div class="progress" aria-label="Profile completeness"><span style="width:${Math.min(100, Number(bike.completeness || 0))}%"></span></div>
    ${compact ? '' : `<div class="actions"><button class="button small edit-bike" data-id="${bike.id}">Edit profile</button><button class="button small secondary bike-parts" data-id="${bike.id}">Compatible spares</button></div>`}
  </article>`;
}

function renderBikes() {
  const categorySelect = document.getElementById('bikeCategoryFilter');
  const existing = categorySelect.value;
  const categories = [...new Set(data.bikes.map(b => b.category))].sort();
  categorySelect.innerHTML = '<option value="all">All categories</option>' + categories.map(c => `<option>${esc(c)}</option>`).join('');
  categorySelect.value = categories.includes(existing) ? existing : 'all';

  const category = categorySelect.value;
  const status = document.getElementById('bikeStatusFilter').value;
  const search = document.getElementById('bikeSearch').value.toLowerCase();
  const bikes = data.bikes.filter(b => (category === 'all' || b.category === category) && (status === 'all' || b.status === status) && JSON.stringify(b).toLowerCase().includes(search));
  document.getElementById('bikeGrid').innerHTML = bikes.length ? bikes.map(b => bikeCard(b)).join('') : '<div class="empty">No bikes match these filters.</div>';
}

function wheelCard(w) {
  const compatible = (w.compatibility || []).map(bikeName).join(', ') || 'Not verified';
  return `<article class="entity-card">
    <header><div><p class="eyebrow">${esc(w.category)}</p><h3>${esc(w.name)}</h3><p class="meta">${esc(w.tires)}</p></div><span class="badge">${esc(w.wheelSize)}</span></header>
    <dl class="key-list">
      <div><dt>Role</dt><dd>${esc(w.role)}</dd></div><div><dt>Freehub</dt><dd>${esc(w.freehub || 'Unknown')}</dd></div>
      <div><dt>Trail pressure</dt><dd>${esc(w.pressure?.trail || 'Not recorded')}</dd></div><div><dt>Park pressure</dt><dd>${esc(w.pressure?.park || 'Not recorded')}</dd></div>
      <div><dt>Compatible bikes</dt><dd>${esc(compatible)}</dd></div><div><dt>Rotor interface</dt><dd>${esc(w.rotorInterface || 'Unknown')}</dd></div>
    </dl>
    <p class="muted">${esc(w.notes || '')}</p>
    <div class="actions"><button class="button small edit-wheel" data-id="${w.id}">Edit wheelset</button></div>
  </article>`;
}
function renderWheels() {
  document.getElementById('wheelGrid').innerHTML = data.wheelsets.map(wheelCard).join('');
}

function renderInventory() {
  const catSelect = document.getElementById('partCategoryFilter');
  const locSelect = document.getElementById('partLocationFilter');
  const oldCat = catSelect.value, oldLoc = locSelect.value;
  const categories = [...new Set(data.parts.map(p => p.category))].sort();
  const locations = [...new Set(data.parts.map(p => p.location || 'Unknown'))].sort();
  catSelect.innerHTML = '<option value="all">All categories</option>' + categories.map(c => `<option>${esc(c)}</option>`).join('');
  locSelect.innerHTML = '<option value="all">All locations</option>' + locations.map(c => `<option>${esc(c)}</option>`).join('');
  catSelect.value = categories.includes(oldCat) ? oldCat : 'all';
  locSelect.value = locations.includes(oldLoc) ? oldLoc : 'all';
  const search = document.getElementById('partSearch').value.toLowerCase();
  const parts = data.parts.filter(p => (catSelect.value === 'all' || p.category === catSelect.value) && (locSelect.value === 'all' || p.location === locSelect.value) && JSON.stringify(p).toLowerCase().includes(search));
  if (!parts.length) {
    document.getElementById('inventoryTableWrap').innerHTML = '<div class="empty">No parts match these filters.</div>';
    return;
  }
  document.getElementById('inventoryTableWrap').innerHTML = `<div class="table-wrap"><table>
    <thead><tr><th>Component</th><th>Category</th><th>Qty</th><th>Condition</th><th>Location</th><th>Key standard</th><th>Notes</th><th></th></tr></thead>
    <tbody>${parts.map(p => `<tr>
      <td><strong>${esc(p.brand)} ${esc(p.model)}</strong></td><td>${esc(p.category)}</td><td>${esc(p.quantity)}</td><td>${esc(p.condition)}</td><td>${esc(p.location)}</td>
      <td>${esc(p.speed ? `${p.speed}-speed` : p.freehub || p.brakeSystem || 'Not documented')}</td><td>${esc(p.notes || '')}</td>
      <td><button class="button small edit-part" data-id="${p.id}">Edit</button></td>
    </tr>`).join('')}</tbody></table></div>`;
}

function manualOverride(part, bike) {
  return part.overrides?.[bike.id] || data.compatibilityOverrides?.[`${part.id}::${bike.id}`] || null;
}
function computeCompatibility(part, bike) {
  const manual = manualOverride(part, bike);
  if (manual) return { ...manual, source: 'Manual verification' };

  if (part.category === 'Chain') {
    if (!part.speed || !bike.drivetrainSpeed) return { status: 'unknown', reason: 'Chain speed or bike drivetrain speed is not documented.', source: 'Rule-based' };
    if (Number(part.speed) !== Number(bike.drivetrainSpeed)) return { status: 'not', reason: `${part.speed}-speed chain does not match ${bike.drivetrainSpeed}-speed drivetrain.`, source: 'Rule-based' };
    if (part.drivetrainFamily && bike.drivetrainFamily && !bike.drivetrainFamily.toLowerCase().includes(String(part.drivetrainFamily).toLowerCase())) return { status: 'conditional', reason: 'Speed matches, but drivetrain-family compatibility must be verified.', source: 'Rule-based' };
    return { status: 'direct', reason: 'Speed matches. Confirm chain family and required length before installation.', source: 'Rule-based' };
  }
  if (part.category === 'Cassette') {
    if (!part.speed || !part.freehub || !bike.drivetrainSpeed || !bike.freehub) return { status: 'unknown', reason: 'Need cassette speed, freehub standard, and bike drivetrain details.', source: 'Rule-based' };
    if (Number(part.speed) !== Number(bike.drivetrainSpeed)) return { status: 'not', reason: 'Cassette speed does not match the bike drivetrain.', source: 'Rule-based' };
    if (part.freehub !== bike.freehub) return { status: 'not', reason: `Cassette requires ${part.freehub}; bike is documented as ${bike.freehub}.`, source: 'Rule-based' };
    return { status: 'conditional', reason: 'Speed and freehub match. Verify derailleur capacity, chain compatibility, and gear range.', source: 'Rule-based' };
  }
  if (part.category === 'Wheelset') {
    if (!part.wheelSize || !bike.wheelSize) return { status: 'unknown', reason: 'Wheel size is incomplete.', source: 'Rule-based' };
    if (part.wheelSize !== bike.wheelSize) return { status: 'not', reason: 'Wheel diameter does not match the bike profile.', source: 'Rule-based' };
    if (part.freehub && bike.freehub && part.freehub !== bike.freehub) return { status: 'conditional', reason: 'Wheel size matches, but freehub body differs; a freehub or cassette change may be required.', source: 'Rule-based' };
    return { status: 'conditional', reason: 'Wheel size appears compatible. Confirm axles, rotor interface, rotor diameter, cassette, and tire clearance.', source: 'Rule-based' };
  }
  if (part.category.includes('Brake')) {
    if (part.brakeSystem && bike.brakes && bike.brakes.toLowerCase().includes(part.brakeSystem.toLowerCase().split(' ')[0])) return { status: 'conditional', reason: 'Brake family appears related; verify exact model, pad shape, fluid, and hardware.', source: 'Rule-based' };
    return { status: 'unknown', reason: 'Exact brake model and consumable standard are required.', source: 'Rule-based' };
  }
  return { status: 'unknown', reason: 'No automatic rule exists for this component type. Add a manual verification.', source: 'Rule-based' };
}
function statusLabel(status) {
  return ({ direct: 'Direct fit', conditional: 'Conditional fit', emergency: 'Emergency use', not: 'Not compatible', unknown: 'Unknown' })[status] || 'Unknown';
}
function renderCompatibilitySelectors() {
  const partSel = document.getElementById('compatPart');
  const bikeSel = document.getElementById('compatBike');
  const prevPart = partSel.value, prevBike = bikeSel.value;
  partSel.innerHTML = data.parts.map(p => `<option value="${p.id}">${esc(p.brand)} ${esc(p.model)}</option>`).join('');
  bikeSel.innerHTML = data.bikes.map(b => `<option value="${b.id}">${esc(`${b.year || ''} ${b.brand} ${b.model}`.trim())}</option>`).join('');
  if (data.parts.some(p => p.id === prevPart)) partSel.value = prevPart;
  if (data.bikes.some(b => b.id === prevBike)) bikeSel.value = prevBike;
}
function showCompatibility() {
  const part = data.parts.find(p => p.id === document.getElementById('compatPart').value);
  const bike = data.bikes.find(b => b.id === document.getElementById('compatBike').value);
  if (!part || !bike) return;
  const result = computeCompatibility(part, bike);
  document.getElementById('compatibilityResult').innerHTML = `<article class="compat-card ${result.status}">
    <p class="eyebrow">${esc(result.source)}</p><h2>${statusLabel(result.status)}</h2>
    <p><strong>${esc(part.brand)} ${esc(part.model)}</strong> → <strong>${esc(bikeName(bike.id))}</strong></p>
    <p>${esc(result.reason)}</p>
  </article>`;
  document.getElementById('overrideStatus').value = result.status;
  document.getElementById('overrideReason').value = result.source === 'Manual verification' ? result.reason : '';
}

function maintenanceItem(m) {
  const priorityClass = m.priority === 'high' ? 'danger' : m.priority === 'medium' ? 'warning' : 'unknown';
  return `<div class="maintenance-item ${m.status === 'completed' ? 'completed' : ''}">
    <input type="checkbox" class="maintenance-toggle" data-id="${m.id}" ${m.status === 'completed' ? 'checked' : ''} aria-label="Mark ${esc(m.title)} complete" />
    <div><strong>${esc(m.title)}</strong><div class="muted">${esc(bikeName(m.bikeId))} · ${esc(m.notes || '')}</div></div>
    <div><span class="badge ${priorityClass}">${esc(m.priority)}</span><div class="muted">${esc(m.due || '')}</div></div>
  </div>`;
}
function renderMaintenance() {
  const bikeFilter = document.getElementById('maintenanceBikeFilter');
  const old = bikeFilter.value;
  bikeFilter.innerHTML = '<option value="all">All bikes</option>' + data.bikes.map(b => `<option value="${b.id}">${esc(`${b.brand} ${b.model}`)}</option>`).join('');
  bikeFilter.value = data.bikes.some(b => b.id === old) ? old : 'all';
  const status = document.getElementById('maintenanceStatusFilter').value;
  const tasks = data.maintenance.filter(m => (bikeFilter.value === 'all' || m.bikeId === bikeFilter.value) && (status === 'all' || m.status === status));
  document.getElementById('maintenanceList').innerHTML = tasks.length ? `<section class="panel">${tasks.map(maintenanceItem).join('')}</section>` : '<div class="empty">No maintenance tasks match this filter.</div>';
}

function buildRideRecommendation() {
  const destination = document.getElementById('rideDestination').value;
  const type = document.getElementById('rideType').value;
  const conditions = document.getElementById('rideConditions').value;
  const priority = document.getElementById('ridePriority').value;
  const mileage = Number(document.getElementById('rideMileage').value || 0);
  const isPark = type === 'lift' || ['Killington Bike Park', 'Highland Mountain', 'Thunder Mountain', 'Burke Mountain'].includes(destination);
  let bike = isPark ? data.bikes.find(b => b.id === 'sb140') : data.bikes.find(b => b.id === 'blur');
  if (!isPark && mileage < 18 && priority === 'grip') bike = data.bikes.find(b => b.id === 'sb140');
  let wheel = data.wheelsets.find(w => w.id === 'synthesis');
  if (priority === 'speed' && conditions === 'dry' && !isPark) wheel = data.wheelsets.find(w => w.id === 'hunt');
  if (conditions !== 'dry' || priority === 'grip' || isPark) wheel = data.wheelsets.find(w => w.id === 'raceface');
  if (bike?.id === 'sb140' && wheel?.id === 'hunt' && isPark) wheel = data.wheelsets.find(w => w.id === 'synthesis');
  const pressure = isPark ? (wheel?.pressure?.park || 'Not recorded') : (wheel?.pressure?.trail || 'Not recorded');
  const suspension = bike?.id === 'sb140'
    ? (isPark ? 'Fork ~20% sag; shock ~30% sag; compression open; verify rebound on trail.' : 'Fork ~20% sag; shock 28–30% sag; use climb switch only on smooth climbs.')
    : 'Fork ~20% sag; shock 25–28% sag; open suspension for technical descents.';
  const gear = isPark ? 'Full-face helmet, knee and elbow pads, spare pads, plugs, pump.' : 'Helmet, plugs, tube, pump, multi-tool, quick link, hydration.';
  const caution = pressure.includes('Not recommended') ? 'This wheelset is not recommended for this ride.' : 'Starting point only—adjust for casing, rider gear, terrain, and rim-strike history.';
  document.getElementById('rideResult').innerHTML = `<article class="panel">
    <div class="section-heading"><div><p class="eyebrow">Recommended setup</p><h2>${esc(destination)}</h2></div><span class="badge">${esc(priority)}</span></div>
    <div class="ride-summary">
      <div class="metric-card"><div class="label">Bike</div><div class="viz-stat-value"><strong>${esc(`${bike.brand} ${bike.model}`)}</strong></div></div>
      <div class="metric-card"><div class="label">Wheelset</div><div><strong>${esc(wheel.name)}</strong></div></div>
      <div class="metric-card"><div class="label">Tire pressure F / R</div><div><strong>${esc(pressure)}</strong></div></div>
      <div class="metric-card"><div class="label">Mileage</div><div><strong>${mileage} mi</strong></div></div>
    </div>
    <dl class="key-list"><div><dt>Suspension</dt><dd>${esc(suspension)}</dd></div><div><dt>Pack</dt><dd>${esc(gear)}</dd></div></dl>
    <div class="notice ${pressure.includes('Not recommended') ? 'warning' : ''}">${esc(caution)}</div>
  </article>`;
}

const editorSchemas = {
  bike: [
    ['brand','Brand','text'],['model','Model','text'],['year','Year','number'],['category','Category','text'],['size','Size','text'],['status','Status','select',['active','retired','sold']],
    ['role','Primary role','text'],['wheelSize','Wheel size','text'],['axleFront','Front axle','text'],['axleRear','Rear axle','text'],['freehub','Freehub','text'],
    ['drivetrainSpeed','Drivetrain speed','number'],['drivetrainFamily','Drivetrain family','text'],['brakes','Brakes','text'],['brakeFluid','Brake fluid','text'],['rotorInterface','Rotor interface','text'],
    ['fork','Fork','text'],['shock','Shock / rear suspension','text'],['completeness','Profile completeness %','number'],['notes','Notes','textarea','full']
  ],
  wheel: [
    ['name','Wheelset name','text'],['category','Category','text'],['wheelSize','Wheel size','text'],['axleFront','Front axle','text'],['axleRear','Rear axle','text'],['freehub','Freehub','text'],
    ['rotorInterface','Rotor interface','text'],['tires','Tires','text'],['role','Role','text'],['trailPressure','Trail pressure F / R','text'],['parkPressure','Park pressure F / R','text'],['notes','Notes','textarea','full']
  ],
  part: [
    ['category','Category','text'],['brand','Brand','text'],['model','Model','text'],['quantity','Quantity','number'],['condition','Condition','text'],['location','Location','text'],
    ['speed','Speed count','number'],['freehub','Freehub standard','text'],['wheelSize','Wheel size','text'],['drivetrainFamily','Drivetrain family','text'],['brakeSystem','Brake system / family','text'],['notes','Notes','textarea','full']
  ],
  maintenance: [
    ['bikeId','Bike','bike-select'],['title','Task','text'],['priority','Priority','select',['high','medium','low']],['status','Status','select',['open','completed']],['due','Due','text'],['notes','Notes','textarea','full']
  ]
};
function openEditor(type, record = {}) {
  editorState = { type, id: record.id || null };
  const labels = { bike: 'Bike profile', wheel: 'Wheelset', part: 'Spare component', maintenance: 'Maintenance task' };
  document.getElementById('dialogEyebrow').textContent = record.id ? 'Edit record' : 'New record';
  document.getElementById('dialogTitle').textContent = labels[type];
  document.getElementById('dialogFields').innerHTML = editorSchemas[type].map(([key, label, inputType, extra]) => {
    let value = record[key] ?? '';
    if (type === 'wheel' && key === 'trailPressure') value = record.pressure?.trail || '';
    if (type === 'wheel' && key === 'parkPressure') value = record.pressure?.park || '';
    const cls = extra === 'full' ? 'full' : '';
    if (inputType === 'textarea') return `<label class="${cls}">${label}<textarea name="${key}">${esc(value)}</textarea></label>`;
    if (inputType === 'select') return `<label class="${cls}">${label}<select name="${key}">${extra.map(o => `<option value="${o}" ${value === o ? 'selected' : ''}>${o}</option>`).join('')}</select></label>`;
    if (inputType === 'bike-select') return `<label class="${cls}">${label}<select name="${key}">${data.bikes.map(b => `<option value="${b.id}" ${value === b.id ? 'selected' : ''}>${esc(`${b.brand} ${b.model}`)}</option>`).join('')}</select></label>`;
    return `<label class="${cls}">${label}<input name="${key}" type="${inputType}" value="${esc(value)}" /></label>`;
  }).join('');
  document.getElementById('editorDialog').showModal();
}
function saveEditor(event) {
  event.preventDefault();
  if (!editorState) return;
  const form = new FormData(document.getElementById('editorForm'));
  const obj = Object.fromEntries(form.entries());
  const type = editorState.type;
  if (type === 'bike') {
    obj.year = obj.year ? Number(obj.year) : null; obj.drivetrainSpeed = obj.drivetrainSpeed ? Number(obj.drivetrainSpeed) : null; obj.completeness = Number(obj.completeness || 0);
    obj.id = editorState.id || uid('bike');
    upsert(data.bikes, obj);
  } else if (type === 'wheel') {
    obj.id = editorState.id || uid('wheel'); obj.pressure = { trail: obj.trailPressure, park: obj.parkPressure }; delete obj.trailPressure; delete obj.parkPressure;
    const existing = data.wheelsets.find(w => w.id === obj.id); obj.compatibility = existing?.compatibility || [];
    upsert(data.wheelsets, obj);
  } else if (type === 'part') {
    obj.id = editorState.id || uid('part'); obj.quantity = Number(obj.quantity || 0); obj.speed = obj.speed ? Number(obj.speed) : null;
    const existing = data.parts.find(p => p.id === obj.id); obj.overrides = existing?.overrides || {};
    upsert(data.parts, obj);
  } else if (type === 'maintenance') {
    obj.id = editorState.id || uid('m'); upsert(data.maintenance, obj);
  }
  document.getElementById('editorDialog').close();
  saveData();
}
function upsert(arr, obj) {
  const index = arr.findIndex(item => item.id === obj.id);
  if (index >= 0) arr[index] = { ...arr[index], ...obj }; else arr.push(obj);
}
function renderAll() {
  renderDashboard(); renderBikes(); renderWheels(); renderInventory(); renderCompatibilitySelectors(); renderMaintenance();
}
function exportData() {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = `fleet-os-backup-${new Date().toISOString().slice(0,10)}.json`; a.click();
  URL.revokeObjectURL(url);
}

function bindEvents() {
  document.querySelectorAll('.tab').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.view)));
  document.querySelectorAll('[data-nav]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.nav)));
  document.getElementById('quickExport').addEventListener('click', exportData);
  document.getElementById('exportData').addEventListener('click', exportData);
  document.getElementById('addBikeButton').addEventListener('click', () => openEditor('bike', { status:'active', completeness:10 }));
  document.getElementById('addWheelButton').addEventListener('click', () => openEditor('wheel', {}));
  document.getElementById('addPartButton').addEventListener('click', () => openEditor('part', { quantity:1, condition:'New', location:'Home' }));
  document.getElementById('addMaintenanceButton').addEventListener('click', () => openEditor('maintenance', { priority:'medium', status:'open' }));
  document.getElementById('editorForm').addEventListener('submit', saveEditor);
  ['bikeCategoryFilter','bikeStatusFilter','bikeSearch'].forEach(id => document.getElementById(id).addEventListener('input', renderBikes));
  ['partCategoryFilter','partLocationFilter','partSearch'].forEach(id => document.getElementById(id).addEventListener('input', renderInventory));
  ['maintenanceBikeFilter','maintenanceStatusFilter'].forEach(id => document.getElementById(id).addEventListener('input', renderMaintenance));
  document.getElementById('checkCompatibility').addEventListener('click', showCompatibility);
  document.getElementById('saveOverride').addEventListener('click', () => {
    const part = data.parts.find(p => p.id === document.getElementById('compatPart').value);
    const bike = data.bikes.find(b => b.id === document.getElementById('compatBike').value);
    if (!part || !bike) return;
    part.overrides = part.overrides || {};
    part.overrides[bike.id] = { status: document.getElementById('overrideStatus').value, reason: document.getElementById('overrideReason').value || 'Manual compatibility status saved.' };
    saveData(); showCompatibility();
  });
  document.getElementById('buildRide').addEventListener('click', buildRideRecommendation);
  document.getElementById('importData').addEventListener('change', async event => {
    const file = event.target.files?.[0]; if (!file) return;
    try { data = JSON.parse(await file.text()); saveData(); alert('Fleet OS backup imported.'); } catch { alert('That file is not a valid Fleet OS JSON backup.'); }
    event.target.value = '';
  });
  document.getElementById('resetData').addEventListener('click', () => {
    if (confirm('Reset all local Fleet OS data to the Version 1.0 sample?')) { data = clone(seedData); saveData(); }
  });
  document.addEventListener('click', event => {
    const editBike = event.target.closest('.edit-bike'); if (editBike) openEditor('bike', data.bikes.find(b => b.id === editBike.dataset.id));
    const editWheel = event.target.closest('.edit-wheel'); if (editWheel) openEditor('wheel', data.wheelsets.find(w => w.id === editWheel.dataset.id));
    const editPart = event.target.closest('.edit-part'); if (editPart) openEditor('part', data.parts.find(p => p.id === editPart.dataset.id));
    const bikeParts = event.target.closest('.bike-parts'); if (bikeParts) {
      navigate('compatibility'); document.getElementById('compatBike').value = bikeParts.dataset.id; showCompatibility();
    }
    const toggle = event.target.closest('.maintenance-toggle'); if (toggle) {
      const task = data.maintenance.find(m => m.id === toggle.dataset.id); if (task) { task.status = toggle.checked ? 'completed' : 'open'; saveData(); }
    }
  });
}

bindEvents();
renderAll();
buildRideRecommendation();
if ('serviceWorker' in navigator) navigator.serviceWorker.register('service-worker.js').catch(() => {});
