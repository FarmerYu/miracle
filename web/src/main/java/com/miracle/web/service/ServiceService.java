package com.miracle.web.service;

import com.miracle.web.domain.Provider;
import com.miracle.web.domain.Service;
import com.miracle.web.mapper.ServiceMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import com.miracle.web.utils.NullSafe;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class ServiceService extends BaseService<Service> {

    @Autowired
    ServiceMapper serviceMapper;
    @Autowired
    ProviderService providerService;

    @Override
    protected BaseMapper<Service> getMapper() {
        return serviceMapper;
    }

    @Override
    protected void fillAssociationProperty(Service service) {
        if (service == null) return;

        val provider = providerService.selectByPrimaryKey(service.getOgid());
        service.setProvider(NullSafe.ensureNotNull(provider, Provider.class));
    }
}
