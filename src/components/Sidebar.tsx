import React from 'react';
import { AppView, UserAccount } from '../types';

interface SidebarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  isMobileFarmerMode: boolean;
  setIsMobileFarmerMode: (val: boolean) => void;
  currentUser: UserAccount;
  onOpenLoginModal?: () => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  isMobileFarmerMode,
  setIsMobileFarmerMode,
  currentUser,
  onOpenLoginModal,
  onLogout,
}) => {
  const baseNavItems = [
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
    ...(currentUser.role === 'admin' ? [
      {
        id: 'admin-users' as AppView,
        label: 'Users & Privileges',
        icon: 'manage_accounts',
        badge: 'AUTH',
        isPulse: true
      }
    ] : []),
    { 
      id: 'merchant-portal' as AppView, 
      label: 'Buyer / Merchant Portal', 
      icon: 'shopping_basket',
      badge: 'PRO',
      isPulse: true
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

  const navItems = baseNavItems;

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

      {/* Bottom User Profile & Status Card */}
      <div className="p-3.5 border-t border-[#E6DED4] bg-white/60 space-y-2.5">
        {/* Active User Card */}
        <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E6DED4] flex items-center justify-between">
          <div className="flex items-center gap-2 min-w-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs font-bold shrink-0 ${
              currentUser.role === 'admin' ? 'bg-[#983c0c]' :
              currentUser.role === 'merchant' ? 'bg-[#1A3026]' :
              'bg-[#2A5C3B]'
            }`}>
              {currentUser.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="font-bold text-xs text-[#1a1c1e] truncate">
                {currentUser.name}
              </div>
              <div className="text-[10px] font-mono text-[#84726C] truncate">
                {currentUser.phoneNumber}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {onOpenLoginModal && (
              <button
                onClick={onOpenLoginModal}
                title="Switch Role / Login"
                className="p-1 rounded-lg text-[#56423b] hover:bg-white hover:text-[#983c0c] transition-colors"
              >
                <span className="material-symbols-outlined text-base">switch_account</span>
              </button>
            )}
            {onLogout && (
              <button
                onClick={onLogout}
                title="Logout"
                className="p-1 rounded-lg text-[#56423b] hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <span className="material-symbols-outlined text-base">logout</span>
              </button>
            )}
          </div>
        </div>

        {/* Role & Password indicator */}
        <div className="flex items-center justify-between px-1 text-[10px]">
          <span className={`px-2 py-0.5 rounded-full font-bold uppercase ${
            currentUser.role === 'admin' ? 'bg-[#ffdbd0] text-[#983c0c]' :
            currentUser.role === 'merchant' ? 'bg-emerald-100 text-emerald-900' :
            'bg-amber-100 text-amber-950'
          }`}>
            Role: {currentUser.role}
          </span>
          {currentUser.mustChangePassword ? (
            <span className="text-amber-700 font-bold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
              <span>Must Update Pwd</span>
            </span>
          ) : (
            <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>Secure Pwd</span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
};
