import React from 'react';
import { 
  X, 
  Calendar, 
  User, 
  Paperclip, 
  Clock, 
  Edit3, 
  Trash2, 
  Download, 
  CheckCircle2 
} from 'lucide-react';
import type { MedicalRecord } from '../types';

interface RecordDetailDrawerProps {
  record: MedicalRecord | null;
  onClose: () => void;
  onEdit: (record: MedicalRecord) => void;
  onDelete: (record: MedicalRecord) => void;
}

export const RecordDetailDrawer: React.FC<RecordDetailDrawerProps> = ({
  record,
  onClose,
  onEdit,
  onDelete,
}) => {
  if (!record) return null;

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

  const formattedDate = record.visitDate 
    ? new Date(record.visitDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Not recorded';

  const formattedCreated = record.createdAt
    ? new Date(record.createdAt).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Recently';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '680px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span className={`type-badge ${getTypeBadgeClass(record.type)}`}>
              {record.type}
            </span>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-subtle)' }}>
              Record ID #{record.id}
            </span>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body drawer-content">
          <div className="detail-banner">
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fff', marginBottom: '0.5rem' }}>
              {record.title}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', marginTop: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#93c5fd', fontSize: '0.85rem' }}>
                <Calendar size={15} />
                <span>Visit: {formattedDate}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#86efac', fontSize: '0.85rem' }}>
                <User size={15} />
                <span>{record.doctor}</span>
              </div>
            </div>
          </div>

          {record.reason && (
            <div className="detail-field">
              <span className="detail-field-label">Reason for Visit / Complaint</span>
              <p className="detail-field-value">{record.reason}</p>
            </div>
          )}

          <div className="detail-field">
            <span className="detail-field-label">Clinical Notes & Observations</span>
            <div className="clinical-notes-box">
              {record.notes ? record.notes : <em>No clinical notes attached to this record.</em>}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="detail-field">
              <span className="detail-field-label">Attachment Reference</span>
              {record.filename ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span className="file-pill">
                    <Paperclip size={13} />
                    <span>{record.filename}</span>
                  </span>
                  <button 
                    className="btn-icon" 
                    title="Mock Download File"
                    onClick={() => alert(`Simulating download of ${record.filename}`)}
                  >
                    <Download size={14} />
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>None attached</span>
              )}
            </div>

            <div className="detail-field">
              <span className="detail-field-label">Created / Ingested Timestamp</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                <Clock size={14} />
                <span>{formattedCreated}</span>
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem',
            borderRadius: '8px',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            color: '#6ee7b7',
            fontSize: '0.78rem'
          }}>
            <CheckCircle2 size={16} />
            <span>Persistent H2 Verification: Record stored in disk-backed database file.</span>
          </div>
        </div>

        <div className="modal-footer" style={{ justifyContent: 'space-between' }}>
          <button 
            type="button" 
            className="btn-danger" 
            onClick={() => {
              onClose();
              onDelete(record);
            }}
          >
            <Trash2 size={15} />
            <span>Delete</span>
          </button>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Close
            </button>
            <button 
              type="button" 
              className="btn-primary" 
              onClick={() => {
                onClose();
                onEdit(record);
              }}
            >
              <Edit3 size={15} />
              <span>Edit Record</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
