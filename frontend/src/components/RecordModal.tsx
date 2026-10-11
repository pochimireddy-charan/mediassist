import React, { useState, useEffect } from 'react';
import { X, Save, Paperclip, AlertCircle } from 'lucide-react';
import type { MedicalRecord } from '../types';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: Omit<MedicalRecord, 'id' | 'createdAt'>) => Promise<void>;
  initialData?: MedicalRecord | null;
}

const RECORD_TYPES = [
  'Lab Report',
  'Prescription',
  'Consultation Note',
  'Discharge Summary',
  'Radiology / Imaging',
  'Vaccination',
  'Surgery / Procedure',
  'Pathology'
];

export const RecordModal: React.FC<RecordModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Lab Report');
  const [doctor, setDoctor] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [filename, setFilename] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setType(initialData.type || 'Lab Report');
      setDoctor(initialData.doctor || '');
      setVisitDate(initialData.visitDate || '');
      setReason(initialData.reason || '');
      setNotes(initialData.notes || '');
      setFilename(initialData.filename || '');
    } else {
      // Default new record
      setTitle('');
      setType('Lab Report');
      setDoctor('');
      setVisitDate(new Date().toISOString().split('T')[0]);
      setReason('');
      setNotes('');
      setFilename('');
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'Title is required';
    if (!doctor.trim()) errs.doctor = 'Doctor or clinic name is required';
    if (!visitDate) errs.visitDate = 'Visit date is required';
    if (!type.trim()) errs.type = 'Record type is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
      await onSave({
        title: title.trim(),
        type,
        doctor: doctor.trim(),
        visitDate,
        reason: reason.trim(),
        notes: notes.trim(),
        filename: filename.trim(),
      });
      onClose();
    } catch (err) {
      console.error(err);
      setErrors({ form: err instanceof Error ? err.message : 'Failed to save record' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSimulateAttachment = () => {
    const sampleFiles = [
      'clinical_summary_doc.pdf',
      'lab_diagnostics_report.pdf',
      'radiology_scan_dicom.pdf',
      'digital_prescription_rx.pdf',
      'discharge_care_instructions.pdf'
    ];
    const picked = sampleFiles[Math.floor(Math.random() * sampleFiles.length)];
    setFilename(picked);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{initialData ? 'Edit Medical Record' : 'Add New Medical Record'}</h2>
          <button className="btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {errors.form && (
              <div style={{
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: '#fda4af',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={16} />
                <span>{errors.form}</span>
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="rec-title">
                Record Title <span className="req">*</span>
              </label>
              <input
                id="rec-title"
                className="form-input"
                placeholder="e.g. Lipid Profile & Liver Function Panel"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="rec-type">
                  Record Category <span className="req">*</span>
                </label>
                <select
                  id="rec-type"
                  className="form-select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {RECORD_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.type && <span className="form-error">{errors.type}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="rec-date">
                  Visit Date <span className="req">*</span>
                </label>
                <input
                  id="rec-date"
                  type="date"
                  className="form-input"
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
                {errors.visitDate && <span className="form-error">{errors.visitDate}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rec-doctor">
                Attending Doctor / Specialist <span className="req">*</span>
              </label>
              <input
                id="rec-doctor"
                className="form-input"
                placeholder="e.g. Dr. Sarah Jenkins (Cardiology)"
                value={doctor}
                onChange={(e) => setDoctor(e.target.value)}
              />
              {errors.doctor && <span className="form-error">{errors.doctor}</span>}
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rec-reason">
                Reason for Visit / Chief Complaint
              </label>
              <input
                id="rec-reason"
                className="form-input"
                placeholder="e.g. Routine 6-month checkup or post-operative review"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="rec-notes">
                Clinical Notes & Observations
              </label>
              <textarea
                id="rec-notes"
                className="form-textarea"
                rows={4}
                placeholder="Detailed findings, vitals, prescriptions, dosage, or follow-up instructions..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label className="form-label" htmlFor="rec-filename">
                  Document / Attachment Reference
                </label>
                <button
                  type="button"
                  onClick={handleSimulateAttachment}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#38bdf8',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Generate Sample Filename
                </button>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  id="rec-filename"
                  className="form-input"
                  placeholder="e.g. patient_report_2026.pdf"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  style={{ flex: 1 }}
                />
                <div 
                  className="btn-icon" 
                  title="Document Attached"
                  style={{ background: filename ? 'rgba(14, 165, 233, 0.15)' : undefined }}
                >
                  <Paperclip size={16} color={filename ? '#38bdf8' : 'currentColor'} />
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={isSubmitting} id="btn-save-record">
              <Save size={16} />
              <span>{isSubmitting ? 'Saving...' : initialData ? 'Update Record' : 'Save Record'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
