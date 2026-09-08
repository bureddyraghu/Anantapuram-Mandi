import React from 'react';
import { UserAccount, UserRole } from '../../types';
import { RoleBasedLoginHub } from '../../views/login/RoleBasedLoginHub';

interface LoginModalProps {
  isOpen: boolean;
  onClose?: () => void;
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  initialRole?: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  initialRole = 'merchant'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Floating Close Button */}
        {onClose && (
          <button 
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute -top-3 -right-3 sm:-right-4 w-9 h-9 rounded-full bg-[#1a1c1e] text-white hover:bg-stone-800 shadow-xl flex items-center justify-center z-50 border-2 border-white transition-transform hover:scale-105"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        )}

        <RoleBasedLoginHub
          initialRole={initialRole}
          users={users}
          onLoginSuccess={onLoginSuccess}
          onRequirePasswordChange={onRequirePasswordChange}
          onClose={onClose}
          isFullPageView={false}
        />
      </div>
    </div>
  );
};
