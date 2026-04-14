// ─────────────────────────────────────────────────────────────────────────────
// Worden Autonomous Legal Intelligence — Federal & State Law Data Layer
// Source: 29 CFR (OSHA), 49 CFR (DOT), State Lien Codes, Privacy Acts
// Updated: 2025 | Advisory Use Only — Not Legal Counsel
// ─────────────────────────────────────────────────────────────────────────────

export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type LawCategory =
  | 'OSHA'
  | 'DOT'
  | 'LIEN'
  | 'PRIVACY'
  | 'ENVIRONMENTAL'
  | 'LABOR'
  | 'CONTRACT'
  | 'LICENSING';

export interface FederalLaw {
  id: string;
  code: string;
  title: string;
  category: LawCategory;
  summary: string;
  riskLevel: RiskLevel;
  triggerConditions: string[];
  penaltyRange: string;
  referenceUrl: string;
}

export interface StateLaw {
  stateCode: string;
  stateName: string;
  lienLaw: {
    code: string;
    title: string;
    deadline: string;
    summary: string;
    contractClause: string;
  };
  privacyLaw?: {
    code: string;
    title: string;
    summary: string;
    contractClause: string;
  };
  contractorLicense: {
    code: string;
    requirement: string;
    contractClause: string;
  };
  laborLaw: {
    code: string;
    prevailingWageThreshold: string;
    contractClause: string;
  };
  additionalClauses: string[];
}

export interface OverrideRisk {
  id: string;
  action: string;
  federalCode?: string;
  stateCodeRef?: string;
  riskLevel: RiskLevel;
  warningTitle: string;
  warningBody: string;
  liabilityStatement: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// FEDERAL LAWS
// ─────────────────────────────────────────────────────────────────────────────
export const FEDERAL_LAWS: FederalLaw[] = [
  {
    id: 'osha-1926-502',
    code: '29 CFR 1926.502',
    title: 'Fall Protection Systems — Construction',
    category: 'OSHA',
    riskLevel: 'CRITICAL',
    summary:
      'Requires fall protection for workers at heights of 6 feet or more in construction. Includes guardrails, safety nets, and personal fall arrest systems.',
    triggerConditions: ['roofing work', 'elevated platform', 'crane operation', 'bridge deck'],
    penaltyRange: '$15,625–$156,259 per violation',
    referenceUrl: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.502',
  },
  {
    id: 'osha-1926-651',
    code: '29 CFR 1926.651',
    title: 'Excavation Safety Requirements',
    category: 'OSHA',
    riskLevel: 'CRITICAL',
    summary:
      'Mandates cave-in protection, daily inspection, and egress for all excavations deeper than 5 feet. Type A, B, or C soil classification required.',
    triggerConditions: ['excavation > 5 ft', 'trenching', 'utility work', 'underground utilities'],
    penaltyRange: '$15,625–$156,259 per violation',
    referenceUrl: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.651',
  },
  {
    id: 'osha-1910-178',
    code: '29 CFR 1910.178',
    title: 'Powered Industrial Trucks — Forklift Safety',
    category: 'OSHA',
    riskLevel: 'HIGH',
    summary:
      'Operator certification, daily inspection, and load capacity compliance required for all powered industrial trucks and forklifts on job sites.',
    triggerConditions: ['forklift operation', 'material handling', 'loading dock'],
    penaltyRange: '$15,625 per violation',
    referenceUrl: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1910/1910.178',
  },
  {
    id: 'osha-1926-603',
    code: '29 CFR 1926.603',
    title: 'Pile Driving Equipment Safety',
    category: 'OSHA',
    riskLevel: 'HIGH',
    summary:
      'Safety requirements for pile driving and foundation work including leads, hammers, and steam lines.',
    triggerConditions: ['pile driving', 'deep foundation', 'bridge pier', 'retaining wall'],
    penaltyRange: '$15,625–$156,259 per violation',
    referenceUrl: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.603',
  },
  {
    id: 'dot-392-14',
    code: '49 CFR 392.14',
    title: 'Hazardous Driving Conditions — Extreme Caution',
    category: 'DOT',
    riskLevel: 'CRITICAL',
    summary:
      'Requires commercial vehicle operators to exercise extreme caution in hazardous driving conditions. Mandates stopping if conditions are dangerous.',
    triggerConditions: ['ice on roads', 'snow event', 'heavy rain', 'visibility < 100ft', 'flooding'],
    penaltyRange: '$16,000–$27,904 per violation (out-of-service)',
    referenceUrl: 'https://www.ecfr.gov/current/title-49/subtitle-B/chapter-III/subchapter-B/part-392/subpart-B/section-392.14',
  },
  {
    id: 'dot-395-3',
    code: '49 CFR 395.3',
    title: 'Hours of Service — Maximum Driving Time',
    category: 'DOT',
    riskLevel: 'HIGH',
    summary:
      '11-hour driving limit after 10 consecutive hours off duty. 14-hour on-duty window. 60/70-hour limits over 7/8 consecutive days.',
    triggerConditions: ['long-haul delivery', 'overnight crew', 'asphalt delivery > 8hr'],
    penaltyRange: '$16,000 per violation; $27,904 for egregious violations',
    referenceUrl: 'https://www.fmcsa.dot.gov/regulations/hours-service',
  },
  {
    id: 'dot-350-weight',
    code: '23 CFR 658 / 23 USC 127',
    title: 'Federal Bridge Formula — Truck Weight Limits',
    category: 'DOT',
    riskLevel: 'CRITICAL',
    summary:
      'Federal bridge formula limits single axle to 20,000 lbs, tandem axles to 34,000 lbs, and gross vehicle weight to 80,000 lbs. Interstate highway enforcement.',
    triggerConditions: ['overweight load', 'tandem axle > 34k', 'GVW > 80k lbs', 'bridge crossing'],
    penaltyRange: '$10,000–$16,000 per incident; potential criminal charges',
    referenceUrl: 'https://ops.fhwa.dot.gov/freight/infrastructure/size_regs_final_rpt/',
  },
  {
    id: 'osha-heat-stress',
    code: '29 CFR 1910.119 / Heat Illness Prevention',
    title: 'Heat Illness Prevention — Outdoor Workers',
    category: 'OSHA',
    riskLevel: 'HIGH',
    summary:
      'OSHA Heat Illness Prevention standard requires water, rest, shade when temperatures exceed 80°F. Mandatory acclimatization for new workers. Heat index > 103°F requires high-risk protocols.',
    triggerConditions: ['ambient temp > 95°F', 'heat index > 103°F', 'paving in extreme heat', 'no shade available'],
    penaltyRange: '$15,625 per violation; $156,259 for willful/repeat',
    referenceUrl: 'https://www.osha.gov/heat',
  },
  {
    id: 'osha-silica',
    code: '29 CFR 1926.1153',
    title: 'Respirable Crystalline Silica — Construction',
    category: 'OSHA',
    riskLevel: 'HIGH',
    summary:
      'Requires exposure control plans, engineering controls, and medical surveillance for silica exposure above action level (25 µg/m³) during cutting, grinding, or drilling.',
    triggerConditions: ['concrete cutting', 'masonry grinding', 'road milling', 'core drilling'],
    penaltyRange: '$15,625–$156,259 per violation',
    referenceUrl: 'https://www.osha.gov/silica-crystalline',
  },
  {
    id: 'epa-npdes',
    code: '40 CFR 122 (NPDES)',
    title: 'Stormwater Discharge Permit — Construction Sites',
    category: 'ENVIRONMENTAL',
    riskLevel: 'HIGH',
    summary:
      'Construction sites disturbing 1+ acre require a NPDES Construction General Permit. Requires SWPPP (Stormwater Pollution Prevention Plan), erosion controls, and inspection logs.',
    triggerConditions: ['site > 1 acre', 'grading', 'excavation', 'land disturbance'],
    penaltyRange: '$25,000–$75,000 per day per violation',
    referenceUrl: 'https://www.epa.gov/npdes/stormwater-discharges-construction-activities',
  },
  {
    id: 'davis-bacon',
    code: '40 USC 3141–3148 (Davis-Bacon Act)',
    title: 'Davis-Bacon Prevailing Wage Requirements',
    category: 'LABOR',
    riskLevel: 'HIGH',
    summary:
      'Federal contractors on public construction projects > $2,000 must pay laborers and mechanics the locally prevailing wages and fringe benefits as determined by DOL.',
    triggerConditions: ['federal contract', 'public project', 'government funding', 'USDOT project'],
    penaltyRange: 'Contract termination; debarment; back pay liability',
    referenceUrl: 'https://www.dol.gov/agencies/whd/government-contracts/construction',
  },
  {
    id: 'ada-title-iii',
    code: '42 USC 12182 / ADA Title III',
    title: 'ADA Accessibility — Public Accommodations',
    category: 'CONTRACT',
    riskLevel: 'HIGH',
    summary:
      'All public-facing construction and renovation must comply with ADA accessibility standards. Includes curb cuts, ramps, parking stall dimensions, and accessible routes.',
    triggerConditions: ['public parking lot', 'retail', 'commercial property', 'government building'],
    penaltyRange: '$75,000 first violation; $150,000 subsequent violations',
    referenceUrl: 'https://www.ada.gov/law-and-regs/regulations/title-iii-regulations/',
  },
  {
    id: 'osha-crane',
    code: '29 CFR 1926.1400',
    title: 'Cranes and Derricks in Construction',
    category: 'OSHA',
    riskLevel: 'CRITICAL',
    summary:
      'Crane operator certification required. Wind speed limits: suspend operations at 25+ mph sustained or 35+ mph gusts. Power line clearance: minimum 20 ft for lines up to 350kV.',
    triggerConditions: ['crane operation', 'lift > 2000 lbs', 'wind speed > 25mph', 'near power lines'],
    penaltyRange: '$15,625–$156,259 per violation',
    referenceUrl: 'https://www.osha.gov/laws-regs/regulations/standardnumber/1926/1926.1400',
  },
  {
    id: 'osha-asphalt-fumes',
    code: '29 CFR 1910.1000 Table Z-1',
    title: 'Asphalt Fume Exposure Limits',
    category: 'OSHA',
    riskLevel: 'MEDIUM',
    summary:
      'OSHA PEL for asphalt fumes: 5 mg/m³ (ceiling). NIOSH REL: 0.5 mg/m³ (10-hr TWA). Requires respiratory protection and ventilation during hot-mix asphalt paving.',
    triggerConditions: ['hot mix asphalt', 'paving operations', 'confined space paving', 'milling'],
    penaltyRange: '$15,625 per violation',
    referenceUrl: 'https://www.osha.gov/asphalt',
  },
  {
    id: 'fmcsa-medical',
    code: '49 CFR 391.41',
    title: 'DOT Physical / Medical Certificate Requirements',
    category: 'DOT',
    riskLevel: 'HIGH',
    summary:
      'CDL drivers must hold a current DOT Medical Examiner Certificate (Form MCSA-5876). Certificate valid up to 24 months. Drivers with certain conditions require shorter intervals.',
    triggerConditions: ['CDL driver', 'dump truck', 'tanker', 'commercial vehicle > 26,001 lbs'],
    penaltyRange: '$16,000 per day vehicle operated without valid medical certificate',
    referenceUrl: 'https://www.fmcsa.dot.gov/medical/driver-medical-requirements/driver-medical-fitness-duty',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// STATE LAWS (All 50 States)
// ─────────────────────────────────────────────────────────────────────────────
export const STATE_LAWS: Record<string, StateLaw> = {
  VA: {
    stateCode: 'VA',
    stateName: 'Virginia',
    lienLaw: {
      code: 'Virginia Code § 43-1 et seq.',
      title: 'Virginia Mechanic\'s Lien',
      deadline: '90 days from last work; 150 days for general contractor to enforce',
      summary: 'Virginia mechanic\'s liens must be recorded within 90 days of last work performed. General contractors have 150 days from last work to file. Sub-contractors must provide pre-lien notice to owner within 30 days of first furnishing labor/materials.',
      contractClause: 'VIRGINIA LIEN RIGHTS NOTICE (Virginia Code § 43-1): Contractor retains the right to file a mechanic\'s lien against this property in accordance with Virginia Code § 43-1 et seq. for unpaid labor and materials. Owner acknowledges this statutory right.',
    },
    contractorLicense: {
      code: 'Virginia Code § 54.1-1100 et seq.',
      requirement: 'Virginia Class A Contractor License required for projects > $120,000 or unlimited scope. Class B for $10,000–$120,000. Class C for $1,000–$10,000.',
      contractClause: 'CONTRACTOR LICENSING: J. Worden & Sons holds a Virginia Class A Contractor License as required by Virginia Code § 54.1-1100 et seq. License number on file.',
    },
    laborLaw: {
      code: 'Virginia Code § 2.2-4321 et seq.',
      prevailingWageThreshold: 'Public contracts > $500,000 subject to Virginia Prevailing Wage Law (effective May 1, 2021).',
      contractClause: 'VIRGINIA PREVAILING WAGE: For public contracts exceeding $500,000, contractor shall comply with the Virginia Prevailing Wage Law (§ 2.2-4321) and post wage determinations at the jobsite.',
    },
    additionalClauses: [
      'VDOT SPECIFICATION COMPLIANCE: All asphalt work performed under VDOT Road & Bridge Specifications, current edition. Compaction minimum 96% Marshall Unit Weight per VDOT Section 315.',
      'ENVIRONMENTAL COMPLIANCE: Contractor shall obtain and comply with all VPDES permits for land disturbance > 2,500 sq ft per Virginia Stormwater Management Act (§ 62.1-44.15:24).',
    ],
  },
  TX: {
    stateCode: 'TX',
    stateName: 'Texas',
    lienLaw: {
      code: 'Texas Property Code Chapter 53',
      title: 'Texas Mechanic\'s Lien — Chapter 53',
      deadline: 'Notice deadline: 15th day of 3rd month (commercial) or 2nd month (residential) after furnishing. Affidavit must be filed by 15th day of 4th month after project completion.',
      summary: 'Texas has strict preliminary notice requirements. Sub-contractors and suppliers must send monthly notices to both owner and general contractor. Failure to provide timely notice forfeits lien rights.',
      contractClause: 'TEXAS LIEN RIGHTS NOTICE (Texas Property Code Chapter 53): Pursuant to Texas Property Code § 53.055, Contractor hereby notifies Owner that persons who provide labor or materials for improvements to real property and are not paid may assert lien claims against the Owner\'s property. This Notice is provided as required by Texas law.',
    },
    contractorLicense: {
      code: 'Texas Occupations Code Chapter 1305 / TDLR',
      requirement: 'Electrical contractor licensing required. General contractor license not required at state level in Texas, but required by many municipalities. Austin, Houston, Dallas require city registration.',
      contractClause: 'TEXAS CONTRACTOR REGISTRATION: Contractor shall maintain all municipal contractor registrations required by the applicable jurisdiction. Electrical subcontractors hold TDLR electrical contractor license.',
    },
    laborLaw: {
      code: 'Texas Labor Code § 2258',
      prevailingWageThreshold: 'Public works contracts: prevailing wage rate applies to all laborers on public contracts per Texas Government Code § 2258.021.',
      contractClause: 'TEXAS PREVAILING WAGE: For public works projects, contractor shall pay prevailing wage rates as determined by the governmental entity per Texas Government Code § 2258. Certified payroll records available upon request.',
    },
    additionalClauses: [
      'TEXAS PROPERTY CODE § 53.026 WAIVER: Upon receipt of final payment, Contractor provides a statutory lien waiver as prescribed by Texas Property Code § 53.026. Conditional waivers provided with progress payments.',
      'TEXAS DECEPTIVE TRADE PRACTICES: Services provided in compliance with Texas Business & Commerce Code § 17.46 (DTPA). All representations in this proposal are true and correct.',
      'TEXAS ARCHITECT/ENGINEER STAMP: Structural modifications exceeding $50,000 on commercial property require licensed PE/architect stamp per Texas Occupations Code § 1001.',
    ],
  },
  CA: {
    stateCode: 'CA',
    stateName: 'California',
    lienLaw: {
      code: 'California Civil Code § 8000–8848',
      title: 'California Mechanic\'s Lien — Civil Code § 8000',
      deadline: 'Preliminary notice within 20 days of first furnishing. Lien must be recorded within 90 days of project completion (or 60 days after Notice of Completion).',
      summary: 'California requires preliminary 20-day notice to preserve lien rights. Civil Code § 8200-8216 governs pre-lien notices. All claimants except direct contractors must serve preliminary notice.',
      contractClause: 'CALIFORNIA MECHANIC\'S LIEN NOTICE (Civil Code § 8200): NOTICE TO PROPERTY OWNER: If bills are not paid in full for the labor, services, equipment, or materials furnished or to be furnished, a mechanic\'s lien leading to the loss, through court foreclosure proceedings, of all or part of your property being improved may be placed against the property even though you have paid your prime contractor in full. You may wish to protect yourself against this consequence by (1) requiring your prime contractor to furnish a signed release by the person or firm giving you this notice before making payment to your contractor, or (2) any other method or device that is appropriate under the circumstances.',
    },
    privacyLaw: {
      code: 'California Civil Code § 1798.100 et seq. (CCPA/CPRA)',
      title: 'California Consumer Privacy Act (CCPA) / California Privacy Rights Act (CPRA)',
      summary: 'Businesses collecting personal information of California residents must disclose data collection practices, provide opt-out rights for data sale, and honor deletion requests within 45 days.',
      contractClause: 'CALIFORNIA PRIVACY RIGHTS (CCPA/CPRA — Civil Code § 1798.100): This agreement incorporates the privacy disclosures required by the California Consumer Privacy Act. Client data collected in connection with this project is used solely for project management purposes. Client may request disclosure, deletion, or opt-out of data sale by contacting privacy@jworden.com. Data is not sold to third parties.',
    },
    contractorLicense: {
      code: 'California Business & Professions Code § 7000 (CSLB)',
      requirement: 'California Contractors State License Board (CSLB) license required for projects > $500. Class B General Building Contractor for most work. Class A for civil/heavy construction.',
      contractClause: 'CALIFORNIA CONTRACTOR LICENSE: Contractor holds CSLB license as required by California Business & Professions Code § 7028. License classification and number available upon request. It is illegal for an unlicensed person to perform contract work on any project valued at $500 or more.',
    },
    laborLaw: {
      code: 'California Labor Code § 1720 et seq.',
      prevailingWageThreshold: 'All public works projects regardless of amount subject to California prevailing wage. Private construction: wage theft laws apply to all workers.',
      contractClause: 'CALIFORNIA PREVAILING WAGE (Labor Code § 1720): For all public works, contractor pays prevailing wage rates determined by California DIR. Certified payroll submitted weekly. DIR registration required for all contractors and subcontractors. Penalty: $200/day per violation.',
    },
    additionalClauses: [
      'CALIFORNIA PROPOSITION 65: Project materials comply with California Safe Drinking Water & Toxic Enforcement Act (Prop 65). No materials containing listed chemicals above threshold levels used without required warning.',
      'CALIFORNIA AB 5 (Contractor Classification): All workers classified per California Labor Code § 2775 (ABC Test). Subcontractors operating as independent contractors meet all three prongs of the ABC test.',
      'CALIFORNIA STORMWATER (SWPPP): Sites disturbing > 1 acre require Construction General Permit (CGP) from State Water Board. SWPPP prepared and QSP certified per Order 2009-0009-DWQ.',
    ],
  },
  FL: {
    stateCode: 'FL',
    stateName: 'Florida',
    lienLaw: {
      code: 'Florida Statutes Chapter 713',
      title: 'Florida Construction Lien Law — Chapter 713',
      deadline: 'Notice to Owner within 45 days of first labor/materials. Claim of Lien within 90 days of last furnishing.',
      summary: 'Florida requires Notice to Owner (NTO) within 45 days. All claimants except direct contractors must serve NTO. Lien must be recorded within 90 days of last work. Claim must be enforced within 1 year.',
      contractClause: 'FLORIDA LIEN LAW NOTICE (Florida Statutes § 713.06): NOTICE TO OWNER: FLORIDA\'S CONSTRUCTION LIEN LAW ALLOWS CERTAIN CONTRACTORS, SUBCONTRACTORS, AND MATERIAL SUPPLIERS TO FILE LIENS AGAINST YOUR PROPERTY EVEN IF YOU HAVE PAID YOUR CONTRACTOR IN FULL. Under Florida\'s laws, your failure to make sure that we are paid may result in a lien against your property and your paying twice. To avoid a lien and paying twice, you must obtain a written release from us every time you pay your contractor.',
    },
    contractorLicense: {
      code: 'Florida Statutes § 489.105 et seq. (DBPR)',
      requirement: 'Florida Certified or Registered General Contractor license required. DBPR licensure mandatory. Local jurisdiction contractor certification may also be required.',
      contractClause: 'FLORIDA CONTRACTOR LICENSE: Contractor holds valid Florida DBPR contractor license as required by Florida Statutes § 489.115. License type and number provided upon request.',
    },
    laborLaw: {
      code: 'Florida Statutes § 448.109 (Construction Industry)',
      prevailingWageThreshold: 'Florida has no state prevailing wage law (repealed 1979). Federal Davis-Bacon applies to federally funded projects.',
      contractClause: 'FLORIDA WAGE COMPLIANCE: For federally funded projects, Davis-Bacon Act prevailing wages apply. For state/local projects, federal minimum wage ($7.25/hr) and Florida minimum wage rates apply per Florida Statutes § 448.110.',
    },
    additionalClauses: [
      'FLORIDA HURRICANE SEASON CONTINGENCY: For projects in coastal counties, contractor reserves the right to suspend operations during tropical storm / hurricane warnings per Florida Statutes § 768.76. Additional mobilization costs may apply.',
      'FLORIDA UNDERGROUND FACILITY DAMAGE PREVENTION ACT (Chapter 556): All excavation to proceed only after Sunshine 811 notification and utility locate confirmation per Florida Statutes § 556.108.',
    ],
  },
  NY: {
    stateCode: 'NY',
    stateName: 'New York',
    lienLaw: {
      code: 'New York Lien Law Article 2',
      title: 'New York Mechanic\'s Lien — Lien Law § 3',
      deadline: 'Private property: file within 8 months (4 months for single-family). Public improvement: file within 30 days of final acceptance.',
      summary: 'New York Lien Law provides a trust fund mechanism — all payments received by a GC become trust assets for the benefit of subs and suppliers. Misappropriation is a felony under Lien Law § 79-a.',
      contractClause: 'NEW YORK LIEN TRUST NOTICE (NY Lien Law § 3-a): All funds received by Contractor for improvement of real property are trust assets under Article 3-A of the New York Lien Law, and shall be applied first to the payment of trust claims as defined by the Lien Law.',
    },
    contractorLicense: {
      code: 'New York City Administrative Code § 28-401 / NYS Education Law',
      requirement: 'New York City requires NYC contractor license for most work. NYC Home Improvement Contractor (HIC) license required for residential. PE/RA stamped drawings required for commercial structural.',
      contractClause: 'NEW YORK CONTRACTOR LICENSING: Contractor holds applicable New York City and/or New York State contractor licenses as required by jurisdiction. NYC HIC license and bond on file where applicable.',
    },
    laborLaw: {
      code: 'New York Labor Law § 220 et seq.',
      prevailingWageThreshold: 'Public works projects of any amount subject to NY prevailing wage. NYC LL 196-A requires supplemental wage fund for building service workers.',
      contractClause: 'NEW YORK PREVAILING WAGE (Labor Law § 220): For public works, contractor pays prevailing wage and supplement rates published by NYC Comptroller or NYS DOL. Weekly certified payroll submitted. Penalty: criminal prosecution + civil damages.',
    },
    additionalClauses: [
      'NEW YORK LABOR LAW § 240 (SCAFFOLD LAW): Contractor is aware of New York\'s absolute liability under Labor Law § 240 for gravity-related accidents. All scaffold, ladder, and elevated work operations comply with OSHA 1926 Subpart Q and NYS Industrial Code Rule 23.',
      'NEW YORK ENERGY CODE: All construction complies with New York State Energy Conservation Construction Code (19 NYCRR Part 1240) and applicable NYC Energy Code.',
    ],
  },
  NC: {
    stateCode: 'NC',
    stateName: 'North Carolina',
    lienLaw: {
      code: 'North Carolina General Statutes § 44A-7 et seq.',
      title: 'North Carolina Claim of Lien on Funds',
      deadline: 'Notice of Claim on Funds as soon as work begins. Lien on Real Property: file within 120 days of last labor/materials.',
      summary: 'North Carolina uses a "lien on funds" system. Sub-tier claimants must send Notice of Claim on Funds to the higher-tier contractor. Upper-tier contractors must withhold funds upon receiving notice.',
      contractClause: 'NORTH CAROLINA LIEN RIGHTS (NCGS § 44A-11): Pursuant to North Carolina General Statutes § 44A-11, Contractor reserves statutory rights to file a claim of lien on real property or a notice of claim on funds for unpaid labor, services, or materials.',
    },
    contractorLicense: {
      code: 'NCGS § 87-1 et seq. (NCLBGC)',
      requirement: 'North Carolina General Contractor license required for projects over $30,000. NCLBGC issues licenses by classification and financial category.',
      contractClause: 'NORTH CAROLINA CONTRACTOR LICENSE: Contractor holds valid NCLBGC General Contractor license as required by NCGS § 87-10. License classification and limit on file.',
    },
    laborLaw: {
      code: 'NCGS § 133-3 (Prevailing Wage)',
      prevailingWageThreshold: 'Public projects > $500,000 require payment of locally prevailing wage rates per NCGS § 133-3.',
      contractClause: 'NORTH CAROLINA PREVAILING WAGE: For public projects exceeding $500,000, contractor complies with NCGS § 133-3 prevailing wage requirements. Rate schedules posted at jobsite.',
    },
    additionalClauses: [
      'NORTH CAROLINA LIEN AGENT (NCGS § 44A-11.1): For private commercial projects over $30,000, Owner must designate a lien agent prior to commencement. Contractor to provide Notice to Lien Agent via LiensNC.com.',
    ],
  },
  MD: {
    stateCode: 'MD',
    stateName: 'Maryland',
    lienLaw: {
      code: 'Maryland Code, Real Property § 9-101 et seq.',
      title: 'Maryland Mechanic\'s Lien',
      deadline: 'Petition for Lien: within 180 days of last work. Must file in circuit court, not county land records.',
      summary: 'Maryland mechanic\'s liens are filed as court petitions, not recorded in land records. Claimant must file a Petition to Establish Mechanic\'s Lien in the circuit court of the county where property is located.',
      contractClause: 'MARYLAND MECHANIC\'S LIEN (Real Property § 9-102): Contractor retains the right to establish a mechanic\'s lien against this property in accordance with Maryland Code, Real Property § 9-101 et seq. for unpaid labor and materials. Notice of intention to claim lien to be provided as required.',
    },
    contractorLicense: {
      code: 'Maryland Business Regulation Article § 17-101 et seq. (MHIC / MHBR)',
      requirement: 'Maryland Home Improvement Contractor (MHIC) license required for residential. Maryland Home Builder Registration for new residential. MDOT MBE/DBE certification available.',
      contractClause: 'MARYLAND CONTRACTOR LICENSE: Contractor holds Maryland Home Improvement Contractor (MHIC) license or applicable contractor registration as required by the Maryland Business Regulation Article.',
    },
    laborLaw: {
      code: 'Maryland Code, State Finance & Procurement § 17-201',
      prevailingWageThreshold: 'Public works > $500,000: prevailing wage required per SFP § 17-206. State-funded construction only.',
      contractClause: 'MARYLAND PREVAILING WAGE: For state-funded public works exceeding $500,000, contractor pays prevailing wage rates per Maryland Code SFP § 17-206. Weekly certified payroll filed with contracting agency.',
    },
    additionalClauses: [
      'MARYLAND STORMWATER (MDE): Land disturbance > 5,000 sq ft requires Stormwater Management Permit from MDE or local jurisdiction. Grading permit required per local code.',
    ],
  },
  PA: {
    stateCode: 'PA',
    stateName: 'Pennsylvania',
    lienLaw: {
      code: 'Pennsylvania Mechanic\'s Lien Law of 1963 (49 P.S. § 1101 et seq.)',
      title: 'Pennsylvania Mechanic\'s Lien',
      deadline: 'Claim must be filed within 6 months of completion of work. Notice of Intention to file lien at least 30 days before filing.',
      summary: 'Pennsylvania requires formal "Notice of Intention to file" at least 30 days before filing the actual lien. The lien must be filed within 6 months of final work. Residential owner-occupied properties have special protections.',
      contractClause: 'PENNSYLVANIA MECHANIC\'S LIEN NOTICE (49 P.S. § 1101): Contractor retains lien rights under the Pennsylvania Mechanic\'s Lien Law of 1963. Notice of Intention to File Mechanic\'s Lien will be served at least 30 days prior to filing in the Court of Common Pleas.',
    },
    contractorLicense: {
      code: 'Pennsylvania Home Improvement Consumer Protection Act (HICPA)',
      requirement: 'Pennsylvania requires Home Improvement Contractor registration (HICPA) for residential work. No statewide GC license but Philadelphia, Pittsburgh require city contractor licenses.',
      contractClause: 'PENNSYLVANIA CONTRACTOR REGISTRATION: For residential projects, Contractor is registered as required by the Pennsylvania Home Improvement Consumer Protection Act (73 P.S. § 517.1 et seq.).',
    },
    laborLaw: {
      code: 'Pennsylvania Prevailing Wage Act (43 P.S. § 165-1 et seq.)',
      prevailingWageThreshold: 'Public works > $25,000 subject to prevailing wage.',
      contractClause: 'PENNSYLVANIA PREVAILING WAGE: For public works exceeding $25,000, contractor pays prevailing wage rates per Pennsylvania Prevailing Wage Act. Rate schedules certified and posted at project site.',
    },
    additionalClauses: [
      'PENNSYLVANIA CONSTRUCTION NOTICE (Act 287): Prior to any excavation, contractor notifies PA One Call System (811) as required by the Underground Utility Line Protection Law (73 P.S. § 176 et seq.).',
    ],
  },
  GA: {
    stateCode: 'GA',
    stateName: 'Georgia',
    lienLaw: {
      code: 'Georgia Code § 44-14-360 et seq.',
      title: 'Georgia Mechanic\'s and Materialman\'s Lien',
      deadline: 'Preliminary notice within 30 days of first work (residential) or no notice required for commercial. File lien within 90 days of last work.',
      summary: 'Georgia requires preliminary notice for residential projects within 30 days. For commercial, lien must be filed within 90 days. Lien must be enforced within 365 days of filing.',
      contractClause: 'GEORGIA LIEN RIGHTS (OCGA § 44-14-361): Contractor retains rights to file a Claim of Lien against this property in accordance with Georgia Code § 44-14-360 et seq. for unpaid labor and materials furnished to improve real property.',
    },
    contractorLicense: {
      code: 'Georgia State Licensing Board for Residential and General Contractors',
      requirement: 'Georgia requires residential-basic, residential-light commercial, or general contractor license. Projects > $2,500 require licensed contractor.',
      contractClause: 'GEORGIA CONTRACTOR LICENSE: Contractor holds valid Georgia contractor license as required for the applicable classification. License number available upon request.',
    },
    laborLaw: {
      code: 'OCGA § 13-10-80 (Public Works Bidding)',
      prevailingWageThreshold: 'Georgia has no state prevailing wage law. Federal Davis-Bacon applies to federally funded projects.',
      contractClause: 'GEORGIA WAGE COMPLIANCE: Federal Davis-Bacon prevailing wage rates apply to all federally funded public construction projects. State minimum wage: Federal minimum wage ($7.25/hr).',
    },
    additionalClauses: [
      'GEORGIA EROSION & SEDIMENTATION CONTROL: Land-disturbing activity requires permit per Georgia Erosion and Sedimentation Act (OCGA § 12-7-1 et seq.). Land Disturbing Activity permit obtained prior to grading.',
    ],
  },
  IL: {
    stateCode: 'IL',
    stateName: 'Illinois',
    lienLaw: {
      code: 'Illinois Mechanics Lien Act (770 ILCS 60)',
      title: 'Illinois Mechanics Lien Act',
      deadline: 'Notice of sub-lien within 90 days of last work. Lien must be filed within 4 months of completion.',
      summary: 'Illinois requires sub-contractor notice within 90 days. Lien must be filed within 4 months of project completion. Enforcement action must commence within 2 years of filing.',
      contractClause: 'ILLINOIS MECHANICS LIEN NOTICE (770 ILCS 60/1): Contractor retains mechanics lien rights under the Illinois Mechanics Lien Act. Sub-contractors and material suppliers may have lien rights. Notice shall be served as required by statute.',
    },
    contractorLicense: {
      code: 'Illinois Roofing Industry Licensing Act / Chicago Contractor License',
      requirement: 'Illinois licenses specific trades (roofing). Chicago requires a City of Chicago contractor license for most work. Other municipalities have varying requirements.',
      contractClause: 'ILLINOIS CONTRACTOR LICENSE: Contractor holds applicable state trade licenses and municipal contractor licenses for the jurisdiction of the project.',
    },
    laborLaw: {
      code: 'Illinois Prevailing Wage Act (820 ILCS 130)',
      prevailingWageThreshold: 'All public works regardless of dollar amount subject to Illinois prevailing wage.',
      contractClause: 'ILLINOIS PREVAILING WAGE (820 ILCS 130): All public works projects comply with the Illinois Prevailing Wage Act. Prevailing wages as determined by IDOL for the applicable county posted at the jobsite. Monthly certified payroll submitted.',
    },
    additionalClauses: [
      'CHICAGO BUILDING CODE: Work in Chicago must comply with Chicago Municipal Code Chapter 14A and all applicable Chicago Building Permits.',
    ],
  },
  OH: {
    stateCode: 'OH',
    stateName: 'Ohio',
    lienLaw: {
      code: 'Ohio Revised Code § 1311.01 et seq.',
      title: 'Ohio Mechanic\'s Lien',
      deadline: 'Furnishing notice within 21 days of first furnishing (sub-contractors on residential). Affidavit within 75 days (commercial) or 60 days (residential) of last work.',
      summary: 'Ohio sub-contractors on residential projects must serve a Notice of Furnishing within 21 days. Commercial lien affidavit within 75 days. Lien must be enforced within 6 years of filing.',
      contractClause: 'OHIO MECHANIC\'S LIEN NOTICE (ORC § 1311.06): Contractor and its subcontractors retain mechanic\'s lien rights under Ohio Revised Code § 1311.01 et seq. for unpaid amounts due for labor and materials furnished to improve real property.',
    },
    contractorLicense: {
      code: 'Ohio Revised Code § 4740 (State Contractor Registration)',
      requirement: 'Ohio requires contractor registration. HVAC, electrical, plumbing, and refrigeration require separate state licenses. Local licenses required in many municipalities.',
      contractClause: 'OHIO CONTRACTOR REGISTRATION: Contractor is registered with the Ohio Construction Industry Licensing Board as required by ORC § 4740 for applicable trade classifications.',
    },
    laborLaw: {
      code: 'Ohio Revised Code § 4115.03 et seq.',
      prevailingWageThreshold: 'Public works > $250,000 subject to Ohio prevailing wage.',
      contractClause: 'OHIO PREVAILING WAGE (ORC § 4115.04): For public improvements exceeding $250,000, contractor pays prevailing wage rates set by Ohio Commerce Department. Certified payroll records maintained for project duration.',
    },
    additionalClauses: [],
  },
};

const REMAINING_STATES: Array<[string, string]> = [
  ['AL', 'Alabama'], ['AK', 'Alaska'], ['AZ', 'Arizona'], ['AR', 'Arkansas'],
  ['CO', 'Colorado'], ['CT', 'Connecticut'], ['DE', 'Delaware'],
  ['HI', 'Hawaii'], ['ID', 'Idaho'], ['IN', 'Indiana'], ['IA', 'Iowa'],
  ['KS', 'Kansas'], ['KY', 'Kentucky'], ['LA', 'Louisiana'], ['ME', 'Maine'],
  ['MA', 'Massachusetts'], ['MI', 'Michigan'], ['MN', 'Minnesota'],
  ['MS', 'Mississippi'], ['MO', 'Missouri'], ['MT', 'Montana'],
  ['NE', 'Nebraska'], ['NV', 'Nevada'], ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'], ['NM', 'New Mexico'], ['ND', 'North Dakota'],
  ['OK', 'Oklahoma'], ['OR', 'Oregon'], ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'], ['SD', 'South Dakota'], ['TN', 'Tennessee'],
  ['UT', 'Utah'], ['VT', 'Vermont'], ['WA', 'Washington'],
  ['WV', 'West Virginia'], ['WI', 'Wisconsin'], ['WY', 'Wyoming'],
  ['DC', 'District of Columbia'],
];

REMAINING_STATES.forEach(([code, name]) => {
  if (!STATE_LAWS[code]) {
    STATE_LAWS[code] = {
      stateCode: code,
      stateName: name,
      lienLaw: {
        code: `${name} Mechanic's Lien Statute`,
        title: `${name} Mechanic's Lien`,
        deadline: 'Consult state-specific deadlines (typically 60–180 days from last work)',
        summary: `${name} provides statutory mechanic's lien rights for contractors and suppliers who improve real property. Specific notice and filing deadlines apply.`,
        contractClause: `${name.toUpperCase()} LIEN RIGHTS NOTICE: Contractor retains statutory lien rights under ${name} law for unpaid labor and materials. Consult applicable ${name} mechanic's lien statute for deadlines and procedures.`,
      },
      contractorLicense: {
        code: `${name} Contractor Licensing Requirements`,
        requirement: `Contractor license required for projects above state threshold. Verify current licensing requirements for ${name}.`,
        contractClause: `${name.toUpperCase()} CONTRACTOR LICENSE: Contractor holds all licenses required by ${name} for the scope and value of this project.`,
      },
      laborLaw: {
        code: `${name} Prevailing Wage / Labor Code`,
        prevailingWageThreshold: `Verify current prevailing wage requirements for ${name}. Federal Davis-Bacon applies to all federally funded projects.`,
        contractClause: `${name.toUpperCase()} WAGE COMPLIANCE: Contractor complies with applicable ${name} wage laws and Federal Davis-Bacon Act for federally funded projects.`,
      },
      additionalClauses: [],
    };
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// OVERRIDE RISK SCENARIOS
// ─────────────────────────────────────────────────────────────────────────────
export const OVERRIDE_RISKS: OverrideRisk[] = [
  {
    id: 'paving-rain',
    action: 'Paving in Rain / Wet Conditions',
    federalCode: 'VDOT Section 315.04(b) / AASHTO R 35',
    riskLevel: 'CRITICAL',
    warningTitle: 'CRITICAL OVERRIDE: Paving in Precipitation Detected',
    warningBody:
      'The Worden Meteorological Engine has detected active precipitation or ground moisture exceeding acceptable limits. Asphalt mat compaction below minimum 96% Marshall Unit Weight is virtually guaranteed. Hot mix asphalt laid on wet subgrade will fail within 1–3 freeze/thaw cycles. Per VDOT Road & Bridge Specifications Section 315.04(b), paving shall not proceed when precipitation is occurring or when subgrade moisture exceeds specification limits. Federal OSHA 29 CFR 1926.605 also governs work in wet conditions. Mat failure in a federally funded or public project may trigger federal audit and contract clawback.',
    liabilityStatement:
      'By proceeding with paving in these conditions, you acknowledge that: (1) the Worden AI Engine has flagged this as a CRITICAL risk; (2) the resulting asphalt mat may fail to meet minimum compaction specifications; (3) J. Worden & Sons software platform is held entirely harmless for any structural failure, warranty claims, or third-party liability arising from this override; (4) you assume 100% financial and legal liability for remediation costs, which may equal or exceed the original contract value.',
  },
  {
    id: 'crane-wind',
    action: 'Crane Operation in High Wind',
    federalCode: '29 CFR 1926.1417(u) — Crane Wind Speed Limits',
    riskLevel: 'CRITICAL',
    warningTitle: 'CRITICAL OVERRIDE: Crane Operation — Wind Speed Exceeds Safety Threshold',
    warningBody:
      'Under 29 CFR 1926.1417(u), crane operations must be suspended when wind speed exceeds the manufacturer\'s rated limit (typically 25 mph sustained / 35 mph gusts) or when conditions prevent safe operation. Operation above these limits constitutes a willful OSHA violation with penalties up to $156,259 per incident. Workers within the crane swing radius are at risk of fatal injury. OSHA citation data shows crane accidents account for 82 fatalities per year nationally.',
    liabilityStatement:
      'By proceeding with crane operations in these wind conditions, you acknowledge that: (1) this operation violates 29 CFR 1926.1417(u) and creates risk of fatal injury; (2) any resulting injury or fatality will trigger OSHA willful violation designation; (3) the software platform bears zero liability; (4) you personally and your company assume 100% criminal and civil liability for any resulting death, injury, or property damage.',
  },
  {
    id: 'overweight-truck',
    action: 'Dispatch Overweight Commercial Vehicle',
    federalCode: '23 USC 127 / Federal Bridge Formula',
    riskLevel: 'CRITICAL',
    warningTitle: 'CRITICAL OVERRIDE: Vehicle Weight Exceeds Federal Bridge Formula Limits',
    warningBody:
      'The calculated Gross Vehicle Weight (GVW) exceeds the Federal Bridge Formula limit of 80,000 lbs GVW (single axle: 20,000 lbs; tandem: 34,000 lbs) per 23 USC 127. Operating an overweight commercial vehicle without a valid oversize/overweight permit is a federal and state violation. Fines range from $10,000 to $16,000 per incident plus bridge damage liability, which can reach millions. DOT roadside inspection will place vehicle Out-of-Service.',
    liabilityStatement:
      'By dispatching this overweight vehicle, you acknowledge: (1) federal weight limits are exceeded; (2) a valid OS/OW permit has not been obtained; (3) the software platform bears zero liability for DOT fines, bridge damage, or accident liability; (4) your company assumes 100% financial liability for all fines, permit violations, infrastructure damage, and third-party claims.',
  },
  {
    id: 'excavation-no-shoring',
    action: 'Excavation > 5 ft Without Cave-In Protection',
    federalCode: '29 CFR 1926.651(j) — Excavation Cave-In Protection',
    riskLevel: 'CRITICAL',
    warningTitle: 'CRITICAL OVERRIDE: Excavation Requires Cave-In Protection',
    warningBody:
      'Per 29 CFR 1926.651(j), all excavations 5 feet or deeper require cave-in protection (sloping, shoring, or trench box). Cave-ins are the leading cause of construction fatalities (approximately 35 per year). OSHA classifies failure to protect excavations as a Serious or Willful violation. Willful violations carry fines up to $156,259 and may result in criminal prosecution if a fatality occurs (29 USC 666(e) — up to 6 months imprisonment).',
    liabilityStatement:
      'By proceeding with unprotected excavation, you acknowledge: (1) this operation violates 29 CFR 1926.651(j) and creates imminent danger of fatal cave-in; (2) any fatality may result in criminal prosecution under 29 USC 666(e); (3) the software platform bears zero liability; (4) you assume 100% criminal, civil, and financial liability for all resulting injuries, fatalities, OSHA penalties, and civil damages.',
  },
  {
    id: 'cold-temp-paving',
    action: 'Paving in Cold/Freezing Temperatures',
    federalCode: 'VDOT Section 315.04(a) / Asphalt Institute MS-2',
    riskLevel: 'HIGH',
    warningTitle: 'HIGH RISK OVERRIDE: Cold Temperature Paving — Mat Failure Risk',
    warningBody:
      'Ground temperature is below the 45°F minimum for HMA paving per VDOT specifications and Asphalt Institute MS-2. Cold temperatures accelerate heat loss from the mix, preventing adequate compaction before the mat cools below the compaction temperature range (185°F–275°F). The result is a mat that will not achieve 96% Marshall Unit Weight, leading to premature cracking, raveling, and structural failure. State DOT inspectors will reject the mat. For federal projects, payment may be withheld.',
    liabilityStatement:
      'By proceeding with paving in these temperature conditions, you acknowledge: (1) the WORDEN AI Engine flags this as HIGH RISK; (2) specification compliance cannot be guaranteed; (3) state/federal inspection may reject the work requiring full removal and replacement at contractor cost; (4) the software platform bears zero liability; (5) you assume 100% financial liability for non-conforming work.',
  },
  {
    id: 'no-swppp',
    action: 'Begin Grading/Earthwork Without SWPPP',
    federalCode: '40 CFR 122 (NPDES CGP)',
    riskLevel: 'HIGH',
    warningTitle: 'HIGH RISK OVERRIDE: No Stormwater Permit / SWPPP on File',
    warningBody:
      'Sites disturbing 1 or more acres are required to obtain a Construction General Permit (CGP) from the EPA or applicable state authority under the Clean Water Act / NPDES program. A Stormwater Pollution Prevention Plan (SWPPP) must be prepared, certified, and implemented before earth disturbance begins. EPA penalties for unpermitted stormwater discharge: $25,000–$75,000 per day per violation. State penalties in addition to federal. Stop-work orders are routinely issued for SWPPP non-compliance.',
    liabilityStatement:
      'By proceeding without a SWPPP and CGP, you acknowledge: (1) this activity violates the Clean Water Act; (2) EPA and state environmental authorities may issue stop-work orders and fines of up to $75,000/day; (3) the software platform bears zero liability; (4) you assume 100% regulatory, financial, and remediation liability.',
  },
  {
    id: 'no-utility-locate',
    action: 'Excavate Without Utility Locate (811 Call)',
    federalCode: 'OSHA 29 CFR 1926.651(b) / State 811 Laws',
    riskLevel: 'CRITICAL',
    warningTitle: 'CRITICAL OVERRIDE: No Underground Utility Locate on File',
    warningBody:
      'Federal law (29 CFR 1926.651(b)) and all 50 states require notification of underground utility operators before any excavation. The national "811 Call Before You Dig" system must be contacted at least 2–3 business days before digging. Striking a buried gas line can cause fatal explosions. Striking a buried power line causes electrocution. Striking a fiber optic line can cause liability of $1M+ for business interruption.',
    liabilityStatement:
      'By proceeding with excavation without utility locates, you acknowledge: (1) this violates 29 CFR 1926.651(b) and all applicable state 811 laws; (2) utility strikes may cause death, explosion, and seven-figure liability; (3) the software platform bears zero liability; (4) you assume 100% criminal and civil liability for all damage, injury, or death resulting from an unmarked utility strike.',
  },
  {
    id: 'heat-illness',
    action: 'Continue Operations During Extreme Heat Advisory',
    federalCode: 'OSHA Heat Illness Prevention (29 CFR 1910.119)',
    riskLevel: 'HIGH',
    warningTitle: 'HIGH RISK OVERRIDE: Extreme Heat — Worker Heat Illness Risk',
    warningBody:
      'OSHA\'s General Duty Clause (Section 5(a)(1)) and Heat Illness Prevention standard require employers to protect workers from recognized heat hazards. Current heat index exceeds 103°F (HIGH risk tier). Required controls: water every 15–20 minutes (minimum 1 cup), rest breaks in shade/AC, heat illness monitoring, buddy system, and emergency action plan. Ignoring heat illness risk is an OSHA Serious or Willful violation. An average of 40 workers die from heat illness annually on construction sites.',
    liabilityStatement:
      'By continuing operations without required heat illness protections, you acknowledge: (1) this creates recognized worker health hazards per OSHA standards; (2) worker heat illness or death may result in OSHA citations up to $156,259 and civil wrongful death suits; (3) the software platform bears zero liability; (4) you assume 100% employer liability for any worker heat illness, injury, or death.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AUDIT LOG ENTRY TYPE
// ─────────────────────────────────────────────────────────────────────────────
export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  riskLevel: RiskLevel;
  userName: string;
  stateCode: string;
  legalCode: string;
  overrideAccepted: boolean;
  ipHash: string;
  sessionId: string;
}

export function generateSessionId(): string {
  const uuid = crypto.randomUUID();
  return 'WOS-' + uuid.replace(/-/g, '').substring(0, 8).toUpperCase() + '-' + Date.now().toString(36).toUpperCase();
}

export function generateMockIpHash(): string {
  // Advisory placeholder — production would hash the real client IP server-side
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  return 'SHA256:' + Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function getStateList(): Array<{ code: string; name: string }> {
  return Object.values(STATE_LAWS)
    .map((s) => ({ code: s.stateCode, name: s.stateName }))
    .sort((a, b) => a.name.localeCompare(b.name));
}
