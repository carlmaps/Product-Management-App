package com.jpahibernate.sampleApplication.service;

import com.jpahibernate.sampleApplication.model.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(Product product);
    Product updateProduct(Product product);
    List<Product> getAllProduct();
    Product getProductById(long id);
    void deleteProduct(Long id);
}
