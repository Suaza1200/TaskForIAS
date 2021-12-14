package com.example.demo.repository;

import com.example.demo.domain.Products;

import java.util.List;

public interface ProductsRepository {
    List<Products> list();
    Products findByld (String id);

    void create (Products products);

    void update(String id, Products products);

    void delete(String id);
}
