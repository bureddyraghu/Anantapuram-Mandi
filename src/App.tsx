import React, { useState } from 'react';
import { AppView, ConsignmentItem, UserAccount } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { ProcurementView } from './views/ProcurementView';
import { FarmerListingView } from './views/FarmerListingView';
import { NetworkZonesView } from './views/NetworkZonesView';
import { GenericSectionView } from './views/GenericSectionView';
import { MerchantPortalView } from './views/MerchantPortalView';
import { AdminFarmersView } from './views/admin/AdminFarmersView';
import { AdminMerchantsView } from './views/admin/AdminMerchantsView';
import { AdminUsersView } from './views/admin/AdminUsersView';
import { PriceEquilibriumModal } from './components/modals/PriceEquilibriumModal';
import { CreateZoneModal } from './components/modals/CreateZoneModal';
import { ConsignmentTrackModal } from './components/modals/ConsignmentTrackModal';
import { ContractSignModal } from './components/modals/ContractSignModal';
import { CreateRFQModal } from './components/modals/CreateRFQModal';
import { LoginModal } from './components/modals/LoginModal';
import { UpdatePasswordModal } from './components/modals/UpdatePasswordModal';
import { LoginView } from './views/LoginView';
import { FarmerLoginView } from './views/FarmerLoginView';
import { MerchantLoginView } from './views/MerchantLoginView';
import { CONSIGNMENT_ITEMS, INITIAL_FARMER_RECORDS, INITIAL_MERCHANT_RECORDS } from './data/mockData';
import { INITIAL_USER_ACCOUNTS } from './data/mockUsers';
import { FarmerRecord, MerchantRecord } from './types';

export default function App() {
  // Parse initial state from URL parameters or hash
  const getInitialMode = () => {
    if (typeof window === 'undefined') return { view: 'dashboard' as AppView, isFarmer: false };
    const params = new URLSearchParams(window.location.search);
    const hash = window.location.hash.toLowerCase();
    const appParam = params.get('app') || params.get('mode') || params.get('view');

    if (appParam === 'farmer-login' || hash.includes('farmer-login')) {
      return { view: 'farmer-login' as AppView, isFarmer: true };
    }
    if (appParam === 'merchant-login' || hash.includes('merchant-login')) {
      return { view: 'merchant-login' as AppView, isFarmer: false };
    }
    if (appParam === 'farmer' || hash.includes('farmer')) {
      return { view: 'farmer-listing' as AppView, isFarmer: true };
    }
    if (appParam === 'merchant' || appParam === 'buyer' || hash.includes('merchant')) {
      return { view: 'merchant-portal' as AppView, isFarmer: false };
    }
    if (appParam === 'farmers' || appParam === 'admin-farmers' || hash.includes('farmers')) {
      return { view: 'farmers-and-fpos' as AppView, isFarmer: false };
    }
    if (appParam === 'merchants' || appParam === 'admin-merchants' || hash.includes('merchants')) {
      return { view: 'mandi-merchants' as AppView, isFarmer: false };
    }
    if (appParam === 'users' || appParam === 'admin-users' || hash.includes('users')) {
      return { view: 'admin-users' as AppView, isFarmer: false };
    }
    if (appParam === 'procurement' || hash.includes('procurement')) {
      return { view: 'procurement-orders-and-weighment' as AppView, isFarmer: false };
    }
    if (appParam === 'zones' || hash.includes('zones')) {
      return { view: 'network-and-zones' as AppView, isFarmer: false };
    }
    if (appParam === 'login' || hash.includes('login') || appParam === 'roles') {
      return { view: 'login' as AppView, isFarmer: false };
    }
    return { view: 'dashboard' as AppView, isFarmer: false };
  };

  const initial = getInitialMode();
  const [currentView, setCurrentView] = useState<AppView>(initial.view);
  const [selectedZone, setSelectedZone] = useState('All South India (128 Mandis)');
  const [isMobileFarmerMode, setIsMobileFarmerMode] = useState(initial.isFarmer);

  // User Accounts & Authentication State
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USER_ACCOUNTS);
  const [currentUser, setCurrentUser] = useState<UserAccount>(INITIAL_USER_ACCOUNTS[0]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUpdatePasswordModalOpen, setIsUpdatePasswordModalOpen] = useState(false);
  const [forcePasswordChangeUser, setForcePasswordChangeUser] = useState<UserAccount | null>(null);

  // Admin Farmers & Merchants Persistent State
  const [farmers, setFarmers] = useState<FarmerRecord[]>(INITIAL_FARMER_RECORDS);
  const [merchants, setMerchants] = useState<MerchantRecord[]>(INITIAL_MERCHANT_RECORDS);

  // Farmers CRUD handlers
  const handleAddFarmer = (newFarmer: FarmerRecord) => {
    setFarmers((prev) => [newFarmer, ...prev]);
  };
  const handleUpdateFarmer = (updatedFarmer: FarmerRecord) => {
    setFarmers((prev) => prev.map((f) => (f.id === updatedFarmer.id ? updatedFarmer : f)));
  };
  const handleDeleteFarmer = (id: string) => {
    setFarmers((prev) => prev.filter((f) => f.id !== id));
  };

  // Merchants CRUD handlers
  const handleAddMerchant = (newMerchant: MerchantRecord) => {
    setMerchants((prev) => [newMerchant, ...prev]);
  };
  const handleUpdateMerchant = (updatedMerchant: MerchantRecord) => {
    setMerchants((prev) => prev.map((m) => (m.id === updatedMerchant.id ? updatedMerchant : m)));
  };
  const handleDeleteMerchant = (id: string) => {
    setMerchants((prev) => prev.filter((m) => m.id !== id));
  };

  // Guard navigation based on role constraints
  const handleNavigateView = (view: AppView) => {
    if (currentUser.role === 'merchant') {
      if (view !== 'merchant-portal' && view !== 'merchant-login' && view !== 'login') {
        showToast('⚠️ Access Restricted: Merchant/Buyer accounts do not have access to Dashboard or Corridor Command Center.');
        setCurrentView('merchant-portal');
        return;
      }
    }
    if (currentUser.role === 'farmer') {
      if (view !== 'farmer-listing' && view !== 'farmer-login' && view !== 'login') {
        showToast('⚠️ Access Restricted: Farmer accounts are restricted to రైతు యాప్.');
        setCurrentView('farmer-listing');
        setIsMobileFarmerMode(true);
        return;
      }
    }
    setCurrentView(view);
  };

  // Enforce role isolation: Merchants cannot access Dashboard or Command OS
  React.useEffect(() => {
    if (currentUser.role === 'merchant' && currentView !== 'merchant-portal' && currentView !== 'merchant-login' && currentView !== 'login') {
      showToast('⚠️ Access Restricted: Merchant accounts do not have access to Dashboard or Corridor Command Center.');
      setCurrentView('merchant-portal');
    }
  }, [currentUser.role, currentView]);

  // Users CRUD handlers
  const handleAddUser = (newUser: UserAccount) => {
    setUsers((prev) => [newUser, ...prev]);
  };
  const handleUpdateUser = (updatedUser: UserAccount) => {
    setUsers((prev) => prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    if (currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };
  const handleDeleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  // Login & Password Update Flows
  const handleLoginSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setIsLoginModalOpen(false);

    // Direct to role-appropriate portal
    if (user.role === 'farmer') {
      setIsMobileFarmerMode(true);
      setCurrentView('farmer-listing');
    } else if (user.role === 'merchant') {
      setIsMobileFarmerMode(false);
      setCurrentView('merchant-portal');
    } else {
      setIsMobileFarmerMode(false);
      if (currentView === 'farmer-listing' || currentView === 'merchant-portal') {
        setCurrentView('dashboard');
      }
    }
    showToast(`Logged in successfully as ${user.name} (${user.role.toUpperCase()})`);
  };

  const handleRequirePasswordChange = (user: UserAccount) => {
    setCurrentUser(user);
    setForcePasswordChangeUser(user);
    setIsLoginModalOpen(false);
    setIsUpdatePasswordModalOpen(true);
    showToast(`Welcome ${user.name}! Please update your default password to proceed.`);
  };

  const handlePasswordUpdated = (updatedUser: UserAccount) => {
    handleUpdateUser(updatedUser);
    setForcePasswordChangeUser(null);
    setIsUpdatePasswordModalOpen(false);

    // Direct to role-appropriate portal
    if (updatedUser.role === 'farmer') {
      setIsMobileFarmerMode(true);
      setCurrentView('farmer-listing');
    } else if (updatedUser.role === 'merchant') {
      setIsMobileFarmerMode(false);
      setCurrentView('merchant-portal');
    }

    showToast(`Password successfully updated for ${updatedUser.name}! Your account is secure.`);
  };

  const handleLogout = () => {
    if (currentUser.role === 'farmer' || isMobileFarmerMode || currentView === 'farmer-listing' || currentView === 'farmer-login') {
      setCurrentView('farmer-login');
      setIsMobileFarmerMode(true);
      showToast('Signed out of రైతు యాప్. Enter your mobile number to sign in.');
    } else if (currentUser.role === 'merchant' || currentView === 'merchant-portal' || currentView === 'merchant-login') {
      setCurrentView('merchant-login');
      setIsMobileFarmerMode(false);
      showToast('Signed out of Merchant Terminal. Authenticate with your trader credentials.');
    } else {
      setCurrentView('login');
      setIsMobileFarmerMode(false);
      showToast('Signed out of Mandi Corridor. Select your authentication portal.');
    }
  };

  // Sync URL query params and hash when view or mode changes
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const url = new URL(window.location.href);

    if (currentView === 'farmer-login') {
      url.searchParams.set('app', 'farmer-login');
      url.hash = '#farmer-login';
    } else if (currentView === 'merchant-login') {
      url.searchParams.set('app', 'merchant-login');
      url.hash = '#merchant-login';
    } else if (isMobileFarmerMode || currentView === 'farmer-listing') {
      url.searchParams.set('app', 'farmer');
      url.hash = '#farmer';
    } else if (currentView === 'merchant-portal') {
      url.searchParams.set('app', 'merchant');
      url.hash = '#merchant';
    } else if (currentView === 'farmers-and-fpos') {
      url.searchParams.set('app', 'farmers');
      url.hash = '#farmers-and-fpos';
    } else if (currentView === 'mandi-merchants') {
      url.searchParams.set('app', 'merchants');
      url.hash = '#mandi-merchants';
    } else if (currentView === 'admin-users') {
      url.searchParams.set('app', 'users');
      url.hash = '#admin-users';
    } else if (currentView === 'procurement-orders-and-weighment') {
      url.searchParams.set('app', 'procurement');
      url.hash = '#procurement';
    } else if (currentView === 'network-and-zones') {
      url.searchParams.set('app', 'zones');
      url.hash = '#zones';
    } else if (currentView === 'login') {
      url.searchParams.set('app', 'login');
      url.hash = '#login';
    } else {
      url.searchParams.set('app', 'mandi');
      url.hash = '#command-os';
    }
    window.history.replaceState({}, '', url.toString());
  }, [currentView, isMobileFarmerMode]);

  // Handle browser back/forward navigation
  React.useEffect(() => {
    const handlePopState = () => {
      const mode = getInitialMode();
      setCurrentView(mode.view);
      setIsMobileFarmerMode(mode.isFarmer);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Modals state
  const [isEquilibriumModalOpen, setIsEquilibriumModalOpen] = useState(false);
  const [isCreateZoneModalOpen, setIsCreateZoneModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [isCreateRFQModalOpen, setIsCreateRFQModalOpen] = useState(false);
  const [activeTrackingConsignment, setActiveTrackingConsignment] = useState<ConsignmentItem | null>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4200);
  };

  const handleOpenConsignmentByCode = (code: string) => {
    const item = CONSIGNMENT_ITEMS.find((c) => c.poCode === code) || CONSIGNMENT_ITEMS[0];
    setActiveTrackingConsignment(item);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1a1c1e] flex flex-col font-body-md selection:bg-[#983c0c]/20">
      
      {/* Toast Notification Alert */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-3 max-w-md">
          <div className="p-3.5 rounded-2xl bg-[#1A3026] text-white shadow-2xl border border-emerald-800/40 flex items-center gap-3 text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0"></span>
            <span className="flex-1 font-medium">{toastMessage}</span>
            <button
              onClick={() => setToastMessage(null)}
              className="text-stone-400 hover:text-white"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Must Update Password Warning Banner */}
      {currentUser.mustChangePassword && (
        <div className="bg-[#983c0c] text-white px-4 py-2 text-xs flex items-center justify-between shadow-xs sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">warning</span>
            <span>
              <strong>First Login Security Notice:</strong> You are currently logged in with an initial default password. Please update your new permanent password.
            </span>
          </div>
          <button
            onClick={() => setIsUpdatePasswordModalOpen(true)}
            className="px-3 py-1 bg-white text-[#983c0c] font-bold rounded-lg text-xs hover:bg-stone-100 transition-colors shadow-2xs"
          >
            Update New Password Now
          </button>
        </div>
      )}

      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={handleNavigateView}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        isMobileFarmerMode={isMobileFarmerMode}
        setIsMobileFarmerMode={setIsMobileFarmerMode}
        onOpenEquilibriumModal={() => setIsEquilibriumModalOpen(true)}
        onOpenCreateZoneModal={() => setIsCreateZoneModalOpen(true)}
        currentUser={currentUser}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onOpenUpdatePasswordModal={() => setIsUpdatePasswordModalOpen(true)}
        onLogout={handleLogout}
        onShowToast={showToast}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Corridor Command Center Sidebar (Strictly hidden in Farmer Mode, Merchant/Buyer App, and Login Views) */}
        {!isMobileFarmerMode &&
          currentView !== 'merchant-portal' &&
          currentUser.role !== 'merchant' &&
          currentView !== 'login' &&
          currentView !== 'farmer-login' &&
          currentView !== 'merchant-login' && (
          <div className="hidden md:block">
            <Sidebar
              currentView={currentView}
              setCurrentView={handleNavigateView}
              isMobileFarmerMode={isMobileFarmerMode}
              setIsMobileFarmerMode={setIsMobileFarmerMode}
              currentUser={currentUser}
              onOpenLoginModal={() => setIsLoginModalOpen(true)}
              onLogout={handleLogout}
            />
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {currentView === 'farmer-login' ? (
            <FarmerLoginView
              users={users}
              onLoginSuccess={handleLoginSuccess}
              onRequirePasswordChange={handleRequirePasswordChange}
              onBackToApp={() => {
                setIsMobileFarmerMode(true);
                setCurrentView('farmer-listing');
              }}
            />
          ) : currentView === 'merchant-login' ? (
            <MerchantLoginView
              users={users}
              onLoginSuccess={handleLoginSuccess}
              onRequirePasswordChange={handleRequirePasswordChange}
              onBackToApp={() => {
                setIsMobileFarmerMode(false);
                setCurrentView('merchant-portal');
              }}
            />
          ) : isMobileFarmerMode ? (
            <FarmerListingView
              currentUserRole={currentUser.role}
              onBackToOS={() => {
                setIsMobileFarmerMode(false);
                setCurrentView('dashboard');
              }}
              onShowToast={showToast}
            />
          ) : currentView === 'dashboard' ? (
            <DashboardView
              onNavigate={(v) => {
                if (v === 'farmer-listing') {
                  setIsMobileFarmerMode(true);
                }
                setCurrentView(v);
              }}
              onOpenEquilibriumModal={() => setIsEquilibriumModalOpen(true)}
              onOpenCreateZoneModal={() => setIsCreateZoneModalOpen(true)}
              onOpenConsignmentModal={handleOpenConsignmentByCode}
              onShowToast={showToast}
            />
          ) : currentView === 'procurement-orders-and-weighment' ? (
            <ProcurementView
              onOpenSignModal={() => setIsSignModalOpen(true)}
              onOpenConsignmentModal={(item) => setActiveTrackingConsignment(item)}
              onShowToast={showToast}
            />
          ) : currentView === 'network-and-zones' ? (
            <NetworkZonesView
              onOpenCreateZoneModal={() => setIsCreateZoneModalOpen(true)}
              onShowToast={showToast}
            />
          ) : currentView === 'merchant-portal' ? (
            <MerchantPortalView
              currentUser={currentUser}
              onOpenCreateRFQ={() => setIsCreateRFQModalOpen(true)}
              onOpenContractSign={() => setIsSignModalOpen(true)}
              onOpenConsignmentModal={(item) => setActiveTrackingConsignment(item)}
              onShowToast={showToast}
              onSwitchToFarmer={
                currentUser.role === 'admin'
                  ? () => {
                      setIsMobileFarmerMode(true);
                      setCurrentView('farmer-listing');
                    }
                  : undefined
              }
            />
          ) : currentView === 'farmers-and-fpos' ? (
            <AdminFarmersView
              farmers={farmers}
              onAddFarmer={handleAddFarmer}
              onUpdateFarmer={handleUpdateFarmer}
              onDeleteFarmer={handleDeleteFarmer}
              onShowToast={showToast}
              onSwitchToMerchants={() => setCurrentView('mandi-merchants')}
              onSwitchToUsers={() => setCurrentView('admin-users')}
            />
          ) : currentView === 'mandi-merchants' ? (
            <AdminMerchantsView
              merchants={merchants}
              onAddMerchant={handleAddMerchant}
              onUpdateMerchant={handleUpdateMerchant}
              onDeleteMerchant={handleDeleteMerchant}
              onShowToast={showToast}
              onSwitchToFarmers={() => setCurrentView('farmers-and-fpos')}
              onSwitchToUsers={() => setCurrentView('admin-users')}
            />
          ) : currentView === 'admin-users' ? (
            <AdminUsersView
              users={users}
              onAddUser={handleAddUser}
              onUpdateUser={handleUpdateUser}
              onDeleteUser={handleDeleteUser}
              onShowToast={showToast}
              onSwitchToFarmers={() => setCurrentView('farmers-and-fpos')}
              onSwitchToMerchants={() => setCurrentView('mandi-merchants')}
            />
          ) : currentView === 'farmer-listing' ? (
            <FarmerListingView
              currentUserRole={currentUser.role}
              onBackToOS={() => {
                setIsMobileFarmerMode(false);
                setCurrentView('dashboard');
              }}
              onShowToast={showToast}
            />
          ) : currentView === 'login' ? (
            <LoginView
              users={users}
              onLoginSuccess={handleLoginSuccess}
              onRequirePasswordChange={handleRequirePasswordChange}
              initialRole={currentUser.role}
              currentUserRole={currentUser.role}
              onBackToDashboard={() => {
                if (currentUser.role === 'farmer') {
                  setIsMobileFarmerMode(true);
                  setCurrentView('farmer-listing');
                } else if (currentUser.role === 'merchant') {
                  setIsMobileFarmerMode(false);
                  setCurrentView('merchant-portal');
                } else {
                  setIsMobileFarmerMode(false);
                  setCurrentView('dashboard');
                }
              }}
            />
          ) : (
            <GenericSectionView
              view={currentView}
              onNavigate={(v) => {
                if (v === 'farmer-listing') {
                  setIsMobileFarmerMode(true);
                }
                setCurrentView(v);
              }}
              onShowToast={showToast}
            />
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        initialRole={currentUser.role}
        restrictRole={currentUser.role === 'admin' ? undefined : currentUser.role}
        users={users}
        onLoginSuccess={handleLoginSuccess}
        onRequirePasswordChange={handleRequirePasswordChange}
      />

      <UpdatePasswordModal
        isOpen={isUpdatePasswordModalOpen}
        user={forcePasswordChangeUser || currentUser}
        isMandatory={!!forcePasswordChangeUser || currentUser.mustChangePassword}
        onClose={() => {
          if (!forcePasswordChangeUser && !currentUser.mustChangePassword) {
            setIsUpdatePasswordModalOpen(false);
          }
        }}
        onSuccess={handlePasswordUpdated}
      />

      <CreateRFQModal
        isOpen={isCreateRFQModalOpen}
        onClose={() => setIsCreateRFQModalOpen(false)}
        onRFQCreated={(rfq) => {
          showToast(`RFQ ${rfq.rfqCode} broadcasted to 24,580 farmers across South India!`);
        }}
      />

      <PriceEquilibriumModal
        isOpen={isEquilibriumModalOpen}
        onClose={() => setIsEquilibriumModalOpen(false)}
        onSimulateApply={(tons, price) => {
          showToast(`Equilibrium simulated: ${tons} MT diverted at ₹${price.toFixed(2)}/kg.`);
        }}
      />

      <CreateZoneModal
        isOpen={isCreateZoneModalOpen}
        onClose={() => setIsCreateZoneModalOpen(false)}
        onZoneCreated={(name) => {
          showToast(`Zone "${name}" successfully registered into APMC Inter-State Grid.`);
          setSelectedZone(name);
        }}
      />

      <ConsignmentTrackModal
        item={activeTrackingConsignment}
        onClose={() => setActiveTrackingConsignment(null)}
      />

      <ContractSignModal
        isOpen={isSignModalOpen}
        onClose={() => setIsSignModalOpen(false)}
        onSuccess={() => {
          showToast('Digital Mandi PO #MND-PO-2026-9921 signed with DSC token. ₹1,48,800 Escrow held.');
        }}
      />
    </div>
  );
}
