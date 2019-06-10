package com.main.back;

import com.main.bean.GoodBean;
import com.main.bean.MinSortBean;
import com.main.bean.OrdersBean;
import com.main.bean.UserBean;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @Author: 林汉青
 * @Date: Create in 19:23 2019/4/14
 * @Description: 管理页路由
 */
@WebServlet(name="admin",urlPatterns="/admin")
public class Admin extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/page/admin.jsp").forward(req,resp);
    }

    /**
     * 处理浏览器POST请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //调整编码，防止中文乱码
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        //获取请求来自于哪里，做什么动作
        String action = req.getParameter("action");
        //回调结果
        PrintWriter printWriter = resp.getWriter();
        //判断动作
        if (action != null) {
            switch (action) {
                case ACTION_ADMIN_GET_GOODS:
                    printWriter.print(getGoods(req));
                    break;
                case ACTION_ADMIN_ADD_GOODS:
                    printWriter.print(addGoods(req));
                    break;
                case ACTION_ADMIN_EDIT_GOODS:
                    printWriter.print(editGoods(req));
                    break;
                case ACTION_ADMIN_DEL_GOODS:
                    printWriter.print(delGoods(req));
                    break;
                case ACTION_ADMIN_GET_SORT:
                    printWriter.print(getSort(req));
                    break;
                case ACTION_ADMIN_ADD_SORT:
                    printWriter.print(addSort(req));
                    break;
                case ACTION_ADMIN_EDIT_SORT:
                    printWriter.print(editSort(req));
                    break;
                case ACTION_ADMIN_DEL_SORT:
                    printWriter.print(delSort(req));
                    break;
                case ACTION_ADMIN_GET_ORDER:
                    printWriter.print(doGetOrder(req));
                    break;
                case ACTION_ADMIN_DEL_ORDER:
                    printWriter.print(doDelOrder(req));
                    break;
                case ACTION_ADMIN_GET_USER:
                    printWriter.print(doGetUser(req));
                    break;
                case ACTION_ADMIN_EDIT_USER:
                    printWriter.print(doEditUser(req));
                    break;
                case ACTION_ADMIN_DEL_CLUBS:
                    printWriter.print(doDelClubs(req));
                    break;
            }
        }
    }

    /**
     * 获取全部商品
     * @param req
     * @return
     */
    private String getGoods(HttpServletRequest req) {
        String sql = "select goods.*,min_sort.name minsort,middle_sort.name middlesort,big_sort.name bigsort " +
                "from goods,min_sort,middle_sort,big_sort " +
                "where goods.sort=min_sort.id " +
                "and min_sort.middle=middle_sort.id " +
                "and middle_sort.big=big_sort.id " +
                "order by goods.id desc";
        List<GoodBean> goodBeans = SqlHelper.doListQuery(sql,null,GoodBean.class);
        if (null != goodBeans) {
            JSONArray jsonArray = JSONArray.fromObject(goodBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加商品
     * @param req
     * @return
     */
    private Boolean addGoods(HttpServletRequest req) {
        String sql = "insert into goods(title,detail,brand,sort,price,cover,img) values(?,?,?,?,?,?,?)";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("detail"),
                req.getParameter("brand"),
                req.getParameter("sort"),
                req.getParameter("price"),
                req.getParameter("cover"),
                req.getParameter("img")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 修改商品
     * @param req
     * @return
     */
    private Boolean editGoods(HttpServletRequest req) {
        String sql = "update goods set title=?,detail=?,brand=?,sort=?,price=?,cover=?,img=? where id=?";
        String[] p = {
                req.getParameter("title"),
                req.getParameter("detail"),
                req.getParameter("brand"),
                req.getParameter("sort"),
                req.getParameter("price"),
                req.getParameter("cover"),
                req.getParameter("img"),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除商品
     * @param req
     * @return
     */
    private Boolean delGoods(HttpServletRequest req) {
        String sql = "delete from goods where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部分类
     * @param req
     * @return
     */
    private String getSort(HttpServletRequest req) {
        String sql = "select min_sort.id,min_sort.name,middle_sort.id middleid,middle_sort.name middlename,big_sort.id bigid,big_sort.name bigname " +
                "from big_sort,middle_sort,min_sort " +
                "where min_sort.middle=middle_sort.id " +
                "and middle_sort.big=big_sort.id order by min_sort.id desc";
        List<MinSortBean> minSortBeans = SqlHelper.doListQuery(sql,null, MinSortBean.class);
        if (minSortBeans != null) {
            JSONArray jsonArray = JSONArray.fromObject(minSortBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 添加类别
     * @param req
     * @return
     */
    private Boolean addSort(HttpServletRequest req) {
        String sql = "insert into min_sort(name,middle) values(?,?)";
        String[] p = {
                req.getParameter("name"),
                req.getParameter("middle")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 修改分类
     * @param req
     * @return
     */
    private Boolean editSort(HttpServletRequest req) {
        String sql = "update min_sort set name=?,middle=? where id=?";
        String[] p = {
                req.getParameter("name"),
                req.getParameter("middle"),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除分类
     * @param req
     * @return
     */
    private Boolean delSort(HttpServletRequest req) {
        String sql = "delete from min_sort where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取订单
     * @param req
     * @return
     */
    private String doGetOrder(HttpServletRequest req) {
        String sql = "select * from orders order by id desc";
        List<OrdersBean> ordersBeans = SqlHelper.doListQuery(sql,null,OrdersBean.class);
        if (null != ordersBeans) {
            JSONArray jsonArray = JSONArray.fromObject(ordersBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 订单发货
     * @param req
     * @return
     */
    private Boolean doDelOrder(HttpServletRequest req) {
        String sql = "update orders set state=2 where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取全部用户
     * @param req
     * @return
     */
    private String doGetUser(HttpServletRequest req) {
        String sql = "select * from user order by id desc";
        List<UserBean> userBeans = SqlHelper.doListQuery(sql,null,UserBean.class);
        if (null != userBeans) {
            JSONArray jsonArray = JSONArray.fromObject(userBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 修改用户资料
     * @param req
     * @return
     */
    private Boolean doEditUser(HttpServletRequest req) {
        String sql = "update user set name=?,pwd=? where id=?";
        String[] p = {
                req.getParameter("name"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 删除美妆俱乐部数据
     * @param req
     * @return
     */
    private Boolean doDelClubs(HttpServletRequest req) {
        String sql = "delete from clubs where id=?";
        String[] p = {
                req.getParameter("id")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }
}
