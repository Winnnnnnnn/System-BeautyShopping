package com.main.bean;

/**
 * @Author: 林汉青
 * @Date: Create in 9:50 2019/4/15
 * @Description: 商品Bean
 */
public class GoodBean {
    private int id;
    private String title;
    private String detail;
    private String brand;
    private int sort;
    private String price;
    private String cover;
    private String img;
    private int views;
    private String minsort;
    private String middlesort;
    private String bigsort;

    public GoodBean() {
    }

    public GoodBean(int id, String title, String detail, String brand, int sort, String price, String cover, String img, int views, String minsort, String middlesort, String bigsort) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.brand = brand;
        this.sort = sort;
        this.price = price;
        this.cover = cover;
        this.img = img;
        this.views = views;
        this.minsort = minsort;
        this.middlesort = middlesort;
        this.bigsort = bigsort;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public int getSort() {
        return sort;
    }

    public void setSort(int sort) {
        this.sort = sort;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getCover() {
        return cover;
    }

    public void setCover(String cover) {
        this.cover = cover;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getViews() {
        return views;
    }

    public void setViews(int views) {
        this.views = views;
    }

    public String getMinsort() {
        return minsort;
    }

    public void setMinsort(String minsort) {
        this.minsort = minsort;
    }

    public String getMiddlesort() {
        return middlesort;
    }

    public void setMiddlesort(String middlesort) {
        this.middlesort = middlesort;
    }

    public String getBigsort() {
        return bigsort;
    }

    public void setBigsort(String bigsort) {
        this.bigsort = bigsort;
    }
}
