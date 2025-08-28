package com.example.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hospital.model.Patient;
import com.example.hospital.repository.PatientRepository;

@Service
public class PatientService {
    @Autowired private PatientRepository repo;

    public Patient addPatient(Patient p) { return repo.save(p); }

    public Patient getPatient(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Patient not found"));
    }

    public Patient updatePatient(Long id, Patient u) {
        Patient p = getPatient(id);
        if (u.getName() != null) p.setName(u.getName());
        if (u.getAddress() != null) p.setAddress(u.getAddress());
        if (u.getContact() != null) p.setContact(u.getContact());
        if (u.getGender() != null) p.setGender(u.getGender());
        if (u.getAge() != null) p.setAge(u.getAge());
        if (u.getMedicalHistory() != null) p.setMedicalHistory(u.getMedicalHistory());
        return repo.save(p);
    }

    public void deletePatient(Long id){ repo.deleteById(id); }

    public List<Patient> getAllPatients(){ return repo.findAll(); }
}
