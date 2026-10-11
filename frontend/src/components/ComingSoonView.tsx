import React from 'react';
import { 
  Activity, 
  Bell, 
  BarChart3, 
  Bot, 
  Cpu, 
  Layers, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import type { NavigationTab } from '../types';

interface ComingSoonViewProps {
  tab: NavigationTab;
  onNavigateToRecords: () => void;
}

export const ComingSoonView: React.FC<ComingSoonViewProps> = ({ tab, onNavigateToRecords }) => {
  const getTabConfig = () => {
    switch (tab) {
      case 'tracker':
        return {
          icon: Activity,
          title: 'Health Tracker & Vitals Telemetry',
          tag: 'Milestone 2 • Coming Soon',
          description:
            'Continuous patient health telemetry tracking, vitals loggers (Blood Pressure, Heart Rate, Glucose, SpO2, Temperature), and wearable device data ingestion.',
          features: [
            'Blood Pressure & Mean Arterial Pressure trend monitoring',
            'Fasting & Postprandial Blood Glucose charting',
            'Body composition & BMI progression curves',
            'Exportable vitals report for physician consultations'
          ]
        };
      case 'reminders':
        return {
          icon: Bell,
          title: 'Prescription & Follow-up Reminders',
          tag: 'Milestone 2 • Coming Soon',
          description:
            'Intelligent scheduling system for medication dosage times, prescription refills, preventative immunization boosters, and follow-up appointments.',
          features: [
            'Automated medication dosage alerts with frequency cadences',
            'Pharmacy prescription refill countdown notifications',
            'Calendar sync (iCal, Google Calendar, Outlook)',
            'Missed medication adherence tracking'
          ]
        };
      case 'analytics':
        return {
          icon: BarChart3,
          title: 'Longitudinal Diagnostic Analytics',
          tag: 'Milestone 3 • Coming Soon',
          description:
            'Comprehensive clinical analytics providing historical trend analysis, recurring symptom correlation, and medical specialty distribution over time.',
          features: [
            'Longitudinal symptom frequency & diagnostic timelines',
            'Healthcare expenditure & insurance claim category stats',
            'Doctor specialty visit distribution breakdown',
            'Multi-year lab report biomarker comparisons'
          ]
        };
      case 'ai-assistant':
      default:
        return {
          icon: Bot,
          title: 'MediAssist AI Agent Service',
          tag: 'Future AI Service Architecture',
          description:
            'Intelligent clinical reasoning assistant powered by a dedicated Python FastAPI microservice, LangChain/LlamaIndex, and medical LLM agents.',
          features: [
            'Natural language clinical queries: "What were my cholesterol numbers last year?"',
            'Automated medical document parsing & key-value extraction',
            'Drug-drug interaction risk screening across all active prescriptions',
            'Plain-English patient summaries generated from complex physician notes'
          ]
        };
    }
  };

  const config = getTabConfig();
  const Icon = config.icon;
  const isAIAssistant = tab === 'ai-assistant';

  return (
    <div className="coming-soon-card">
      <div className="coming-soon-icon">
        <Icon size={34} />
      </div>

      <span className="brand-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>
        {config.tag}
      </span>

      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#fff', marginBottom: '0.75rem' }}>
        {config.title}
      </h2>

      <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', maxWidth: '640px', margin: '0 auto 1.5rem auto', lineHeight: '1.6' }}>
        {config.description}
      </p>

      {/* Planned Capabilities */}
      <div style={{ textAlign: 'left', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '1.5rem', margin: '1.5rem auto', maxWidth: '680px' }}>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sparkles size={16} />
          <span>Planned Capabilities</span>
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {config.features.map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', color: '#e2e8f0', fontSize: '0.85rem' }}>
              <CheckCircle2 size={15} color="#10b981" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Assistant Architecture Blueprint */}
      {isAIAssistant && (
        <div style={{ marginTop: '2rem', textAlign: 'left', maxWidth: '780px', margin: '2rem auto 0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <Layers size={18} color="#818cf8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>
              Target System Architecture (Future Milestone)
            </h3>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            The current MVP establishes the core Java 21 Spring Boot + persistent H2 foundation. The Python FastAPI service will plug in as a decoupled AI agent without modifying core records storage.
          </p>

          <div className="architecture-diagram">
{`+-------------------------------------------------------------+
|             React + TypeScript Frontend (Port 5173)         |
|   - Healthcare Dashboard    - Medical Records CRUD (Active) |
|   - AI Chat UI Interface    - PDF Upload & Preview          |
+------------------------------+------------------------------+
                               | REST APIs
                               v
+-------------------------------------------------------------+
|          Java 21 + Spring Boot Backend (Port 8080)          |
|   - Controller / Service / Repository JPA Layers            |
|   - Persistent File-Backed H2 Database (./data/mediassist)   |
|   - Audit Logging & Data Validation                         |
+------------------------------+------------------------------+
                               | Future AI Event Hook / gRPC
                               v
+-------------------------------------------------------------+
|         Future AI Microservice: Python + FastAPI (Port 8000) |
|   - LLM Agent Orchestrator (LangChain / LlamaIndex)         |
|   - Medical Entity Recognition & Document Summarizer        |
|   - Vector Embeddings Store (ChromaDB / FAISS)              |
+-------------------------------------------------------------+`}
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', padding: '0.85rem', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 600 }}>
                <Cpu size={14} />
                <span>Backend Layering</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Business logic remains centralized in Java with clean REST contracts.
              </p>
            </div>

            <div style={{ flex: 1, minWidth: '220px', padding: '0.85rem', background: 'rgba(0, 0, 0, 0.25)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.82rem', fontWeight: 600 }}>
                <ShieldCheck size={14} />
                <span>Zero Data Loss</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                H2 database is file-backed to disk: records survive restarts seamlessly.
              </p>
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: '2.5rem' }}>
        <button className="btn-primary" style={{ margin: '0 auto' }} onClick={onNavigateToRecords}>
          <span>Go to Records (Fully Operational)</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
