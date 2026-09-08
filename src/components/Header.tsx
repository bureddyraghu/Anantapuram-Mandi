import React, { useState } from 'react';
import { AppView, UserAccount } from '../types';

interface HeaderProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  selectedZone: string;
  setSelectedZone: (zone: string) => void;
  isMobileFarmerMode: boolean;
  setIsMobileFarmerMode: (val: boolean) => void;
  onOpenEquilibriumModal: () => void;
  onOpenCreateZoneModal: () => void;
  currentUser: UserAccount;
  onOpenLoginModal: () => void;
  onOpenUpdatePasswordModal: () => void;
  onLogout: () => void;
  onShowToast: (msg: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  selectedZone,
  setSelectedZone,
  isMobileFarmerMode,
  setIsMobileFarmerMode,
  onOpenEquilibriumModal,
  onOpenCreateZoneModal,
  currentUser,
  onOpenLoginModal,
  onOpenUpdatePasswordModal,
  onLogout,
  onShowToast,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showZoneDropdown, setShowZoneDropdown] = useState(false);

  const zones = [
    { id: 'all', name: 'All South India (128 Mandis)', state: 'AP • KA • TN • TS • KL' },
    { id: 'ap-04', name: 'AP-04 Madanapalle Agro-Corridor', state: 'Andhra Pradesh' },
    { id: 'ap-02', name: 'AP-02 Anantapur Lemon Belt', state: 'Andhra Pradesh' },
    { id: 'ka-03', name: 'KA-03 Kolar Highway Terminal', state: 'Karnataka' },
    { id: 'tn-01', name: 'TN-01 Krishnagiri Mango Corridor', state: 'Tamil Nadu' },
    { id: 'kl-02', name: 'KL-02 Wayanad Spices Hub', state: 'Kerala' },
  ];

  const handleNavigate = (target: 'os' | 'merchant' | 'farmer' | 'admin') => {
    if (target === 'os') {
      if (currentUser.role === 'farmer') {
        onShowToast('⚠️ Restricted: Your account is logged in as Farmer (రైతు). Please switch to Admin or Merchant role to access Command OS.');
        return;
      }
      setIsMobileFarmerMode(false);
      if (currentView === 'farmer-listing' || currentView === 'merchant-portal' || currentView === 'farmers-and-fpos' || currentView === 'mandi-merchants' || currentView === 'admin-users') {
        setCurrentView('dashboard');
      }
    } else if (target === 'merchant') {
      if (currentUser.role === 'farmer') {
        onShowToast('⚠️ Restricted: Your account is logged in as Farmer. Please switch to a Merchant / Buyer account.');
        return;
      }
      setIsMobileFarmerMode(false);
      setCurrentView('merchant-portal');
    } else if (target === 'farmer') {
      if (currentUser.role === 'merchant') {
        onShowToast('⚠️ Restricted: Your account is logged in as Merchant. Please switch to a Farmer account to access రైతు యాప్.');
        return;
      }
      setIsMobileFarmerMode(true);
      setCurrentView('farmer-listing');
    } else if (target === 'admin') {
      if (currentUser.role !== 'admin') {
        onShowToast(`⚠️ Access Denied: Only Mandi Administrators can access Admin directories. (Current role: ${currentUser.role})`);
        return;
      }
      setIsMobileFarmerMode(false);
      setCurrentView('farmers-and-fpos');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E6DED4] px-4 md:px-6 py-2.5 transition-colors">
      <div className="flex items-center justify-between gap-3 md:gap-6">
        
        {/* Left: Mobile menu toggle / Zone Switcher */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle Pill: Desktop Mandi OS vs Merchant Portal vs Farmer App */}
          <div className="flex items-center bg-[#EDE7DD] p-1 rounded-full border border-[#DDC0B6]/50">
            <button
              onClick={() => handleNavigate('os')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                !isMobileFarmerMode && currentView !== 'merchant-portal' && currentView !== 'farmers-and-fpos' && currentView !== 'mandi-merchants' && currentView !== 'admin-users'
                  ? 'bg-[#983c0c] text-white shadow-sm' 
                  : 'text-[#56423b] hover:text-[#1a1c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">desktop_windows</span>
              <span className="hidden sm:inline">Mandi Command OS</span>
              <span className="sm:hidden">OS</span>
            </button>

            <button
              onClick={() => handleNavigate('merchant')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                !isMobileFarmerMode && currentView === 'merchant-portal'
                  ? 'bg-[#1A3026] text-white shadow-sm' 
                  : 'text-[#56423b] hover:text-[#1a1c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">storefront</span>
              <span className="font-semibold hidden sm:inline">Merchant / Buyer App</span>
              <span className="font-semibold sm:hidden">Buyer</span>
            </button>

            <button
              onClick={() => handleNavigate('farmer')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isMobileFarmerMode 
                  ? 'bg-[#476558] text-white shadow-sm' 
                  : 'text-[#56423b] hover:text-[#1a1c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">smartphone</span>
              <span className="font-semibold">రైతు యాప్ (Farmer)</span>
            </button>

            <button
              onClick={() => handleNavigate('admin')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                !isMobileFarmerMode && (currentView === 'farmers-and-fpos' || currentView === 'mandi-merchants' || currentView === 'admin-users')
                  ? 'bg-[#7e2c00] text-white shadow-sm' 
                  : 'text-[#56423b] hover:text-[#1a1c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
              <span className="font-semibold hidden xl:inline">Admin (Corridor &amp; Users)</span>
              <span className="font-semibold xl:hidden">Admin</span>
            </button>
          </div>

          {/* Regional Zone Selector */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => setShowZoneDropdown(!showZoneDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E6DED4] bg-white text-xs font-medium text-[#1a1c1e] hover:border-[#983c0c]/40 transition-colors shadow-2xs"
            >
              <span className="material-symbols-outlined text-[#983c0c] text-base">location_on</span>
              <span className="max-w-[190px] truncate text-left font-semibold">{selectedZone}</span>
              <span className="material-symbols-outlined text-xs text-[#6F6B64]">expand_more</span>
            </button>

            {showZoneDropdown && (
              <div className="absolute left-0 mt-2 w-72 rounded-xl bg-white border border-[#E6DED4] shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-1">
                <div className="px-3 py-1 text-[11px] font-semibold text-[#6F6B64] uppercase tracking-wider">
                  Select Agro-Corridor
                </div>
                {zones.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => {
                      setSelectedZone(zone.name);
                      setShowZoneDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs hover:bg-[#FAF7F2] flex items-center justify-between ${
                      selectedZone === zone.name ? 'bg-[#F7ECE5] text-[#983c0c] font-semibold' : 'text-[#1a1c1e]'
                    }`}
                  >
                    <div>
                      <div className="font-medium">{zone.name}</div>
                      <div className="text-[11px] text-[#6F6B64]">{zone.state}</div>
                    </div>
                    {selectedZone === zone.name && (
                      <span className="material-symbols-outlined text-sm text-[#983c0c]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Real-Time Mandi Ticker */}
        <div className="hidden xl:flex items-center gap-6 overflow-hidden bg-white/70 px-4 py-1.5 rounded-full border border-[#E6DED4] text-xs">
          <div className="flex items-center gap-1.5 text-[#983c0c] font-semibold tracking-wide whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#983c0c] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#983c0c]"></span>
            </span>
            <span>LIVE RATES</span>
          </div>

          <div className="flex items-center gap-6 text-[12px] whitespace-nowrap font-mono text-[#1a1c1e]">
            <span className="flex items-center gap-1">
              <span className="text-[#6F6B64]">Madanapalle Mango:</span>
              <span className="font-semibold text-[#983c0c]">₹62.00/kg</span>
              <span className="text-emerald-700 font-sans text-[11px]">▲ 8.4%</span>
            </span>
            <span className="text-[#DDC0B6]">•</span>
            <span className="flex items-center gap-1">
              <span className="text-[#6F6B64]">Kolar Tomato:</span>
              <span className="font-semibold text-[#1a1c1e]">₹28.40/kg</span>
              <span className="text-rose-700 font-sans text-[11px]">▼ 5.1%</span>
            </span>
            <span className="text-[#DDC0B6]">•</span>
            <span className="flex items-center gap-1">
              <span className="text-[#6F6B64]">Anantapur Lemon:</span>
              <span className="font-semibold text-[#983c0c]">₹74.50/kg</span>
              <span className="text-emerald-700 font-sans text-[11px]">▲ 14.2%</span>
            </span>
            <span className="text-[#DDC0B6]">•</span>
            <span className="flex items-center gap-1">
              <span className="text-[#6F6B64]">Guntur Chilli S4:</span>
              <span className="font-semibold text-[#1a1c1e]">₹215/kg</span>
              <span className="text-stone-500 font-sans text-[11px]">■ stable</span>
            </span>
          </div>
        </div>

        {/* Right: Search, APMC Sync Status, Profile & Action Trigger */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* APMC Interstate Live Status Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#c9ead9] text-[#022016] text-xs font-medium border border-[#adcebe]">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
            <span className="font-semibold">AP-KA SYNC: 128 Mandis Live</span>
          </div>

          {/* Quick Equilibrium Simulator Button */}
          <button
            onClick={onOpenEquilibriumModal}
            title="Open Price Equilibrium Simulator"
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-[#F3EDE2] border border-[#E6DED4] text-xs font-semibold text-[#7e2c00] transition-colors"
          >
            <span className="material-symbols-outlined text-sm">tune</span>
            <span>Equilibrium Sim</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-lg text-[#56423b] hover:text-[#1a1c1e] hover:bg-white/80 transition-colors"
              title="Notifications"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#983c0c] rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-[#E6DED4] shadow-2xl p-4 z-50 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
                  <h4 className="font-semibold text-sm text-[#1a1c1e]">APMC Live Alerts</h4>
                  <span className="text-[11px] font-bold text-[#983c0c] bg-[#F7ECE5] px-2 py-0.5 rounded-full">3 Critical</span>
                </div>
                <div className="mt-3 space-y-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-[#FFF5F2] border border-[#ffdbce] text-[#7e2c00]">
                    <div className="font-bold flex items-center justify-between">
                      <span>🍋 Acid Lime Deficit Alert</span>
                      <span className="text-[10px] text-[#8a7269]">Just now</span>
                    </div>
                    <p className="mt-1 text-[#56423b]">Anantapur-Kadiri belt lemon arrival down 38%. Spot rates spiking to ₹74.50/kg.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]">
                    <div className="font-bold flex items-center justify-between">
                      <span>⚖️ Scale-03 Kolar Checkpost</span>
                      <span className="text-[10px] text-[#8a7269]">12m ago</span>
                    </div>
                    <p className="mt-1 text-[#56423b]">42 min weighment queue. Deploying mobile weighbridge scale 04.</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]">
                    <div className="font-bold flex items-center justify-between">
                      <span>💰 Escrow Settled (#AM-8941)</span>
                      <span className="text-[10px] text-[#8a7269]">28m ago</span>
                    </div>
                    <p className="mt-1 text-[#56423b]">₹14,88,000 released to Ramesh Farms via T+0 instant RTGS.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile & Role Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 border-l border-[#E6DED4] hover:opacity-90 transition-opacity text-left"
            >
              <div className={`w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs shadow-xs ${
                currentUser.role === 'admin' ? 'bg-[#983c0c]' :
                currentUser.role === 'merchant' ? 'bg-[#1A3026]' :
                'bg-[#2A5C3B]'
              }`}>
                {currentUser.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="hidden lg:block text-left text-xs leading-tight">
                <div className="font-bold text-[#1a1c1e] flex items-center gap-1">
                  <span>{currentUser.name}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[9px] uppercase font-bold ${
                    currentUser.role === 'admin' ? 'bg-[#ffdbd0] text-[#983c0c]' :
                    currentUser.role === 'merchant' ? 'bg-emerald-100 text-emerald-900' :
                    'bg-amber-100 text-amber-950'
                  }`}>
                    {currentUser.role}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[#84726C]">
                  +91 {currentUser.phoneNumber}
                </div>
              </div>
              <span className="material-symbols-outlined text-xs text-[#6F6B64] hidden lg:inline">
                expand_more
              </span>
            </button>

            {/* Profile Dropdown Menu */}
            {showUserMenu && (
              <div 
                className="absolute right-0 mt-2 w-72 rounded-2xl bg-white border border-[#E6DED4] shadow-2xl p-3 z-50 animate-in fade-in"
                onClick={() => setShowUserMenu(false)}
              >
                {/* User Card */}
                <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DD] mb-2">
                  <div className="font-bold text-xs text-[#1a1c1e]">
                    {currentUser.name} {currentUser.teluguName && `(${currentUser.teluguName})`}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#983c0c] mt-0.5">
                    User ID / Mobile: {currentUser.phoneNumber}
                  </div>
                  <div className="text-[10px] text-[#56423b] mt-0.5">
                    {currentUser.fpoOrFirm || 'Independent Registered Member'}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#1a1c1e] text-white capitalize">
                      Role: {currentUser.role}
                    </span>
                    {currentUser.mustChangePassword ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                        ⚠️ Must Update Password
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        ✅ Password Set
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-1 text-xs">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(false);
                      onOpenUpdatePasswordModal();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#1a1c1e] hover:bg-[#FAF8F5] flex items-center gap-2 transition-colors font-medium"
                  >
                    <span className="material-symbols-outlined text-sm text-[#983c0c]">lock_reset</span>
                    <span>Update Password (పాస్‌వర్డ్ మార్చండి)</span>
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowUserMenu(false);
                      onOpenLoginModal();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#1a1c1e] hover:bg-[#FAF8F5] flex items-center gap-2 transition-colors font-medium"
                  >
                    <span className="material-symbols-outlined text-sm text-emerald-700">switch_account</span>
                    <span>Switch Role / Login Screen</span>
                  </button>

                  {currentUser.role === 'admin' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserMenu(false);
                        setIsMobileFarmerMode(false);
                        setCurrentView('admin-users');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-[#983c0c] hover:bg-[#ffdbd0]/30 flex items-center gap-2 transition-colors font-bold"
                    >
                      <span className="material-symbols-outlined text-sm">manage_accounts</span>
                      <span>Manage Users &amp; Privileges</span>
                    </button>
                  )}

                  <div className="border-t border-[#EDE7DD] my-1 pt-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowUserMenu(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-semibold"
                    >
                      <span className="material-symbols-outlined text-sm">logout</span>
                      <span>Sign Out (లాగ్ అవుట్)</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
