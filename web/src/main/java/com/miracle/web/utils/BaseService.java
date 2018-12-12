package com.miracle.web.utils;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.miracle.web.domain.Order;
import lombok.val;
import tk.mybatis.mapper.entity.Example;
import tk.mybatis.mapper.weekend.WeekendSqls;

import java.util.List;

public abstract class BaseService<TEntity> {

    protected abstract BaseMapper<TEntity> getMapper();

    public List<TEntity> select(TEntity record) {
        val list = getMapper().select(record);
        fillAssociationProperty(list);

        return list;
    }

    public TEntity selectByPrimaryKey(Object key) {
        val entity = getMapper().selectByPrimaryKey(key);
        fillAssociationProperty(entity);

        return entity;
    }

    public List<TEntity> selectByExample(Object example) {
        val list = getMapper().selectByExample(example);
        fillAssociationProperty(list);

        return list;
    }

    public Page pageByExample(Object example,int pageNum, short pageSize){
        val page = PageHelper.startPage(pageNum, pageSize).doSelectPage(() -> this.selectByExample(example));

        return page;
    }

    protected void fillAssociationProperty(List<TEntity> list) {
        list.parallelStream().forEach(this::fillAssociationProperty);
    }

    protected void fillAssociationProperty(TEntity entity) {
        return;
    }
}
