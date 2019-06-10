package com.main.bean;

/**
 * @Author: 林汉青
 * @Date: Create in 13:46 2019/4/14
 * @Description: 小分类Bean
 */
public class MinSortBean {
    private int id;
    private String name;
    private int middleid;
    private String middlename;
    private int bigid;
    private String bigname;

    public MinSortBean() {
    }

    public MinSortBean(int id, String name, int middleid, String middlename, int bigid, String bigname) {
        this.id = id;
        this.name = name;
        this.middleid = middleid;
        this.middlename = middlename;
        this.bigid = bigid;
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

    public int getMiddleid() {
        return middleid;
    }

    public void setMiddleid(int middleid) {
        this.middleid = middleid;
    }

    public String getMiddlename() {
        return middlename;
    }

    public void setMiddlename(String middlename) {
        this.middlename = middlename;
    }

    public int getBigid() {
        return bigid;
    }

    public void setBigid(int bigid) {
        this.bigid = bigid;
    }

    public String getBigname() {
        return bigname;
    }

    public void setBigname(String bigname) {
        this.bigname = bigname;
    }
}
