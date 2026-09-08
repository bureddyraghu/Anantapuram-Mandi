import React, { useState } from 'react';
import { 
  CLUSTER_NODES, 
  PRODUCE_MATRIX, 
  SETTLEMENT_CONTRACTS 
} from '../data/mockData';
import { AppView, ClusterNode, ProduceMatrixRow } from '../types';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
  onOpenEquilibriumModal: () => void;
  onOpenCreateZoneModal: () => void;
  onOpenConsignmentModal: (contractCode: string) => void;
  onShowToast: (msg: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onOpenEquilibriumModal,
  onOpenCreateZoneModal,
  onOpenConsignmentModal,
  onShowToast,
}) => {
  const [selectedCluster, setSelectedCluster] = useState<ClusterNode>(CLUSTER_NODES[0]);
  const [activeMapLayer, setActiveMapLayer] = useState<'supply' | 'demand' | 'bottlenecks'>('supply');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [produceSearch, setProduceSearch] = useState<string>('');

  const filteredProduce = PRODUCE_MATRIX.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesSearch = item.name.toLowerCase().includes(produceSearch.toLowerCase()) ||
                          item.teluguName.includes(produceSearch) ||
                          item.origin.toLowerCase().includes(produceSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Header Banner & Title */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#983c0c] bg-[#FFF5F2] px-2.5 py-0.5 rounded-full border border-[#ffdbce]">
              Command Center • కమాండ్ సెంటర్
            </span>
            <span className="text-xs text-[#6F6B64] font-medium hidden sm:inline">
              Inter-State Mandi Operating System v4.2
            </span>
          </div>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1a1c1e] tracking-tight">
            South India Mandi Operating System
          </h1>
          <p className="text-xs sm:text-sm text-[#56423b] mt-0.5">
            Real-Time Agro-Corridor Telemetry across Andhra Pradesh, Karnataka, Tamil Nadu, Telangana, and Kerala.
          </p>
        </div>

        {/* Quick Action Triggers */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button
            onClick={() => onShowToast('Exporting South India Mandi Audit Dossier (PDF & CSV)...')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-[#E6DED4] bg-white text-xs font-semibold text-[#1a1c1e] hover:bg-[#FAF7F2] transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-base text-[#6F6B64]">download</span>
            <span>Export Audit</span>
          </button>

          <button
            onClick={onOpenEquilibriumModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F7ECE5] border border-[#ffdbce] text-xs font-semibold text-[#983c0c] hover:bg-[#ffb598]/30 transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Price Equilibrium</span>
          </button>

          <button
            onClick={() => onShowToast('Field Officer alert broadcasted to 14 APMC mobile inspectors.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#E5EBE7] border border-[#adcebe] text-xs font-semibold text-[#1A3026] hover:bg-[#c9ead9] transition-colors shadow-2xs"
          >
            <span className="material-symbols-outlined text-base">badge</span>
            <span>Dispatch Field Officer</span>
          </button>

          <button
            onClick={onOpenCreateZoneModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-base">add_location_alt</span>
            <span>+ Create Regional Zone</span>
          </button>
        </div>
      </div>

      {/* 2. Command OS Status Ribbon */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg">sync_alt</span>
          </div>
          <div>
            <div className="text-[11px] text-[#6F6B64]">Inter-State Cluster Sync</div>
            <div className="font-bold text-[#1a1c1e]">Active (AP-KA-TN-TS-KL)</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FAF7F2] text-[#983c0c] flex items-center justify-center shrink-0 border border-[#E6DED4]">
            <span className="material-symbols-outlined text-lg">sensors</span>
          </div>
          <div>
            <div className="text-[11px] text-[#6F6B64]">Network Pulse</div>
            <div className="font-bold text-[#1a1c1e]">128 APMC Mandis Online</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E5EBE7] text-[#1A3026] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-lg">scale</span>
          </div>
          <div>
            <div className="text-[11px] text-[#6F6B64]">Digital Weighment Assurance</div>
            <div className="font-bold text-emerald-800">99.8% Automated</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#FDF4EA] text-[#884800] flex items-center justify-center shrink-0 border border-[#ffdcc3]">
            <span className="material-symbols-outlined text-lg">verified_user</span>
          </div>
          <div>
            <div className="text-[11px] text-[#6F6B64]">T+0 Escrow Clearing</div>
            <div className="font-bold text-[#7e2c00]">Instant Bank RTGS</div>
          </div>
        </div>
      </div>

      {/* 3. Core 6 Network KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
        {/* KPI 1 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs hover:border-[#983c0c]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Today's Network GMV</span>
            <span className="text-emerald-700 font-bold bg-[#c9ead9] px-1.5 py-0.5 rounded text-[10px]">▲ 14.2%</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            ₹142.85 <span className="text-xs font-sans font-normal text-[#6F6B64]">Cr</span>
          </div>
          <div className="text-[11px] text-[#8a7269] mt-1 flex items-center gap-1">
            <span className="material-symbols-outlined text-xs text-emerald-700">trending_up</span>
            <span>+₹17.8 Cr vs yesterday</span>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs hover:border-[#983c0c]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Trade Volume</span>
            <span className="text-xs font-mono font-bold text-[#476558]">92.4% cleared</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            1,84,200 <span className="text-xs font-sans font-normal text-[#6F6B64]">MT</span>
          </div>
          <div className="w-full bg-[#EDE7DD] h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#476558] h-full rounded-full" style={{ width: '92.4%' }}></div>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs hover:border-[#983c0c]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Registered Farmers</span>
            <span className="text-emerald-700 font-bold text-[10px]">+412 today</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            24,580
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">
            Across 88 verified FPOs
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs hover:border-[#983c0c]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Mandi Merchants</span>
            <span className="text-[10px] font-bold text-[#983c0c] bg-[#FFF5F2] px-1.5 py-0.5 rounded">840 Active</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            4,820
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">
            310 Interstate Buyers Live
          </div>
        </div>

        {/* KPI 5 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs hover:border-[#983c0c]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Produce Listings</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-[#E5EBE7] px-1.5 py-0.5 rounded">84.6% GI</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            1,248 <span className="text-xs font-sans font-normal text-[#6F6B64]">Lots</span>
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">
            Brix assayed & weighed
          </div>
        </div>

        {/* KPI 6 */}
        <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs hover:border-[#983c0c]/40 transition-all">
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Buy Demands</span>
            <span className="text-[10px] font-bold text-[#884800] bg-[#FDF4EA] px-1.5 py-0.5 rounded">High Demand</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-[#1a1c1e] mt-1.5">
            3,120 <span className="text-xs font-sans font-normal text-[#6F6B64]">RFQs</span>
          </div>
          <div className="text-[11px] text-[#6F6B64] mt-1">
            Mangoes, Lime & Tomatoes
          </div>
        </div>
      </div>

      {/* 4. South Indian Agro-Corridor Command Map & AI Opportunity Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Interactive Corridor Map Card (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  South Indian Agro-Corridor Command Map
                </h3>
                <p className="text-xs text-[#6F6B64]">
                  Live Inter-State Produce Logistics & Price Discrepancy Heatmap
                </p>
              </div>

              {/* Layer Toggles */}
              <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E6DED4] text-xs">
                <button
                  onClick={() => setActiveMapLayer('supply')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeMapLayer === 'supply' ? 'bg-[#983c0c] text-white shadow-xs' : 'text-[#56423b]'
                  }`}
                >
                  Supply Density
                </button>
                <button
                  onClick={() => setActiveMapLayer('demand')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeMapLayer === 'demand' ? 'bg-[#476558] text-white shadow-xs' : 'text-[#56423b]'
                  }`}
                >
                  Merchant Demand
                </button>
                <button
                  onClick={() => setActiveMapLayer('bottlenecks')}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                    activeMapLayer === 'bottlenecks' ? 'bg-[#884800] text-white shadow-xs' : 'text-[#56423b]'
                  }`}
                >
                  Bottlenecks
                </button>
              </div>
            </div>

            {/* Map Canvas with Interactive Nodes */}
            <div className="relative mt-4 h-72 sm:h-80 w-full rounded-2xl bg-stone-900 overflow-hidden border border-[#E6DED4]">
              {/* Hotlinked Map Background */}
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="South India Agro Topography"
                className="w-full h-full object-cover opacity-35 mix-blend-luminosity filter contrast-125"
              />

              {/* Inter-corridor SVG Pulse Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#ffb598]/40 stroke-2 stroke-dasharray-4">
                <line x1="62%" y1="48%" x2="49%" y2="64%" />
                <line x1="62%" y1="48%" x2="46%" y2="28%" />
                <line x1="49%" y1="64%" x2="28%" y2="52%" />
                <line x1="49%" y1="64%" x2="68%" y2="78%" />
                <line x1="28%" y1="52%" x2="22%" y2="86%" />
              </svg>

              {/* Highway Markers */}
              <div className="absolute top-4 left-4 text-[10px] font-mono text-stone-300 bg-black/60 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-white/10 space-y-0.5">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>NH-42 & NH-44 CORRIDOR RADAR</span>
                </div>
                <div>APMC Checkposts Active • Digital Toll E-Waybill Validated</div>
              </div>

              {/* Cluster Nodes Pins */}
              {CLUSTER_NODES.map((node) => {
                const isSelected = selectedCluster.id === node.id;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedCluster(node)}
                    style={{ left: `${node.xPercent}%`, top: `${node.yPercent}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all z-20`}
                  >
                    <div className="relative flex items-center justify-center">
                      <span className={`absolute w-8 h-8 rounded-full ${
                        node.status === 'deficit' ? 'bg-rose-500/30' : node.status === 'surplus' ? 'bg-emerald-500/30' : 'bg-amber-500/30'
                      } ${isSelected ? 'scale-125 animate-pulse' : 'scale-90 group-hover:scale-110'}`}></span>
                      
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shadow-md border-2 ${
                        isSelected ? 'border-white bg-[#983c0c] scale-110' : 'border-stone-800 bg-[#1A3026]'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">{node.icon}</span>
                      </div>

                      {/* Tooltip Label */}
                      <div className={`absolute top-7 whitespace-nowrap px-2 py-0.5 rounded-md text-[10px] font-bold shadow-lg backdrop-blur-md transition-all ${
                        isSelected 
                          ? 'bg-[#983c0c] text-white ring-1 ring-white/50' 
                          : 'bg-black/75 text-stone-200 group-hover:bg-black'
                      }`}>
                        {node.name.split(' ')[0]} ({node.price})
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Cluster Bottom Telemetry Bar */}
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-sm text-[#1a1c1e]">{selectedCluster.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider bg-white border border-[#E6DED4] text-[#8a7269]">
                  {selectedCluster.state}
                </span>
              </div>
              <div className="text-xs text-[#56423b] mt-1 flex flex-wrap items-center gap-3">
                <span>Crop: <strong>{selectedCluster.crop}</strong></span>
                <span>•</span>
                <span>Supply: <strong>{selectedCluster.supply}</strong></span>
                <span>•</span>
                <span className={selectedCluster.status === 'deficit' ? 'text-rose-700 font-bold' : 'text-emerald-800 font-bold'}>
                  {selectedCluster.netGap}
                </span>
                <span>•</span>
                <span>Indicative: <strong>{selectedCluster.price}</strong></span>
              </div>
            </div>

            <button
              onClick={() => onNavigate('network-and-zones')}
              className="px-3.5 py-1.5 rounded-xl bg-[#1a1c1e] hover:bg-black text-white text-xs font-semibold shrink-0 flex items-center gap-1.5 transition-colors"
            >
              <span>Inspect Belt (AP-04)</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* AI Opportunity Engine Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#1A3026] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">neurology</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1a1c1e]">
                    AI Opportunity Engine
                  </h3>
                  <p className="text-[11px] text-[#6F6B64]">Predictive Arbitrage & Deficit Radar</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1A3026] text-white">
                PRO ACTIVE
              </span>
            </div>

            {/* 3 Alert Cards */}
            <div className="mt-4 space-y-3">
              {/* Alert 1 */}
              <div className="p-3.5 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#7e2c00]">
                    <span className="material-symbols-outlined text-base text-[#983c0c]">warning</span>
                    <span>Critical Supply Deficit: Balaji Acid Lemon</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#983c0c] bg-white px-1.5 py-0.5 rounded">
                    -4,600 MT
                  </span>
                </div>
                <p className="text-[11px] text-[#56423b] leading-relaxed">
                  Bengaluru wholesale demand surged +28%. Anantapur belt harvest arrival delayed by 36 hrs due to unseasonal rain. Spot rates jumped from ₹62 to ₹74.50.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-semibold text-emerald-800">
                    Est. Margin Spike: +₹12.50/kg
                  </span>
                  <button
                    onClick={() => {
                      onShowToast('Routing 150 MT Balaji Lemon from Kadiri Hub to Bangalore KR Market...');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#983c0c] hover:bg-[#7e2c00] text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <span>Route 150 MT Anantapur</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>

              {/* Alert 2 */}
              <div className="p-3.5 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1A3026]">
                    <span className="material-symbols-outlined text-base text-emerald-700">trending_up</span>
                    <span>Harvest Surge Warning: Banganapalli Mango</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#1A3026] bg-white px-1.5 py-0.5 rounded">
                    +18,200 MT
                  </span>
                </div>
                <p className="text-[11px] text-[#304d40] leading-relaxed">
                  Madanapalle West belt entering peak flush. 88 FPOs ready for harvest. Recommending immediate pre-booking contracts with Mumbai & Delhi reefer corridors.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-semibold text-[#1A3026]">
                    Brix Assay: 17.2° Grade A
                  </span>
                  <button
                    onClick={() => {
                      onShowToast('Broadcasting Banganapalli lots to 310 registered export buyers.');
                      onNavigate('procurement-orders-and-weighment');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#1A3026] hover:bg-[#022016] text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                  >
                    <span>Broadcast Exporters</span>
                    <span className="material-symbols-outlined text-xs">campaign</span>
                  </button>
                </div>
              </div>

              {/* Alert 3 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#1a1c1e]">
                    <span className="material-symbols-outlined text-base text-amber-700">traffic</span>
                    <span>Weighbridge Congestion: Kolar Interstate Checkpost</span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-white px-1.5 py-0.5 rounded">
                    42m Delay
                  </span>
                </div>
                <p className="text-[11px] text-[#56423b] leading-relaxed">
                  Electronic weighbridge Scale-03 recalibration pending. 18 tomato reefers queued. Rerouting via Chintamani SH-82 will save 1.4 hours transit time.
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-semibold text-amber-900">
                    SLA Risk: Moderate
                  </span>
                  <button
                    onClick={() => onShowToast('Diversion instructions pushed to 18 LCV driver smartphones via GPS.')}
                    className="px-2.5 py-1 rounded-lg bg-stone-800 hover:bg-black text-white text-[11px] font-semibold flex items-center gap-1"
                  >
                    <span>Reroute Chintamani</span>
                    <span className="material-symbols-outlined text-xs">alt_route</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Digital Weighment & SLA Compliance Progress */}
          <div className="mt-4 pt-3 border-t border-[#E6DED4]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[#6F6B64]">Digital Weighment & SLA Compliance</span>
              <span className="font-mono font-bold text-[#1A3026]">94.6% On-Time</span>
            </div>
            <div className="w-full bg-[#EDE7DD] h-2 rounded-full overflow-hidden">
              <div className="bg-[#476558] h-full rounded-full" style={{ width: '94.6%' }}></div>
            </div>
          </div>
        </div>

      </div>

      {/* 5. Live Produce Supply & Demand Liquidity Matrix */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Live Produce Supply & Demand Liquidity Matrix
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Automated Equilibrium Engine across South Indian APMC Trading Desks
            </p>
          </div>

          {/* Search & Category Filter */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search produce, GI origin..."
                value={produceSearch}
                onChange={(e) => setProduceSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E6DED4] bg-[#FAF7F2] text-xs text-[#1a1c1e] placeholder-[#8a7269] focus:outline-none focus:border-[#983c0c] w-48 sm:w-56"
              />
              <span className="material-symbols-outlined text-base text-[#8a7269] absolute left-2.5 top-2">
                search
              </span>
            </div>

            {/* Category Pills */}
            <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E6DED4] text-xs">
              {['all', 'fruits', 'citrus', 'vegetables', 'spices'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg capitalize font-medium transition-all ${
                    categoryFilter === cat
                      ? 'bg-[#983c0c] text-white shadow-2xs'
                      : 'text-[#56423b] hover:text-[#1a1c1e]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6DED4] text-[#8a7269] uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3 px-3">Commodity & Origin</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Supply vs Demand (MT)</th>
                <th className="py-3 px-3">Net Gap</th>
                <th className="py-3 px-3">Indicative Spot Rate</th>
                <th className="py-3 px-3">Market Flow</th>
                <th className="py-3 px-3 text-right">Equilibrium Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DED4]/60">
              {filteredProduce.map((prod) => (
                <tr key={prod.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  {/* Name & Origin */}
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{prod.emoji}</span>
                      <div>
                        <div className="font-bold text-sm text-[#1a1c1e]">{prod.name}</div>
                        <div className="text-[11px] text-[#983c0c] font-medium">{prod.teluguName}</div>
                        <div className="text-[10px] text-[#6F6B64]">{prod.origin}</div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-3">
                    <span className="capitalize px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E6DED4] font-medium text-[#56423b] text-[11px]">
                      {prod.category}
                    </span>
                  </td>

                  {/* Supply vs Demand */}
                  <td className="py-3.5 px-3">
                    <div className="w-44 space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-[#6F6B64]">{prod.supplyTons.toLocaleString()} MT</span>
                        <span className="font-bold text-[#1a1c1e]">{prod.demandTons.toLocaleString()} MT</span>
                      </div>
                      <div className="w-full bg-[#EDE7DD] h-1.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            prod.netGapTons < 0 ? 'bg-[#983c0c]' : 'bg-[#476558]'
                          }`}
                          style={{ width: `${Math.min(100, prod.fillPercent)}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>

                  {/* Net Gap */}
                  <td className="py-3.5 px-3 font-mono font-bold">
                    <span className={prod.netGapTons < 0 ? 'text-[#983c0c]' : 'text-[#476558]'}>
                      {prod.netGapTons > 0 ? `+${prod.netGapTons.toLocaleString()} MT Surplus` : `${prod.netGapTons.toLocaleString()} MT Deficit`}
                    </span>
                  </td>

                  {/* Indicative Rate */}
                  <td className="py-3.5 px-3">
                    <div className="font-mono font-bold text-sm text-[#1a1c1e]">
                      ₹{prod.indicativePrice.toFixed(2)}/kg
                    </div>
                    {prod.trend === 'up' && (
                      <div className="text-[10px] font-semibold text-emerald-700">▲ +{prod.trendPercent}% (Demand Peak)</div>
                    )}
                    {prod.trend === 'down' && (
                      <div className="text-[10px] font-semibold text-rose-700">▼ -{prod.trendPercent}% (Arrival Spike)</div>
                    )}
                    {prod.trend === 'stable' && (
                      <div className="text-[10px] font-semibold text-stone-500">■ Stable Band</div>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3.5 px-3">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      prod.statusColor === 'primary'
                        ? 'bg-[#FFF5F2] text-[#983c0c] border border-[#ffdbce]'
                        : prod.statusColor === 'secondary'
                        ? 'bg-[#E5EBE7] text-[#1A3026] border border-[#adcebe]'
                        : 'bg-[#FDF4EA] text-[#884800] border border-[#ffdcc3]'
                    }`}>
                      {prod.marketStatus}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={() => {
                        onShowToast(`Equilibrium directive for ${prod.name} initiated: ${prod.actionLabel}`);
                        if (prod.id === 'prod-1') {
                          onNavigate('procurement-orders-and-weighment');
                        }
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#FAF7F2] border border-[#E6DED4] hover:border-[#983c0c] text-xs font-semibold text-[#1a1c1e] transition-colors shadow-2xs"
                    >
                      {prod.actionLabel}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Live High-Value Mandi Settlements & Procurement Contracts */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Live High-Value Mandi Settlements & Verified Consignments
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Automated Digital Weighbridge Certification & T+0 Escrow Bank Release
            </p>
          </div>
          <button
            onClick={() => onNavigate('procurement-orders-and-weighment')}
            className="flex items-center gap-1.5 text-xs font-bold text-[#983c0c] hover:underline"
          >
            <span>View All Active Contracts</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {SETTLEMENT_CONTRACTS.map((contract) => (
            <div
              key={contract.id}
              className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] hover:border-[#983c0c]/40 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-[#983c0c]">{contract.code}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    contract.statusType === 'escrow'
                      ? 'bg-[#FFF5F2] text-[#983c0c] border border-[#ffdbce]'
                      : contract.statusType === 'rtgs'
                      ? 'bg-[#c9ead9] text-[#022016] border border-[#adcebe]'
                      : 'bg-white text-[#56423b] border border-[#E6DED4]'
                  }`}>
                    {contract.statusBadge}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="font-bold text-sm text-[#1a1c1e]">{contract.produce}</div>
                  <div className="text-[11px] text-[#6F6B64] font-medium">{contract.grade}</div>
                </div>

                <div className="mt-2.5 text-xs space-y-1 text-[#56423b]">
                  <div className="flex justify-between">
                    <span className="text-[#8a7269]">Volume:</span>
                    <span className="font-mono font-semibold">{contract.volumeKg.toLocaleString()} Kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7269]">Farmer / FPO:</span>
                    <span className="truncate max-w-[140px] font-medium">{contract.farmer.split('(')[0]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a7269]">Buyer:</span>
                    <span className="truncate max-w-[140px] font-medium">{contract.merchant.split('(')[0]}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E6DED4] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#8a7269]">Settled Value</div>
                  <div className="font-mono font-bold text-sm text-[#1a1c1e]">
                    ₹{(contract.amount).toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() => onOpenConsignmentModal(contract.code)}
                  className="p-1.5 rounded-xl bg-white border border-[#E6DED4] hover:bg-[#F3EDE2] text-[#1a1c1e] text-xs font-semibold flex items-center gap-1 shadow-2xs"
                  title="Track Weighment Slip"
                >
                  <span className="material-symbols-outlined text-sm">visibility</span>
                  <span>Slip</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Bottom Command Center Metrics & Helpline */}
      <div className="p-4 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#1A3026] text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-xl">support_agent</span>
          </div>
          <div>
            <div className="font-bold text-[#1A3026]">
              24/7 APMC Interstate Field Helpline & Weighbridge Support
            </div>
            <div className="text-[11px] text-[#304d40]">
              Toll-free Hotline: <strong>1800-425-MANDI (62634)</strong> • Direct liaison for APMC Rayalaseema & Karnataka border
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-xl bg-white border border-[#adcebe] font-mono text-[#1A3026] text-[11px]">
            EOS-04 Radar Feed: ONLINE
          </div>
          <button
            onClick={() => onShowToast('Field Officer roster synchronizing with Rayalaseema border checkposts...')}
            className="px-3 py-1.5 rounded-xl bg-[#1A3026] hover:bg-[#022016] text-white font-semibold transition-colors shadow-2xs"
          >
            Duty Roster
          </button>
        </div>
      </div>

    </div>
  );
};
