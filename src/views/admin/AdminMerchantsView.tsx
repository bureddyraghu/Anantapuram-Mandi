import React, { useState } from 'react';
import { MerchantRecord } from '../../types';

interface AdminMerchantsViewProps {
  merchants: MerchantRecord[];
  onAddMerchant: (merchant: MerchantRecord) => void;
  onUpdateMerchant: (merchant: MerchantRecord) => void;
  onDeleteMerchant: (merchantId: string) => void;
  onShowToast: (msg: string) => void;
  onSwitchToFarmers?: () => void;
  onSwitchToUsers?: () => void;
}

export const AdminMerchantsView: React.FC<AdminMerchantsViewProps> = ({
  merchants,
  onAddMerchant,
  onUpdateMerchant,
  onDeleteMerchant,
  onShowToast,
  onSwitchToFarmers,
  onSwitchToUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | 'Grade A+' | 'Grade A' | 'Processor' | 'Retail Aggregator'>('all');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMerchant, setEditingMerchant] = useState<MerchantRecord | null>(null);
  const [deletingMerchant, setDeletingMerchant] = useState<MerchantRecord | null>(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState<Omit<MerchantRecord, 'id'>>({
    firmName: '',
    contactPerson: '',
    apmcLicense: '',
    gstin: '',
    phone: '',
    email: '',
    terminalHub: '',
    state: 'Karnataka / AP Border',
    escrowLimit: 10000000,
    currentEscrowDeposit: 5000000,
    tradeCategory: 'fruits',
    licenseTier: 'Grade A+',
    status: 'active',
    rating: 4.8,
    totalDeals: 25
  });

  const openAddModal = () => {
    setFormData({
      firmName: '',
      contactPerson: '',
      apmcLicense: `APMC-${Math.floor(1000 + Math.random() * 9000)}-TRD`,
      gstin: `36AAACB${Math.floor(1000 + Math.random() * 9000)}F1Z${Math.floor(Math.random() * 9)}`,
      phone: '+91 9',
      email: '',
      terminalHub: 'Singasandra Packhouse & Wholesale Terminal',
      state: 'Karnataka / AP Border',
      escrowLimit: 10000000,
      currentEscrowDeposit: 5000000,
      tradeCategory: 'fruits',
      licenseTier: 'Grade A+',
      status: 'active',
      rating: 4.8,
      totalDeals: 0
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (mer: MerchantRecord) => {
    setEditingMerchant(mer);
    setFormData({
      firmName: mer.firmName,
      contactPerson: mer.contactPerson,
      apmcLicense: mer.apmcLicense,
      gstin: mer.gstin,
      phone: mer.phone,
      email: mer.email,
      terminalHub: mer.terminalHub,
      state: mer.state,
      escrowLimit: mer.escrowLimit,
      currentEscrowDeposit: mer.currentEscrowDeposit,
      tradeCategory: mer.tradeCategory,
      licenseTier: mer.licenseTier,
      status: mer.status,
      rating: mer.rating,
      totalDeals: mer.totalDeals
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firmName.trim()) {
      onShowToast('Please enter merchant firm name');
      return;
    }
    const newRecord: MerchantRecord = {
      ...formData,
      id: `mer-${Date.now()}`
    };
    onAddMerchant(newRecord);
    setIsAddModalOpen(false);
    onShowToast(`Merchant firm "${newRecord.firmName}" onboarded into APMC Escrow network!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMerchant) return;
    const updated: MerchantRecord = {
      ...formData,
      id: editingMerchant.id
    };
    onUpdateMerchant(updated);
    setEditingMerchant(null);
    onShowToast(`Merchant "${updated.firmName}" updated successfully.`);
  };

  const handleConfirmDelete = () => {
    if (!deletingMerchant) return;
    onDeleteMerchant(deletingMerchant.id);
    onShowToast(`Merchant "${deletingMerchant.firmName}" deregistered.`);
    setDeletingMerchant(null);
  };

  const filteredMerchants = merchants.filter((m) => {
    if (tierFilter !== 'all' && m.licenseTier !== tierFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        m.firmName.toLowerCase().includes(q) ||
        m.contactPerson.toLowerCase().includes(q) ||
        m.apmcLicense.toLowerCase().includes(q) ||
        m.gstin.toLowerCase().includes(q) ||
        m.terminalHub.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Module Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-[#EDE7DD] rounded-2xl w-fit border border-[#DDC0B6]/50">
        {onSwitchToFarmers && (
          <button
            onClick={onSwitchToFarmers}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#56423b] hover:bg-white hover:text-[#1a1c1e] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">nature_people</span>
            <span>🌾 Farmers &amp; FPOs Registry</span>
          </button>
        )}

        <div className="px-4 py-1.5 rounded-xl bg-[#1A3026] text-white text-xs font-bold shadow-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">storefront</span>
          <span>🏢 Mandi Merchants &amp; Buyers</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">{merchants.length}</span>
        </div>

        {onSwitchToUsers && (
          <button
            onClick={onSwitchToUsers}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#56423b] hover:bg-white hover:text-[#1a1c1e] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">manage_accounts</span>
            <span>👥 Users &amp; Privileges</span>
          </button>
        )}
      </div>

      {/* 1. Header Banner */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#FAF7F2] text-[#983c0c] border border-[#E6DED4] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">storefront</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1a1c1e]">
                    Admin Directory: Mandi Merchants &amp; Buyers
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#1A3026] text-white">
                    Buyer Management
                  </span>
                </div>
                <p className="text-xs text-[#6F6B64]">
                  మండి వ్యాపారులు &amp; కొనుగోలుదారులు • Manage APMC licenses, credit limits, escrow deposits, and trade status
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">domain_add</span>
              <span>+ Onboard New Merchant</span>
            </button>
          </div>
        </div>

        {/* 4 Directory Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#E6DED4]">
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Active Merchant Desks</div>
            <div className="font-mono font-bold text-xl text-[#1a1c1e]">{merchants.length} Firms</div>
            <div className="text-[10px] text-emerald-800 font-medium">Interstate APMC Traders</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Total Escrow Deposits</div>
            <div className="font-mono font-bold text-xl text-emerald-800">
              ₹{(merchants.reduce((acc, m) => acc + m.currentEscrowDeposit, 0) / 10000000).toFixed(2)} Cr
            </div>
            <div className="text-[10px] text-[#56423b]">T+0 RTGS Liquidity Locked</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Total Trade Deals Settled</div>
            <div className="font-mono font-bold text-xl text-[#1a1c1e]">
              {merchants.reduce((acc, m) => acc + m.totalDeals, 0).toLocaleString()} <span className="text-xs font-sans font-normal text-[#8a7269]">Lots</span>
            </div>
            <div className="text-[10px] text-[#476558]">Dispute Rate: 0.02%</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Approved Credit Limits</div>
            <div className="font-mono font-bold text-xl text-[#983c0c]">
              ₹{(merchants.reduce((acc, m) => acc + m.escrowLimit, 0) / 10000000).toFixed(1)} Cr
            </div>
            <div className="text-[10px] text-stone-600">NABARD Backed Guarantee</div>
          </div>
        </div>
      </div>

      {/* 2. Search & Tier Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6DED4] flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <span className="material-symbols-outlined text-base text-[#8a7269] absolute left-3 top-2.5">
            search
          </span>
          <input
            type="text"
            placeholder="Search merchant firm, person, license, GSTIN, hub..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] placeholder-[#8a7269] focus:outline-none focus:border-[#983c0c]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#8a7269] font-medium">Tier:</span>
          {(['all', 'Grade A+', 'Grade A', 'Processor', 'Retail Aggregator'] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-3 py-1 rounded-xl font-semibold capitalize transition-all ${
                tierFilter === tier
                  ? 'bg-[#1A3026] text-white'
                  : 'bg-[#FAF7F2] text-[#56423b] hover:bg-[#EDE7DD]'
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Merchants Directory Table */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6DED4] text-[#8a7269] uppercase font-bold text-[11px] tracking-wider bg-[#FAF7F2]/50">
                <th className="py-3.5 px-4">Merchant Firm &amp; License</th>
                <th className="py-3.5 px-3">Contact &amp; Representative</th>
                <th className="py-3.5 px-3">Terminal Hub</th>
                <th className="py-3.5 px-3">Escrow Balance / Limit</th>
                <th className="py-3.5 px-3">Rating &amp; Status</th>
                <th className="py-3.5 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DED4]/60">
              {filteredMerchants.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8a7269]">
                    No merchants found matching criteria.
                  </td>
                </tr>
              ) : (
                filteredMerchants.map((m) => (
                  <tr key={m.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    {/* Firm Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-[#1a1c1e]">{m.firmName}</div>
                      <div className="text-[11px] text-[#983c0c] font-medium">{m.apmcLicense}</div>
                      <div className="text-[10px] font-mono text-[#8a7269] mt-0.5">
                        GSTIN: {m.gstin}
                      </div>
                    </td>

                    {/* Contact Person */}
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#1a1c1e]">{m.contactPerson}</div>
                      <div className="text-[11px] text-[#6F6B64]">{m.phone}</div>
                      <div className="text-[10px] text-[#8a7269] truncate max-w-[170px]">{m.email}</div>
                    </td>

                    {/* Terminal Hub */}
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-[#1a1c1e] max-w-[180px] truncate">{m.terminalHub}</div>
                      <div className="text-[11px] text-[#476558] font-semibold">{m.state}</div>
                      <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#EDE7DD] text-[#56423b]">
                        {m.licenseTier}
                      </span>
                    </td>

                    {/* Escrow Deposit & Limit */}
                    <td className="py-3.5 px-3 font-mono text-[11px]">
                      <div className="text-emerald-800 font-bold">
                        ₹{(m.currentEscrowDeposit).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-[#8a7269]">
                        Limit: ₹{(m.escrowLimit).toLocaleString('en-IN')}
                      </div>
                    </td>

                    {/* Rating & Status */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-1 text-amber-600 font-bold text-xs">
                        <span className="material-symbols-outlined text-xs fill-1">star</span>
                        <span>{m.rating}</span>
                        <span className="text-[10px] text-[#8a7269] font-normal">({m.totalDeals} deals)</span>
                      </div>
                      <span className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        m.status === 'active'
                          ? 'bg-[#c9ead9] text-[#022016]'
                          : m.status === 'under_audit'
                          ? 'bg-[#FDF4EA] text-[#884800]'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {m.status === 'active' ? 'Active APMC' : m.status === 'under_audit' ? 'Under Audit' : 'Suspended'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(m)}
                        className="px-2.5 py-1 rounded-lg border border-[#E6DED4] hover:bg-[#FAF7F2] text-xs font-semibold text-[#1a1c1e] transition-colors"
                        title="Edit merchant details"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingMerchant(m)}
                        className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                        title="Delete merchant"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODAL: Onboard New Merchant */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  Onboard Mandi Merchant / Buyer Firm
                </h3>
                <p className="text-xs text-[#6F6B64]">Register licensed buyer for APMC Spot trading and Escrow bidding</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[#8a7269] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveAdd} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Firm Trade Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firmName}
                    onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                    placeholder="e.g. Balaji Agro Fruit Exporters"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Contact Person &amp; Role</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                    placeholder="Suresh Kumar (Director)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">APMC License ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.apmcLicense}
                    onChange={(e) => setFormData({ ...formData, apmcLicense: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">GSTIN Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Official Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                    placeholder="trade@company.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Terminal Hub / Yard</label>
                  <input
                    type="text"
                    value={formData.terminalHub}
                    onChange={(e) => setFormData({ ...formData, terminalHub: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">License Tier</label>
                  <select
                    value={formData.licenseTier}
                    onChange={(e) => setFormData({ ...formData, licenseTier: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  >
                    <option value="Grade A+">Grade A+ (Interstate Exporter)</option>
                    <option value="Grade A">Grade A (Wholesale APMC Merchant)</option>
                    <option value="Processor">Industrial Food Processor</option>
                    <option value="Retail Aggregator">Organized Retail Aggregator</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Escrow Deposit (₹)</label>
                  <input
                    type="number"
                    step="100000"
                    value={formData.currentEscrowDeposit}
                    onChange={(e) => setFormData({ ...formData, currentEscrowDeposit: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Credit Limit (₹)</label>
                  <input
                    type="number"
                    step="500000"
                    value={formData.escrowLimit}
                    onChange={(e) => setFormData({ ...formData, escrowLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm"
                >
                  Confirm &amp; Onboard Merchant
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: Edit Merchant */}
      {editingMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  Modify Merchant: {editingMerchant.firmName}
                </h3>
                <p className="text-xs text-[#6F6B64]">Update contact, credit lines, APMC license, or trading status</p>
              </div>
              <button
                onClick={() => setEditingMerchant(null)}
                className="p-1 text-[#8a7269] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Firm Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firmName}
                    onChange={(e) => setFormData({ ...formData, firmName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Escrow Deposit (₹)</label>
                  <input
                    type="number"
                    step="100000"
                    value={formData.currentEscrowDeposit}
                    onChange={(e) => setFormData({ ...formData, currentEscrowDeposit: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Trading Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-semibold"
                  >
                    <option value="active">Active APMC Trader</option>
                    <option value="under_audit">Under Audit</option>
                    <option value="suspended">Suspended / Frozen</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Terminal Hub</label>
                  <input
                    type="text"
                    value={formData.terminalHub}
                    onChange={(e) => setFormData({ ...formData, terminalHub: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">License Tier</label>
                  <select
                    value={formData.licenseTier}
                    onChange={(e) => setFormData({ ...formData, licenseTier: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  >
                    <option value="Grade A+">Grade A+ (Interstate Exporter)</option>
                    <option value="Grade A">Grade A (Wholesale APMC Merchant)</option>
                    <option value="Processor">Industrial Food Processor</option>
                    <option value="Retail Aggregator">Organized Retail Aggregator</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMerchant(null)}
                  className="px-4 py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm"
                >
                  Save Merchant Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: Delete Confirmation */}
      {deletingMerchant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                Deregister Merchant Firm?
              </h3>
              <p className="text-xs text-[#6F6B64]">
                Are you sure you want to remove <strong>{deletingMerchant.firmName}</strong> from the active APMC directory? Any active bids or contracts will require manual arbitration.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingMerchant(null)}
                className="py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-sm"
              >
                Confirm Deregister
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
