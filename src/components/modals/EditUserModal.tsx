import React, { useState } from 'react';
import { UserAccount, UserRole, UserPrivilege, PRIVILEGE_LABELS, ROLE_DEFAULT_PRIVILEGES } from '../../types';

interface EditUserModalProps {
  isOpen: boolean;
  user: UserAccount | null;
  onClose: () => void;
  onSave: (updatedUser: UserAccount) => void;
}

interface ContentProps {
  user: UserAccount;
  onClose: () => void;
  onSave: (updatedUser: UserAccount) => void;
}

const EditUserModalContent: React.FC<ContentProps> = ({
  user,
  onClose,
  onSave
}) => {
  const [name, setName] = useState(user.name);
  const [teluguName, setTeluguName] = useState(user.teluguName || '');
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [role, setRole] = useState<UserRole>(user.role);
  const [status, setStatus] = useState<'active' | 'suspended' | 'locked'>(user.status);
  const [fpoOrFirm, setFpoOrFirm] = useState(user.fpoOrFirm || '');
  const [privileges, setPrivileges] = useState<UserPrivilege[]>(user.privileges);

  const handleRoleChange = (newRole: UserRole) => {
    setRole(newRole);
    // If switching role, offer to reset privileges to role defaults
    setPrivileges(ROLE_DEFAULT_PRIVILEGES[newRole]);
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
    if (!phoneNumber || phoneNumber.length < 10) {
      alert('Valid 10-digit phone number is required as the default user number');
      return;
    }

    const updated: UserAccount = {
      ...user,
      name,
      teluguName,
      phoneNumber,
      role,
      status,
      fpoOrFirm,
      privileges
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#DDC0B6]/60 overflow-hidden flex flex-col my-8 max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1a1c1e] text-white p-5 px-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#983c0c] text-white flex items-center justify-center">
              <span className="material-symbols-outlined text-xl">manage_accounts</span>
            </div>
            <div>
              <h3 className="text-base font-bold font-serif leading-snug">
                Edit User Profile &amp; Privileges (యూజర్ వివరాలు &amp; అనుమతులు)
              </h3>
              <p className="text-white/70 text-xs">
                Manage roles, user numbers, and access rights for {user.name}
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

        {/* Scrollable Body */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
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
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                placeholder="ఉదా: బి. బాలాజీ నాయుడు"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Phone Number / User ID <span className="text-red-600">* (యూజర్ నంబర్)</span>
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2 text-sm font-mono font-bold text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                placeholder="10-digit mobile number"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1">
                Associated Firm / FPO / Agency
              </label>
              <input
                type="text"
                value={fpoOrFirm}
                onChange={(e) => setFpoOrFirm(e.target.value)}
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2 text-sm text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
                placeholder="e.g. Madanapalle FPO or Exporter Firm"
              />
            </div>
          </div>

          {/* Role & Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[#EDE7DD]">
            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1.5">
                Assign System Role <span className="text-[#84726C] font-normal">(వ్యవస్థ పాత్ర)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['admin', 'merchant', 'farmer'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(r)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold capitalize transition-all flex flex-col items-center gap-1 border ${
                      role === r
                        ? r === 'admin'
                          ? 'bg-[#983c0c] text-white border-[#983c0c]'
                          : r === 'merchant'
                          ? 'bg-[#1A3026] text-white border-[#1A3026]'
                          : 'bg-[#2A5C3B] text-white border-[#2A5C3B]'
                        : 'bg-[#FAF8F5] text-[#56423b] border-[#DDC0B6] hover:bg-stone-100'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base">
                      {r === 'admin' ? 'shield_person' : r === 'merchant' ? 'storefront' : 'nature_people'}
                    </span>
                    <span>{r === 'merchant' ? 'Merchant' : r}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#56423b] mb-1.5">
                Account Status <span className="text-[#84726C] font-normal">(ఖాతా స్థితి)</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl px-3.5 py-2.5 text-xs font-bold text-[#1a1c1e] focus:outline-hidden focus:border-[#983c0c]"
              >
                <option value="active">Active (పూర్తి అనుమతి)</option>
                <option value="suspended">Suspended (తాత్కాలికంగా నిలిపివేయబడింది)</option>
                <option value="locked">Locked (లాక్ చేయబడింది)</option>
              </select>
            </div>
          </div>

          {/* Granular Privileges Control */}
          <div className="pt-2 border-t border-[#EDE7DD]">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="text-xs font-bold text-[#1a1c1e] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#983c0c]">vpn_key</span>
                  <span>Privileges &amp; Permissions Matrix (అనుమతుల నియంత్రణ)</span>
                </h4>
                <p className="text-[11px] text-[#84726C]">
                  Configure granular capability access for this specific user profile
                </p>
              </div>
              <button
                type="button"
                onClick={() => setPrivileges(ROLE_DEFAULT_PRIVILEGES[role])}
                className="text-[11px] font-bold text-[#983c0c] hover:underline"
              >
                Reset to {role} Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 bg-[#FAF8F5] p-3.5 rounded-2xl border border-[#EDE7DD]">
              {(Object.keys(PRIVILEGE_LABELS) as UserPrivilege[]).map((priv) => {
                const info = PRIVILEGE_LABELS[priv];
                const isChecked = privileges.includes(priv);
                return (
                  <label
                    key={priv}
                    className={`flex items-start gap-2.5 p-2 rounded-xl cursor-pointer transition-all border ${
                      isChecked ? 'bg-white border-[#DDC0B6] shadow-2xs' : 'bg-transparent border-transparent opacity-65 hover:opacity-100'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglePrivilege(priv)}
                      className="mt-0.5 w-4 h-4 rounded text-[#983c0c] focus:ring-[#983c0c] border-[#DDC0B6]"
                    />
                    <div className="text-xs">
                      <div className="font-bold text-[#1a1c1e] flex items-center gap-1">
                        <span>{info.label}</span>
                      </div>
                      <div className="text-[10px] text-[#84726C]">{info.telugu}</div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#EDE7DD]">
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
              <span className="material-symbols-outlined text-sm">save</span>
              <span>Save Changes (సేవ్ చేయండి)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  user,
  onClose,
  onSave
}) => {
  if (!isOpen || !user) return null;

  return (
    <EditUserModalContent
      key={user.id}
      user={user}
      onClose={onClose}
      onSave={onSave}
    />
  );
};
