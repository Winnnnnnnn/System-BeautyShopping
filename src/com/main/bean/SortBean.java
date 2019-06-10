package com.main.bean;

import java.util.List;

/**
 * @Author: 林汉青
 * @Date: Create in 16:12 2019/4/14
 * @Description: 分类Bean
 */
public class SortBean {
    private List<BigSortBean> bigSortBeans;
    private List<MiddleSortBean> middleSortBeans;
    private List<MinSortBean> minSortBeans;

    public SortBean() {
    }

    public SortBean(List<BigSortBean> bigSortBeans, List<MiddleSortBean> middleSortBeans, List<MinSortBean> minSortBeans) {
        this.bigSortBeans = bigSortBeans;
        this.middleSortBeans = middleSortBeans;
        this.minSortBeans = minSortBeans;
    }

    public List<BigSortBean> getBigSortBeans() {
        return bigSortBeans;
    }

    public void setBigSortBeans(List<BigSortBean> bigSortBeans) {
        this.bigSortBeans = bigSortBeans;
    }

    public List<MiddleSortBean> getMiddleSortBeans() {
        return middleSortBeans;
    }

    public void setMiddleSortBeans(List<MiddleSortBean> middleSortBeans) {
        this.middleSortBeans = middleSortBeans;
    }

    public List<MinSortBean> getMinSortBeans() {
        return minSortBeans;
    }

    public void setMinSortBeans(List<MinSortBean> minSortBeans) {
        this.minSortBeans = minSortBeans;
    }
}
