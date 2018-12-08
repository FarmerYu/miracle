package com.miracle.web.service;

import com.miracle.web.domain.MicroEnterprise;
import com.miracle.web.domain.MicroOrganization;
import com.miracle.web.domain.MicroProvider;
import com.miracle.web.mapper.MicroEnterpriseMapper;
import com.miracle.web.mapper.MicroProviderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@Service
public class MicroOrganizationService {

    @Autowired
    MicroEnterpriseMapper microEnterpriseMapper;
    @Autowired
    MicroProviderMapper microProviderMapper;

    public MicroOrganization selectByUid(Integer uid, MicroOrganization.Type organizationType) {

        switch (organizationType) {
            case Enterprise:
                return new MicroEnterprise();
            case Provider:
                return new MicroProvider();
        }

        throw new NotImplementedException();
    }

}
