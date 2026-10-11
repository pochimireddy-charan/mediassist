import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';
import type { MedicalRecord } from '../types';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  record: MedicalRecord | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isDeleting: boolean;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  record,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  if (!isOpen || !record) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-card" 
        style={{ maxWidth: '440px' }} 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: '#f43f5e' }}>
            <AlertTriangle size={20} />
            <h2 style={{ fontSize: '1.15rem' }}>Delete Medical Record?</h2>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5' }}>
            Are you sure you want to delete <strong style={{ color: '#fff' }}>"{record.title}"</strong> (ID #{record.id})?
          </p>
          <div style={{
            background: 'rgba(244, 63, 94, 0.1)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            padding: '0.75rem',
            borderRadius: '8px',
            fontSize: '0.8rem',
            color: '#fda4af',
            marginTop: '0.5rem'
          }}>
            This record will be permanently deleted from the persistent H2 database. This action cannot be undone.
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={onClose} 
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="btn-danger" 
            onClick={onConfirm} 
            disabled={isDeleting}
            id="btn-confirm-delete"
          >
            <Trash2 size={15} />
            <span>{isDeleting ? 'Deleting...' : 'Delete Record'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
