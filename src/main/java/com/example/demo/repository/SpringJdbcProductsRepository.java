package com.example.demo.repository;

import com.example.demo.domain.Products;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SpringJdbcProductsRepository implements ProductsRepository{
    private final JdbcTemplate jdbcTemplate;

    public SpringJdbcProductsRepository(JdbcTemplate jdbcTemplate){this.jdbcTemplate = jdbcTemplate;}

    private final RowMapper<Products> rowMapper = (resultSet, rowNum) ->{
        String productsId = resultSet.getString("id_number");
        String productsName = resultSet.getString("name");
        String productsPrice = resultSet.getString("price");
        return new Products(
                productsId,
                productsName,
                productsPrice
        );
    };

    @Override
    public List<Products> list() {
        String sqlQuery = "select * from products";
        return jdbcTemplate.query(sqlQuery, rowMapper);
    }

    @Override
    public Products findById(String id) {
        String sqlQuery = "select * from products where id_number = ?";
        return jdbcTemplate.queryForObject(sqlQuery, rowMapper,id);
    }

    @Override
    public void create(Products products) {
        String sqlQuery = "insert into products(id_number, name, price) values(?, ?, ?)";
        jdbcTemplate.update(sqlQuery, ps -> {
            ps.setString(1, products.getId());
            ps.setString(2, products.getName());
            ps.setString(3, products.getPrice());
        });
    }

    @Override
    public void update(String id, Products products) {
        String sqlQuery = "update products set id_number = ?, name = ?, price = ? where id_number = ?";
        jdbcTemplate.update(sqlQuery, ps -> {
            ps.setString(1, products.getId());
            ps.setString(2, products.getName());
            ps.setString(3, products.getPrice());
            ps.setString(4, id);
        });
    }

    @Override
    public void delete(String id) {
        String sqlQuery = "delete from products where id_number = ?";
        jdbcTemplate.update(sqlQuery, id);
    }
}
