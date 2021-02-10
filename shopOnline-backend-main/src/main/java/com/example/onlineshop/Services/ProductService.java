package com.example.onlineshop.Services;


import com.example.onlineshop.Dtos.ProductDto;
import com.example.onlineshop.Dtos.ProductResponse;
import com.example.onlineshop.Dtos.Statistics;
import com.example.onlineshop.Entities.OrderProduct;
import com.example.onlineshop.Entities.Product;
import com.example.onlineshop.repositories.OrderProductRepo;
import com.example.onlineshop.repositories.OrderRepo;
import com.example.onlineshop.repositories.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.Base64;
import java.util.stream.Collectors;
import java.util.stream.IntStream;



@Service
public class ProductService {
    private final ProductRepo productRepo;
    private final OrderRepo orderRepo;
    private final OrderProductRepo orderProductRepo;

    @Autowired
    public ProductService(ProductRepo productRepo, OrderRepo orderRepo, OrderProductRepo orderProductRepo) {
        this.productRepo = productRepo;
        this.orderRepo = orderRepo;
        this.orderProductRepo = orderProductRepo;
    }

    public Iterable<ProductDto> getAllProduct() {
        return productRepo.findAllProduct();
    }

    public void saveProduct(Product product) {
        this.productRepo.save(product);
    }

    public ProductResponse getProductById(Long id){
        Product product = productRepo.findById(id).get();
        String encoded = Base64.getEncoder().encodeToString(toPrimitives(product.getImage()));
        return new ProductResponse(product.getId(), product.getName(),
                product.getPrice(), product.getStock(), product.getDescription(), encoded, 0);
    }

    public Byte[] toObjects(byte[] bytes) {
        return IntStream.range(0, bytes.length)
                .mapToObj(i -> bytes[i])
                .toArray(Byte[]::new);
    }

    public byte[] toPrimitives(Byte[] oBytes) {

        byte[] bytes = new byte[oBytes.length];
        for (int i = 0; i < oBytes.length; i++) {
            bytes[i] = oBytes[i];
        }
        return bytes;

    }

    public ResponseEntity deleteProductById(Long id) {
        this.productRepo.deleteById(id);
        return new ResponseEntity(HttpStatus.OK);
    }

    public void updateProduct(Product product) {
        this.productRepo.updateProduct(product.getId(), product.getName(), product.getPrice(), product.getStock(),
                product.getDescription());
    }

    public Iterable<ProductResponse> getAllProductToClient() {
        return productRepo.findAll().stream()
                .map(product -> new ProductResponse(product.getId(),product.getName(),product.getPrice(),
                        product.getStock(),product.getDescription(),Base64.getEncoder().encodeToString(toPrimitives(product.getImage())), 0))
                .collect(Collectors.toList());
    }

    public Statistics getStatistics() {
        return new Statistics(orderProductRepo.countSaleProduct(), orderRepo.countOrders(), productRepo.countAvailableProduct(),
                productRepo.totalAvailableProduct());
    }
}
