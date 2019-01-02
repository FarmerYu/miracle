package com.miracle.web.service;

import com.miracle.web.domain.Enterprise;
import com.miracle.web.domain.Organization;
import com.miracle.web.domain.Provider;
import com.miracle.web.domain.value.OrganizationType;
import com.miracle.web.mapper.EnterpriseMapper;
import com.miracle.web.mapper.ProviderMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.reflect.generics.reflectiveObjects.NotImplementedException;

@Service
public class OrganizationService {

    @Autowired
    EnterpriseMapper enterpriseMapper;
    @Autowired
    ProviderMapper providerMapper;

    public Organization selectByUid(Integer uid, OrganizationType organizationType) {

        switch (organizationType) {
            case Enterprise:
                return new Enterprise();
            case Provider:
                return new Provider();
        }

        throw new NotImplementedException();
    }


}
