package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Date;

@Data
@Table(name = "micro_service")
public class Service {
    @Id
    private Integer id;
    private Integer uid;
    private Integer utype;

    @Transient
    private String title="测试";
    @Transient
    private String pictureUrl;
    @Transient
    private String content="测试";
    @Transient
    private String address="测试";
    @Transient
    private Date endTime=new Date();
}
