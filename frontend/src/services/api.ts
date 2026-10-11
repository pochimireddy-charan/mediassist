import type { MedicalRecord, RecordStats } from '../types';

// Use relative /api (proxied by Vite) or fallback to http://localhost:8080
const API_BASE = '/api/records';

export const medicalApi = {
  async getRecords(query?: string): Promise<MedicalRecord[]> {
    const url = query && query.trim() 
      ? `${API_BASE}?query=${encodeURIComponent(query.trim())}` 
      : API_BASE;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch records: ${response.statusText}`);
    }
    return response.json();
  },

  async getRecordById(id: number): Promise<MedicalRecord> {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch record #${id}: ${response.statusText}`);
    }
    return response.json();
  },

  async createRecord(record: Omit<MedicalRecord, 'id' | 'createdAt'>): Promise<MedicalRecord> {
    const response = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || 'Failed to create record');
    }
    return response.json();
  },

  async updateRecord(id: number, record: Partial<MedicalRecord>): Promise<MedicalRecord> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText || `Failed to update record #${id}`);
    }
    return response.json();
  },

  async deleteRecord(id: number): Promise<void> {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Failed to delete record #${id}`);
    }
  },

  async getStats(): Promise<RecordStats> {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch statistics');
    }
    return response.json();
  },

  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(API_BASE, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  }
};
