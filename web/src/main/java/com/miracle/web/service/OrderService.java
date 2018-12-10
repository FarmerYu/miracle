package com.miracle.web.service;

import com.miracle.web.domain.*;
import com.miracle.web.domain.value.OrganizationType;
import com.miracle.web.mapper.OrderMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import com.miracle.web.utils.NullSafe;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class OrderService extends BaseService<Order> {

    @Autowired
    OrderMapper orderMapper;
    @Autowired
    OrganizationService organizationService;
    @Autowired
    ServiceService serviceService;

    @Override
    protected BaseMapper<Order> getMapper() {
        return orderMapper;
    }

    @Override
    protected void fillAssociationProperty(Order entity){
        if(entity==null) return;

        val service= serviceService.selectByPrimaryKey(entity.getServiceId());
        val provider=(Provider) organizationService.selectByUid(entity.getSellUid(), OrganizationType.Provider) ;
        val enterprise=(Enterprise) organizationService.selectByUid(entity.getBuyUid(), OrganizationType.Enterprise);

        entity.setBuyer(NullSafe.ensureNotNull(enterprise, Enterprise.class));
        entity.setSeller(NullSafe.ensureNotNull(provider, Provider.class));
        entity.setService(NullSafe.ensureNotNull(service, Service.class));
    }
}
