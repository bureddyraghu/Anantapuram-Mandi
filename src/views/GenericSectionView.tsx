import React from 'react';
import { AppView } from '../types';

interface GenericSectionViewProps {
  view: AppView;
  onNavigate: (view: AppView) => void;
  onShowToast: (msg: string) => void;
}

export const GenericSectionView: React.FC<GenericSectionViewProps> = ({
  view,
  onNavigate,
  onShowToast,
}) => {
  const getSectionDetails = () => {
    switch (view) {
      case 'farmers-and-fpos':
        return {
          title: 'Farmers & FPOs Registry (రైతులు మరియు FPOలు)',
          subtitle: '24,580 Verified Farmers across 88 Horticulture Producer Organizations',
          badge: '24.5k Active',
          icon: 'nature_people',
          items: [
            { id: '1', title: 'Madanapalle West Mango FPO (AP-9842)', metric: '1,840 Members • 18.5 MT Ready', status: 'GI Verified' },
            { id: '2', title: 'Kadiri Citrus Collective (AP-4112)', metric: '920 Members • 25.0 MT Balaji Lemon', status: 'Auction Active' },
            { id: '3', title: 'Mulbagal Tomato Progressive Growers (KA-092)', metric: '1,420 Members • 34.0 MT Tomatoes', status: 'T+0 Settled' },
          ]
        };
      case 'mandi-merchants':
        return {
          title: 'Mandi Merchants & Interstate Buyers',
          subtitle: '4,820 Licensed APMC Commission Agents, Exporters & Retail Aggregators',
          badge: '4.8k Registered',
          icon: 'storefront',
          items: [
            { id: '1', title: 'Sri Balaji Agro Fruit & Produce Exporters', metric: 'APMC KA-BLR-8921 • Grade A+ Buyer', status: '₹85.0L Escrow' },
            { id: '2', title: 'Reliance Fresh South Logistics Hub', metric: 'Daily Ingestion 120 MT • Bangalore Hub', status: 'Auto-Clearing' },
            { id: '3', title: 'Deccan Food Processors Ltd', metric: 'Tomato & Mango Pulp Consignment Specialist', status: 'Active POs' },
          ]
        };
      case 'produce-master':
        return {
          title: 'Produce Master & GI Tag Registry',
          subtitle: 'Commodity Specifications, Brix Benchmarks, and Permissible Ripening Standards',
          badge: 'GI Protected',
          icon: 'grain',
          items: [
            { id: '1', title: 'Banganapalli Mango (Madanapalle GI)', metric: 'Brix > 16.5° • Strict 0% Carbide • Export Grade', status: 'Peak Season' },
            { id: '2', title: 'Balaji Acid Lime (Anantapur GI)', metric: 'Citric Index 6.8% • Caliber 42-45mm', status: 'High Shortage' },
            { id: '3', title: 'Guntur Sannam Chilli S4', metric: 'SHU 35,000-40,000 • Moisture < 10%', status: 'Stable Flow' },
          ]
        };
      case 'live-marketplace':
        return {
          title: 'Live Mandi Marketplace & Spot Auctions',
          subtitle: 'Real-time Electronic Bidding and Dynamic Price Discovery Floor',
          badge: 'LIVE AUCTIONS',
          icon: 'gavel',
          items: [
            { id: '1', title: 'Lot #AP-9921: 24 MT Banganapalli Grade A', metric: 'Current Bid: ₹62.00/kg • 6 Bidders Active', status: 'Locking Soon' },
            { id: '2', title: 'Lot #KA-4102: 18 MT Kolar Hybrid Tomatoes', metric: 'Current Bid: ₹28.40/kg • 12 Crates Batches', status: 'Bidding Open' },
            { id: '3', title: 'Lot #KL-1109: 15 MT Nendran Plantain', metric: 'Current Bid: ₹38.00/kg • Kochi Exporters', status: 'Matched' },
          ]
        };
      case 'logistics-and-cold-chain':
        return {
          title: 'Logistics & CA Cold Chain Corridor',
          subtitle: 'Reefer Truck Dispatch, Temperature Telemetry, and Pre-Cooling Hubs',
          badge: '168 LCVs Live',
          icon: 'local_shipping',
          items: [
            { id: '1', title: 'Punganur Controlled Atmosphere Cold Hub', metric: 'Chambers 1-4: 12.4°C • 2,800 MT Capacity', status: '82% Occupied' },
            { id: '2', title: 'Mulbagal Interstate Logistics Checkpost', metric: 'RFID Automated Toll Flow • 140 MT/hr', status: 'Clear Corridor' },
            { id: '3', title: 'Kempegowda Air Cargo Cold Chain Route', metric: 'Madanapalle Express Reefer Transit (110 km)', status: 'ETA 2.2 hrs' },
          ]
        };
      case 'supply-demand-and-pricing':
        return {
          title: 'Supply & Pricing Telemetry Dashboard',
          subtitle: 'Cross-State Arbitrage, Historical Price Elasticity & Demand Forecasting',
          badge: '5 States',
          icon: 'trending_up',
          items: [
            { id: '1', title: 'Andhra Pradesh vs Karnataka Price Spread', metric: 'Mango: +₹8.20/kg spread • Tomato: -₹3.10/kg', status: 'Arbitrage Active' },
            { id: '2', title: 'Tamil Nadu - Kerala Transit Spreads', metric: 'Chilli & Pepper premiums holding above 12% MSP', status: 'High Volume' },
            { id: '3', title: 'Terminal Yard Inflow Projections (7 Days)', metric: 'Projected 42,000 MT arrivals across Rayalaseema', status: 'Surge Ahead' },
          ]
        };
      case 'ai-opportunity-engine':
        return {
          title: 'AI Opportunity Engine & Predictive Logistics',
          subtitle: 'Automated Route Deficit Equilibrium & Intelligent Matching Algorithms',
          badge: 'PRO ACTIVE',
          icon: 'neurology',
          items: [
            { id: '1', title: 'Balaji Acid Lime Severe Deficit Alert', metric: 'Reroute 150 MT from Kadiri to Bangalore KR Market', status: 'Spike +₹12.50' },
            { id: '2', title: 'Harvest Surge Warning: Banganapalli Mango', metric: 'Broadcast lots to 310 export buyers across Mumbai/Delhi', status: 'Action Advised' },
            { id: '3', title: 'Kolar Checkpost Scale-03 Delay Mitigation', metric: 'Divert 18 LCVs via Chintamani SH-82 Bypass', status: 'Bypass Ready' },
          ]
        };
      default:
        return {
          title: 'APMC Digital Audit & Platform Settings',
          subtitle: 'Interstate Compliance, e-NWR Warehousing & Cryptographic Digital Signatures',
          badge: 'Security v4.2',
          icon: 'verified_user',
          items: [
            { id: '1', title: 'APMC Electronic Negotiable Warehouse Receipts (e-NWR)', metric: '100% compliant with National Electronic Mandi Grid', status: 'Valid' },
            { id: '2', title: 'Digital Signature Certificate (DSC) Management', metric: 'Valid for Sri Balaji Agro Exporters (KA-BLR-8921)', status: 'Active' },
            { id: '3', title: 'T+0 Instant RTGS Clearing Gateway', metric: 'IDBI & SBI Central Mandi Escrow Settlement Nodes', status: 'Operational' },
          ]
        };
    }
  };

  const details = getSectionDetails();

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#983c0c] text-white flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-2xl">{details.icon}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1a1c1e]">
                {details.title}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#c9ead9] text-[#022016]">
                {details.badge}
              </span>
            </div>
            <p className="text-xs text-[#6F6B64] mt-0.5">{details.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-4 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] hover:bg-[#F3EDE2]"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => onShowToast(`Action triggered in ${details.title}`)}
            className="px-4 py-2 rounded-xl bg-[#983c0c] text-white text-xs font-semibold hover:bg-[#7e2c00]"
          >
            Synchronize Data
          </button>
        </div>
      </div>

      {/* Grid of items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {details.items.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-3xl bg-white border border-[#E6DED4] shadow-2xs space-y-3 flex flex-col justify-between hover:border-[#983c0c]/40 transition-all"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5EBE7] text-[#1A3026]">
                  {item.status}
                </span>
                <span className="material-symbols-outlined text-base text-[#8a7269]">more_vert</span>
              </div>
              <h3 className="font-serif font-bold text-base text-[#1a1c1e] mt-2">
                {item.title}
              </h3>
              <p className="text-xs text-[#56423b] mt-1">{item.metric}</p>
            </div>

            <div className="pt-3 border-t border-[#E6DED4] flex items-center justify-between">
              <button
                onClick={() => {
                  onShowToast(`Inspect details for ${item.title}`);
                  if (view === 'live-marketplace' || view === 'farmers-and-fpos') {
                    onNavigate('procurement-orders-and-weighment');
                  }
                }}
                className="text-xs font-bold text-[#983c0c] hover:underline flex items-center gap-1"
              >
                <span>View Details</span>
                <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </button>
              <button
                onClick={() => onShowToast(`Directive executed for ${item.title}`)}
                className="px-3 py-1 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] hover:bg-[#F3EDE2]"
              >
                Action
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
