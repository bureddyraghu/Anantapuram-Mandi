import React, { useState } from 'react';
import { UserAccount, UserRole, UserPrivilege, PRIVILEGE_LABELS } from '../../types';
import { ManageUserPasswordModal } from '../../components/modals/ManageUserPasswordModal';
import { EditUserModal } from '../../components/modals/EditUserModal';
import { CreateUserModal } from '../../components/modals/CreateUserModal';

interface AdminUsersViewProps {
  users: UserAccount[];
  onAddUser: (user: UserAccount) => void;
  onUpdateUser: (user: UserAccount) => void;
  onDeleteUser: (userId: string) => void;
  onShowToast: (msg: string) => void;
  onSwitchToFarmers?: () => void;
  onSwitchToMerchants?: () => void;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onShowToast,
  onSwitchToFarmers,
  onSwitchToMerchants,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended' | 'needs_password_update'>('all');

  // Modals state
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [selectedUserForPassword, setSelectedUserForPassword] = useState<UserAccount | null>(null);
  const [selectedUserForEdit, setSelectedUserForEdit] = useState<UserAccount | null>(null);
  const [deleteConfirmUser, setDeleteConfirmUser] = useState<UserAccount | null>(null);

  // Filtered users
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (u.teluguName && u.teluguName.includes(searchTerm)) ||
      u.phoneNumber.includes(searchTerm) ||
      (u.fpoOrFirm && u.fpoOrFirm.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === 'all' || u.role === roleFilter;

    let matchesStatus = true;
    if (statusFilter === 'active') matchesStatus = u.status === 'active';
    else if (statusFilter === 'suspended') matchesStatus = u.status === 'suspended';
    else if (statusFilter === 'needs_password_update') matchesStatus = u.mustChangePassword;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Password update handler for admin
  const handleAdminUpdatePassword = (userId: string, newPassword: string, requireChange: boolean) => {
    const target = users.find((u) => u.id === userId);
    if (!target) return;
    const updated: UserAccount = {
      ...target,
      password: newPassword,
      defaultPassword: newPassword,
      mustChangePassword: requireChange
    };
    onUpdateUser(updated);
    onShowToast(`Password successfully updated for ${target.name}`);
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirmUser) return;
    onDeleteUser(deleteConfirmUser.id);
    onShowToast(`User ${deleteConfirmUser.name} removed from registry`);
    setDeleteConfirmUser(null);
  };

  // Metrics
  const totalUsers = users.length;
  const adminCount = users.filter((u) => u.role === 'admin').length;
  const merchantCount = users.filter((u) => u.role === 'merchant').length;
  const farmerCount = users.filter((u) => u.role === 'farmer').length;
  const pendingPasswordUpdates = users.filter((u) => u.mustChangePassword).length;

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Module Switcher */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#EDE7DD] rounded-2xl w-fit border border-[#DDC0B6]/50">
        {onSwitchToFarmers && (
          <button
            onClick={onSwitchToFarmers}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#56423b] hover:bg-white hover:text-[#1a1c1e] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">nature_people</span>
            <span>🌾 Farmers &amp; FPOs Registry</span>
          </button>
        )}

        {onSwitchToMerchants && (
          <button
            onClick={onSwitchToMerchants}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#56423b] hover:bg-white hover:text-[#1a1c1e] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            <span>🏢 Mandi Merchants &amp; Buyers</span>
          </button>
        )}

        <div className="px-4 py-1.5 rounded-xl bg-[#983c0c] text-white text-xs font-bold shadow-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">manage_accounts</span>
          <span>👥 Users, Roles &amp; Privileges</span>
          <span className="px-1.5 py-0.2 bg-black/20 rounded-full text-[10px]">{totalUsers}</span>
        </div>
      </div>

      {/* 1. Header Banner & Quick Action */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#ffdbd0] text-[#983c0c]">
                Admin Identity &amp; Access Control
              </span>
              <span className="text-xs text-[#84726C] font-mono">APMC Security Engine</span>
            </div>
            <h1 className="text-2xl font-bold font-serif text-[#1a1c1e] mt-1.5">
              User Profiles, Roles &amp; Privileges Management
            </h1>
            <p className="text-sm text-[#56423b] mt-0.5">
              నియంత్రణ విభాగం: వినియోగదారుల ఫోన్ నంబర్లు, డిఫాల్ట్ పాస్‌వర్డ్‌లు, మరియు పోర్టల్ అనుమతుల నిర్వహణ
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="px-4 py-2.5 bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-bold rounded-2xl shadow-xs transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              <span>+ Onboard New User (యూజర్‌ని చేర్చండి)</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-6 pt-5 border-t border-[#EDE7DD]">
          <div className="p-3 bg-[#FAF8F5] rounded-2xl border border-[#EDE7DD]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#84726C] block">Total Accounts</span>
            <span className="text-xl font-bold font-mono text-[#1a1c1e] mt-0.5 block">{totalUsers}</span>
            <span className="text-[10px] text-[#56423b]">Registered Users</span>
          </div>

          <div className="p-3 bg-[#ffdbd0]/30 rounded-2xl border border-[#ffdbd0]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#983c0c] block">Administrators</span>
            <span className="text-xl font-bold font-mono text-[#983c0c] mt-0.5 block">{adminCount}</span>
            <span className="text-[10px] text-[#56423b]">Full Authority</span>
          </div>

          <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">Merchants / Buyers</span>
            <span className="text-xl font-bold font-mono text-emerald-900 mt-0.5 block">{merchantCount}</span>
            <span className="text-[10px] text-[#56423b]">Traders &amp; Aggregators</span>
          </div>

          <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 block">Farmers &amp; FPOs</span>
            <span className="text-xl font-bold font-mono text-amber-950 mt-0.5 block">{farmerCount}</span>
            <span className="text-[10px] text-[#56423b]">Primary Producers</span>
          </div>

          <div className="p-3 bg-red-50/60 rounded-2xl border border-red-200 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-red-800 block">Pending Pwd Updates</span>
            <span className="text-xl font-bold font-mono text-red-900 mt-0.5 block">{pendingPasswordUpdates}</span>
            <span className="text-[10px] text-red-700 font-semibold">Initial Default Active</span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="bg-white rounded-2xl border border-[#E6DED4] p-4 flex flex-col md:flex-row gap-3 items-center justify-between shadow-2xs">
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#84726C] text-lg">
            search
          </span>
          <input
            type="text"
            placeholder="Search by phone number, name, firm, FPO..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#FAF8F5] border border-[#DDC0B6] rounded-xl pl-10 pr-4 py-2 text-xs text-[#1a1c1e] placeholder-[#84726C] focus:outline-hidden focus:border-[#983c0c]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Role Filter */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EDE7DD] text-xs">
            <span className="px-2 text-[11px] font-bold text-[#84726C]">Role:</span>
            {(['all', 'admin', 'merchant', 'farmer'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  roleFilter === r ? 'bg-white text-[#983c0c] shadow-2xs font-bold' : 'text-[#56423b] hover:text-[#1a1c1e]'
                }`}
              >
                {r === 'all' ? 'All' : r === 'merchant' ? 'Merchants' : r === 'farmer' ? 'Farmers' : 'Admins'}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1 bg-[#FAF8F5] p-1 rounded-xl border border-[#EDE7DD] text-xs">
            <span className="px-2 text-[11px] font-bold text-[#84726C]">Filter:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-[#1a1c1e] focus:outline-hidden pr-2 cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="needs_password_update">Requires Password Update</option>
              <option value="suspended">Suspended Accounts</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Users Table */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#EDE7DD] text-[#56423b] font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">User Number (Phone ID)</th>
                <th className="py-3.5 px-4">Name &amp; Organization</th>
                <th className="py-3.5 px-4">Assigned Role</th>
                <th className="py-3.5 px-4">Password Status</th>
                <th className="py-3.5 px-4">Granted Privileges</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Admin Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE7DD]/70">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#84726C]">
                    <span className="material-symbols-outlined text-4xl block mb-2 opacity-50">person_off</span>
                    <span>No user accounts found matching your search criteria</span>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-[#FAF8F5]/80 transition-colors">
                    {/* User Number (Phone Number) */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center text-[#983c0c]">
                          <span className="material-symbols-outlined text-sm">phone_iphone</span>
                        </div>
                        <div>
                          <span className="font-mono font-bold text-sm text-[#1a1c1e]">
                            {user.phoneNumber}
                          </span>
                          <span className="text-[10px] text-[#84726C] block">Default User ID</span>
                        </div>
                      </div>
                    </td>

                    {/* Name & Org */}
                    <td className="py-3.5 px-4">
                      <div>
                        <div className="font-bold text-[#1a1c1e] flex items-center gap-1.5">
                          <span>{user.name}</span>
                          {user.teluguName && (
                            <span className="text-[#84726C] font-normal text-[11px]">
                              ({user.teluguName})
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-[#56423b] mt-0.5">
                          {user.fpoOrFirm || (user.role === 'admin' ? 'Mandi Authority' : 'Independent')}
                        </div>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${
                        user.role === 'admin' ? 'bg-[#ffdbd0] text-[#983c0c]' :
                        user.role === 'merchant' ? 'bg-emerald-100 text-emerald-900' :
                        'bg-amber-100 text-amber-950'
                      }`}>
                        <span className="material-symbols-outlined text-xs">
                          {user.role === 'admin' ? 'shield_person' : user.role === 'merchant' ? 'storefront' : 'nature_people'}
                        </span>
                        <span>{user.role === 'merchant' ? 'Merchant / Buyer' : user.role}</span>
                      </span>
                    </td>

                    {/* Password Status */}
                    <td className="py-3.5 px-4">
                      {user.mustChangePassword ? (
                        <div className="space-y-0.5">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                            <span className="material-symbols-outlined text-xs">warning</span>
                            <span>Default Active (Must Update)</span>
                          </span>
                          <span className="text-[10px] font-mono text-[#84726C] block">
                            Init: {user.defaultPassword || user.password}
                          </span>
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          <span className="material-symbols-outlined text-xs">check_circle</span>
                          <span>Permanent Set</span>
                        </span>
                      )}
                    </td>

                    {/* Privileges */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-0.5 bg-stone-100 text-[#56423b] font-mono text-[10px] font-bold rounded-md">
                          {user.privileges.length} Perms
                        </span>
                        {user.privileges.slice(0, 2).map((p) => (
                          <span key={p} className="px-1.5 py-0.5 bg-[#FAF8F5] border border-[#EDE7DD] text-[#84726C] text-[10px] rounded-md truncate max-w-[100px]">
                            {PRIVILEGE_LABELS[p]?.label.split(' ')[0] || p}
                          </span>
                        ))}
                        {user.privileges.length > 2 && (
                          <span className="text-[10px] text-[#84726C] self-center">
                            +{user.privileges.length - 2} more
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                        user.status === 'active' ? 'text-emerald-700' : 'text-red-600'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-600' : 'bg-red-600'}`}></span>
                        <span className="capitalize">{user.status}</span>
                      </span>
                    </td>

                    {/* Action Controls */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUserForPassword(user)}
                          title="Define / Reset Password"
                          className="px-2.5 py-1 bg-stone-100 hover:bg-[#ffdbd0] text-[#56423b] hover:text-[#983c0c] rounded-xl text-xs font-bold transition-all flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">key</span>
                          <span>Password</span>
                        </button>

                        <button
                          onClick={() => setSelectedUserForEdit(user)}
                          title="Edit Profile & Privileges"
                          className="p-1.5 hover:bg-stone-100 text-[#56423b] hover:text-[#1a1c1e] rounded-xl transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">edit</span>
                        </button>

                        <button
                          onClick={() => setDeleteConfirmUser(user)}
                          title="Delete User"
                          className="p-1.5 hover:bg-red-50 text-stone-400 hover:text-red-600 rounded-xl transition-colors"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Roles & Privileges Reference Matrix */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#983c0c]">shield</span>
          <h3 className="text-sm font-bold font-serif text-[#1a1c1e]">
            Mandi Corridor Role Privileges &amp; Access Hierarchy
          </h3>
        </div>
        <p className="text-xs text-[#56423b] mb-4">
          Each user role provides specialized access to designated portals with distinct capabilities:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-[#ffdbd0]/20 border border-[#ffdbd0]">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-lg bg-[#983c0c] text-white flex items-center justify-center text-xs">
                🛡️
              </span>
              <span className="font-bold text-xs text-[#983c0c]">Administrator (మండి అడ్మిన్)</span>
            </div>
            <p className="text-[11px] text-[#56423b] leading-relaxed">
              Full system sovereignty: Manage user credentials, passwords, role privilege assignment, farmer landholding directories, merchant interstate APMC trade permits, and corridor grid routing.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-lg bg-[#1A3026] text-white flex items-center justify-center text-xs">
                🏢
              </span>
              <span className="font-bold text-xs text-emerald-900">Merchant / Buyer (వ్యాపారి)</span>
            </div>
            <p className="text-[11px] text-[#56423b] leading-relaxed">
              Procurement portal: Post procurement RFQs, participate in live farmgate spot auctions, manage escrow vault deposit balance, track reefer cold-chain transit, and lock trade lots.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-lg bg-[#2A5C3B] text-white flex items-center justify-center text-xs">
                🌾
              </span>
              <span className="font-bold text-xs text-amber-950">Farmer / FPO (రైతు యాప్)</span>
            </div>
            <p className="text-[11px] text-[#56423b] leading-relaxed">
              Grower mobile interface: Create harvest lots with photos and tonnage, review mandi MSP parity benchmarks, receive buyer bids, view digital weighbridge slips, and track direct bank RTGS.
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateUserModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onAddUser={(newUser) => {
          onAddUser(newUser);
          onShowToast(`User ${newUser.name} created with default password: ${newUser.password}`);
        }}
      />

      <ManageUserPasswordModal
        isOpen={!!selectedUserForPassword}
        user={selectedUserForPassword}
        onClose={() => setSelectedUserForPassword(null)}
        onUpdatePassword={handleAdminUpdatePassword}
      />

      <EditUserModal
        isOpen={!!selectedUserForEdit}
        user={selectedUserForEdit}
        onClose={() => setSelectedUserForEdit(null)}
        onSave={(updated) => {
          onUpdateUser(updated);
          onShowToast(`User ${updated.name} updated successfully`);
        }}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-red-200 text-center">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-700 flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-2xl">delete_forever</span>
            </div>
            <h3 className="font-bold text-base text-[#1a1c1e]">Confirm User Deletion</h3>
            <p className="text-xs text-[#56423b] mt-1">
              Are you sure you want to remove user <strong>{deleteConfirmUser.name}</strong> ({deleteConfirmUser.phoneNumber})? This user will no longer be able to log in.
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <button
                onClick={() => setDeleteConfirmUser(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#56423b] hover:bg-stone-100"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold"
              >
                Yes, Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
