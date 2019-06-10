//分类数据
var sort = new Array();
//购物车数据
var car_data = null;
var buy_list = null;
//富文本编辑器
var bestEdtitor = new BestEditor('#home_club_top_edit', {
    toolbar: ['bold','italic','underline','strikethrough','link','unorderlist','orderlist','h1','h2','h3','h4','alignLeft','alignCenter','alignRight','undo','redo','full']
});

/**
 * 启动入口
 */
$(function () {
    initSort();
    initNav();
    initAd();
});

/**
 * 广告位的配置
 */
function initAd() {
    //轮播广告配置
    $('#home_base_home_topBanner_one').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=63&sortdetail=彩妆-脸部彩妆-脸部彩妆";
    });
    $('#home_base_home_topBanner_two').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=45&sortdetail=护肤-面膜-水洗面膜";
    });
    $('#home_base_home_topBanner_three').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=95&sortdetail=香水-女士-淡香";
    });
    $('#home_base_home_topBanner_four').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=47&sortdetail=护肤-面膜-片状面膜";
    });
    //底部三个广告位配置
    $('#home_base_home_top_ad_one').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=4&sortdetail=功效-美白-提亮肤色";
    });
    $('#home_base_home_top_ad_two').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=40&sortdetail=护肤-面部护理-BB/CC霜";
    });
    $('#home_base_home_top_ad_three').click(function () {
        window.location = "/home?menu=sort&id=" + getUrlParam("id") + "&name=" + getUrlParam('name') + "&sort=96&sortdetail=香水-女士-浓香";
    });
}

/**
 * 初始化导航栏
 */
function initNav() {
    //判断用户是否登录
    var id = getUrlParam('id');
    if (id == null || id == 'null' || id == '') {
        $('#home_top_user_name').hide();
        $('#home_top_logout').hide();
    } else {
        $('#home_top_sign_up').hide();
        $('#home_top_sign_line').hide();
        $('#home_top_login').hide();
        $('#home_top_user_name').html(getUrlParam('name'));
        $('#home_top_logout').click(function () {
            window.location = '/home?menu=home' + "&key=" + getUrlParam('key') + "&detail=" + getUrlParam("detail") + "&sortdetail=" + getUrlParam('sortdetail') + "&sort=" + getUrlParam('sort');
        });
    }
    var menu = getUrlParam( "menu");
    if (menu == null || menu =='null' || menu == '') {
        //首页
    } else {
        switch (menu) {
            case 'sort':
                //初始化类目详情页面
                initSortPage();
                break;
            case 'detail':
                //初始化商品详情页面
                initDetailPage();
                break;
            case 'car':
                //初始化购物车
                initCarPage();
                break;
            case 'search':
                //初始化搜索页
                initSearchPage();
                break;
            case 'my':
                initMy();
                break;
            case 'hot':
                initHot();
                break;
            case 'club':
                initClub();
                break;
        }
    }
}

/**
 * 首页绑定
 */
$('#home_top_home').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user || '' == user) {
        //用户未登录
        window.location = '/home?menu=home&id=&name=';
    } else {
        window.location = '/home?menu=home&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
    }
});

/**
 * 搜索按钮绑定
 */
$('#home_top_btn_search').click(function () {
    var key = $('#home_top_key').val();
    window.location = '/home?menu=search&id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + "&key=" + key;
});

/**
 * 初始化搜索页
 */
function initSearchPage() {
    othetSort();
    $('#home_top_key').val(getUrlParam('key'));
    //获取搜索结果
    var data = {
        action:'ACTION_HOME_SEARCH',
        key:getUrlParam("key")
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (null == res || res.length<=0) {
                var item = "<div class=\"HomeBaseItemNo\">\n" +
                    "                😭&nbsp;这里再也没有您要的内容!\n" +
                    "            </div>";
                $('#home_search_list').append(item);
            } else {
                $.each(res,function (i,obj) {
                    var item = "<div onclick='openDetail(\"" + obj.id + "\")' class=\"HomeBaseItem\">\n" +
                        "                <img src=\"/files/" + obj.cover + "\">\n" +
                        "                <h5 class=\"HomeBaseItemBrand\">" + obj.brand + "</h5>\n" +
                        "                <h5>" + obj.title + "</h5>\n" +
                        "                <h5>￥" + obj.price + "</h5>\n" +
                        "            </div>";
                    $('#home_search_list').append(item);
                });
            }
        },
        error: function () {
            var item = "<div class=\"HomeBaseItemNo\">\n" +
                "                😭&nbsp;这里再也没有您要的内容!\n" +
                "            </div>";
            $('#home_search_list').append(item);
        }
    });
    $('#home_search').show();
}

/**
 * 绑定我的美妆
 */
$('#home_top_my').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user || '' == user) {
        //用户未登录
        $('#home_top_login').click();
    } else {
        window.location = '/home?menu=my&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
    }
});

/**
 * 初始化我的美妆
 */
function initMy() {
    othetSort();
    initOrderTable(1);
    $('#home_my').show();
}

/**
 * 初始化订单信息表
 * @param pageNumber
 */
function initOrderTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home',
        data:{action:'ACTION_HOME_GET_ORDER',userid:getUrlParam("id")},
        id:'#home_base_user_order_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'id',
            title: '订单号',
            align: 'center'
        }, {
            field: 'list',
            title: '清单',
            align: 'center',
            width: '200px',
            formatter: function (value, row, index) {
                var list = JSON.parse(value);
                var res = '';
                $.each(list,function (i,obj) {
                    res += obj.title + "×" + obj.count + "&nbsp;&nbsp;￥" + parseFloat(obj.price) *  parseFloat(obj.count) + "<br/>"
                });
                return res;
            }
        }, {
            field: 'total',
            title: '总价',
            align: 'center'
        }, {
            field: 'time',
            title: '时间',
            align: 'center'
        }, {
            field: 'state',
            title: '状态',
            align: 'center',
            formatter: function (value, row, index) {
                switch (value) {
                    case 0:
                        return "待发货";
                    case 1:
                        return "已取消";
                    case 2:
                        return "已发货";
                }
            }
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                if (row.state == 0) {
                    return "<button class='btn btn-info' data-toggle=\"modal\" data-target=\"#home_close_dialog\" onclick='delOrder(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;取消订单</button>";
                } else {
                    return "不可操作";
                }
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 取消订单
 * @param id
 */
function delOrder(id) {
    $('#home_close_dialog_id').val(id);
}

/**
 * 绑定取消订单
 */
$('#home_close_dialog_ok').click(function () {
    var id = $('#home_close_dialog_id').val();
    var data = {
        action:'ACTION_HOME_DEL_ORDER',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('取消成功!');
                $('#home_close_dialog').modal('hide');
                initOrderTable($('#home_base_user_order_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('取消失败!');
            }
        },
        error:function() {
            alert('取消失败!');
        }
    });
});

/**
 * 绑定登录按钮
 */
$('#home_top_login').click(function () {
    $('#home_over').show();
    $('#home_login').show();
    $(document.body).css('overflow','hidden');
});

/**
 * 绑定关闭登录框按钮
 */
$('#home_login_close').click(function () {
    $('#home_login').hide();
    $('#home_over').hide();
    $(document.body).css('overflow','auto');
});

/**
 * 绑定注册按钮
 */
$('#home_top_sign_up').click(function () {
    $('#home_over').show();
    $('#home_sign_up').show();
    $(document.body).css('overflow','hidden');
});

/**
 * 绑定关闭注册框按钮
 */
$('#home_sign_up_close').click(function () {
    $('#home_sign_up').hide();
    $('#home_over').hide();
    $(document.body).css('overflow','auto');
});

/**
 * 进入注册
 */
$('#home_login_to_sign_up').click(function () {
    $('#home_login_close').click();
    $('#home_top_sign_up').click();
});

/**
 * 进入登录
 */
$('#home_sign_up_to_login').click(function () {
    $('#home_sign_up_close').click();
    $('#home_top_login').click();
});

/**
 * 绑定立即登录按钮
 */
$('#home_login_btn_login').click(function () {
    //获取数据
    var phone = $('#home_login_phone').val();
    var pwd = $('#home_login_pwd').val();
    if ('' == phone) {
        alert('请输入手机号!');
        return;
    }
    if ('' == pwd) {
        alert('请输入密码!');
        return;
    }
    if (!isPoneAvailable(phone)) {
        alert('手机号格式错误!');
        return;
    }
    //封装数据
    var data = {
        action:'ACTION_HOME_LOGIN',
        phone: phone,
        pwd: pwd
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            window.location = '/home?menu=' + getUrlParam('menu') + '&id=' + res.id + '&name=' + res.name + "&key=" + getUrlParam('key') + "&detail=" + getUrlParam("detail") + "&sortdetail=" + getUrlParam('sortdetail') + "&sort=" + getUrlParam('sort');
        },
        error: function () {
            alert('手机号/密码错误!');
        }
    });
});

/**
 * 绑定立即注册按钮
 */
$('#home_sign_up_btn_do').click(function () {
    //获取数据
    var phone = $('#home_sign_up_phone').val();
    var pwd = $('#home_sign_up_pwd').val();
    var name = $('#home_sign_up_name').val();
    if ('' == name) {
        alert('请输入姓名!');
        return;
    }
    if ('' == phone) {
        alert('请输入手机号!');
        return;
    }
    if ('' == pwd) {
        alert('请输入密码!');
        return;
    }
    if (!isPoneAvailable(phone)) {
        alert('手机号格式错误!');
        return;
    }
    //封装数据
    var data = {
        action:'ACTION_HOME_SIGN_UP',
        phone: phone,
        pwd: pwd,
        name:name
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                $('#home_login_phone').val(phone);
                $('#home_login_pwd').val(pwd);
                $('#home_login_btn_login').click();
            } else {
                alert('该手机号已被注册!');
            }
        },
        error: function () {
            alert('服务器异常，注册失败!');
        }
    });
});

/**
 * 初始化购物袋
 */
function initCarPage() {
    othetSort();
    buy_list = new Array();
    //获取我的购物车
    var data = {
        action:'ACTION_HOME_GET_CAR',
        id:getUrlParam("id")
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res!=null && res.length>0) {
                $('#home_base_car_tool').show();
                car_data = res;
                $.each(res,function (i,obj) {
                    var car = "<div class=\"HomeBaseCarMain\">" +
                        "            <input id='checkbox_" + i + "' type=\"checkbox\">" +
                        "            <img src=\"/files/" + obj.img + "\">" +
                        "            <h3>" + obj.title + "</h3>" +
                        "            <h4>单价：</h4>" +
                        "            <h3 class=\"HomeBaseCarMainPrice\">" + obj.price + "</h3>" +
                        "            <h4>数量：</h4>\n" +
                        "            <input id='num_" + i + "' class=\"HomeBaseCarMainNum\" type=\"number\" value=\"" + obj.count + "\">" +
                        "            <h3 id='total_" + i + "' class=\"fr HomeBaseCarMainPrice HomeBaseCarMainMustRight\">" + parseFloat(obj.price) * parseFloat(obj.count) + "</h3>" +
                        "            <h4 class='fr HomeBaseCarMainMustRight'>合计：</h4>" +
                        "        </div>" +
                        "        <button onclick='delCar(\"" + obj.id + "\")' class='fr btn btn-info'>删除</button>"+
                        "        <div class=\"cf\"></div>";
                    $('#home_base_car_list').append(car);
                    $('#checkbox_' + i).change(function () {
                        if ($(this).get(0).checked) {
                            var pay = parseFloat(car_data[i].price) * parseFloat(car_data[i].count);
                            var all = parseFloat($('#home_base_car_all').html());
                            all = all+pay;
                            $('#home_base_car_all').html(all);
                            //加入购买列表
                            buy_list.push(i);
                            console.log(buy_list);
                        } else {
                            var pay = parseFloat(car_data[i].price) * parseFloat(car_data[i].count);
                            var all = parseFloat($('#home_base_car_all').html());
                            all = all-pay;
                            $('#home_base_car_all').html(all);
                            //移出购买列表
                            buy_list.splice(buy_list.indexOf(i),1);
                            console.log(buy_list);
                        }
                    });
                    //数量改变
                    $('#num_' + i).change(function () {
                        if ($('#checkbox_' + i).get(0).checked) {
                            $('#checkbox_' + i).click();
                            car_data[i].count = $(this).val();
                            $('#checkbox_' + i).click();
                        } else {
                            car_data[i].count = $(this).val();
                        }
                        $('#total_' + i).html(parseFloat(car_data[i].price) * parseFloat($(this).val()));
                    });
                });
            } else {
                $('#home_base_car_tool').hide();
                var car = "<div class=\"HomeBaseCarNo\">😭&nbsp;您还没有中意的商品!</div>";
                $('#home_base_car_list').append(car);
            }
        },
        error:function() {
            $('#home_base_car_tool').hide();
            var car = "<div class=\"HomeBaseCarNo\">😭&nbsp;您还没有中意的商品!</div>";
            $('#home_base_car_list').append(car);
        }
    });
    $('#home_car').show();
}

/**
 * 移除购物车
 * @param id
 */
function delCar(id) {
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: {action: 'ACTION_HOME_DEL_CAR', id: id},
        success: function (res) {
            if (res) {
                $('#home_top_car').click();
            } else {
                alert('服务器异常!');
            }
        },
        error: function () {
            alert('服务器异常!');
        }
    });
}

/**
 * 绑定购物车按钮
 */
$('#home_top_car').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user || '' == user) {
        //用户未登录
        $('#home_top_login').click();
    } else {
        window.location = '/home?menu=car&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
    }
});

/**
 * 初始化商品详情页
 */
function initDetailPage() {
    othetSort();
    //获取商品详情
    var param = {
        action:'ACTION_HOME_GET_GOODS_BY_ID',
        id:getUrlParam('detail')
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: param,
        async: false,
        success: function (res) {
            console.log(res);
            $('#home_base_detail_img').attr('src','/files/' + res.cover);
            $('#home_base_detail_info').html(res.detail);
            $('#home_base_detail_title').html(res.title);
            $('#home_base_detail_price').html('￥' + res.price);
            $('#home_base_detail_brand').html(res.brand);
            $('#home_base_detail_id').val(res.id);
            var imgs = res.img.split(',');
            $.each(imgs,function () {
               var img = "<img style='width: 100%;' src='/files/" + this + "'>" ;
               $('#home_base_detail_imgs').append(img);
            });
        },
        error: function () {
            alert('服务器出现了一点小差错!');
            window.location = '/home';
        }
    });
    $('#home_detail').show();
}

/**
 * 初始化类目详情页面
 */
function initSortPage() {
    othetSort();
    $('#home_sort_current').html(getUrlParam('sortdetail'));
    //获取分类详情数据
    var param = {
        action:'ACTION_HOME_GET_GOODS_BY_SORT',
        sort:getUrlParam('sort')
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: param,
        async: false,
        success: function (res) {
            if (null == res || res.length<=0) {
                var item = "<div class=\"HomeBaseItemNo\">\n" +
                    "                😭&nbsp;这里再也没有您要的内容!\n" +
                    "            </div>";
                $('#home_sort_list').append(item);
            } else {
                $.each(res,function (i,obj) {
                    var item = "<div onclick='openDetail(\"" + obj.id + "\")' class=\"HomeBaseItem\">\n" +
                        "                <img src=\"/files/" + obj.cover + "\">\n" +
                        "                <h5 class=\"HomeBaseItemBrand\">" + obj.brand + "</h5>\n" +
                        "                <h5>" + obj.title + "</h5>\n" +
                        "                <h5>￥" + obj.price + "</h5>\n" +
                        "            </div>";
                    $('#home_sort_list').append(item);
                });
            }
        },
        error: function () {
            var item = "<div class=\"HomeBaseItemNo\">\n" +
                "                😭&nbsp;这里再也没有您要的内容!\n" +
                "            </div>";
            $('#home_sort_list').append(item);
        }
    });
    $('#home_sort').show();
}

/**
 * 查看商品详情页
 * @param detail
 */
function openDetail(detail) {
    window.location = '/home?menu=detail&id=' + getUrlParam('id') + '&name=' + getUrlParam('name') + '&detail=' + detail;
}

/**
 * 其他页面的分类栏状态
 */
function othetSort() {
//隐藏导航栏
    $('#home_base_left_menu').hide();
    $('#home_base_home_top_body').hide();
    $('#home_base_home_topBanner').hide();
    $('#home_base_home_top_ad').hide();
    $('#home_base_left_menu_top').hover(function () {
        //全部商品分类选中
        $('#home_base_left_menu').slideDown(500);
        $('#home_base_home_topBanner').slideDown(500);
        $('#home_base_home_top_ad').slideDown(500);
        $('#home_base_home_top_body').hide();
    },function () {
        $('body').mousemove(function(e) {
            //这里可能不好理解
            e = e || window.event;
            var width = $('body').width();
            var x = e.pageX || e.clientX + document.body.scroolLeft;
            if (x<200 || x>=width-200) {
                //超出可操作范围
                $('#home_base_left_menu').hide();
                $('#home_base_home_topBanner').hide();
                $('#home_base_home_top_ad').hide();
                $('#home_base_home_top_body').hide();
            }
        });
    });
}

/**
 * 绑定管理中心按钮
 */
$('#home_top_admin').click(function () {
    $('#home_over').show();
    $('#home_admin_login').show();
});

/**
 * 绑定关闭管理员登录框
 */
$('#home_admin_login_close').click(function () {
    $('#home_over').hide();
    $('#home_admin_login').hide();
});

/**
 * 绑定管理员登录按钮
 */
$('#home_admin_login_btn_login').click(function () {
    //获取数据
    var name = $('#home_admin_login_name').val();
    var pwd = $('#home_admin_login_pwd').val();
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        var data = {
            action:'ACTION_HOME_ADMIN_LOGIN',
            name:name,
            pwd:pwd
        };
        $.ajax({
            type: 'post',
            url: '/home',
            dataType: "json",
            data: data,
            success: function (res) {
                //登录成功
                window.location = '/admin?name=' + res.name;
            },
            error: function () {
                alert('账号/密码错误!');
            }
        });
    }
});

/**
 * 初始化分类栏数据
 */
function initSort() {
    //初始化右侧详细分类栏目
    $('#home_base_home_top_body').hover(function () {
        //选中
        $('#'+$('#home_base_home_top_body_top_id').val()).css('border-right','none');
        $('#'+$('#home_base_home_top_body_top_id').val()).css('-moz-box-shadow','0px 5px 5px #ccc');
        $('#'+$('#home_base_home_top_body_top_id').val()).css('box-shadow','0px 5px 5px #ccc');
    },function () {
        //非选中
        $('#home_base_home_top_body').hide();
        $('#'+$('#home_base_home_top_body_top_id').val()).css('border-right','1px solid #f5f5f5');
        $('#'+$('#home_base_home_top_body_top_id').val()).css('-moz-box-shadow','none');
        $('#'+$('#home_base_home_top_body_top_id').val()).css('box-shadow','none');
        $('#home_base_home_topBanner').show();
        $('#home_base_home_top_ad').show();
    });
    //获取分类数据
    var param = {
        action:'ACTION_HOME_GET_SORT'
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: param,
        async:false,
        success: function (res) {
            //处理分类数据
            var bigSort = res.bigSortBeans;
            var middleSort = res.middleSortBeans;
            var minSort = res.minSortBeans;
            $.each(bigSort,function (i,obj) {
                var big = {
                    id:obj.id,
                    name:obj.name,
                    middle:new Array()
                };
                sort.push(big);
            });
            $.each(middleSort,function (i,obj) {
                var bigid = obj.big;
                var middle = {
                    id:obj.id,
                    name:obj.name,
                    min:new Array()
                };
                $.each(sort,function (i,obj) {
                    if (bigid == obj.id) {
                        sort[i].middle.push(middle);
                    }
                });
            });
            $.each(minSort,function (i,obj) {
                var bigid = obj.bigid;
                var middleid = obj.middleid;
                var min = {
                    id:obj.id,
                    name:obj.name
                };
                $.each(sort,function (i,obj) {
                    if (bigid == obj.id) {
                        var tmp = sort[i].middle;
                        $.each(sort[i].middle,function (i,obj) {
                            if (middleid == obj.id) {
                                tmp[i].min.push(min);
                            }
                        });
                    }
                });
            });
            //打印分类数据
            console.log(sort);
            $.each(sort,function (i,obj) {
                var sort_big_detail = obj.name;
                var sortdetail_one = obj.name + '-' + obj.middle[0].name + '-' + obj.middle[0].min[0].name;
                var sortdetail_two = obj.name + '-' + obj.middle[1].name + '-' + obj.middle[1].min[0].name;
                var sortItem = "<div id='home_base_left_menu_item_" + i + "' class=\"BaseMainBannerLeftMenuBodyItem\">\n" +
                    "                    " + obj.name + "\n" +
                    "                    <div>\n" +
                    "                        <a href=\"/home?menu=sort&id=" + getUrlParam('id') + "&name=" + getUrlParam('name') + "&sort=" + obj.middle[0].min[0].id + "&sortdetail=" + sortdetail_one + "\">" + obj.middle[0].min[0].name + "</a>\n" +
                    "                        <a href=\"/home?menu=sort&id=" + getUrlParam('id') + "&name=" + getUrlParam('name') + "&sort=" + obj.middle[1].min[0].id + "&sortdetail=" + sortdetail_two + "\">" + obj.middle[1].min[0].name + "</a>\n" +
                    "                    </div>\n" +
                    "                </div>";
                $('#home_base_left_menu').append(sortItem);
                $('#home_base_left_menu_item_' + i).hover(function () {
                    //选中
                    $('#home_base_left_menu_item_' + i).css('border-right','none');
                    $('#home_base_left_menu_item_' + i).css('-moz-box-shadow','0px 5px 5px #ccc');
                    $('#home_base_left_menu_item_' + i).css('box-shadow','0px 5px 5px #ccc');
                    $('#home_base_home_topBanner').hide();
                    $('#home_base_home_top_ad').hide();
                    //分类数据填充
                    $('#home_base_home_top_body_top_name').html(sort[i].name);
                    $('#home_base_home_top_body_top_list').empty();
                    //遍历中分类
                    $.each(sort[i].middle,function (i,obj) {
                        var sort_middle_detail = obj.name;
                        var middleindex = i;
                        var sortDetail = "<div class=\"BaseMainBannerRightMenuBodyMainItem col-lg-4\">\n" +
                            "                        <div>" + obj.name +"</div>\n" +
                            "                        <div id='home_base_home_top_body_top_list_item_" + i + "' class=\"BaseMainBannerRightMenuBodyMainBottom\">\n" +
                            "                        </div>\n" +
                            "                    </div>";
                        $('#home_base_home_top_body_top_list').append(sortDetail);
                        $.each(obj.min,function (i,obj) {
                            var sort_min_detail = obj.name;
                            var sort_detail = sort_big_detail + '-' + sort_middle_detail + '-' + sort_min_detail;
                            //三级分类
                            var sortDetailItem = "<a href=\"/home?menu=sort&id=" + getUrlParam('id') + "&name=" + getUrlParam('name') + "&sort=" + obj.id + "&sortdetail=" + sort_detail + "\">" + obj.name + "</a>";
                            $('#home_base_home_top_body_top_list_item_' + middleindex).append(sortDetailItem);
                        });
                    });
                    $('#home_base_home_top_body_top_id').val('home_base_left_menu_item_' + i);
                    $('#home_base_home_top_body').show();
                },function () {
                    //非选中
                    $('#home_base_left_menu_item_' + i).css('border-right','1px solid #f5f5f5');
                    $('#home_base_left_menu_item_' + i).css('-moz-box-shadow','none');
                    $('#home_base_left_menu_item_' + i).css('box-shadow','none');
                    $('body').mousemove(function(e) {
                        //这里可能不好理解
                        e = e || window.event;
                        var max = $('body').width();
                        var x = e.pageX || e.clientX + document.body.scroolLeft;
                        if (x<200 || x>=max-200) {
                            var menu = getUrlParam('menu');
                            if (menu == null || menu == 'home') {
                                //超出可操作范围
                                $('#home_base_home_top_body').hide();
                                $('#home_base_home_topBanner').show();
                                $('#home_base_home_top_ad').show();
                            }
                        }
                    });
                });
            });
        },
        error: function () {
            console.log('获取数据失败');
        }
    });
    //热门分类的监听
    $('#home_base_left_menu_hot').hover(function () {
        $('#home_base_left_menu_hot').css('border-right','none');
        $('#home_base_left_menu_hot').css('-moz-box-shadow','0px 5px 5px #ccc');
        $('#home_base_left_menu_hot').css('box-shadow','0px 5px 5px #ccc');
        $('#home_base_home_topBanner').hide();
        $('#home_base_home_top_ad').hide();
        $('#home_base_home_top_body_top_name').html('热门');
        $('#home_base_home_top_body_top_list').empty();
        $('#home_base_home_top_body_top_id').val('home_base_left_menu_hot');
        //热门数据处理
        var data = {
            action:'ACTION_HOME_GET_HOT'
        };
        $.ajax({
            type: 'post',
            url: '/home',
            dataType: "json",
            data: data,
            success: function (res) {
                $.each(res,function (i,obj) {
                    var item = "<div onclick='openDetail(\"" + obj.id + "\")' class=\"HomeBaseItem\">\n" +
                        "                <img src=\"/files/" + obj.cover + "\">\n" +
                        "                <h5 class=\"HomeBaseItemBrand\">" + obj.brand + "</h5>\n" +
                        "                <h5>" + obj.title + "</h5>\n" +
                        "                <h5>￥" + obj.price + "</h5>\n" +
                        "            </div>";
                    $('#home_base_home_top_body_top_list').append(item);
                });
                $('#home_base_home_top_body').show();
            },
            error: function () {
                console.log('获取数据失败');
            }
        });
    },function () {
        //非选中
        $('#home_base_left_menu_hot').css('border-right','1px solid #f5f5f5');
        $('#home_base_left_menu_hot').css('-moz-box-shadow','none');
        $('#home_base_left_menu_hot').css('box-shadow','none');
        $('body').mousemove(function(e) {
            //这里可能不好理解
            e = e || window.event;
            var max = $('body').width();
            var x = e.pageX || e.clientX + document.body.scroolLeft;
            if (x<200 || x>=max-200) {
                var menu = getUrlParam('menu');
                if (menu == null || menu == 'home') {
                    //超出可操作范围
                    $('#home_base_home_top_body').hide();
                    $('#home_base_home_topBanner').show();
                    $('#home_base_home_top_ad').show();
                }
            }
        });
    });
    //热门数据处理
    var data = {
        action:'ACTION_HOME_GET_HOT'
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        async:false,
        success: function (res) {
            if (null == res || res.length<=0) {
                var item_non = "<a>暂无热门数据</a>";
                $('#home_base_left_menu_hot_list').append(item_non);
            }
            if (res.length>=1) {
                var item_one = "<a href=\"/home?menu=sort&id=" + getUrlParam('id') + "&name=" + getUrlParam('name') + "&sort=" + res[0].sort + "&sortdetail=" + res[0].bigsort + '-' + res[0].middlesort + '-' + res[0].minsort + "\">" + res[0].minsort + "</a>&nbsp;";
                $('#home_base_left_menu_hot_list').append(item_one);
            }
            if (res.length>=2) {
                var item_two = "<a href=\"/home?menu=sort&id=" + getUrlParam('id') + "&name=" + getUrlParam('name') + "&sort=" + res[1].sort + "&sortdetail=" + res[1].bigsort + '-' + res[1].middlesort + '-' + res[1].minsort + "\">" + res[1].minsort + "</a>";
                $('#home_base_left_menu_hot_list').append(item_two);
            }
            if (null != res && res.length>0) {
                $.each(res,function (i,obj) {
                    var item = "<li><a href=\"/home?menu=sort&id=" + getUrlParam('id') + "&name=" + getUrlParam('name') + "&sort=" + obj.sort + "&sortdetail=" + obj.bigsort + '-' + obj.middlesort + '-' + obj.minsort + "\">" + obj.minsort + "</a></li>";
                    $('#home_base_home_top_list').append(item);
                });
            }
        },
        error: function () {
            console.log('获取数据失败');
        }
    });
}

/**
 * 绑定加入购物车按钮
 */
$('#home_base_detail_btn_car').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user || '' == user) {
        //用户未登录
        $('#home_top_login').click();
    } else {
        var id = $('#home_base_detail_id').val();
        var num = $('#home_base_detail_num').val();
        var data = {
            action:'ACTION_HOME_ADD_CAR',
            goodid:id,
            userid:user,
            count:num
        };
        $.ajax({
            type: 'post',
            url: '/home',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('加入购物车成功!');
                } else {
                    alert('加入购物车失败!');
                }
            },
            error:function() {
                alert('加入购物车失败!');
            }
        });
    }
});

/**
 * 绑定去结算按钮
 */
$('#home_base_car_btn').click(function () {
    if (buy_list != null && buy_list.length>0) {
        $('#home_base_car_dialog').modal('show');
        $('#home_base_car_dialog_list').empty();
        //配置清单
        $.each(buy_list,function () {
            var index = this;
            var item = "<h4 style=\"margin-bottom: 10px;\">" + car_data[index].title + "×" + car_data[index].count + "&nbsp;&nbsp;<span style=\"color: red;\">￥" + parseFloat(car_data[index].price) * parseFloat(car_data[index].count) + "</span></h4>";
            $('#home_base_car_dialog_list').append(item);
        });
        //配置总价
        $('#home_base_car_dialog_all').html($('#home_base_car_all').html());
    } else {
        alert('请先勾选要结算的商品!');
    }
});

/**
 * 绑定确认订单按钮
 */
$('#home_base_car_dialog_add').click(function () {
    var list = new Array();
    var car_list = '';
    $.each(buy_list,function () {
        list.push(car_data[this]);
        car_list += car_data[this].id + ',';
    });
    car_list = car_list.substr(0,car_list.length-1);
    //数据封装
    var data = {
        action:'ACTION_HOME_ADD_ORDER',
        userid:getUrlParam("id"),
        list:JSON.stringify(list),
        time:getNowFormatDate(),
        total:$('#home_base_car_dialog_all').html(),
        car_list:car_list
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('购买成功!');
                $('#home_base_car_dialog').modal('hide');
                $('#home_top_car').click();
            } else {
                alert('服务器异常，购买失败!');
            }
        },
        error: function () {
            alert('服务器异常，购买失败!');
        }
    });
});

/**
 * 绑定热销榜单
 */
$('#home_base_home_top_hot').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user || '' == user) {
        //用户未登录
        window.location = '/home?menu=hot&id=&name=';
    } else {
        window.location = '/home?menu=hot&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
    }
});

/**
 * 初始化热销榜单
 */
function initHot() {
    othetSort();
    //热门数据处理
    var data = {
        action:'ACTION_HOME_GET_HOT_MORE'
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        async: false,
        success: function (res) {
            if (null == res || res.length<=0) {
                var item = "<div class=\"HomeBaseItemNo\">\n" +
                    "                😭&nbsp;这里再也没有您要的内容!\n" +
                    "            </div>";
                $('#home_hot_list').append(item);
            } else {
                $.each(res,function (i,obj) {
                    var item = "<div onclick='openDetail(\"" + obj.id + "\")' class=\"HomeBaseItem\">\n" +
                        "                <img src=\"/files/" + obj.cover + "\">\n" +
                        "                <h5 class=\"HomeBaseItemBrand\">" + obj.brand + "</h5>\n" +
                        "                <h5>" + obj.title + "</h5>\n" +
                        "                <h5>￥" + obj.price + "</h5>\n" +
                        "            </div>";
                    $('#home_hot_list').append(item);
                });
            }
        },
        error: function () {
            var item = "<div class=\"HomeBaseItemNo\">\n" +
                "                😭&nbsp;这里再也没有您要的内容!\n" +
                "            </div>";
            $('#home_hot_list').append(item);
        }
    });
    $('#home_hot').show();
}

/**
 * 绑定美妆俱乐部
 */
$('#home_top_club').click(function () {
    var user = getUrlParam("id");
    if (user == null || 'null' == user || '' == user) {
        //用户未登录
        $('#home_top_login').click();
    } else {
        window.location = '/home?menu=club&id=' + getUrlParam('id') + '&name=' + getUrlParam('name');
    }
});

/**
 * 初始化美妆俱乐部
 */
function initClub() {
    othetSort();
    $('#home_club').show();
    //获取美妆俱乐部数据
    var data = {
        action:'ACTION_HOME_GET_CLUBS'
    };
    $.ajax({
        type: 'post',
        url: '/home',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res==null || res.length<=0) {
                var item = "<div class=\"ClubItem\" style=\"text-align: center;font-size: 20px;font-weight: bold;\">\n" +
                    "                😭&nbsp;这里还没有内容\n" +
                    "            </div>";
                $('#home_club_list').append(item);
            } else {
                $.each(res,function (i,obj) {
                    var item = "<div class=\"ClubItem\">\n" +
                        "                <div class=\"ClubInfo\">\n" +
                        "                    <h3>" + obj.name + "</h3>\n" +
                        "                    <h4>发表于：" + obj.time + "</h4>\n" +
                        "                    <button class=\"btn btn-info\" id='home_club_list_item_like_btn_" + i + "'><span class=\"glyphicon glyphicon-thumbs-up\"></span>&nbsp;赞&nbsp;<span id='home_club_list_item_like_" + i + "'>" + obj.likes + "</span></button>\n" +
                        "                </div>\n" +
                        "                <div class=\"ClubInfoDetail\">\n" +
                                            obj.detail +
                        "                </div>\n" +
                        "                <div class=\"ClubInfoRever\">\n" +
                        "                    <div class=\"ClubInfoReverTop\">\n" +
                        "                        <textarea id='home_club_list_item_rev_detail_" + i + "' rows=\"3\" placeholder=\"在这里回复...\"></textarea>\n" +
                        "                        <button id='home_club_list_item_rev_btn_" + i + "' class=\"btn btn-info\">回复</button>\n" +
                        "                    </div>\n" +
                        "                    <div id='home_club_list_item_rev_" + i + "' class=\"ClubInfoReverList\">\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>";
                    $('#home_club_list').append(item);
                    var index = i;
                    //添加已存在回复
                    $.each(obj.clubRevBeans,function (i,obj) {
                        if (obj != null) {
                            var rec = "<div class=\"ClubInfoReverItem\">\n" +
                                "                            <h5>" + obj.name + "</h5>\n" +
                                "                            <h6>" + obj.time + "</h6>\n" +
                                "                            <p>" + obj.detail + "</p>\n" +
                                "                        </div>";
                            $('#home_club_list_item_rev_' + index).append(rec);
                        }
                    });
                    //绑定点赞
                    $('#home_club_list_item_like_btn_' + index).click(function () {
                        var data = {
                            action:'ACTION_HOME_LIKE_CLUBS',
                            id:obj.id
                        };
                        $.ajax({
                            type: 'post',
                            url: '/home',
                            dataType: "json",
                            data: data,
                            success: function (res) {
                                if (res) {
                                    var now = parseInt($('#home_club_list_item_like_' + index).html());
                                    now++;
                                    $('#home_club_list_item_like_' + index).html(now);
                                } else {
                                    alert('点赞失败!');
                                }
                            },
                            error:function() {
                                alert('点赞失败!');
                            }
                        });
                    });
                    //绑定回复
                    $('#home_club_list_item_rev_btn_' + index).click(function () {
                        //获取数据
                        var detail = $('#home_club_list_item_rev_detail_' + index).val();
                        if ('' == detail) {
                            alert('请输入要回复的内容!');
                        } else {
                            var data = {
                                action:'ACTION_HOME_REV_CLUBS',
                                detail:setFormatCode(detail),
                                user:getUrlParam("id"),
                                club:obj.id,
                                time:getNowFormatDate()
                            };
                            $.ajax({
                                type: 'post',
                                url: '/home',
                                dataType: "json",
                                data: data,
                                success: function (res) {
                                    if (res) {
                                        var tmp_list = $('#home_club_list_item_rev_' + index).html();
                                        var rec = "<div class=\"ClubInfoReverItem\">\n" +
                                            "                            <h5>" + getUrlParam('name') + "</h5>\n" +
                                            "                            <h6>" + data.time + "</h6>\n" +
                                            "                            <p>" + data.detail + "</p>\n" +
                                            "                        </div>";
                                        rec += tmp_list;
                                        $('#home_club_list_item_rev_' + index).empty();
                                        $('#home_club_list_item_rev_' + index).append(rec);
                                    } else {
                                        alert('回复失败!');
                                    }
                                },
                                error:function() {
                                    alert('回复失败!');
                                }
                            });
                        }
                    });
                });
            }
        },
        error: function () {
            var item = "<div class=\"ClubItem\" style=\"text-align: center;font-size: 20px;font-weight: bold;\">\n" +
                "                😭&nbsp;这里还没有内容\n" +
                "            </div>";
            $('#home_club_list').append(item);
        }
    });
}

/**
 * 绑定biu一下按钮
 */
$('#home_club_top_biu').click(function () {
    var detail = bestEdtitor.getHTML();
    if ('<p><br></p>' == detail) {
        alert('请输入内容!');
    } else {
        var data = {
            action:'ACTION_HOME_ADD_CLUBS',
            detail:detail,
            user:getUrlParam('id'),
            time:getNowFormatDate()
        };
        $.ajax({
            type: 'post',
            url: '/home',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('创建成功!');
                    $('#home_top_club').click();
                } else {
                    alert('创建失败!');
                }
            },
            error:function() {
                alert('创建失败!');
            }
        });
    }
});

/**
 * 绑定工具栏的展开
 */
$('#home_club_open').click(function () {
    if($('#home_club_top_edit_lay').is(':hidden')){　　//如果node是隐藏的则显示node元素，否则隐藏
        $('#home_club_open_icon').removeClass('glyphicon-menu-right');
        $('#home_club_open_icon').addClass('glyphicon-chevron-up');
    }else{
        $('#home_club_open_icon').removeClass('glyphicon-chevron-up');
        $('#home_club_open_icon').addClass('glyphicon-menu-right');
    }
    $('#home_club_top_edit_lay').slideToggle(300);
});

/**
 * 获取url中的指定参数
 * @param {any} name
 */
function getUrlParam(name) {
    //构造一个含有目标参数的正则表达式对象
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //匹配目标参数
    var r = window.location.search.substr(1).match(reg);
    //返回参数值
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

/**
 * 手机号校验
 * @param pone
 * @returns {boolean}
 */
function isPoneAvailable(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
        return false;
    } else {
        return true;
    }
}

/**
 * 获取当前日期
 * @returns {string}
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

/**
 * 文本转html
 * @param strValue
 * @returns {string}
 */
function getFormatCode(strValue) {
    return strValue.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>').replace(/\s/g, '&nbsp;');
}

/**
 * html转文本
 * @param strValue
 * @returns {string}
 */
function setFormatCode(strValue) {
    return strValue.replace(/<br\/>/g, '\r\n').replace(/<br\/>/g, '\n').replace(/<br>/g, '\n').replace(/&nbsp;/g, ' ');
}