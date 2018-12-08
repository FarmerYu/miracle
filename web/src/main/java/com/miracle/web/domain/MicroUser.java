package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "micro_users")
public class MicroUser {
    @Id
    private Integer uid;

    private String utel;

    private String nickname;

    private String upwd;

    private String vcode;

    private Byte utype;

    private String loginIp;

    private Date createTime;

    private Byte status;

    private String email;

    private String address;

    private String logourl;

    private Integer integral;

    private String password;

    private Date checkTime;

    private Date updateTime;

    private Byte gender;

    private String intro;

    private String school;

    private String qrcode;

    private String name;

    private String mobile;

    private String idCardImg1;

    private String idCardImg2;

    private String img1;

    private String img2;

    private String img3;

}
