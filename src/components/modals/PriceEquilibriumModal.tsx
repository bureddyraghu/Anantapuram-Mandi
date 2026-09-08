import React, { useState } from 'react';

interface PriceEquilibriumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSimulateApply?: (divertedTons: number, newPrice: number) => void;
}

export const PriceEquilibriumModal: React.FC<PriceEquilibriumModalProps> = ({
  isOpen,
  onClose,
  onSimulateApply,
}) => {
  const [divertedTons, setDivertedTons] = useState(2400);
  const [targetCrop, setTargetCrop] = useState('Banganapalli Mango (AP-04)');
  const [selectedRoute, setSelectedRoute] = useState('Madanapalle → Bengaluru Air Cargo');

  if (!isOpen) return null;

  // Base values
  const currentDeficit = 7200;
  const currentPrice = 62.00;
  // Dynamic calculation based on diversion slider
  const priceReduction = (divertedTons / 1000) * 0.85;
  const simulatedEquilibriumPrice = Math.max(54, currentPrice - priceReduction);
  const residualDeficit = Math.max(0, currentDeficit - divertedTons);
  const farmerRevenueGain = divertedTons * simulatedEquilibriumPrice * 1000 * 0.04;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-2xl bg-[#FAF7F2] rounded-3xl border border-[#E6DED4] shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7ECE5] text-[#983c0c] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">tune</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                Mandi Price Equilibrium Simulator
              </h3>
              <p className="text-xs text-[#6F6B64]">
                Algorithmic Inter-Corridor Supply Diversion & Price Stabilization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6F6B64] hover:bg-[#EDE7DD] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Target Deficit Commodity
              </label>
              <select
                value={targetCrop}
                onChange={(e) => setTargetCrop(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e] font-medium"
              >
                <option>Banganapalli Mango (AP-04)</option>
                <option>Balaji Acid Lime (AP-02)</option>
                <option>Kolar Hybrid Tomato (KA-03)</option>
                <option>Nendran Kerala Banana (KL-02)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Corridor Diversion Route
              </label>
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e] font-medium"
              >
                <option>Madanapalle → Bengaluru Air Cargo</option>
                <option>Anantapur → Chennai Wholesale Koyambedu</option>
                <option>Kolar → Bowenpally Hyderabad</option>
                <option>Krishnagiri → Kochi Processing Belt</option>
              </select>
            </div>
          </div>

          {/* Slider */}
          <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#1a1c1e]">Supply Diversion Quantity</span>
              <span className="font-mono font-bold text-sm text-[#983c0c]">
                {divertedTons.toLocaleString()} MT
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="6000"
              step="100"
              value={divertedTons}
              onChange={(e) => setDivertedTons(Number(e.target.value))}
              className="w-full accent-[#983c0c] cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-[#6F6B64]">
              <span>500 MT (Minimum Batch)</span>
              <span>3,500 MT (Optimal Balance)</span>
              <span>6,000 MT (Cap)</span>
            </div>
          </div>

          {/* Simulation Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce]">
              <div className="text-[11px] text-[#8a7269] font-medium">Equilibrium Price</div>
              <div className="text-xl font-bold font-mono text-[#983c0c] mt-0.5">
                ₹{simulatedEquilibriumPrice.toFixed(2)}
                <span className="text-xs font-normal text-[#56423b]">/kg</span>
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold mt-1">
                ▼ -₹{priceReduction.toFixed(2)}/kg stabilization
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#E5EBE7] border border-[#adcebe]">
              <div className="text-[11px] text-[#304d40] font-medium">Remaining Deficit</div>
              <div className="text-xl font-bold font-mono text-[#1A3026] mt-0.5">
                {residualDeficit.toLocaleString()} MT
              </div>
              <div className="text-[10px] text-emerald-800 font-semibold mt-1">
                Reduced by {Math.round((divertedTons / currentDeficit) * 100)}%
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-[#E6DED4]">
              <div className="text-[11px] text-[#6F6B64] font-medium">Farmer Income Impact</div>
              <div className="text-xl font-bold font-mono text-[#1a1c1e] mt-0.5">
                +₹{(farmerRevenueGain / 100000).toFixed(2)}L
              </div>
              <div className="text-[10px] text-[#476558] font-semibold mt-1">
                0% Middleman Loss
              </div>
            </div>
          </div>

          {/* Algorithmic Notes */}
          <div className="p-3.5 rounded-2xl bg-[#FDF4EA] border border-[#ffdcc3] text-xs text-[#884800] space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">auto_graph</span>
              <span>AI Market Equilibrium Recommendation</span>
            </div>
            <p className="text-[11px] leading-relaxed text-[#7e2c00]">
              Diverting 2,400 MT from Kadiri & Anantapur packhouses into Madanapalle corridor will 
              cool terminal auction premiums while guaranteeing farm-gate price above ₹58.00/kg MSP floor.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E6DED4] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b] hover:bg-[#FAF7F2] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onSimulateApply) onSimulateApply(divertedTons, simulatedEquilibriumPrice);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">flash_on</span>
            <span>Broadcast Rerouting Directives</span>
          </button>
        </div>
      </div>
    </div>
  );
};
