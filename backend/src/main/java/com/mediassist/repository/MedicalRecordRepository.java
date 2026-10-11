package com.mediassist.repository;

import com.mediassist.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {

    List<MedicalRecord> findAllByOrderByVisitDateDesc();

    @Query("SELECT r FROM MedicalRecord r WHERE " +
           "LOWER(r.title) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.doctor) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.type) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.reason) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(r.notes) LIKE LOWER(CONCAT('%', :q, '%')) " +
           "ORDER BY r.visitDate DESC")
    List<MedicalRecord> searchRecords(@Param("q") String q);

    List<MedicalRecord> findByTypeIgnoreCaseOrderByVisitDateDesc(String type);
}
