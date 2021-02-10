package com.example.onlineshop.Dtos;

import lombok.*;
import org.springframework.stereotype.Service;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Statistics {
private Integer countSaleProduct;
private Integer countOrders;
private Integer countAvailableProduct;
private Double totalAvailableProduct;
}
