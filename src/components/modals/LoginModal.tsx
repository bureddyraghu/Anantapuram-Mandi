import React, { useState } from 'react';
import { UserAccount, UserRole } from '../../types';

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

  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Quick autofill demo credentials
  const fillCredentials = (role: UserRole) => {
    setSelectedRole(role);
    const candidate = users.find((u) => u.role === role);
    if (candidate) {
      setPhoneNumber(candidate.phoneNumber);
      setPassword(candidate.password);
      setError(null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone) {
      setError('Please enter your 10-digit registered phone number (మొబైల్ సంఖ్యను నమోదు చేయండి)');
      return;
    }
    if (!password) {
      setError('Please enter your password (పాస్‌వర్డ్ నమోదు చేయండి)');
      return;
    }

    // Match user by phone number
    const foundUser = users.find((u) => u.phoneNumber.replace(/\D/g, '').slice(-10) === cleanPhone);

    if (!foundUser) {
      setError(`No account found with phone number ${cleanPhone}. Please check or ask Mandi Admin.`);
      return;
    }

    if (foundUser.status === 'suspended' || foundUser.status === 'locked') {
      setError(`This account is currently ${foundUser.status}. Please contact APMC Mandi Administrator.`);
      return;
    }

    if (foundUser.password !== password) {
      setError('Incorrect password. If this is your first login, please use your initial default password.');
      return;
    }

    // If user requires mandatory password change
    if (foundUser.mustChangePassword) {
      onRequirePasswordChange(foundUser);
    } else {
      onLoginSuccess(foundUser);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#DDC0B6]/60 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1c1e] text-white p-6 relative">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#983c0c] text-white flex items-center justify-center shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-2xl">passkey</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#983c0c] text-white">
                  APMC Secure Access
                </span>
                <span className="text-white/60 text-xs font-serif">మండి ప్రవేశ పోర్టల్</span>
              </div>
              <h3 className="text-lg font-bold font-serif leading-snug mt-1">
                Unified Mandi Corridor Login
              </h3>
              <p className="text-white/70 text-xs">
                Login based on your role: Admin, Merchant/Buyer, or Farmer
              </p>
            </div>
          </div>

          {onClose && (
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          )}
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-[#FAF8F5] border-b border-[#EDE7DD] p-3 px-6">
          <div className="text-[11px] font-bold text-[#56423b] mb-2 flex items-center justify-between">
            <span>SELECT ACCESS ROLE (పోర్టల్ పాత్ర):</span>
            <span className="text-[10px] text-[#84726C]">Directs to role-specific portal</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'admin', label: 'Admin', telugu: 'అడ్మిన్', icon: 'shield_person', color: 'bg-[#983c0c]' },
              { id: 'merchant', label: 'Merchant', telugu: 'వ్యాపారి', icon: 'storefront', color: 'bg-[#1A3026]' },
              { id: 'farmer', label: 'Farmer', telugu: 'రైతు యాప్', icon: 'nature_people', color: 'bg-[#2A5C3B]' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => fillCredentials(tab.id as UserRole)}
                className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-0.5 border ${
                  selectedRole === tab.id
                    ? `${tab.color} text-white border-transparent shadow-xs`
                    : 'bg-white text-[#56423b] border-[#DDC0B6] hover:bg-stone-100'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                <span className="leading-tight">{tab.label}</span>
                <span className={`text-[10px] ${selectedRole === tab.id ? 'text-white/80' : 'text-[#84726C]'}`}>
                  {tab.telugu}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
              <span className="material-symbols-outlined text-base shrink-0">error</span>
              <span>{error}</span>
            </div>
          )}

          {/* User Number (Phone Number) */}
          <div>
            <label className="block text-xs font-bold text-[#56423b] mb-1">
              User Number (Phone Number) <span className="text-red-600">* (యూజర్ ఫోన్ నంబర్)</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#84726C]">
                +91
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl pl-12 pr-3.5 py-2.5 text-sm font-mono font-bold text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                required
              />
            </div>
            <span className="text-[10px] text-[#84726C] mt-1 block">
              Your registered mobile number serves as your default user identification.
            </span>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-[#56423b]">
                Password <span className="text-red-600">* (రహస్య పదం)</span>
              </label>
              <span className="text-[10px] text-[#84726C]">
                Default is set by Mandi Admin
              </span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] font-mono focus:outline-hidden focus:border-[#983c0c] pr-10"
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
          </div>

          {/* One-Click Quick Demo Credentials Pill Bar */}
          <div className="pt-1">
            <div className="text-[11px] font-bold text-[#56423b] mb-1.5 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-[#983c0c]">bolt</span>
              <span>Quick One-Click Demo Credentials:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 text-left">
              <button
                type="button"
                onClick={() => fillCredentials('admin')}
                className="p-2 bg-[#FAF8F5] hover:bg-stone-100 border border-[#EDE7DD] rounded-xl text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-[#983c0c]">🛡️ Admin</div>
                <div className="text-[10px] font-mono text-[#56423b]">9848011111</div>
                <div className="text-[9px] text-[#84726C]">Pwd: Admin@123</div>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('merchant')}
                className="p-2 bg-[#FAF8F5] hover:bg-stone-100 border border-[#EDE7DD] rounded-xl text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-emerald-800">🏢 Merchant</div>
                <div className="text-[10px] font-mono text-[#56423b]">9845011982</div>
                <div className="text-[9px] text-amber-800 font-semibold">⚡ Triggers Pwd Reset</div>
              </button>

              <button
                type="button"
                onClick={() => fillCredentials('farmer')}
                className="p-2 bg-[#FAF8F5] hover:bg-stone-100 border border-[#EDE7DD] rounded-xl text-left transition-colors"
              >
                <div className="text-[11px] font-bold text-amber-900">🌾 Farmer</div>
                <div className="text-[10px] font-mono text-[#56423b]">9440123891</div>
                <div className="text-[9px] text-amber-800 font-semibold">⚡ Triggers Pwd Reset</div>
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-[#983c0c] hover:bg-[#7e2c00] text-white text-sm font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">login</span>
              <span>Login to {selectedRole === 'admin' ? 'Mandi OS' : selectedRole === 'merchant' ? 'Merchant Portal' : 'Farmer App'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
