package com.example.onlineshop.repositories;

import com.example.onlineshop.Dtos.ProductDto;
import com.example.onlineshop.Entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface ProductRepo extends JpaRepository<Product, Long> {
    @Query("Select p.id as id, p.name as name, p.price as price, p.stock as stock from Product p")
    List<ProductDto> findAllProduct();


    @Transactional
    @Modifying
    @Query("update Product p set p.name = ?2, p.price = ?3, p.stock = ?4, p.description = ?5 where p.id = ?1")
    void updateProduct(Long id, String name, Double price, Integer stock, String description);

    @Transactional
    @Modifying
    @Query("update Product p set p.stock = p.stock - ?2 where p.id = ?1")
    void updateStock(Long id, Integer quantity);

    @Query("SELECT count(p.stock) from Product p")
    Integer countAvailableProduct();

    @Query("SELECT sum(p.stock*p.price) from Product p")
    Double totalAvailableProduct();

    @Query("select p.stock from Product p where p.id = ?1")
    int getStockById(Long id);
}
