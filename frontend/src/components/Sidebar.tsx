import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Activity, 
  Bell, 
  BarChart3, 
  Bot, 
  HeartPulse, 
  Database 
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface SidebarProps {
  currentTab: NavigationTab;
  onTabChange: (tab: NavigationTab) => void;
  isBackendConnected: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onTabChange,
  isBackendConnected,
}) => {
  const navItems = [
    { id: 'dashboard' as NavigationTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'records' as NavigationTab, label: 'Medical Records', icon: FileText, highlight: true },
    { id: 'tracker' as NavigationTab, label: 'Health Tracker', icon: Activity, soon: true },
    { id: 'reminders' as NavigationTab, label: 'Reminders', icon: Bell, soon: true },
    { id: 'analytics' as NavigationTab, label: 'Analytics', icon: BarChart3, soon: true },
    { id: 'ai-assistant' as NavigationTab, label: 'AI Assistant', icon: Bot, soon: true },
  ];

  return (
    <aside className="sidebar">
      <div className="brand-section">
        <div className="brand-icon-wrapper">
          <HeartPulse size={22} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span className="brand-title">MediAssist</span>
            <span className="brand-badge">MVP</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
            Clinical Records System
          </span>
        </div>
      </div>

      <ul className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <li
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onTabChange(item.id)}
            >
              <Icon size={18} />
              <span>{item.label}</span>
              {item.soon && <span className="nav-tag-soon">Soon</span>}
            </li>
          );
        })}
      </ul>

      <div className="sidebar-footer">
        <div className="db-status-pill">
          <Database size={14} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span className={`status-dot ${isBackendConnected ? 'online' : 'offline'}`} />
              <span style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.75rem' }}>
                {isBackendConnected ? 'Java API Online' : 'Backend Offline'}
              </span>
            </div>
            <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)', marginTop: '2px' }}>
              H2 Persistent Storage
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
