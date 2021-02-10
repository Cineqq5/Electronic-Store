package com.example.onlineshop.Controllers;

import com.example.onlineshop.Dtos.OrderRequest;
import com.example.onlineshop.Dtos.ProductResponse;
import com.example.onlineshop.Entities.Client;
import com.example.onlineshop.Services.ClientService;
import com.example.onlineshop.Services.OrderService;
import com.example.onlineshop.Services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final ProductService productService;
    private final ClientService clientService;
    private final OrderService orderService;

    @Autowired
    public UserController(ProductService productService, ClientService clientService, OrderService orderService) {
        this.productService = productService;
        this.clientService = clientService;
        this.orderService = orderService;
    }

    @GetMapping("/api/allProductToClient")
    @CrossOrigin
    public Iterable<ProductResponse> getAllProductToClient() {
        return productService.getAllProductToClient();
    }

    @PostMapping("/api/order")
    @CrossOrigin
    public ResponseEntity saveOrder(@RequestBody OrderRequest orderDetails) {
        Client client = new Client(null, orderDetails.getName(), orderDetails.getSurname(),
                orderDetails.getCity(), orderDetails.getPostalCode(), orderDetails.getTown(), orderDetails.getPhone());
        this.orderService.saveOrder(client, orderDetails.getProducts());
        return new ResponseEntity(HttpStatus.OK);
    }
}
