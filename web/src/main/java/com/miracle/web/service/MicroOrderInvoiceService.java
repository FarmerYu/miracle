package com.miracle.web.service;

import com.miracle.web.domain.MicroOrderInvoice;
import com.miracle.web.mapper.MicroOrderInvoiceMapper;
import com.miracle.web.utils.BaseMapper;
import com.miracle.web.utils.BaseService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MicroOrderInvoiceService extends BaseService<MicroOrderInvoice> {
    @Autowired
    MicroOrderService microOrderService;
    @Autowired
    MicroOrderInvoiceMapper microOrderInvoiceMapper;
    @Override
    protected BaseMapper<MicroOrderInvoice> getMapper() {
        return microOrderInvoiceMapper;
    }

    @Override
    protected void fillAssociationProperty(MicroOrderInvoice microOrderInvoice) {
        super.fillAssociationProperty(microOrderInvoice);

        if(microOrderInvoice==null) return;

        val order=microOrderService.selectByPrimaryKey(microOrderInvoice.getOrderId());
        microOrderInvoice.setOrder(order);

    }
}
