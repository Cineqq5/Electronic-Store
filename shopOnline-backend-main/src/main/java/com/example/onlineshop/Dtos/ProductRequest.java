package com.example.onlineshop.Dtos;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ProductRequest {
    private String name;
    private Double price;
    private Integer stock;
    private Byte[] image;
    private String description;
}
