export type AppView = 
  | 'dashboard' 
  | 'network-and-zones' 
  | 'procurement-orders-and-weighment' 
  | 'farmer-listing'
  | 'merchant-portal'
  | 'farmers-and-fpos'
  | 'mandi-merchants'
  | 'admin-users'
  | 'produce-master'
  | 'live-marketplace'
  | 'logistics-and-cold-chain'
  | 'supply-demand-and-pricing'
  | 'ai-opportunity-engine'
  | 'audit-and-settings';

export interface BuyerRFQ {
  id: string;
  rfqCode: string;
  produceName: string;
  teluguName?: string;
  category: string;
  volumeRequiredMT: number;
  volumeLockedMT: number;
  targetPriceMin: number;
  targetPriceMax: number;
  qualitySpecs: string;
  deliveryLocation: string;
  deliveryDate: string;
  status: 'active' | 'partially_filled' | 'completed' | 'draft';
  matchedLotsCount: number;
  matchScore: number;
}

export interface ClusterNode {
  id: string;
  name: string;
  state: string;
  crop: string;
  volume: string;
  demand: string;
  supply: string;
  netGap: string;
  price: string;
  status: 'deficit' | 'surplus' | 'balanced';
  xPercent: number;
  yPercent: number;
  icon: string;
}

export interface ProduceMatrixRow {
  id: string;
  name: string;
  teluguName: string;
  origin: string;
  category: 'fruits' | 'citrus' | 'vegetables' | 'spices' | 'commercial';
  emoji: string;
  supplyTons: number;
  demandTons: number;
  netGapTons: number;
  fillPercent: number;
  indicativePrice: number;
  trend: 'up' | 'down' | 'stable';
  trendPercent?: number;
  marketStatus: string;
  statusColor: 'primary' | 'secondary' | 'amber';
  actionLabel: string;
}

export interface SettlementContract {
  id: string;
  code: string;
  produce: string;
  teluguProduce?: string;
  grade: string;
  volumeKg: number;
  farmer: string;
  merchant: string;
  weighbridge: string;
  destinationOrHub: string;
  amount: number;
  statusBadge: string;
  statusType: 'escrow' | 'rtgs' | 'inspected' | 'completed';
  transitStatus: string;
}

export interface ConsignmentItem {
  id: string;
  poCode: string;
  waybill: string;
  produce: string;
  belt: string;
  sourceDest: string;
  truckNo: string;
  weighmentStatus: string;
  weighmentDetails: string;
  amount: number;
  paymentStatus: string;
  isEscrowHeld?: boolean;
  statusBadge: 'verified' | 'intransit' | 'cleared';
  eta?: string;
}

export interface FarmerMatch {
  id: string;
  name: string;
  fpo: string;
  matchScore: number;
  harvestTime: string;
  lotVolume: string;
  distanceKm: number;
  distanceLabel: string;
  qualityAssay: string;
  trustScore: string;
  farmerAskPrice: number;
  targetMatchDiff: string;
  estimatedLotValue: number;
  badgeType: 'secondary' | 'amber' | 'primary';
}

export interface MandalDirectoryItem {
  id: string;
  name: string;
  teluguName: string;
  leadProduce: string;
  registeredFarmers: number;
  leadFpo: string;
  harvestReadyTons: number;
  activeBuyers: number;
  inspectionPassPercent: number;
  status: 'Active' | 'Transit Heavy';
}

export interface FieldOfficer {
  id: string;
  initials: string;
  name: string;
  role: string;
  jurisdiction: string;
  assignedScalesOrTemp: string;
  dailyMetric: string;
  statusText: string;
  statusColor: 'secondary' | 'amber';
}

export interface FarmerRecord {
  id: string;
  farmerCode: string;
  name: string;
  teluguName: string;
  fpo: string;
  primaryCrop: string;
  secondaryCrop?: string;
  phone: string;
  mandal: string;
  village: string;
  acres: number;
  seasonCapacityMT: number;
  bankAccount: string;
  ifsc: string;
  upiId: string;
  kycStatus: 'verified' | 'pending' | 'flagged';
  joinedDate: string;
}

export interface MerchantRecord {
  id: string;
  firmName: string;
  contactPerson: string;
  apmcLicense: string;
  gstin: string;
  phone: string;
  email: string;
  terminalHub: string;
  state: string;
  escrowLimit: number;
  currentEscrowDeposit: number;
  tradeCategory: 'fruits' | 'citrus' | 'vegetables' | 'all' | 'spices';
  licenseTier: 'Grade A+' | 'Grade A' | 'Processor' | 'Retail Aggregator';
  status: 'active' | 'under_audit' | 'suspended';
  rating: number;
  totalDeals: number;
}

export type UserRole = 'admin' | 'merchant' | 'farmer';

export type UserPrivilege = 
  | 'manage_users' 
  | 'manage_roles' 
  | 'manage_farmers' 
  | 'manage_merchants' 
  | 'manage_weighbridge' 
  | 'post_rfq' 
  | 'bid_marketplace' 
  | 'manage_escrow' 
  | 'create_lots' 
  | 'view_msp_advisory' 
  | 'view_audit_logs';

export interface UserAccount {
  id: string;
  phoneNumber: string; // Default user number / login identifier
  name: string;
  teluguName?: string;
  role: UserRole;
  password: string; // user password
  defaultPassword?: string; // initial default password (e.g. Mandi@123)
  mustChangePassword: boolean; // triggers mandatory password update on first login
  status: 'active' | 'suspended' | 'locked';
  privileges: UserPrivilege[];
  fpoOrFirm?: string;
  entityId?: string; // link to farmer or merchant ID
  lastLogin?: string;
  createdAt: string;
}

export const PRIVILEGE_LABELS: Record<UserPrivilege, { label: string; telugu: string; description: string }> = {
  manage_users: {
    label: 'User & Password Management',
    telugu: 'వినియోగదారులు & పాస్‌వర్డ్‌ల నిర్వహణ',
    description: 'Create, update passwords, suspend, or delete user accounts'
  },
  manage_roles: {
    label: 'Role & Privilege Control',
    telugu: 'పాత్రలు & అనుమతుల నియంత్రణ',
    description: 'Assign or revoke role privileges across the platform'
  },
  manage_farmers: {
    label: 'Farmer & FPO Registry',
    telugu: 'రైతులు & FPO రిజిస్ట్రీ నిర్వహణ',
    description: 'Register, verify KYC, and edit farmer landholding profiles'
  },
  manage_merchants: {
    label: 'Mandi Merchant Registry',
    telugu: 'మండి వ్యాపారుల రిజిస్ట్రీ',
    description: 'Manage interstate APMC licenses, credit, and escrow limits'
  },
  manage_weighbridge: {
    label: 'Weighbridge & Quality Assay',
    telugu: 'తూకం & నాణ్యత తనిఖీ నిర్వహణ',
    description: 'Issue gross/tare weighment tickets and grade consignments'
  },
  post_rfq: {
    label: 'Post Procurement RFQs',
    telugu: 'కొనుగోలు అవసరాలు (RFQ) పోస్ట్ చేయుట',
    description: 'Broadcast bulk produce demand to farmer clusters'
  },
  bid_marketplace: {
    label: 'Spot Marketplace Bidding',
    telugu: 'స్పాట్ మార్కెట్ వేలం బిడ్డింగ్',
    description: 'Place live competitive price bids on farmgate harvest lots'
  },
  manage_escrow: {
    label: 'Escrow Vault & Payments',
    telugu: 'ఎస్క్రో వాల్ట్ & చెల్లింపుల నిర్వహణ',
    description: 'Deposit funds, lock escrow for deals, and release bank payouts'
  },
  create_lots: {
    label: 'Create Produce Lots',
    telugu: 'పంట లాట్‌లను సృష్టించుట',
    description: 'Post harvest inventory, expected tonnages, and ask prices'
  },
  view_msp_advisory: {
    label: 'MSP & Price Advisory',
    telugu: 'కనీస మద్దతు ధర & ధరల సలహాలు',
    description: 'Access real-time corridor mandi rate telemetry and MSP parity'
  },
  view_audit_logs: {
    label: 'Audit & System Telemetry',
    telugu: 'సిస్టమ్ ఆడిట్ లాగ్స్ పరిశీలన',
    description: 'Access administrative audit trail and compliance logs'
  }
};

export const ROLE_DEFAULT_PRIVILEGES: Record<UserRole, UserPrivilege[]> = {
  admin: [
    'manage_users',
    'manage_roles',
    'manage_farmers',
    'manage_merchants',
    'manage_weighbridge',
    'post_rfq',
    'bid_marketplace',
    'manage_escrow',
    'create_lots',
    'view_msp_advisory',
    'view_audit_logs'
  ],
  merchant: [
    'post_rfq',
    'bid_marketplace',
    'manage_escrow',
    'manage_weighbridge'
  ],
  farmer: [
    'create_lots',
    'view_msp_advisory'
  ]
};
