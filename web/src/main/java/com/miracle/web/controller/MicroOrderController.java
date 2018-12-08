package com.miracle.web.controller;

import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.MicroOrder;
import com.miracle.web.domain.MicroOrderInvoice;
import com.miracle.web.domain.MicroOrderPayStatus;
import com.miracle.web.service.MicroOrderInvoiceService;
import com.miracle.web.service.MicroOrderService;
import lombok.val;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.weekend.WeekendSqls;

@Controller
@RequestMapping("/order")
public class MicroOrderController {
    private static final short PAGE_SIZE  = 5;

    @Autowired
    MicroOrderService microOrderService;
    @Autowired
    MicroOrderInvoiceService microOrderInvoiceService;

    @RequestMapping("/index")
    public ModelAndView index(@RequestParam(defaultValue = "1") Integer pageNum, @RequestParam(defaultValue = "0") Integer status){
        val example= Example.builder(MicroOrder.class)
                .where(WeekendSqls.<MicroOrder>custom()
                        .andEqualTo(MicroOrder::getStatus,MicroOrderPayStatus.valueOf(status)))
                .orderByDesc("id")
                .build();

        val page= PageHelper.startPage(pageNum,PAGE_SIZE).doSelectPage(()->microOrderService.selectByExample(example));

        return  new ModelAndView("center/enterprise/order/order","page",page);
    }

    @RequestMapping("/invoice")
    public ModelAndView invoice(@RequestParam(defaultValue = "1") Integer pageNum){
        val example= Example.builder(MicroOrderInvoice.class)
/*                .where(WeekendSqls.<MicroOrderInvoice>custom()
                        .andEqualTo(MicroOrderInvoice::getBuyUid,))*/
                .orderByDesc("id")
                .build();

        val page=PageHelper.startPage(pageNum,PAGE_SIZE).doSelectPage(()->microOrderInvoiceService.selectByExample(example));

        return  new ModelAndView("center/enterprise/order/invoice","page",page);
    }
}
