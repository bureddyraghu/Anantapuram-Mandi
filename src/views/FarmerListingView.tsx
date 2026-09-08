import React, { useState } from 'react';

interface FarmerListingViewProps {
  onBackToOS: () => void;
  onShowToast: (msg: string) => void;
}

export const FarmerListingView: React.FC<FarmerListingViewProps> = ({
  onBackToOS,
  onShowToast,
}) => {
  const [selectedCrop, setSelectedCrop] = useState({
    id: 'crop-1',
    name: 'బంగినపల్లి మామిడి',
    englishName: 'Banganapalli Mango',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    giTag: 'GI Tagged • Madanapalle, AP',
    benchmarkMin: 48,
    benchmarkAvg: 58,
    benchmarkPeak: 66,
  });

  const [quantity, setQuantity] = useState(45);
  const [unit, setUnit] = useState<'Q' | 'Kg' | 'MT' | 'Box'>('Q');
  const [selectedGrade, setSelectedGrade] = useState<'A' | 'B' | 'C'>('A');
  const [expectedPrice, setExpectedPrice] = useState(62);
  const [isNegotiable, setIsNegotiable] = useState(true);
  const [isListeningVoice, setIsListeningVoice] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('“నా దగ్గర 45 క్వింటాళ్ల బంగినపల్లి ఉంది”');
  const [isPublished, setIsPublished] = useState(false);

  // Conversion calculations
  const totalKg = unit === 'Q' ? quantity * 100 : unit === 'MT' ? quantity * 1000 : unit === 'Box' ? quantity * 15 : quantity;
  const totalRevenue = totalKg * expectedPrice;

  const handleVoiceTap = () => {
    setIsListeningVoice(true);
    setTimeout(() => {
      setIsListeningVoice(false);
      setVoiceTranscript('“45 క్వింటాళ్లు గ్రేడ్-A గుర్తించబడింది (45Q Grade-A identified)”');
      onShowToast('వాయిస్ రికగ్నిషన్ పూర్తయింది! వివరాలు ఆటోఫిల్ చేయబడ్డాయి.');
    }, 1800);
  };

  const handlePublish = () => {
    setIsPublished(true);
    onShowToast('ధన్యవాదాలు! మీ పంట అనంతపురం మండీలో విజయవంతంగా లిస్ట్ చేయబడింది.');
  };

  return (
    <div className="max-w-2xl mx-auto pb-24 px-3 sm:px-4 pt-2">
      {/* 1. Mobile App Top Bar */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-4 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToOS}
            className="w-9 h-9 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] flex items-center justify-center text-[#56423b] hover:bg-[#EDE7DD] transition-colors"
            title="Back to Mandi Command OS"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <div>
            <h2 className="font-serif font-bold text-base text-[#1a1c1e] leading-tight">
              Create Lot Listing
            </h2>
            <p className="text-[11px] text-[#983c0c] font-semibold">
              అనంతపురం వ్యవసాయ మార్కెట్
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-[#E5EBE7] text-[#1A3026] text-[11px] font-bold">
            తెలుగు / EN
          </span>
          <div className="w-8 h-8 rounded-full bg-[#983c0c] text-white flex items-center justify-center font-bold text-xs">
            RG
          </div>
        </div>
      </div>

      {/* 2. Farmer Welcome & KYC Strip */}
      <div className="mt-3 p-3.5 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce] flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-xl text-[#983c0c]">agriculture</span>
          <div>
            <div className="font-bold text-[#7e2c00]">
              నమస్కారం, రమేష్ గారు (Ramesh Garu)
            </div>
            <div className="text-[11px] text-[#8a7269]">
              ID: <strong>AP-FMR-9842</strong> • ధృవీకరించబడిన రైతు (Verified)
            </div>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-[#c9ead9] text-[#022016] text-[10px] font-bold">
          KYC 100%
        </span>
      </div>

      {/* 3. Voice-Assisted Listing Micro-Widget */}
      <div className="mt-3 p-4 rounded-3xl bg-[#1A3026] text-white shadow-md flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#adcebe] uppercase tracking-wider">
              Voice-Assisted AI Listing
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <div className="text-sm font-semibold text-white">
            {voiceTranscript}
          </div>
          <div className="text-[11px] text-[#adcebe]/80">
            Speak Telugu, Kannada or English to auto-fill specs
          </div>
        </div>

        <button
          onClick={handleVoiceTap}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all shadow-lg shrink-0 ${
            isListeningVoice 
              ? 'bg-rose-600 scale-110 animate-ping' 
              : 'bg-[#983c0c] hover:bg-[#b85324]'
          }`}
          title="Speak to Auto-Fill"
        >
          <span className="material-symbols-outlined text-2xl">mic</span>
        </button>
      </div>

      {/* 4. 3-Step Progress Indicator */}
      <div className="mt-4 px-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-[#1A3026] font-bold">
          <span className="w-5 h-5 rounded-full bg-[#c9ead9] text-[#022016] flex items-center justify-center text-[10px]">✓</span>
          <span>1. పంట</span>
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-[#476558]"></div>
        <div className="flex items-center gap-1.5 text-[#983c0c] font-bold">
          <span className="w-5 h-5 rounded-full bg-[#983c0c] text-white flex items-center justify-center text-[10px]">2</span>
          <span>2. పరిమాణం</span>
        </div>
        <div className="h-0.5 flex-1 mx-2 bg-[#E6DED4]"></div>
        <div className="flex items-center gap-1.5 text-[#8a7269] font-medium">
          <span className="w-5 h-5 rounded-full bg-[#EDE7DD] text-[#56423b] flex items-center justify-center text-[10px]">3</span>
          <span>3. ధర &amp; సేకరణ</span>
        </div>
      </div>

      {/* 5. Selected Crop Card & Alternate Taps */}
      <div className="mt-4 bg-white rounded-3xl border border-[#E6DED4] p-4 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8a7269]">
            ఎంచుకున్న పంట (Selected Crop)
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFF5F2] text-[#983c0c] border border-[#ffdbce]">
            {selectedCrop.giTag}
          </span>
        </div>

        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
          <img
            src={selectedCrop.image}
            alt={selectedCrop.englishName}
            className="w-16 h-16 rounded-xl object-cover shadow-2xs shrink-0"
          />
          <div>
            <div className="font-serif font-bold text-base text-[#1a1c1e]">
              {selectedCrop.name}
            </div>
            <div className="text-xs text-[#56423b] font-medium">
              {selectedCrop.englishName}
            </div>
            <div className="text-[11px] text-emerald-800 font-semibold mt-0.5">
              తాజా దిగుబడి • 100% సహజ పద్ధతి
            </div>
          </div>
        </div>

        {/* Quick alternate crop chips */}
        <div className="flex items-center gap-2 overflow-x-auto pt-1">
          <span className="text-[11px] text-[#8a7269] whitespace-nowrap">మార్చండి:</span>
          {[
            { id: 'c1', name: 'తోతాపురి మామిడి', en: 'Totapuri' },
            { id: 'c2', name: 'బాలాజీ నిమ్మ', en: 'Balaji Lemon' },
            { id: 'c3', name: 'హైబ్రిడ్ టమోటా', en: 'Tomato' },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => onShowToast(`పంట మార్చబడింది: ${c.name}`)}
              className="px-2.5 py-1 rounded-xl bg-white border border-[#E6DED4] text-xs text-[#56423b] hover:bg-[#FAF7F2] hover:border-[#983c0c] whitespace-nowrap transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Quantity Stepper & Unit Selector */}
      <div className="mt-4 bg-white rounded-3xl border border-[#E6DED4] p-4 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-[#8a7269]">
            పరిమాణం (Produce Quantity)
          </label>
          
          {/* Unit selector */}
          <div className="flex items-center bg-[#FAF7F2] p-1 rounded-xl border border-[#E6DED4] text-xs font-semibold">
            {(['Q', 'Kg', 'MT', 'Box'] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  unit === u ? 'bg-[#983c0c] text-white shadow-2xs' : 'text-[#56423b]'
                }`}
              >
                {u === 'Q' ? 'క్వింటాల్ (Q)' : u === 'Kg' ? 'కిలో (Kg)' : u === 'MT' ? 'టన్ను (MT)' : 'బాక్స్'}
              </button>
            ))}
          </div>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 5))}
            className="w-12 h-12 rounded-xl bg-white border border-[#E6DED4] flex items-center justify-center text-xl font-bold text-[#1a1c1e] hover:bg-[#EDE7DD] active:scale-95 transition-all shadow-2xs"
          >
            -
          </button>

          <div className="text-center">
            <div className="font-mono font-bold text-3xl text-[#1a1c1e]">
              {quantity}
              <span className="text-sm font-sans text-[#8a7269] ml-1">
                {unit === 'Q' ? 'క్వింటాళ్లు' : unit}
              </span>
            </div>
            <div className="text-[11px] text-[#476558] font-semibold mt-0.5">
              = {totalKg.toLocaleString()} కిలోలు ({((totalKg) / 1000).toFixed(1)} MT)
            </div>
          </div>

          <button
            onClick={() => setQuantity(quantity + 5)}
            className="w-12 h-12 rounded-xl bg-[#983c0c] text-white flex items-center justify-center text-xl font-bold hover:bg-[#7e2c00] active:scale-95 transition-all shadow-sm"
          >
            +
          </button>
        </div>

        {/* Fast Preset Taps */}
        <div className="grid grid-cols-4 gap-2">
          {[10, 25, 45, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => setQuantity(preset)}
              className={`py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                quantity === preset
                  ? 'bg-[#1A3026] text-white border-[#1A3026]'
                  : 'bg-white text-[#56423b] border-[#E6DED4] hover:bg-[#FAF7F2]'
              }`}
            >
              +{preset} {unit}
            </button>
          ))}
        </div>
      </div>

      {/* 7. Quality Grade Selection */}
      <div className="mt-4 bg-white rounded-3xl border border-[#E6DED4] p-4 shadow-2xs space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-[#8a7269]">
          నాణ్యత గ్రేడ్ (Quality Grade Selection)
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {/* Grade A */}
          <button
            onClick={() => setSelectedGrade('A')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedGrade === 'A'
                ? 'bg-[#F7ECE5] border-[#983c0c] ring-1 ring-[#983c0c]'
                : 'bg-[#FAF7F2] border-[#E6DED4] hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#983c0c]">గ్రేడ్ A (Export)</span>
              {selectedGrade === 'A' && <span className="material-symbols-outlined text-sm text-[#983c0c]">check_circle</span>}
            </div>
            <div className="text-[11px] text-[#56423b] mt-1">Brix &gt; 16.5° • మచ్చల్లేనివి • ప్రీమియం సైజు</div>
          </button>

          {/* Grade B */}
          <button
            onClick={() => setSelectedGrade('B')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedGrade === 'B'
                ? 'bg-[#F7ECE5] border-[#983c0c] ring-1 ring-[#983c0c]'
                : 'bg-[#FAF7F2] border-[#E6DED4] hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1a1c1e]">గ్రేడ్ B (Mandi)</span>
              {selectedGrade === 'B' && <span className="material-symbols-outlined text-sm text-[#983c0c]">check_circle</span>}
            </div>
            <div className="text-[11px] text-[#56423b] mt-1">స్థానిక హోల్‌సేల్ మార్కెట్ • మంచి సైజు</div>
          </button>

          {/* Grade C */}
          <button
            onClick={() => setSelectedGrade('C')}
            className={`p-3 rounded-2xl border text-left transition-all ${
              selectedGrade === 'C'
                ? 'bg-[#F7ECE5] border-[#983c0c] ring-1 ring-[#983c0c]'
                : 'bg-[#FAF7F2] border-[#E6DED4] hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-[#1a1c1e]">గ్రేడ్ C (Pulp)</span>
              {selectedGrade === 'C' && <span className="material-symbols-outlined text-sm text-[#983c0c]">check_circle</span>}
            </div>
            <div className="text-[11px] text-[#56423b] mt-1">పల్ప్ &amp; జ్యూస్ ప్రాసెసింగ్ యూనిట్లకు</div>
          </button>
        </div>

        <div className="text-[11px] text-[#476558] flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">event_available</span>
          <span>కోత సమయం: <strong>నేడు తెంపినది (Today, 16 Sep 2026)</strong> • తాజా పంట</span>
        </div>
      </div>

      {/* 8. Mandi Benchmark Rates & Expected Price Input */}
      <div className="mt-4 bg-white rounded-3xl border border-[#E6DED4] p-4 shadow-2xs space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[#8a7269]">
              మార్కెట్ ధరలు (Mandi Benchmark Ticker)
            </label>
            <span className="text-[10px] text-[#983c0c] font-bold">ఈ రోజు రేట్లు</span>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2 text-center">
            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4]">
              <div className="text-[10px] text-[#8a7269]">కనిష్టం (Min)</div>
              <div className="font-mono font-bold text-xs text-[#56423b]">₹{selectedCrop.benchmarkMin}/kg</div>
            </div>
            <div className="p-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4]">
              <div className="text-[10px] text-[#8a7269]">సగటు (Avg)</div>
              <div className="font-mono font-bold text-xs text-[#1a1c1e]">₹{selectedCrop.benchmarkAvg}/kg</div>
            </div>
            <div className="p-2 rounded-xl bg-[#FFF5F2] border border-[#ffdbce]">
              <div className="text-[10px] text-[#983c0c]">గరిష్టం (Peak)</div>
              <div className="font-mono font-bold text-xs text-[#983c0c]">₹{selectedCrop.benchmarkPeak}/kg</div>
            </div>
          </div>
        </div>

        {/* Farmer Expected Price */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-[#1a1c1e]">మీరు ఆశిస్తున్న ధర (Your Expected Price)</span>
            <label className="flex items-center gap-1.5 cursor-pointer text-[#56423b]">
              <input
                type="checkbox"
                checked={isNegotiable}
                onChange={(e) => setIsNegotiable(e.target.checked)}
                className="accent-[#983c0c] rounded"
              />
              <span className="text-[11px]">చర్చించదగినది (Negotiable)</span>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-2.5 font-bold text-sm text-[#8a7269]">₹</span>
              <input
                type="number"
                value={expectedPrice}
                onChange={(e) => setExpectedPrice(Number(e.target.value))}
                className="w-full pl-8 pr-12 py-2.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] font-mono font-bold text-lg text-[#1a1c1e] focus:border-[#983c0c] focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-xs text-[#8a7269]">/ కిలో</span>
            </div>
          </div>
        </div>

        {/* Live Estimated Revenue Widget */}
        <div className="p-3.5 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] flex items-center justify-between">
          <div>
            <div className="text-[11px] text-[#304d40] font-semibold">
              మొత్తం అంచనా ఆదాయం (Estimated Revenue)
            </div>
            <div className="text-xl font-bold font-mono text-[#1A3026]">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-[#476558]">
              {totalKg.toLocaleString()} కిలోలు x ₹{expectedPrice}/కిలో
            </div>
          </div>

          <div className="text-right">
            <span className="px-2 py-1 rounded-lg bg-white text-emerald-800 text-[10px] font-bold border border-[#adcebe]">
              0% కమీషన్ • 100% రైతుకే
            </span>
          </div>
        </div>
      </div>

      {/* 9. Farm Gate Pickup Location */}
      <div className="mt-4 bg-white rounded-3xl border border-[#E6DED4] p-4 shadow-2xs space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#8a7269]">
          తోట లొకేషన్ (Farm Gate Pickup)
        </label>
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
          <div className="w-10 h-10 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-xl">pin_drop</span>
          </div>
          <div className="flex-1 text-xs">
            <div className="font-bold text-[#1a1c1e]">
              రమేష్ మామిడి తోట (Ramesh Orchards)
            </div>
            <div className="text-[#6F6B64]">
              సర్వే నెం 42/B, మదనపల్లె రూరల్, చిత్తూరు-అనంతపురం కారిడార్
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-[#E6DED4] text-[#476558]">
            GPS Verified
          </span>
        </div>
      </div>

      {/* 10. Instant Live Buyer Matching Ribbon */}
      <div className="mt-4 p-4 rounded-3xl bg-[#FDF4EA] border border-[#ffdcc3] space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <div className="font-bold text-[#884800] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-base">bolt</span>
            <span>14 మంది వ్యాపారులు మీ పంట కోసం సిద్ధంగా ఉన్నారు</span>
          </div>
          <span className="text-[10px] font-bold text-[#983c0c]">Live</span>
        </div>

        <div className="space-y-2 text-xs">
          <div className="p-2.5 rounded-xl bg-white border border-[#ffdcc3] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1a1c1e]">Sri Balaji Fruit Traders (BLR)</div>
              <div className="text-[11px] text-[#6F6B64]">కోరుతున్న ధర: ₹62.00/kg • 24 MT ఆర్డర్</div>
            </div>
            <button
              onClick={() => onShowToast('కనెక్ట్ అభ్యర్థన Sri Balaji Traders కి పంపబడింది!')}
              className="px-3 py-1 rounded-lg bg-[#983c0c] text-white font-semibold text-xs shadow-2xs"
            >
              కనెక్ట్
            </button>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-[#ffdcc3] flex items-center justify-between">
            <div>
              <div className="font-bold text-[#1a1c1e]">Reliance Fresh Agro Hub</div>
              <div className="text-[11px] text-[#6F6B64]">కోరుతున్న ధర: ₹60.50/kg • 15 MT ఆర్డర్</div>
            </div>
            <button
              onClick={() => onShowToast('కనెక్ట్ అభ్యర్థన Reliance Fresh Hub కి పంపబడింది!')}
              className="px-3 py-1 rounded-lg bg-[#1A3026] text-white font-semibold text-xs shadow-2xs"
            >
              కనెక్ట్
            </button>
          </div>
        </div>
      </div>

      {/* 11. Mandi Trust Strip */}
      <div className="mt-4 p-3 rounded-2xl bg-white border border-[#E6DED4] text-center text-[11px] text-[#56423b] flex flex-wrap items-center justify-around gap-2">
        <span className="flex items-center gap-1 font-semibold text-emerald-800">
          <span className="material-symbols-outlined text-sm">lock</span>
          <span>100% Escrow రక్షణ</span>
        </span>
        <span className="text-[#E6DED4]">•</span>
        <span className="flex items-center gap-1 font-semibold text-[#1a1c1e]">
          <span className="material-symbols-outlined text-sm">scale</span>
          <span>డిజిటల్ కాటా తూకం</span>
        </span>
        <span className="text-[#E6DED4]">•</span>
        <span className="flex items-center gap-1 font-semibold text-[#983c0c]">
          <span className="material-symbols-outlined text-sm">account_balance</span>
          <span>సేమ్-డే బ్యాంక్ డిపాజిట్</span>
        </span>
      </div>

      {/* 12. Floating Bottom Sticky Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white/95 backdrop-blur-md border-t border-[#E6DED4] z-40">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#8a7269]">మొత్తం మొత్తం:</div>
            <div className="font-mono font-bold text-base text-[#1a1c1e]">
              ₹{totalRevenue.toLocaleString('en-IN')}
            </div>
          </div>

          <button
            onClick={handlePublish}
            disabled={isPublished}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#983c0c] hover:bg-[#7e2c00] text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:bg-[#476558]"
          >
            {isPublished ? (
              <>
                <span className="material-symbols-outlined text-lg">check_circle</span>
                <span>మార్కెట్‌లో లిస్ట్ చేయబడింది (Live Active)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-lg">publish</span>
                <span>పంటను మార్కెట్‌లో ఉంచు (3rd Tap • Publish Lot)</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
