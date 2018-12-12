package com.miracle.web.domain.value;

import lombok.Getter;

public enum OrderTradeStatus {
    Confirming(0,"待确认"),
    PlatformConfirmed(1,"平台确认"),
    EmployerConfirming(2,"雇主确认"),
    ProviderConfirmed(3,"服务商完成确认"),
    EmployerConfirmed(4,"雇主完成确认");

    @Getter
    private String description;

    @Getter
    private int code;


    private OrderTradeStatus(int code, String description){
        this.description=description;
        this.code=code;
    }

    public static OrderTradeStatus valueOf(int code){
        for (OrderTradeStatus value : OrderTradeStatus.values()) {
            if(value.getCode()==code) return  value;
        }
        return null;
    }

    @Override
    public String toString() {
        return Integer.toString( this.code);
    }
}
