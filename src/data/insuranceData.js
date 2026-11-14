export const initialPlansState = {
  marriage: {
    selected: false,
    prefix: 'Mr.',
    fullName: '',
    marriageValue: '',
    errors: {}
  },
  education: {
    selected: false,
    fullName: '',
    gender: 'Male',
    educationValue: '',
    errors: {}
  },
  retirement: {
    selected: false,
    prefix: 'Mr.',
    fullName: '',
    retirementValue: '',
    errors: {}
  },
  accidentalRisk: {
    selected: false,
    prefix: 'Mr.',
    fullName: '',
    coverageValue: '',
    errors: {}
  },
  lifeRisk: {
    selected: false,
    prefix: 'Mr.',
    fullName: '',
    coverageValue: '',
    errors: {}
  }
};

export const demoProfiles = {
  saravanan: {
    marriage: {
      selected: true,
      prefix: 'Mr.',
      fullName: 'Saravanan Ramanathan',
      marriageValue: '2500000',
      errors: {}
    },
    education: {
      selected: true,
      fullName: 'Ananya Saravanan',
      gender: 'Female',
      educationValue: '3500000',
      errors: {}
    },
    retirement: {
      selected: true,
      prefix: 'Mr.',
      fullName: 'Saravanan Ramanathan',
      retirementValue: '15000000',
      errors: {}
    },
    accidentalRisk: {
      selected: true,
      prefix: 'Mr.',
      fullName: 'Saravanan Ramanathan',
      coverageValue: '5000000',
      errors: {}
    },
    lifeRisk: {
      selected: true,
      prefix: 'Mr.',
      fullName: 'Saravanan Ramanathan',
      coverageValue: '10000000',
      errors: {}
    }
  }
};

export const insuranceFeaturesMeta = [
  {
    id: 'marriage',
    title: 'Marriage Insurance Planning',
    reportTitle: 'Marriage Planning Report',
    tagline: 'Milestone Life Event',
    description: 'Plan financially for your marriage and build a secure foundation for your new journey.',
    icon: 'HeartHandshake',
    color: '#D6A84F',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
    statLabel: 'Planned Budget',
    planningInsight: 'Structured milestone savings protect wedding aspirations against inflation and unexpected ceremonial expenses, ensuring debt-free celebrations.'
  },
  {
    id: 'education',
    title: 'Education Insurance Planning',
    reportTitle: 'Education Planning Report',
    tagline: 'Higher Education Fund',
    description: 'Build a financial foundation for your child\'s education and future ambitions.',
    icon: 'GraduationCap',
    color: '#2457A7',
    badgeClass: 'bg-blue-100 text-blue-900 border-blue-300',
    statLabel: 'Target Fund',
    planningInsight: 'Education inflation in India averages 10-12% annually. Dedicated educational planning guarantees tuition and university costs regardless of market volatility.'
  },
  {
    id: 'retirement',
    title: 'Retirement Insurance Planning',
    reportTitle: 'Retirement Planning Report',
    tagline: 'Golden Years Wealth',
    description: 'Prepare for a financially independent and comfortable retirement.',
    icon: 'Palmtree',
    color: '#10B981',
    badgeClass: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    statLabel: 'Retirement Corpus',
    planningInsight: 'Post-retirement longevity necessitates sustained inflation-adjusted cash flows without depleting your core capital during your leisurely golden years.'
  },
  {
    id: 'accidentalRisk',
    title: 'Accidental Risk Protection',
    reportTitle: 'Accidental Risk Protection Report',
    tagline: 'Emergency & Disability Shield',
    description: 'Understand your financial protection needs against unexpected accidents and emergencies.',
    icon: 'ShieldAlert',
    color: '#F59E0B',
    badgeClass: 'bg-orange-100 text-orange-900 border-orange-300',
    statLabel: 'Accidental Sum Insured',
    planningInsight: 'Accidents can disrupt earning capacity overnight. Dedicated accidental risk protection covers sudden hospitalization, disability, and income preservation.'
  },
  {
    id: 'lifeRisk',
    title: 'Life Risk Protection',
    reportTitle: 'Life Risk Protection Report',
    tagline: 'Family Future Safety Net',
    description: 'Create a financial safety net to help protect your family\'s future.',
    icon: 'ShieldCheck',
    color: '#142B52',
    badgeClass: 'bg-indigo-100 text-indigo-900 border-indigo-300',
    statLabel: 'Life Cover Sum Assured',
    planningInsight: 'Pure term life protection ensures that in the event of an untimely demise, your dependents can maintain their lifestyle, clear debts, and fulfill life aspirations.'
  }
];

export const companyDetails = {
  name: 'ESWARA MOORTHY INSURANCE',
  tagline: 'Secure Your Future. Protect Every Milestone.',
  registration: 'IRDAI Reg. No. 492/2026/FIN',
  tollFree: '1800 425 8899',
  phone: '+91 94432 10987',
  email: 'advisory@eswaramoorthyinsurance.com',
  website: 'www.eswaramoorthyinsurance.com',
  address: 'Corporate Towers, 4th Floor, Anna Salai, Chennai, Tamil Nadu 600002',
  founded: '1998',
  trustMetrics: [
    { label: 'Client Portfolios Secured', value: '45,000+' },
    { label: 'Settlement Ratio', value: '99.4%' },
    { label: 'Advisory Experience', value: '25+ Years' },
    { label: 'Client Satisfaction', value: '4.9 / 5' }
  ]
};
