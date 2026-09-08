export type AppView = 
  | 'dashboard' 
  | 'network-and-zones' 
  | 'procurement-orders-and-weighment' 
  | 'farmer-listing'
  | 'farmers-and-fpos'
  | 'mandi-merchants'
  | 'produce-master'
  | 'live-marketplace'
  | 'logistics-and-cold-chain'
  | 'supply-demand-and-pricing'
  | 'ai-opportunity-engine'
  | 'audit-and-settings';

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
