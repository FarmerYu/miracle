package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import java.util.Date;

@Data
public class MicroMessage {
    @Id
    private Integer id;

    private Integer recid;

    private String msg;

    private Integer msgType;

    private Integer isRead;

    private Date createTime;

    private Date readTime;

    private Integer recuid;
}