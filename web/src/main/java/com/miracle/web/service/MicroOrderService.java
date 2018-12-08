package com.miracle.web.service;

import com.miracle.web.domain.*;
import com.miracle.web.mapper.MicroOrderMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import com.miracle.web.utils.NullSafe;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroOrderService  extends BaseService<MicroOrder> {

    @Autowired
    MicroOrderMapper microOrderMapper;
    @Autowired
    MicroOrganizationService microOrganizationService;
    @Autowired
    MicroServiceService microServiceService;

    @Override
    protected BaseMapper<MicroOrder> getMapper() {
        return microOrderMapper;
    }

    @Override
    protected void fillAssociationProperty(MicroOrder entity){
        if(entity==null) return;

        val service=microServiceService.selectByPrimaryKey(entity.getServiceId());
        val provider=(MicroProvider)microOrganizationService.selectByUid(entity.getSellUid(), MicroOrganization.Type.Provider) ;
        val enterprise=(MicroEnterprise)microOrganizationService.selectByUid(entity.getBuyUid(), MicroOrganization.Type.Enterprise);

        entity.setBuyer(NullSafe.ensureNotNull(enterprise,MicroEnterprise.class));
        entity.setSeller(NullSafe.ensureNotNull(provider,MicroProvider.class));
        entity.setService(NullSafe.ensureNotNull(service,MicroService.class));
    }
}
