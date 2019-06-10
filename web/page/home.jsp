<%--
  Created by IntelliJ IDEA.
  User: 林汉青
  Date: 2019/4/14
  Time: 0:42
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <title>美妆购物网站</title>
    <link rel="stylesheet" href="../css/libs/bootstrap.css">
    <link rel="stylesheet" href="../css/libs/bootstrap-table.css">
    <link rel="stylesheet" href="../css/best-editor.css">
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--蒙板--%>
<div class="BaseHomeOverlay" style="display: none;" id="home_over"></div>
<%--最顶部导航栏--%>
<div id="home_top" class="BaseHomeTop">
    <ul>
        <li class="fl"><a href="#">欢迎来到美妆购物网站&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
        <li class="fl" id="home_top_home"><a href="#">首页</a></li>
        <li class="fl" id="home_top_sign_up"><a href="#home_top">注册</a></li>
        <li class="fl" id="home_top_sign_line">|</li>
        <li class="fl" id="home_top_login"><a href="#home_top">登录</a></li>
        <li class="fl" id="home_top_user"><a href="#" id="home_top_user_name"></a></li>
        <li class="fl" id="home_top_logout"><a href="#">退出登录</a></li>
        <li class="fr" id="home_top_admin"><a href="#home_top">管理中心</a></li>
        <li class="fr" id="home_top_club"><a href="#">美妆俱乐部&nbsp;<span class="glyphicon glyphicon-comment"></span>&nbsp;&nbsp;</a></li>
        <li class="fr" id="home_top_my">
            <a href="#">我的美妆&nbsp;<span class="glyphicon glyphicon glyphicon-heart"></span>&nbsp;&nbsp;</a>
        </li>
    </ul>
</div>
<div class="cf"></div>
<%--搜索框导航栏--%>
<div class="BaseHomeSearch">
    <ul>
        <%--logo--%>
        <li style="width: 20%;"><img src="../image/logo.png"></li>
        <%--搜索框--%>
        <li style="width: 60%;">
            <div class="BaseHomeSearchBody">
                <input id="home_top_key" placeholder="发现美妆" type="text">
                <button id="home_top_btn_search">搜索</button>
            </div>
        </li>
        <%--购物车--%>
        <li style="width: 20%;">
            <div class="BaseHomeSearchCar" id="home_top_car">
                <img src="../image/购物袋.png">
                购物袋
            </div>
        </li>
    </ul>
</div>
<div class="cf"></div>
<%--首页主体区域--%>
<div class="BaseMain">
    <%--左侧导航与右侧轮播--%>
    <div class="BaseMainBanner">
        <div class="BaseMainBannerLeft">
            <div class="BaseMainBannerLeftMenuTop" id="home_base_left_menu_top">全部商品分类</div>
            <div class="BaseMainBannerLeftMenuBody" id="home_base_left_menu">
                <div class="BaseMainBannerLeftMenuBodyItem" id="home_base_left_menu_hot">
                    热门
                    <div id="home_base_left_menu_hot_list"></div>
                </div>
            </div>
        </div>
        <div class="BaseMainBannerRight">
            <%--顶部推荐内容--%>
            <div class="BaseMainBannerRightMenuTop">
                <ul id="home_base_home_top_list">
                    <li><a id="home_base_home_top_hot" href="#">畅销榜单</a></li>
                </ul>
            </div>
            <%--分类详情--%>
            <div id="home_base_home_top_body" class="BaseMainBannerRightMenuBody">
                <input id="home_base_home_top_body_top_id" type="hidden">
                <div id="home_base_home_top_body_top_name" class="BaseMainBannerRightMenuBodyTop">
                    热门
                </div>
                <div class="BaseMainBannerRightMenuBodyTopLine"></div>
                <div id="home_base_home_top_body_top_list" class="BaseMainBannerRightMenuBodyMain row"></div>
            </div>
            <%--轮播中心--%>
            <div id="home_base_home_topBanner" class="carousel slide" data-ride="carousel">
                <!-- 轮播（Carousel）指标 -->
                <ol class="carousel-indicators">
                    <li data-target="#home_base_home_topBanner" data-slide-to="0" class="active"></li>
                    <li data-target="#home_base_home_topBanner" data-slide-to="1"></li>
                    <li data-target="#home_base_home_topBanner" data-slide-to="2"></li>
                    <li data-target="#home_base_home_topBanner" data-slide-to="3"></li>
                </ol>
                <!-- 轮播（Carousel）项目 -->
                <div class="carousel-inner">
                    <div class="item active" id="home_base_home_topBanner_one">
                        <img src="../image/ban1.jpg">
                    </div>
                    <div class="item" id="home_base_home_topBanner_two">
                        <img src="../image/ban2.jpg">
                    </div>
                    <div class="item" id="home_base_home_topBanner_three">
                        <img src="../image/ban3.jpg">
                    </div>
                    <div class="item" id="home_base_home_topBanner_four">
                        <img src="../image/ban4.jpg">
                    </div>
                </div>
                <!-- 轮播（Carousel）导航 -->
                <a class="left carousel-control" href="#home_base_home_topBanner" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#home_base_home_topBanner" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
            <%--三个广告位--%>
            <div id="home_base_home_top_ad" class="BaseMainBannerRightAD">
                <div class="BaseMainBannerRightADItem" id="home_base_home_top_ad_one">
                    <img src="../image/ad1.jpg">
                </div>
                <div class="BaseMainBannerRightADItem" id="home_base_home_top_ad_two">
                    <img src="../image/ad2.jpg">
                </div>
                <div class="BaseMainBannerRightADItem" id="home_base_home_top_ad_three">
                    <img src="../image/ad3.jpg">
                </div>
            </div>
        </div>
    </div>
    <%--分类栏的内容--%>
    <div id="home_sort" class="BaseMainHome">
        <h4 class="HomeSortTop"><span class="glyphicon glyphicon-align-justify"></span>&nbsp;当前类目：<span id="home_sort_current"></span></h4>
        <div id="home_sort_list" style="width: 100%;padding: 0px;margin: 0px;font-size: 0px;"></div>
    </div>
    <%--搜索结果--%>
    <div id="home_search" class="BaseMainHome">
        <div id="home_search_list" style="width: 100%;padding: 0px;margin: 0px;font-size: 0px;"></div>
    </div>
    <%--热销榜单--%>
    <div id="home_hot" class="BaseMainHome">
        <h4 class="HomeSortTop"><span class="glyphicon glyphicon-king"></span>&nbsp;热销榜单</h4>
        <div id="home_hot_list" style="width: 100%;padding: 0px;margin: 0px;font-size: 0px;"></div>
    </div>
    <%--购物袋--%>
    <div id="home_car" class="BaseMainHome">
        <div id="home_base_car_list"></div>
        <div id="home_base_car_tool" class="HomeBaseCarBottom">
            <button id='home_base_car_btn'>去结算</button>
            <h3>合计：<span id='home_base_car_all'>0</span></h3>
        </div>
        <div class="cf"></div>
    </div>
    <%--我的美妆--%>
    <div id="home_my" class="BaseMainHome" style="padding: 30px;">
        <table id="home_base_user_order_table" class="table"></table>
    </div>
    <%--美妆俱乐部--%>
    <div id="home_club" class="BaseMainHome" style="padding: 30px;">
        <%--吐槽框--%>
        <button class="btn btn-info" id="home_club_open"><span id="home_club_open_icon" class="glyphicon glyphicon-menu-right"></span></button>
        <div class="ClubTop" id="home_club_top_edit_lay">
            <div id="home_club_top_edit" class="ClubTopEdit"></div>
            <%--<textarea id="home_club_top_edit" rows="6" placeholder="记录更多美妆精彩..."></textarea>--%>
            <div class="ClubTopBtnTool">
                <button id="home_club_top_biu" class="btn btn-info ClubTopBtn">Biu一下&nbsp;<span class="glyphicon glyphicon-thumbs-up"></span></button>
            </div>
        </div>
        <div class="ClubList" id="home_club_list">
            <%--<div class="ClubItem">--%>
                <%--<div class="ClubInfo">--%>
                    <%--<h3>黄胜利</h3>--%>
                    <%--<h4>发表于：2019-4-15</h4>--%>
                    <%--<button class="btn btn-info"><span class="glyphicon glyphicon-thumbs-up"></span>&nbsp;赞&nbsp;<span>1000</span></button>--%>
                <%--</div>--%>
                <%--&lt;%&ndash;分享详情&ndash;%&gt;--%>
                <%--<div class="ClubInfoDetail">--%>
                    <%--<h4>我的泪我的泪西湖的水，我的泪</h4>--%>
                <%--</div>--%>
                <%--&lt;%&ndash;回复&ndash;%&gt;--%>
                <%--<div class="ClubInfoRever">--%>
                    <%--&lt;%&ndash;回复框&ndash;%&gt;--%>
                    <%--<div class="ClubInfoReverTop">--%>
                        <%--<textarea rows="3" placeholder="在这里回复..."></textarea>--%>
                        <%--<button class="btn btn-info">回复</button>--%>
                    <%--</div>--%>
                    <%--&lt;%&ndash;回复列表&ndash;%&gt;--%>
                    <%--<div class="ClubInfoReverList">--%>
                        <%--<div class="ClubInfoReverItem">--%>
                            <%--<h5>黄胜利</h5>--%>
                            <%--<h6>2019-3-24</h6>--%>
                            <%--<p>真好啊！真棒！真好啊！真棒！真好啊！真棒！真好啊！真棒！真好啊！真棒！真好啊！真棒！真好啊！真棒！真好啊！真棒！真好啊！真棒真</p>--%>
                        <%--</div>--%>
                    <%--</div>--%>
                <%--</div>--%>
            <%--</div>--%>
        </div>
    </div>
    <%--商品详情页面--%>
    <div id="home_detail" class="BaseMainHome">
        <div class="HomeBaseDetail">
            <input type="hidden" id="home_base_detail_id">
            <div class="HomeBaseDetailTop">
                <div class="HomeBaseDetailTopImg">
                    <img id="home_base_detail_img">
                </div>
                <div class="HomeBaseDetailTopInfo">
                    <h1 id="home_base_detail_title"></h1>
                    <h3 id="home_base_detail_brand" class="HomeBaseDetailTopInfoBrand"></h3>
                    <h5 id="home_base_detail_info"></h5>
                    <h2 id="home_base_detail_price">￥</h2>
                    <div class="HomeBaseDetailTopInfoNum">
                        <h3>数量：</h3>
                        <input type="number" value="1" id="home_base_detail_num">
                    </div>
                    <div class="cf" style="margin-bottom: 20px;"></div>
                    <button id="home_base_detail_btn_car" class="btn btn-info">加入购物车</button>
                </div>
            </div>
            <div class="cf"></div>
            <div class="HomeBaseDetailMain" id="home_base_detail_imgs">
                <%--填充图片--%>
            </div>
        </div>
        <div class="cf"></div>
    </div>
</div>
<%--管理员登录框架--%>
<div class="BaseHomeLoginBg" id="home_admin_login">
    <div class="BaseHomeLoginBgTop">
        <div style="float: left">
            <h3 style="margin-bottom: 10px;font-weight: bold;">
                🧐&nbsp;管理中心登录
            </h3>
        </div>
        <span id="home_admin_login_close" style="color: #fff !important;" class="close glyphicon glyphicon-remove"></span>
    </div>
    <div class="cf"></div>
    <div style="padding:30px;text-align: center;">
        <input type="text" id="home_admin_login_name" placeholder="账号" class="form-control">
        <input type="password" id="home_admin_login_pwd" placeholder="密码" class="form-control">
        <button id="home_admin_login_btn_login">立即登录</button>
    </div>
</div>
<%--登录框架--%>
<div class="BaseHomeLoginBg" id="home_login">
    <div class="BaseHomeLoginBgTop">
        <div style="float: left">
            <h3 style="margin-bottom: 10px;font-weight: bold;">
                登录美妆购物网站
            </h3>
            <h4>还没有账号？&nbsp;<a id="home_login_to_sign_up">注册</a></h4>
        </div>
        <span id="home_login_close" class="close glyphicon glyphicon-remove"></span>
    </div>
    <div class="cf"></div>
    <div style="padding:30px;text-align: center;">
        <input type="text" id="home_login_phone" placeholder="手机" class="form-control">
        <input type="password" id="home_login_pwd" placeholder="密码" class="form-control">
        <button id="home_login_btn_login">立即登录</button>
    </div>
</div>
<%--注册框架--%>
<div class="BaseHomeLoginBg" id="home_sign_up">
    <div class="BaseHomeLoginBgTop">
        <div style="float: left">
            <h3 style="margin-bottom: 10px;font-weight: bold;">
                注册美妆购物网站
            </h3>
            <h4>已有账号？&nbsp;<a id="home_sign_up_to_login">立即登录</a></h4>
        </div>
        <span id="home_sign_up_close" class="close glyphicon glyphicon-remove"></span>
    </div>
    <div class="cf"></div>
    <div style="padding:30px;text-align: center;">
        <input type="text" id="home_sign_up_name" placeholder="姓名" class="form-control">
        <input type="text" id="home_sign_up_phone" placeholder="手机" class="form-control">
        <input type="password" id="home_sign_up_pwd" placeholder="密码" class="form-control">
        <button id="home_sign_up_btn_do">立即注册</button>
    </div>
</div>
<%--确认订单对话框--%>
<div id='home_base_car_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_base_car_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_base_car_dialog_label' class='modal-title'>订单确认</h4>
            </div>
            <div class='modal-body'>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">购物清单</label>
                        <div class="col-sm-10" id="home_base_car_dialog_list"></div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">价格合计</label>
                        <div class="col-sm-10">
                            <h3 class="modal-title" style="vertical-align: middle;color: red;" id="home_base_car_dialog_all"></h3>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_base_car_dialog_add" type="button" class="btn btn-info">确认订单</button>
            </div>
        </div>
    </div>
</div>
<%--取消订单--%>
<div id='home_close_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='home_close_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='home_close_dialog_label' class='modal-title'>取消订单</h4>
            </div>
            <div class='modal-body'>
                <input type="hidden" id="home_close_dialog_id">
                <h4>确认要取消吗？不可恢复哦？</h4>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="home_close_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/libs/best-editor.js"></script>
<script src="../js/home.js"></script>
</body>
</html>
