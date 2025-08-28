package com.example.hospital.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hospital.model.Appointment;
import com.example.hospital.repository.AppointmentRepository;

@Service
public class AppointmentService {
    @Autowired private AppointmentRepository repo;

    public Appointment addAppointment(Appointment a){
        if (a.getAppointmentDate() == null || a.getAppointmentDate().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Appointment date/time must be in the future");
        }
        return repo.save(a);
    }

    public Appointment getAppointment(Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Appointment not found"));
    }

    public Appointment updateAppointment(Long id, Appointment u){
        Appointment a = getAppointment(id);
        if (u.getAppointmentDate() != null) a.setAppointmentDate(u.getAppointmentDate());
        if (u.getReason() != null) a.setReason(u.getReason());
        if (u.getStatus() != null) a.setStatus(u.getStatus());
        if (u.getDoctor() != null) a.setDoctor(u.getDoctor());
        if (u.getPatient() != null) a.setPatient(u.getPatient());
        return repo.save(a);
    }

    public void deleteAppointment(Long id){ repo.deleteById(id); }

    public List<Appointment> getAppointments(Long patientId, Long doctorId){
        List<Appointment> all = repo.findAll();
        return all.stream()
                .filter(a -> patientId == null || (a.getPatient()!=null && patientId.equals(a.getPatient().getId())))
                .filter(a -> doctorId == null || (a.getDoctor()!=null && doctorId.equals(a.getDoctor().getId())))
                .collect(Collectors.toList());
    }
}
