package com.example.demo.controllers;

import com.example.demo.domain.Products;
import com.example.demo.repository.ProductsRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/products")
public class Controllers {
private ProductsRepository repository;

public Controllers(ProductsRepository repository) {this.repository = repository;}

    @GetMapping
    public List<Products> listProducts() { return  repository.list();}

    @PostMapping
    public Products createPerson(
            @RequestBody Products products
    ) {
        repository.create(products);

        return products;
    }


    @GetMapping(value = "/{id}")
    public Products getPerson(
            @PathVariable("id") String productsId
    ) {
        return repository.findById(productsId);
    }

    @DeleteMapping(value = "/{id}")
    public Products deleteProducts(
            @PathVariable("id") String productsId
    ) {
        Products foundProducts = repository.findById(productsId);
        repository.delete(productsId);
        return foundProducts;
    }

    @PutMapping(value = "/{id}")
    public Products updateProducts(
            @PathVariable("id") String productsId,
            @RequestBody Products products
    ) {
        repository.update(productsId, products);

        return repository.findById(productsId);
    }
}
