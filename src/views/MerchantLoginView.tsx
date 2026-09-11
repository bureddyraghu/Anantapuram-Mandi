import React, { useState } from 'react';
import { UserAccount } from '../types';

interface MerchantLoginViewProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  onBackToApp?: () => void;
}

export const MerchantLoginView: React.FC<MerchantLoginViewProps> = ({
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  onBackToApp,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('9845011982');
  const [password, setPassword] = useState('Mandi@123');
  const [showPassword, setShowPassword] = useState(false);
  const [tradingSegment, setTradingSegment] = useState<'spot' | 'rfq' | 'export'>('spot');
  const [licenseNumber, setLicenseNumber] = useState('APMC/ATP/TR-4891');
  const [error, setError] = useState<string | null>(null);

  const merchantUsers = users.filter((u) => u.role === 'merchant');

  const fillMerchant = (user: UserAccount) => {
    setPhoneNumber(user.phoneNumber);
    setPassword(user.password);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone) {
      setError('Please enter your 10-digit registered merchant mobile number.');
      return;
    }
    if (!password) {
      setError('Please enter your trading portal password.');
      return;
    }

    const found = users.find(
      (u) => u.phoneNumber.replace(/\D/g, '').slice(-10) === cleanPhone
    );

    if (!found) {
      setError(`No registered trader or buyer account found with mobile number +91 ${cleanPhone}.`);
      return;
    }

    if (found.role !== 'merchant') {
      setError(`Mobile number +91 ${cleanPhone} does not have Merchant/Buyer privileges. This terminal is strictly for registered APMC traders and produce buyers.`);
      return;
    }

    if (found.status === 'suspended' || found.status === 'locked') {
      setError(`Your merchant trading account is currently ${found.status}. Contact Anantapur APMC Licensing Section.`);
      return;
    }

    if (found.password !== password) {
      setError('Invalid trading password. If your account was newly provisioned by Mandi Admin, use the default password Mandi@123.');
      return;
    }

    if (found.mustChangePassword) {
      onRequirePasswordChange(found);
    } else {
      onLoginSuccess(found);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] py-6 px-4 flex flex-col justify-center items-center bg-[#FAF8F5]">
      {onBackToApp && (
        <div className="max-w-xl w-full mb-3 flex justify-start">
          <button
            type="button"
            onClick={onBackToApp}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1A3026] hover:text-black bg-white px-3.5 py-2 rounded-xl border border-[#adcebe] shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Return to Merchant / Buyer Portal (వ్యాపారి పోర్టల్)</span>
          </button>
        </div>
      )}

      <div className="bg-white text-[#1a1c1e] rounded-3xl border border-[#DDC0B6] shadow-2xl overflow-hidden max-w-xl w-full">
        {/* Merchant / Buyer Header */}
        <div className="bg-[#1A3026] text-white p-6 sm:p-7 relative border-b border-[#2D5A43]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-3xl shadow-lg shrink-0 border border-emerald-500/40">
                <span className="material-symbols-outlined text-3xl">storefront</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-emerald-800 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-600/40">
                    APMC Licensed Buyer Gateway
                  </span>
                  <span className="text-emerald-300 text-xs font-serif">వ్యాపారి &amp; ట్రేడర్ పోర్టల్</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mt-0.5">
                  Merchant &amp; Buyer Login
                </h1>
                <p className="text-emerald-200/80 text-xs mt-0.5">
                  e-Procurement Terminal • T+0 Escrow • B2B Direct Trade Desk
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider">MANDI NETWORK</span>
              <span className="text-xs font-bold text-white">APMC Unified Corridor</span>
              <span className="text-[10px] text-emerald-300/80">Secured Trade Desk</span>
            </div>
          </div>

          {/* Quick Stats Ribbon */}
          <div className="mt-5 pt-3.5 border-t border-emerald-800/60 grid grid-cols-3 gap-2 text-center text-[11px] text-emerald-100 font-medium">
            <div className="bg-emerald-900/50 py-2 px-2 rounded-xl border border-emerald-700/40">
              ⚡ Real-Time Floor Bids
            </div>
            <div className="bg-emerald-900/50 py-2 px-2 rounded-xl border border-emerald-700/40">
              🔒 T+0 Escrow Settlement
            </div>
            <div className="bg-emerald-900/50 py-2 px-2 rounded-xl border border-emerald-700/40">
              📜 e-NAM Unified License
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 md:p-8 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-center gap-3">
              <span className="material-symbols-outlined text-lg shrink-0 text-red-600">error</span>
              <div className="flex-1 font-medium">{error}</div>
            </div>
          )}

          {/* Trading Segment Switcher */}
          <div>
            <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider mb-1.5">
              Select Trading Desk Segment
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTradingSegment('spot')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  tradingSegment === 'spot'
                    ? 'bg-[#1A3026] text-white border-[#1A3026] shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                Spot Auctions
              </button>
              <button
                type="button"
                onClick={() => setTradingSegment('rfq')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  tradingSegment === 'rfq'
                    ? 'bg-[#1A3026] text-white border-[#1A3026] shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                B2B Volume RFQs
              </button>
              <button
                type="button"
                onClick={() => setTradingSegment('export')}
                className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all text-center ${
                  tradingSegment === 'export'
                    ? 'bg-[#1A3026] text-white border-[#1A3026] shadow-xs'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-white'
                }`}
              >
                Inter-State Transit
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* APMC License / GSTIN */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider">
                  APMC Trading License / GSTIN
                </label>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  VERIFIED TRADER
                </span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
                  badge
                </span>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="APMC/ATP/TR-4891"
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-[#DDC0B6] rounded-xl text-xs font-mono font-bold text-[#1a1c1e] placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3026]"
                />
              </div>
            </div>

            {/* Merchant Registered Phone */}
            <div>
              <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider mb-1">
                Registered Merchant Mobile Number
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs font-bold text-stone-500 border-r border-stone-300 pr-2">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  maxLength={10}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="9845011982"
                  className="w-full pl-18 pr-4 py-3 bg-stone-50 border border-[#DDC0B6] rounded-xl text-sm font-mono font-bold text-[#1a1c1e] placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3026]"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider">
                  Trading Terminal Password
                </label>
                <span className="text-[11px] text-stone-500">
                  Default: <code className="font-bold text-[#1A3026]">Mandi@123</code>
                </span>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
                  key
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-[#DDC0B6] rounded-xl text-sm font-medium text-[#1a1c1e] placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1A3026]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#1A3026] hover:bg-[#14261e] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">login</span>
              <span>Sign In to Merchant Terminal (వ్యాపారి లాగిన్)</span>
            </button>
          </form>

          {/* Quick 1-Click Merchant Account Selection */}
          <div className="pt-4 border-t border-[#EDE7DD]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#56423b] uppercase tracking-wider">
                Quick Merchant Account Select:
              </span>
              <span className="text-[10px] text-stone-500">1-Click Fast Auth</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {merchantUsers.map((merchant) => (
                <button
                  key={merchant.id}
                  type="button"
                  onClick={() => fillMerchant(merchant)}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs flex items-center justify-between ${
                    phoneNumber === merchant.phoneNumber
                      ? 'bg-emerald-50 border-[#1A3026] ring-1 ring-[#1A3026]'
                      : 'bg-stone-50 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#1a1c1e] truncate max-w-[180px]">
                      {merchant.name}
                    </div>
                    <div className="text-[10px] text-[#56423b] truncate max-w-[180px]">
                      {merchant.fpoOrFirm}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      +91 {merchant.phoneNumber}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-emerald-800 text-sm">
                    touch_app
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Trader Security Badge */}
          <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/80 flex items-center justify-between text-xs text-emerald-950">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-emerald-700 text-base">verified_user</span>
              <span>APMC Licensed Escrow Protected Gateway</span>
            </div>
            <span className="font-mono text-[10px] text-emerald-800 font-bold">SSL 256-BIT</span>
          </div>
        </div>
      </div>
    </div>
  );
};
