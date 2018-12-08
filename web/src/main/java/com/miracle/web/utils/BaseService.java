package com.miracle.web.utils;

import lombok.val;

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

    protected void fillAssociationProperty(List<TEntity> list) {
        list.parallelStream().forEach(this::fillAssociationProperty);
    }

    protected void fillAssociationProperty(TEntity entity) {
        return;
    }
}
