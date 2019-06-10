package com.main.bean;

/**
 * @Author: 林汉青
 * @Date: Create in 22:03 2019/4/14
 * @Description: 管理员Bean
 */
public class AdminBean {
    private int id;
    private String name;
    private String pwd;

    public AdminBean() {
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

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
