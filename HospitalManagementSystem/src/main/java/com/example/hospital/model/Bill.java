package com.example.hospital.model;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Bill {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Patient patient;

    @ManyToOne
    private Doctor doctor;

    @ElementCollection
    private List<String> treatments;

    @ElementCollection
    private List<Double> costs;

    private Double totalAmount;
    private String status; // PAID / UNPAID

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Patient getPatient() { return patient; }
    public void setPatient(Patient patient) { this.patient = patient; }

    public Doctor getDoctor() { return doctor; }
    public void setDoctor(Doctor doctor) { this.doctor = doctor; }

    public List<String> getTreatments() { return treatments; }
    public void setTreatments(List<String> treatments) { this.treatments = treatments; }

    public List<Double> getCosts() { return costs; }
    public void setCosts(List<Double> costs) { this.costs = costs; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}