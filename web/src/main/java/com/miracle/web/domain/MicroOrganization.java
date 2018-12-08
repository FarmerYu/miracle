package com.miracle.web.domain;

import lombok.Data;

import javax.persistence.Id;
import java.util.List;

@Data
public abstract class MicroOrganization {
    @Id
    private Integer id;
    private Integer uid;
    private MicroUser owner;
    private Integer name;

    protected abstract Type getOrganizationType();

    private List<MicroOrganizationMember> members;


    public enum Type {Enterprise,Provider}
}
