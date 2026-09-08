import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface AdminLoginScreenProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  onSwitchRole?: (role: 'merchant' | 'farmer') => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  onSwitchRole,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('9848011111');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [adminDesignation, setAdminDesignation] = useState('director');
  const [useDscToken, setUseDscToken] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const adminUsers = users.filter((u) => u.role === 'admin');

  const fillAdmin = (user: UserAccount) => {
    setPhoneNumber(user.phoneNumber);
    setPassword(user.password);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone) {
      setError('Please enter your 10-digit registered administrator mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your administrative password.');
      return;
    }

    const found = users.find(
      (u) => u.phoneNumber.replace(/\D/g, '').slice(-10) === cleanPhone
    );

    if (!found) {
      setError(`No administrative account registered with phone number +91 ${cleanPhone}.`);
      return;
    }

    if (found.role !== 'admin') {
      setError(`Phone number ${cleanPhone} belongs to a ${found.role.toUpperCase()} account. Please switch to the ${found.role.toUpperCase()} login screen.`);
      return;
    }

    if (found.status === 'suspended' || found.status === 'locked') {
      setError(`This administrative account is currently ${found.status}. Contact APMC Secretary.`);
      return;
    }

    if (found.password !== password) {
      setError('Incorrect administrative password. Default initial password is Admin@123.');
      return;
    }

    if (found.mustChangePassword) {
      onRequirePasswordChange(found);
    } else {
      onLoginSuccess(found);
    }
  };

  return (
    <div className="bg-[#111827] text-white rounded-3xl border border-stone-800 shadow-2xl overflow-hidden">
      {/* Official Government / APMC Command Header */}
      <div className="bg-linear-to-r from-[#983c0c] via-[#b8480f] to-[#1a1c1e] p-6 text-white border-b border-white/10 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-white text-[#983c0c] flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
              <span className="material-symbols-outlined text-3xl">shield_person</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-black/40 text-amber-300 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-400/30">
                  APMC Official Terminal
                </span>
                <span className="text-white/80 text-xs font-serif">అనంతపురం మార్కెట్ కమాండ్ సెంటర్</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-white tracking-tight mt-0.5">
                Director &amp; Administrator Command Login
              </h2>
              <p className="text-white/70 text-xs">
                Restricted access for Market Secretaries, Directors, and Weighbridge Auditors
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>128 Mandis Online</span>
            </div>
            <span className="text-[10px] text-white/60 font-mono mt-0.5">
              Govt DSC Gateway: ACTIVE
            </span>
          </div>
        </div>
      </div>

      {/* Role Switcher Links */}
      <div className="bg-black/40 px-6 py-2.5 border-b border-white/10 flex items-center justify-between text-xs flex-wrap gap-2">
        <span className="text-stone-400">
          Not an Administrator? Select your portal:
        </span>
        <div className="flex items-center gap-2">
          {onSwitchRole && (
            <>
              <button
                type="button"
                onClick={() => onSwitchRole('merchant')}
                className="px-3 py-1 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800/60 hover:bg-emerald-900 transition-colors font-medium flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">storefront</span>
                <span>Merchant / Trader Login</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('farmer')}
                className="px-3 py-1 rounded-lg bg-amber-950 text-amber-300 border border-amber-800/60 hover:bg-amber-900 transition-colors font-medium flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">agriculture</span>
                <span>రైతు యాప్ (Farmer Login)</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8 space-y-6">
        {error && (
          <div className="p-4 bg-red-950/80 border border-red-800/60 rounded-2xl text-xs text-red-200 flex items-center gap-3">
            <span className="material-symbols-outlined text-lg shrink-0 text-red-400">error</span>
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number (User Number) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-300 mb-1.5">
                Official User Number (Phone) <span className="text-amber-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-stone-400">
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10-digit administrator mobile"
                  className="w-full bg-stone-900/90 border border-stone-700 rounded-xl pl-12 pr-3.5 py-3 text-sm font-mono text-white placeholder-stone-500 focus:outline-hidden focus:border-[#983c0c] focus:ring-1 focus:ring-[#983c0c]"
                  required
                />
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                Primary Government User ID assigned at appointment
              </span>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-300">
                  Administrative Key / Password <span className="text-amber-400">*</span>
                </label>
                <span className="text-[10px] text-amber-400/90 font-mono">
                  Default: Admin@123
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password"
                  className="w-full bg-stone-900/90 border border-stone-700 rounded-xl px-3.5 py-3 text-sm font-mono text-white placeholder-stone-500 focus:outline-hidden focus:border-[#983c0c] focus:ring-1 focus:ring-[#983c0c] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              <span className="text-[10px] text-stone-400 mt-1 block">
                First-time sign-ins will prompt for mandatory credential change
              </span>
            </div>
          </div>

          {/* Department Designation Select */}
          <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800">
            <div className="text-xs font-bold uppercase tracking-wider text-stone-300 mb-2 flex items-center justify-between">
              <span>Department Authorization:</span>
              <span className="text-[10px] text-stone-400 font-normal">Multi-zone governance</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'director', label: 'APMC Director', sub: 'డైరెక్టర్' },
                { id: 'secretary', label: 'Market Secretary', sub: 'కార్యదర్శి' },
                { id: 'superintendent', label: 'Weighment Head', sub: 'తూకం హెడ్' },
                { id: 'audit', label: 'Escrow Auditor', sub: 'ఎస్క్రో అధికారి' },
              ].map((pos) => (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => setAdminDesignation(pos.id)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                    adminDesignation === pos.id
                      ? 'bg-[#983c0c] text-white border-amber-400/50 shadow-xs'
                      : 'bg-stone-800/60 text-stone-300 border-stone-700 hover:bg-stone-800'
                  }`}
                >
                  <div className="font-bold">{pos.label}</div>
                  <div className="text-[10px] opacity-75 font-serif">{pos.sub}</div>
                </button>
              ))}
            </div>

            {/* Security DSC Toggle */}
            <div className="mt-3 pt-3 border-t border-stone-800 flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-300 select-none">
                <input
                  type="checkbox"
                  checked={useDscToken}
                  onChange={(e) => setUseDscToken(e.target.checked)}
                  className="rounded border-stone-700 text-[#983c0c] focus:ring-0"
                />
                <span>Attach Class-3 Digital Signature Certificate (DSC Token)</span>
              </label>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">verified</span>
                e-Sign Ready
              </span>
            </div>
          </div>

          {/* Quick 1-Click Demo Profiles */}
          <div className="bg-stone-900/40 p-4 rounded-2xl border border-stone-800/80">
            <div className="flex items-center justify-between text-xs font-bold text-stone-300 mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-amber-400">bolt</span>
                <span>Select Registered Admin Account:</span>
              </span>
              <span className="text-[10px] text-stone-400 font-mono">1-Click Autofill</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {adminUsers.map((admin) => (
                <button
                  key={admin.id}
                  type="button"
                  onClick={() => fillAdmin(admin)}
                  className={`p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    phoneNumber === admin.phoneNumber
                      ? 'bg-stone-800 border-amber-500/50 text-white'
                      : 'bg-stone-900/80 border-stone-800 text-stone-300 hover:bg-stone-800/80'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span>{admin.name}</span>
                      {admin.teluguName && <span className="text-stone-400 font-serif text-[11px]">({admin.teluguName})</span>}
                    </div>
                    <div className="text-[11px] font-mono text-amber-400 mt-0.5">
                      +91 {admin.phoneNumber}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      Pwd: {admin.password}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-stone-800 text-stone-300 border border-stone-700">
                    Use &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 bg-linear-to-r from-[#983c0c] to-[#b8480f] hover:from-[#7e2c00] hover:to-[#983c0c] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">admin_panel_settings</span>
            <span>Authenticate to APMC Mandi Command OS</span>
          </button>
        </form>

        {/* Security Footer Notice */}
        <div className="pt-2 text-center text-[11px] text-stone-500 flex items-center justify-center gap-2 border-t border-stone-800/60">
          <span className="material-symbols-outlined text-xs text-amber-500">lock</span>
          <span>
            Agricultural Marketing Directorate, Government of AP. Unauthorized attempts are logged.
          </span>
        </div>
      </div>
    </div>
  );
};
