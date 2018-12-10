package com.miracle.web.controller;

import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.Order;
import com.miracle.web.domain.value.OrderPayStatus;
import com.miracle.web.service.OrderInvoiceService;
import com.miracle.web.service.OrderService;
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
public class OrderController extends CenterController {
    private static final short PAGE_SIZE = 5;

    @Autowired
    OrderService orderService;
    @Autowired
    OrderInvoiceService orderInvoiceService;

    @RequestMapping("/index")
    public ModelAndView index(@RequestParam(defaultValue = "1") Integer pageNum, @RequestParam(defaultValue = "0") Integer status) {
        val example = Example.builder(Order.class)
                .where(WeekendSqls.<Order>custom()
                                .andEqualTo(Order::getPayStatus, OrderPayStatus.valueOf(status))
                        //.andEqualTo(Order::getBuyUid,currentUser().getUid())
                )
                .orderByDesc("id")
                .build();

        val page = PageHelper.startPage(pageNum, PAGE_SIZE).doSelectPage(() -> orderService.selectByExample(example));

        return new ModelAndView("center/enterprise/order/order", "page", page);
    }

    @RequestMapping("/invoice")
    public ModelAndView invoice(@RequestParam(defaultValue = "1") Integer pageNum) {
        val example = Example.builder(Order.class)
                .where(WeekendSqls.<Order>custom()
                                .andEqualTo(Order::getPayStatus, OrderPayStatus.Paid.getCode())
                        //.andEqualTo(Order::getBuyUid,currentUser().getUid())
                )
                .orderByDesc("id")
                .build();

        val page = PageHelper.startPage(pageNum, PAGE_SIZE).doSelectPage(() -> orderService.selectByExample(example));

        return new ModelAndView("center/enterprise/order/invoice", "page", page);
    }

    @RequestMapping("/comment")
    public ModelAndView comment(@RequestParam(defaultValue = "1") Integer pageNum) {
        val example = Example.builder(Order.class)
                .where(WeekendSqls.<Order>custom()
                                .andEqualTo(Order::getPayStatus, OrderPayStatus.Paid.getCode())
                        //.andEqualTo(Order::getBuyUid,currentUser().getUid())
                )
                .orderByDesc("id")
                .build();

        val page = PageHelper.startPage(pageNum, PAGE_SIZE).doSelectPage(() -> orderService.selectByExample(example));

        return new ModelAndView("center/enterprise/order/comment", "page", page);
    }
}
