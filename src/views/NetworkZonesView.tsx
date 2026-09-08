import React, { useState } from 'react';
import { FIELD_OFFICERS, MANDAL_DIRECTORY } from '../data/mockData';

interface NetworkZonesViewProps {
  onOpenCreateZoneModal: () => void;
  onShowToast: (msg: string) => void;
}

export const NetworkZonesView: React.FC<NetworkZonesViewProps> = ({
  onOpenCreateZoneModal,
  onShowToast,
}) => {
  const [selectedZoneCode, setSelectedZoneCode] = useState('AP-04');
  const [activeTelemetryLayer, setActiveTelemetryLayer] = useState<'packhouses' | 'weighbridges' | 'coldstorage' | 'lcvs'>('packhouses');
  const [mandalSearch, setMandalSearch] = useState('');

  const filteredMandals = MANDAL_DIRECTORY.filter((m) =>
    m.name.toLowerCase().includes(mandalSearch.toLowerCase()) ||
    m.teluguName.includes(mandalSearch) ||
    m.leadProduce.toLowerCase().includes(mandalSearch.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Breadcrumb & Zone Selector Header */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <div>
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#8a7269] mb-1 font-medium">
            <span>National Grid</span>
            <span>/</span>
            <span>South India Peninsula</span>
            <span>/</span>
            <span>AP-KA Interstate Corridor</span>
            <span>/</span>
            <span className="text-[#983c0c] font-bold">Madanapalle Mango &amp; Tomato Cluster</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1a1c1e]">
              Zone Management: Madanapalle Agro-Corridor (Zone AP-04)
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#c9ead9] text-[#022016] border border-[#adcebe] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>APMC SYNC ACTIVE • 128 MANDIS ONLINE</span>
            </span>
          </div>
        </div>

        {/* Header Action Triggers & Zone Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedZoneCode}
            onChange={(e) => {
              setSelectedZoneCode(e.target.value);
              onShowToast(`Switching corridor context to Zone ${e.target.value}...`);
            }}
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] focus:border-[#983c0c] outline-none shadow-2xs"
          >
            <option value="AP-04">Zone AP-04 (Madanapalle)</option>
            <option value="KA-03">Zone KA-03 (Kolar Highway)</option>
            <option value="AP-02">Zone AP-02 (Anantapur Lemon)</option>
            <option value="KA-05">Zone KA-05 (Tumakuru)</option>
            <option value="TN-01">Zone TN-01 (Krishnagiri)</option>
            <option value="KL-02">Zone KL-02 (Wayanad Spices)</option>
          </select>

          <button
            onClick={() => onShowToast('Freight rebalancing algorithm initiated across NH-42 corridor.')}
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] hover:bg-[#FAF7F2] transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm text-[#6F6B64]">swap_calls</span>
            <span>Rebalance Freight</span>
          </button>

          <button
            onClick={() => onShowToast('Corridor AP-04 Dossier exported as signed PDF.')}
            className="px-3 py-2 rounded-xl bg-white border border-[#E6DED4] text-xs font-semibold text-[#1a1c1e] hover:bg-[#FAF7F2] transition-colors shadow-2xs flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm text-[#6F6B64]">picture_as_pdf</span>
            <span>Export Dossier</span>
          </button>

          <button
            onClick={onOpenCreateZoneModal}
            className="px-3.5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">add_location_alt</span>
            <span>+ Create Agro-Zone</span>
          </button>
        </div>
      </div>

      {/* 2. 4 Zone KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E6DED4] shadow-2xs relative overflow-hidden space-y-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#983c0c]"></div>
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Farmer Density</span>
            <span className="text-emerald-700 font-bold bg-[#c9ead9] px-2 py-0.5 rounded text-[10px]">+340 harvest</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1a1c1e]">
            4,250
          </div>
          <div className="text-xs text-[#56423b] flex items-center justify-between pt-1">
            <span>88 Registered FPOs</span>
            <span className="text-emerald-800 font-semibold">96.4% KYC</span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E6DED4] shadow-2xs relative overflow-hidden space-y-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#476558]"></div>
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Harvest Volume</span>
            <span className="font-mono text-xs text-[#476558] font-bold">91.8% Sorted</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1a1c1e]">
            18,500 <span className="text-sm font-sans font-normal text-[#6F6B64]">MT</span>
          </div>
          <div className="text-xs text-[#56423b] flex items-center justify-between pt-1">
            <span>Mangoes: 12,200 MT</span>
            <span>Tomatoes: 6,300 MT</span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E6DED4] shadow-2xs relative overflow-hidden space-y-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#E28743]"></div>
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>Active Merchants</span>
            <span className="text-[10px] font-bold text-[#884800] bg-[#FDF4EA] px-2 py-0.5 rounded">High Velocity</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1a1c1e]">
            580
          </div>
          <div className="text-xs text-[#56423b] flex items-center justify-between pt-1">
            <span>310 Interstate Buyers</span>
            <span className="text-stone-700 font-medium">Avg 2.8 hrs deal</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="p-5 rounded-3xl bg-white border border-[#E6DED4] shadow-2xs relative overflow-hidden space-y-2">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#1A3026]"></div>
          <div className="flex items-center justify-between text-xs text-[#6F6B64]">
            <span>30-Day Settlement</span>
            <span className="text-emerald-700 font-bold text-[10px]">T+0 Escrow</span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-[#1a1c1e]">
            ₹28.45 <span className="text-sm font-sans font-normal text-[#6F6B64]">Cr</span>
          </div>
          <div className="text-xs text-[#56423b] flex items-center justify-between pt-1">
            <span>APMC Cess: ₹28.45 Lakhs</span>
            <span className="text-emerald-800 font-bold">100% RTGS</span>
          </div>
        </div>
      </div>

      {/* 3. Agro-Corridor Geospatial Telemetry & Corridor Bottlenecks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Geospatial Map Canvas (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  Agro-Corridor Geospatial Telemetry
                </h3>
                <p className="text-xs text-[#6F6B64]">
                  Madanapalle Yard 01 • Kolar Checkpost • Punganur CA Cold Storage Corridor
                </p>
              </div>

              {/* Layer toggles */}
              <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E6DED4] text-xs">
                {[
                  { id: 'packhouses', label: 'Packhouses (42)' },
                  { id: 'weighbridges', label: 'Weighbridges (14)' },
                  { id: 'coldstorage', label: 'CA Cold (8)' },
                  { id: 'lcvs', label: 'LCVs (168)' },
                ].map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setActiveTelemetryLayer(l.id as any)}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                      activeTelemetryLayer === l.id
                        ? 'bg-[#983c0c] text-white shadow-xs'
                        : 'text-[#56423b] hover:text-[#1a1c1e]'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Satellite Map Box */}
            <div className="relative mt-4 h-72 sm:h-80 w-full rounded-2xl bg-stone-900 overflow-hidden border border-[#E6DED4]">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                alt="Agro Topography"
                className="w-full h-full object-cover opacity-40 mix-blend-luminosity filter contrast-125"
              />

              {/* Highway Markers & Pins */}
              <div className="absolute top-4 left-4 text-[11px] font-mono text-stone-200 bg-black/70 backdrop-blur-md px-3 py-2 rounded-xl border border-white/10 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>NH-42 HORTICULTURE FREIGHT AXIS</span>
                </div>
                <div className="text-[10px] text-stone-300">Live Traffic Flow: 380 MT/hr • 14 Weighbridges Automated</div>
              </div>

              {/* Pin 1: Madanapalle APMC Yard 1 */}
              <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-8 h-8 rounded-full bg-emerald-500/30 animate-pulse"></span>
                  <div className="w-6 h-6 rounded-full bg-emerald-700 border-2 border-white flex items-center justify-center text-white text-xs shadow-md">
                    <span className="material-symbols-outlined text-[13px]">warehouse</span>
                  </div>
                  <div className="absolute top-7 whitespace-nowrap bg-black/85 text-white px-2 py-0.5 rounded text-[10px] font-bold">
                    Madanapalle Yard 01 (380 MT/d)
                  </div>
                </div>
              </div>

              {/* Pin 2: Kolar Checkpost Scale-03 (Bottleneck) */}
              <div className="absolute top-2/3 left-2/3 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <span className="absolute w-9 h-9 rounded-full bg-rose-500/40 animate-ping"></span>
                  <div className="w-6 h-6 rounded-full bg-rose-700 border-2 border-white flex items-center justify-center text-white text-xs shadow-md">
                    <span className="material-symbols-outlined text-[13px]">traffic</span>
                  </div>
                  <div className="absolute top-7 whitespace-nowrap bg-rose-950 text-rose-200 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-700">
                    Kolar Checkpost (42m Delay)
                  </div>
                </div>
              </div>

              {/* Pin 3: Punganur Cold Storage Hub */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-[#1A3026] border-2 border-white flex items-center justify-center text-white text-xs shadow-md">
                    <span className="material-symbols-outlined text-[13px]">ac_unit</span>
                  </div>
                  <div className="absolute top-7 whitespace-nowrap bg-black/85 text-stone-200 px-2 py-0.5 rounded text-[10px] font-bold">
                    Punganur CA Hub (12.4°C)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Highway Legend Banner */}
          <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-4 text-[#56423b]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Operational Highway</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Congested Route NH-42</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                <span>Diversion Advised</span>
              </span>
            </div>
            <div className="font-mono text-[11px] text-[#1A3026] font-semibold">
              EOS-04 Radar Feed Active
            </div>
          </div>
        </div>

        {/* Corridor Bottlenecks & Realtime Diversions (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FFF5F2] text-[#983c0c] flex items-center justify-center">
                  <span className="material-symbols-outlined text-lg">traffic</span>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-[#1a1c1e]">
                    Corridor Bottlenecks &amp; Queues
                  </h3>
                  <p className="text-[11px] text-[#6F6B64]">Interstate APMC Checkpost Telemetry</p>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF5F2] text-[#983c0c]">
                2 Critical
              </span>
            </div>

            {/* 3 Bottlenecks list */}
            <div className="mt-4 space-y-3">
              {/* Item 1 */}
              <div className="p-3.5 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-xs text-[#7e2c00]">
                    Kolar Checkpost Scale-03 Delay
                  </div>
                  <span className="text-[10px] font-mono font-bold text-rose-800 bg-white px-1.5 py-0.5 rounded">
                    42 mins queue
                  </span>
                </div>
                <p className="text-[11px] text-[#56423b] leading-relaxed">
                  Interstate tomato haulers waiting at Karnataka border. Tare calibration delay on weighbridge scale 03.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onShowToast('Mobile weighbridge scale 04 deployed to Kolar checkpost.')}
                    className="px-2.5 py-1 rounded-lg bg-[#983c0c] hover:bg-[#7e2c00] text-white text-[11px] font-semibold"
                  >
                    Deploy Mobile Scale 04
                  </button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-3.5 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-xs text-[#1A3026]">
                    Madanapalle Yard Gate 2 Rapid Flow
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-white px-1.5 py-0.5 rounded">
                    140 MT/hr
                  </span>
                </div>
                <p className="text-[11px] text-[#304d40] leading-relaxed">
                  Automated RFID barrier functioning with zero manual inspection. LCV throughput up +18% this morning.
                </p>
              </div>

              {/* Item 3 */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-bold text-xs text-[#1a1c1e]">
                    Interstate Route Diversion (SH-82)
                  </div>
                  <span className="text-[10px] font-mono font-bold text-amber-800 bg-white px-1.5 py-0.5 rounded">
                    Bypass Active
                  </span>
                </div>
                <p className="text-[11px] text-[#56423b] leading-relaxed">
                  Nimmanapalle to Chittoor bypass clear for heavy reefers. Saves 32 km detour during peak harvest.
                </p>
                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => onShowToast('Route diversion advisory broadcasted to 168 truck drivers.')}
                    className="px-2.5 py-1 rounded-lg bg-[#1A3026] hover:bg-[#022016] text-white text-[11px] font-semibold"
                  >
                    Broadcast to 168 Drivers
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 4. Section 7: Supply vs Demand Deficit & Surplus Balance Radar */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Supply vs Demand Deficit &amp; Surplus Balance Radar
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Real-time Mandi arrival deficit triggers for agricultural price stabilization
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Produce 1: Banganapalli Mango */}
          <div className="p-4 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-base text-[#983c0c]">Banganapalli Mango</span>
              <span className="text-xs font-mono font-bold text-rose-800 bg-white px-2 py-0.5 rounded">
                -3,600 MT Deficit
              </span>
            </div>
            <div className="text-xs text-[#56423b] space-y-1">
              <div className="flex justify-between">
                <span>Indicative Mandi Spot:</span>
                <span className="font-bold font-mono text-[#1a1c1e]">₹62.00 / kg</span>
              </div>
              <div className="flex justify-between">
                <span>Daily Arrival Gap:</span>
                <span className="text-[#983c0c] font-semibold">28% under merchant demand</span>
              </div>
            </div>
            <button
              onClick={() => onShowToast('Interstate freight subsidy directive triggered for Banganapalli mangoes.')}
              className="w-full py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              Trigger Rail/Truck Subsidy
            </button>
          </div>

          {/* Produce 2: Hybrid Tomato */}
          <div className="p-4 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-base text-[#1A3026]">Hybrid Tomato</span>
              <span className="text-xs font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded">
                +2,200 MT Surplus
              </span>
            </div>
            <div className="text-xs text-[#304d40] space-y-1">
              <div className="flex justify-between">
                <span>Indicative Mandi Spot:</span>
                <span className="font-bold font-mono text-[#1a1c1e]">₹28.00 / kg</span>
              </div>
              <div className="flex justify-between">
                <span>Surplus Status:</span>
                <span className="text-emerald-800 font-semibold">High inbound flow from Mulbagal</span>
              </div>
            </div>
            <button
              onClick={() => onShowToast('Surplus tomato batches broadcasted to 14 tomato puree processors.')}
              className="w-full py-2 rounded-xl bg-[#1A3026] hover:bg-[#022016] text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              Broadcast to Processors
            </button>
          </div>

          {/* Produce 3: Balaji Acid Lemon */}
          <div className="p-4 rounded-2xl bg-[#FDF4EA] border border-[#ffdcc3] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-base text-[#884800]">Balaji Acid Lemon</span>
              <span className="text-xs font-mono font-bold text-amber-900 bg-white px-2 py-0.5 rounded">
                -600 MT Shortage
              </span>
            </div>
            <div className="text-xs text-[#7e2c00] space-y-1">
              <div className="flex justify-between">
                <span>Indicative Mandi Spot:</span>
                <span className="font-bold font-mono text-[#1a1c1e]">₹52.00 / kg</span>
              </div>
              <div className="flex justify-between">
                <span>Shortage Status:</span>
                <span className="text-amber-900 font-semibold">Bengaluru buyers bidding peak rate</span>
              </div>
            </div>
            <button
              onClick={() => onShowToast('Route order sent to Anantapur Lemon Hub for 150 MT delivery.')}
              className="w-full py-2 rounded-xl bg-[#884800] hover:bg-[#6e3900] text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              Route from Anantapur
            </button>
          </div>
        </div>
      </div>

      {/* 5. Section 8: Taluk & Mandal Level Catchment Directory */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              Taluk &amp; Mandal Level Catchment Directory
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Granular supply aggregation points feeding Madanapalle Central APMC Yard
            </p>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search Mandal, FPO..."
              value={mandalSearch}
              onChange={(e) => setMandalSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E6DED4] bg-[#FAF7F2] text-xs text-[#1a1c1e] placeholder-[#8a7269] focus:outline-none focus:border-[#983c0c] w-48 sm:w-56"
            />
            <span className="material-symbols-outlined text-base text-[#8a7269] absolute left-2.5 top-2">
              search
            </span>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6DED4] text-[#8a7269] uppercase font-bold text-[11px] tracking-wider">
                <th className="py-3 px-3">Mandal &amp; Hub</th>
                <th className="py-3 px-3">Lead Produce Specialization</th>
                <th className="py-3 px-3">Farmers &amp; FPOs</th>
                <th className="py-3 px-3">Harvest-Ready Volume</th>
                <th className="py-3 px-3">Active Buyers</th>
                <th className="py-3 px-3">Inspection Pass</th>
                <th className="py-3 px-3 text-right">Mandal Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DED4]/60">
              {filteredMandals.map((mandal) => (
                <tr key={mandal.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                  <td className="py-3 px-3">
                    <div className="font-bold text-sm text-[#1a1c1e]">{mandal.name}</div>
                    <div className="text-[11px] text-[#983c0c] font-medium">{mandal.teluguName}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-medium text-[#1a1c1e]">{mandal.leadProduce}</div>
                  </td>

                  <td className="py-3 px-3">
                    <div className="font-bold text-[#1a1c1e]">{mandal.registeredFarmers.toLocaleString()}</div>
                    <div className="text-[10px] text-[#6F6B64]">{mandal.leadFpo}</div>
                  </td>

                  <td className="py-3 px-3 font-mono font-bold text-[#1a1c1e]">
                    {mandal.harvestReadyTons.toLocaleString()} MT
                  </td>

                  <td className="py-3 px-3 font-semibold text-[#476558]">
                    {mandal.activeBuyers} Desks
                  </td>

                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-emerald-800">{mandal.inspectionPassPercent}%</span>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                      mandal.status === 'Active'
                        ? 'bg-[#c9ead9] text-[#022016]'
                        : 'bg-[#FDF4EA] text-[#884800]'
                    }`}>
                      {mandal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. Section 9: APMC Field Command & Zone Officers Roster */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
          <div>
            <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
              APMC Field Command &amp; Zone Officers Roster
            </h3>
            <p className="text-xs text-[#6F6B64]">
              Deputed weighbridge inspectors, transit liaisons, and cold chain quality directors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {FIELD_OFFICERS.map((officer) => (
            <div
              key={officer.id}
              className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] flex flex-col justify-between space-y-3"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A3026] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {officer.initials}
                </div>
                <div className="text-xs">
                  <div className="font-bold text-sm text-[#1a1c1e]">{officer.name}</div>
                  <div className="text-[11px] text-[#983c0c] font-semibold">{officer.role}</div>
                  <div className="text-[#6F6B64] mt-0.5">{officer.jurisdiction}</div>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-[#E6DED4] text-xs space-y-1">
                <div className="text-[#6F6B64] text-[11px]">Assigned Scale: <strong>{officer.assignedScalesOrTemp}</strong></div>
                <div className="text-[#1a1c1e] font-medium text-[11px]">Today: <strong>{officer.dailyMetric}</strong></div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  officer.statusColor === 'secondary'
                    ? 'bg-[#c9ead9] text-[#022016]'
                    : 'bg-[#FDF4EA] text-[#884800]'
                }`}>
                  {officer.statusText}
                </span>

                <button
                  onClick={() => onShowToast(`Dialing APMC radio terminal for ${officer.name}...`)}
                  className="px-3 py-1 rounded-lg bg-white border border-[#E6DED4] hover:bg-[#FAF7F2] text-xs font-semibold text-[#1a1c1e] shadow-2xs transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
