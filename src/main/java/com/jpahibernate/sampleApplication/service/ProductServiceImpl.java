package com.jpahibernate.sampleApplication.service;

import com.jpahibernate.sampleApplication.exception.ResourceNotFoundException;
import com.jpahibernate.sampleApplication.model.Product;
import com.jpahibernate.sampleApplication.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService{

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product product) {
        Optional<Product> productDb = this.productRepository.findById(product.getId());

        if(productDb.isPresent()){
            Product productUpdate = productDb.get();
            productUpdate.setId(product.getId());
            productUpdate.setProductName(product.getProductName());
            productUpdate.setDescription(product.getDescription());
            productUpdate.setPrice(product.getPrice());
            productRepository.save(productUpdate);
            return productUpdate;
        }
        else{
            throw new ResourceNotFoundException("Record not found with id : " + product.getId());
        }
    }

    @Override
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    @Override
    public Product getProductById(long id) {
        Optional<Product> productDb = this.productRepository.findById(id);

        if(productDb.isPresent()){
            return productDb.get();
        }
        else{
            throw new ResourceNotFoundException("Record not found with id : " + id);
        }
    }

    @Override
    public void deleteProduct(Long id) {
        Optional<Product> productDb = this.productRepository.findById(id);

        if(productDb.isPresent()){
            this.productRepository.delete(productDb.get());
        }
        else{
            throw new ResourceNotFoundException("Record not found with id : " + id);
        }
    }
}
