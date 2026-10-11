import { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopHeader } from './components/TopHeader';
import { DashboardView } from './components/DashboardView';
import { RecordsList } from './components/RecordsList';
import { ComingSoonView } from './components/ComingSoonView';
import { RecordModal } from './components/RecordModal';
import { RecordDetailDrawer } from './components/RecordDetailDrawer';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { medicalApi } from './services/api';
import type { MedicalRecord, NavigationTab, RecordStats } from './types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [stats, setStats] = useState<RecordStats>({ totalRecords: 0, countByType: {} });
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI / Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);
  const [viewingRecord, setViewingRecord] = useState<MedicalRecord | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<MedicalRecord | null>(null);
  
  // Async states
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBackendConnected, setIsBackendConnected] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3800);
  };

  const loadData = useCallback(async (query?: string, silent = false) => {
    try {
      if (!silent) setIsLoading(true);
      const [fetchedRecords, fetchedStats] = await Promise.all([
        medicalApi.getRecords(query),
        medicalApi.getStats().catch(() => ({ totalRecords: 0, countByType: {} })),
      ]);
      setRecords(fetchedRecords);
      setStats(fetchedStats);
      setIsBackendConnected(true);
    } catch (err) {
      console.error('Failed to load records:', err);
      setIsBackendConnected(false);
      showToast(
        'Backend connection failed. Ensure Spring Boot is running on port 8080.',
        'error'
      );
    } finally {
      if (!silent) setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Debounced Search
  useEffect(() => {
    const handler = setTimeout(() => {
      loadData(searchQuery, true);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchQuery, loadData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData(searchQuery, true);
    setIsRefreshing(false);
    showToast('Medical records synced from database');
  };

  const handleOpenAddModal = () => {
    setEditingRecord(null);
    setIsModalOpen(true);
  };

  const handleEditRecord = (record: MedicalRecord) => {
    setEditingRecord(record);
    setIsModalOpen(true);
  };

  const handleSaveRecord = async (recordData: Omit<MedicalRecord, 'id' | 'createdAt'>) => {
    try {
      setIsSubmitting(true);
      if (editingRecord && editingRecord.id) {
        const updated = await medicalApi.updateRecord(editingRecord.id, recordData);
        showToast(`Record "${updated.title}" successfully updated`);
      } else {
        const created = await medicalApi.createRecord(recordData);
        showToast(`New record "${created.title}" saved to H2 database`);
      }
      setIsModalOpen(false);
      setEditingRecord(null);
      await loadData(searchQuery, true);
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deletingRecord || !deletingRecord.id) return;
    try {
      setIsSubmitting(true);
      await medicalApi.deleteRecord(deletingRecord.id);
      showToast(`Record "${deletingRecord.title}" deleted`);
      setDeletingRecord(null);
      await loadData(searchQuery, true);
    } catch (err) {
      console.error(err);
      showToast('Failed to delete medical record', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Fixed Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        isBackendConnected={isBackendConnected}
      />

      {/* Main App Canvas */}
      <div className="main-wrapper">
        <TopHeader
          currentTab={currentTab}
          onOpenAddModal={handleOpenAddModal}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
        />

        <main className="page-container">
          {currentTab === 'dashboard' && (
            <DashboardView
              records={records}
              stats={stats}
              onNavigateToRecords={() => setCurrentTab('records')}
              onOpenAddModal={handleOpenAddModal}
              onViewRecord={(rec) => setViewingRecord(rec)}
            />
          )}

          {currentTab === 'records' && (
            <RecordsList
              records={records}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onViewRecord={(rec) => setViewingRecord(rec)}
              onEditRecord={handleEditRecord}
              onDeleteRecord={(rec) => setDeletingRecord(rec)}
              onAddNew={handleOpenAddModal}
              isLoading={isLoading}
            />
          )}

          {currentTab !== 'dashboard' && currentTab !== 'records' && (
            <ComingSoonView
              tab={currentTab}
              onNavigateToRecords={() => setCurrentTab('records')}
            />
          )}
        </main>
      </div>

      {/* Modals & Drawers */}
      <RecordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRecord(null);
        }}
        onSave={handleSaveRecord}
        initialData={editingRecord}
      />

      <RecordDetailDrawer
        record={viewingRecord}
        onClose={() => setViewingRecord(null)}
        onEdit={handleEditRecord}
        onDelete={(rec) => setDeletingRecord(rec)}
      />

      <DeleteConfirmModal
        isOpen={!!deletingRecord}
        record={deletingRecord}
        onClose={() => setDeletingRecord(null)}
        onConfirm={handleConfirmDelete}
        isDeleting={isSubmitting}
      />

      {/* Floating Notifications */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
