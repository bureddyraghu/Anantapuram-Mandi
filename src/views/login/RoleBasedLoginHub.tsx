import React, { useState } from 'react';
import { UserAccount, UserRole } from '../../types';
import { AdminLoginScreen } from './AdminLoginScreen';
import { MerchantLoginScreen } from './MerchantLoginScreen';
import { FarmerLoginScreen } from './FarmerLoginScreen';

interface RoleBasedLoginHubProps {
  initialRole?: UserRole;
  restrictRole?: UserRole;
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  onClose?: () => void;
  isFullPageView?: boolean;
}

export const RoleBasedLoginHub: React.FC<RoleBasedLoginHubProps> = ({
  initialRole = 'merchant',
  restrictRole,
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  onClose,
  isFullPageView = false,
}) => {
  const effectiveRole = restrictRole || initialRole;
  const [activeRole, setActiveRole] = useState<UserRole>(effectiveRole);
  const isRestricted = restrictRole === 'farmer' || restrictRole === 'merchant';

  const roleTabs: { id: UserRole; title: string; subtitle: string; icon: string; badge: string; color: string }[] = [
    {
      id: 'admin',
      title: 'Admin Command OS',
      subtitle: 'అడ్మిన్ పోర్టల్',
      icon: 'shield_person',
      badge: 'GOVT APMC',
      color: 'from-[#983c0c] to-[#7e2c00]',
    },
    {
      id: 'merchant',
      title: 'Merchant / Buyer Terminal',
      subtitle: 'వ్యాపారి పోర్టల్',
      icon: 'storefront',
      badge: 'APMC TRADER',
      color: 'from-[#1A3026] to-[#14261e]',
    },
    {
      id: 'farmer',
      title: 'రైతు యాప్ (Farmer App)',
      subtitle: 'కిసాన్ పోర్టల్',
      icon: 'nature_people',
      badge: 'RYTHU KISAN',
      color: 'from-[#2A5C3B] to-[#1E432B]',
    },
  ];

  return (
    <div className={`w-full ${isFullPageView ? 'max-w-4xl mx-auto py-6 px-4' : 'max-w-3xl mx-auto'}`}>
      {/* Top Banner if full-page view */}
      {isFullPageView && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EBE7] text-[#1A3026] border border-[#adcebe]/50 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {isRestricted
                ? effectiveRole === 'farmer'
                  ? 'రైతు మార్కెట్ వ్యవస్థ • Rythu Direct Market'
                  : 'APMC e-Procurement B2B Trading Desk'
                : 'South India Mandi Corridor Operating System'}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a1c1e] tracking-tight">
            {isRestricted
              ? effectiveRole === 'farmer'
                ? 'రైతు లాగిన్ (Farmer Portal Authentication)'
                : 'Merchant & Buyer Terminal Login'
              : 'Role-Based Authentication Portals'}
          </h1>
          <p className="text-sm text-[#6F6B64] max-w-xl mx-auto mt-1">
            {isRestricted
              ? effectiveRole === 'farmer'
                ? 'రైతులకు మాత్రమే ప్రత్యేకం: OTP, పాస్‌వర్డ్ లేదా వాయిస్ గైడెన్స్ ద్వారా లాగిన్ అవ్వండి.'
                : 'Authorized APMC licensed buyers and produce trading firms portal.'
              : 'Choose your dedicated gateway below. Each role features specialized authentication, security parameters, and interface workflows.'}
          </p>
        </div>
      )}

      {/* Role Selection Tabs (Strictly hidden for Farmer and Merchant portals) */}
      {!isRestricted && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
          {roleTabs.map((tab) => {
            const isActive = activeRole === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRole(tab.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all relative overflow-hidden flex items-start gap-3 shadow-xs ${
                  isActive
                    ? 'bg-white border-[#1a1c1e] ring-2 ring-[#1a1c1e] shadow-md scale-[1.01]'
                    : 'bg-[#FAF7F2] border-[#DDC0B6] hover:bg-white text-stone-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 bg-linear-to-br ${tab.color}`}
                >
                  <span className="material-symbols-outlined text-xl">{tab.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md ${
                      isActive ? 'bg-[#1a1c1e] text-white' : 'bg-stone-200 text-stone-700'
                    }`}>
                      {tab.badge}
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    )}
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-[#1a1c1e] truncate mt-1">
                    {tab.title}
                  </div>
                  <div className="text-[11px] text-[#6F6B64] font-serif">
                    {tab.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Render Active Dedicated Login Screen */}
      <div>
        {activeRole === 'admin' && (
          <AdminLoginScreen
            users={users}
            onLoginSuccess={onLoginSuccess}
            onRequirePasswordChange={onRequirePasswordChange}
            onSwitchRole={isRestricted ? undefined : (r) => setActiveRole(r)}
          />
        )}
        {activeRole === 'merchant' && (
          <MerchantLoginScreen
            users={users}
            onLoginSuccess={onLoginSuccess}
            onRequirePasswordChange={onRequirePasswordChange}
            onSwitchRole={undefined}
          />
        )}
        {activeRole === 'farmer' && (
          <FarmerLoginScreen
            users={users}
            onLoginSuccess={onLoginSuccess}
            onRequirePasswordChange={onRequirePasswordChange}
            onSwitchRole={undefined}
          />
        )}
      </div>
    </div>
  );
};
