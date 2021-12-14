package com.example.demo.repository;

import com.example.demo.domain.Products;
import org.springframework.stereotype.Component;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

//@Component
public class PostgresProductsRepository implements ProductsRepository{
    private final DataSource dataSource;

    public PostgresProductsRepository(DataSource dataSource){this.dataSource = dataSource; }

    @Override
    public List<Products> list() {
        List<Products> result = new ArrayList<>();
        String sqlQuery = "select * from products";

        try (
            Connection connection = dataSource.getConnection();
            Statement statement = connection.createStatement();
            ResultSet resultSet = statement.executeQuery(sqlQuery);
        ) {
            while ( resultSet.next()){
                String productsId = resultSet.getString("id_number");
                String productsName = resultSet.getString("name");
                String productsPrice = resultSet.getString("price");
                Products products = new Products(
                        productsId,
                        productsName,
                        productsPrice
                );
                result.add(products);
            }

        } catch (SQLException e){
            e.printStackTrace();
        }
        return result;
    }

    @Override
    public Products findById(String id) {

        Products products = null;

        String sqlQuery = "select * from products where id_number = ?";
        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement ps = connection.prepareStatement(sqlQuery);
                ) {
            ps.setString(1, id);
            ResultSet resultSet = ps.executeQuery();
            if(resultSet.next()) {
                String productsId = resultSet.getString("id_number");
                String productsName = resultSet.getString("name");
                String productsPrice = resultSet.getString("price");
                products = new Products(productsId, productsName, productsPrice);
            }
        } catch (SQLException e){
            e.printStackTrace();
        }
        return products;
    }

    @Override
    public void create(Products products) {
        String sqlQuery = "insert into products(id_number, name, price) values(?, ?, ?)";
        try (
                Connection connection = dataSource.getConnection();
                PreparedStatement ps = connection.prepareStatement(sqlQuery);
        ) {
            ps.setString(1, products.getId());
            ps.setString(2, products.getName());
            ps.setString(3, products.getPrice());
            ps.execute();

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void update(String id, Products products) {
        String sqlQuery = "update products set id_number = ?, name = ?, price = ? where id_number = ?";
            try (
                    Connection connection = dataSource.getConnection();
                    PreparedStatement ps = connection.prepareStatement(sqlQuery);
            ) {
                ps.setString(1, products.getId());
                ps.setString(2, products.getName());
                ps.setString(3, products.getName());
                ps.setString(4, id);
                ps.execute();

            } catch (SQLException e) {
                e.printStackTrace();
            }

    }

    @Override
    public void delete(String id) {
            String sqlQuery = "delete from products where id_number = ?";
            try (
                    Connection connection = dataSource.getConnection();
                    PreparedStatement ps = connection.prepareStatement(sqlQuery);
            ) {
                ps.setString(1, id);
                ps.execute();

            } catch (SQLException e) {
                e.printStackTrace();
        }
    }
}
