import React from 'react';
import { UserAccount, UserRole } from '../types';
import { RoleBasedLoginHub } from './login/RoleBasedLoginHub';

interface LoginViewProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  initialRole?: UserRole;
  currentUserRole?: UserRole;
  onBackToDashboard?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  initialRole = 'merchant',
  currentUserRole,
  onBackToDashboard,
}) => {
  const getReturnLabel = () => {
    if (currentUserRole === 'merchant') {
      return 'Return to Merchant / Buyer App (వ్యాపారి పోర్టల్)';
    }
    if (currentUserRole === 'farmer') {
      return 'Return to రైతు యాప్ (Farmer App)';
    }
    return 'Return to Mandi Dashboard (డ్యాష్‌బోర్డ్)';
  };

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col justify-center py-4">
      {onBackToDashboard && (
        <div className="max-w-4xl mx-auto w-full mb-3 px-4">
          <button
            type="button"
            onClick={onBackToDashboard}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#56423b] hover:text-[#1a1c1e] bg-white px-3 py-1.5 rounded-xl border border-[#DDC0B6] shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>{getReturnLabel()}</span>
          </button>
        </div>
      )}

      <RoleBasedLoginHub
        initialRole={initialRole}
        users={users}
        onLoginSuccess={onLoginSuccess}
        onRequirePasswordChange={onRequirePasswordChange}
        isFullPageView={true}
      />
    </div>
  );
};
