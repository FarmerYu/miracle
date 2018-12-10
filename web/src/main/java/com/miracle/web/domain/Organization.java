package com.miracle.web.domain;

import com.miracle.web.domain.value.OrganizationType;
import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;
import java.util.List;

@Data
public abstract class Organization {
    @Id
    private Integer id;
    private Integer uid;
    private User owner;
    private Integer name;

    protected abstract OrganizationType getOrganizationType();

    private List<OrganizationMember> members;


}
