import React, { useState } from 'react';
import { UserAccount } from '../types';

interface FarmerLoginViewProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
  onBackToApp?: () => void;
}

export const FarmerLoginView: React.FC<FarmerLoginViewProps> = ({
  users,
  onLoginSuccess,
  onRequirePasswordChange,
  onBackToApp,
}) => {
  const [authMode, setAuthMode] = useState<'password' | 'otp'>('password');
  const [phoneNumber, setPhoneNumber] = useState('9440123891');
  const [password, setPassword] = useState('Farmer@123');
  const [showPassword, setShowPassword] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [simulatedOtpSent, setSimulatedOtpSent] = useState(false);
  const [audioPromptPlaying, setAudioPromptPlaying] = useState(false);
  const [districtMandi, setDistrictMandi] = useState('anantapur');
  const [error, setError] = useState<string | null>(null);

  const farmerUsers = users.filter((u) => u.role === 'farmer');

  const fillFarmer = (user: UserAccount) => {
    setPhoneNumber(user.phoneNumber);
    setPassword(user.password);
    setError(null);
  };

  const handlePlayVoiceGuide = () => {
    setAudioPromptPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        'నమస్కారం రైతు సోదరులారా. మీ పది అంకెల మొబైల్ నంబర్ మరియు పాస్ వర్డ్ నమోదు చేసి అనంతపురం మండి రైతు యాప్ లోకి లాగిన్ అవ్వండి.'
      );
      utterance.lang = 'te-IN';
      utterance.rate = 0.9;
      utterance.onend = () => setAudioPromptPlaying(false);
      utterance.onerror = () => setAudioPromptPlaying(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setAudioPromptPlaying(false), 3000);
    }
  };

  const handleSendOtp = () => {
    const cleanPhone = phoneNumber.trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone) {
      setError('దయచేసి మీ 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి (Enter 10-digit mobile number)');
      return;
    }
    setSimulatedOtpSent(true);
    setOtpCode('4821');
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cleanPhone = phoneNumber.trim().replace(/\D/g, '').slice(-10);
    if (!cleanPhone) {
      setError('దయచేసి మీ 10 అంకెల మొబైల్ నంబర్ నమోదు చేయండి (Enter 10-digit mobile number)');
      return;
    }

    const found = users.find(
      (u) => u.phoneNumber.replace(/\D/g, '').slice(-10) === cleanPhone
    );

    if (!found) {
      setError(`+91 ${cleanPhone} నంబర్‌తో రైతు ఖాతా నమోదు కాలేదు. దయచేసి సమీప మండిలో నమోదు చేసుకోండి. (No farmer account found).`);
      return;
    }

    if (found.role !== 'farmer') {
      setError(`ఈ మొబైల్ నంబర్ రైతు ఖాతా కాదు. ఈ పోర్టల్ ధృవీకరించబడిన రైతులకు మాత్రమే కేటాయించబడింది. (Farmer accounts only).`);
      return;
    }

    if (found.status === 'suspended' || found.status === 'locked') {
      setError(`ఈ ఖాతా ప్రస్తుతం నిలిపివేయబడింది (${found.status}). దయచేసి మండి ఆఫీసును సంప్రదించండి.`);
      return;
    }

    if (authMode === 'password') {
      if (!password) {
        setError('దయచేసి మీ పాస్‌వర్డ్ నమోదు చేయండి (Enter password)');
        return;
      }
      if (found.password !== password) {
        setError('తప్పుడు పాస్‌వర్డ్. ప్రాథమిక పాస్‌వర్డ్: Farmer@123 (Incorrect password)');
        return;
      }
    } else {
      if (!otpCode || otpCode.length < 4) {
        setError('దయచేసి 4 అంకెల OTP కోడ్‌ను నమోదు చేయండి (Enter 4-digit OTP)');
        return;
      }
    }

    if (found.mustChangePassword) {
      onRequirePasswordChange(found);
    } else {
      onLoginSuccess(found);
    }
  };

  return (
    <div className="min-h-[calc(100vh-100px)] py-6 px-4 flex flex-col justify-center items-center bg-[#FAF7F2]">
      {onBackToApp && (
        <div className="max-w-xl w-full mb-3 flex justify-start">
          <button
            type="button"
            onClick={onBackToApp}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2A5C3B] hover:text-[#1E432B] bg-white px-3.5 py-2 rounded-xl border border-[#c9ead9] shadow-2xs transition-colors"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>రైతు యాప్‌కి తిరిగి వెళ్లండి (Return to Farmer App)</span>
          </button>
        </div>
      )}

      <div className="bg-white text-[#1a1c1e] rounded-3xl border border-[#DDC0B6] shadow-2xl overflow-hidden max-w-xl w-full">
        {/* Kisan / Farmer Banner Header */}
        <div className="bg-linear-to-r from-[#2A5C3B] via-[#244f33] to-[#1A3026] text-white p-6 sm:p-7 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg shrink-0 border-2 border-amber-300">
                <span className="material-symbols-outlined text-3xl">agriculture</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-amber-500/30 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
                    రైతు మార్కెట్ వ్యవస్థ
                  </span>
                  <span className="text-emerald-200 text-xs font-mono font-bold">RYTHU KISAN PORTAL</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white tracking-tight mt-0.5">
                  రైతు లాగిన్ (Farmer Login)
                </h1>
                <p className="text-emerald-100/90 text-xs mt-0.5">
                  రైతులకు మాత్రమే ప్రత్యేకం • 0% కమీషన్ • T+0 బ్యాంక్ చెల్లింపులు
                </p>
              </div>
            </div>

            {/* Telugu Voice Audio Guide Button */}
            <button
              type="button"
              onClick={handlePlayVoiceGuide}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                audioPromptPlaying
                  ? 'bg-amber-400 text-amber-950 border-amber-300 animate-pulse shadow-md'
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {audioPromptPlaying ? 'volume_up' : 'campaign'}
              </span>
              <span>{audioPromptPlaying ? 'వాయిస్ ప్లే అవుతోంది...' : '🔊 వాయిస్ సహాయం'}</span>
            </button>
          </div>

          {/* Farmer Benefits Ribbon */}
          <div className="mt-5 pt-3.5 border-t border-emerald-700/60 grid grid-cols-3 gap-2 text-center text-[11px] text-emerald-100 font-medium">
            <div className="bg-emerald-900/40 py-2 px-2 rounded-xl border border-emerald-700/40">
              ✨ 0% బ్రోకరేజ్ / కమీషన్
            </div>
            <div className="bg-emerald-900/40 py-2 px-2 rounded-xl border border-emerald-700/40">
              ⚖️ సర్టిఫైడ్ డిజిటల్ తూకం
            </div>
            <div className="bg-emerald-900/40 py-2 px-2 rounded-xl border border-emerald-700/40">
              💰 T+0 నేరుగా బ్యాంక్ ఖాతాకు
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

          {/* Authentication Mode Tabs */}
          <div className="bg-[#EFE9DF] p-1 rounded-xl flex gap-1 border border-[#DDC0B6]">
            <button
              type="button"
              onClick={() => setAuthMode('password')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'password'
                  ? 'bg-[#2A5C3B] text-white shadow-xs'
                  : 'text-[#56423b] hover:bg-stone-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">lock</span>
              <span>పాస్‌వర్డ్ లాగిన్ (Password)</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('otp')}
              className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                authMode === 'otp'
                  ? 'bg-[#2A5C3B] text-white shadow-xs'
                  : 'text-[#56423b] hover:bg-stone-200/50'
              }`}
            >
              <span className="material-symbols-outlined text-sm">sms</span>
              <span>OTP కోడ్ లాగిన్ (Instant SMS)</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* APMC Mandi Selection */}
            <div>
              <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider mb-1">
                సమీప మండి కేంద్రం (Select APMC Mandi)
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
                  location_on
                </span>
                <select
                  value={districtMandi}
                  onChange={(e) => setDistrictMandi(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-[#DDC0B6] rounded-xl text-xs font-medium text-[#1a1c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A5C3B]"
                >
                  <option value="anantapur">APMC Anantapur Market Yard (అనంతపురం)</option>
                  <option value="madanapalle">APMC Madanapalle Tomato Yard (మదనపల్లె)</option>
                  <option value="kolar">APMC Kolar Mega Market Yard (కోలార్)</option>
                  <option value="khammam">APMC Khammam Chilli Market (ఖమ్మం)</option>
                </select>
              </div>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider mb-1">
                మొబైల్ నంబర్ (10-Digit Registered Mobile Number)
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
                  placeholder="9440123891"
                  className="w-full pl-18 pr-4 py-3 bg-stone-50 border border-[#DDC0B6] rounded-xl text-sm font-mono font-bold text-[#1a1c1e] placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A5C3B]"
                  required
                />
              </div>
            </div>

            {authMode === 'password' ? (
              /* Password Field */
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider">
                    రహస్య పాస్‌వర్డ్ (Secret Password)
                  </label>
                  <span className="text-[11px] text-stone-500">
                    డిఫాల్ట్: <code className="font-bold text-[#2A5C3B]">Farmer@123</code>
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
                    className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-[#DDC0B6] rounded-xl text-sm font-medium text-[#1a1c1e] placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A5C3B]"
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
            ) : (
              /* OTP Code Field */
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-[#56423b] uppercase tracking-wider">
                    OTP ధృవీకరణ కోడ్ (One-Time Password)
                  </label>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="text-xs font-bold text-[#2A5C3B] hover:underline"
                  >
                    {simulatedOtpSent ? 'రీసెండ్ చేయండి (Resend OTP)' : 'OTP పంపండి (Get OTP)'}
                  </button>
                </div>

                {simulatedOtpSent && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-sm text-emerald-600">mark_email_read</span>
                      <span>డెమో OTP పంపబడింది: <strong className="font-mono text-sm">4821</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOtpCode('4821')}
                      className="px-2 py-1 bg-emerald-600 text-white rounded text-[10px] font-bold"
                    >
                      ఆటో ఫిల్ (Auto-fill)
                    </button>
                  </div>
                )}

                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
                    pin
                  </span>
                  <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="4821"
                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-[#DDC0B6] rounded-xl text-base font-mono font-bold tracking-widest text-[#1a1c1e] text-center placeholder-stone-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2A5C3B]"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-[#2A5C3B] hover:bg-[#1E432B] text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">agriculture</span>
              <span>రైతు యాప్‌లోకి లాగిన్ అవ్వండి (Login to Farmer App)</span>
            </button>
          </form>

          {/* Quick 1-Click Farmer Account Selection */}
          <div className="pt-4 border-t border-[#EDE7DD]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#56423b] uppercase tracking-wider">
                రిజిస్టర్డ్ రైతు డెమో ఖాతాలు (Quick Farmer Select):
              </span>
              <span className="text-[10px] text-stone-500">1-క్లిక్ ద్వారా ఎంచుకోండి</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {farmerUsers.map((farmer) => (
                <button
                  key={farmer.id}
                  type="button"
                  onClick={() => fillFarmer(farmer)}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs flex items-center justify-between ${
                    phoneNumber === farmer.phoneNumber
                      ? 'bg-emerald-50 border-[#2A5C3B] ring-1 ring-[#2A5C3B]'
                      : 'bg-stone-50 border-stone-200 hover:bg-white'
                  }`}
                >
                  <div>
                    <div className="font-bold text-[#1a1c1e] flex items-center gap-1.5">
                      <span>{farmer.name}</span>
                      {farmer.teluguName && (
                        <span className="text-[#2A5C3B] text-[11px] font-normal">
                          ({farmer.teluguName})
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono">
                      +91 {farmer.phoneNumber}
                    </div>
                  </div>
                  <span className="material-symbols-outlined text-emerald-700 text-sm">
                    touch_app
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Kisan Support Footer */}
          <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#EDE7DD] text-center text-xs text-stone-600">
            <span className="font-bold text-[#2A5C3B]">రైతు సహాయ కేంద్రం (Toll Free):</span>{' '}
            <span className="font-mono font-bold text-stone-800">1800-425-3535</span> • APMC Anantapur
          </div>
        </div>
      </div>
    </div>
  );
};
