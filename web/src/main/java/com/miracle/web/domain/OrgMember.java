package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Table;

@Data
@Table(name = "micro_user_orgnise")
public class OrgMember {
    private Integer uid;
    private Integer ogId;
}
