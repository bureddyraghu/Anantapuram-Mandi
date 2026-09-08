import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface UpdatePasswordModalProps {
  isOpen: boolean;
  user?: UserAccount | null;
  onClose?: () => void;
  onSuccess: (updatedUser: UserAccount) => void;
  isMandatory?: boolean;
}

interface ContentProps {
  user: UserAccount;
  onClose?: () => void;
  onSuccess: (updatedUser: UserAccount) => void;
  isMandatory: boolean;
}

const UpdatePasswordModalContent: React.FC<ContentProps> = ({
  user,
  onClose,
  onSuccess,
  isMandatory,
}) => {
  const [currentPasswordInput, setCurrentPasswordInput] = useState(user.defaultPassword || user.password || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const calculateStrength = (pwd: string) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return score;
  };

  const strength = calculateStrength(newPassword);

  const getStrengthLabel = () => {
    if (strength <= 1) return { text: 'Weak / బలహీనమైనది', color: 'text-red-600', barColor: 'bg-red-500' };
    if (strength <= 3) return { text: 'Moderate / మధ్యస్థం', color: 'text-amber-600', barColor: 'bg-amber-500' };
    return { text: 'Strong / బలమైనది', color: 'text-emerald-600', barColor: 'bg-emerald-500' };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long (కనీసం 6 అక్షరాలు ఉండాలి)');
      return;
    }

    if (newPassword === user.defaultPassword && isMandatory) {
      setErrorMessage('New password cannot be the same as the initial default password (డిఫాల్ట్ పాస్‌వర్డ్ కాకుండా కొత్తది ఎంచుకోండి)');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('New password and confirm password do not match (పాస్‌వర్డ్‌లు సరిపోలడం లేదు)');
      return;
    }

    const updated: UserAccount = {
      ...user,
      password: newPassword,
      mustChangePassword: false,
      lastLogin: 'Just now'
    };

    onSuccess(updated);
  };

  const strengthInfo = getStrengthLabel();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#DDC0B6]/60 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-[#983c0c] to-[#7e2c00] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-2xl text-white">lock_reset</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-400 text-amber-950">
                  {isMandatory ? 'Required Update' : 'Change Password'}
                </span>
                <span className="text-white/80 text-xs font-mono">{user.phoneNumber}</span>
              </div>
              <h3 className="text-lg font-bold font-serif leading-snug mt-1">
                {isMandatory ? 'Update Initial Default Password' : 'Change Account Password'}
              </h3>
              <p className="text-white/80 text-xs mt-0.5">
                కొత్త వ్యక్తిగత పాస్‌వర్డ్‌ను నమోదు చేయండి
              </p>
            </div>
          </div>

          {!isMandatory && onClose && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* User Card Info */}
        <div className="bg-[#FAF8F5] border-b border-[#EDE7DD] px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
              user.role === 'admin' ? 'bg-[#983c0c] text-white' :
              user.role === 'merchant' ? 'bg-[#1A3026] text-white' :
              'bg-[#2A5C3B] text-white'
            }`}>
              {user.role === 'admin' ? 'AD' : user.role === 'merchant' ? 'MB' : 'FR'}
            </div>
            <div>
              <div className="text-xs font-bold text-[#1a1c1e] flex items-center gap-1.5">
                <span>{user.name}</span>
                {user.teluguName && <span className="text-[#84726C] text-[11px]">({user.teluguName})</span>}
              </div>
              <div className="text-[11px] text-[#56423b]">
                {user.fpoOrFirm || (user.role === 'admin' ? 'APMC Mandi Administrator' : user.role)}
              </div>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
            user.role === 'admin' ? 'bg-[#ffdbd0] text-[#983c0c]' :
            user.role === 'merchant' ? 'bg-emerald-100 text-emerald-800' :
            'bg-amber-100 text-amber-900'
          }`}>
            {user.role === 'merchant' ? 'Merchant / Buyer' : user.role}
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isMandatory && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <span className="material-symbols-outlined text-amber-700 text-lg shrink-0 mt-0.5">security</span>
              <div>
                <p className="font-semibold">భద్రతా ప్రకటన (Security Notice):</p>
                <p className="mt-0.5 text-amber-800 text-[11px] leading-relaxed">
                  Your account was provisioned with default password <span className="font-mono font-bold bg-amber-100 px-1 rounded">{user.defaultPassword || 'Mandi@123'}</span>. Before accessing trading &amp; mandi privileges, please define your new permanent password.
                </p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Current / Default Password */}
          <div>
            <label className="block text-xs font-bold text-[#56423b] mb-1">
              Current / Initial Default Password <span className="text-[#84726C] font-normal">(ప్రస్తుత పాస్‌వర్డ్)</span>
            </label>
            <div className="relative">
              <input
                type={showCurrent ? 'text' : 'password'}
                value={currentPasswordInput}
                onChange={(e) => setCurrentPasswordInput(e.target.value)}
                placeholder="Initial default password"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] font-mono focus:outline-hidden focus:border-[#983c0c] pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84726C] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined text-lg">
                  {showCurrent ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-xs font-bold text-[#56423b] mb-1">
              New Permanent Password <span className="text-[#84726C] font-normal">(కొత్త పాస్‌వర్డ్)</span>
            </label>
            <div className="relative">
              <input
                type={showNew ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter strong password (min 6 chars)"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84726C] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined text-lg">
                  {showNew ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Password Strength Meter */}
            {newPassword && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#84726C]">Strength:</span>
                  <span className={`font-bold ${strengthInfo.color}`}>{strengthInfo.text}</span>
                </div>
                <div className="h-1.5 w-full bg-stone-200 rounded-full overflow-hidden flex gap-0.5">
                  <div className={`h-full transition-all duration-300 ${strength >= 1 ? strengthInfo.barColor : 'bg-transparent'} w-1/4`}></div>
                  <div className={`h-full transition-all duration-300 ${strength >= 2 ? strengthInfo.barColor : 'bg-transparent'} w-1/4`}></div>
                  <div className={`h-full transition-all duration-300 ${strength >= 3 ? strengthInfo.barColor : 'bg-transparent'} w-1/4`}></div>
                  <div className={`h-full transition-all duration-300 ${strength >= 4 ? strengthInfo.barColor : 'bg-transparent'} w-1/4`}></div>
                </div>
              </div>
            )}
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="block text-xs font-bold text-[#56423b] mb-1">
              Confirm New Password <span className="text-[#84726C] font-normal">(పాస్‌వర్డ్ నిర్ధారణ)</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter new password"
              className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            {!isMandatory && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#56423b] hover:bg-stone-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">verified_user</span>
              <span>Save &amp; Enter Portal (సేవ్ చేయండి)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const UpdatePasswordModal: React.FC<UpdatePasswordModalProps> = ({
  isOpen,
  user,
  onClose,
  onSuccess,
  isMandatory = true,
}) => {
  if (!isOpen || !user) return null;

  return (
    <UpdatePasswordModalContent
      key={user.id}
      user={user}
      onClose={onClose}
      onSuccess={onSuccess}
      isMandatory={isMandatory}
    />
  );
};
