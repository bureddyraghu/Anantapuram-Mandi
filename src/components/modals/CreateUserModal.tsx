import React, { useState } from 'react';
import { UserAccount, UserRole, UserPrivilege, PRIVILEGE_LABELS, ROLE_DEFAULT_PRIVILEGES } from '../../types';

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (newUser: UserAccount) => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onClose,
  onAddUser
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [teluguName, setTeluguName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState<UserRole>('merchant');
  const [defaultPassword, setDefaultPassword] = useState('Mandi@123');
  const [mustChangePassword, setMustChangePassword] = useState(true);
  const [fpoOrFirm, setFpoOrFirm] = useState('');
  const [privileges, setPrivileges] = useState<UserPrivilege[]>(ROLE_DEFAULT_PRIVILEGES['merchant']);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    setPrivileges(ROLE_DEFAULT_PRIVILEGES[newRole]);
    if (newRole === 'admin') setDefaultPassword('Admin@123');
    else if (newRole === 'farmer') setDefaultPassword('Farmer@123');
    else setDefaultPassword('Mandi@123');
  };

  const togglePrivilege = (priv: UserPrivilege) => {
    if (privileges.includes(priv)) {
      setPrivileges(privileges.filter((p) => p !== priv));
    } else {
      setPrivileges([...privileges, priv]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please provide the full user name');
      return;
    }
    const cleanPhone = phoneNumber.trim().replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number as the default user number');
      return;
    }
    if (!defaultPassword || defaultPassword.length < 6) {
      alert('Initial password must be at least 6 characters');
      return;
    }

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      phoneNumber: cleanPhone.slice(-10),
      name: name.trim(),
      teluguName: teluguName.trim() || undefined,
      role,
      password: defaultPassword,
      defaultPassword,
      mustChangePassword,
      status: 'active',
      privileges,
      fpoOrFirm: fpoOrFirm.trim() || undefined,
      createdAt: 'Just now',
      lastLogin: 'Never (Pending First Login)'
    };

    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#DDC0B6]/60 overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#983c0c] text-white p-5 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">person_add</span>
            </div>
            <div>
              <h3 className="text-base font-bold font-serif leading-snug">
                Onboard New User (కొత్త వినియోగదారుని నమోదు)
              </h3>
              <p className="text-white/80 text-xs">
                Register phone number, assign role, privileges, and initial default password
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          {/* Role Choice */}
          <div>
            <label className="block text-xs font-bold text-[#56423b] mb-1.5">
              Select User Role <span className="text-red-600">* (పాత్రను ఎంచుకోండి)</span>
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {(['admin', 'merchant', 'farmer'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleRoleChange(r)}
                  className={`p-3 rounded-2xl text-left border transition-all flex flex-col gap-1 ${
                    role === r
                      ? r === 'admin'
                        ? 'bg-[#ffdbd0]/60 border-[#983c0c] text-[#983c0c]'
                        : r === 'merchant'
                        ? 'bg-emerald-50 border-emerald-600 text-emerald-900'
                        : 'bg-amber-50 border-amber-600 text-amber-950'
                      : 'bg-[#FAF8F5] border-[#DDC0B6] text-[#56423b] hover:bg-stone-100'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="material-symbols-outlined text-xl">
                      {r === 'admin' ? 'shield_person' : r === 'merchant' ? 'storefront' : 'nature_people'}
                    </span>
                    <span className="text-[10px] uppercase font-mono font-bold">
                      {r === 'admin' ? 'Grid Admin' : r === 'merchant' ? 'Trader' : 'Grower'}
                    </span>
                  </div>
                  <div className="font-bold text-xs capitalize mt-0.5">
                    {r === 'merchant' ? 'Merchant / Buyer' : r}
                  </div>
                  <div className="text-[10px] opacity-75">
                    {r === 'admin' ? 'Full Authority' : r === 'merchant' ? 'Procure & Bid' : 'Lot Creation'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* User Number (Phone) & Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Phone Number <span className="text-red-600">* (Default User Number / మొబైల్ సంఖ్య)</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-[#84726C]">
                  +91
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="98480 12345"
                  className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl pl-12 pr-3.5 py-2.5 text-sm font-mono font-bold text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                  required
                />
              </div>
              <p className="text-[10px] text-[#84726C] mt-1">
                This 10-digit phone number will be the user's login username.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Ramesh Babu or Balaji Traders"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Telugu Name <span className="text-[#84726C] font-normal">(తెలుగు పేరు)</span>
              </label>
              <input
                type="text"
                value={teluguName}
                onChange={(e) => setTeluguName(e.target.value)}
                placeholder="ఉదా: రమేష్ బాబు గారు"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Associated Firm / FPO / Cluster
              </label>
              <input
                type="text"
                value={fpoOrFirm}
                onChange={(e) => setFpoOrFirm(e.target.value)}
                placeholder="e.g. Madanapalle West Mango FPO"
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
              />
            </div>
          </div>

          {/* Initial Default Password */}
          <div className="p-4 bg-[#FAF8F5] border border-[#EDE7DD] rounded-2xl space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-[#56423b]">
                  Initial Default Password <span className="text-red-600">* (ప్రారంభ డిఫాల్ట్ పాస్‌వర్డ్)</span>
                </label>
                <button
                  type="button"
                  onClick={() => setDefaultPassword(role === 'admin' ? 'Admin@123' : role === 'farmer' ? 'Farmer@123' : 'Mandi@123')}
                  className="text-[11px] font-bold text-[#983c0c] hover:underline"
                >
                  Set Standard Role Default
                </button>
              </div>
              <input
                type="text"
                value={defaultPassword}
                onChange={(e) => setDefaultPassword(e.target.value)}
                className="w-full bg-white border border-[#DDC0B6] rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                required
              />
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={mustChangePassword}
                onChange={(e) => setMustChangePassword(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#983c0c] focus:ring-[#983c0c] border-[#DDC0B6]"
              />
              <div className="text-xs">
                <span className="font-bold text-[#1a1c1e] block">
                  Require user to update password upon first login (సిఫార్సు చేయబడినది)
                </span>
                <span className="text-[#84726C] text-[11px] block mt-0.5">
                  When the user logs in with their phone number &amp; default password, an "Update New Password" dialog will intercept and require them to set their permanent password.
                </span>
              </div>
            </label>
          </div>

          {/* Privileges Matrix */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold text-[#56423b]">
                Assigned Privileges for {role.toUpperCase()} ({privileges.length} active)
              </span>
              <button
                type="button"
                onClick={() => setPrivileges(ROLE_DEFAULT_PRIVILEGES[role])}
                className="text-[11px] font-bold text-[#983c0c] hover:underline"
              >
                Reset to Role Defaults
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 bg-[#FAF8F5] rounded-xl border border-[#EDE7DD]">
              {(Object.keys(PRIVILEGE_LABELS) as UserPrivilege[]).map((priv) => {
                const info = PRIVILEGE_LABELS[priv];
                const isChecked = privileges.includes(priv);
                return (
                  <label
                    key={priv}
                    className={`flex items-start gap-2 p-2 rounded-lg cursor-pointer border text-xs ${
                      isChecked ? 'bg-white border-[#DDC0B6] shadow-2xs font-semibold' : 'bg-transparent border-transparent opacity-60'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePrivilege(priv)}
                      className="mt-0.5 w-3.5 h-3.5 rounded text-[#983c0c] focus:ring-[#983c0c] border-[#DDC0B6]"
                    />
                    <div>
                      <div className="text-[#1a1c1e]">{info.label}</div>
                      <div className="text-[10px] text-[#84726C] font-normal">{info.telugu}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#EDE7DD]">
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
              <span className="material-symbols-outlined text-sm">how_to_reg</span>
              <span>Register User Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
