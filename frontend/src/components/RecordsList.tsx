import React, { useState } from 'react';
import { 
  Search, 
  FileText, 
  Eye, 
  Edit3, 
  Trash2, 
  Calendar, 
  User, 
  Paperclip, 
  Plus, 
  XCircle 
} from 'lucide-react';
import type { MedicalRecord } from '../types';

interface RecordsListProps {
  records: MedicalRecord[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewRecord: (record: MedicalRecord) => void;
  onEditRecord: (record: MedicalRecord) => void;
  onDeleteRecord: (record: MedicalRecord) => void;
  onAddNew: () => void;
  isLoading: boolean;
}

const CATEGORIES = [
  'All',
  'Lab Report',
  'Prescription',
  'Consultation Note',
  'Discharge Summary',
  'Radiology / Imaging',
  'Vaccination'
];

export const RecordsList: React.FC<RecordsListProps> = ({
  records,
  searchQuery,
  onSearchChange,
  onViewRecord,
  onEditRecord,
  onDeleteRecord,
  onAddNew,
  isLoading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  const filteredRecords = records.filter((r) => {
    if (selectedCategory === 'All') return true;
    return r.type.toLowerCase() === selectedCategory.toLowerCase();
  });

  return (
    <div>
      {/* Controls: Search + Filter Pills */}
      <div className="controls-bar">
        <div className="search-input-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search records by title, doctor, symptoms..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            id="search-records-input"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '0.8rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-subtle)',
                cursor: 'pointer'
              }}
            >
              <XCircle size={15} />
            </button>
          )}
        </div>

        <div className="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Records Table */}
      <div className="records-table-container">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            <div className="status-dot online" style={{ margin: '0 auto 1rem auto', width: '12px', height: '12px' }} />
            <span>Loading medical records from database...</span>
          </div>
        ) : filteredRecords.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
            <FileText size={42} style={{ margin: '0 auto 1rem auto', opacity: 0.3 }} />
            <h3 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
              No medical records found
            </h3>
            <p style={{ fontSize: '0.88rem', maxWidth: '400px', margin: '0 auto 1.5rem auto' }}>
              {searchQuery || selectedCategory !== 'All'
                ? 'Try adjusting your search keywords or filter category.'
                : 'No records exist in the database yet. Click below to add the first record.'}
            </p>
            <button className="btn-primary" style={{ margin: '0 auto' }} onClick={onAddNew}>
              <Plus size={16} />
              <span>Create Record</span>
            </button>
          </div>
        ) : (
          <table className="records-table">
            <thead>
              <tr>
                <th>Record Title</th>
                <th>Type</th>
                <th>Doctor / Specialist</th>
                <th>Visit Date</th>
                <th>Reason / Complaint</th>
                <th>Attachment</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div 
                      className="record-title-cell" 
                      onClick={() => onViewRecord(r)}
                      title="Click to view details"
                    >
                      {r.title}
                    </div>
                  </td>

                  <td>
                    <span className={`type-badge ${getTypeBadgeClass(r.type)}`}>
                      {r.type}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#cbd5e1' }}>
                      <User size={13} color="var(--text-subtle)" />
                      <span>{r.doctor}</span>
                    </div>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      <Calendar size={13} color="var(--text-subtle)" />
                      <span>{r.visitDate}</span>
                    </div>
                  </td>

                  <td>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                      {r.reason ? (r.reason.length > 32 ? r.reason.slice(0, 32) + '...' : r.reason) : '—'}
                    </span>
                  </td>

                  <td>
                    {r.filename ? (
                      <span className="file-pill" title={r.filename}>
                        <Paperclip size={11} />
                        <span>{r.filename.length > 18 ? r.filename.slice(0, 16) + '...' : r.filename}</span>
                      </span>
                    ) : (
                      <span style={{ color: 'var(--text-subtle)', fontSize: '0.78rem' }}>None</span>
                    )}
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    <div className="table-actions" style={{ justifyContent: 'flex-end' }}>
                      <button 
                        className="btn-icon" 
                        title="View Full Record"
                        onClick={() => onViewRecord(r)}
                        id={`btn-view-${r.id}`}
                      >
                        <Eye size={15} />
                      </button>
                      <button 
                        className="btn-icon" 
                        title="Edit Record"
                        onClick={() => onEditRecord(r)}
                        id={`btn-edit-${r.id}`}
                      >
                        <Edit3 size={15} />
                      </button>
                      <button 
                        className="btn-icon delete" 
                        title="Delete Record"
                        onClick={() => onDeleteRecord(r)}
                        id={`btn-delete-${r.id}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
