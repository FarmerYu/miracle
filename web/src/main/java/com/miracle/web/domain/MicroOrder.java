package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Transient;
import java.math.BigDecimal;
import java.util.Date;

@Data
public class MicroOrder {
    @Id
    private Integer id;

    private String tradeNo;

    private Integer buyUid;

    @Transient
    private MicroEnterprise buyer;

    private Integer sellUid;

    @Transient
    private MicroProvider seller;

    private Integer serviceId;

    @Transient
    private MicroService service;

    private Integer standardId;
//todo



    private BigDecimal price;

    private Integer number;

    private Date addTime;

    private MicroOrderPayStatus status;


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
}
