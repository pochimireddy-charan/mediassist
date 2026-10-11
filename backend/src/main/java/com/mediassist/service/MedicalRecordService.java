package com.mediassist.service;

import com.mediassist.entity.MedicalRecord;
import com.mediassist.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MedicalRecordService {

    private final MedicalRecordRepository repository;

    public MedicalRecordService(MedicalRecordRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public List<MedicalRecord> getAllRecords() {
        return repository.findAllByOrderByVisitDateDesc();
    }

    @Transactional(readOnly = true)
    public Optional<MedicalRecord> getRecordById(Long id) {
        return repository.findById(id);
    }

    @Transactional(readOnly = true)
    public List<MedicalRecord> searchRecords(String query) {
        if (query == null || query.trim().isEmpty()) {
            return getAllRecords();
        }
        return repository.searchRecords(query.trim());
    }

    public MedicalRecord createRecord(MedicalRecord record) {
        record.setId(null);
        return repository.save(record);
    }

    public MedicalRecord updateRecord(Long id, MedicalRecord updatedData) {
        MedicalRecord existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found with id: " + id));

        existing.setTitle(updatedData.getTitle());
        existing.setType(updatedData.getType());
        existing.setDoctor(updatedData.getDoctor());
        existing.setVisitDate(updatedData.getVisitDate());
        existing.setReason(updatedData.getReason());
        existing.setNotes(updatedData.getNotes());
        existing.setFilename(updatedData.getFilename());

        return repository.save(existing);
    }

    public void deleteRecord(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Medical record not found with id: " + id);
        }
        repository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public Map<String, Object> getStats() {
        List<MedicalRecord> all = repository.findAll();
        Map<String, Long> countByType = all.stream()
                .collect(Collectors.groupingBy(MedicalRecord::getType, Collectors.counting()));

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalRecords", (long) all.size());
        stats.put("countByType", countByType);
        return stats;
    }
}
