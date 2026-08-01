'use strict';

const STORAGE_KEY = 'fleet-os-v1-data';
const BACKUP_META_KEY = 'fleet-os-backup-meta';
const SETTINGS_KEY = 'fleet-os-settings';
const APP_VERSION = '1.3.3';

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
    fitDate: '2022-04-07',
    fitBikeId: 'chebacco',
    baselineCrankLengthMm: 170,
    saddleHeightMm: 669,
    saddleSetbackMm: -52,
    saddleAngleDeg: 1,
    saddleToBarReachMm: 490,
    handlebarDropMm: 6,
    gripReachMm: 597,
    gripDropMm: 23,
    bbToGripReachMm: 544,
    handlebarStackMm: 632,
    handlebarReachMm: 438,
    gripWidthMm: 405,
    gripAngleDeg: 29,
    assessment: [
      'Limited ankle range of motion, asymmetric on the left.',
      'Limited hamstring and hip range of motion on both sides.',
      'Significant limitation in forward spinal flexion.',
      'History noted: left knee injury with residual strength loss and right hamstring soreness.'
    ],
    notes: 'This is a road/gravel fit baseline, not a direct mountain-bike prescription. The report defines a negative saddle angle as nose-down, so +1° is slightly nose-up.'
  },
  bikes: [
    {
      id: 'blur', brand: 'Santa Cruz', model: 'Blur TR', year: 2023, category: 'XC / Downcountry', size: 'Small', status: 'active',
      role: 'Fast XC, technical trail, and long pedal days', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', drivetrainSpeed: 12,
      drivetrainFamily: 'SRAM Eagle conventional', maxCassetteCog: null, brakes: 'Formula Cura — planned installation', brakeFluid: 'Mineral oil', rotorInterface: 'Unknown',
      fork: 'Fox 34 Step-Cast Performance, 120 mm', shock: 'Fox Float DPS', currentWheelsetId: null, photo: '', weightLb: null,
      purchaseDate: '', serialNumber: '', geometryNotes: '', buildNotes: '',
      geometry: {
        reachMm: 412.3, stackMm: 587.4, headAngleDeg: 67.1, effectiveSeatAngleDeg: 75.1, seatTubeLengthMm: 405,
        topTubeMm: 568.4, chainstayMm: 430.8, wheelbaseMm: 1125.8, bbDropMm: 32.6, bbHeightMm: 339.9,
        standoverMm: 743.5, headTubeLengthMm: 90, frontCenterMm: 695, forkTravelMm: 120,
        sourceLabel: 'Santa Cruz Blur 4 MY23 support — Blur TR, size S',
        sourceUrl: 'https://www.santacruzbicycles.com/en-eu/pages/product-support/blur-4-my23'
      },
      fit: { crankLengthMm: null, saddleHeightMm: null, saddleSetbackMm: null, saddleAngleDeg: null, stemMm: null, stemAngleDeg: null, spacerStackMm: null, handlebarStackMm: null, handlebarReachMm: null, saddleToBarReachMm: null, handlebarDropMm: null, gripReachMm: null, gripDropMm: null, gripWidthMm: null, notes: '' },
      notes: 'Primary pedal bike. Current SRAM Level brakes are being replaced with Formula Cura brakes.'
    },
    {
      id: 'sb140', brand: 'Yeti', model: 'SB140 C2 Factory', year: 2024, category: 'Trail / All-mountain', size: 'Small', status: 'active',
      role: 'Aggressive trail, Killington, and rough Vermont terrain', wheelSize: '29', axleFront: '15x110', axleRear: '12x148', freehub: 'XD', drivetrainSpeed: 12,
      drivetrainFamily: 'SRAM GX Eagle conventional', maxCassetteCog: 52, brakes: 'SRAM G2 R', brakeFluid: 'DOT', rotorInterface: 'Unknown',
      fork: 'Fox 36 Factory FIT4, 150 mm', shock: 'Fox Float DPS Factory, 140 mm rear travel', currentWheelsetId: 'synthesis', photo: 'assets/images/yeti-sb140.jpg', weightLb: null,
      purchaseDate: '', serialNumber: '', geometryNotes: '',
      geometry: {
        reachMm: 435, stackMm: 614, headAngleDeg: 65.4, effectiveSeatAngleDeg: 77.5, seatTubeLengthMm: 365,
        topTubeMm: 571, chainstayMm: 436, wheelbaseMm: 1184, bbDropMm: null, bbHeightMm: 339,
        standoverMm: 722, headTubeLengthMm: 92, frontCenterMm: 748, forkTravelMm: 150,
        sourceLabel: 'Yeti SB140/LR 2024 owner’s manual — 150 mm fork, size S',
        sourceUrl: 'https://yeticycles.com/cms/media/Zq02ukaF0TcGIqQV_2024_OwnersManual_SB140-073124.pdf'
      },
      fit: { crankLengthMm: 155, saddleHeightMm: null, saddleSetbackMm: null, saddleAngleDeg: null, stemMm: null, stemAngleDeg: null, spacerStackMm: null, handlebarStackMm: null, handlebarReachMm: null, saddleToBarReachMm: null, handlebarDropMm: null, gripReachMm: null, gripDropMm: null, gripWidthMm: null, notes: '' },
      buildNotes: 'Samox Platinum 155 mm cranks, Absolute Black 32T oval ring, OneUp 150 mm dropper, SRAM GX Eagle mechanical drivetrain.',
      notes: 'Purchased used from Ranch Camp for $3,300. Seller disclosed chain and brake-pad wear that should be addressed before hard riding.'
    },
    {
      id: 'chebacco', brand: 'Parlee', model: 'Chebacco XD', year: 2022, category: 'Gravel', size: 'Small', status: 'active',
      role: 'Gravel and all-road', wheelSize: '700c', axleFront: 'Unknown', axleRear: 'Unknown', freehub: 'Unknown', drivetrainSpeed: null,
      drivetrainFamily: 'Not documented', maxCassetteCog: null, brakes: 'Not documented', brakeFluid: 'Unknown', rotorInterface: 'Unknown',
      fork: 'Rigid', shock: 'None', currentWheelsetId: null, photo: '', weightLb: null, purchaseDate: '', serialNumber: '',
      geometryNotes: '', buildNotes: '',
      geometry: {
        reachMm: 363, stackMm: 565, headAngleDeg: null, effectiveSeatAngleDeg: null, seatTubeLengthMm: null,
        topTubeMm: null, chainstayMm: null, wheelbaseMm: null, bbDropMm: null, bbHeightMm: null,
        standoverMm: null, headTubeLengthMm: null, frontCenterMm: null, forkTravelMm: null,
        sourceLabel: 'Retül bicycle measurement — 2022 Chebacco, size S', sourceUrl: ''
      },
      fit: { saddleHeightMm: 669, saddleSetbackMm: -52, saddleAngleDeg: 1, stemMm: 90, stemAngleDeg: 0, spacerStackMm: 35, crankLengthMm: 170, handlebarStackMm: 632, handlebarReachMm: 438, saddleToBarReachMm: 490, handlebarDropMm: 6, gripReachMm: 597, gripDropMm: 23, gripWidthMm: 405, notes: 'Measured during the April 2022 Retül session.' },
      notes: 'Retül fit baseline documented in April 2022. Component build, axle standards, wheels, tires, gearing, and brakes remain to be documented.'
    },
    {
      id: 'z5', brand: 'Parlee', model: 'Z5', year: 2012, category: 'Road', size: 'Unknown', status: 'active',
      role: 'Road', wheelSize: '700c', axleFront: 'Unknown', axleRear: 'Unknown', freehub: 'Unknown', drivetrainSpeed: null,
      drivetrainFamily: 'Not documented', maxCassetteCog: null, brakes: 'Not documented', brakeFluid: 'Unknown', rotorInterface: 'Unknown',
      fork: 'Rigid', shock: 'None', currentWheelsetId: null, photo: '', weightLb: null, purchaseDate: '', serialNumber: '', geometryNotes: '', buildNotes: '',
      geometry: { reachMm:null, stackMm:null, headAngleDeg:null, effectiveSeatAngleDeg:null, seatTubeLengthMm:null, topTubeMm:null, chainstayMm:null, wheelbaseMm:null, bbDropMm:null, bbHeightMm:null, standoverMm:null, headTubeLengthMm:null, frontCenterMm:null, forkTravelMm:null, sourceLabel:'Not documented', sourceUrl:'' },
      fit: { crankLengthMm:null, saddleHeightMm:null, saddleSetbackMm:null, saddleAngleDeg:null, stemMm:null, stemAngleDeg:null, spacerStackMm:null, handlebarStackMm:null, handlebarReachMm:null, saddleToBarReachMm:null, handlebarDropMm:null, gripReachMm:null, gripDropMm:null, gripWidthMm:null, notes:'' },
      notes: 'Stub profile. Specifications, fit, wheels, and maintenance history remain to be documented.'
    },
    {
      id: 'wraith', brand: 'Wraith', model: 'Paycheck', year: null, category: 'All-road / Gravel / CX', size: 'Small', status: 'active',
      role: 'All-road, gravel, and cyclocross', wheelSize: '700c', axleFront: 'QR', axleRear: 'QR', freehub: 'HG', drivetrainSpeed: 11,
      drivetrainFamily: 'Shimano Ultegra 6800', maxCassetteCog: 32, brakes: 'Shimano RS785 hydraulic disc', brakeFluid: 'Mineral oil', rotorInterface: '6-bolt',
      fork: 'ENVE tapered CX disc', shock: 'None', currentWheelsetId: null, photo: '', weightLb: null, purchaseDate: '', serialNumber: '',
      geometryNotes: '53 cm effective top tube; 53 cm effective seat tube; 130 mm head tube; 71° head angle; 73.5° seat angle; 430 mm chainstays; 70 mm BB drop; 732 mm standover.',
      geometry: {
        reachMm: null, stackMm: null, headAngleDeg: 71, effectiveSeatAngleDeg: 73.5, seatTubeLengthMm: 530,
        topTubeMm: 530, chainstayMm: 430, wheelbaseMm: null, bbDropMm: 70, bbHeightMm: null,
        standoverMm: 732, headTubeLengthMm: 130, frontCenterMm: null, forkTravelMm: null,
        sourceLabel: 'Owner-provided Wraith Paycheck geometry', sourceUrl: 'http://wraithfabrication.com/products/the-paycheck#'
      },
      fit: { crankLengthMm:170, saddleHeightMm:null, saddleSetbackMm:null, saddleAngleDeg:null, stemMm:80, stemAngleDeg:10, spacerStackMm:null, handlebarStackMm:null, handlebarReachMm:null, saddleToBarReachMm:null, handlebarDropMm:null, gripReachMm:null, gripDropMm:null, gripWidthMm:420, notes:'' },
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
    { id: 'a1', at: new Date().toISOString(), text: 'Fleet OS upgraded to v1.3 with measurement guides and visual fit diagrams.' },
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
  geometryBikeIds: ['blur','sb140','chebacco'],
  geometryReferenceId: 'blur',
  fitTargetId: 'sb140',
  measurementGuideId: 'saddle-height',
  editor: null,
  currentRecommendation: null,
  importCandidate: null,
  confirmAction: null
};

const MEASUREMENT_GUIDES = [
  {
    id: 'saddle-height',
    label: 'Saddle height',
    group: 'Fit',
    fieldLabel: 'Saddle height (BB to saddle profile)',
    diagram: 'saddleHeight',
    purpose: 'Primary pedaling-extension reference. This is the most important transfer measurement when moving between bikes.',
    definition: 'Distance from the center of the bottom bracket to the midpoint of the saddle’s usable top profile.',
    measureFrom: 'Center of the bottom bracket spindle.',
    measureTo: 'Midpoint of the saddle profile on the rider’s main sitting surface.',
    howTo: [
      'Support the bike upright on a level floor.',
      'Rotate the crank so the bottom-bracket center is easy to sight.',
      'Place the tape at the center of the bottom bracket.',
      'Measure in a straight line to the midpoint of the saddle profile, not to the nose or tail.'
    ],
    tips: [
      'Use the same saddle reference point every time.',
      'Record the saddle model in notes because saddle shape changes the result.',
      'For MTB with a dropper post, measure with the post fully extended and record that state.'
    ]
  },
  {
    id: 'saddle-setback',
    label: 'Saddle setback',
    group: 'Fit',
    fieldLabel: 'Saddle setback',
    diagram: 'saddleSetback',
    purpose: 'Fore-aft reference for seated balance and knee-over-pedal relationship.',
    definition: 'Horizontal distance from a plumb line through the bottom bracket to the front tip of the saddle.',
    measureFrom: 'Vertical line passing through the bottom-bracket center.',
    measureTo: 'Front tip of the saddle.',
    howTo: [
      'Level the bike.',
      'Drop a plumb line through the center of the bottom bracket.',
      'Measure horizontally from that plumb line to the saddle tip.',
      'Record rearward values as negative, matching the Retül convention used in Fleet OS.'
    ],
    tips: [
      'Only compare setback numbers when the saddle model is the same or very similar.',
      'If the saddle has a rounded nose, measure to the most repeatable front point.'
    ]
  },
  {
    id: 'saddle-angle',
    label: 'Saddle angle',
    group: 'Fit',
    fieldLabel: 'Saddle angle',
    diagram: 'saddleAngle',
    purpose: 'Useful for repeating comfort changes when swapping saddles or seatposts.',
    definition: 'Angle of the saddle’s usable top surface relative to the horizon.',
    measureFrom: 'Digital level placed on the main sitting surface of the saddle.',
    measureTo: 'Horizontal / level reference.',
    howTo: [
      'Place the bike on level ground.',
      'Rest a digital angle gauge along the central riding surface of the saddle.',
      'Avoid raised tails or dropped cutouts unless the fitter explicitly measured there.',
      'Record the angle exactly and note the measurement convention if needed.'
    ],
    tips: [
      'The original Retül report notes negative as nose-down. Keep that convention consistent in Fleet OS.',
      'A small difference can matter; use 0.1° resolution when possible.'
    ]
  },
  {
    id: 'crank-length',
    label: 'Crank length',
    group: 'Fit',
    fieldLabel: 'Crank length',
    diagram: 'crankLength',
    purpose: 'Needed for the crank-adjusted saddle-height estimate.',
    definition: 'Distance from the center of the bottom bracket to the center of the pedal spindle.',
    measureFrom: 'Center of the bottom bracket.',
    measureTo: 'Center of the pedal axle.',
    howTo: [
      'Prefer the length printed or etched on the back of the crank arm.',
      'If it is unreadable, measure center-to-center from BB axle to pedal axle.'
    ],
    tips: [
      'Record the actual installed crank, especially if it differs from stock.',
      'This value changes how saddle-height transfer should be estimated.'
    ]
  },
  {
    id: 'handlebar-stack',
    label: 'BB-to-handlebar stack',
    group: 'Fit',
    fieldLabel: 'BB-to-handlebar stack',
    diagram: 'handlebarStack',
    purpose: 'Front-end height reference used heavily for road and gravel cockpit comparison.',
    definition: 'Vertical distance from the center of the bottom bracket to the center of the handlebar.',
    measureFrom: 'Bottom-bracket center.',
    measureTo: 'Center of the handlebar clamp area / handlebar center.',
    howTo: [
      'Measure the BB center height above the floor.',
      'Measure the handlebar-center height above the floor.',
      'Subtract BB height from handlebar height.'
    ],
    tips: [
      'For flat bars, the bar center is still the reference unless you intentionally prefer grip coordinates.',
      'Record spacer stack and bar rise separately so future changes remain traceable.'
    ]
  },
  {
    id: 'handlebar-reach',
    label: 'BB-to-handlebar reach',
    group: 'Fit',
    fieldLabel: 'BB-to-handlebar reach',
    diagram: 'handlebarReach',
    purpose: 'Primary horizontal cockpit reference for drop-bar bikes and a useful repeatability metric for MTBs.',
    definition: 'Horizontal distance from the center of the bottom bracket to the center of the handlebar.',
    measureFrom: 'Plumb line through the bottom-bracket center.',
    measureTo: 'Plumb line through the handlebar center.',
    howTo: [
      'Use a plumb line or laser to mark the BB center on the floor.',
      'Mark the handlebar center on the floor.',
      'Measure the horizontal distance between the two points.'
    ],
    tips: [
      'For drop bars, use the bar center rather than the hood position.',
      'For MTB, this can be complemented by grip reach if hand position matters more than clamp position.'
    ]
  },
  {
    id: 'saddle-to-bar-reach',
    label: 'Saddle-to-bar reach',
    group: 'Fit',
    fieldLabel: 'Saddle-to-bar reach',
    diagram: 'saddleToBarReach',
    purpose: 'Matches the Retül report language and is especially helpful for road/gravel comparison.',
    definition: 'Horizontal distance from the front tip of the saddle to the center of the handlebar.',
    measureFrom: 'Front tip of the saddle.',
    measureTo: 'Center of the handlebar.',
    howTo: [
      'Use a level or horizontal alignment between the two points.',
      'Measure from the saddle tip to the bar center in a horizontal plane.'
    ],
    tips: [
      'This value is sensitive to saddle choice and setback.',
      'Use it together with BB-to-bar reach instead of in isolation.'
    ]
  },
  {
    id: 'handlebar-drop',
    label: 'Handlebar drop',
    group: 'Fit',
    fieldLabel: 'Handlebar drop',
    diagram: 'handlebarDrop',
    purpose: 'Shows how far the handlebar sits above or below the saddle.',
    definition: 'Vertical distance from the saddle profile reference point to the top / center of the handlebar per the report convention.',
    measureFrom: 'Midpoint of the saddle profile.',
    measureTo: 'Top or center of the handlebar using one consistent convention.',
    howTo: [
      'Measure the saddle reference height above the floor.',
      'Measure the bar reference height above the floor.',
      'Subtract one from the other and record the sign convention clearly.'
    ],
    tips: [
      'The Retül PDF states that negative means the bar is below the saddle. Fleet OS keeps the report wording in the label.',
      'Be consistent about whether you use bar top, bar center, or grip trough.'
    ]
  },
  {
    id: 'grip-reach',
    label: 'Saddle-to-grip reach',
    group: 'Fit',
    fieldLabel: 'Saddle-to-grip reach',
    diagram: 'gripReach',
    purpose: 'Especially useful on mountain bikes where the rider’s hands live at the grips rather than a bar center reference.',
    definition: 'Horizontal distance from the front tip of the saddle to the main hand position on the grip.',
    measureFrom: 'Front tip of the saddle.',
    measureTo: 'Trough or midpoint of the grip where the hand rests.',
    howTo: [
      'Pick one exact grip reference point and use it every time.',
      'Measure horizontally from the saddle tip to that point.'
    ],
    tips: [
      'If your grips have a pronounced taper or sweep, note the exact grip point used.',
      'This is often more repeatable for flat bars than saddle-to-bar reach.'
    ]
  },
  {
    id: 'grip-drop',
    label: 'Grip drop',
    group: 'Fit',
    fieldLabel: 'Grip drop',
    diagram: 'gripDrop',
    purpose: 'Shows how high or low the hands sit relative to the saddle.',
    definition: 'Vertical distance from the saddle profile reference point to the chosen grip reference point.',
    measureFrom: 'Midpoint of the saddle profile.',
    measureTo: 'Trough or midpoint of the grip.',
    howTo: [
      'Measure saddle and grip heights above the floor.',
      'Subtract them to get the relative drop.'
    ],
    tips: [
      'Wide bars, backsweep, and roll can all change this number. Record bar and grip setup in notes.',
      'For MTB, this can be more meaningful than bar-center drop.'
    ]
  },
  {
    id: 'grip-width',
    label: 'Grip width',
    group: 'Fit',
    fieldLabel: 'Grip width',
    diagram: 'gripWidth',
    purpose: 'Documents the effective hand spacing at the bars.',
    definition: 'Center-to-center or equivalent repeatable distance between the left and right hand positions.',
    measureFrom: 'Center of the left grip hand position.',
    measureTo: 'Center of the right grip hand position.',
    howTo: [
      'Mark the hand position on each grip.',
      'Measure the distance between those two points.'
    ],
    tips: [
      'If you record bar width rather than grip width, note that clearly in Fit notes.',
      'For drop bars, use the same hood or grip reference each time.'
    ]
  },
  {
    id: 'frame-reach-stack',
    label: 'Frame reach and stack',
    group: 'Geometry',
    fieldLabel: 'Frame reach / stack',
    diagram: 'frameReachStack',
    purpose: 'Core frame geometry references for comparing frame dimensions before cockpit parts are added.',
    definition: 'Reach is horizontal distance and stack is vertical distance from the bottom bracket to the top-center of the head tube.',
    measureFrom: 'Center of the bottom bracket.',
    measureTo: 'Top-center of the head tube.',
    howTo: [
      'Use the manufacturer geometry chart whenever possible.',
      'If measuring manually, identify the top-center of the head tube precisely and treat reach and stack as orthogonal horizontal and vertical distances.'
    ],
    tips: [
      'Frame reach and stack are not the same as your actual handlebar position.',
      'Use these for bike character and sizing comparison, not direct cockpit replication.'
    ]
  },
  {
    id: 'wheelbase',
    label: 'Wheelbase, chainstay, and front center',
    group: 'Geometry',
    fieldLabel: 'Wheelbase / chainstay / front center',
    diagram: 'wheelbase',
    purpose: 'Helps explain stability, weight distribution, and maneuverability.',
    definition: 'Wheelbase is axle-to-axle distance; chainstay is BB to rear axle; front center is BB to front axle.',
    measureFrom: 'Axle or bottom-bracket centers.',
    measureTo: 'The corresponding axle centers.',
    howTo: [
      'Use the geometry chart if available.',
      'If measuring directly, keep the bike upright and measure center-to-center between the indicated points.'
    ],
    tips: [
      'Manufacturers usually publish these values more accurately than home measurement can.',
      'Use all three together when interpreting stability vs agility.'
    ]
  }
];

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
  next.rider = { ...clone(seedData.rider), ...(raw.rider || {}) };
  next.rider.assessment = Array.isArray(raw.rider?.assessment) ? raw.rider.assessment : clone(seedData.rider.assessment);
  next.bikes = Array.isArray(raw.bikes) ? raw.bikes.map(bike => {
    const defaults = seedData.bikes.find(item => item.id === bike.id) || {};
    const merged = {
      ...defaults,
      ...bike,
      geometry: { ...(defaults.geometry || {}), ...(bike.geometry || {}) },
      fit: { ...(defaults.fit || {}), ...(bike.fit || {}) }
    };
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
  if (parsed.route === 'fleet' && ['bikes','wheels','geometry'].includes(parsed.subview)) state.fleetTab = parsed.subview;
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
  state.fleetTab = ['bikes','wheels','geometry'].includes(tab) ? tab : 'bikes';
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

const GEOMETRY_METRICS = [
  { key:'reachMm', label:'Reach', unit:'mm', decimals:1 },
  { key:'stackMm', label:'Stack', unit:'mm', decimals:1 },
  { key:'headAngleDeg', label:'Head-tube angle', unit:'°', decimals:1 },
  { key:'effectiveSeatAngleDeg', label:'Effective seat angle', unit:'°', decimals:1 },
  { key:'topTubeMm', label:'Effective top tube', unit:'mm', decimals:1 },
  { key:'wheelbaseMm', label:'Wheelbase', unit:'mm', decimals:1 },
  { key:'chainstayMm', label:'Chainstay / rear center', unit:'mm', decimals:1 },
  { key:'frontCenterMm', label:'Front center', unit:'mm', decimals:1 },
  { key:'bbDropMm', label:'Bottom-bracket drop', unit:'mm', decimals:1 },
  { key:'bbHeightMm', label:'Bottom-bracket height', unit:'mm', decimals:1 },
  { key:'standoverMm', label:'Standover', unit:'mm', decimals:1 },
  { key:'headTubeLengthMm', label:'Head-tube length', unit:'mm', decimals:1 },
  { key:'seatTubeLengthMm', label:'Seat-tube length', unit:'mm', decimals:1 },
  { key:'forkTravelMm', label:'Fork travel', unit:'mm', decimals:0 }
];

function safeUrl(value) {
  try {
    const url = new URL(value, location.href);
    return ['http:','https:'].includes(url.protocol) ? url.href : '';
  } catch { return ''; }
}
function bikeShortName(bike) { return `${bike.brand} ${bike.model}`; }
function knownNumber(value) { return value !== null && value !== undefined && value !== '' && Number.isFinite(Number(value)); }
function formatMetric(value, metric, includeUnit = true) {
  if (!knownNumber(value)) return '—';
  const numericValue = Number(value);
  const text = numericValue.toLocaleString('en-US', { minimumFractionDigits:0, maximumFractionDigits:metric.decimals ?? 1 });
  return includeUnit ? `${text}${metric.unit === '°' ? '°' : ` ${metric.unit}`}` : text;
}
function formatDelta(value, reference, metric) {
  if (!knownNumber(value) || !knownNumber(reference)) return '';
  const delta = Number(value) - Number(reference);
  if (Math.abs(delta) < 0.05) return 'same';
  const sign = delta > 0 ? '+' : '';
  const text = delta.toLocaleString('en-US', { minimumFractionDigits:0, maximumFractionDigits:metric.decimals ?? 1 });
  return `${sign}${text}${metric.unit === '°' ? '°' : ` ${metric.unit}`}`;
}
function bikeMode(bike) {
  const category = String(bike?.category || '').toLowerCase();
  return /(xc|downcountry|trail|mountain|all-mountain|enduro)/.test(category) ? 'mountain' : 'road';
}
function geometryAvailableCount(bike) {
  return GEOMETRY_METRICS.filter(metric => knownNumber(bike.geometry?.[metric.key])).length;
}
function selectedGeometryBikes() {
  const ids = [...new Set(state.geometryBikeIds.filter(Boolean))];
  return ids.map(id => state.data.bikes.find(bike => bike.id === id)).filter(Boolean);
}
function setSelectOptions(select, options, value, includeNone = false) {
  if (!select) return;
  const none = includeNone ? '<option value="">None</option>' : '';
  select.innerHTML = none + options.map(item => `<option value="${esc(item.id)}">${esc(bikeName(item.id))}</option>`).join('');
  select.value = options.some(item => item.id === value) || (includeNone && value === '') ? value : (includeNone ? '' : options[0]?.id || '');
}
function syncGeometrySelectors() {
  const bikes = state.data.bikes.filter(bike => bike.status !== 'sold');
  const ids = bikes.map(bike => bike.id);
  const fallback = ['blur','sb140','chebacco'].filter(id => ids.includes(id));
  while (fallback.length < 3 && bikes[fallback.length]) fallback.push(bikes[fallback.length].id);
  state.geometryBikeIds = [0,1,2].map((index) => ids.includes(state.geometryBikeIds[index]) ? state.geometryBikeIds[index] : (fallback[index] || ''));
  setSelectOptions(document.getElementById('geometryBikeA'), bikes, state.geometryBikeIds[0]);
  setSelectOptions(document.getElementById('geometryBikeB'), bikes, state.geometryBikeIds[1]);
  setSelectOptions(document.getElementById('geometryBikeC'), bikes, state.geometryBikeIds[2], true);
  const selected = selectedGeometryBikes();
  if (!selected.some(bike => bike.id === state.geometryReferenceId)) state.geometryReferenceId = selected[0]?.id || '';
  setSelectOptions(document.getElementById('geometryReference'), selected, state.geometryReferenceId);
  if (!ids.includes(state.fitTargetId)) state.fitTargetId = ids.includes('sb140') ? 'sb140' : ids[0] || '';
  setSelectOptions(document.getElementById('fitTargetBike'), bikes, state.fitTargetId);
}
function geometrySummaryCard(label, value, detail) {
  return `<article class="summary-card"><span>${esc(label)}</span><strong>${esc(value)}</strong><small>${esc(detail)}</small></article>`;
}
function renderGeometrySummary(bikes, reference) {
  const target = bikes.find(bike => bike.id !== reference?.id) || bikes[0];
  if (!reference || !target) return '<div class="empty">Select at least two bikes to see geometry deltas.</div>';
  const pairs = [
    ['Reach', 'reachMm', 'Horizontal room at the head tube'],
    ['Stack', 'stackMm', 'Vertical height at the head tube'],
    ['Wheelbase', 'wheelbaseMm', 'Overall front-to-rear footprint'],
    ['Head angle', 'headAngleDeg', 'Steering and descending bias']
  ];
  return pairs.map(([label,key,detail]) => {
    const metric = GEOMETRY_METRICS.find(item => item.key === key);
    const value = formatDelta(target.geometry?.[key], reference.geometry?.[key], metric);
    return geometrySummaryCard(`${bikeShortName(target)} vs ${bikeShortName(reference)} · ${label}`, value || 'Unknown', detail);
  }).join('');
}
function renderGeometryPlot(bikes) {
  const plotted = bikes.filter(bike => knownNumber(bike.geometry?.reachMm) && knownNumber(bike.geometry?.stackMm));
  if (!plotted.length) return '<div class="empty">Add reach and stack measurements to create the position map.</div>';
  const width = 680, height = 400, margin = { left:64, right:28, top:30, bottom:58 };
  const reaches = plotted.map(bike => Number(bike.geometry.reachMm));
  const stacks = plotted.map(bike => Number(bike.geometry.stackMm));
  let minX = Math.min(...reaches) - 20, maxX = Math.max(...reaches) + 20;
  let minY = Math.min(...stacks) - 20, maxY = Math.max(...stacks) + 20;
  if (maxX - minX < 80) { const mid=(minX+maxX)/2; minX=mid-40; maxX=mid+40; }
  if (maxY - minY < 80) { const mid=(minY+maxY)/2; minY=mid-40; maxY=mid+40; }
  const x = value => margin.left + ((value - minX) / (maxX - minX)) * (width - margin.left - margin.right);
  const y = value => height - margin.bottom - ((value - minY) / (maxY - minY)) * (height - margin.top - margin.bottom);
  const grid = [];
  for (let i=0;i<=4;i++) {
    const gx = margin.left + i * (width-margin.left-margin.right)/4;
    const gy = margin.top + i * (height-margin.top-margin.bottom)/4;
    const xValue = minX + i*(maxX-minX)/4;
    const yValue = maxY - i*(maxY-minY)/4;
    grid.push(`<line class="geometry-grid-line" x1="${gx}" x2="${gx}" y1="${margin.top}" y2="${height-margin.bottom}"/><text class="geometry-axis-label" x="${gx}" y="${height-margin.bottom+24}" text-anchor="middle">${Math.round(xValue)}</text>`);
    grid.push(`<line class="geometry-grid-line" x1="${margin.left}" x2="${width-margin.right}" y1="${gy}" y2="${gy}"/><text class="geometry-axis-label" x="${margin.left-10}" y="${gy+4}" text-anchor="end">${Math.round(yValue)}</text>`);
  }
  const points = plotted.map((bike,index) => {
    const cx=x(Number(bike.geometry.reachMm)), cy=y(Number(bike.geometry.stackMm));
    const labelY = cy < 58 ? cy + 28 : cy - 16;
    return `<g class="geometry-point-group point-${index}"><circle class="geometry-point" cx="${cx}" cy="${cy}" r="9"/><text class="geometry-point-label" x="${cx}" y="${labelY}" text-anchor="middle">${esc(bikeShortName(bike))}</text><title>${esc(`${bikeShortName(bike)}: ${bike.geometry.reachMm} mm reach, ${bike.geometry.stackMm} mm stack`)}</title></g>`;
  }).join('');
  return `<svg viewBox="0 0 ${width} ${height}" aria-hidden="true"><g>${grid.join('')}</g><line class="geometry-axis" x1="${margin.left}" x2="${width-margin.right}" y1="${height-margin.bottom}" y2="${height-margin.bottom}"/><line class="geometry-axis" x1="${margin.left}" x2="${margin.left}" y1="${margin.top}" y2="${height-margin.bottom}"/><text class="geometry-axis-title" x="${(margin.left+width-margin.right)/2}" y="${height-10}" text-anchor="middle">Reach (mm) → longer</text><text class="geometry-axis-title" transform="translate(18 ${(margin.top+height-margin.bottom)/2}) rotate(-90)" text-anchor="middle">Stack (mm) → taller</text>${points}</svg><p class="geometry-chart-alt">${plotted.map(bike => `${bikeShortName(bike)}: ${bike.geometry.reachMm} mm reach and ${bike.geometry.stackMm} mm stack`).join('. ')}.</p>`;
}
function insightItem(title, text, tone = '') {
  return `<article class="insight-item ${tone}"><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`;
}
function renderGeometryInsights(bikes, reference) {
  const target = bikes.find(bike => bike.id !== reference?.id) || bikes[0];
  if (!reference || !target) return '<div class="empty">Select two bikes for interpretation.</div>';
  const insights = [];
  const delta = key => knownNumber(target.geometry?.[key]) && knownNumber(reference.geometry?.[key]) ? Number(target.geometry[key]) - Number(reference.geometry[key]) : null;
  const reach = delta('reachMm');
  if (reach !== null) insights.push(insightItem('Cockpit room', Math.abs(reach) < 5 ? 'Frame reach is nearly the same. Bar sweep, stem length, and saddle position will create most of the cockpit difference.' : `${bikeShortName(target)} has ${Math.abs(reach).toFixed(1)} mm ${reach > 0 ? 'more' : 'less'} frame reach, generally creating a ${reach > 0 ? 'roomier, more centered' : 'more compact, agile'} standing position.`));
  const stack = delta('stackMm');
  if (stack !== null) insights.push(insightItem('Front-end height', Math.abs(stack) < 5 ? 'Stack is nearly the same before spacers, stem, and bar rise.' : `${bikeShortName(target)} is ${Math.abs(stack).toFixed(1)} mm ${stack > 0 ? 'taller' : 'lower'} at the head tube, before cockpit components are added.`));
  const head = delta('headAngleDeg');
  if (head !== null) insights.push(insightItem('Steering character', Math.abs(head) < .4 ? 'Head angles are very similar.' : `${bikeShortName(target)} is ${Math.abs(head).toFixed(1)}° ${head < 0 ? 'slacker, favoring stability on steep terrain' : 'steeper, favoring quicker steering response'}.`));
  const wheelbase = delta('wheelbaseMm');
  if (wheelbase !== null) insights.push(insightItem('High-speed stability', Math.abs(wheelbase) < 10 ? 'Wheelbases are close enough that tires, suspension, and cockpit setup may dominate the feel.' : `${bikeShortName(target)} is ${Math.abs(wheelbase).toFixed(0)} mm ${wheelbase > 0 ? 'longer and generally more planted' : 'shorter and generally easier to place quickly'}.`));
  const seat = delta('effectiveSeatAngleDeg');
  if (seat !== null) insights.push(insightItem('Climbing position', Math.abs(seat) < .5 ? 'Effective seat angles are similar.' : `${bikeShortName(target)} is ${Math.abs(seat).toFixed(1)}° ${seat > 0 ? 'steeper, moving the seated rider forward for climbing' : 'slacker, placing the seated rider farther behind the bottom bracket'}.`));
  if (bikeMode(reference) !== bikeMode(target)) insights.unshift(insightItem('Cross-category comparison', 'These bikes use different handlebars, postures, and handling priorities. Geometry explains character, but frame reach and stack are not direct fit targets across road, gravel, and mountain bikes.', 'warning'));
  return insights.length ? insights.join('') : '<div class="empty">Add more geometry fields to generate ride interpretation.</div>';
}
function renderGeometryTable(bikes, reference) {
  if (!bikes.length) return '<div class="empty">No bikes selected.</div>';
  const head = bikes.map(bike => `<th scope="col"><strong>${esc(bikeShortName(bike))}</strong><small>${esc(`${bike.year || ''} · ${bike.size || 'size ?'}`)}</small></th>`).join('');
  const body = GEOMETRY_METRICS.map(metric => `<tr><th scope="row">${esc(metric.label)}</th>${bikes.map(bike => {
    const value = bike.geometry?.[metric.key];
    const d = reference && bike.id !== reference.id ? formatDelta(value, reference.geometry?.[metric.key], metric) : '';
    return `<td><strong>${esc(formatMetric(value,metric))}</strong>${d ? `<small class="geometry-delta">${esc(d)} vs reference</small>` : bike.id === reference?.id ? '<small class="geometry-delta reference">Reference</small>' : ''}</td>`;
  }).join('')}</tr>`).join('');
  return `<div class="geometry-table-scroll"><table class="geometry-table"><thead><tr><th>Measurement</th>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}
function baselineMeasurementList() {
  const rider = state.data.rider;
  return definitionList([
    ['Fit source', rider.fitSource],
    ['Fit date', formatDate(rider.fitDate)],
    ['Baseline crank', knownNumber(rider.baselineCrankLengthMm) ? `${rider.baselineCrankLengthMm} mm` : 'Unknown'],
    ['Saddle height', knownNumber(rider.saddleHeightMm) ? `${rider.saddleHeightMm} mm` : 'Unknown'],
    ['Saddle setback', knownNumber(rider.saddleSetbackMm) ? `${Math.abs(rider.saddleSetbackMm)} mm behind BB` : 'Unknown'],
    ['Saddle angle', knownNumber(rider.saddleAngleDeg) ? `${rider.saddleAngleDeg}° per report convention` : 'Unknown'],
    ['BB-to-bar stack', knownNumber(rider.handlebarStackMm) ? `${rider.handlebarStackMm} mm` : 'Unknown'],
    ['BB-to-bar reach', knownNumber(rider.handlebarReachMm) ? `${rider.handlebarReachMm} mm` : 'Unknown'],
    ['Saddle-to-bar reach', knownNumber(rider.saddleToBarReachMm) ? `${rider.saddleToBarReachMm} mm` : 'Unknown'],
    ['Handlebar drop', knownNumber(rider.handlebarDropMm) ? `${rider.handlebarDropMm} mm per report convention` : 'Unknown']
  ]) + `<div class="fit-assessment"><h3>Assessment context</h3><ul>${(rider.assessment || []).map(item => `<li>${esc(item)}</li>`).join('')}</ul></div>`;
}
function fitStatusCard(label, value, confidence, text, tone = '') {
  return `<article class="fit-advice-card ${tone}"><div class="fit-advice-head"><span>${esc(label)}</span><span class="badge ${confidence === 'High' ? 'success' : confidence === 'Medium' ? 'warning' : 'unknown'}">${esc(confidence)} confidence</span></div><strong>${esc(value)}</strong><p>${esc(text)}</p></article>`;
}
function signedMillimeters(value) {
  if (!knownNumber(value)) return 'Unknown';
  const number = Number(value);
  return `${number > 0 ? '+' : ''}${number.toFixed(0)} mm`;
}
function renderFitAdvisor(bike) {
  if (!bike) return '<div class="empty">Choose a bike to evaluate.</div>';
  const rider = state.data.rider;
  const fit = bike.fit || {};
  const mode = bikeMode(bike);
  const cards = [];
  if (knownNumber(rider.saddleHeightMm) && knownNumber(rider.baselineCrankLengthMm) && knownNumber(fit.crankLengthMm)) {
    const target = Number(rider.saddleHeightMm) + (Number(rider.baselineCrankLengthMm) - Number(fit.crankLengthMm));
    const actual = knownNumber(fit.saddleHeightMm) ? Number(fit.saddleHeightMm) : null;
    const difference = actual === null ? null : actual - target;
    const detail = actual === null
      ? `This mechanically preserves the same bottom-of-stroke leg extension when moving from ${rider.baselineCrankLengthMm} mm to ${fit.crankLengthMm} mm cranks. Record the actual saddle height before changing anything.`
      : `Current recorded height is ${actual} mm (${signedMillimeters(difference)} from the estimate). Shoe, pedal, saddle, and riding-category differences can justify a different result.`;
    cards.push(fitStatusCard('Crank-adjusted saddle estimate', `${Math.round(target)} mm`, 'Medium', detail));
  } else {
    cards.push(fitStatusCard('Saddle-height transfer', 'Needs crank length', 'Low', 'Record this bike’s crank length and current BB-to-saddle measurement before calculating a starting point.', 'incomplete'));
  }
  if (mode === 'road') {
    if (knownNumber(fit.handlebarStackMm) && knownNumber(fit.handlebarReachMm)) {
      const stackDelta = Number(fit.handlebarStackMm) - Number(rider.handlebarStackMm);
      const reachDelta = Number(fit.handlebarReachMm) - Number(rider.handlebarReachMm);
      let text = `Compared with the Retül baseline, the bar is ${signedMillimeters(stackDelta)} in stack and ${signedMillimeters(reachDelta)} in reach.`;
      if (stackDelta < -10) text += ' The lower front end may demand more hip, hamstring, and spinal flexion than the fitted Chebacco position.';
      if (reachDelta > 10) text += ' The longer position may increase torso extension and hand load.';
      cards.push(fitStatusCard('Road / gravel cockpit', `${fit.handlebarStackMm} / ${fit.handlebarReachMm} mm`, 'High', text));
    } else {
      cards.push(fitStatusCard('Road / gravel cockpit', 'Measure BB-to-bar stack and reach', 'Low', `The Retül target is ${rider.handlebarStackMm} mm stack and ${rider.handlebarReachMm} mm reach at the center of the handlebar.`, 'incomplete'));
    }
    if (knownNumber(fit.saddleSetbackMm)) {
      const delta = Number(fit.saddleSetbackMm) - Number(rider.saddleSetbackMm);
      cards.push(fitStatusCard('Saddle setback', `${Math.abs(fit.saddleSetbackMm)} mm behind BB`, 'Medium', `This is ${signedMillimeters(delta)} from the fitted Chebacco value. Saddle shape changes the location of the measured front tip, so compare like-for-like.`));
    } else {
      cards.push(fitStatusCard('Saddle setback', 'Not recorded', 'Low', `The Retül report measured the saddle’s front tip 52 mm behind the bottom bracket. Record this bike using the same definition before comparing.`,'incomplete'));
    }
  } else {
    const postureText = knownNumber(fit.handlebarStackMm) && knownNumber(fit.handlebarReachMm)
      ? `Recorded mountain-bike bar position is ${fit.handlebarStackMm} mm stack and ${fit.handlebarReachMm} mm reach. Treat these as this bike’s own baseline; a flat bar and standing position make direct road-fit matching inappropriate.`
      : 'Record BB-to-grip or BB-to-bar measurements after the bike feels stable and comfortable. Do not force the road handlebar coordinates onto a wide flat-bar cockpit.';
    cards.push(fitStatusCard('Mountain-bike cockpit transfer', 'Category-specific setup', 'Low', postureText));
    cards.push(fitStatusCard('Mobility-aware front end', 'Favor comfort before lowering', 'Medium', 'The fit assessment documented limited hip and hamstring motion plus significant limitation in forward spinal flexion. Avoid aggressive reductions in stack; test small changes while preserving control and front-wheel traction.'));
    if (bike.id === 'sb140') cards.push(fitStatusCard('SB140 starting focus', 'Pedaling extension first', 'Medium', 'With 155 mm cranks, establish saddle height and fore-aft comfort before changing stem length or bar rise. Then tune standing balance on familiar terrain.'));
    if (bike.id === 'blur') cards.push(fitStatusCard('Blur starting focus', 'Efficient but not overextended', 'Low', 'Use the Blur’s lower, shorter chassis for speed without copying the Chebacco cockpit. Record crank length, saddle height, stem, spacers, bar rise, and grip coordinates to create a repeatable MTB baseline.'));
  }
  cards.push(fitStatusCard('Change protocol', 'One variable at a time', 'Medium', 'Use small adjustments, document the before-and-after measurement, and repeat the same short test route. Stop if pain, numbness, or loss of control appears.'));
  return `<div class="fit-target-header"><div><p class="kicker">${esc(bike.category)}</p><h3>${esc(bikeName(bike.id))}</h3></div><button class="button small secondary edit-fit-bike" data-id="${esc(bike.id)}" type="button">Record measurements</button></div><div class="fit-advice-grid">${cards.join('')}</div>`;
}

function measurementGuideSelectHtml() {
  const groups = {};
  MEASUREMENT_GUIDES.forEach(item => { if (!groups[item.group]) groups[item.group] = []; groups[item.group].push(item); });
  return Object.entries(groups).map(([group, items]) => `<optgroup label="${esc(group)} measurements">${items.map(item => `<option value="${item.id}" ${item.id === state.measurementGuideId ? 'selected' : ''}>${esc(item.label)}</option>`).join('')}</optgroup>`).join('');
}
function diagramBase({ width = 420, height = 280, frontView = false } = {}) {
  if (frontView) {
    return {
      width, height, viewBox: `0 0 ${width} ${height}`,
      head:[210,110], leftGrip:[90,82], rightGrip:[330,82], saddle:[210,168],
      forkLeftTop:[186,120], forkRightTop:[234,120], wheelCenter:[210,208], wheelRadius:44,
      floorY:258
    };
  }
  return {
    width, height, viewBox: `0 0 ${width} ${height}`,
    rearAxle:[88,201],
    frontAxle:[326,201],
    wheelRadius:74,
    bb:[174,187],
    pedalAxle:[191,217],
    seatCluster:[154,111],
    seatTop:[139,55],
    saddleMid:[141,47],
    saddleTip:[164,48],
    headTop:[257,61],
    headBottom:[268,85],
    barCenter:[269,55],
    rearGrip:[263,54],
    grip:[300,56],
    forkCrown:[276,99],
    forkArchY:140,
    floorY:275
  };
}

function bikeGuideBaseSvg(extra, opts = {}) {
  const g = diagramBase(opts);
  const wheel = (cx, cy, r) => {
    const spokes = [0, 30, 60, 90, 120, 150].map(angle => {
      const rad = angle * Math.PI / 180;
      const dx = Math.cos(rad) * (r - 10);
      const dy = Math.sin(rad) * (r - 10);
      return `<line class="diagram-spoke" x1="${cx - dx}" y1="${cy - dy}" x2="${cx + dx}" y2="${cy + dy}" />`;
    }).join('');
    return `
      <circle class="diagram-tire" cx="${cx}" cy="${cy}" r="${r}" />
      <circle class="diagram-rim" cx="${cx}" cy="${cy}" r="${r - 7}" />
      ${spokes}
      <circle class="diagram-hub" cx="${cx}" cy="${cy}" r="4.5" />`;
  };
  return `<svg viewBox="${g.viewBox}" class="measurement-diagram" aria-hidden="true">
    <defs>
      <marker id="arrow-end" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"></path></marker>
    </defs>
    <g class="diagram-bike">
      <line class="diagram-ground" x1="8" y1="${g.floorY}" x2="412" y2="${g.floorY}" />
      ${wheel(g.rearAxle[0], g.rearAxle[1], g.wheelRadius)}
      ${wheel(g.frontAxle[0], g.frontAxle[1], g.wheelRadius)}
      <circle class="diagram-rim" cx="${g.rearAxle[0]}" cy="${g.rearAxle[1]}" r="12" />
      <circle class="diagram-rim" cx="${g.frontAxle[0]}" cy="${g.frontAxle[1]}" r="12" />

      <line class="diagram-frame" x1="${g.seatCluster[0]}" y1="${g.seatCluster[1]}" x2="${g.headTop[0]}" y2="${g.headTop[1]}" />
      <line class="diagram-frame" x1="${g.headBottom[0]}" y1="${g.headBottom[1]}" x2="${g.bb[0]}" y2="${g.bb[1]}" />
      <line class="diagram-frame" x1="${g.seatCluster[0]}" y1="${g.seatCluster[1]}" x2="${g.bb[0]}" y2="${g.bb[1]}" />
      <line class="diagram-frame" x1="${g.headTop[0]}" y1="${g.headTop[1]}" x2="${g.headBottom[0]}" y2="${g.headBottom[1]}" />

      <line class="diagram-frame rear-triangle" x1="${g.seatCluster[0]}" y1="${g.seatCluster[1]}" x2="${g.rearAxle[0]}" y2="${g.rearAxle[1]}" />
      <line class="diagram-frame rear-triangle" x1="${g.bb[0]}" y1="${g.bb[1]}" x2="${g.rearAxle[0]}" y2="${g.rearAxle[1]}" />

      <line class="diagram-seatpost" x1="${g.seatCluster[0]}" y1="${g.seatCluster[1]}" x2="${g.seatTop[0]}" y2="${g.seatTop[1]}" />
      <path class="diagram-saddle" d="M${g.saddleMid[0] - 28} ${g.saddleMid[1] + 4} Q${g.saddleMid[0] - 10} ${g.saddleMid[1] - 4} ${g.saddleMid[0] + 8} ${g.saddleMid[1] - 1} L${g.saddleTip[0]} ${g.saddleTip[1]}" />

      <line class="diagram-stem" x1="${g.headTop[0]}" y1="${g.headTop[1]}" x2="${g.barCenter[0]}" y2="${g.barCenter[1]}" />
      <path class="diagram-bar" d="M${g.rearGrip[0]} ${g.rearGrip[1]} Q${g.barCenter[0]} ${g.barCenter[1] - 2} ${g.barCenter[0]} ${g.barCenter[1]} Q${g.barCenter[0] + 15} ${g.barCenter[1] + 2} ${g.grip[0]} ${g.grip[1]}" />

      <line class="diagram-fork" x1="${g.headBottom[0]}" y1="${g.headBottom[1]}" x2="${g.forkCrown[0]}" y2="${g.forkCrown[1]}" />
      <path class="diagram-fork" d="M${g.forkCrown[0] - 4} ${g.forkCrown[1]} Q${g.forkCrown[0] + 10} ${g.forkArchY} ${g.frontAxle[0] - 5} ${g.frontAxle[1]}" />
      <path class="diagram-fork" d="M${g.forkCrown[0] + 4} ${g.forkCrown[1] - 2} Q${g.forkCrown[0] + 20} ${g.forkArchY} ${g.frontAxle[0] + 5} ${g.frontAxle[1]}" />
      <path class="diagram-fork" d="M${g.frontAxle[0] - 18} ${g.forkArchY} Q${g.frontAxle[0]} ${g.forkArchY - 10} ${g.frontAxle[0] + 18} ${g.forkArchY}" />

      <circle class="diagram-chainring" cx="${g.bb[0]}" cy="${g.bb[1]}" r="16" />
      <line class="diagram-crank" x1="${g.bb[0]}" y1="${g.bb[1]}" x2="${g.pedalAxle[0]}" y2="${g.pedalAxle[1]}" />
      <path class="diagram-chain" d="M${g.bb[0] + 15} ${g.bb[1] - 4} L${g.rearAxle[0] + 6} ${g.rearAxle[1] - 8} M${g.bb[0] + 14} ${g.bb[1] + 5} L${g.rearAxle[0] + 5} ${g.rearAxle[1] + 6}" />

      <circle class="diagram-point" cx="${g.bb[0]}" cy="${g.bb[1]}" r="4.5" />
      <circle class="diagram-point" cx="${g.saddleMid[0]}" cy="${g.saddleMid[1]}" r="4" />
      <circle class="diagram-point" cx="${g.saddleTip[0]}" cy="${g.saddleTip[1]}" r="4" />
      <circle class="diagram-point" cx="${g.barCenter[0]}" cy="${g.barCenter[1]}" r="4" />
      <circle class="diagram-point" cx="${g.grip[0]}" cy="${g.grip[1]}" r="4" />
      <circle class="diagram-point secondary" cx="${g.headTop[0]}" cy="${g.headTop[1]}" r="4" />
      <circle class="diagram-point secondary" cx="${g.rearAxle[0]}" cy="${g.rearAxle[1]}" r="4" />
      <circle class="diagram-point secondary" cx="${g.frontAxle[0]}" cy="${g.frontAxle[1]}" r="4" />
      <circle class="diagram-point secondary" cx="${g.pedalAxle[0]}" cy="${g.pedalAxle[1]}" r="4" />
    </g>
    ${extra(g)}
  </svg>`;
}

function frontGripDiagram(extra) {
  const g = diagramBase({ frontView: true });
  return `<svg viewBox="${g.viewBox}" class="measurement-diagram" aria-hidden="true">
    <defs>
      <marker id="arrow-end" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path d="M0,0 L8,4 L0,8 z" fill="currentColor"></path></marker>
    </defs>
    <g class="diagram-bike front-view">
      <line class="diagram-ground" x1="70" y1="${g.floorY}" x2="350" y2="${g.floorY}" />
      <circle class="diagram-tire" cx="${g.wheelCenter[0]}" cy="${g.wheelCenter[1]}" r="${g.wheelRadius}" />
      <circle class="diagram-rim" cx="${g.wheelCenter[0]}" cy="${g.wheelCenter[1]}" r="${g.wheelRadius - 6}" />
      <line class="diagram-frame" x1="${g.head[0]}" y1="${g.head[1]}" x2="${g.saddle[0]}" y2="${g.saddle[1] - 18}" />
      <line class="diagram-seatpost" x1="${g.saddle[0]}" y1="${g.saddle[1] - 18}" x2="${g.saddle[0]}" y2="${g.saddle[1]}" />
      <path class="diagram-saddle" d="M${g.saddle[0] - 24} ${g.saddle[1]} Q${g.saddle[0]} ${g.saddle[1] - 8} ${g.saddle[0] + 24} ${g.saddle[1]}" />
      <line class="diagram-stem" x1="${g.head[0]}" y1="${g.head[1]}" x2="${g.head[0]}" y2="${g.leftGrip[1] + 8}" />
      <path class="diagram-bar" d="M${g.leftGrip[0]} ${g.leftGrip[1]} Q${g.head[0]} ${g.leftGrip[1] - 8} ${g.rightGrip[0]} ${g.rightGrip[1]}" />
      <line class="diagram-fork" x1="${g.forkLeftTop[0]}" y1="${g.forkLeftTop[1]}" x2="${g.wheelCenter[0] - 16}" y2="${g.wheelCenter[1] - 14}" />
      <line class="diagram-fork" x1="${g.forkRightTop[0]}" y1="${g.forkRightTop[1]}" x2="${g.wheelCenter[0] + 16}" y2="${g.wheelCenter[1] - 14}" />
      <path class="diagram-fork" d="M${g.wheelCenter[0] - 24} ${g.wheelCenter[1] - 12} Q${g.wheelCenter[0]} ${g.wheelCenter[1] - 22} ${g.wheelCenter[0] + 24} ${g.wheelCenter[1] - 12}" />
      <circle class="diagram-hub" cx="${g.wheelCenter[0]}" cy="${g.wheelCenter[1]}" r="5" />
      <line class="diagram-spoke" x1="${g.wheelCenter[0] - 30}" y1="${g.wheelCenter[1]}" x2="${g.wheelCenter[0] + 30}" y2="${g.wheelCenter[1]}" />
      <line class="diagram-spoke" x1="${g.wheelCenter[0]}" y1="${g.wheelCenter[1] - 30}" x2="${g.wheelCenter[0]}" y2="${g.wheelCenter[1] + 30}" />
      <circle class="diagram-point" cx="${g.leftGrip[0]}" cy="${g.leftGrip[1]}" r="4" />
      <circle class="diagram-point" cx="${g.rightGrip[0]}" cy="${g.rightGrip[1]}" r="4" />
      <circle class="diagram-point secondary" cx="${g.saddle[0]}" cy="${g.saddle[1]}" r="4" />
    </g>
    ${extra(g)}
  </svg>`;
}

function measurementGuideDiagram(guide) {
  const label = (text, x, y, align='start') => `<text class="diagram-label" x="${x}" y="${y}" text-anchor="${align}">${esc(text)}</text>`;
  const dim = (x1, y1, x2, y2, text, klass='') => `<line class="diagram-dimension ${klass}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-start="url(#arrow-end)" marker-end="url(#arrow-end)" />${label(text, (x1+x2)/2, (y1+y2)/2 - 8, 'middle')}`;
  switch (guide.diagram) {
    case 'saddleHeight':
      return bikeGuideBaseSvg(g => `${dim(g.bb[0], g.bb[1], g.saddleMid[0], g.saddleMid[1], 'Saddle height')} ${label('BB center', g.bb[0]-10, g.bb[1]+26, 'end')} ${label('Saddle profile midpoint', g.saddleTip[0], g.saddleMid[1]-15, 'end')}`);
    case 'saddleSetback':
      return bikeGuideBaseSvg(g => `<line class="diagram-reference" x1="${g.bb[0]}" y1="40" x2="${g.bb[0]}" y2="236" />${dim(g.bb[0], g.saddleTip[1]+24, g.saddleTip[0], g.saddleTip[1]+24, 'Setback')} ${label('Plumb line through BB', g.bb[0]+10, 54)} ${label('Saddle tip', g.saddleTip[0]+8, g.saddleTip[1]-12)}`);
    case 'saddleAngle':
      return bikeGuideBaseSvg(g => `<path class="diagram-arc" d="M${g.saddleMid[0]-14} ${g.saddleMid[1]+18} A28 28 0 0 1 ${g.saddleMid[0]+14} ${g.saddleMid[1]+4}" />${label('Saddle angle', g.saddleMid[0]+40, g.saddleMid[1]+20)}<line class="diagram-reference" x1="${g.saddleMid[0]-32}" y1="${g.saddleMid[1]+12}" x2="${g.saddleMid[0]+34}" y2="${g.saddleMid[1]+12}" />`);
    case 'crankLength':
      return bikeGuideBaseSvg(g => `${dim(g.bb[0], g.bb[1], g.pedalAxle[0], g.pedalAxle[1], 'Crank length')}<circle class="diagram-point" cx="${g.pedalAxle[0]}" cy="${g.pedalAxle[1]}" r="4" />${label('Pedal axle center', g.pedalAxle[0]+18, g.pedalAxle[1]+12)}`);
    case 'handlebarStack':
      return bikeGuideBaseSvg(g => `${dim(g.barCenter[0]+38, g.bb[1], g.barCenter[0]+38, g.barCenter[1], 'Bar stack', 'vertical')}<line class="diagram-reference" x1="${g.barCenter[0]}" y1="${g.bb[1]}" x2="${g.barCenter[0]+56}" y2="${g.bb[1]}" /><line class="diagram-reference" x1="${g.barCenter[0]}" y1="${g.barCenter[1]}" x2="${g.barCenter[0]+56}" y2="${g.barCenter[1]}" />`);
    case 'handlebarReach':
      return bikeGuideBaseSvg(g => `${dim(g.bb[0], g.barCenter[1]-22, g.barCenter[0], g.barCenter[1]-22, 'Bar reach')}<line class="diagram-reference" x1="${g.bb[0]}" y1="${g.bb[1]}" x2="${g.bb[0]}" y2="${g.barCenter[1]-8}" /><line class="diagram-reference" x1="${g.barCenter[0]}" y1="${g.barCenter[1]}" x2="${g.barCenter[0]}" y2="${g.barCenter[1]-8}" />`);
    case 'saddleToBarReach':
      return bikeGuideBaseSvg(g => `${dim(g.saddleTip[0], g.barCenter[1]-26, g.barCenter[0], g.barCenter[1]-26, 'Saddle-to-bar reach')}<line class="diagram-reference" x1="${g.saddleTip[0]}" y1="${g.saddleTip[1]}" x2="${g.saddleTip[0]}" y2="${g.barCenter[1]-10}" /><line class="diagram-reference" x1="${g.barCenter[0]}" y1="${g.barCenter[1]}" x2="${g.barCenter[0]}" y2="${g.barCenter[1]-10}" />`);
    case 'handlebarDrop':
      return bikeGuideBaseSvg(g => `${dim(g.barCenter[0]+38, g.saddleMid[1], g.barCenter[0]+38, g.barCenter[1], 'Bar drop', 'vertical')}<line class="diagram-reference" x1="${g.saddleMid[0]}" y1="${g.saddleMid[1]}" x2="${g.barCenter[0]+54}" y2="${g.saddleMid[1]}" />`);
    case 'gripReach':
      return bikeGuideBaseSvg(g => `${dim(g.saddleTip[0], g.grip[1]-24, g.grip[0], g.grip[1]-24, 'Grip reach')}<line class="diagram-reference" x1="${g.saddleTip[0]}" y1="${g.saddleTip[1]}" x2="${g.saddleTip[0]}" y2="${g.grip[1]-10}" /><line class="diagram-reference" x1="${g.grip[0]}" y1="${g.grip[1]+1}" x2="${g.grip[0]}" y2="${g.grip[1]-10}" />`);
    case 'gripDrop':
      return bikeGuideBaseSvg(g => `${dim(g.grip[0]+30, g.saddleMid[1], g.grip[0]+30, g.grip[1]+1, 'Grip drop', 'vertical')}<line class="diagram-reference" x1="${g.saddleMid[0]}" y1="${g.saddleMid[1]}" x2="${g.grip[0]+46}" y2="${g.saddleMid[1]}" />`);
    case 'gripWidth':
      return frontGripDiagram(g => `${dim(g.leftGrip[0], g.leftGrip[1]-18, g.rightGrip[0], g.rightGrip[1]-18, 'Grip width')} ${label('Left grip point', g.leftGrip[0], g.leftGrip[1]-30, 'middle')} ${label('Right grip point', g.rightGrip[0], g.rightGrip[1]-30, 'middle')}`);
    case 'frameReachStack':
      return bikeGuideBaseSvg(g => `${dim(g.bb[0], g.headTop[1]-18, g.headTop[0], g.headTop[1]-18, 'Frame reach')} ${dim(g.headTop[0]+30, g.bb[1], g.headTop[0]+30, g.headTop[1], 'Frame stack', 'vertical')} <line class="diagram-reference" x1="${g.bb[0]}" y1="${g.bb[1]}" x2="${g.bb[0]}" y2="${g.headTop[1]-6}" /> <line class="diagram-reference" x1="${g.headTop[0]}" y1="${g.bb[1]}" x2="${g.headTop[0]+46}" y2="${g.bb[1]}" /><line class="diagram-reference" x1="${g.headTop[0]}" y1="${g.headTop[1]}" x2="${g.headTop[0]+46}" y2="${g.headTop[1]}" />`);
    case 'wheelbase':
      return bikeGuideBaseSvg(g => `${dim(g.rearAxle[0], g.floorY-18, g.frontAxle[0], g.floorY-18, 'Wheelbase')} ${dim(g.bb[0], g.floorY-44, g.frontAxle[0], g.floorY-44, 'Front center')} ${dim(g.rearAxle[0], g.rearAxle[1], g.bb[0], g.bb[1], 'Chainstay')} `);
    default:
      return bikeGuideBaseSvg(() => '');
  }
}
function renderMeasurementGuide() {
  const guide = MEASUREMENT_GUIDES.find(item => item.id === state.measurementGuideId) || MEASUREMENT_GUIDES[0];
  if (!guide) return '<div class="empty">No measurement guide available.</div>';
  const steps = guide.howTo.map(item => `<li>${esc(item)}</li>`).join('');
  const tips = guide.tips.map(item => `<li>${esc(item)}</li>`).join('');
  return `<div class="measurement-guide-card">
    <div class="measurement-hero">
      <div>
        <span class="badge">${esc(guide.group)}</span>
        <h3>${esc(guide.label)}</h3>
        <p class="measurement-purpose">${esc(guide.purpose)}</p>
      </div>
      <div class="measurement-meta">
        <div><strong>Stored field</strong><span>${esc(guide.fieldLabel)}</span></div>
        <div><strong>Measure from</strong><span>${esc(guide.measureFrom)}</span></div>
        <div><strong>Measure to</strong><span>${esc(guide.measureTo)}</span></div>
      </div>
    </div>
    <div class="measurement-layout">
      <div class="measurement-visual-wrap">${measurementGuideDiagram(guide)}</div>
      <div class="measurement-copy">
        <section class="measurement-copy-block"><h4>Definition</h4><p>${esc(guide.definition)}</p></section>
        <section class="measurement-copy-block"><h4>How to measure it</h4><ol>${steps}</ol></section>
        <section class="measurement-copy-block"><h4>Consistency tips</h4><ul>${tips}</ul></section>
      </div>
    </div>
  </div>`;
}

function renderGeometrySources(bikes) {
  const sourceBikes = bikes.length ? bikes : state.data.bikes;
  return `<div class="source-list">${sourceBikes.map(bike => {
    const label = bike.geometry?.sourceLabel || 'No geometry source recorded';
    const url = safeUrl(bike.geometry?.sourceUrl || '');
    return `<div class="source-row"><div><strong>${esc(bikeName(bike.id))}</strong><small>${esc(label)}</small></div>${url ? `<a class="text-button" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Open source</a>` : '<span class="badge unknown">No link</span>'}</div>`;
  }).join('')}</div>`;
}
function renderGeometry() {
  if (!document.getElementById('geometryBikeA')) return;
  syncGeometrySelectors();
  const bikes = selectedGeometryBikes();
  const reference = bikes.find(bike => bike.id === state.geometryReferenceId) || bikes[0];
  document.getElementById('geometryQuickSummary').innerHTML = renderGeometrySummary(bikes, reference);
  document.getElementById('geometryPlot').innerHTML = renderGeometryPlot(bikes);
  document.getElementById('geometryInsights').innerHTML = renderGeometryInsights(bikes, reference);
  document.getElementById('geometryTable').innerHTML = renderGeometryTable(bikes, reference);
  document.getElementById('fitBaselineSummary').innerHTML = baselineMeasurementList();
  const fitBike = state.data.bikes.find(bike => bike.id === state.fitTargetId);
  document.getElementById('fitAdvisorResult').innerHTML = renderFitAdvisor(fitBike);
  const measurementSelect = document.getElementById('measurementGuideSelect');
  if (measurementSelect) {
    if (!MEASUREMENT_GUIDES.some(item => item.id === state.measurementGuideId)) state.measurementGuideId = MEASUREMENT_GUIDES[0]?.id || '';
    measurementSelect.innerHTML = measurementGuideSelectHtml();
    measurementSelect.value = state.measurementGuideId;
  }
  const measurementContent = document.getElementById('measurementGuideContent');
  if (measurementContent) {
    try { measurementContent.innerHTML = renderMeasurementGuide(); }
    catch (error) { console.error('Measurement guide failed to render.', error); measurementContent.innerHTML = '<div class="notice warning">The measurement guide could not render, but geometry comparison remains available. Reload the app or update to the latest Fleet OS files.</div>'; }
  }
  document.getElementById('geometrySources').innerHTML = renderGeometrySources(bikes);
}


function renderBikeDetail(id) {
  const bike = state.data.bikes.find(item => item.id === id);
  const target = document.getElementById('bikeDetail');
  if (!bike) { target.innerHTML = '<div class="empty">Bike not found.</div>'; return; }
  const complete = profileCompleteness(bike);
  const photo = bike.photo ? `<img src="${esc(bike.photo)}" alt="${esc(`${bike.brand} ${bike.model}`)}" />` : `<div class="placeholder">${ICONS.bikeLarge}</div>`;
  const currentWheelOptions = '<option value="">Not assigned</option>' + state.data.wheelsets.map(wheel => `<option value="${wheel.id}" ${bike.currentWheelsetId === wheel.id ? 'selected' : ''}>${esc(wheel.name)}</option>`).join('');
  const tasks = state.data.maintenance.filter(task => task.bikeId === bike.id && task.status !== 'completed');
  const fit = bike.fit || {};
  const geometry = bike.geometry || {};
  const hasFitMeasurements = Object.entries(fit).some(([key,value]) => key !== 'notes' && knownNumber(value));
  target.innerHTML = `
    <button class="text-button detail-back" data-route="fleet" data-subview="bikes" type="button">← Back to fleet</button>
    <section class="detail-hero">
      <div class="detail-photo">${photo}</div>
      <div class="detail-summary">
        <div><p class="kicker">${esc(bike.category)}</p><h2>${esc(`${bike.year || ''} ${bike.brand} ${bike.model}`.trim())}</h2><p class="meta">Size ${esc(bike.size || 'Unknown')} · ${esc(bike.status || 'Unknown')}</p></div>
        <p>${esc(bike.role || 'Ride role not documented.')}</p>
        <div>${completionBadge(bike)}<div class="progress" style="margin-top:.55rem"><span style="width:${complete.percent}%"></span></div></div>
        <div class="detail-actions"><button class="button edit-bike" data-id="${esc(bike.id)}" type="button">Edit profile</button><button class="button secondary compare-bike" data-id="${esc(bike.id)}" type="button">Compare geometry</button><button class="button secondary plan-bike" data-id="${esc(bike.id)}" type="button">Plan a ride</button></div>
      </div>
    </section>
    <div class="detail-grid">
      <section class="panel"><div class="section-heading"><div><p class="kicker">Current configuration</p><h2>Core standards</h2></div></div>${definitionList([
        ['Wheel size',bike.wheelSize],['Front axle',bike.axleFront],['Rear axle',bike.axleRear],['Freehub',bike.freehub],['Drivetrain',bike.drivetrainFamily],['Speed',bike.drivetrainSpeed ? `${bike.drivetrainSpeed}-speed` : 'Unknown'],['Brakes',bike.brakes],['Brake fluid',bike.brakeFluid],['Rotor interface',bike.rotorInterface],['Fork',bike.fork],['Shock',bike.shock]
      ])}</section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Modular setup</p><h2>Wheelset assignment</h2></div></div><label><span>Currently installed</span><select id="bikeWheelAssignment" data-bike-id="${esc(bike.id)}">${currentWheelOptions}</select></label><p class="muted" style="margin-top:.75rem">Assignments help Fleet OS show the current build and prevent a wheelset from appearing on two bikes accidentally.</p><button class="button secondary" id="saveWheelAssignment" data-bike-id="${esc(bike.id)}" type="button">Save assignment</button></section>
      <section class="panel wide"><div class="section-heading"><div><p class="kicker">Frame geometry</p><h2>Key dimensions</h2><p>${esc(geometry.sourceLabel || 'No source recorded')}</p></div><button class="text-button compare-bike" data-id="${esc(bike.id)}" type="button">Open comparison</button></div>${definitionList([
        ['Reach',knownNumber(geometry.reachMm) ? `${geometry.reachMm} mm` : 'Unknown'],['Stack',knownNumber(geometry.stackMm) ? `${geometry.stackMm} mm` : 'Unknown'],['Head angle',knownNumber(geometry.headAngleDeg) ? `${geometry.headAngleDeg}°` : 'Unknown'],['Effective seat angle',knownNumber(geometry.effectiveSeatAngleDeg) ? `${geometry.effectiveSeatAngleDeg}°` : 'Unknown'],['Wheelbase',knownNumber(geometry.wheelbaseMm) ? `${geometry.wheelbaseMm} mm` : 'Unknown'],['Chainstay',knownNumber(geometry.chainstayMm) ? `${geometry.chainstayMm} mm` : 'Unknown'],['BB drop',knownNumber(geometry.bbDropMm) ? `${geometry.bbDropMm} mm` : 'Unknown'],['Standover',knownNumber(geometry.standoverMm) ? `${geometry.standoverMm} mm` : 'Unknown']
      ])}</section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Profile health</p><h2>Missing documentation</h2></div></div>${complete.missing.length ? `<div class="missing-list">${complete.missing.map(item => `<span class="chip warning">${esc(item)}</span>`).join('')}</div>` : '<div class="notice">This profile is fully documented against the current checklist.</div>'}</section>
      <section class="panel"><div class="section-heading"><div><p class="kicker">Workshop</p><h2>Open maintenance</h2></div></div>${tasks.length ? `<div class="maintenance-list">${tasks.slice(0,4).map(maintenanceCard).join('')}</div>` : '<div class="empty">No open tasks for this bike.</div>'}</section>
      ${hasFitMeasurements ? `<section class="panel wide"><div class="section-heading"><div><p class="kicker">Recorded fit</p><h2>Bike-specific measurements</h2><p>Compare these measurements in Geometry & fit. Unknown values are intentionally left blank.</p></div><button class="text-button edit-fit-bike" data-id="${esc(bike.id)}" type="button">Record measurements</button></div>${definitionList([
        ['Saddle height',knownNumber(fit.saddleHeightMm) ? `${fit.saddleHeightMm} mm` : 'Unknown'],['Saddle setback',knownNumber(fit.saddleSetbackMm) ? `${Math.abs(fit.saddleSetbackMm)} mm behind BB` : 'Unknown'],['Crank length',knownNumber(fit.crankLengthMm) ? `${fit.crankLengthMm} mm` : 'Unknown'],['Stem',knownNumber(fit.stemMm) ? `${fit.stemMm} mm${knownNumber(fit.stemAngleDeg) ? ` · ${fit.stemAngleDeg}°` : ''}` : 'Unknown'],['Spacer stack',knownNumber(fit.spacerStackMm) ? `${fit.spacerStackMm} mm` : 'Unknown'],['Handlebar stack',knownNumber(fit.handlebarStackMm) ? `${fit.handlebarStackMm} mm` : 'Unknown'],['Handlebar reach',knownNumber(fit.handlebarReachMm) ? `${fit.handlebarReachMm} mm` : 'Unknown'],['Bar / grip width',knownNumber(fit.gripWidthMm) ? `${fit.gripWidthMm} mm` : 'Unknown']
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
function flattenBikeForEditor(record = {}) {
  const geometry = record.geometry || {};
  const fit = record.fit || {};
  return {
    ...record,
    geometryReachMm: geometry.reachMm ?? '', geometryStackMm: geometry.stackMm ?? '', geometryHeadAngleDeg: geometry.headAngleDeg ?? '', geometrySeatAngleDeg: geometry.effectiveSeatAngleDeg ?? '',
    geometryTopTubeMm: geometry.topTubeMm ?? '', geometryWheelbaseMm: geometry.wheelbaseMm ?? '', geometryChainstayMm: geometry.chainstayMm ?? '', geometryFrontCenterMm: geometry.frontCenterMm ?? '',
    geometryBbDropMm: geometry.bbDropMm ?? '', geometryBbHeightMm: geometry.bbHeightMm ?? '', geometryStandoverMm: geometry.standoverMm ?? '', geometryHeadTubeLengthMm: geometry.headTubeLengthMm ?? '',
    geometrySeatTubeLengthMm: geometry.seatTubeLengthMm ?? '', geometryForkTravelMm: geometry.forkTravelMm ?? '', geometrySourceLabel: geometry.sourceLabel ?? '', geometrySourceUrl: geometry.sourceUrl ?? '',
    fitCrankLengthMm: fit.crankLengthMm ?? '', fitSaddleHeightMm: fit.saddleHeightMm ?? '', fitSaddleSetbackMm: fit.saddleSetbackMm ?? '', fitSaddleAngleDeg: fit.saddleAngleDeg ?? '',
    fitStemMm: fit.stemMm ?? '', fitStemAngleDeg: fit.stemAngleDeg ?? '', fitSpacerStackMm: fit.spacerStackMm ?? '', fitHandlebarStackMm: fit.handlebarStackMm ?? '',
    fitHandlebarReachMm: fit.handlebarReachMm ?? '', fitSaddleToBarReachMm: fit.saddleToBarReachMm ?? '', fitHandlebarDropMm: fit.handlebarDropMm ?? '', fitGripReachMm: fit.gripReachMm ?? '',
    fitGripDropMm: fit.gripDropMm ?? '', fitGripWidthMm: fit.gripWidthMm ?? '', fitNotes: fit.notes ?? ''
  };
}
function flattenRiderFitForEditor(record = {}) {
  return { ...record, assessmentText: Array.isArray(record.assessment) ? record.assessment.join('\n') : '' };
}
function editorSections(type,record) {
  if (type === 'bike') return [
    { title:'Identity', fields:[field('brand','Brand','text',{ required:true },record),field('model','Model','text',{ required:true },record),field('year','Year','number',{},record),field('category','Category','select',{ options:STANDARD_OPTIONS.categoryBike },record),field('size','Size','text',{},record),field('status','Status','select',{ options:STANDARD_OPTIONS.status },record),field('role','Primary ride role','text',{ full:true },record),field('photo','Photo path or URL','text',{ full:true, help:'Use a relative path such as assets/images/my-bike.jpg for a photo committed to the repository.' },record)] },
    { title:'Standards', fields:[field('wheelSize','Wheel size','select',{ options:STANDARD_OPTIONS.wheelSize },record),field('axleFront','Front axle','select',{ options:STANDARD_OPTIONS.frontAxle },record),field('axleRear','Rear axle','select',{ options:STANDARD_OPTIONS.rearAxle },record),field('freehub','Freehub','select',{ options:STANDARD_OPTIONS.freehub },record),field('drivetrainSpeed','Drivetrain speed','number',{ unit:'speed' },record),field('drivetrainFamily','Drivetrain family','text',{},record),field('maxCassetteCog','Maximum cassette cog','number',{ unit:'T' },record),field('currentWheelsetId','Installed wheelset','wheel-select',{},record)] },
    { title:'Components', fields:[field('brakes','Brakes','text',{ full:true },record),field('brakeFluid','Brake fluid','select',{ options:STANDARD_OPTIONS.fluid },record),field('rotorInterface','Rotor interface','select',{ options:STANDARD_OPTIONS.rotorInterface },record),field('fork','Fork','text',{ full:true },record),field('shock','Shock / rear suspension','text',{ full:true },record),field('weightLb','Weight','number',{ unit:'lb' },record)] },
    { title:'Frame geometry', fields:[
      field('geometryReachMm','Reach','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from BB center to the top-center of the head tube. See Geometry & Fit → Measurement guide.' },record),field('geometryStackMm','Stack','number',{ unit:'mm', step:'0.1', help:'Vertical distance from BB center to the top-center of the head tube.' },record),
      field('geometryHeadAngleDeg','Head-tube angle','number',{ unit:'°', step:'0.1' },record),field('geometrySeatAngleDeg','Effective seat angle','number',{ unit:'°', step:'0.1' },record),
      field('geometryTopTubeMm','Effective top tube','number',{ unit:'mm', step:'0.1' },record),field('geometryWheelbaseMm','Wheelbase','number',{ unit:'mm', step:'0.1', help:'Axle-to-axle distance. Use the published geometry chart when possible.' },record),
      field('geometryChainstayMm','Chainstay / rear center','number',{ unit:'mm', step:'0.1', help:'Center of BB to rear axle.' },record),field('geometryFrontCenterMm','Front center','number',{ unit:'mm', step:'0.1', help:'Center of BB to front axle.' },record),
      field('geometryBbDropMm','BB drop','number',{ unit:'mm', step:'0.1' },record),field('geometryBbHeightMm','BB height','number',{ unit:'mm', step:'0.1' },record),
      field('geometryStandoverMm','Standover','number',{ unit:'mm', step:'0.1' },record),field('geometryHeadTubeLengthMm','Head-tube length','number',{ unit:'mm', step:'0.1' },record),
      field('geometrySeatTubeLengthMm','Seat-tube length','number',{ unit:'mm', step:'0.1' },record),field('geometryForkTravelMm','Fork travel','number',{ unit:'mm' },record),
      field('geometrySourceLabel','Geometry source','text',{ full:true, help:'Example: manufacturer geometry chart, measured by fitter, or owner-provided.' },record),field('geometrySourceUrl','Source URL','text',{ full:true },record)
    ] },
    { title:'Bike-specific fit measurements', fields:[
      field('fitCrankLengthMm','Crank length','number',{ unit:'mm', help:'Record the actual installed crank. This powers the saddle-height transfer estimate.' },record),field('fitSaddleHeightMm','Saddle height (BB to saddle profile)','number',{ unit:'mm', step:'0.1', help:'Center of BB to midpoint of the saddle profile.' },record),
      field('fitSaddleSetbackMm','Saddle setback (negative = behind BB)','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from the BB plumb line to the saddle tip.' },record),field('fitSaddleAngleDeg','Saddle angle','number',{ unit:'°', step:'0.1', help:'Measure on the usable saddle surface. Keep the sign convention consistent.' },record),
      field('fitStemMm','Stem length','number',{ unit:'mm' },record),field('fitStemAngleDeg','Stem angle','number',{ unit:'°', step:'0.1' },record),
      field('fitSpacerStackMm','Spacer stack','number',{ unit:'mm', help:'Total spacer height below the stem.' },record),field('fitGripWidthMm','Bar / grip width','number',{ unit:'mm', help:'Use the effective hand position width that you want to repeat.' },record),
      field('fitHandlebarStackMm','BB-to-handlebar stack','number',{ unit:'mm', step:'0.1', help:'Vertical distance from BB center to the bar center.' },record),field('fitHandlebarReachMm','BB-to-handlebar reach','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from BB center to the bar center.' },record),
      field('fitSaddleToBarReachMm','Saddle-to-bar reach','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from the saddle tip to the bar center.' },record),field('fitHandlebarDropMm','Handlebar drop (report convention)','number',{ unit:'mm', step:'0.1', help:'Vertical distance between the saddle reference point and the handlebar reference point.' },record),
      field('fitGripReachMm','Saddle-to-grip reach','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from the saddle tip to the chosen grip reference point.' },record),field('fitGripDropMm','Grip drop (report convention)','number',{ unit:'mm', step:'0.1', help:'Vertical distance from the saddle reference point to the grip reference point.' },record),
      field('fitNotes','Fit notes','textarea',{ full:true, help:'Capture saddle model, suspension state, bar rise, and any special measurement conventions.' },record)
    ] },
    { title:'Ownership and notes', fields:[field('purchaseDate','Purchase date','date',{},record),field('serialNumber','Serial number','text',{},record),field('geometryNotes','Geometry notes','textarea',{ full:true },record),field('buildNotes','Build notes','textarea',{ full:true },record),field('notes','General notes','textarea',{ full:true },record)] }
  ];
  if (type === 'riderFit') return [
    { title:'Fit source', fields:[field('fitSource','Fit source','text',{ full:true },record),field('fitDate','Fit date','date',{},record),field('fitBikeId','Fit bike','bike-select',{},record),field('baselineCrankLengthMm','Baseline crank length','number',{ unit:'mm', help:'The crank length used when the fit was performed.' },record)] },
    { title:'Measured saddle and cockpit', fields:[field('saddleHeightMm','Saddle height','number',{ unit:'mm', step:'0.1', help:'BB center to saddle profile midpoint.' },record),field('saddleSetbackMm','Saddle setback','number',{ unit:'mm', step:'0.1', help:'BB plumb line to saddle tip.' },record),field('saddleAngleDeg','Saddle angle','number',{ unit:'°', step:'0.1', help:'Use the same convention as the original fit report.' },record),field('handlebarStackMm','BB-to-bar stack','number',{ unit:'mm', step:'0.1', help:'Vertical distance from the bottom bracket to the bar center.' },record),field('handlebarReachMm','BB-to-bar reach','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from the bottom bracket to the bar center.' },record),field('saddleToBarReachMm','Saddle-to-bar reach','number',{ unit:'mm', step:'0.1', help:'Horizontal distance from the saddle tip to the bar center.' },record),field('handlebarDropMm','Handlebar drop','number',{ unit:'mm', step:'0.1', help:'Relative vertical distance between the saddle reference and handlebar reference.' },record),field('gripReachMm','Grip reach','number',{ unit:'mm', step:'0.1', help:'Use the same grip reference point consistently.' },record),field('gripDropMm','Grip drop','number',{ unit:'mm', step:'0.1' },record),field('bbToGripReachMm','BB-to-grip reach','number',{ unit:'mm', step:'0.1' },record),field('gripWidthMm','Grip width','number',{ unit:'mm', help:'Distance between the left and right hand positions.' },record),field('gripAngleDeg','Grip angle','number',{ unit:'°', step:'0.1' },record)] },
    { title:'Assessment context', fields:[field('assessmentText','Assessment notes','textarea',{ full:true, help:'Use one item per line. Keep the wording faithful to the fitter’s report.' },record),field('notes','Transfer cautions','textarea',{ full:true, help:'Document what should or should not be copied to other bikes.' },record)] }
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
  const labels = { bike:'Bike profile', riderFit:'Retül fit baseline', wheel:'Wheelset', part:'Spare component', maintenance:'Maintenance task', preset:'Ride preset', rideLog:'Ride log' };
  document.getElementById('dialogEyebrow').textContent = record.id || type === 'riderFit' ? 'Edit record' : 'New record';
  document.getElementById('dialogTitle').textContent = labels[type] || 'Record';
  const formRecord = type === 'bike' ? flattenBikeForEditor(record) : type === 'riderFit' ? flattenRiderFitForEditor(record) : record;
  renderEditorFields(type,formRecord);
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
    const geometry = {
      ...(existing.geometry || {}), reachMm:numeric(values.geometryReachMm), stackMm:numeric(values.geometryStackMm), headAngleDeg:numeric(values.geometryHeadAngleDeg), effectiveSeatAngleDeg:numeric(values.geometrySeatAngleDeg),
      topTubeMm:numeric(values.geometryTopTubeMm), wheelbaseMm:numeric(values.geometryWheelbaseMm), chainstayMm:numeric(values.geometryChainstayMm), frontCenterMm:numeric(values.geometryFrontCenterMm),
      bbDropMm:numeric(values.geometryBbDropMm), bbHeightMm:numeric(values.geometryBbHeightMm), standoverMm:numeric(values.geometryStandoverMm), headTubeLengthMm:numeric(values.geometryHeadTubeLengthMm),
      seatTubeLengthMm:numeric(values.geometrySeatTubeLengthMm), forkTravelMm:numeric(values.geometryForkTravelMm), sourceLabel:values.geometrySourceLabel || '', sourceUrl:values.geometrySourceUrl || ''
    };
    const fit = {
      ...(existing.fit || {}), crankLengthMm:numeric(values.fitCrankLengthMm), saddleHeightMm:numeric(values.fitSaddleHeightMm), saddleSetbackMm:numeric(values.fitSaddleSetbackMm), saddleAngleDeg:numeric(values.fitSaddleAngleDeg),
      stemMm:numeric(values.fitStemMm), stemAngleDeg:numeric(values.fitStemAngleDeg), spacerStackMm:numeric(values.fitSpacerStackMm), handlebarStackMm:numeric(values.fitHandlebarStackMm),
      handlebarReachMm:numeric(values.fitHandlebarReachMm), saddleToBarReachMm:numeric(values.fitSaddleToBarReachMm), handlebarDropMm:numeric(values.fitHandlebarDropMm), gripReachMm:numeric(values.fitGripReachMm),
      gripDropMm:numeric(values.fitGripDropMm), gripWidthMm:numeric(values.fitGripWidthMm), notes:values.fitNotes || ''
    };
    const nestedKeys = new Set(Object.keys(values).filter(key => key.startsWith('geometry') || key.startsWith('fit')));
    const flatValues = Object.fromEntries(Object.entries(values).filter(([key]) => !nestedKeys.has(key)));
    const record = { ...existing, ...flatValues, id:state.editor.id || uid('bike'), year:numeric(values.year), drivetrainSpeed:numeric(values.drivetrainSpeed), maxCassetteCog:numeric(values.maxCassetteCog), weightLb:numeric(values.weightLb), geometry, fit };
    upsert(state.data.bikes,record); saveData({ toast:'Bike profile saved', activity:`Updated ${record.brand} ${record.model}.` });
  } else if (type === 'riderFit') {
    state.data.rider = {
      ...existing, ...values,
      baselineCrankLengthMm:numeric(values.baselineCrankLengthMm), saddleHeightMm:numeric(values.saddleHeightMm), saddleSetbackMm:numeric(values.saddleSetbackMm), saddleAngleDeg:numeric(values.saddleAngleDeg),
      handlebarStackMm:numeric(values.handlebarStackMm), handlebarReachMm:numeric(values.handlebarReachMm), saddleToBarReachMm:numeric(values.saddleToBarReachMm), handlebarDropMm:numeric(values.handlebarDropMm),
      gripReachMm:numeric(values.gripReachMm), gripDropMm:numeric(values.gripDropMm), bbToGripReachMm:numeric(values.bbToGripReachMm), gripWidthMm:numeric(values.gripWidthMm), gripAngleDeg:numeric(values.gripAngleDeg),
      assessment:String(values.assessmentText || '').split(/\n+/).map(item => item.trim()).filter(Boolean)
    };
    delete state.data.rider.assessmentText;
    saveData({ toast:'Retül baseline saved', activity:'Updated the Retül fit baseline.' });
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
  renderDashboard(); renderBikes(); renderWheels(); renderGeometry(); renderInventory(); renderCompatibilitySelectors(); renderMaintenance(); renderRidePresets(); renderRideHistory(); renderDataStatus();
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
    const compareBike = event.target.closest('.compare-bike'); if (compareBike) {
      const id = compareBike.dataset.id;
      const other = state.geometryBikeIds.find(item => item && item !== id) || state.data.bikes.find(item => item.id !== id)?.id || '';
      state.geometryBikeIds = [id,other,state.geometryBikeIds.find(item => item && ![id,other].includes(item)) || ''];
      state.geometryReferenceId = id;
      state.fitTargetId = id;
      go('fleet',{ subview:'geometry' });
      setTimeout(renderGeometry,0);
    }
    const editBike = event.target.closest('.edit-bike'); if (editBike) openEditor('bike',state.data.bikes.find(item => item.id === editBike.dataset.id));
    const editFitBike = event.target.closest('.edit-fit-bike'); if (editFitBike) openEditor('bike',state.data.bikes.find(item => item.id === editFitBike.dataset.id));
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
  document.getElementById('editFitBaseline').addEventListener('click',() => openEditor('riderFit',state.data.rider));
  ['geometryBikeA','geometryBikeB','geometryBikeC'].forEach((id,index) => document.getElementById(id).addEventListener('change',event => { state.geometryBikeIds[index] = event.target.value; renderGeometry(); }));
  document.getElementById('geometryReference').addEventListener('change',event => { state.geometryReferenceId = event.target.value; renderGeometry(); });
  document.getElementById('fitTargetBike').addEventListener('change',event => { state.fitTargetId = event.target.value; renderGeometry(); });
  const measurementGuideSelect = document.getElementById('measurementGuideSelect');
  if (measurementGuideSelect) measurementGuideSelect.addEventListener('change', event => { state.measurementGuideId = event.target.value; renderGeometry(); });
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
  document.getElementById('resetData').addEventListener('click',() => confirmAction('Reset local data','This will erase edits on this device and restore the Fleet OS v1.2 sample database.',() => { state.data = clone(seedData); localStorage.setItem(STORAGE_KEY,JSON.stringify(state.data)); backupMeta = { lastBackupAt:'', changesSinceBackup:0 }; localStorage.setItem(BACKUP_META_KEY,JSON.stringify(backupMeta)); renderAll(); showToast('Local data reset'); },'Reset data'));
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
  navigator.serviceWorker.register('service-worker.js?v=1.3.3', { updateViaCache: 'none' }).then(registration => {
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
