package com.main.bean;

/**
 * @Author: 林汉青
 * @Date: Create in 16:04 2019/4/14
 * @Description: 中分类Bean
 */
public class MiddleSortBean {
    private int id;
    private String name;
    private int big;
    private String bigname;

    public MiddleSortBean() {
    }

    public MiddleSortBean(int id, String name, int big, String bigname) {
        this.id = id;
        this.name = name;
        this.big = big;
        this.bigname = bigname;
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

    public int getBig() {
        return big;
    }

    public void setBig(int big) {
        this.big = big;
    }

    public String getBigname() {
        return bigname;
    }

    public void setBigname(String bigname) {
        this.bigname = bigname;
    }
}
