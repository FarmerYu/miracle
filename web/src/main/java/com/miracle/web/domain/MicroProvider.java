package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Table;
import java.util.Date;

/*
服务商
 */
@Data
@Table(name="micro_auth_orgnise")
public class MicroProvider extends MicroOrganization {

    private String type;

    private String img2;

    private String img3;

    private String remark;

    private String img1;

    private Integer nums;

    private Date createTime;

    private Date updateTime;

    private Byte status;

    private Date checkTime;

    private String email;

    private String tel;

    private String logourl;

    private Integer fromUid;

    private String intro;

    @Override
    protected Type getOrganizationType() {
        return Type.Provider;
    }
}
