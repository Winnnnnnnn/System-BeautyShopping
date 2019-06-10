package com.main.bean;

/**
 * @Author: 林汉青
 * @Date: Create in 23:56 2019/4/15
 * @Description: 美妆俱乐部回复Bean
 */
public class ClubRevBean {
    private int id;
    private String detail;
    private int user;
    private int club;
    private String time;
    private String name;

    public ClubRevBean() {
    }

    public ClubRevBean(int id, String detail, int user, int club, String time, String name) {
        this.id = id;
        this.detail = detail;
        this.user = user;
        this.club = club;
        this.time = time;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public int getUser() {
        return user;
    }

    public void setUser(int user) {
        this.user = user;
    }

    public int getClub() {
        return club;
    }

    public void setClub(int club) {
        this.club = club;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
