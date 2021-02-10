package com.example.onlineshop.Dtos;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@ToString
public class ProductResponse {
    private Long id;
    private String name;
    private Double price;
    private Integer stock;
    private String description;
    private String imageBase64;
    private Integer quantity;
}
