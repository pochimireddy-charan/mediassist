export interface MedicalRecord {
  id?: number;
  title: string;
  type: string;
  doctor: string;
  visitDate: string; // YYYY-MM-DD
  reason?: string;
  notes?: string;
  filename?: string;
  createdAt?: string;
}

export type NavigationTab = 
  | 'dashboard' 
  | 'records' 
  | 'tracker' 
  | 'reminders' 
  | 'analytics' 
  | 'ai-assistant';

export interface RecordStats {
  totalRecords: number;
  countByType: Record<string, number>;
}
