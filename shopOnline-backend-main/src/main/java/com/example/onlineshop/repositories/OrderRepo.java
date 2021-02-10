package com.example.onlineshop.repositories;

import com.example.onlineshop.Entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {


    @Query("select count(o.id) from Order o")
    Integer countOrders();

}
