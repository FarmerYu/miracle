package com.miracle.web.domain;

import com.miracle.web.domain.value.OrderInvoiceStatus;
import com.miracle.web.domain.value.OrderPayStatus;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.math.BigDecimal;
import java.util.Date;

@Data
@Table(name = "micro_order")
public class Order {
    @Id
    private Integer id;

    private String tradeNo;

    private Integer buyUid;

    @Transient
    private Enterprise buyer;

    private Integer sellUid;

    @Transient
    private Provider seller;

    private Integer serviceId;

    @Transient
    private Service service;

    private Integer standardId;
//todo



    private BigDecimal price;

    private Integer number;

    private Date addTime;



    private String taobaoTradeNo;

    private Byte tradeStatus;

    private String weixinTradeNo;

    private String requirement;

    private String feedback;

    private String comment;


    private String requirementAttach;

    private String feedbackAttach;

    private String commentAttach;

    private Byte order;



    private OrderInvoiceStatus invoiceStatus;
    @Column(name = "status")
    private OrderPayStatus payStatus;
}
