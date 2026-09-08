import { UserAccount, ROLE_DEFAULT_PRIVILEGES } from '../types';

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  // 1. Mandi Administrator
  {
    id: 'usr-admin-1',
    phoneNumber: '9848011111',
    name: 'Sri K. V. Ramanjaneyulu',
    teluguName: 'శ్రీ కె. వి. రామాంజనేయులు (డైరెక్టర్)',
    role: 'admin',
    password: 'Admin@123',
    defaultPassword: 'Admin@123',
    mustChangePassword: false,
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.admin],
    fpoOrFirm: 'APMC South India Corridor Control Authority',
    lastLogin: 'Today, 08:30 AM',
    createdAt: '01 Jan 2024'
  },
  {
    id: 'usr-admin-2',
    phoneNumber: '9848099999',
    name: 'P. Suresh Babu (Operations Lead)',
    teluguName: 'పి. సురేష్ బాబు (కంట్రోలర్)',
    role: 'admin',
    password: 'Mandi@123',
    defaultPassword: 'Mandi@123',
    mustChangePassword: false,
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.admin],
    fpoOrFirm: 'Rayalaseema Logistics & Weighbridge Cell',
    lastLogin: 'Yesterday, 04:15 PM',
    createdAt: '15 Feb 2024'
  },

  // 2. Mandi Merchants / Corporate Buyers
  {
    id: 'usr-mer-1',
    phoneNumber: '9845011982',
    name: 'B. Balaji Naidu',
    teluguName: 'బి. బాలాజీ నాయుడు (ఎగుమతిదారు)',
    role: 'merchant',
    password: 'Mandi@123', // Initial default password
    defaultPassword: 'Mandi@123',
    mustChangePassword: true, // Requires password update on login!
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.merchant],
    fpoOrFirm: 'Sri Balaji Agro Fruit & Produce Exporters',
    entityId: 'mer-1',
    lastLogin: 'Never (Initial Setup)',
    createdAt: '10 Feb 2024'
  },
  {
    id: 'usr-mer-2',
    phoneNumber: '9848022222',
    name: 'P. Raghavan (Procurement Lead)',
    teluguName: 'పి. రాఘవన్ (రిలయన్స్ ఆగ్రో)',
    role: 'merchant',
    password: 'Mandi@123',
    defaultPassword: 'Mandi@123',
    mustChangePassword: true,
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.merchant],
    fpoOrFirm: 'Reliance Fresh Agro Procurement Hub',
    entityId: 'mer-2',
    lastLogin: 'Never (Initial Setup)',
    createdAt: '22 Mar 2024'
  },
  {
    id: 'usr-mer-3',
    phoneNumber: '9444022891',
    name: 'Dr. Madhavan Kutty',
    teluguName: 'డా. మాధవన్ కుట్టి',
    role: 'merchant',
    password: 'Buyer@2026',
    defaultPassword: 'Mandi@123',
    mustChangePassword: false,
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.merchant],
    fpoOrFirm: 'Deccan Pure Food Processors Ltd',
    entityId: 'mer-3',
    lastLogin: '06 Sep 2026, 11:20 AM',
    createdAt: '12 Apr 2024'
  },

  // 3. Farmers & FPOs
  {
    id: 'usr-fmr-1',
    phoneNumber: '9440123891',
    name: 'Ramesh Babu Garu',
    teluguName: 'రమేష్ బాబు గారు (రైతు)',
    role: 'farmer',
    password: 'Farmer@123', // Initial default password
    defaultPassword: 'Farmer@123',
    mustChangePassword: true, // Requires password update on login!
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.farmer],
    fpoOrFirm: 'Madanapalle West Mango FPO (AP-9842)',
    entityId: 'fmr-1',
    lastLogin: 'Never (Initial Setup)',
    createdAt: '12 Jan 2024'
  },
  {
    id: 'usr-fmr-2',
    phoneNumber: '9848033333',
    name: 'Lakshmi Prasanna',
    teluguName: 'లక్ష్మీ ప్రసన్న (తోట రైతు)',
    role: 'farmer',
    password: 'Farmer@123',
    defaultPassword: 'Farmer@123',
    mustChangePassword: true,
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.farmer],
    fpoOrFirm: 'Punganur Valley Horticulture Cluster',
    entityId: 'fmr-2',
    lastLogin: 'Never (Initial Setup)',
    createdAt: '04 Mar 2024'
  },
  {
    id: 'usr-fmr-3',
    phoneNumber: '9989032114',
    name: 'Srinivas Reddy',
    teluguName: 'శ్రీనివాస్ రెడ్డి',
    role: 'farmer',
    password: 'Kadiri@Citrus2026',
    defaultPassword: 'Farmer@123',
    mustChangePassword: false,
    status: 'active',
    privileges: [...ROLE_DEFAULT_PRIVILEGES.farmer],
    fpoOrFirm: 'Kadiri Citrus Farmers Collective',
    entityId: 'fmr-3',
    lastLogin: '05 Sep 2026, 09:15 AM',
    createdAt: '18 Nov 2023'
  }
];
