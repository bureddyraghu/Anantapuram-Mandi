import React, { useState } from 'react';

interface ContractSignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ContractSignModal: React.FC<ContractSignModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [pin, setPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSuccess();
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF7F2] rounded-3xl border border-[#E6DED4] shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 bg-white border-b border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">verified</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                Execute Digital Mandi PO
              </h3>
              <p className="text-xs text-[#6F6B64]">PO #MND-PO-2026-9921</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6F6B64] hover:bg-[#EDE7DD] transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSign} className="p-6 space-y-4">
          <div className="p-3.5 rounded-2xl bg-[#FFF5F2] border border-[#ffdbce] text-xs space-y-1">
            <div className="flex justify-between font-medium text-[#7e2c00]">
              <span>Agreed Quantity:</span>
              <span className="font-bold font-mono">24,000 Kg (24 MT)</span>
            </div>
            <div className="flex justify-between font-medium text-[#7e2c00]">
              <span>Agreed Final Rate:</span>
              <span className="font-bold font-mono">₹62.00 / kg</span>
            </div>
            <div className="flex justify-between text-[#1a1c1e] font-bold pt-1 border-t border-[#ffdbce]">
              <span>Total Contract Value:</span>
              <span className="font-mono text-sm text-[#983c0c]">₹14,88,000</span>
            </div>
            <div className="flex justify-between text-emerald-800 text-[11px] font-semibold">
              <span>10% Advance Escrow to Lock:</span>
              <span className="font-mono">₹1,48,800</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#56423b] mb-1">
              Enter APMC Digital Signing PIN
            </label>
            <input
              type="password"
              maxLength={6}
              placeholder="••••••"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full px-3 py-2 text-center text-lg tracking-widest rounded-xl bg-white border border-[#E6DED4] text-[#1a1c1e] font-mono focus:border-[#983c0c] outline-none"
              required
            />
            <p className="text-[11px] text-[#8a7269] mt-1 text-center">
              Signed with DSC token of Sri Balaji Agro Exporters (APMC KA-8921)
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
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Locking Escrow...</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">lock</span>
                  <span>Sign PO & Lock ₹1,48,800 Escrow</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
