package com.example.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hospital.model.Doctor;
import com.example.hospital.repository.DoctorRepository;

@Service
public class DoctorService {
    @Autowired private DoctorRepository repo;

    public Doctor addDoctor(Doctor d){ return repo.save(d); }

    public Doctor getDoctor(Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Doctor not found"));
    }

    public Doctor updateDoctor(Long id, Doctor u){
        Doctor d = getDoctor(id);
        if (u.getName() != null) d.setName(u.getName());
        if (u.getEmail() != null) d.setEmail(u.getEmail());
        if (u.getContact() != null) d.setContact(u.getContact());
        if (u.getSpecialization() != null) d.setSpecialization(u.getSpecialization());
        return repo.save(d);
    }

    public void deleteDoctor(Long id){ repo.deleteById(id); }

    public List<Doctor> getAllDoctors(){ return repo.findAll(); }
}
