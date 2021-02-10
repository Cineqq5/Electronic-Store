package com.example.onlineshop.repositories;

import com.example.onlineshop.Entities.OrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderProductRepo extends JpaRepository<OrderProduct, Long> {

    @Query("select sum(o.quantity) from OrderProduct o")
    Integer countSaleProduct();

}
