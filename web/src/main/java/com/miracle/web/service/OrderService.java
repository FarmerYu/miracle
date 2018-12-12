package com.miracle.web.service;

import com.miracle.web.domain.Enterprise;
import com.miracle.web.domain.Order;
import com.miracle.web.domain.Provider;
import com.miracle.web.domain.Service;
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
    @Autowired ProviderService providerService;
    @Autowired EnterpriseService enterpriseService;

    @Override
    protected BaseMapper<Order> getMapper() {
        return orderMapper;
    }

    @Override
    protected void fillAssociationProperty(Order order){
        if(order==null) return;

        val service= serviceService.selectByPrimaryKey(order.getServiceId());
        val enterprise=enterpriseService.selectByUid(order.getBuyUid());

        order.setService(NullSafe.ensureNotNull(service, Service.class));
        order.setBuyer(NullSafe.ensureNotNull(enterprise, Enterprise.class));
        order.setSeller(NullSafe.ensureNotNull(order.getService().getProvider(),Provider.class));

    }
}
