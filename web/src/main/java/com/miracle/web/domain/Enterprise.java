package com.miracle.web.domain;

import com.miracle.web.domain.value.OrganizationType;
import lombok.Data;

import javax.persistence.Table;
import java.util.Date;

/*
雇主
 */
@Data
@Table(name = "micro_auth_business")
public class Enterprise extends Organization {

    private String service;

    private String img1;

    private String img2;

    private String img3;

    private String address;

    private Date createTime;

    private Date updateTime;

    private Byte status;

    private Date checkTime;

    private String applyName;

    private String applyContact;

    private String applyEmail;

    private String bakApplyName;

    private String bakApplyContact;

    private String bakApplyEmail;

    private String production;

    private String email;

    private String logourl;

    private String intro;

    @Override
    protected OrganizationType getOrganizationType() {
        return OrganizationType.Enterprise;
    }
}
