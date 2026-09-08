import React from 'react';
import { ConsignmentItem } from '../../types';

interface ConsignmentTrackModalProps {
  item: ConsignmentItem | null;
  onClose: () => void;
}

export const ConsignmentTrackModal: React.FC<ConsignmentTrackModalProps> = ({
  item,
  onClose,
}) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-xl bg-[#FAF7F2] rounded-3xl border border-[#E6DED4] shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">local_shipping</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">{item.poCode}</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FAF7F2] border border-[#E6DED4] text-[#8a7269]">
                  {item.truckNo}
                </span>
              </div>
              <p className="text-xs text-[#6F6B64] font-mono">{item.waybill}</p>
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
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Route Overview */}
          <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] space-y-3">
            <div className="flex items-center justify-between text-xs border-b border-[#E6DED4]/60 pb-2">
              <span className="text-[#6F6B64]">Consignment Commodity</span>
              <span className="font-bold text-[#1a1c1e]">{item.produce}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6F6B64]">Transit Route</span>
              <span className="font-medium text-[#1a1c1e]">{item.sourceDest}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#6F6B64]">Current Telemetry</span>
              <span className="font-semibold text-[#983c0c]">{item.weighmentStatus}</span>
            </div>
          </div>

          {/* Stepper Status */}
          <div className="p-4 rounded-2xl bg-white border border-[#E6DED4] space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#56423b]">
              Corridor Transit Timeline & Digital Weighbridge
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#c9ead9]">
              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-[#c9ead9]"></span>
                <div className="text-xs font-bold text-[#1a1c1e]">Farm Gate Load & IoT Seal Affixed</div>
                <div className="text-[11px] text-[#6F6B64]">Pre-harvest quality assay certified • 0% Carbide</div>
              </div>

              <div className="relative">
                <span className="absolute -left-6 top-0.5 w-4 h-4 rounded-full bg-emerald-600 ring-4 ring-[#c9ead9]"></span>
                <div className="text-xs font-bold text-[#1a1c1e]">APMC Digital Weighment Slip #WB-04</div>
                <div className="text-[11px] text-[#6F6B64] font-mono">{item.weighmentDetails}</div>
              </div>

              <div className="relative">
                <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full ${
                  item.statusBadge === 'cleared' ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse'
                } ring-4 ring-[#ffdcc3]`}></span>
                <div className="text-xs font-bold text-[#1a1c1e]">Interstate Toll & Temperature Sensor</div>
                <div className="text-[11px] text-[#6F6B64]">Cold Reefer: 13.8°C • GPS Pulse: Active on NH-42</div>
              </div>

              <div className="relative">
                <span className={`absolute -left-6 top-0.5 w-4 h-4 rounded-full ${
                  item.statusBadge === 'cleared' ? 'bg-emerald-600' : 'bg-stone-300'
                }`}></span>
                <div className="text-xs font-bold text-[#1a1c1e]">Terminal Destination Clearance</div>
                <div className="text-[11px] text-[#6F6B64]">{item.eta || 'Scheduled Arrival'}</div>
              </div>
            </div>
          </div>

          {/* Financial Escrow Snapshot */}
          <div className="p-4 rounded-2xl bg-[#E5EBE7] border border-[#adcebe] flex items-center justify-between">
            <div>
              <div className="text-[11px] text-[#304d40] font-semibold uppercase tracking-wider">
                Digital Mandi Escrow Status
              </div>
              <div className="text-lg font-bold font-mono text-[#1A3026]">
                ₹{(item.amount).toLocaleString('en-IN')}
              </div>
              <div className="text-[11px] text-[#476558]">{item.paymentStatus}</div>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-bold border border-[#adcebe] shadow-2xs">
              T+0 Clearing Active
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-[#E6DED4] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1a1c1e] hover:bg-black text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Close Telemetry Radar
          </button>
        </div>
      </div>
    </div>
  );
};
