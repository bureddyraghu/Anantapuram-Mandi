import React, { useState } from 'react';
import { UserAccount } from '../../types';

interface FarmerLoginScreenProps {
  users: UserAccount[];
  onLoginSuccess: (user: UserAccount) => void;
  onRequirePasswordChange: (user: UserAccount) => void;
}

export const FarmerLoginScreen: React.FC<FarmerLoginScreenProps> = ({
  users,
  onLoginSuccess,
  onRequirePasswordChange,
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
    <div className="bg-[#FAF7F2] text-[#1a1c1e] rounded-3xl border border-[#DDC0B6] shadow-2xl overflow-hidden max-w-xl mx-auto">
      {/* Kisan / Farmer Banner Header */}
      <div className="bg-linear-to-r from-[#2A5C3B] via-[#244f33] to-[#1A3026] text-white p-6 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-bold text-3xl shadow-lg shrink-0 border-2 border-amber-300">
              <span className="material-symbols-outlined text-3xl">agriculture</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-amber-500/30 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-amber-400/40">
                  రైతు భరోసా మార్కెట్
                </span>
                <span className="text-emerald-200 text-xs font-mono font-bold">KISAN PORTAL</span>
              </div>
              <h2 className="text-2xl font-bold font-serif text-white tracking-tight mt-0.5">
                రైతు లాగిన్ స్క్రీన్ (Farmer App)
              </h2>
              <p className="text-emerald-100/90 text-xs">
                నేరుగా మండి వేలంలో పాల్గొని గిట్టుబాటు ధర పొందండి
              </p>
            </div>
          </div>

          {/* Telugu Voice Audio Guide Button */}
          <button
            type="button"
            onClick={handlePlayVoiceGuide}
            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
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
        <div className="mt-4 pt-3 border-t border-emerald-700/60 grid grid-cols-3 gap-2 text-center text-[11px] text-emerald-100 font-medium">
          <div className="bg-emerald-900/40 py-1.5 px-2 rounded-lg">
            ✨ 0% కమీషన్
          </div>
          <div className="bg-emerald-900/40 py-1.5 px-2 rounded-lg">
            ⚖️ డిజిటల్ తూకం
          </div>
          <div className="bg-emerald-900/40 py-1.5 px-2 rounded-lg">
            💰 T+0 నగదు జమ
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
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
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
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMode === 'otp'
                ? 'bg-[#2A5C3B] text-white shadow-xs'
                : 'text-[#56423b] hover:bg-stone-200/50'
            }`}
          >
            <span className="material-symbols-outlined text-sm">sms</span>
            <span>SMS OTP లాగిన్</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rythu Phone Number */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2A5C3B] mb-1.5">
              రైతు మొబైల్ సంఖ్య (Phone Number as User ID) <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono font-bold text-[#84726C]">
                +91
              </span>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="10 అంకెల మొబైల్ సంఖ్య"
                className="w-full bg-white border-2 border-[#DDC0B6] rounded-xl pl-14 pr-4 py-3.5 text-base font-mono font-bold text-[#1a1c1e] placeholder-stone-400 focus:outline-hidden focus:border-[#2A5C3B]"
                required
              />
            </div>
            <span className="text-[11px] text-[#84726C] mt-1 block font-medium">
              మీ ఆధార్ లేదా పట్టాదార్ పాస్‌బుక్ లింక్ అయిన మొబైల్ నంబర్
            </span>
          </div>

          {/* Password or OTP Fields */}
          {authMode === 'password' ? (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2A5C3B]">
                  రహస్య పదం (PIN / Password) <span className="text-red-600">*</span>
                </label>
                <span className="text-[11px] text-amber-900 font-mono font-bold">
                  డిఫాల్ట్: Farmer@123
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="మీ పాస్‌వర్డ్ నమోదు చేయండి"
                  className="w-full bg-white border-2 border-[#DDC0B6] rounded-xl px-4 py-3.5 text-base font-mono text-[#1a1c1e] placeholder-stone-400 focus:outline-hidden focus:border-[#2A5C3B] pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#84726C] hover:text-[#1a1c1e]"
                >
                  <span className="material-symbols-outlined text-xl">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#2A5C3B]">
                  SMS OTP కోడ్ <span className="text-red-600">*</span>
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[11px] font-bold text-[#2A5C3B] underline hover:text-[#1A3026]"
                >
                  {simulatedOtpSent ? 'మరలా OTP పంపండి (Resend)' : 'OTP పంపండి (Send OTP)'}
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="4 అంకెల OTP నమోదు చేయండి"
                  className="w-full bg-white border-2 border-[#DDC0B6] rounded-xl px-4 py-3.5 text-base font-mono font-bold tracking-widest text-[#1a1c1e] placeholder-stone-400 focus:outline-hidden focus:border-[#2A5C3B]"
                  required
                />
              </div>
              {simulatedOtpSent && (
                <div className="mt-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg border border-emerald-200 font-medium">
                  ✅ డెమో OTP: <strong>4821</strong> మీ మొబైల్‌కు పంపబడింది (ఆటో-ఫిల్ చేయబడింది).
                </div>
              )}
            </div>
          )}

          {/* Mandi District Selection */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#EDE7DD]">
            <div className="text-xs font-bold text-[#56423b] mb-1.5">
              సమీప వ్యవసాయ మార్కెట్ కమిటీ (Nearest APMC Mandi):
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'anantapur', label: 'అనంతపురం', sub: 'టమోటా & మిరప' },
                { id: 'kadiri', label: 'కదిరి', sub: 'వేరుశనగ హబ్' },
                { id: 'dharmavaram', label: 'ధర్మవరం', sub: 'కూరగాయల మార్కెట్' },
              ].map((mandi) => (
                <button
                  key={mandi.id}
                  type="button"
                  onClick={() => setDistrictMandi(mandi.id)}
                  className={`p-2 rounded-xl text-center border transition-all text-xs ${
                    districtMandi === mandi.id
                      ? 'bg-[#2A5C3B] text-white border-transparent font-bold shadow-2xs'
                      : 'bg-[#FAF8F5] text-[#56423b] border-[#DDC0B6] hover:bg-stone-100'
                  }`}
                >
                  <div>{mandi.label}</div>
                  <div className="text-[10px] opacity-75">{mandi.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Demo Farmer Accounts */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#EDE7DD]">
            <div className="flex items-center justify-between text-xs font-bold text-[#2A5C3B] mb-2">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">touch_app</span>
                <span>డెమో రైతు ఖాతాను ఎంచుకోండి (1-Click Fill):</span>
              </span>
            </div>
            <div className="space-y-1.5">
              {farmerUsers.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => fillFarmer(f)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-colors flex items-center justify-between ${
                    phoneNumber === f.phoneNumber
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-950'
                      : 'bg-[#FAF8F5] border-[#DDC0B6] text-[#1a1c1e] hover:bg-stone-100'
                  }`}
                >
                  <div>
                    <div className="font-bold text-xs">
                      {f.teluguName || f.name} <span className="text-[#84726C] text-[11px] font-normal">({f.name})</span>
                    </div>
                    <div className="text-[11px] font-mono text-emerald-800 font-bold">
                      +91 {f.phoneNumber}
                    </div>
                    <div className="text-[10px] text-[#84726C]">
                      పంట: {f.fpoOrFirm || 'వ్యవసాయ ఉత్పత్తులు'}
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2A5C3B] text-white">
                    ఎంచుకోండి &rarr;
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full py-4 bg-[#2A5C3B] hover:bg-[#1E432B] text-white font-bold text-base rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-2xl">login</span>
            <span>రైతు యాప్‌లోకి ప్రవేశించండి (Enter Farmer App)</span>
          </button>
        </form>

        {/* Kisan Toll-Free Help */}
        <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-center text-xs text-amber-950">
          <div className="font-bold flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-base text-amber-700">call</span>
            <span>రైతు మార్కెట్ సహాయం టోల్ ఫ్రీ: 1800-425-1111</span>
          </div>
          <div className="text-[11px] text-amber-800 mt-0.5">
            ఉచిత కాల్ • ఉదయం 7:00 నుండి రాత్రి 8:00 వరకు అందుబాటులో ఉంటుంది
          </div>
        </div>
      </div>
    </div>
  );
};
