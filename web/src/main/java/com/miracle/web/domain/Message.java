package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Date;

@Data
@Table(name = "micro_message")
public class Message {
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