// Transit Guide - Comprehensive City Data
// Generated from TransitPal base content packages

export const citiesData = [
  {
    id: 'bratislava',
    name: 'Bratislava',
    country: 'Slovakia',
    image: 'https://www.welcometobratislava.eu/wp-content/uploads/2017/10/dt-public-transport.jpg',
    
    metadata: {
      authority: 'Dopravný podnik Bratislava (DPB)',
      integratedSystem: 'IDS BK (Integrated Transport System of the Bratislava Region)',
      primaryLanguage: 'Slovak',
      touristRelevance: 'High'
    },

    zones: {
      main: 'Zone 100',
      description: 'Bratislava city (most visitors only need this zone)',
      note: 'If you are staying inside Bratislava, you usually only need Zone 100.'
    },

    fares: {
      basic: [
        { type: '30-minute ticket', validity: '30 min', price: '€1.10', notes: 'Transfer allowed within time limit' },
        { type: '60-minute ticket', validity: '60 min', price: '€1.60', notes: 'Most common choice' },
        { type: '24-hour pass', validity: '24 hours', price: '€4.80', notes: 'Unlimited travel in Zone 100' },
        { type: '72-hour pass', validity: '72 hours', price: '€10.80', notes: 'Good for weekend trips' }
      ],
      discounted: [
        { type: '30-minute discounted', validity: '30 min', price: '€0.55', notes: 'For eligible passengers only' },
        { type: '60-minute discounted', validity: '60 min', price: '€0.80', notes: 'Most common discounted option' },
        { type: '24-hour discounted pass', validity: '24 hours', price: '€2.40', notes: 'Unlimited travel in Zone 100' }
      ],
      discountNote: 'There is NO free student fare in Bratislava. Students are entitled to discounted fares only, not free travel.'
    },

    eligibility: [
      { type: 'Children', discount: 'Reduced fare', conditions: 'Age-based eligibility' },
      { type: 'Students', discount: 'Reduced fare only', conditions: 'ISIC or valid student ID' },
      { type: 'Seniors (62–69)', discount: 'Reduced fare', conditions: 'Valid ID required' },
      { type: 'Seniors (70+)', discount: 'Free travel', conditions: 'ID required' }
    ],

    transport: ['Bus', 'Tram', 'Trolleybus', 'Night buses'],

    validation: {
      rules: [
        'Paper tickets must be validated immediately after boarding',
        'Validation machines are yellow or orange, located near vehicle doors',
        'Inspectors perform frequent checks',
        'Fine for invalid ticket can be high'
      ]
    },

    planners: [
      {
        name: 'imhd.sk',
        description: 'Very popular local website with timetables, real-time departures, maps',
        url: 'https://imhd.sk/ba/',
        type: 'Official'
      },
      {
        name: 'imhd.sk – Journey Planner',
        description: 'Direct access to trip planning',
        url: 'https://imhd.sk/ba/planovac-cesty',
        type: 'Official'
      },
      {
        name: 'CP – Central timetables',
        description: 'Widely used Slovak journey planner',
        url: 'https://m.cp.sk/idsbk/',
        type: 'Third-party'
      }
    ],

    apps: [
      {
        name: 'IDS BK mobile app',
        description: 'Official app - Route planning, real-time info, ticket purchase',
        platforms: ['Android', 'iOS'],
        features: ['Route planning', 'Real-time information', 'Ticket purchase', 'Often cheaper than paper tickets'],
        links: {
          android: 'https://play.google.com/store/apps/details?id=com.casperise.urbi.online.bid&hl=sk',
          ios: 'https://apps.apple.com/sk/app/ids-bk-cestujeme-jednoduch%C5%A1ie/id1360894243',
          info: 'https://www.idsbk.sk/'
        }
      },
      {
        name: 'DPB city transport app',
        description: 'Information-focused app by Dopravný podnik Bratislava',
        platforms: ['Android', 'iOS'],
        features: ['Timetables', 'Service notices']
      }
    ],

    officialLinks: {
      website: 'https://www.idsbk.sk/',
      operator: 'https://www.dpb.sk/',
      planner: 'https://imhd.sk/ba/'
    },

    visitorNotes: [
      'Most visitors only need Zone 100',
      'Mobile tickets are the easiest option',
      'Always validate paper tickets',
      'Ticket inspections are common'
    ],

    verified: true
  },

  {
    id: 'banska-bystrica',
    name: 'Banská Bystrica',
    country: 'Slovakia',
    image: 'https://cdn.banskabystrica.sk/2023/07/image00040-1200x900.jpeg',
    
    metadata: {
      authority: 'Dopravný podnik mesta Banská Bystrica (DPMBB)',
      integratedSystem: 'City public transport (MHD Banská Bystrica)',
      primaryLanguage: 'Slovak',
      touristRelevance: 'Medium'
    },

    zones: {
      main: 'Single city zone',
      description: 'Banská Bystrica uses a single-zone system',
      note: 'All trips within the city use the same fare.'
    },

    fares: {
      basic: [
        { type: '30-minute ticket', validity: '30 min', price: '€0.90', notes: 'Transfer allowed within time limit' },
        { type: '60-minute ticket', validity: '60 min', price: '€1.10', notes: 'Most common choice' },
        { type: '24-hour pass', validity: '24 hours', price: '€3.50', notes: 'Unlimited travel' }
      ],
      discounted: [
        { type: '30-minute discounted', validity: '30 min', price: '€0.45', notes: 'Eligible passengers only' },
        { type: '60-minute discounted', validity: '60 min', price: '€0.55', notes: 'Most common discounted option' },
        { type: '24-hour discounted pass', validity: '24 hours', price: '€1.75', notes: 'Unlimited travel' }
      ],
      discountNote: 'There is NO free student fare in Banská Bystrica. Students are entitled to discounted fares only.'
    },

    eligibility: [
      { type: 'Children', discount: 'Reduced fare', conditions: 'Age-based eligibility' },
      { type: 'Students', discount: 'Reduced fare only', conditions: 'ISIC or valid student ID' },
      { type: 'Seniors (62–69)', discount: 'Reduced fare', conditions: 'Valid ID required' },
      { type: 'Seniors (70+)', discount: 'Free travel', conditions: 'ID required' }
    ],

    transport: ['Bus', 'Trolleybus'],

    validation: {
      rules: [
        'Paper tickets must be validated immediately after boarding',
        'Validation machines are yellow or orange',
        'Ticket inspections occur regularly',
        'Fine for invalid ticket can be significant'
      ]
    },

    planners: [
      {
        name: 'cp.hnonline.sk / m.cp.sk',
        description: 'Widely used Slovak journey planner',
        url: 'https://m.cp.sk/',
        type: 'Popular'
      },
      {
        name: 'imhd.sk',
        description: 'Timetables and vehicle information',
        url: 'https://imhd.sk/',
        type: 'Third-party'
      }
    ],

    apps: [
      {
        name: 'CVAK mobile app',
        description: 'Official mobile application for public transport tickets',
        platforms: ['Android', 'iOS'],
        features: ['Digital ticket purchase', 'No paper validation needed', 'Activated digitally'],
        links: {
          info: 'https://sadzv.sk/sluzby-cestujucim/mobilna-aplikacia-cvak/',
          android: 'https://play.google.com/store/apps/details?id=sk.sadzv.cvak',
          ios: 'https://apps.apple.com/sk/app/cvak/id1570205936'
        }
      }
    ],

    officialLinks: {
      website: 'https://www.dpmbb.sk/',
      operator: 'https://www.dpmbb.sk/',
      city: 'https://www.banskabystrica.sk/'
    },

    visitorNotes: [
      'Single-zone system simplifies ticket choice',
      'Mobile/SMS tickets are convenient',
      'Always validate paper tickets',
      'Inspectors perform regular checks'
    ],

    verified: true
  },

  {
    id: 'porto',
    name: 'Porto',
    country: 'Portugal',
    image: 'https://images.pexels.com/photos/35339987/pexels-photo-35339987.jpeg',
    
    metadata: {
      authority: 'Metro do Porto (metro/light rail), STCP (buses)',
      integratedSystem: 'Andante',
      primaryLanguage: 'Portuguese',
      touristRelevance: 'Very high'
    },

    zones: {
      main: 'Z2–Z4 zones',
      description: 'Porto city, Vila Nova de Gaia, Matosinhos',
      note: 'Most trips between Porto ↔ Vila Nova de Gaia are covered by Z2 or Z3 tickets. Airport trips may require Z4.'
    },

    fares: {
      basic: [
        { type: 'Andante Z2', validity: '1 hour', price: '€1.40', notes: 'Short trips within city center' },
        { type: 'Andante Z3', validity: '1 hour', price: '€1.80', notes: 'Typical Porto ↔ Gaia trips' },
        { type: 'Andante Z4', validity: '1 hour', price: '€2.25', notes: 'Airport / longer urban trips' }
      ],
      passes: [
        { type: 'Andante 24 (Z2)', validity: '24 hours', price: '€4.15', notes: 'Unlimited travel in 2 zones' },
        { type: 'Andante 24 (Z3)', validity: '24 hours', price: '€5.55', notes: 'Most tourist use' },
        { type: 'Andante Tour 1', validity: '24 hours', price: '€7.50', notes: 'All zones - tourist-oriented' },
        { type: 'Andante Tour 3', validity: '72 hours', price: '€16.00', notes: 'Best for longer stays' }
      ],
      discountNote: 'Most discounts apply to residents with Andante profiles. Children under 4 travel free.'
    },

    eligibility: [
      { type: 'Children under 4', discount: 'Free travel', conditions: 'None' },
      { type: 'Youth/Students/Seniors', discount: 'Reduced fare', conditions: 'Usually requires local registration' }
    ],

    transport: ['Metro / Light Rail', 'City buses (STCP)', 'Urban trains (CP)', 'Funiculars', 'Historic trams'],

    validation: {
      rules: [
        'Validate at yellow validators before boarding',
        'Metro stations: validate before entering platform',
        'Buses: validate on-board',
        'One ticket = one person',
        'Inspections are common; fines apply'
      ]
    },

    planners: [
      {
        name: 'Metro do Porto',
        description: 'Official metro network maps and service updates',
        url: 'https://www.metrodoporto.pt/',
        type: 'Official'
      },
      {
        name: 'STCP',
        description: 'Official bus routes and timetables',
        url: 'https://www.stcp.pt/',
        type: 'Official'
      },
      {
        name: 'CP – Comboios de Portugal',
        description: 'Urban and regional train schedules',
        url: 'https://www.cp.pt/',
        type: 'Official'
      }
    ],

    apps: [
      {
        name: 'Anda app',
        description: 'Official Andante app with automatic fare calculation',
        platforms: ['Android', 'iOS'],
        features: ['Automatic fare calculation', 'Uses smartphone as ticket']
      },
      {
        name: 'Metro do Porto app',
        description: 'Service information and maps',
        platforms: ['Android', 'iOS'],
        features: ['Maps', 'Service updates']
      }
    ],

    officialLinks: {
      website: 'https://andante.pt/',
      metro: 'https://www.metrodoporto.pt/',
      buses: 'https://www.stcp.pt/',
      trains: 'https://www.cp.pt/'
    },

    visitorNotes: [
      'Most visitors need Z3 tickets for Porto + Vila Nova de Gaia',
      'Metro is the fastest way to cross the river',
      'Always validate before boarding',
      'Andante Tour passes are simple for short stays'
    ],

    verified: true
  },

  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800',
    
    metadata: {
      authority: 'ATAC S.p.A.',
      integratedSystem: 'Metrebus Roma / Metrebus Lazio',
      primaryLanguage: 'Italian',
      touristRelevance: 'Very high'
    },

    zones: {
      main: 'Rome urban network',
      description: 'Metro (A/B/B1/C), buses, trams, urban rail',
      note: 'If you stay in central Rome and main attractions, you typically need urban (Metrebus Roma) tickets.'
    },

    fares: {
      basic: [
        { type: 'BIT (integrated timed ticket)', validity: '100 minutes', price: '€1.50', notes: 'One metro entry; unlimited bus/tram' },
        { type: 'MULTIBIT', validity: '10 × 100 minutes', price: '€15.00', notes: 'Bundle of 10 BIT tickets' }
      ],
      passes: [
        { type: 'ROMA 24H', validity: '24 hours', price: '€8.50', notes: 'Unlimited urban network travel' },
        { type: 'ROMA 48H', validity: '48 hours', price: '€15.00', notes: 'Unlimited urban network travel' },
        { type: 'ROMA 72H', validity: '72 hours', price: '€22.00', notes: 'Unlimited urban network travel' },
        { type: 'CIS (weekly)', validity: '7 days', price: '€29.00', notes: 'Valid until midnight of 7th day' }
      ],
      discountNote: 'Children up to age 10 travel free with fare-paying adult. Other discounts often resident-specific.'
    },

    eligibility: [
      { type: 'Children up to 10', discount: 'Free travel', conditions: 'Must be accompanied by fare-paying adult' },
      { type: 'Students/Youth/Seniors', discount: 'Reduced fare', conditions: 'Often tied to residency or registration' }
    ],

    transport: ['Metro (A, B/B1, C)', 'Bus', 'Tram', 'Urban rail'],

    validation: {
      rules: [
        'Paper tickets: validate at start of travel',
        'Metro: validate at entry gates',
        'Bus/tram: validate on-board using machines',
        'Digital/QR tickets: follow app instructions',
        'Inspections occur regularly; significant fines'
      ]
    },

    planners: [
      {
        name: 'ATAC official website',
        description: 'Service updates, maps, ticketing information',
        url: 'https://www.atac.roma.it/en/',
        type: 'Official'
      },
      {
        name: 'Moovit',
        description: 'Popular in Rome - route planning and sometimes in-app tickets',
        url: 'https://moovitapp.com/',
        type: 'Third-party'
      }
    ],

    apps: [
      {
        name: 'TicketAppy',
        description: 'ATAC partner app for ticket purchase with QR validation',
        platforms: ['Android', 'iOS'],
        features: ['Ticket purchase', 'QR validation'],
        links: {
          info: 'https://www.atac.roma.it/en/tickets-and-passes/request-and-charge-online/ticketappy',
          android: 'https://play.google.com/store/apps/details?id=it.xaos.android.ticketappy',
          ios: 'https://apps.apple.com/pl/app/ticketappy/id1473284979'
        }
      },
      {
        name: 'Atac tap&go',
        description: 'Verification and tracking of contactless taps',
        platforms: ['Android'],
        features: ['Tap tracking', 'Fare verification'],
        links: {
          android: 'https://play.google.com/store/apps/details?id=it.roma.atac.autoverifica'
        }
      }
    ],

    officialLinks: {
      website: 'https://www.atac.roma.it/en/',
      tickets: 'https://www.atac.roma.it/en/tickets-and-passes',
      tapAndGo: 'https://www.atac.roma.it/en/tickets-and-passes/tap-go'
    },

    visitorNotes: [
      'Start with BIT (100 minutes) or a 24/48/72h pass',
      'Validate paper tickets (metro gates or on-board)',
      'Consider tap&go with contactless card for metro',
      'TicketAppy is a common digital ticket option'
    ],

    verified: true
  }
];

export default citiesData;
