package com.miracle.web.controller;

import com.github.pagehelper.Page;
import com.miracle.web.domain.Order;
import com.miracle.web.domain.value.OrderPayStatus;
import com.miracle.web.service.OrderService;
import com.miracle.web.utils.WeekendSqlsProxy;
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

    @RequestMapping("/index")
    public ModelAndView index(@RequestParam(defaultValue = "1") int pageNum
            , @RequestParam(name = "ps", required = false) Integer payStatus
            , @RequestParam(name = "cs", required = false) Integer commentStatus
            , @RequestParam(name = "is", required = false) Integer invoiceStatus) {
        val weekendSqls = WeekendSqlsProxy.<Order>custom()
                .andEqualTo(Order::getBuyUid, currentUser().getUid())
                .andEqualTo(Order::getPayStatus, payStatus == null ? null : OrderPayStatus.valueOf(payStatus))
                .andEqualTo(Order::getInvoiceStatus, invoiceStatus == null ? null : invoiceStatus)
                .andIsNullOrNot(Order::getComment, commentStatus == null ? null : commentStatus == 0)
                .weekendSqls();

        val page = doSelectPage(pageNum, weekendSqls);

        return new ModelAndView("center/enterprise/order", "page", page);
    }


    @RequestMapping("/partner")
    public ModelAndView partner(@RequestParam(defaultValue = "1") int pageNum) {
        val weekendSqls = WeekendSqlsProxy.<Order>custom()
                .andEqualTo(Order::getBuyUid, currentUser().getUid())
                .andEqualTo(Order::getPayStatus, OrderPayStatus.Paid)
                .weekendSqls();

        val page = doSelectPage(pageNum, weekendSqls);

        return new ModelAndView("center/enterprise/partner", "page", page);
    }

    @RequestMapping("/trading")
    public ModelAndView trading(@RequestParam(defaultValue = "1") int pageNum) {
        val weekendSqls = WeekendSqlsProxy.<Order>custom()
                .andEqualTo(Order::getBuyUid, currentUser().getUid())
                .andEqualTo(Order::getPayStatus, OrderPayStatus.Paid)
                .weekendSqls();

        val page = doSelectPage(pageNum, weekendSqls);

        return new ModelAndView("center/enterprise/partner", "page", page);
    }

    private Page doSelectPage(Integer pageNum, WeekendSqls<Order> weekendSqls) {
        val example = Example.builder(Order.class)
                .where(weekendSqls)
                .orderByDesc("id")
                .build();

        val page = orderService.pageByExample(example, pageNum, PAGE_SIZE);

        return page;
    }
}
