import React from 'react';
import { Plus, RefreshCw } from 'lucide-react';
import type { NavigationTab } from '../types';

interface TopHeaderProps {
  currentTab: NavigationTab;
  onOpenAddModal: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentTab,
  onOpenAddModal,
  onRefresh,
  isRefreshing,
}) => {
  const getHeaderInfo = () => {
    switch (currentTab) {
      case 'dashboard':
        return {
          title: 'Healthcare Overview',
          subtitle: 'Welcome to your patient medical records portal and health analytics.',
        };
      case 'records':
        return {
          title: 'Medical Records Management',
          subtitle: 'Add, view, filter, edit and securely store clinical documentation.',
        };
      case 'tracker':
        return {
          title: 'Health Tracker (Preview)',
          subtitle: 'Continuous vitals tracking and biometric telemetry monitoring.',
        };
      case 'reminders':
        return {
          title: 'Reminders & Prescriptions (Preview)',
          subtitle: 'Automated medication schedules and doctor appointment reminders.',
        };
      case 'analytics':
        return {
          title: 'Diagnostic Analytics (Preview)',
          subtitle: 'Historical trends, specialty visit breakdowns, and health metrics.',
        };
      case 'ai-assistant':
        return {
          title: 'MediAssist AI Agent (Architecture Preview)',
          subtitle: 'Future Python FastAPI & LLM service for automated clinical intelligence.',
        };
    }
  };

  const { title, subtitle } = getHeaderInfo();

  return (
    <header className="top-header">
      <div className="page-title-group">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>

      <div className="header-actions">
        <button
          className="btn-secondary"
          onClick={onRefresh}
          title="Refresh Data"
          disabled={isRefreshing}
        >
          <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
          <span>Sync</span>
        </button>

        <button
          className="btn-primary"
          onClick={onOpenAddModal}
          id="btn-add-record-header"
        >
          <Plus size={16} />
          <span>Add Record</span>
        </button>
      </div>
    </header>
  );
};
