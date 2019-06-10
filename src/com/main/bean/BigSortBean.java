package com.main.bean;

/**
 * @Author: 林汉青
 * @Date: Create in 16:04 2019/4/14
 * @Description: 大分类Bean
 */
public class BigSortBean {
    private int id;
    private String name;

    public BigSortBean() {
    }

    public BigSortBean(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
