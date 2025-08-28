package com.example.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hospital.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

}
