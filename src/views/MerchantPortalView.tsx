import React, { useState } from 'react';
import { BuyerRFQ, ConsignmentItem } from '../types';
import { CONSIGNMENT_ITEMS } from '../data/mockData';

interface MerchantPortalViewProps {
  onOpenCreateRFQ: () => void;
  onOpenContractSign: () => void;
  onOpenConsignmentModal: (item: ConsignmentItem) => void;
  onShowToast: (msg: string) => void;
  onSwitchToFarmer: () => void;
}

interface FarmerLotMarketItem {
  id: string;
  farmerName: string;
  teluguName: string;
  fpo: string;
  crop: string;
  englishCrop: string;
  category: 'fruits' | 'citrus' | 'vegetables';
  lotVolumeMT: number;
  grade: string;
  brixIndex: string;
  harvestDate: string;
  location: string;
  distanceKm: number;
  askPriceKg: number;
  mandiBenchmark: number;
  image: string;
  giCertified: boolean;
  kycVerified: boolean;
}

export const MerchantPortalView: React.FC<MerchantPortalViewProps> = ({
  onOpenCreateRFQ,
  onOpenContractSign,
  onOpenConsignmentModal,
  onShowToast,
  onSwitchToFarmer,
}) => {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'rfqs' | 'consignments' | 'wallet'>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'fruits' | 'citrus' | 'vegetables'>('all');
  const [minBrixFilter, setMinBrixFilter] = useState<number>(0);
  const [biddingLot, setBiddingLot] = useState<FarmerLotMarketItem | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(60);
  const [inspectingAssayLot, setInspectingAssayLot] = useState<FarmerLotMarketItem | null>(null);

  // Initial RFQ data
  const [rfqList, setRfqList] = useState<BuyerRFQ[]>([
    {
      id: 'rfq-1',
      rfqCode: 'RFQ-2026-9821',
      produceName: 'Banganapalli Mango (Grade A Export)',
      category: 'fruits',
      volumeRequiredMT: 24,
      volumeLockedMT: 18,
      targetPriceMin: 58,
      targetPriceMax: 63,
      qualitySpecs: 'Brix > 16.5° • Zero Chemical Ripening • Min 300g size',
      deliveryLocation: 'Kempegowda Air Cargo Packhouse, Bengaluru',
      deliveryDate: '2026-09-17',
      status: 'partially_filled',
      matchedLotsCount: 14,
      matchScore: 96,
    },
    {
      id: 'rfq-2',
      rfqCode: 'RFQ-2026-4019',
      produceName: 'Balaji Acid Lime (Grade 1 High Juice)',
      category: 'citrus',
      volumeRequiredMT: 15,
      volumeLockedMT: 5,
      targetPriceMin: 68,
      targetPriceMax: 74,
      qualitySpecs: 'Citric Index > 6.5% • Caliber 40-45mm • Thin Rind',
      deliveryLocation: 'KR Market Terminal Yard, Bengaluru',
      deliveryDate: '2026-09-19',
      status: 'active',
      matchedLotsCount: 9,
      matchScore: 92,
    },
    {
      id: 'rfq-3',
      rfqCode: 'RFQ-2026-8820',
      produceName: 'Hybrid Table Tomato (Crate Packed)',
      category: 'vegetables',
      volumeRequiredMT: 30,
      volumeLockedMT: 30,
      targetPriceMin: 26,
      targetPriceMax: 30,
      qualitySpecs: 'Firm Red Breaker Stage • Clean sorting • No punctures',
      deliveryLocation: 'Hosur Processing Center',
      deliveryDate: '2026-09-16',
      status: 'completed',
      matchedLotsCount: 22,
      matchScore: 99,
    },
  ]);

  // Farmer Lots listed in live Mandi market
  const farmerLots: FarmerLotMarketItem[] = [
    {
      id: 'lot-1',
      farmerName: 'రమేష్ గారు (Ramesh Garu)',
      teluguName: 'రమేష్ మామిడి తోట',
      fpo: 'Madanapalle West Mango FPO (AP-9842)',
      crop: 'బంగినపల్లి మామిడి',
      englishCrop: 'Banganapalli Mango',
      category: 'fruits',
      lotVolumeMT: 4.5,
      grade: 'గ్రేడ్ A (Export Caliber)',
      brixIndex: '17.4° Brix (Optimum)',
      harvestDate: 'Today (16 Sep, 06:00 AM)',
      location: 'Madanapalle Rural, Chittoor-Anantapur Belt',
      distanceKm: 84,
      askPriceKg: 62.00,
      mandiBenchmark: 58.00,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      giCertified: true,
      kycVerified: true,
    },
    {
      id: 'lot-2',
      farmerName: 'లక్ష్మీ ప్రసన్న (Lakshmi Prasanna)',
      teluguName: 'గ్రీన్ వ్యాలీ తోటలు',
      fpo: 'Punganur Valley Horticulture Cluster',
      crop: 'బంగినపల్లి ఆర్గానిక్ మామిడి',
      englishCrop: 'Organic Banganapalli Mango',
      category: 'fruits',
      lotVolumeMT: 6.2,
      grade: 'గ్రేడ్ A (Premium Table)',
      brixIndex: '16.9° Brix',
      harvestDate: 'Yesterday Evening',
      location: 'Punganur Valley, AP-KA Border',
      distanceKm: 96,
      askPriceKg: 64.50,
      mandiBenchmark: 58.00,
      image: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=800&q=80',
      giCertified: true,
      kycVerified: true,
    },
    {
      id: 'lot-3',
      farmerName: 'శ్రీనివాస్ రెడ్డి (Srinivas Reddy)',
      teluguName: 'కదిరి నిమ్మ రైతుల సంఘం',
      fpo: 'Kadiri Citrus Farmers Collective',
      crop: 'బాలాజీ నిమ్మ (Balaji Lime)',
      englishCrop: 'Balaji Acid Lime',
      category: 'citrus',
      lotVolumeMT: 8.0,
      grade: 'గ్రేడ్ 1 (Heavy Juice Yield)',
      brixIndex: '6.8% Citric Index',
      harvestDate: 'Today Morning',
      location: 'Kadiri, Anantapur District',
      distanceKm: 135,
      askPriceKg: 71.00,
      mandiBenchmark: 68.00,
      image: 'https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=800&q=80',
      giCertified: true,
      kycVerified: true,
    },
    {
      id: 'lot-4',
      farmerName: 'వెంకటేశ్వర రావు (Venkateswara Rao)',
      teluguName: 'ముల్బాగల్ ప్రొగ్రెసివ్ ఫార్మర్స్',
      fpo: 'Mulbagal Tomato & Veg Producers',
      crop: 'హైబ్రిడ్ టమోటా (Hybrid Tomato)',
      englishCrop: 'Hybrid Table Tomato',
      category: 'vegetables',
      lotVolumeMT: 12.5,
      grade: 'గ్రేడ్ A (Firm Red Breaker)',
      brixIndex: 'Firmness 4.8 kg/cm²',
      harvestDate: 'Freshly Picked (3 hrs ago)',
      location: 'Mulbagal Highway Corridor, KA-AP Border',
      distanceKm: 62,
      askPriceKg: 28.50,
      mandiBenchmark: 28.00,
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
      giCertified: false,
      kycVerified: true,
    },
    {
      id: 'lot-5',
      farmerName: 'అనిల్ కుమార్ (Anil Kumar)',
      teluguName: 'తోతాపురి పల్ప్ గ్రోయర్స్',
      fpo: 'Chittoor Pulp Cultivators Sangh',
      crop: 'తోతాపురి మామిడి',
      englishCrop: 'Totapuri Pulp Mango',
      category: 'fruits',
      lotVolumeMT: 18.0,
      grade: 'గ్రేడ్ B (Processing Standard)',
      brixIndex: '14.2° Brix (High Pulp Recovery)',
      harvestDate: 'Today Morning',
      location: 'Chittoor Agro Zone',
      distanceKm: 112,
      askPriceKg: 34.00,
      mandiBenchmark: 32.00,
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      giCertified: false,
      kycVerified: true,
    },
  ];

  const filteredLots = farmerLots.filter((lot) => {
    if (selectedCategory !== 'all' && lot.category !== selectedCategory) return false;
    return true;
  });

  const handlePlaceBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!biddingLot) return;
    onShowToast(`Bid of ₹${bidPrice.toFixed(2)}/kg submitted for Lot #${biddingLot.id} (${biddingLot.farmerName}).`);
    setBiddingLot(null);
  };

  const handleDirectLock = (lot: FarmerLotMarketItem) => {
    const totalVal = lot.lotVolumeMT * 1000 * lot.askPriceKg;
    onShowToast(`Deal locked at farmer ask rate: ₹${lot.askPriceKg}/kg. PO generated for ₹${totalVal.toLocaleString('en-IN')}.`);
    onOpenContractSign();
  };

  return (
    <div className="space-y-6 pb-16">
      {/* 1. Merchant Profile & Escrow Credit Header */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#1A3026] text-white flex items-center justify-center font-serif font-bold text-2xl shrink-0 shadow-md">
              SB
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1a1c1e]">
                  Sri Balaji Agro Fruit &amp; Produce Exporters
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#c9ead9] text-[#022016] border border-[#adcebe] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-emerald-800">verified</span>
                  <span>APMC Grade A+ License</span>
                </span>
              </div>
              <p className="text-xs text-[#6F6B64] mt-1">
                APMC License: <strong className="text-[#1a1c1e]">KA-BLR-8921</strong> • GSTIN: <strong className="text-[#1a1c1e]">36AAACB1234F1Z0</strong> • Bangalore &amp; Rayalaseema Trade Desk
              </p>
            </div>
          </div>

          {/* Quick Header Triggers & Escrow Wallet */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Escrow Balance Chip */}
            <div className="px-4 py-2 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center">
                <span className="material-symbols-outlined text-base">account_balance_wallet</span>
              </div>
              <div>
                <div className="text-[10px] uppercase font-bold text-[#8a7269]">APMC Escrow Balance</div>
                <div className="font-mono font-bold text-sm text-[#1A3026]">
                  ₹85,42,000 <span className="text-[10px] font-sans text-emerald-800 font-semibold">(T+0 Active)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (typeof window !== 'undefined' && navigator.clipboard) {
                  const url = new URL(window.location.href);
                  url.searchParams.set('app', 'merchant');
                  url.hash = '#merchant';
                  navigator.clipboard.writeText(url.toString());
                  onShowToast('వ్యాపారి పోర్టల్ లింక్ కాపీ చేయబడింది! (Merchant/Buyer Portal URL copied)');
                } else {
                  onShowToast('Merchant URL: ' + window.location.href);
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E6DED4] text-xs font-semibold text-[#56423b] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
              title="Copy direct link to Merchant/Buyer Portal"
            >
              <span className="material-symbols-outlined text-sm text-[#1A3026]">share</span>
              <span>Share Portal</span>
            </button>

            <button
              onClick={onOpenCreateRFQ}
              className="px-4 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">post_add</span>
              <span>+ Post Buy Requirement</span>
            </button>

            <button
              onClick={onSwitchToFarmer}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#E6DED4] text-xs font-semibold text-[#56423b] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
              title="Test the Farmer Listing screen"
            >
              <span className="material-symbols-outlined text-sm text-[#983c0c]">agriculture</span>
              <span>రైతు వ్యూ (Farmer App)</span>
            </button>
          </div>
        </div>

        {/* 4 Merchant Quick KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#E6DED4]">
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Active Buy RFQs</div>
            <div className="font-mono font-bold text-lg sm:text-xl text-[#1a1c1e]">3 Active</div>
            <div className="text-[10px] text-emerald-800 font-medium">69 MT Demand Broadcasted</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Matched Farmer Lots</div>
            <div className="font-mono font-bold text-lg sm:text-xl text-[#983c0c]">45 Ready Lots</div>
            <div className="text-[10px] text-[#56423b]">Avg 84 km from Packhouse</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">In-Transit Reefer Freight</div>
            <div className="font-mono font-bold text-lg sm:text-xl text-[#476558]">4 Trucks Live</div>
            <div className="text-[10px] text-emerald-800 font-medium">GPS Telemetry On (12.4°C)</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">This Month Volume</div>
            <div className="font-mono font-bold text-lg sm:text-xl text-[#1a1c1e]">384 MT</div>
            <div className="text-[10px] text-stone-600">Settled via APMC e-NWR</div>
          </div>
        </div>
      </div>

      {/* 2. Merchant Portal Navigation Tabs */}
      <div className="flex items-center justify-between border-b border-[#E6DED4] pb-2">
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'marketplace'
                ? 'bg-[#1A3026] text-white shadow-xs'
                : 'text-[#56423b] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            <span>Live Farmer Lots &amp; Bidding</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {farmerLots.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('rfqs')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'rfqs'
                ? 'bg-[#1A3026] text-white shadow-xs'
                : 'text-[#56423b] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">assignment</span>
            <span>My Buy Requirements (RFQs)</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
              {rfqList.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('consignments')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'consignments'
                ? 'bg-[#1A3026] text-white shadow-xs'
                : 'text-[#56423b] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_shipping</span>
            <span>In-Transit &amp; Weighment</span>
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">4</span>
          </button>

          <button
            onClick={() => setActiveTab('wallet')}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === 'wallet'
                ? 'bg-[#1A3026] text-white shadow-xs'
                : 'text-[#56423b] hover:bg-white'
            }`}
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            <span>Escrow Ledger &amp; Payouts</span>
          </button>
        </div>
      </div>

      {/* 3. TAB CONTENT 1: LIVE MARKETPLACE & FARMER LOTS */}
      {activeTab === 'marketplace' && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white p-4 rounded-2xl border border-[#E6DED4] flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#8a7269]">వర్గం (Category):</span>
              {(['all', 'fruits', 'citrus', 'vegetables'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#983c0c] text-white'
                      : 'bg-[#FAF7F2] text-[#56423b] hover:bg-[#EDE7DD]'
                  }`}
                >
                  {cat === 'all' ? 'All Commodities' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="text-[#8a7269] font-medium">Brix Refraction Filter:</span>
              <select
                value={minBrixFilter}
                onChange={(e) => setMinBrixFilter(Number(e.target.value))}
                className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#E6DED4] text-xs text-[#1a1c1e]"
              >
                <option value={0}>All Quality Grades</option>
                <option value={15}>Brix &gt; 15.0° (Table Fruit)</option>
                <option value={16.5}>Brix &gt; 16.5° (Export Grade)</option>
              </select>
            </div>
          </div>

          {/* Farmer Lots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredLots.map((lot) => {
              const lotTotalKg = lot.lotVolumeMT * 1000;
              const lotTotalValue = lotTotalKg * lot.askPriceKg;
              const isGI = lot.giCertified;

              return (
                <div
                  key={lot.id}
                  className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs overflow-hidden flex flex-col justify-between hover:border-[#983c0c]/40 transition-all group"
                >
                  {/* Card Media & Badges */}
                  <div>
                    <div className="relative h-44 w-full overflow-hidden bg-stone-100">
                      <img
                        src={lot.image}
                        alt={lot.englishCrop}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {isGI && (
                          <span className="px-2 py-0.5 rounded-full bg-[#1A3026] text-emerald-300 text-[10px] font-bold tracking-wide shadow-sm flex items-center gap-1">
                            <span className="material-symbols-outlined text-[11px]">verified</span>
                            <span>GI Tagged</span>
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-xs text-white text-[10px] font-mono font-semibold">
                          {lot.lotVolumeMT} MT ({lot.lotVolumeMT * 10} Q)
                        </span>
                      </div>

                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-900/80 backdrop-blur-xs text-emerald-200 text-[10px] font-bold">
                          {lot.brixIndex}
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-3 right-3 bg-white/95 backdrop-blur-xs rounded-xl p-2 flex items-center justify-between text-xs">
                        <span className="font-bold text-[#1a1c1e]">{lot.grade}</span>
                        <span className="text-[11px] text-[#476558] font-semibold">{lot.distanceKm} km away</span>
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 space-y-3">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-serif font-bold text-base text-[#1a1c1e]">
                              {lot.crop}
                            </h3>
                            <div className="text-xs text-[#56423b]">{lot.englishCrop}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-bold text-lg text-[#983c0c]">
                              ₹{lot.askPriceKg.toFixed(2)}
                              <span className="text-xs font-sans font-normal text-[#8a7269]">/kg</span>
                            </div>
                            <div className="text-[10px] text-[#8a7269]">
                              Mandi Avg: ₹{lot.mandiBenchmark}/kg
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Farmer info */}
                      <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-xs space-y-1">
                        <div className="flex items-center justify-between font-semibold text-[#1a1c1e]">
                          <span className="flex items-center gap-1 text-[#983c0c]">
                            <span className="material-symbols-outlined text-sm">person</span>
                            <span>{lot.farmerName}</span>
                          </span>
                          <span className="text-[10px] text-emerald-800 bg-[#c9ead9] px-1.5 py-0.2 rounded font-bold">
                            KYC 100%
                          </span>
                        </div>
                        <div className="text-[11px] text-[#6F6B64] truncate">{lot.fpo}</div>
                        <div className="text-[10px] text-[#8a7269]">{lot.location}</div>
                      </div>

                      {/* Lot Total Value */}
                      <div className="flex items-center justify-between text-xs px-1">
                        <span className="text-[#6F6B64]">Total Lot Value:</span>
                        <span className="font-mono font-bold text-[#1A3026]">
                          ₹{lotTotalValue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        setBiddingLot(lot);
                        setBidPrice(lot.askPriceKg - 2);
                      }}
                      className="py-2 px-3 rounded-xl border border-[#983c0c] text-[#983c0c] hover:bg-[#FFF5F2] font-semibold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">gavel</span>
                      <span>Place Bid</span>
                    </button>

                    <button
                      onClick={() => handleDirectLock(lot)}
                      className="py-2 px-3 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white font-semibold text-xs shadow-2xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Lock Deal</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT 2: MY BUY REQUIREMENTS (RFQs) */}
      {activeTab === 'rfqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Active Purchase Requirements &amp; Algorithmic Pipeline
            </h2>
            <button
              onClick={onOpenCreateRFQ}
              className="px-3.5 py-1.5 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-2xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>Post New RFQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {rfqList.map((rfq) => {
              const fillPct = Math.round((rfq.volumeLockedMT / rfq.volumeRequiredMT) * 100);

              return (
                <div
                  key={rfq.id}
                  className="bg-white rounded-3xl border border-[#E6DED4] p-5 shadow-2xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E6DED4]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7ECE5] text-[#983c0c] flex items-center justify-center font-bold text-xs">
                        RFQ
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold text-base text-[#1a1c1e]">
                            {rfq.produceName}
                          </h3>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            rfq.status === 'completed'
                              ? 'bg-[#c9ead9] text-[#022016]'
                              : rfq.status === 'partially_filled'
                              ? 'bg-[#FDF4EA] text-[#884800]'
                              : 'bg-[#FFF5F2] text-[#983c0c]'
                          }`}>
                            {rfq.status === 'completed' ? '100% Fulfilled' : rfq.status === 'partially_filled' ? 'Partially Filled' : 'Active Bidding'}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8a7269] font-mono">{rfq.rfqCode} • Delivery by: {rfq.deliveryDate}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-emerald-800 bg-[#c9ead9] px-2.5 py-1 rounded-xl flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">bolt</span>
                        <span>{rfq.matchedLotsCount} Lots Matched ({rfq.matchScore}%)</span>
                      </span>
                    </div>
                  </div>

                  {/* Volume Fill Progress */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#56423b]">Fulfillment Progress:</span>
                      <span className="font-mono font-bold text-[#1a1c1e]">
                        {rfq.volumeLockedMT} MT / {rfq.volumeRequiredMT} MT ({fillPct}%)
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-[#FAF7F2] border border-[#E6DED4] overflow-hidden">
                      <div
                        className="h-full bg-[#983c0c] rounded-full transition-all duration-500"
                        style={{ width: `${fillPct}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Specs & Destinations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
                      <div className="text-[10px] text-[#8a7269] uppercase font-bold">Target Price Band</div>
                      <div className="font-mono font-bold text-sm text-[#1a1c1e] mt-0.5">
                        ₹{rfq.targetPriceMin} - ₹{rfq.targetPriceMax} / kg
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
                      <div className="text-[10px] text-[#8a7269] uppercase font-bold">Quality Assay</div>
                      <div className="text-xs text-[#56423b] mt-0.5 font-medium">{rfq.qualitySpecs}</div>
                    </div>

                    <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
                      <div className="text-[10px] text-[#8a7269] uppercase font-bold">Destination Hub</div>
                      <div className="text-xs text-[#56423b] mt-0.5 truncate font-medium">{rfq.deliveryLocation}</div>
                    </div>
                  </div>

                  {/* RFQ Trigger Actions */}
                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      onClick={() => setActiveTab('marketplace')}
                      className="px-3 py-1.5 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b] hover:bg-[#FAF7F2]"
                    >
                      View 14 Matched Lots
                    </button>
                    <button
                      onClick={() => onShowToast(`Broadcast refreshed for ${rfq.rfqCode}. 3 new FPOs notified.`)}
                      className="px-3.5 py-1.5 rounded-xl bg-[#1A3026] text-white text-xs font-semibold hover:bg-[#022016]"
                    >
                      Ping Nearby FPOs
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT 3: IN-TRANSIT & WEIGHMENT TELEMETRY */}
      {activeTab === 'consignments' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1a1c1e]">
                In-Transit Shipments &amp; Digital Weighbridge Clearance
              </h2>
              <p className="text-xs text-[#6F6B64]">
                Automated electronic waybills, reefer temperature telemetry, and escrow hold releases
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {CONSIGNMENT_ITEMS.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-3xl border border-[#E6DED4] p-5 shadow-2xs space-y-3.5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-base text-[#1a1c1e]">{c.produce}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.statusBadge === 'verified'
                          ? 'bg-[#c9ead9] text-[#022016]'
                          : c.statusBadge === 'intransit'
                          ? 'bg-[#FFF5F2] text-[#983c0c]'
                          : 'bg-[#FDF4EA] text-[#884800]'
                      }`}>
                        {c.statusBadge === 'verified' ? 'Weighbridge Certified' : c.statusBadge === 'intransit' ? 'In-Transit Reefer' : 'Cleared & Unloaded'}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#8a7269] font-mono mt-0.5">
                      PO: {c.poCode} • Waybill: {c.waybill}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-base text-[#1A3026]">
                      ₹{c.amount.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-[#476558] font-semibold">
                      {c.isEscrowHeld ? 'Escrow Held (T+0)' : 'Cleared'}
                    </div>
                  </div>
                </div>

                {/* Corridor route info */}
                <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] text-xs space-y-1.5">
                  <div className="flex items-center justify-between text-[#1a1c1e] font-semibold">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#983c0c]">local_shipping</span>
                      <span>Truck: {c.truckNo}</span>
                    </span>
                    <span className="text-[#476558]">{c.eta}</span>
                  </div>
                  <div className="text-[#56423b] text-[11px]">
                    Route: <strong>{c.sourceDest}</strong>
                  </div>
                  <div className="text-[10px] text-stone-600">
                    Weighment: {c.weighmentDetails}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => onOpenConsignmentModal(c)}
                    className="text-xs font-bold text-[#983c0c] hover:underline flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">satellite_alt</span>
                    <span>Live GPS &amp; Sensor Telemetry</span>
                  </button>

                  <button
                    onClick={() => onShowToast(`APMC e-Waybill downloaded for ${c.waybill}.`)}
                    className="px-3 py-1 rounded-xl bg-white border border-[#E6DED4] hover:bg-[#FAF7F2] text-xs font-semibold text-[#1a1c1e] shadow-2xs"
                  >
                    Download e-Waybill
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. TAB CONTENT 4: ESCROW WALLET & PAYOUT LEDGER */}
      {activeTab === 'wallet' && (
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#E6DED4] p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="font-serif font-bold text-xl text-[#1a1c1e]">
                  APMC Escrow Settlement Vault
                </h2>
                <p className="text-xs text-[#6F6B64]">
                  Zero-Counterparty Risk Trade Settlement through IDBI &amp; State APMC Clearing Nodes
                </p>
              </div>

              <button
                onClick={() => onShowToast('₹25,00,000 added to APMC Escrow via RTGS Virtual Account.')}
                className="px-4 py-2 rounded-xl bg-[#983c0c] text-white text-xs font-semibold hover:bg-[#7e2c00]"
              >
                + Top Up Escrow Balance
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
                <div className="text-xs text-[#8a7269]">Available Liquid Balance</div>
                <div className="font-mono font-bold text-2xl text-[#1a1c1e] mt-1">
                  ₹85,42,000
                </div>
                <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                  Ready for instant 10% advance locking
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce]">
                <div className="text-xs text-[#983c0c]">Locked in Active Shipments</div>
                <div className="font-mono font-bold text-2xl text-[#983c0c] mt-1">
                  ₹18,50,000
                </div>
                <div className="text-[10px] text-[#7e2c00] font-semibold mt-1">
                  4 Consignments in transit
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#E5EBE7] border border-[#adcebe]">
                <div className="text-xs text-[#1A3026]">Total Payouts to Farmers (30D)</div>
                <div className="font-mono font-bold text-2xl text-[#1A3026] mt-1">
                  ₹1,42,10,000
                </div>
                <div className="text-[10px] text-[#304d40] font-semibold mt-1">
                  100% T+0 Bank Transfers
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Interactive Modal: Place Bid Dialog */}
      {biddingLot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  Submit Bid on Lot #{biddingLot.id}
                </h3>
                <p className="text-xs text-[#6F6B64]">{biddingLot.crop} • {biddingLot.farmerName}</p>
              </div>
              <button
                onClick={() => setBiddingLot(null)}
                className="p-1 text-[#8a7269] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#6F6B64]">Farmer Asking Rate:</span>
                  <span className="font-bold text-[#1a1c1e]">₹{biddingLot.askPriceKg.toFixed(2)}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6F6B64]">Mandi Current Benchmark:</span>
                  <span className="font-bold text-[#1a1c1e]">₹{biddingLot.mandiBenchmark.toFixed(2)}/kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6F6B64]">Lot Quantity:</span>
                  <span className="font-bold text-[#1a1c1e]">{biddingLot.lotVolumeMT} MT ({biddingLot.lotVolumeMT * 1000} kg)</span>
                </div>
              </div>

              {/* Bid price stepper */}
              <div>
                <label className="block font-semibold text-[#56423b] mb-1">
                  Your Bid Price (₹/kg)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setBidPrice(Math.max(10, bidPrice - 0.5))}
                    className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] font-bold text-lg"
                  >
                    -
                  </button>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 font-bold text-xs text-[#8a7269]">₹</span>
                    <input
                      type="number"
                      step="0.5"
                      value={bidPrice}
                      onChange={(e) => setBidPrice(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 rounded-xl bg-white border border-[#E6DED4] font-mono font-bold text-base text-[#1a1c1e]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setBidPrice(bidPrice + 0.5)}
                    className="w-10 h-10 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] font-bold text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Total Bid Calculation */}
              <div className="p-3 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] text-xs flex items-center justify-between">
                <div>
                  <div className="text-[#304d40]">Total Bid Commitment:</div>
                  <div className="font-mono font-bold text-base text-[#1A3026]">
                    ₹{(biddingLot.lotVolumeMT * 1000 * bidPrice).toLocaleString('en-IN')}
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-1 rounded-lg">
                  Valid for 2 Hours
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setBiddingLot(null)}
                className="px-4 py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePlaceBidSubmit}
                className="px-5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm"
              >
                Confirm &amp; Transmit Bid
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
