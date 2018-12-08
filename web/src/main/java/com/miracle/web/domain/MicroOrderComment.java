package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Table;

/*
订单评论
 */
@Data
@Table(name = "micro_comment")
public class MicroOrderComment extends MicroOrderExtra {

    private String content="nidayyyyyyyyyyyyyyyy";
}
