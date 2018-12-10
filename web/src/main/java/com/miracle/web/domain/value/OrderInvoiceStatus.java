package com.miracle.web.domain.value;

import lombok.Getter;

public enum OrderInvoiceStatus {
    Paying(0,"未开"),
    Paid(1,"已开");

    @Getter
    private String description;

    @Getter
    private int code;


    private OrderInvoiceStatus(int code, String description){
        this.description=description;
        this.code=code;
    }

    public static OrderInvoiceStatus valueOf(int code){
        for (OrderInvoiceStatus value : OrderInvoiceStatus.values()) {
            if(value.getCode()==code) return  value;
        }
        return null;
    }

    @Override
    public String toString() {
        return Integer.toString( this.code);
    }
}
