package com.example.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hospital.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Long>{

}
