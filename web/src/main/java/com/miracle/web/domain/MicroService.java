package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Date;

@Data
public class MicroService {
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
