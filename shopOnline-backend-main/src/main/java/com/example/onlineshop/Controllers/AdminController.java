package com.example.onlineshop.Controllers;


import com.example.onlineshop.Dtos.ProductDto;
import com.example.onlineshop.Dtos.ProductResponse;
import com.example.onlineshop.Dtos.Statistics;
import com.example.onlineshop.Entities.Product;
import com.example.onlineshop.Services.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.FileNotFoundException;
import java.io.IOException;


@RestController
@CrossOrigin("*")
public class AdminController {
    private final ProductService productService;
    private final ObjectMapper objectMapper;

    @Autowired
    public AdminController(ProductService productService, ObjectMapper objectMapper) {
        this.productService = productService;
        this.objectMapper = objectMapper;
    }

    @GetMapping("/api/allProduct")
    public Iterable<ProductDto> getAllProduct() {
        return productService.getAllProduct();
    }

    @GetMapping("/api/productDetails/{id}")
    public ProductResponse getProductById(@PathVariable("id") Long id) {
        return productService.getProductById(id);
    }

    @DeleteMapping("/api/deleteProduct/{id}")
    public ResponseEntity deleteProductById(@PathVariable("id") Long id) {
        return productService.deleteProductById(id);
    }

    @PostMapping("/api/addProduct")
    @CrossOrigin
    public ResponseEntity addProduct(@RequestParam(name = "file", required = false) MultipartFile file, @RequestParam(name = "product") String productRequest) throws IOException {
        try {
            Product product = objectMapper.readValue(productRequest, Product.class);
            byte [] byteArr=file.getBytes();
            product.setImage(productService.toObjects(byteArr));
            productService.saveProduct(product);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.OK);
    }
    @PutMapping("/api/editProduct")
    @CrossOrigin
    public ResponseEntity editProduct(@RequestParam(name = "file", required = false) MultipartFile file, @RequestParam(name = "product") String productRequest) throws IOException {
        try {

            Product product = objectMapper.readValue(productRequest, Product.class);
            if(file!=null) {
                byte[] byteArr = file.getBytes();
                product.setImage(productService.toObjects(byteArr));
                productService.saveProduct(product);
            }
           productService.updateProduct(product);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/api/statistics")
    @CrossOrigin
    public Statistics getStats()
    {
        System.out.println(productService.getStatistics().toString());
        return productService.getStatistics();
    }

}
