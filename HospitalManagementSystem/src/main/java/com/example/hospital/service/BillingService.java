package com.example.hospital.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hospital.model.Bill;
import com.example.hospital.repository.BillRepository;

@Service
public class BillingService {
    @Autowired private BillRepository repo;

    public Bill generateBill(Bill b){
        // auto-calc total if costs provided
        if (b.getCosts() != null && !b.getCosts().isEmpty()) {
            double total = b.getCosts().stream().mapToDouble(Double::doubleValue).sum();
            b.setTotalAmount(total);
        }
        if (b.getStatus() == null) b.setStatus("UNPAID");
        return repo.save(b);
    }

    public Bill getBill(Long id){
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Bill not found"));
    }

    public List<Bill> getAllBills(){ return repo.findAll(); }
}