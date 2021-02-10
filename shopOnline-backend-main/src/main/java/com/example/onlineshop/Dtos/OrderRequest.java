package com.example.onlineshop.Dtos;

import com.example.onlineshop.Entities.Product;
import lombok.Getter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import java.util.List;


@Getter
@ToString
public class OrderRequest {
    private String name;
    private String surname;
    private String city;
    private String postalCode;
    private String town;
    private String phone;
    private List<ProductResponse> products;
}
