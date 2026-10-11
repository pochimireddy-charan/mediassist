package com.mediassist.config;

import com.mediassist.entity.MedicalRecord;
import com.mediassist.repository.MedicalRecordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final MedicalRecordRepository repository;

    public DataInitializer(MedicalRecordRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            MedicalRecord r1 = new MedicalRecord(
                    "Comprehensive Metabolic Panel & Lipid Profile",
                    "Lab Report",
                    "Dr. Evelyn Reed (Endocrinology)",
                    LocalDate.now().minusDays(20),
                    "Annual routine wellness checkup",
                    "Fasting blood glucose: 94 mg/dL (Normal). HbA1c: 5.4%. Total cholesterol: 182 mg/dL. LDL: 104 mg/dL, HDL: 58 mg/dL. Kidney and liver functions are completely unremarkable.",
                    "metabolic_panel_2026.pdf"
            );

            MedicalRecord r2 = new MedicalRecord(
                    "Hypertension & Cardiovascular Follow-up",
                    "Consultation Note",
                    "Dr. Marcus Vance (Cardiology)",
                    LocalDate.now().minusDays(45),
                    "Blood pressure management review",
                    "Resting BP measured at 122/78 mmHg. Patient reports good adherence to Lisinopril 10mg daily. No dizziness, palpitations, or peripheral edema noted. Maintained current treatment plan.",
                    "cardio_consult_2026.pdf"
            );

            MedicalRecord r3 = new MedicalRecord(
                    "Right Knee Arthroscopy Recovery",
                    "Discharge Summary",
                    "Dr. Sarah Chen (Orthopedics)",
                    LocalDate.now().minusDays(75),
                    "Post-operative knee mobility evaluation",
                    "Surgical incisions well-healed without erythema. Range of motion improved to 110 degrees flexion. Cleared for low-impact physical therapy. Re-evaluate in 6 months.",
                    "knee_discharge_summary.pdf"
            );

            MedicalRecord r4 = new MedicalRecord(
                    "Seasonal Influenza & Tdap Booster",
                    "Vaccination",
                    "Dr. Angela Patel (Internal Medicine)",
                    LocalDate.now().minusDays(110),
                    "Preventive immunization update",
                    "Administered Flucelvax Quadrivalent 0.5mL IM left deltoid and Boostrix Tdap 0.5mL IM right deltoid. Patient monitored for 15 minutes with no adverse reaction.",
                    "immunization_record_2026.pdf"
            );

            MedicalRecord r5 = new MedicalRecord(
                    "Chest Radiograph 2-View (PA & Lateral)",
                    "Radiology / Imaging",
                    "Dr. Robert Klein (Radiology)",
                    LocalDate.now().minusDays(150),
                    "Persistent mild post-viral cough investigation",
                    "Lungs are clear of focal consolidation, effusion, or pneumothorax. Cardiomediastinal silhouette within normal limits. Impression: Normal chest radiograph.",
                    "chest_xray_report_2026.pdf"
            );

            repository.saveAll(List.of(r1, r2, r3, r4, r5));
            System.out.println("MediAssist: Preloaded 5 synthetic medical records into persistent database.");
        }
    }
}
