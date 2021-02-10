package com.example.onlineshop.Services;

import com.example.onlineshop.Dtos.ProductResponse;
import com.example.onlineshop.Entities.Client;
import com.example.onlineshop.Entities.Order;
import com.example.onlineshop.Entities.OrderProduct;
import com.example.onlineshop.repositories.OrderRepo;
import com.example.onlineshop.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class OrderService {
    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;

    @Autowired
    public OrderService(OrderRepo orderRepo, ProductRepo productRepo) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
    }

    public void saveOrder(Client client, List<ProductResponse> productResponse) {
        List<OrderProduct> orderProducts = new ArrayList<>();
        productResponse.forEach(e ->
        {
            orderProducts.add(new OrderProduct(e.getId(), e.getQuantity()));
            int stock = productRepo.getStockById(e.getId());
            if(stock-e.getQuantity()>=0)
            {
                productRepo.updateStock(e.getId(), e.getQuantity());
            } else {
                try {
                    throw new Exception("Stock is not enough");
                } catch (Exception ex) {
                }
            }
        });
        Order order = new Order(null, client, orderProducts, new Date());
        orderRepo.save(order);

    }
}
