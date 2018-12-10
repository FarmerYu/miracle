package com.miracle.web.domain.value;

import lombok.Getter;

public enum OrderPayStatus {
    Paying(0,"待付款"),
    Paid(1,"支付成功"),
    Canceled(-1,"已取消");

    @Getter
    private String description;

    @Getter
    private int code;


    private OrderPayStatus(int code, String description){
        this.description=description;
        this.code=code;
    }

    public static OrderPayStatus valueOf(int code){
        for (OrderPayStatus value : OrderPayStatus.values()) {
            if(value.getCode()==code) return  value;
        }
        return null;
    }

    @Override
    public String toString() {
        return Integer.toString( this.code);
    }
}
