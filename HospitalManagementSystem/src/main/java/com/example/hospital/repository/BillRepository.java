package com.example.hospital.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hospital.model.Bill;

public interface BillRepository extends JpaRepository<Bill, Long>{

}
