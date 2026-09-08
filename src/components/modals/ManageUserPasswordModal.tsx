import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface ManageUserPasswordModalProps {
  isOpen: boolean;
  user: UserAccount | null;
  onClose: () => void;
  onUpdatePassword: (userId: string, newPassword: string, requireChangeOnNextLogin: boolean) => void;
}

export const ManageUserPasswordModal: React.FC<ManageUserPasswordModalProps> = ({
  isOpen,
  user,
  onClose,
  onUpdatePassword
}) => {
  if (!isOpen || !user) return null;

  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [requireChange, setRequireChange] = useState(true);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const generateRandomPassword = () => {
    const prefixes = ['Mandi', 'Agro', 'Kisan', 'APMC', 'Rayala'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const num = Math.floor(1000 + Math.random() * 9000);
    const generated = `${prefix}@${num}`;
    setNewPassword(generated);
    setRequireChange(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    onUpdatePassword(user.id, newPassword, requireChange);
    setSuccessNotice(`Password updated for ${user.name}`);
    setTimeout(() => {
      setSuccessNotice(null);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#DDC0B6]/60 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1c1e] text-white p-5 px-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#983c0c] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">admin_panel_settings</span>
            </div>
            <div>
              <h3 className="text-base font-bold font-serif leading-snug">
                Admin Password Control (పాస్‌వర్డ్ నిర్వహణ)
              </h3>
              <p className="text-white/70 text-xs">
                Define, update or reset credentials for {user.name}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* User Card */}
        <div className="bg-[#FAF8F5] p-4 px-6 border-b border-[#EDE7DD] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#1a1c1e]">{user.name}</span>
              {user.teluguName && <span className="text-[#84726C] text-xs">({user.teluguName})</span>}
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                user.role === 'admin' ? 'bg-[#ffdbd0] text-[#983c0c]' :
                user.role === 'merchant' ? 'bg-emerald-100 text-emerald-800' :
                'bg-amber-100 text-amber-900'
              }`}>
                {user.role}
              </span>
            </div>
            <div className="text-xs text-[#56423b] mt-0.5 flex items-center gap-2">
              <span>Phone / User ID: <strong className="font-mono text-[#1a1c1e]">{user.phoneNumber}</strong></span>
              <span>•</span>
              <span>{user.fpoOrFirm || 'General'}</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-[#84726C] block">Password Status</span>
            <span className={`text-[11px] font-bold ${user.mustChangePassword ? 'text-amber-700' : 'text-emerald-700'}`}>
              {user.mustChangePassword ? '⚠️ Default Active (Must Update)' : '✅ Permanent Set'}
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {successNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{successNotice}</span>
            </div>
          )}

          {/* Current Password Peek for Admin */}
          <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-xs text-[#84726C] block font-medium">Current Stored Password:</span>
              <span className="font-mono text-sm font-bold text-[#1a1c1e]">
                {showCurrentPassword ? user.password : '••••••••••••'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="px-2.5 py-1 text-xs text-[#56423b] hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">
                {showCurrentPassword ? 'visibility_off' : 'visibility'}
              </span>
              <span>{showCurrentPassword ? 'Hide' : 'Reveal'}</span>
            </button>
          </div>

          {/* Define New Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#56423b]">
                Define New Password <span className="text-[#84726C] font-normal">(కొత్త పాస్‌వర్డ్ నిర్ణయించండి)</span>
              </label>
              <button
                type="button"
                onClick={generateRandomPassword}
                className="text-[11px] font-bold text-[#983c0c] hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-xs">auto_fix_high</span>
                <span>Generate Default</span>
              </button>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="e.g. Mandi@2026 or custom password"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm font-mono text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#84726C] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined text-lg">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
            <p className="text-[11px] text-[#84726C] mt-1">
              This will update the login credential associated with user phone number <span className="font-mono font-bold text-[#1a1c1e]">{user.phoneNumber}</span>.
            </p>
          </div>

          {/* Force Password Change Flag */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-2xl">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={requireChange}
                onChange={(e) => setRequireChange(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#983c0c] focus:ring-[#983c0c] border-[#DDC0B6]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#1a1c1e] block">
                  Force user to update password on next login
                </span>
                <span className="text-[#84726C] text-[11px] leading-relaxed block mt-0.5">
                  వినియోగదారుడు లాగిన్ అయిన వెంటనే కొత్త పాస్‌వర్డ్ అడుగుతుంది (Shows "Update New Password" dialog upon login).
                </span>
              </div>
            </label>
          </div>

          {/* Footer Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#56423b] hover:bg-stone-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">key</span>
              <span>Update User Password</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
