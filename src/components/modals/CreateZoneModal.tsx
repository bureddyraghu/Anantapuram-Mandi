import React, { useState } from 'react';

interface CreateZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onZoneCreated?: (zoneName: string) => void;
}

export const CreateZoneModal: React.FC<CreateZoneModalProps> = ({
  isOpen,
  onClose,
  onZoneCreated,
}) => {
  const [zoneName, setZoneName] = useState('');
  const [zoneCode, setZoneCode] = useState('AP-08');
  const [primaryProduce, setPrimaryProduce] = useState('Papaya & Sweet Orange');
  const [mandiYards, setMandiYards] = useState('Kadapa Central, Rayachoty Yard, Pulivendula Hub');
  const [directorName, setDirectorName] = useState('K. Venkatasubbaiah (APMC Grade 1)');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onZoneCreated) {
      onZoneCreated(zoneName || `${zoneCode} Rayalaseema Central Corridor`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-[#FAF7F2] rounded-3xl border border-[#E6DED4] shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-white border-b border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">add_location_alt</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                Create Regional Agro-Zone
              </h3>
              <p className="text-xs text-[#6F6B64]">
                Register New Interstate APMC Corridor Cluster
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

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Zone Code
              </label>
              <input
                type="text"
                value={zoneCode}
                onChange={(e) => setZoneCode(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] font-mono text-[#1a1c1e]"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-[#56423b] mb-1">
                Zone Name
              </label>
              <input
                type="text"
                placeholder="e.g. Kadapa-Rayachoty Horticultural Belt"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#56423b] mb-1">
              Primary Produce / GI Specialization
            </label>
            <input
              type="text"
              value={primaryProduce}
              onChange={(e) => setPrimaryProduce(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#56423b] mb-1">
              Associated Mandi Yards & Checkposts
            </label>
            <textarea
              rows={2}
              value={mandiYards}
              onChange={(e) => setMandiYards(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#56423b] mb-1">
              Assigned APMC Field Director
            </label>
            <input
              type="text"
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e]"
            />
          </div>

          <div className="p-3 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] text-xs text-[#1A3026]">
            <div className="flex items-center gap-1.5 font-bold mb-0.5">
              <span className="material-symbols-outlined text-sm">verified</span>
              <span>Direct APMC Grid Integration</span>
            </div>
            <p className="text-[11px] text-[#304d40]">
              Digital weighbridges in this cluster will be provisioned with instant T+0 escrow clearing.
            </p>
          </div>

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
              className="px-5 py-2 rounded-xl bg-[#1A3026] hover:bg-[#022016] text-white text-xs font-semibold shadow-sm flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>Register & Provision Zone</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
