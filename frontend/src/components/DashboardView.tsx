import React from 'react';
import { 
  FileText, 
  Calendar, 
  Database, 
  Activity, 
  Plus, 
  ArrowRight, 
  User, 
  Paperclip,
  CheckCircle2
} from 'lucide-react';
import type { MedicalRecord, RecordStats } from '../types';

interface DashboardViewProps {
  records: MedicalRecord[];
  stats: RecordStats;
  onNavigateToRecords: () => void;
  onOpenAddModal: () => void;
  onViewRecord: (record: MedicalRecord) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  records,
  stats,
  onNavigateToRecords,
  onOpenAddModal,
  onViewRecord,
}) => {
  const latestRecord = records.length > 0 ? records[0] : null;
  const recentRecords = records.slice(0, 4);

  // Find top category
  let topCategory = 'None';
  let maxCount = 0;
  if (stats.countByType) {
    Object.entries(stats.countByType).forEach(([cat, count]) => {
      if (count > maxCount) {
        maxCount = count;
        topCategory = cat;
      }
    });
  }

  const getTypeBadgeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lab report': return 'lab';
      case 'prescription': return 'prescription';
      case 'consultation note': return 'consultation';
      case 'discharge summary': return 'discharge';
      case 'radiology / imaging': return 'radiology';
      case 'vaccination': return 'vaccination';
      default: return 'default';
    }
  };

  return (
    <div>
      {/* Metric Cards Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon cyan">
            <FileText size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalRecords}</div>
            <div className="stat-label">Total Medical Records</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon emerald">
            <Calendar size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-value" style={{ fontSize: '1.25rem' }}>
              {latestRecord ? latestRecord.visitDate : 'None yet'}
            </div>
            <div className="stat-label">Most Recent Encounter</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            <Activity size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-value" style={{ fontSize: '1.2rem' }}>
              {topCategory}
            </div>
            <div className="stat-label">Dominant Category ({maxCount})</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon amber">
            <Database size={22} />
          </div>
          <div className="stat-info">
            <div className="stat-value" style={{ fontSize: '1.1rem', color: '#6ee7b7' }}>
              Persistent H2
            </div>
            <div className="stat-label">Disk Storage Active</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Category Breakdown + Recent Records */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
        
        {/* Category Breakdown Card */}
        <div className="records-table-container" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
              Records by Category
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              {Object.keys(stats.countByType || {}).length} Categories
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {stats.countByType && Object.keys(stats.countByType).length > 0 ? (
              Object.entries(stats.countByType).map(([cat, count]) => {
                const percentage = stats.totalRecords > 0 
                  ? Math.round((count / stats.totalRecords) * 100) 
                  : 0;

                return (
                  <div key={cat}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                      <span style={{ color: '#e2e8f0', fontWeight: 500 }}>{cat}</span>
                      <span style={{ color: 'var(--text-muted)' }}>{count} records ({percentage}%)</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '999px', overflow: 'hidden' }}>
                      <div 
                        style={{ 
                          width: `${percentage}%`, 
                          height: '100%', 
                          background: 'linear-gradient(90deg, #0ea5e9, #10b981)',
                          borderRadius: '999px'
                        }} 
                      />
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>No categorized records found.</p>
            )}
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Need to record new findings?</span>
            <button className="btn-primary" onClick={onOpenAddModal} style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}>
              <Plus size={14} />
              <span>Add Record</span>
            </button>
          </div>
        </div>

        {/* System & Architecture Status Card */}
        <div className="records-table-container" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff' }}>
              Service Verification & Persistence
            </h3>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', fontWeight: 600 }}>
              VERIFIED
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fff' }}>Persistent H2 Database:</strong> Data saved to <code>./data/mediassist.mv.db</code>. Records survive backend reboots.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fff' }}>Clean Spring Boot Layering:</strong> Entity, Repository, Service, and REST Controller with Hibernate JPA.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fff' }}>REST API Standards:</strong> Full CRUD support, validation annotations, and case-insensitive query search.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', color: '#cbd5e1' }}>
              <CheckCircle2 size={16} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <strong style={{ color: '#fff' }}>Future AI Ready:</strong> Architecture structured for seamless integration with Python FastAPI clinical agent.
              </div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Explore all records table</span>
            <button className="btn-secondary" onClick={onNavigateToRecords} style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem' }}>
              <span>View All Records</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Recent Records Section */}
      <div className="records-table-container" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Recent Clinical Records
            </h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Latest patient visits and medical document entries
            </p>
          </div>
          <button className="btn-secondary" onClick={onNavigateToRecords} style={{ fontSize: '0.82rem' }}>
            <span>Browse All ({records.length})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {recentRecords.length === 0 ? (
          <p style={{ color: 'var(--text-subtle)', textAlign: 'center', padding: '2rem' }}>
            No records found. Click "Add Record" to create one.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {recentRecords.map((r) => (
              <div 
                key={r.id} 
                className="stat-card" 
                style={{ flexDirection: 'column', alignItems: 'flex-start', padding: '1.15rem', cursor: 'pointer' }}
                onClick={() => onViewRecord(r)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <span className={`type-badge ${getTypeBadgeClass(r.type)}`}>
                    {r.type}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                    {r.visitDate}
                  </span>
                </div>

                <div style={{ fontWeight: 600, color: '#fff', fontSize: '0.92rem', margin: '0.5rem 0 0.25rem 0' }}>
                  {r.title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                  <User size={12} />
                  <span>{r.doctor}</span>
                </div>

                {r.filename && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <span className="file-pill">
                      <Paperclip size={10} />
                      <span>{r.filename}</span>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
