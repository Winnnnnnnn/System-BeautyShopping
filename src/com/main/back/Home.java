package com.main.back;

import com.main.bean.*;
import com.main.utils.Base64Util;
import com.main.utils.SqlHelper;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

import static com.main.utils.ConstUtil.*;

/**
 * @Author: 林汉青
 * @Date: Create in 13:41 2019/4/14
 * @Description: 首页路由
 */
@WebServlet(name="home",urlPatterns="/home")
public class Home extends HttpServlet {
    /**
     * 处理浏览器GET请求
     * @param req
     * @param resp
     * @throws ServletException
     * @throws IOException
     */
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.getRequestDispatcher("/page/home.jsp").forward(req,resp);
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
                case ACTION_HOME_GET_SORT:
                    printWriter.print(getSorts(req));
                    break;
                case ACTION_HOME_ADMIN_LOGIN:
                    printWriter.print(doAdminLogin(req));
                    break;
                case ACTION_HOME_GET_GOODS_BY_SORT:
                    printWriter.print(getGoodsBySorts(req));
                    break;
                case ACTION_HOME_GET_GOODS_BY_ID:
                    printWriter.print(getGoodsById(req));
                    break;
                case ACTION_HOME_LOGIN:
                    printWriter.print(doLogin(req));
                    break;
                case ACTION_HOME_SIGN_UP:
                    printWriter.print(doSignUp(req));
                    break;
                case ACTION_HOME_GET_CAR:
                    printWriter.print(doGetCar(req));
                    break;
                case ACTION_HOME_ADD_CAR:
                    printWriter.print(doAddCar(req));
                    break;
                case ACTION_HOME_DEL_CAR:
                    printWriter.print(doDelCar(req));
                    break;
                case ACTION_HOME_SEARCH:
                    printWriter.print(doSearch(req));
                    break;
                case ACTION_HOME_ADD_ORDER:
                    printWriter.print(dogAddOrder(req));
                    break;
                case ACTION_HOME_GET_ORDER:
                    printWriter.print(doGetOrder(req));
                    break;
                case ACTION_HOME_DEL_ORDER:
                    printWriter.print(doDelOrder(req));
                    break;
                case ACTION_HOME_GET_HOT:
                    printWriter.print(doGetHot(req));
                    break;
                case ACTION_HOME_GET_HOT_MORE:
                    printWriter.print(doGetMoreHot(req));
                    break;
                case ACTION_HOME_GET_CLUBS:
                    printWriter.print(doGetClubs(req));
                    break;
                case ACTION_HOME_ADD_CLUBS:
                    printWriter.print(doAddClubs(req));
                    break;
                case ACTION_HOME_LIKE_CLUBS:
                    printWriter.print(doLikeClubs(req));
                    break;
                case ACTION_HOME_REV_CLUBS:
                    printWriter.print(doRevClubs(req));
                    break;
            }
        }
    }

    /**
     * 获取全部分类
     * @param req
     * @return
     */
    private String getSorts(HttpServletRequest req) {
        SortBean sortBean = new SortBean();
        //获取大分类
        String big_sql = "select * from big_sort";
        List<BigSortBean> bigSortBeans = SqlHelper.doListQuery(big_sql,null,BigSortBean.class);
        if (bigSortBeans != null) {
            sortBean.setBigSortBeans(bigSortBeans);
            //获取中分类
            String middle_sql = "select middle_sort.*,big_sort.name bigname from middle_sort,big_sort where middle_sort.big=big_sort.id";
            List<MiddleSortBean> middleSortBeans = SqlHelper.doListQuery(middle_sql,null,MiddleSortBean.class);
            if (middleSortBeans != null) {
                sortBean.setMiddleSortBeans(middleSortBeans);
                //获取小分类
                String sql = "select min_sort.id,min_sort.name,middle_sort.id middleid,middle_sort.name middlename,big_sort.id bigid,big_sort.name bigname " +
                        "from big_sort,middle_sort,min_sort " +
                        "where min_sort.middle=middle_sort.id " +
                        "and middle_sort.big=big_sort.id";
                List<MinSortBean> minSortBeans = SqlHelper.doListQuery(sql,null, MinSortBean.class);
                if (minSortBeans != null) {
                    sortBean.setMinSortBeans(minSortBeans);
                    JSONObject jsonObject = JSONObject.fromObject(sortBean);
                    return jsonObject.toString();
                } else {
                    return "";
                }
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    /**
     * 管理员登录动作
     * @param req
     * @return
     */
    private String doAdminLogin(HttpServletRequest req) {
        String sql = "select * from admin where name=? and pwd=?";
        String[] p = {req.getParameter("name"), Base64Util.encode(req.getParameter("pwd"))};
        AdminBean adminBean = SqlHelper.doObjQuery(sql,p,AdminBean.class);
        if (adminBean != null) {
            JSONObject jsonObject = JSONObject.fromObject(adminBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 根据类别获取商品数据
     * @param req
     * @return
     */
    private String getGoodsBySorts(HttpServletRequest req) {
        //根据流量排序
        String sql = "select goods.*,min_sort.name minsort,middle_sort.name middlesort,big_sort.name bigsort " +
                "from goods,min_sort,middle_sort,big_sort " +
                "where goods.sort=? and goods.sort=min_sort.id " +
                "and min_sort.middle=middle_sort.id " +
                "and middle_sort.big=big_sort.id " +
                "order by goods.views desc";
        String[] p = {req.getParameter("sort")};
        List<GoodBean> goodBeans = SqlHelper.doListQuery(sql,p,GoodBean.class);
        if (null != goodBeans) {
            JSONArray jsonArray = JSONArray.fromObject(goodBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 根据ID获取商品数据
     * @param req
     * @return
     */
    private String getGoodsById(HttpServletRequest req) {
        //流量统计
        String sql_view = "update goods set views=views+1 where id=?";
        String[] p_view = {req.getParameter("id")};
        SqlHelper.doUpdate(sql_view,p_view);
        //根据流量排序
        String sql = "select goods.*,min_sort.name minsort,middle_sort.name middlesort,big_sort.name bigsort " +
                "from goods,min_sort,middle_sort,big_sort " +
                "where goods.id=? and goods.sort=min_sort.id " +
                "and min_sort.middle=middle_sort.id " +
                "and middle_sort.big=big_sort.id ";
        String[] p = {req.getParameter("id")};
        GoodBean goodBean = SqlHelper.doObjQuery(sql,p,GoodBean.class);
        if (null != goodBean) {
            JSONObject jsonObject = JSONObject.fromObject(goodBean);
            return jsonObject.toString();
        } else {
            return "";
        }
    }

    /**
     * 用户登录
     * @param req
     * @return
     */
    private String doLogin(HttpServletRequest req) {
        String sql = "select * from user where phone=? and pwd=?";
        String[] p = {
                req.getParameter("phone"),
                Base64Util.encode(req.getParameter("pwd"))
        };
        UserBean userBean = SqlHelper.doObjQuery(sql,p,UserBean.class);
        if (userBean != null) {
            //登录成功
            JSONObject jsonObject = JSONObject.fromObject(userBean);
            return jsonObject.toString();
        } else {
            //登录失败
            return "";
        }
    }

    /**
     * 用户注册
     * @param req
     * @return
     */
    private Boolean doSignUp(HttpServletRequest req) {
        String sql = "insert into user(name,phone,pwd) select ?,?,? from dual where not exists(select name from user where phone=?)";
        String[] p = {
                req.getParameter("name"),
                req.getParameter("phone"),
                Base64Util.encode(req.getParameter("pwd")),
                req.getParameter("phone")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取购物车
     * @param req
     * @return
     */
    private String doGetCar(HttpServletRequest req) {
        String sql = "select car.*,goods.id goodsid,goods.title,goods.detail,goods.cover img,goods.price from car,goods where car.userid=? and car.goodid=goods.id order by car.id desc";
        String[] p = {
                req.getParameter("id")
        };
        List<CarBean> carBeans = SqlHelper.doListQuery(sql,p,CarBean.class);
        if (null != carBeans) {
            JSONArray jsonArray = JSONArray.fromObject(carBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 加入购物车
     * @param req
     * @return
     */
    private Boolean doAddCar(HttpServletRequest req) {
        String sql = "insert into car(goodid,userid,count) values(?,?,?)";
        String[] p = {
                req.getParameter("goodid"),
                req.getParameter("userid"),
                req.getParameter("count")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result > 0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 移除购物车
     * @param req
     * @return
     */
    private Boolean doDelCar(HttpServletRequest req) {
        String sql = "delete from car where id=?";
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
     * 搜索
     * @param req
     * @return
     */
    private String doSearch(HttpServletRequest req) {
        //这里的搜索操作很骚，企业级的
        String sql = "select * from goods where title like ? or ? like CONCAT('%',title,'%') order by views desc";
        String[] p = {
                "%" + req.getParameter("key") + "%",
                req.getParameter("key")
        };
        List<GoodBean> goodsBeans = SqlHelper.doListQuery(sql,p,GoodBean.class);
        if (null != goodsBeans) {
            JSONArray jsonArray = JSONArray.fromObject(goodsBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 确认订单
     * @param req
     * @return
     */
    private Boolean dogAddOrder(HttpServletRequest req) {
        String car = req.getParameter("car_list");
        String[] car_list = car.split(",");
        for (int i=0;i<car_list.length;i++) {
            String sql = "delete from car where id=?";
            String[] p = {car_list[i]};
            int result = SqlHelper.doUpdate(sql,p);
            if (result>0) {
                System.out.println("成功!");
            } else {
                System.out.println("失败!");
            }
        }
        String sql = "insert into orders(userid,list,time,total) values(?,?,?,?)";
        String[] p = {
                req.getParameter("userid"),
                req.getParameter("list"),
                req.getParameter("time"),
                req.getParameter("total")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获取个人订单
     * @param req
     * @return
     */
    private String doGetOrder(HttpServletRequest req) {
        String sql = "select orders.* from orders where orders.userid=? order by orders.id desc";
        String[] p = {
                req.getParameter("userid")
        };
        List<OrdersBean> ordersBeans = SqlHelper.doListQuery(sql,p,OrdersBean.class);
        if (null != ordersBeans) {
            JSONArray jsonArray = JSONArray.fromObject(ordersBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 取消订单
     * @param req
     * @return
     */
    private Boolean doDelOrder(HttpServletRequest req) {
        String sql = "update orders set state=1 where id=?";
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
     * 获取热门商品
     * @param req
     * @return
     */
    private String doGetHot(HttpServletRequest req) {
        String sql = "select goods.*,min_sort.name minsort,middle_sort.name middlesort,big_sort.name bigsort " +
                "from goods,min_sort,middle_sort,big_sort " +
                "where goods.sort=min_sort.id " +
                "and min_sort.middle=middle_sort.id " +
                "and middle_sort.big=big_sort.id " +
                "order by goods.views desc limit 5";
        List<GoodBean> goodBeans = SqlHelper.doListQuery(sql,null,GoodBean.class);
        if (null != goodBeans) {
            JSONArray jsonArray = JSONArray.fromObject(goodBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取更多热门商品
     * @param req
     * @return
     */
    private String doGetMoreHot(HttpServletRequest req) {
        String sql = "select goods.*,min_sort.name minsort,middle_sort.name middlesort,big_sort.name bigsort " +
                "from goods,min_sort,middle_sort,big_sort " +
                "where goods.sort=min_sort.id " +
                "and min_sort.middle=middle_sort.id " +
                "and middle_sort.big=big_sort.id " +
                "order by goods.views desc limit 20";
        List<GoodBean> goodBeans = SqlHelper.doListQuery(sql,null,GoodBean.class);
        if (null != goodBeans) {
            JSONArray jsonArray = JSONArray.fromObject(goodBeans);
            return jsonArray.toString();
        } else {
            return "";
        }
    }

    /**
     * 获取美妆俱乐部数据
     * @param req
     * @return
     */
    private String doGetClubs(HttpServletRequest req) {
        //获取全部记录
        String sql_clubs = "select clubs.*,user.name from clubs,user where clubs.user=user.id order by clubs.id desc";
        List<ClubBean> clubBeans = SqlHelper.doListQuery(sql_clubs,null,ClubBean.class);
        if (null != clubBeans) {
            //创建回复列表
            for (ClubBean clubBean:clubBeans) {
                clubBean.setClubRevBeans(new ArrayList<ClubRevBean>());
            }
            //获取全部回复
            String sql_rev = "select clubs_rev.*,user.name from clubs_rev,user where clubs_rev.user=user.id order by clubs_rev.id desc";
            List<ClubRevBean> clubRevBeans = SqlHelper.doListQuery(sql_rev,null,ClubRevBean.class);
            if (null != clubRevBeans) {
                //遍历添加到回复列表内
                for (ClubRevBean clubRevBean:clubRevBeans) {
                    for (ClubBean clubBean:clubBeans) {
                        if (clubBean.getId() == clubRevBean.getClub()) {
                            clubBean.getClubRevBeans().add(clubRevBean);
                        }
                    }
                }
                JSONArray jsonArray = JSONArray.fromObject(clubBeans);
                return jsonArray.toString();
            } else {
                return "";
            }
        } else {
            return "";
        }
    }

    /**
     * 添加美妆俱乐部内容
     * @param req
     * @return
     */
    private Boolean doAddClubs(HttpServletRequest req) {
        String sql = "insert into clubs(detail,user,time) values(?,?,?)";
        String[] p = {
                req.getParameter("detail"),
                req.getParameter("user"),
                req.getParameter("time")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 点赞
     * @param req
     * @return
     */
    private Boolean doLikeClubs(HttpServletRequest req) {
        String sql = "update clubs set likes=likes+1 where id=?";
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
     * 回复
     * @param req
     * @return
     */
    private Boolean doRevClubs(HttpServletRequest req) {
        String sql = "insert into clubs_rev(detail,user,club,time) values(?,?,?,?)";
        String[] p = {
                req.getParameter("detail"),
                req.getParameter("user"),
                req.getParameter("club"),
                req.getParameter("time")
        };
        int result = SqlHelper.doUpdate(sql,p);
        if (result>0) {
            return true;
        } else {
            return false;
        }
    }
}
