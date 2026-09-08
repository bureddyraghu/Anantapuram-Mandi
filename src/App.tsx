import React, { useState } from 'react';
import { AppView, ConsignmentItem } from './types';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './views/DashboardView';
import { ProcurementView } from './views/ProcurementView';
import { FarmerListingView } from './views/FarmerListingView';
import { NetworkZonesView } from './views/NetworkZonesView';
import { GenericSectionView } from './views/GenericSectionView';
import { PriceEquilibriumModal } from './components/modals/PriceEquilibriumModal';
import { CreateZoneModal } from './components/modals/CreateZoneModal';
import { ConsignmentTrackModal } from './components/modals/ConsignmentTrackModal';
import { ContractSignModal } from './components/modals/ContractSignModal';
import { CONSIGNMENT_ITEMS } from './data/mockData';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('dashboard');
  const [selectedZone, setSelectedZone] = useState('All South India (128 Mandis)');
  const [isMobileFarmerMode, setIsMobileFarmerMode] = useState(false);

  // Modals state
  const [isEquilibriumModalOpen, setIsEquilibriumModalOpen] = useState(false);
  const [isCreateZoneModalOpen, setIsCreateZoneModalOpen] = useState(false);
  const [isSignModalOpen, setIsSignModalOpen] = useState(false);
  const [activeTrackingConsignment, setActiveTrackingConsignment] = useState<ConsignmentItem | null>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
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

      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        selectedZone={selectedZone}
        setSelectedZone={setSelectedZone}
        isMobileFarmerMode={isMobileFarmerMode}
        setIsMobileFarmerMode={setIsMobileFarmerMode}
        onOpenEquilibriumModal={() => setIsEquilibriumModalOpen(true)}
        onOpenCreateZoneModal={() => setIsCreateZoneModalOpen(true)}
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar (shown on desktop OS mode) */}
        {!isMobileFarmerMode && (
          <div className="hidden md:block">
            <Sidebar
              currentView={currentView}
              setCurrentView={setCurrentView}
              isMobileFarmerMode={isMobileFarmerMode}
              setIsMobileFarmerMode={setIsMobileFarmerMode}
            />
          </div>
        )}

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {isMobileFarmerMode ? (
            <FarmerListingView
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
          ) : currentView === 'farmer-listing' ? (
            <FarmerListingView
              onBackToOS={() => {
                setIsMobileFarmerMode(false);
                setCurrentView('dashboard');
              }}
              onShowToast={showToast}
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
