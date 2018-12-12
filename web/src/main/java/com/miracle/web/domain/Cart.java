package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "micro_cart")
public class Cart {
    @Id
    private Integer id;
    private Integer uid;

    private Integer standardId;
    private Integer serviceId;
    private Service service;
}
