package com.miracle.web.controller;

import com.github.pagehelper.Page;
import com.miracle.web.domain.Cart;
import com.miracle.web.domain.Order;
import com.miracle.web.domain.Service;
import com.miracle.web.domain.value.OrderPayStatus;
import com.miracle.web.service.CartService;
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

import java.util.stream.Collectors;

@Controller
@RequestMapping("/cart")
public class CartController extends CenterController {
    private static final short PAGE_SIZE = 5;

    @Autowired
    CartService cartService;

    @RequestMapping("/index")
    public ModelAndView index() {
        val weekendSqls = WeekendSqlsProxy.<Cart>custom()
                .andEqualTo(Cart::getUid, currentUser().getUid())
                .weekendSqls();
        val example = Example.builder(Cart.class)
                .where(weekendSqls)
                .build();

        val list = cartService.selectByExample(example);
        val map= list.stream().filter(m->m.getService()!=null&&m.getService().getProvider()!=null).collect(Collectors.groupingBy(m->m.getService().getProvider()));

        return new ModelAndView("center/enterprise/cart", "map", map);
    }

}
