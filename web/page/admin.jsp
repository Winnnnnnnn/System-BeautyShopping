<%--
  Created by IntelliJ IDEA.
  User: 林汉青
  Date: 2019/4/14
  Time: 11:50
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
    <link rel="stylesheet" href="../css/base.css">
</head>
<body>
<%--最顶部导航栏--%>
<div id="home_top" class="BaseHomeTop">
    <ul>
        <li class="fl"><a href="#">欢迎来到美妆购物网站后台管理中心&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a></li>
        <li class="fr"><a href="/home">回到首页</a></li>
    </ul>
</div>
<div class="cf"></div>
<%--导航栏--%>
<div class="BaseHomeSearch">
    <ul>
        <%--logo--%>
        <li style="width: 20%;"><img src="../image/logo.png"></li>
        <%--导航栏--%>
        <li style="width: 60%;text-align: center;height: 60px;line-height: 60px;vertical-align: middle;">
            <div class="AdminTopBar" id="admin_nav_goods">商品管理</div>
            <div class="AdminTopBar" id="admin_nav_sort">分类管理</div>
            <div class="AdminTopBar" id="admin_nav_order">订单管理</div>
            <div class="AdminTopBar" id="admin_nav_user">用户管理</div>
            <div class="AdminTopBar" id="admin_nav_club">俱乐部管理</div>
        </li>
        <li data-toggle="modal" data-target="#admin_goods_dialog" id="admin_nav_add" style="width: 20%;display: none;">
            <div class="AdminTopBarAdd">
                添加新商品
            </div>
        </li>
            <li data-toggle="modal" data-target="#admin_sort_dialog" id="admin_nav_sort_add" style="width: 20%;display: none;">
                <div class="AdminTopBarAdd">
                    添加新分类
                </div>
            </li>
    </ul>
</div>
<div class="cf"></div>
<%--主体区域--%>
<div class="AdminMain">
    <%--商品管理--%>
    <div id="admin_goods" class="AdminMainItem">
        <table id="admin_goods_table" class="table"></table>
    </div>
    <%--分类管理--%>
    <div id="admin_sort" class="AdminMainItem">
        <table id="admin_sort_table" class="table"></table>
    </div>
    <%--订单管理--%>
    <div id="admin_order" class="AdminMainItem">
        <table id="admin_order_table" class="table"></table>
    </div>
    <%--用户管理--%>
    <div id="admin_user" class="AdminMainItem">
        <table id="admin_user_table" class="table"></table>
    </div>
    <%--俱乐部管理--%>
    <div id="admin_club" class="AdminMainItem">
        <table id="admin_club_table" class="table"></table>
    </div>
</div>
<%--商品管理对话框--%>
<div id='admin_goods_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_goods_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_goods_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_goods_dialog_id'/>
                <div class='form-horizontal' id='admin_goods_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">名称</label>
                        <div class="col-sm-10">
                            <input id="admin_goods_dialog_title" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">描述</label>
                        <div class="col-sm-10">
                            <textarea id="admin_goods_dialog_detail" class="form-control" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">品牌</label>
                        <div class="col-sm-10">
                            <input id="admin_goods_dialog_brand" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">售价</label>
                        <div class="col-sm-10">
                            <input id="admin_goods_dialog_price" type="number" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">类别</label>
                        <div class="col-sm-10 row">
                            <div class="col-sm-4">
                                <select class="form-control" id="admin_goods_dialog_sort_one"></select>
                            </div>
                            <div class="col-sm-4">
                                <select class="form-control" id="admin_goods_dialog_sort_two"></select>
                            </div>
                            <div class="col-sm-4">
                                <select class="form-control" id="admin_goods_dialog_sort_three"></select>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">封面</label>
                        <div class="col-sm-10">
                            <img id="admin_goods_dialog_cover" src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                            <form id="admin_goods_dialog_cover_form" enctype="multipart/form-data" style="display: none;">
                                <input id="admin_goods_dialog_cover_file" name="file" type="file" accept="image/gif, image/png, image/jpg, image/jpeg">
                            </form>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">图片</label>
                        <div class="col-sm-10">
                            <img id="admin_goods_dialog_img_add" src="../image/添加.png" style="max-width:30px;max-height:30px;">
                            <div class="row" id="admin_goods_dialog_img_list">
                                <div class="col-sm-3" style="margin-top: 20px;text-align: center;">
                                    <img src="../image/图片.png" style="max-width:100%;max-height:80px;border-radius: 6px;">
                                    <form enctype="multipart/form-data" style="display: none;">
                                        <input name="file" type="file" accept="image/gif, image/png, image/jpg, image/jpeg">
                                    </form>
                                    <span style="color: red;margin-top: 10px;" class="glyphicon glyphicon-remove"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='admin_goods_dialog_warn'>
                    <h4>😞&nbsp;删除将不可恢复!</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_goods_dialog_btn_add" type="button" class="btn btn-info">添加</button>
                <button id="admin_goods_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="admin_goods_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--预览图片--%>
<div id='admin_goods_img_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_goods_img_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_goods_img_dialog_label' class='modal-title'>图片预览</h4>
            </div>
            <div class='modal-body'>
                <div style="width: 100%;" id="admin_goods_img_dialog_list"></div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
            </div>
        </div>
    </div>
</div>
<%--分类管理对话框--%>
<div id='admin_sort_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_sort_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_sort_dialog_label' class='modal-title'></h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_sort_dialog_id'/>
                <div class='form-horizontal' id='admin_sort_dialog_body'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">一级分类</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="admin_sort_dialog_sort_one"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">二级分类</label>
                        <div class="col-sm-10">
                            <select class="form-control" id="admin_sort_dialog_sort_two"></select>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">三级分类</label>
                        <div class="col-sm-10">
                            <input id="admin_sort_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
                <div id='admin_sort_dialog_warn'>
                    <h4>😞&nbsp;删除将不可恢复!</h4>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_sort_dialog_btn_add" type="button" class="btn btn-info">添加</button>
                <button id="admin_sort_dialog_btn_edit" type="button" class="btn btn-info">编辑</button>
                <button id="admin_sort_dialog_btn_del" type="button" class="btn btn-danger">删除</button>
            </div>
        </div>
    </div>
</div>
<%--用户管理对话框--%>
<div id='admin_user_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_user_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_user_dialog_label' class='modal-title'>修改用户信息</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_user_dialog_id'/>
                <div class='form-horizontal'>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">手机</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_phone" type="text" class="form-control" disabled/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">姓名</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_name" type="text" class="form-control"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">密码</label>
                        <div class="col-sm-10">
                            <input id="admin_user_dialog_pwd" type="text" class="form-control"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_user_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<%--俱乐部管理对话框--%>
<div id='admin_club_dialog' class='modal fade' tabindex='-1' role='dialog' aria-labelledby='admin_club_dialog_label' aria-hidden='true' style="z-index: 9999;" data-backdrop="static" data-keyboard="false">
    <div class='modal-dialog'>
        <div class='modal-content'>
            <div class='modal-header'>
                <button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>
                <h4 id='admin_club_dialog_label' class='modal-title'>删除俱乐部数据</h4>
            </div>
            <div class='modal-body'>
                <input type='hidden' id='admin_club_dialog_id'/>
                <h4>😞&nbsp;删除将不可恢复!</h4>
            </div>
            <div class='modal-footer'>
                <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                <button id="admin_club_dialog_ok" type="button" class="btn btn-info">确认</button>
            </div>
        </div>
    </div>
</div>
<script src="../js/libs/jquery-3.3.1.js"></script>
<script src="../js/libs/bootstrap.js"></script>
<script src="../js/libs/bootstrap-table.js"></script>
<script src="../js/libs/locale/bootstrap-table-zh-CN.js"></script>
<script src="../js/utils/table.js"></script>
<script src="../js/utils/base64.js"></script>
<script src="../js/admin.js"></script>
</body>
</html>
