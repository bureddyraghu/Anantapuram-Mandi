import React, { useState } from 'react';
import { BuyerRFQ } from '../../types';

interface CreateRFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRFQCreated: (rfq: BuyerRFQ) => void;
}

export const CreateRFQModal: React.FC<CreateRFQModalProps> = ({
  isOpen,
  onClose,
  onRFQCreated,
}) => {
  const [produce, setProduce] = useState('Banganapalli Mango (Grade A)');
  const [category, setCategory] = useState('fruits');
  const [volumeMT, setVolumeMT] = useState(30);
  const [priceMin, setPriceMin] = useState(58);
  const [priceMax, setPriceMax] = useState(64);
  const [brixSpec, setBrixSpec] = useState('Brix > 16.5° • 0% Carbide');
  const [destination, setDestination] = useState('Kempegowda Air Cargo Packhouse, Bengaluru');
  const [deliveryDate, setDeliveryDate] = useState('2026-09-18');
  const [escrowReady, setEscrowReady] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRfq: BuyerRFQ = {
      id: `rfq-${Date.now()}`,
      rfqCode: `RFQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      produceName: produce,
      category: category,
      volumeRequiredMT: volumeMT,
      volumeLockedMT: 0,
      targetPriceMin: priceMin,
      targetPriceMax: priceMax,
      qualitySpecs: brixSpec,
      deliveryLocation: destination,
      deliveryDate: deliveryDate,
      status: 'active',
      matchedLotsCount: Math.floor(8 + Math.random() * 15),
      matchScore: 94
    };
    onRFQCreated(newRfq);
    onClose();
  };

  const estimatedValue = volumeMT * 1000 * ((priceMin + priceMax) / 2);
  const escrowAdvance = estimatedValue * 0.10;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#E6DED4] shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#F7ECE5] text-[#983c0c] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">post_add</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                Post Buy Requirement (RFQ)
              </h3>
              <p className="text-xs text-[#6F6B64]">
                Broadcast purchase demand to 24,580 verified APMC farmers &amp; FPOs
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Produce Commodity
              </label>
              <select
                value={produce}
                onChange={(e) => {
                  setProduce(e.target.value);
                  if (e.target.value.includes('Lemon')) {
                    setCategory('citrus');
                    setPriceMin(65);
                    setPriceMax(75);
                  } else if (e.target.value.includes('Tomato')) {
                    setCategory('vegetables');
                    setPriceMin(24);
                    setPriceMax(30);
                  } else {
                    setCategory('fruits');
                    setPriceMin(58);
                    setPriceMax(64);
                  }
                }}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e] font-medium"
              >
                <option>Banganapalli Mango (Grade A)</option>
                <option>Balaji Acid Lime (Grade 1)</option>
                <option>Kolar Hybrid Tomato (Firm)</option>
                <option>Totapuri Pulp Mango</option>
                <option>Guntur Sannam Chilli S4</option>
                <option>Nendran Kerala Banana</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Required Volume (MT)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={volumeMT}
                  onChange={(e) => setVolumeMT(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] font-mono font-bold text-[#1a1c1e]"
                  required
                />
                <span className="absolute right-3 top-2 text-xs text-[#8a7269]">MT ({volumeMT * 10} Q)</span>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-xs font-semibold text-[#56423b] mb-1">
              Target Price Band (₹/kg)
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-[#8a7269]">Min ₹</span>
                <input
                  type="number"
                  value={priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] font-mono font-semibold text-[#1a1c1e]"
                  required
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-[#8a7269]">Max ₹</span>
                <input
                  type="number"
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] font-mono font-semibold text-[#1a1c1e]"
                  required
                />
              </div>
            </div>
          </div>

          {/* Quality Assay Specs */}
          <div>
            <label className="block text-xs font-semibold text-[#56423b] mb-1">
              Quality &amp; Lab Assay Requirements
            </label>
            <input
              type="text"
              value={brixSpec}
              onChange={(e) => setBrixSpec(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
              placeholder="e.g. Brix > 16.5°, Export Caliber > 320g, Strict 0% Carbide"
            />
          </div>

          {/* Destination & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Delivery Packhouse Hub
              </label>
              <select
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
              >
                <option>Kempegowda Air Cargo Packhouse, Bengaluru</option>
                <option>Kolar APMC Consolidation Center</option>
                <option>Hosur Agro-Processing Hub</option>
                <option>Koyambedu Wholesale Terminal, Chennai</option>
                <option>Bowenpally Mandi Yard, Hyderabad</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Required Delivery Date
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
                required
              />
            </div>
          </div>

          {/* Estimated Value & Advance Escrow Snapshot */}
          <div className="p-3.5 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] text-xs space-y-1">
            <div className="flex justify-between text-[#304d40]">
              <span>Estimated Purchase Value:</span>
              <span className="font-mono font-bold text-[#1A3026]">₹{estimatedValue.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#304d40]">
              <span>10% Advance Escrow Commitment:</span>
              <span className="font-mono font-bold text-emerald-800">₹{escrowAdvance.toLocaleString('en-IN')}</span>
            </div>
            <div className="pt-1 flex items-center gap-2">
              <input
                type="checkbox"
                id="escrowReady"
                checked={escrowReady}
                onChange={(e) => setEscrowReady(e.target.checked)}
                className="accent-[#983c0c] rounded"
              />
              <label htmlFor="escrowReady" className="text-[11px] text-[#1A3026] font-medium cursor-pointer">
                Lock 10% Advance in APMC Escrow from active balance (₹85.0L available)
              </label>
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b] hover:bg-[#FAF7F2]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">campaign</span>
              <span>Broadcast RFQ to Farmers</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
