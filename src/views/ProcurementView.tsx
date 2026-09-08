import React, { useState } from 'react';
import { CONSIGNMENT_ITEMS, FARMER_MATCHES } from '../data/mockData';
import { ConsignmentItem, FarmerMatch } from '../types';

interface ProcurementViewProps {
  onOpenSignModal: () => void;
  onOpenConsignmentModal: (item: ConsignmentItem) => void;
  onShowToast: (msg: string) => void;
}

export const ProcurementView: React.FC<ProcurementViewProps> = ({
  onOpenSignModal,
  onOpenConsignmentModal,
  onShowToast,
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'mango' | 'citrus' | 'veggies'>('all');
  const [negotiationInput, setNegotiationInput] = useState('₹62.00 / kg');
  const [negotiationMessages, setNegotiationMessages] = useState<Array<{
    sender: 'farmer' | 'merchant';
    amount: string;
    text: string;
    time: string;
    isFinal?: boolean;
  }>>([
    {
      sender: 'farmer',
      amount: '₹65.00 / kg',
      text: 'Brix 17.2° Grade A certified lot. Picked this morning.',
      time: '09:15 AM'
    },
    {
      sender: 'merchant',
      amount: '₹60.00 / kg',
      text: 'Immediate payment lock. We will pick up from Madanapalle farm gate.',
      time: '09:22 AM'
    },
    {
      sender: 'farmer',
      amount: '₹63.00 / kg',
      text: 'Includes CFB boxes and APMC labor loading costs.',
      time: '09:34 AM'
    },
    {
      sender: 'merchant',
      amount: '₹62.00 / kg',
      text: 'Agreed at ₹62.00/kg for full 24 MT lot. Locking 10% escrow now.',
      time: '09:40 AM',
      isFinal: true
    }
  ]);

  const [activeMatches, setActiveMatches] = useState<FarmerMatch[]>(FARMER_MATCHES);

  const handleSendCounter = () => {
    if (!negotiationInput.trim()) return;
    const newMsg = {
      sender: 'merchant' as const,
      amount: negotiationInput,
      text: `Counter-offer updated by Sri Balaji Procurement Desk.`,
      time: 'Just now'
    };
    setNegotiationMessages([...negotiationMessages, newMsg]);
    onShowToast(`Counter proposal (${negotiationInput}) transmitted to farmer.`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Merchant Profile & Verification Header */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 sm:p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#983c0c] text-white flex items-center justify-center font-bold text-2xl shadow-md shrink-0">
            SB
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1a1c1e]">
                Sri Balaji Agro Fruit & Produce Exporters
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#c9ead9] text-[#022016] border border-[#adcebe] flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>APMC Verified • Grade A+ Buyer</span>
              </span>
            </div>
            <p className="text-xs text-[#6F6B64] flex flex-wrap items-center gap-3">
              <span>APMC License: <strong>KA-BLR-8921</strong></span>
              <span>•</span>
              <span>GSTIN: <strong>29AABCB8912P1Z4</strong></span>
              <span>•</span>
              <span>Packhouse Hubs: <strong>Kolar • Bengaluru • Hosur</strong></span>
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => onShowToast('Exporting buyer ledger and e-invoices...')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#E6DED4] bg-white text-xs font-semibold text-[#1a1c1e] hover:bg-[#FAF7F2] transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-base text-[#6F6B64]">receipt_long</span>
            <span>Export Ledger</span>
          </button>

          <button
            onClick={() => onShowToast('New Buy Requirement (RFQ) wizard opened.')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ Create Buy Requirement (RFQ)</span>
          </button>
        </div>
      </div>

      {/* 2. Procurement Pipeline Quick KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Today's Target</span>
            <span className="font-mono font-bold text-xs text-[#983c0c]">61.6% Filled</span>
          </div>
          <div className="text-xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            74 / 120 <span className="text-xs font-normal text-[#6F6B64]">MT</span>
          </div>
          <div className="w-full bg-[#EDE7DD] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#983c0c] h-full rounded-full" style={{ width: '61.6%' }}></div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Active RFQs</span>
            <span className="text-[10px] font-bold text-[#884800] bg-[#FDF4EA] px-1.5 py-0.5 rounded">3 Urgent</span>
          </div>
          <div className="text-xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            8 <span className="text-xs font-normal text-[#6F6B64]">Open</span>
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">Mango, Lemon, Tomato</div>
        </div>

        {/* Metric 3 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Matched Farmers</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-[#E5EBE7] px-1.5 py-0.5 rounded">96% Top</span>
          </div>
          <div className="text-xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            46 <span className="text-xs font-normal text-[#6F6B64]">Verified Lots</span>
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">Brix &gt; 16.5° Assayed</div>
        </div>

        {/* Metric 4 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>In-Transit & Weighment</span>
            <span className="text-[10px] font-bold text-[#476558] bg-[#E5EBE7] px-1.5 py-0.5 rounded">Active</span>
          </div>
          <div className="text-xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            4 <span className="text-xs font-normal text-[#6F6B64]">Consignments</span>
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">₹28.4L in Escrow</div>
        </div>

        {/* Metric 5 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Escrow Liquidity</span>
            <span className="text-[10px] font-bold text-emerald-700">T+0 Ready</span>
          </div>
          <div className="text-xl font-bold font-mono text-[#1A3026] mt-1.5">
            ₹85.00 <span className="text-xs font-normal text-[#6F6B64]">Lakhs</span>
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">IDBI APMC Escrow Acc</div>
        </div>
      </div>

      {/* 3. Section 15: Active Demand Board & Procurement Pipeline */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Active Demand Board & Procurement Pipeline
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Match verified farmer supplies directly with your active export purchase orders
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E6DED4] text-xs">
            {[
              { id: 'all', label: 'All Demands (8)' },
              { id: 'mango', label: 'Mango Belts (3)' },
              { id: 'citrus', label: 'Citrus & Lemon (2)' },
              { id: 'veggies', label: 'Vegetables (3)' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#983c0c] text-white shadow-2xs'
                    : 'text-[#56423b] hover:text-[#1a1c1e]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Demand Card with Artisanal Crates Photo */}
        <div className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E6DED4] grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Produce Visual */}
          <div className="lg:col-span-4 relative h-48 w-full rounded-2xl overflow-hidden shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
              alt="Banganapalli Mango in Crates"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#983c0c] text-white text-[10px] font-bold tracking-wider uppercase shadow-sm">
              GI Tagged • GI-AP-01
            </div>
            <div className="absolute bottom-3 left-3 text-white">
              <div className="font-serif font-bold text-base">Banganapalli Mango (Grade A)</div>
              <div className="text-[11px] text-stone-200">Madanapalle / Anantapur Agro-Corridor</div>
            </div>
          </div>

          {/* Specs Grid */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#983c0c]">APMC-RFQ-2026-8941</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E5EBE7] text-[#1A3026]">
                Direct Farmer Sourcing
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-[#E6DED4]">
                <div className="text-[#6F6B64] text-[10px]">Required Volume</div>
                <div className="font-bold text-sm text-[#1a1c1e]">50 MT</div>
                <div className="text-[10px] text-emerald-700">26 MT already locked</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E6DED4]">
                <div className="text-[#6F6B64] text-[10px]">Target Price Band</div>
                <div className="font-bold text-sm text-[#983c0c]">₹58.00 - ₹64.00</div>
                <div className="text-[10px] text-[#6F6B64]">per kg (ex-farm gate)</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E6DED4]">
                <div className="text-[#6F6B64] text-[10px]">Min. Quality Assay</div>
                <div className="font-bold text-sm text-[#1a1c1e]">Brix &gt; 16.5°</div>
                <div className="text-[10px] text-[#476558]">Export Caliber &gt; 320g</div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E6DED4]">
                <div className="text-[#6F6B64] text-[10px]">Required Delivery</div>
                <div className="font-bold text-sm text-[#1a1c1e]">16 Sep 2026</div>
                <div className="text-[10px] text-rose-700 font-semibold">Strict 0% Carbide</div>
              </div>
            </div>
          </div>

          {/* Matches Summary & Call to Action */}
          <div className="lg:col-span-3 p-4 rounded-2xl bg-white border border-[#E6DED4] text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F7ECE5] text-[#983c0c] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">match_word</span>
            </div>
            <div>
              <div className="text-xs text-[#6F6B64]">Algorithmic State</div>
              <div className="font-serif font-bold text-lg text-[#1a1c1e]">96% Match Peak</div>
              <div className="text-[11px] text-[#476558]">18 Farmer Lots Ready within 30km</div>
            </div>
            <button
              onClick={() => onShowToast('Scoring and ranking 18 farmer harvest lots by Brix and transit distance...')}
              className="w-full py-2 rounded-xl bg-[#1A3026] hover:bg-[#022016] text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              View Ranked Matches (18)
            </button>
          </div>
        </div>
      </div>

      {/* 4. Section 17: Algorithmic Supply Matching Engine */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Algorithmic Supply Matching Engine
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Sorted by geo-proximity, Brix refraction index, and APMC farmer trust score
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#8a7269]">Sort by:</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] font-semibold text-[#983c0c] border border-[#E6DED4]">
              Match Score (High to Low)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white font-medium text-[#56423b] border border-[#E6DED4]">
              Distance
            </span>
          </div>
        </div>

        {/* 3 Matched Farmer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeMatches.map((match) => (
            <div
              key={match.id}
              className="p-5 rounded-3xl bg-[#FAF7F2] border border-[#E6DED4] hover:border-[#983c0c]/50 transition-all flex flex-col justify-between space-y-4 shadow-2xs"
            >
              <div>
                {/* Score & Harvest */}
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    match.badgeType === 'secondary'
                      ? 'bg-[#c9ead9] text-[#022016] border border-[#adcebe]'
                      : match.badgeType === 'amber'
                      ? 'bg-[#FDF4EA] text-[#884800] border border-[#ffdcc3]'
                      : 'bg-[#FFF5F2] text-[#983c0c] border border-[#ffdbce]'
                  }`}>
                    {match.matchScore}% Match Score
                  </span>
                  <span className="text-[10px] text-[#8a7269] font-medium">{match.distanceLabel}</span>
                </div>

                {/* Farmer Info */}
                <div className="mt-3">
                  <h4 className="font-serif font-bold text-base text-[#1a1c1e]">{match.name}</h4>
                  <div className="text-[11px] text-[#6F6B64] font-medium">{match.fpo}</div>
                </div>

                {/* Specs List */}
                <div className="mt-3.5 space-y-2 text-xs text-[#56423b]">
                  <div className="p-2 rounded-xl bg-white border border-[#E6DED4] space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#8a7269]">Lot Volume:</span>
                      <span className="font-bold text-[#1a1c1e]">{match.lotVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8a7269]">Assay / Brix:</span>
                      <span className="font-semibold text-emerald-800">{match.qualityAssay}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8a7269]">Farmer Trust:</span>
                      <span className="font-medium text-amber-700">{match.trustScore}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[#8a7269]">Farmer Asking Rate:</span>
                    <span className="font-mono font-bold text-base text-[#983c0c]">
                      ₹{match.farmerAskPrice.toFixed(2)}/kg
                    </span>
                  </div>
                  <div className="text-[10px] text-[#8a7269] flex justify-between">
                    <span>Est. Lot Value:</span>
                    <span className="font-mono font-semibold">₹{(match.estimatedLotValue).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Card Action Buttons */}
              <div className="pt-3 border-t border-[#E6DED4] flex items-center gap-2">
                <button
                  onClick={() => {
                    onShowToast(`Negotiation opened with ${match.name} at ₹${match.farmerAskPrice}/kg.`);
                  }}
                  className="flex-1 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-2xs transition-colors flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">handshake</span>
                  <span>Initiate Deal</span>
                </button>
                <button
                  onClick={() => onShowToast(`Lab Brix Refractometer Sheet opened for ${match.name}.`)}
                  className="p-2 rounded-xl bg-white border border-[#E6DED4] hover:bg-[#FAF7F2] text-[#1a1c1e] text-xs font-medium"
                  title="Lab Brix Assay Certificate"
                >
                  <span className="material-symbols-outlined text-base">science</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Section 18 & 19: Live Trade Negotiation Engine & Digital Mandi Contract Execution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Trade Negotiation Chat/Timeline (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#F7ECE5] text-[#983c0c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">forum</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1a1c1e]">
                    Live Trade Negotiation Engine
                  </h3>
                  <p className="text-[11px] text-[#6F6B64]">Room ID: #TRD-8941-RF • Ramesh Farms &amp; Collective</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#c9ead9] text-[#022016]">
                Deal Agreed
              </span>
            </div>

            {/* Stepper Negotiation Stream */}
            <div className="mt-4 space-y-3 max-h-64 overflow-y-auto pr-1">
              {negotiationMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl text-xs space-y-1 ${
                    msg.sender === 'merchant'
                      ? 'bg-[#F7ECE5] border border-[#ffdbce] ml-6'
                      : 'bg-[#FAF7F2] border border-[#E6DED4] mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1a1c1e]">
                      {msg.sender === 'merchant' ? 'You (Sri Balaji Agro)' : 'Ramesh Garu (Farmer FPO)'}
                    </span>
                    <span className="text-[10px] text-[#8a7269]">{msg.time}</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono font-bold text-sm text-[#983c0c]">{msg.amount}</span>
                    <span className="text-[#56423b] text-[11px]">{msg.text}</span>
                  </div>
                  {msg.isFinal && (
                    <div className="pt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-800">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      <span>Mutual rate accepted: ₹62.00 / kg</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Negotiation Input Box */}
          <div className="mt-4 pt-3 border-t border-[#E6DED4] flex items-center gap-2">
            <input
              type="text"
              placeholder="Send message or counter rate (e.g. ₹62.50 / kg)..."
              value={negotiationInput}
              onChange={(e) => setNegotiationInput(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] placeholder-[#8a7269] focus:outline-none focus:border-[#983c0c]"
            />
            <button
              onClick={handleSendCounter}
              className="px-4 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold flex items-center gap-1 shadow-2xs transition-colors"
            >
              <span className="material-symbols-outlined text-sm">send</span>
              <span>Send</span>
            </button>
          </div>
        </div>

        {/* Digital Mandi Contract Execution Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">contract</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1a1c1e]">
                    Digital Mandi Contract Execution
                  </h3>
                  <p className="text-[11px] text-[#6F6B64]">APMC PO #MND-PO-2026-9921</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#8a7269] border border-[#E6DED4]">
                Ready to Sign
              </span>
            </div>

            {/* Contract Summary Specs */}
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between text-[#56423b]">
                <span>Commodity:</span>
                <span className="font-semibold text-[#1a1c1e]">Banganapalli Mango (GI Tag)</span>
              </div>
              <div className="flex justify-between text-[#56423b]">
                <span>Agreed Volume:</span>
                <span className="font-mono font-bold text-[#1a1c1e]">24,000 Kg (24 MT)</span>
              </div>
              <div className="flex justify-between text-[#56423b]">
                <span>Agreed Rate:</span>
                <span className="font-mono font-bold text-[#983c0c]">₹62.00 / kg</span>
              </div>
              <div className="flex justify-between text-[#56423b]">
                <span>APMC Cess (1.0%):</span>
                <span className="font-mono text-[#6F6B64]">₹14,880</span>
              </div>
              <div className="pt-2 border-t border-[#E6DED4] flex justify-between text-sm font-bold text-[#1a1c1e]">
                <span>Total Contract Value:</span>
                <span className="font-mono text-[#983c0c]">₹14,88,000</span>
              </div>

              {/* 10% Advance Escrow Held Box */}
              <div className="p-3 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] text-xs text-[#1A3026] space-y-1 mt-3">
                <div className="flex items-center justify-between font-bold">
                  <span>10% Advance Escrow Required:</span>
                  <span className="font-mono text-sm">₹1,48,800</span>
                </div>
                <p className="text-[11px] text-[#304d40]">
                  Funds will remain securely locked in APMC T+0 Escrow until digital weighment at WB-04 scale.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 pt-3 border-t border-[#E6DED4] flex flex-col sm:flex-row items-center gap-2.5">
            <button
              onClick={onOpenSignModal}
              className="w-full py-2.5 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Generate &amp; Sign Digital Mandi PO</span>
            </button>
            <button
              onClick={() => onShowToast('2 LCV vehicles reserved from Madanapalle transport pool.')}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-base">local_shipping</span>
              <span>Dispatch LCV</span>
            </button>
          </div>
        </div>

      </div>

      {/* 6. Section 21-23: In-Transit Consignments & Digital Weighment Radar */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              In-Transit Consignments &amp; Digital Weighment Radar
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Real-time electronic weighbridge telemetry, RFID waybills, and T+0 escrow settlements
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#c9ead9] text-[#022016] border border-[#adcebe]">
            All Checkposts Synchronized
          </span>
        </div>

        {/* Consignments Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6DED4] text-[#8a7269] uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3 px-3">PO &amp; e-Waybill</th>
                <th className="py-3 px-3">Produce &amp; Corridor</th>
                <th className="py-3 px-3">Truck &amp; Driver</th>
                <th className="py-3 px-3">Weighbridge Telemetry</th>
                <th className="py-3 px-3">Escrow Status</th>
                <th className="py-3 px-3 text-right">Radar Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DED4]/60">
              {CONSIGNMENT_ITEMS.map((item) => (
                <tr key={item.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  {/* PO & Waybill */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-sm text-[#1a1c1e]">{item.poCode}</div>
                    <div className="text-[10px] text-[#6F6B64] font-mono">{item.waybill}</div>
                  </td>

                  {/* Produce */}
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-[#1a1c1e]">{item.produce}</div>
                    <div className="text-[11px] text-[#56423b]">{item.belt}</div>
                  </td>

                  {/* Truck */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-semibold text-[#1a1c1e]">{item.truckNo}</div>
                    <div className="text-[11px] text-[#8a7269]">{item.eta}</div>
                  </td>

                  {/* Weighbridge */}
                  <td className="py-3.5 px-3">
                    <div className="font-semibold text-emerald-800 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">scale</span>
                      <span>{item.weighmentStatus}</span>
                    </div>
                    <div className="text-[10px] text-[#6F6B64] font-mono">{item.weighmentDetails}</div>
                  </td>

                  {/* Escrow */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-sm text-[#983c0c]">
                      ₹{(item.amount).toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-[#476558]">{item.paymentStatus}</div>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onOpenConsignmentModal(item)}
                        className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] flex items-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">location_searching</span>
                        <span>Track Live</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* APMC Registry Footer */}
      <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] text-center text-xs text-[#6F6B64] space-y-1">
        <div className="font-semibold text-[#1a1c1e]">
          Anantapuram Agricultural Market Committee (APMC) • Interstate Digital Mandi Registry
        </div>
        <div>
          Protected under Electronic Negotiable Warehouse Receipts (e-NWR) &amp; APMC Act 2026 Regulations.
        </div>
      </div>
    </div>
  );
};
