import React, { useState } from 'react';
import { FarmerRecord } from '../../types';

interface AdminFarmersViewProps {
  farmers: FarmerRecord[];
  onAddFarmer: (farmer: FarmerRecord) => void;
  onUpdateFarmer: (farmer: FarmerRecord) => void;
  onDeleteFarmer: (farmerId: string) => void;
  onShowToast: (msg: string) => void;
  onSwitchToMerchants?: () => void;
  onSwitchToUsers?: () => void;
}

export const AdminFarmersView: React.FC<AdminFarmersViewProps> = ({
  farmers,
  onAddFarmer,
  onUpdateFarmer,
  onDeleteFarmer,
  onShowToast,
  onSwitchToMerchants,
  onSwitchToUsers,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState<'all' | 'verified' | 'pending' | 'flagged'>('all');
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingFarmer, setEditingFarmer] = useState<FarmerRecord | null>(null);
  const [deletingFarmer, setDeletingFarmer] = useState<FarmerRecord | null>(null);

  // Form state for Add/Edit
  const [formData, setFormData] = useState<Omit<FarmerRecord, 'id'>>({
    farmerCode: '',
    name: '',
    teluguName: '',
    fpo: 'Madanapalle West Mango FPO (AP-9842)',
    primaryCrop: 'Banganapalli Mango (GI)',
    secondaryCrop: 'Totapuri Mango',
    phone: '',
    mandal: 'Madanapalle Rural',
    village: '',
    acres: 5,
    seasonCapacityMT: 20,
    bankAccount: '',
    ifsc: '',
    upiId: '',
    kycStatus: 'verified',
    joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  });

  const openAddModal = () => {
    setFormData({
      farmerCode: `AP-FMR-${Math.floor(1000 + Math.random() * 9000)}`,
      name: '',
      teluguName: '',
      fpo: 'Madanapalle West Mango FPO (AP-9842)',
      primaryCrop: 'Banganapalli Mango (GI)',
      secondaryCrop: '',
      phone: '+91 ',
      mandal: 'Madanapalle Rural',
      village: '',
      acres: 5,
      seasonCapacityMT: 25,
      bankAccount: '•••••••• ' + Math.floor(1000 + Math.random() * 9000),
      ifsc: 'SBIN0000864',
      upiId: '',
      kycStatus: 'verified',
      joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (farmer: FarmerRecord) => {
    setEditingFarmer(farmer);
    setFormData({
      farmerCode: farmer.farmerCode,
      name: farmer.name,
      teluguName: farmer.teluguName,
      fpo: farmer.fpo,
      primaryCrop: farmer.primaryCrop,
      secondaryCrop: farmer.secondaryCrop || '',
      phone: farmer.phone,
      mandal: farmer.mandal,
      village: farmer.village,
      acres: farmer.acres,
      seasonCapacityMT: farmer.seasonCapacityMT,
      bankAccount: farmer.bankAccount,
      ifsc: farmer.ifsc,
      upiId: farmer.upiId,
      kycStatus: farmer.kycStatus,
      joinedDate: farmer.joinedDate
    });
  };

  const handleSaveAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      onShowToast('Please enter the farmer name');
      return;
    }
    const newRecord: FarmerRecord = {
      ...formData,
      id: `fmr-${Date.now()}`
    };
    onAddFarmer(newRecord);
    setIsAddModalOpen(false);
    onShowToast(`Farmer "${newRecord.name}" (${newRecord.farmerCode}) added successfully!`);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFarmer) return;
    const updated: FarmerRecord = {
      ...formData,
      id: editingFarmer.id
    };
    onUpdateFarmer(updated);
    setEditingFarmer(null);
    onShowToast(`Farmer "${updated.name}" updated successfully!`);
  };

  const handleConfirmDelete = () => {
    if (!deletingFarmer) return;
    onDeleteFarmer(deletingFarmer.id);
    onShowToast(`Farmer record "${deletingFarmer.name}" deleted.`);
    setDeletingFarmer(null);
  };

  const filteredFarmers = farmers.filter((f) => {
    if (kycFilter !== 'all' && f.kycStatus !== kycFilter) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        f.name.toLowerCase().includes(q) ||
        f.teluguName.includes(q) ||
        f.farmerCode.toLowerCase().includes(q) ||
        f.mandal.toLowerCase().includes(q) ||
        f.village.toLowerCase().includes(q) ||
        f.primaryCrop.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Admin Module Switcher */}
      <div className="flex items-center gap-2 p-1.5 bg-[#EDE7DD] rounded-2xl w-fit border border-[#DDC0B6]/50">
        <div className="px-4 py-1.5 rounded-xl bg-[#983c0c] text-white text-xs font-bold shadow-xs flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">nature_people</span>
          <span>🌾 Farmers &amp; FPOs Registry</span>
          <span className="px-1.5 py-0.2 bg-black/20 rounded-full text-[10px]">{farmers.length}</span>
        </div>

        {onSwitchToMerchants && (
          <button
            onClick={onSwitchToMerchants}
            className="px-4 py-1.5 rounded-xl text-xs font-semibold text-[#56423b] hover:bg-white hover:text-[#1a1c1e] transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">storefront</span>
            <span>🏢 Mandi Merchants &amp; Buyers</span>
          </button>
        )}

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

      {/* 1. Header Banner & Quick Action */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-[#c9ead9] text-[#022016] flex items-center justify-center font-bold">
                <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif font-bold text-xl sm:text-2xl text-[#1a1c1e]">
                    Admin Directory: Farmers &amp; FPOs
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#FAF7F2] text-[#983c0c] border border-[#E6DED4]">
                    Admin Console
                  </span>
                </div>
                <p className="text-xs text-[#6F6B64]">
                  రైతులు &amp; FPOల రిజిస్ట్రీ • Add, modify, audit bank KYC, and manage farmer profiles
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">person_add</span>
              <span>+ Register New Farmer</span>
            </button>
          </div>
        </div>

        {/* 4 Directory Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-[#E6DED4]">
          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Active Farmers in Directory</div>
            <div className="font-mono font-bold text-xl text-[#1a1c1e]">{farmers.length} Registered</div>
            <div className="text-[10px] text-emerald-800 font-medium">88 Regional FPOs</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">KYC Verification Rate</div>
            <div className="font-mono font-bold text-xl text-emerald-800">
              {Math.round((farmers.filter(f => f.kycStatus === 'verified').length / (farmers.length || 1)) * 100)}%
            </div>
            <div className="text-[10px] text-[#56423b]">Aadhaar &amp; Land Title Verified</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Total Landholding Area</div>
            <div className="font-mono font-bold text-xl text-[#1a1c1e]">
              {farmers.reduce((acc, f) => acc + f.acres, 0).toFixed(1)} <span className="text-xs font-sans font-normal text-[#8a7269]">Acres</span>
            </div>
            <div className="text-[10px] text-[#476558]">Horticulture Orchard Belt</div>
          </div>

          <div className="p-3 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4]">
            <div className="text-[11px] text-[#8a7269]">Season Harvest Capacity</div>
            <div className="font-mono font-bold text-xl text-[#983c0c]">
              {farmers.reduce((acc, f) => acc + f.seasonCapacityMT, 0).toLocaleString()} <span className="text-xs font-sans font-normal text-[#8a7269]">MT</span>
            </div>
            <div className="text-[10px] text-stone-600">e-NWR Warehousing Ready</div>
          </div>
        </div>
      </div>

      {/* 2. Search & KYC Filters Bar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E6DED4] flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <span className="material-symbols-outlined text-base text-[#8a7269] absolute left-3 top-2.5">
            search
          </span>
          <input
            type="text"
            placeholder="Search farmer name, ID, village, Mandal, crop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] placeholder-[#8a7269] focus:outline-none focus:border-[#983c0c]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#8a7269] font-medium">KYC Filter:</span>
          {(['all', 'verified', 'pending', 'flagged'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setKycFilter(status)}
              className={`px-3 py-1 rounded-xl font-semibold capitalize transition-all ${
                kycFilter === status
                  ? 'bg-[#1A3026] text-white'
                  : 'bg-[#FAF7F2] text-[#56423b] hover:bg-[#EDE7DD]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Farmers Directory Table */}
      <div className="bg-white rounded-3xl border border-[#E6DED4] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E6DED4] text-[#8a7269] uppercase font-bold text-[11px] tracking-wider bg-[#FAF7F2]/50">
                <th className="py-3.5 px-4">Farmer Details &amp; ID</th>
                <th className="py-3.5 px-3">FPO &amp; Location</th>
                <th className="py-3.5 px-3">Produce &amp; Land</th>
                <th className="py-3.5 px-3">Bank &amp; UPI Settlement</th>
                <th className="py-3.5 px-3">KYC Status</th>
                <th className="py-3.5 px-4 text-right">Admin Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6DED4]/60">
              {filteredFarmers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#8a7269]">
                    No farmers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredFarmers.map((f) => (
                  <tr key={f.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                    {/* Farmer Details */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-sm text-[#1a1c1e]">{f.name}</div>
                      <div className="text-[11px] text-[#983c0c] font-semibold">{f.teluguName}</div>
                      <div className="text-[10px] font-mono text-[#8a7269] mt-0.5">
                        {f.farmerCode} • {f.phone}
                      </div>
                    </td>

                    {/* FPO & Location */}
                    <td className="py-3.5 px-3">
                      <div className="font-medium text-[#1a1c1e]">{f.mandal}</div>
                      <div className="text-[11px] text-[#6F6B64]">{f.village}</div>
                      <div className="text-[10px] text-[#476558] font-semibold truncate max-w-[180px]">{f.fpo}</div>
                    </td>

                    {/* Crops & Acreage */}
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#1a1c1e]">{f.primaryCrop}</div>
                      {f.secondaryCrop && (
                        <div className="text-[10px] text-[#6F6B64]">{f.secondaryCrop}</div>
                      )}
                      <div className="text-[11px] text-[#8a7269] mt-0.5">
                        {f.acres} Acres • {f.seasonCapacityMT} MT Cap.
                      </div>
                    </td>

                    {/* Bank / UPI */}
                    <td className="py-3.5 px-3 font-mono text-[11px]">
                      <div className="text-[#1a1c1e] font-semibold">{f.bankAccount}</div>
                      <div className="text-[#8a7269] text-[10px]">{f.ifsc}</div>
                      {f.upiId && <div className="text-emerald-800 text-[10px]">{f.upiId}</div>}
                    </td>

                    {/* KYC Badge */}
                    <td className="py-3.5 px-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        f.kycStatus === 'verified'
                          ? 'bg-[#c9ead9] text-[#022016]'
                          : f.kycStatus === 'pending'
                          ? 'bg-[#FDF4EA] text-[#884800]'
                          : 'bg-[#FFF5F2] text-[#983c0c]'
                      }`}>
                        {f.kycStatus === 'verified' ? 'KYC Verified' : f.kycStatus === 'pending' ? 'KYC Pending' : 'Flagged'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => openEditModal(f)}
                        className="px-2.5 py-1 rounded-lg border border-[#E6DED4] hover:bg-[#FAF7F2] text-xs font-semibold text-[#1a1c1e] transition-colors"
                        title="Edit farmer details"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeletingFarmer(f)}
                        className="px-2.5 py-1 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                        title="Delete farmer"
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

      {/* 4. MODAL: Add / Register Farmer */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  Register New Farmer &amp; Horticulture Lot
                </h3>
                <p className="text-xs text-[#6F6B64]">Add verified grower to the APMC Mandi database</p>
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
                  <label className="block font-semibold text-[#56423b] mb-1">Farmer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                    placeholder="e.g. Ramesh Babu Garu"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Telugu Name (రైతు పేరు)</label>
                  <input
                    type="text"
                    value={formData.teluguName}
                    onChange={(e) => setFormData({ ...formData, teluguName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                    placeholder="e.g. రమేష్ బాబు గారు"
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
                    placeholder="+91 98480 00000"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">FPO Collective</label>
                  <select
                    value={formData.fpo}
                    onChange={(e) => setFormData({ ...formData, fpo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  >
                    <option>Madanapalle West Mango FPO (AP-9842)</option>
                    <option>Punganur Valley Horticulture Cluster</option>
                    <option>Kadiri Citrus Farmers Collective</option>
                    <option>Mulbagal Tomato &amp; Veg Producers</option>
                    <option>Chittoor Pulp Cultivators Sangh</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Mandal</label>
                  <input
                    type="text"
                    value={formData.mandal}
                    onChange={(e) => setFormData({ ...formData, mandal: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Village &amp; Survey No.</label>
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                    placeholder="Valasapalle (Survey 42/B)"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Primary Crop</label>
                  <input
                    type="text"
                    value={formData.primaryCrop}
                    onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Landholding (Acres)</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.acres}
                    onChange={(e) => setFormData({ ...formData, acres: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>
              </div>

              {/* Bank & Settlement Details */}
              <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-[#E6DED4] space-y-2">
                <div className="font-semibold text-[#1a1c1e]">Bank &amp; Escrow Settlement Information</div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] text-[#6F6B64] mb-0.5">Account / Bank</label>
                    <input
                      type="text"
                      value={formData.bankAccount}
                      onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E6DED4] text-xs"
                      placeholder="SBI Madanapalle"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6F6B64] mb-0.5">IFSC Code</label>
                    <input
                      type="text"
                      value={formData.ifsc}
                      onChange={(e) => setFormData({ ...formData, ifsc: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E6DED4] text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6F6B64] mb-0.5">UPI ID</label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      className="w-full px-2.5 py-1.5 rounded-lg bg-white border border-[#E6DED4] text-xs"
                      placeholder="farmer@upi"
                    />
                  </div>
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
                  Save &amp; Register Farmer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: Edit Farmer */}
      {editingFarmer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-xl bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#E6DED4]">
              <div>
                <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                  Modify Farmer Profile ({editingFarmer.farmerCode})
                </h3>
                <p className="text-xs text-[#6F6B64]">Update agricultural records, landholding, or bank details</p>
              </div>
              <button
                onClick={() => setEditingFarmer(null)}
                className="p-1 text-[#8a7269] hover:text-[#1a1c1e]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Farmer Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Telugu Name (రైతు పేరు)</label>
                  <input
                    type="text"
                    value={formData.teluguName}
                    onChange={(e) => setFormData({ ...formData, teluguName: e.target.value })}
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
                  <label className="block font-semibold text-[#56423b] mb-1">Acres</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.acres}
                    onChange={(e) => setFormData({ ...formData, acres: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">KYC Status</label>
                  <select
                    value={formData.kycStatus}
                    onChange={(e) => setFormData({ ...formData, kycStatus: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e] font-semibold"
                  >
                    <option value="verified">Verified (100%)</option>
                    <option value="pending">Pending Audit</option>
                    <option value="flagged">Flagged</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Primary Crop</label>
                  <input
                    type="text"
                    value={formData.primaryCrop}
                    onChange={(e) => setFormData({ ...formData, primaryCrop: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#56423b] mb-1">Secondary Crop</label>
                  <input
                    type="text"
                    value={formData.secondaryCrop}
                    onChange={(e) => setFormData({ ...formData, secondaryCrop: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#E6DED4] text-[#1a1c1e]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingFarmer(null)}
                  className="px-4 py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#983c0c] hover:bg-[#7e2c00] text-white text-xs font-semibold shadow-sm"
                >
                  Apply Modifications
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. MODAL: Delete Confirmation */}
      {deletingFarmer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl border border-[#E6DED4] shadow-2xl p-6 space-y-4 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-2xl">warning</span>
            </div>
            
            <div className="text-center space-y-1">
              <h3 className="font-serif font-bold text-lg text-[#1a1c1e]">
                Delete Farmer Record?
              </h3>
              <p className="text-xs text-[#6F6B64]">
                Are you sure you want to remove <strong>{deletingFarmer.name}</strong> ({deletingFarmer.farmerCode}) from the APMC registry? This action cannot be undone.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeletingFarmer(null)}
                className="py-2 rounded-xl border border-[#E6DED4] text-xs font-semibold text-[#56423b]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="py-2 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-semibold shadow-sm"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
