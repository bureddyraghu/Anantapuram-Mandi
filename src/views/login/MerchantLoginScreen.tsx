import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface MerchantLoginScreenProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  onSwitchRole?: (role: 'admin' | 'farmer') => void;
}

export const MerchantLoginScreen: React.FC<MerchantLoginScreenProps> = ({
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  onSwitchRole,
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
      setError(`Mobile number +91 ${cleanPhone} belongs to a ${found.role.toUpperCase()} account. Please switch to the ${found.role.toUpperCase()} login screen.`);
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
    <div className="bg-[#FAF8F5] text-[#1a1c1e] rounded-3xl border border-[#DDC0B6] shadow-2xl overflow-hidden">
      {/* Merchant / Buyer Header */}
      <div className="bg-[#1A3026] text-white p-6 relative border-b border-[#2D5A43]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 rounded-2xl bg-emerald-700 text-white flex items-center justify-center font-bold text-2xl shadow-lg shrink-0">
              <span className="material-symbols-outlined text-3xl">storefront</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-emerald-800 text-emerald-200 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-600/40">
                  APMC Licensed Buyer Gateway
                </span>
                <span className="text-emerald-300 text-xs font-serif">వ్యాపారి &amp; ట్రేడర్ పోర్టల్</span>
              </div>
              <h2 className="text-xl font-bold font-serif text-white tracking-tight mt-0.5">
                Merchant &amp; Buyer e-Procurement Terminal
              </h2>
              <p className="text-emerald-200/80 text-xs">
                Licensed Commission Agents, Exporters, Millers, and Institutional Aggregators
              </p>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end text-right">
            <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono font-bold">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>T+0 Escrow Clearing Active</span>
            </div>
            <span className="text-[10px] text-emerald-300/80 font-mono mt-0.5">
              ₹1.48 Cr Instant Trading Liquidity
            </span>
          </div>
        </div>

        {/* Live Market Ticker */}
        <div className="mt-4 pt-3 border-t border-emerald-800/60 flex items-center gap-4 text-xs font-mono overflow-x-auto text-emerald-200/90 py-0.5">
          <span className="font-bold text-amber-300 shrink-0">LIVE APMC RATES:</span>
          <span className="shrink-0">🍅 Tomato ₹38.50/kg ▲</span>
          <span className="text-emerald-600">|</span>
          <span className="shrink-0">🥜 Groundnut ₹72.00/kg ▲</span>
          <span className="text-emerald-600">|</span>
          <span className="shrink-0">🍋 Acid Lime ₹68.00/kg ▼</span>
          <span className="text-emerald-600">|</span>
          <span className="shrink-0">🌶️ Guntur Red Chilli ₹184.00/kg ▲</span>
        </div>
      </div>

      {/* Role Switcher Links */}
      <div className="bg-[#F0EBE1] px-6 py-2.5 border-b border-[#DDC0B6] flex items-center justify-between text-xs flex-wrap gap-2">
        <span className="text-[#56423b] font-medium">
          Need a different login terminal?
        </span>
        <div className="flex items-center gap-2">
          {onSwitchRole && (
            <>
              <button
                type="button"
                onClick={() => onSwitchRole('farmer')}
                className="px-3 py-1 rounded-lg bg-[#2A5C3B] text-white hover:bg-[#1E432B] transition-colors font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">agriculture</span>
                <span>రైతు యాప్ (Farmer Login)</span>
              </button>
              <button
                type="button"
                onClick={() => onSwitchRole('admin')}
                className="px-3 py-1 rounded-lg bg-[#983c0c] text-white hover:bg-[#7e2c00] transition-colors font-medium flex items-center gap-1.5 shadow-2xs"
              >
                <span className="material-symbols-outlined text-sm">shield_person</span>
                <span>Admin Command OS</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 md:p-8 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-800 flex items-center gap-3">
            <span className="material-symbols-outlined text-lg shrink-0 text-red-600">error</span>
            <div className="flex-1">{error}</div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Phone Number (Trader User ID) */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#56423b] mb-1.5">
                Merchant User Number (Phone) <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#84726C]">
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="10-digit registered mobile"
                  className="w-full bg-white border border-[#DDC0B6] rounded-xl pl-12 pr-3.5 py-3 text-sm font-mono text-[#1a1c1e] placeholder-stone-400 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700"
                  required
                />
              </div>
              <span className="text-[10px] text-[#84726C] mt-1 block">
                Your mobile number linked to APMC Trader License &amp; e-NAM
              </span>
            </div>

            {/* Trading Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#56423b]">
                  Trading Password <span className="text-red-600">*</span>
                </label>
                <span className="text-[10px] text-emerald-800 font-mono font-bold">
                  Initial: Mandi@123
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-white border border-[#DDC0B6] rounded-xl px-3.5 py-3 text-sm font-mono text-[#1a1c1e] placeholder-stone-400 focus:outline-hidden focus:border-emerald-700 focus:ring-1 focus:ring-emerald-700 pr-10"
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
              <span className="text-[10px] text-[#84726C] mt-1 block">
                Accounts using initial password will update to new password upon entry
              </span>
            </div>
          </div>

          {/* Trading Desk Segment Selection */}
          <div className="bg-white p-4 rounded-2xl border border-[#EDE7DD]">
            <div className="text-xs font-bold uppercase tracking-wider text-[#56423b] mb-2 flex items-center justify-between">
              <span>Select Procurement Segment:</span>
              <span className="text-[10px] text-[#84726C]">Multi-commodity clearing</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'spot', label: 'Spot Mandi Auction', desc: 'Direct lot bidding' },
                { id: 'rfq', label: 'Forward RFQ Contracts', desc: 'Pre-harvest booking' },
                { id: 'export', label: 'Inter-State Logistics', desc: 'Cold chain transit' },
              ].map((seg) => (
                <button
                  key={seg.id}
                  type="button"
                  onClick={() => setTradingSegment(seg.id as any)}
                  className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                    tradingSegment === seg.id
                      ? 'bg-[#1A3026] text-white border-emerald-600 shadow-xs'
                      : 'bg-[#FAF8F5] text-[#56423b] border-[#DDC0B6] hover:bg-stone-100'
                  }`}
                >
                  <div className="font-bold">{seg.label}</div>
                  <div className="text-[10px] opacity-75">{seg.desc}</div>
                </button>
              ))}
            </div>

            <div className="mt-3 pt-3 border-t border-[#EDE7DD] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-[#56423b]">
                <span className="material-symbols-outlined text-sm text-emerald-700">badge</span>
                <span>APMC Trader License: <strong>{licenseNumber}</strong></span>
              </div>
              <span className="text-[10px] text-emerald-800 font-mono font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                Verified Mandi Trader
              </span>
            </div>
          </div>

          {/* Quick Demo Merchant Accounts */}
          <div className="bg-white p-4 rounded-2xl border border-[#EDE7DD]">
            <div className="flex items-center justify-between text-xs font-bold text-[#56423b] mb-2">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-emerald-700">bolt</span>
                <span>Select Registered Merchant Account:</span>
              </span>
              <span className="text-[10px] text-[#84726C] font-mono">1-Click Test Login</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {merchantUsers.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => fillMerchant(m)}
                  className={`p-3 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    phoneNumber === m.phoneNumber
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                      : 'bg-[#FAF8F5] border-[#DDC0B6] text-[#1a1c1e] hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs flex items-center gap-1.5">
                      <span>{m.name}</span>
                      {m.teluguName && <span className="text-[#84726C] font-serif text-[11px]">({m.teluguName})</span>}
                    </div>
                    <div className="text-[11px] font-mono text-emerald-800 font-bold mt-0.5">
                      +91 {m.phoneNumber}
                    </div>
                    <div className="text-[10px] text-[#84726C]">
                      Firm: {m.fpoOrFirm || 'Licensed APMC Buyer'}
                    </div>
                    {m.mustChangePassword && (
                      <span className="inline-block text-[9px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded-md mt-1">
                        ⚡ First-time: Triggers Password Update
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-300 font-bold">
                    Select &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-3.5 bg-[#1A3026] hover:bg-[#14261e] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">login</span>
            <span>Sign In to APMC Merchant &amp; Buyer Portal</span>
          </button>
        </form>

        {/* Footer Support */}
        <div className="pt-2 text-center text-[11px] text-[#84726C] flex items-center justify-center gap-2 border-t border-[#EDE7DD]">
          <span className="material-symbols-outlined text-xs text-emerald-700">support_agent</span>
          <span>
            APMC Anantapur Trader Desk: 08554-245120 | support@apmc-anantapur.gov.in
          </span>
        </div>
      </div>
    </div>
  );
};
