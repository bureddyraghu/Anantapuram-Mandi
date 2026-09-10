import React from 'react';
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
  isFullPageView = false,
}) => {
  const activeRole = restrictRole || initialRole;

  const getHeaderInfo = () => {
    if (activeRole === 'farmer') {
      return {
        badge: 'రైతు మార్కెట్ వ్యవస్థ • Rythu Direct Market',
        title: 'రైతు లాగిన్ (Farmer Portal Authentication)',
        desc: 'రైతులకు మాత్రమే ప్రత్యేకం: OTP, పాస్‌వర్డ్ లేదా వాయిస్ గైడెన్స్ ద్వారా లాగిన్ అవ్వండి.',
      };
    }
    if (activeRole === 'merchant') {
      return {
        badge: 'APMC e-Procurement B2B Trading Desk',
        title: 'Merchant & Buyer Terminal Login',
        desc: 'Authorized APMC licensed buyers and produce trading firms portal.',
      };
    }
    return {
      badge: 'APMC Regulatory Oversight Authority',
      title: 'Administrator Authentication Portal',
      desc: 'Authorized Market Committee Directors, Secretaries, and Audit Officers portal.',
    };
  };

  const headerInfo = getHeaderInfo();

  return (
    <div className={`w-full ${isFullPageView ? 'max-w-4xl mx-auto py-6 px-4' : 'max-w-3xl mx-auto'}`}>
      {/* Top Banner if full-page view */}
      {isFullPageView && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E5EBE7] text-[#1A3026] border border-[#adcebe]/50 text-xs font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{headerInfo.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#1a1c1e] tracking-tight">
            {headerInfo.title}
          </h1>
          <p className="text-sm text-[#6F6B64] max-w-xl mx-auto mt-1">
            {headerInfo.desc}
          </p>
        </div>
      )}

      {/* Render Active Dedicated Login Screen */}
      <div>
        {activeRole === 'admin' && (
          <AdminLoginScreen
            users={users}
            onLoginSuccess={onLoginSuccess}
            onRequirePasswordChange={onRequirePasswordChange}
          />
        )}
        {activeRole === 'merchant' && (
          <MerchantLoginScreen
            users={users}
            onLoginSuccess={onLoginSuccess}
            onRequirePasswordChange={onRequirePasswordChange}
          />
        )}
        {activeRole === 'farmer' && (
          <FarmerLoginScreen
            users={users}
            onLoginSuccess={onLoginSuccess}
            onRequirePasswordChange={onRequirePasswordChange}
          />
        )}
      </div>
    </div>
  );
};
