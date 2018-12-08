package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;

/*
订单相关的额外信息基类
 */
@Data
public class MicroOrderExtra {
    @Id
    private Integer id;
    private Integer orderId;
    private MicroOrder order;

    private Integer buyUid;
    private Integer sellUid;
    private Integer serviceId;
}
