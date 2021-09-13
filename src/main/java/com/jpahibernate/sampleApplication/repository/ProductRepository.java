package com.jpahibernate.sampleApplication.repository;

import com.jpahibernate.sampleApplication.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
