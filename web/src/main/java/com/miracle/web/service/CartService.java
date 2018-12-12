package com.miracle.web.service;

import com.miracle.web.domain.Service;
import com.miracle.web.domain.Cart;
import com.miracle.web.mapper.CartMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import com.miracle.web.utils.NullSafe;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class CartService extends BaseService<Cart> {

    @Autowired
    CartMapper shoppingCartMapper;
    @Autowired
    ServiceService serviceService;

    @Override
    protected BaseMapper<Cart> getMapper() {
        return shoppingCartMapper;
    }

    @Override
    protected void fillAssociationProperty(Cart shoppingCart) {
        if (shoppingCart == null) return;

        val service = serviceService.selectByPrimaryKey(shoppingCart.getServiceId());
        shoppingCart.setService(NullSafe.ensureNotNull(service, Service.class));
    }
}
