package com.example.demo.repository;

import com.example.demo.domain.Products;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
public class InMemoryProductosRepository implements ProductsRepository {
    private final Map<String, Products> database = new HashMap<>();


    @Override
    public List<Products> list() {
        Collection<Products> values = database.values();
        return new ArrayList<>(values);
    }

    @Override
    public Products findByld(String id) {
        return database.get(id);
    }

    @Override
    public void create(Products products) {
        Products foundProducts = database.get(products.getId());
        if (foundProducts != null) {
            throw new IllegalFormatFlagsException("Products with id: " + products.getId() + "already exists.");
        }
        database.put(products.getId(), products);
    }

    @Override
    public void update(String id, Products products) {
        Products foundProducts = database.get(id);
        if (foundProducts == null) {
            throw new IllegalArgumentException("Products with id: " + id + "not found");

        }
        database.put(id, products);
    }

    @Override
    public void delete(String id) {
        Products foundProducts = database.get(id);
        if (foundProducts == null){
            throw new IllegalArgumentException("Produducts with id:" + "not found");
        }

    }
}
