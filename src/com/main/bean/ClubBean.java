package com.main.bean;

import java.util.List;

/**
 * @Author: 林汉青
 * @Date: Create in 23:56 2019/4/15
 * @Description: 美妆俱乐部Bean
 */
public class ClubBean {
    private int id;
    private String detail;
    private int user;
    private String name;
    private String time;
    private int likes;
    private List<ClubRevBean> clubRevBeans;

    public ClubBean() {
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getLikes() {
        return likes;
    }

    public void setLikes(int likes) {
        this.likes = likes;
    }

    public List<ClubRevBean> getClubRevBeans() {
        return clubRevBeans;
    }

    public void setClubRevBeans(List<ClubRevBean> clubRevBeans) {
        this.clubRevBeans = clubRevBeans;
    }
}
