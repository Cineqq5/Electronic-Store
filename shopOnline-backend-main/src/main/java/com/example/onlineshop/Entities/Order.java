package com.example.onlineshop.Entities;

import lombok.*;

import javax.persistence.*;
import java.util.Date;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "order_details")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @OneToOne(cascade=CascadeType.ALL)
    private Client client;
    @OneToMany(cascade=CascadeType.ALL)
    private List<OrderProduct> products;
    private Date orderDate;
}
