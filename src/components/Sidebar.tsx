import React from 'react';
import { AppView } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isMobileFarmerMode: boolean;
  setIsMobileFarmerMode: (val: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isMobileFarmerMode,
  setIsMobileFarmerMode
}) => {
  const navItems = [
    { 
      id: 'dashboard' as AppView, 
      label: 'Dashboard', 
      icon: 'space_dashboard',
      badge: null
    },
    { 
      id: 'network-and-zones' as AppView, 
      label: 'Network & Zones', 
      icon: 'share_location',
      badge: '3 Belts'
    },
    { 
      id: 'farmers-and-fpos' as AppView, 
      label: 'Farmers & FPOs', 
      icon: 'nature_people',
      badge: '24.5k'
    },
    { 
      id: 'mandi-merchants' as AppView, 
      label: 'Mandi Merchants', 
      icon: 'storefront',
      badge: '4.8k'
    },
    { 
      id: 'produce-master' as AppView, 
      label: 'Produce Master', 
      icon: 'grain',
      badge: null
    },
    { 
      id: 'live-marketplace' as AppView, 
      label: 'Live Marketplace', 
      icon: 'gavel',
      isPulse: true,
      badge: 'LIVE'
    },
    { 
      id: 'procurement-orders-and-weighment' as AppView, 
      label: 'Procurement & Weighment', 
      icon: 'scale',
      badge: 'Active POs'
    },
    { 
      id: 'logistics-and-cold-chain' as AppView, 
      label: 'Logistics & Cold Chain', 
      icon: 'local_shipping',
      badge: null
    },
    { 
      id: 'supply-demand-and-pricing' as AppView, 
      label: 'Supply & Pricing Telemetry', 
      icon: 'trending_up',
      badge: null
    },
    { 
      id: 'ai-opportunity-engine' as AppView, 
      label: 'AI Opportunity Engine', 
      icon: 'neurology',
      badge: 'PRO'
    },
    { 
      id: 'audit-and-settings' as AppView, 
      label: 'Audit & Settings', 
      icon: 'verified_user',
      badge: null
    },
    { 
      id: 'farmer-listing' as AppView, 
      label: 'రైతు యాప్ (Create Lot)', 
      icon: 'smartphone',
      badge: 'NEW',
      isSpecialFarmer: true
    }
  ];

  return (
    <aside className="w-64 bg-[#FAF7F2] border-r border-[#E6DED4] flex flex-col justify-between shrink-0 h-screen sticky top-0 overflow-y-auto">
      {/* Top Branding Header */}
      <div>
        <div className="p-4 md:p-5 border-b border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#983c0c] flex items-center justify-center text-white shadow-md">
              <span className="material-symbols-outlined text-2xl">agriculture</span>
            </div>
            <div>
              <div className="font-headline-sm font-serif font-bold text-[17px] leading-tight text-[#1a1c1e]">
                Anantapuram Mandi
              </div>
              <div className="text-[11px] text-[#6F6B64] font-medium tracking-wide">
                అనంతపురం వ్యవసాయ మార్కెట్
              </div>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E5EBE7] text-[#1A3026] border border-[#adcebe]/50">
            v4.2
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="p-3 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold text-[#8a7269] uppercase tracking-wider">
            Corridor Command Center
          </div>

          {navItems.map((item) => {
            const isActive = currentView === item.id && !isMobileFarmerMode;
            const isFarmerSpecialActive = item.isSpecialFarmer && isMobileFarmerMode;

            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.isSpecialFarmer) {
                    setIsMobileFarmerMode(true);
                  } else {
                    setIsMobileFarmerMode(false);
                  }
                  setCurrentView(item.id);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group ${
                  isActive || isFarmerSpecialActive
                    ? 'bg-[#F7ECE5] text-[#983c0c] font-semibold shadow-2xs'
                    : 'text-[#56423b] hover:bg-[#F3EDE2] hover:text-[#1a1c1e]'
                } ${item.isSpecialFarmer ? 'border border-[#983c0c]/20 bg-[#FFF5F2]/60 mt-2' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-lg transition-transform group-hover:scale-110 ${
                      isActive || isFarmerSpecialActive ? 'text-[#983c0c]' : 'text-[#8a7269]'
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.isPulse && (
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E28743] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E28743]"></span>
                    </span>
                  )}
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        item.badge === 'PRO'
                          ? 'bg-[#1A3026] text-white'
                          : item.badge === 'LIVE'
                          ? 'bg-[#FDF4EA] text-[#884800] border border-[#ffb77d]'
                          : item.isSpecialFarmer
                          ? 'bg-[#c9ead9] text-[#022016]'
                          : 'bg-[#EDE7DD] text-[#56423b]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card */}
      <div className="p-4 border-t border-[#E6DED4] bg-white/50">
        <div className="p-3 rounded-2xl bg-white border border-[#E6DED4] shadow-2xs space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-[#1a1c1e]">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
              <span>Mandi Grid Online</span>
            </div>
            <span className="font-mono text-[11px] font-bold text-[#476558]">128 / 128</span>
          </div>

          <div className="w-full bg-[#EDE7DD] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full w-full rounded-full"></div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[#6F6B64]">
            <span>Latency</span>
            <span className="font-mono font-medium text-[#1A3026]">18ms (Direct APMC)</span>
          </div>

          <div className="pt-1 border-t border-[#E6DED4]/60 text-[10px] text-[#8a7269] flex justify-between">
            <span>T+0 RTGS Ready</span>
            <span className="text-emerald-700 font-bold">100% Escrow</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
