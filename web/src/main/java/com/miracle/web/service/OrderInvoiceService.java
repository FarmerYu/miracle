package com.miracle.web.service;

import com.miracle.web.domain.OrderInvoice;
import com.miracle.web.mapper.OrderInvoiceMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderInvoiceService extends BaseService<OrderInvoice> {
    @Autowired
    OrderService orderService;
    @Autowired
    OrderInvoiceMapper orderInvoiceMapper;
    @Override
    protected BaseMapper<OrderInvoice> getMapper() {
        return orderInvoiceMapper;
    }

    @Override
    protected void fillAssociationProperty(OrderInvoice microOrderInvoice) {
        super.fillAssociationProperty(microOrderInvoice);

        if(microOrderInvoice==null) return;

        val order= orderService.selectByPrimaryKey(microOrderInvoice.getOrderId());
        microOrderInvoice.setOrder(order);

    }
}
