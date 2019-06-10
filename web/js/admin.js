var sort = new Array();
//图片数量
var img_count = 0;
var img_data = null;
//编辑商品时候的操作逻辑
var del_img_index = new Array();
var edit_img_index = new Array();
var edit_img_data = new Array();
var data_imgs = null;
var cover_img = null;


/**
 * 页面启动
 */
$(function () {
    initNav();
});

/**
 * 初始化导航栏
 */
function initNav() {
    var menu = getUrlParam('menu');
    if (menu == null) {
        $('#admin_nav_goods').css('background','#000');
        $('#admin_nav_goods').css('color','#fff');
        initGoods();
    } else {
        switch (menu) {
            case 'goods':
                $('#admin_nav_goods').css('background','#000');
                $('#admin_nav_goods').css('color','#fff');
                initGoods();
                break;
            case 'sort':
                $('#admin_nav_sort').css('background','#000');
                $('#admin_nav_sort').css('color','#fff');
                initSort();
                break;
            case 'order':
                $('#admin_nav_order').css('background','#000');
                $('#admin_nav_order').css('color','#fff');
                initOrder();
                break;
            case 'user':
                $('#admin_nav_user').css('background','#000');
                $('#admin_nav_user').css('color','#fff');
                initUser();
                break;
            case 'club':
                $('#admin_nav_club').css('background','#000');
                $('#admin_nav_club').css('color','#fff');
                initClub();
                break;
        }
    }
    $('#admin_nav_goods').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + "&menu=goods";
    });
    $('#admin_nav_sort').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + "&menu=sort";
    });
    $('#admin_nav_order').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + "&menu=order";
    });
    $('#admin_nav_user').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + "&menu=user";
    });
    $('#admin_nav_club').click(function () {
        window.location = '/admin?name=' + getUrlParam('name') + "&menu=club";
    });
}

/**
 * 初始化商品管理
 */
function initGoods() {
    $('#admin_goods').show();
    $('#admin_nav_add').show();
    initGoodsTable(1);
}

/**
 * 初始化商品信息表
 */
function initGoodsTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_GOODS'},
        id:'#admin_goods_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'title',
            title: '名称',
            align: 'center'
        },{
            field: 'brand',
            title: '品牌',
            align: 'center'
        }, {
            field: 'detail',
            title: '描述',
            align: 'center',
            width: '300px'
        }, {
            field: 'sort',
            title: '分类',
            align: 'center',
            formatter: function (value, row, index) {
                return row.bigsort + '-' + row.middlesort + '-' + row.minsort;
            }
        }, {
            field: 'cover',
            title: '封面',
            align: 'center',
            formatter: function (value, row, index) {
                return "<img src='/files/" + value + "' style='height: 80px;width: 80px;'>"
            }
        }, {
            field: 'img',
            title: '图片',
            align: 'center',
            width: '50px',
            formatter: function (value, row, index) {
                return "<a onclick='ViewGoodImg(\"" + value + "\")' data-toggle=\"modal\" data-target=\"#admin_goods_img_dialog\" href='#'>查看</a>";
            }
        }, {
            field: 'price',
            title: '价格',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            width: '200px',
            formatter: function (value, row, index) {
                var goods = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_goods_dialog\" onclick='editGoods(\"" + goods + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_goods_dialog\" onclick='delGoods(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 浏览商品图片
 * @param img
 * @constructor
 */
function ViewGoodImg(img) {
    $('#admin_goods_img_dialog_list').empty();
    var data = img.split(',');
    $.each(data,function () {
        var tmp = " <img src=\"/files/" + this + "\" style=\"width: 100%;\">";
        $('#admin_goods_img_dialog_list').append(tmp);
    });
}

/**
 * 初始化商品管理对话框
 */
function initGoodsDialog() {
    $('#admin_goods_dialog_body').hide();
    $('#admin_goods_dialog_warn').hide();
    $('#admin_goods_dialog_btn_add').hide();
    $('#admin_goods_dialog_btn_edit').hide();
    $('#admin_goods_dialog_btn_del').hide();
}

/**
 * 绑定添加商品按钮
 */
$('#admin_nav_add').click(function () {
    initGoodsDialog();
    $('#admin_goods_dialog_body').show();
    $('#admin_goods_dialog_btn_add').show();
    $('#admin_goods_dialog_label').html('添加商品');
    sort = new Array();
    initGoodsSort();
    $('#admin_goods_dialog_title').val('');
    $('#admin_goods_dialog_detail').val('');
    $('#admin_goods_dialog_brand').val('');
    $('#admin_goods_dialog_price').val('');
    $('#admin_goods_dialog_cover_file').val('');
    $("#admin_goods_dialog_cover").attr("src", '../image/图片.png');
    $('#admin_goods_dialog_img_list').empty();
    img_count = 0;
    img_data = new Array();
});

/**
 * 绑定添加商品按钮
 */
$('#admin_goods_dialog_btn_add').click(function () {
    //获取数据
    var title = $('#admin_goods_dialog_title').val();
    var detail = $('#admin_goods_dialog_detail').val();
    var brand = $('#admin_goods_dialog_brand').val();
    var price = $('#admin_goods_dialog_price').val();
    var sort = $('#admin_goods_dialog_sort_three').val();
    var cover = $('#admin_goods_dialog_cover_file').val();
    var img = '';
    //数据校验
    if ('' == title) {
        alert('请输入名称!');
        return;
    }
    if ('' == detail) {
        alert('请输入描述!')
        return;
    }
    if ('' == brand) {
        alert('请输入品牌!');
        return;
    }
    if ('' == price) {
        alert('请输入价格!');
        return;
    }
    if (null == sort || '三级分类' == sort) {
        alert('请选择类别!');
        return;
    }
    if ('' == cover) {
        alert('请选择封面!');
        return;
    }
    if (null == img_data || img_data.length<=0) {
        alert('请添加图片!');
        return;
    }
    var param = {
        action:'ACTION_ADMIN_ADD_GOODS',
        title:title,
        detail:getFormatCode(detail),
        brand:brand,
        price:price,
        sort:sort
    };
    //上传封面图片
    $.ajax({
        url: '/file',
        type: 'post',
        cache: false,
        data: new FormData($('#admin_goods_dialog_cover_form')[0]),
        processData: false,
        contentType: false,
        dataType: "json",
        complete: function (res) {
            var cover_filename = res.responseText;
            param.cover = cover_filename;
            //遍历上传图片
            var count = 0;
            $.each(img_data,function () {
                $.ajax({
                    url: '/file',
                    type: 'post',
                    cache: false,
                    data: new FormData($('#' + this)[0]),
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    async:false,
                    complete: function (res) {
                        //上传次数统计
                        count++;
                        var img_filename = res.responseText;
                        img += img_filename + ',';
                        if (count == img_count) {
                            img = img.substr(0,img.length-1);
                            param.img = img;
                            //提交数据到后台
                            $.ajax({
                                type: 'post',
                                url: '/admin',
                                dataType: "json",
                                data: param,
                                success: function (res) {
                                    if (res) {
                                        alert('添加成功!');
                                        //更新列表
                                        initGoodsTable(1);
                                        $('#admin_goods_dialog').modal('hide');
                                    } else {
                                        alert('添加失败!');
                                    }
                                },
                                error: function () {
                                    alert('服务器异常，添加失败!');
                                }
                            });
                        }
                    }
                });
            });
        }
    });
});

/**
 * 编辑商品
 * @param data
 */
function editGoods(data) {
    initGoodsDialog();
    $('#admin_goods_dialog_body').show();
    $('#admin_goods_dialog_btn_edit').show();
    $('#admin_goods_dialog_label').html('编辑商品');
    sort = new Array();
    initGoodsSort();
    var goods = JSON.parse(unescape(data));
    $('#admin_goods_dialog_title').val(goods.title);
    $('#admin_goods_dialog_detail').val(setFormatCode(goods.detail));
    $('#admin_goods_dialog_brand').val(goods.brand);
    $('#admin_goods_dialog_price').val(goods.price);
    $('#admin_goods_dialog_cover_file').val('');
    $("#admin_goods_dialog_cover").attr("src", '/files/' + goods.cover);
    cover_img = goods.cover;
    $('#admin_goods_dialog_img_list').empty();
    $('#admin_goods_dialog_id').val(goods.id);
    img_count = 0;
    img_data = new Array();
    //处理三级分类
    $('#admin_goods_dialog_sort_one').show();
    $('#admin_goods_dialog_sort_two').show();
    $('#admin_goods_dialog_sort_three').show();
    //获取一级元素
    var select = document.getElementById("admin_goods_dialog_sort_one");
    //选中一级为指定分类
    for(var i=0; i<select.options.length; i++){
        if(select.options[i].text == goods.bigsort){
            select.options[i].selected = true;
            break;
        }
    }
    //监听一级菜单的选择
    $('#admin_goods_dialog_sort_one').change(function () {
        if ($(this).children('option:selected').val() == '一级分类') {
            $('#admin_goods_dialog_sort_two').empty();
            $('#admin_goods_dialog_sort_two').append('<option>二级分类</option>');
            $('#admin_goods_dialog_sort_two').hide();
            $('#admin_goods_dialog_sort_three').empty();
            $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
            $('#admin_goods_dialog_sort_three').hide();
        } else {
            $('#admin_goods_dialog_sort_two').empty();
            $('#admin_goods_dialog_sort_two').append('<option>二级分类</option>');
            $('#admin_goods_dialog_sort_two').show();
            $('#admin_goods_dialog_sort_three').empty();
            $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
            $('#admin_goods_dialog_sort_three').hide();
            var data_middle = sort[$(this).children('option:selected').val()].middle;
            //遍历二级
            $.each(data_middle,function (i,obj) {
                var middle ="<option value='" + i + "'>" + obj.name + "</option>";
                $('#admin_goods_dialog_sort_two').append(middle);
            });
            //监听二级菜单选择
            $('#admin_goods_dialog_sort_two').change(function () {
                if ($(this).children('option:selected').val() == '二级分类') {
                    $('#admin_goods_dialog_sort_three').empty();
                    $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
                    $('#admin_goods_dialog_sort_three').hide();
                } else {
                    $('#admin_goods_dialog_sort_three').empty();
                    $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
                    $('#admin_goods_dialog_sort_three').show();
                }
                //遍历三级
                $.each(data_middle[$(this).children('option:selected').val()].min,function (i,obj) {
                    var min ="<option value='" + obj.id + "'>" + obj.name + "</option>";
                    $('#admin_goods_dialog_sort_three').append(min);
                });
            });
        }
    });
    //获取二级分类数据
    var data_middle = sort[$('#admin_goods_dialog_sort_one').children('option:selected').val()].middle;
    //遍历二级分类数据
    $.each(data_middle,function (i,obj) {
        var middle ="<option value='" + i + "'>" + obj.name + "</option>";
        $('#admin_goods_dialog_sort_two').append(middle);
    });
    //获取二级元素
    var middle_select = document.getElementById("admin_goods_dialog_sort_two");
    //选中二级为指定元素
    for(var i=0; i<middle_select.options.length; i++){
        if(middle_select.options[i].text == goods.middlesort){
            middle_select.options[i].selected = true;
            break;
        }
    }
    //监听二级分类选择
    $('#admin_goods_dialog_sort_two').change(function () {
        if ($(this).children('option:selected').val() == '二级分类') {
            $('#admin_goods_dialog_sort_three').empty();
            $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
            $('#admin_goods_dialog_sort_three').hide();
        } else {
            $('#admin_goods_dialog_sort_three').empty();
            $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
            $('#admin_goods_dialog_sort_three').show();
        }
        //遍历三级
        $.each(data_middle[$(this).children('option:selected').val()].min,function (i,obj) {
            var min ="<option value='" + obj.id + "'>" + obj.name + "</option>";
            $('#admin_goods_dialog_sort_three').append(min);
        });
    });
    //获取三级分类数据
    var data_min = data_middle[$('#admin_goods_dialog_sort_two').children('option:selected').val()].min;
    //遍历三级分类数据
    $.each(data_min,function (i,obj) {
        var min ="<option value='" + obj.id + "'>" + obj.name + "</option>";
        $('#admin_goods_dialog_sort_three').append(min);
    });
    //获取三级元素
    var min_select = document.getElementById("admin_goods_dialog_sort_three");
    //选中三级为指定元素
    for(var i=0; i<min_select.options.length; i++){
        if(min_select.options[i].text == goods.minsort){
            min_select.options[i].selected = true;
            break;
        }
    }
    //清空编辑图片数据
    del_img_index = new Array();
    edit_img_index = new Array();
    edit_img_data = new Array();
    //图片的处理
    data_imgs = goods.img.split(',');
    $.each(data_imgs,function (i,data) {
        var count = img_count;
        var item = "<div id='admin_goods_dialog_img_list_item_" + img_count + "' class=\"col-sm-3\" style=\"margin-top: 20px;text-align: center;\">\n" +
            "                                    <img id='admin_goods_dialog_img_list_item_img_" + count + "' src=\"/files/" + data + "\" style=\"width:100%;height:80px;border-radius: 6px;\">\n" +
            "                                    <form id='admin_goods_dialog_img_list_item_img_form_" + count + "' enctype=\"multipart/form-data\" style=\"display: none;\">\n" +
            "                                        <input id='admin_goods_dialog_img_list_item_img_file_" + count + "' name=\"file\" type=\"file\" accept=\"image/gif, image/png, image/jpg, image/jpeg\">\n" +
            "                                    </form>\n" +
            "                                    <span id='admin_goods_dialog_img_list_item_close_" + img_count + "' style=\"color: red;margin-top: 10px;\" class=\"glyphicon glyphicon-remove\"></span>\n" +
            "                                </div>";
        $('#admin_goods_dialog_img_list').append(item);
        //绑定移除按钮
        $('#admin_goods_dialog_img_list_item_close_' + count).click(function () {
            $('#admin_goods_dialog_img_list_item_' + count).remove();
            //从待上传队列中移除
            if (edit_img_data.indexOf('admin_goods_dialog_img_list_item_img_form_' + count) != -1) {
                edit_img_data.splice(edit_img_data.indexOf('admin_goods_dialog_img_list_item_img_form_' + count),1);
            }
            //添加到需要修改名称的队列中
            if (edit_img_index.indexOf(i) != -1) {
                edit_img_index.splice(edit_img_index.indexOf(i),1);
            }
            //添加到需要删除的队列中
            if (del_img_index.indexOf(i) == -1) {
                del_img_index.push(i);
                del_img_index.sort();
            }
        });
        /**
         * 绑定图片选择
         */
        $('#admin_goods_dialog_img_list_item_img_' + count).click(function () {
            $('#admin_goods_dialog_img_list_item_img_file_' + count).click();
        });
        /**
         * 绑定图片文件选择结果
         */
        $('#admin_goods_dialog_img_list_item_img_file_' + count).on('change',function () {
            if (this.files[0]) {
                var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
                if (objUrl) {
                    $("#admin_goods_dialog_img_list_item_img_" + count).attr("src", objUrl); //将图片路径存入src中，显示出图片
                    //添加到待上传队列
                    if (edit_img_data.indexOf('admin_goods_dialog_img_list_item_img_form_' + count) == -1) {
                        edit_img_data.push('admin_goods_dialog_img_list_item_img_form_' + count);
                        //重新排序
                        edit_img_data = edit_img_data.sort();
                    }
                    //添加到需要修改名称的队列中
                    if (edit_img_index.indexOf(i) == -1) {
                        edit_img_index.push(i);
                        edit_img_index.sort();
                    }
                }
            }
        });
        img_count++;
    });
}

/**
 * 删除商品
 * @param id
 */
function delGoods(id) {
    initGoodsDialog();
    $('#admin_goods_dialog_warn').show();
    $('#admin_goods_dialog_btn_del').show();
    $('#admin_goods_dialog_label').html('删除商品');
    $('#admin_goods_dialog_id').val(id);
}

/**
 * 绑定删除商品按钮
 */
$('#admin_goods_dialog_btn_del').click(function () {
    var id = $('#admin_goods_dialog_id').val();
    var param = {
        action:'ACTION_ADMIN_DEL_GOODS',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //更新列表
                initGoodsTable($('#admin_goods_table').bootstrapTable('getOptions').pageNumber);
                $('#admin_goods_dialog').modal('hide');
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 绑定修改商品按钮
 */
$('#admin_goods_dialog_btn_edit').click(function () {
    console.log('需要修改的名称'+edit_img_index);
    console.log('需要删除的名称'+del_img_index);
    console.log('需要修改的图片'+edit_img_data);
    console.log('需要追加的图片'+img_data);
    console.log('当前图片列表'+data_imgs);
    //获取数据
    var title = $('#admin_goods_dialog_title').val();
    var detail = $('#admin_goods_dialog_detail').val();
    var brand = $('#admin_goods_dialog_brand').val();
    var price = $('#admin_goods_dialog_price').val();
    var sort = $('#admin_goods_dialog_sort_three').val();
    var cover = $('#admin_goods_dialog_cover_file').val();
    var img = '';
    var id = $('#admin_goods_dialog_id').val();
    //数据校验
    if ('' == title) {
        alert('请输入名称!');
        return;
    }
    if ('' == detail) {
        alert('请输入描述!')
        return;
    }
    if ('' == brand) {
        alert('请输入品牌!');
        return;
    }
    if ('' == price) {
        alert('请输入价格!');
        return;
    }
    if (null == sort || '三级分类' == sort) {
        alert('请选择类别!');
        return;
    }
    //数据封装
    var param = {
        action:'ACTION_ADMIN_EDIT_GOODS',
        title:title,
        detail:getFormatCode(detail),
        brand:brand,
        price:price,
        sort:sort,
        id:id
    };
    //判断图片是否有做修改
    if (edit_img_index.length>0) {
        //遍历修改图片
        $.each(edit_img_index,function (i,index) {
            $.ajax({
                url: '/file',
                type: 'post',
                cache: false,
                data: new FormData($('#' + edit_img_data[i])[0]),
                processData: false,
                contentType: false,
                dataType: "json",
                async: false,
                complete: function (res) {
                    data_imgs[index] = res.responseText;
                }
            });
        });
    }
    //判断图片是否有做删除
    if (del_img_index.length>0) {
        $.each(del_img_index,function () {
            data_imgs.splice(this,1);
        });
    }
    //判断是否有添加新图片
    if (img_data.length>0) {
        //遍历追加图片
        $.each(img_data,function () {
            $.ajax({
                url: '/file',
                type: 'post',
                cache: false,
                data: new FormData($('#' + this)[0]),
                processData: false,
                contentType: false,
                dataType: "json",
                async: false,
                complete: function (res) {
                    data_imgs.push(res.responseText);
                }
            });
        });
    }
    console.log('处理后的图片结果' + data_imgs);
    $.each(data_imgs,function () {
       img += this+',';
    });
    img = img.substr(0,img.length-1);
    param.img = img;
    //判断是否需要上传封面
    if ('' == cover) {
        //不需要上传封面图片
        param.cover = cover_img;
    } else {
        //上传封面图片
        $.ajax({
            url: '/file',
            type: 'post',
            cache: false,
            async: false,
            data: new FormData($('#admin_goods_dialog_cover_form')[0]),
            processData: false,
            contentType: false,
            dataType: "json",
            complete: function (res) {
                var cover_filename = res.responseText;
                param.cover = cover_filename;
            }
        });
    }
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('修改成功!');
                //更新列表
                initGoodsTable($('#admin_goods_table').bootstrapTable('getOptions').pageNumber);
                $('#admin_goods_dialog').modal('hide');
            } else {
                alert('修改失败!');
            }
        },
        error: function () {
            alert('服务器异常，修改失败!');
        }
    });
});

/**
 * 绑定添加图片
 */
$('#admin_goods_dialog_img_add').click(function () {
    var count = img_count;
    var item = "<div id='admin_goods_dialog_img_list_item_" + img_count + "' class=\"col-sm-3\" style=\"margin-top: 20px;text-align: center;\">\n" +
        "                                    <img id='admin_goods_dialog_img_list_item_img_" + count + "' src=\"../image/图片.png\" style=\"width:100%;height:80px;border-radius: 6px;\">\n" +
        "                                    <form id='admin_goods_dialog_img_list_item_img_form_" + count + "' enctype=\"multipart/form-data\" style=\"display: none;\">\n" +
        "                                        <input id='admin_goods_dialog_img_list_item_img_file_" + count + "' name=\"file\" type=\"file\" accept=\"image/gif, image/png, image/jpg, image/jpeg\">\n" +
        "                                    </form>\n" +
        "                                    <span id='admin_goods_dialog_img_list_item_close_" + img_count + "' style=\"color: red;margin-top: 10px;\" class=\"glyphicon glyphicon-remove\"></span>\n" +
        "                                </div>";
    $('#admin_goods_dialog_img_list').append(item);
    //绑定移除按钮
    $('#admin_goods_dialog_img_list_item_close_' + count).click(function () {
        $('#admin_goods_dialog_img_list_item_' + count).remove();
        if (img_data.indexOf('admin_goods_dialog_img_list_item_img_form_' + count) != -1) {
            img_data.splice(img_data.indexOf('admin_goods_dialog_img_list_item_img_form_' + count),1);
        }
    });
    /**
     * 绑定图片选择
     */
    $('#admin_goods_dialog_img_list_item_img_' + count).click(function () {
        $('#admin_goods_dialog_img_list_item_img_file_' + count).click();
    });
    /**
     * 绑定图片文件选择结果
     */
    $('#admin_goods_dialog_img_list_item_img_file_' + count).on('change',function () {
        if (this.files[0]) {
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#admin_goods_dialog_img_list_item_img_" + count).attr("src", objUrl); //将图片路径存入src中，显示出图片
                //添加到待上传队列
                if (img_data.indexOf('admin_goods_dialog_img_list_item_img_form_' + count) == -1) {
                    img_data.push('admin_goods_dialog_img_list_item_img_form_' + count);
                    //重新排序
                    img_data = img_data.sort();
                }
            }
        }
    });
    img_count++;
});

/**
 * 绑定封面图片选择
 */
$('#admin_goods_dialog_cover').click(function () {
    $('#admin_goods_dialog_cover_file').click();
});

/**
 * 绑定图片文件选择结果
 */
$('#admin_goods_dialog_cover_file').on('change',function () {
    if (this.files[0]) {
        var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
        if (objUrl) {
            $("#admin_goods_dialog_cover").attr("src", objUrl); //将图片路径存入src中，显示出图片
        }
    }
});

/**
 * 初始化商品管理分类
 */
function initGoodsSort() {
    $('#admin_goods_dialog_sort_one').empty();
    $('#admin_goods_dialog_sort_one').append('<option>一级分类</option>');
    $('#admin_goods_dialog_sort_two').empty();
    $('#admin_goods_dialog_sort_two').append('<option>二级分类</option>');
    $('#admin_goods_dialog_sort_two').hide();
    $('#admin_goods_dialog_sort_three').empty();
    $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
    $('#admin_goods_dialog_sort_three').hide();
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
            //遍历添加分级
            $.each(sort,function (i,obj) {
                //一级分类
                var big="<option value='" + i + "'>" + obj.name + "</option>";
                $('#admin_goods_dialog_sort_one').append(big);
                //监听一级菜单的选择
                $('#admin_goods_dialog_sort_one').change(function () {
                    if ($(this).children('option:selected').val() == '一级分类') {
                        $('#admin_goods_dialog_sort_two').empty();
                        $('#admin_goods_dialog_sort_two').append('<option>二级分类</option>');
                        $('#admin_goods_dialog_sort_two').hide();
                        $('#admin_goods_dialog_sort_three').empty();
                        $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
                        $('#admin_goods_dialog_sort_three').hide();
                    } else {
                        $('#admin_goods_dialog_sort_two').empty();
                        $('#admin_goods_dialog_sort_two').append('<option>二级分类</option>');
                        $('#admin_goods_dialog_sort_two').show();
                        $('#admin_goods_dialog_sort_three').empty();
                        $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
                        $('#admin_goods_dialog_sort_three').hide();
                        var data_middle = sort[$(this).children('option:selected').val()].middle;
                        //遍历二级
                        $.each(data_middle,function (i,obj) {
                            var middle ="<option value='" + i + "'>" + obj.name + "</option>";
                            $('#admin_goods_dialog_sort_two').append(middle);
                        });
                        //监听二级菜单选择
                        $('#admin_goods_dialog_sort_two').change(function () {
                            if ($(this).children('option:selected').val() == '二级分类') {
                                $('#admin_goods_dialog_sort_three').empty();
                                $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
                                $('#admin_goods_dialog_sort_three').hide();
                            } else {
                                $('#admin_goods_dialog_sort_three').empty();
                                $('#admin_goods_dialog_sort_three').append('<option>三级分类</option>');
                                $('#admin_goods_dialog_sort_three').show();
                            }
                            //遍历三级
                            $.each(data_middle[$(this).children('option:selected').val()].min,function (i,obj) {
                                var min ="<option value='" + obj.id + "'>" + obj.name + "</option>";
                                $('#admin_goods_dialog_sort_three').append(min);
                            });
                        });
                    }
                });
            });
        },
        error: function () {
            alert('获取分类数据失败!');
            $('#admin_goods_dialog').modal('hide');
        }
    });
}

/**
 * 初始化俱乐部管理
 */
function initClub() {
    $('#admin_club').show();
    initClubTable(1);
}

/**
 * 初始化俱乐部信息表
 * @param pageNumber
 */
function initClubTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/home',
        data:{action:'ACTION_HOME_GET_CLUBS'},
        id:'#admin_club_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'detail',
            title: '详情',
            align: 'center',
            width: '500px'
        }, {
            field: 'name',
            title: '发布人',
            align: 'center'
        }, {
            field: 'time',
            title: '发布时间',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                return "<button data-toggle=\"modal\" data-target=\"#admin_club_dialog\" class='btn btn-info' onclick='delClub(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 删除俱乐部数据
 * @param id
 */
function delClub(id) {
    $('#admin_club_dialog_id').val(id);
}

/**
 * 绑定删除俱乐部按钮
 */
$('#admin_club_dialog_ok').click(function () {
    var id = $('#admin_club_dialog_id').val();
    var data = {
        action:'ACTION_ADMIN_DEL_CLUBS',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                $('#admin_club_dialog').modal('hide');
                initClubTable($('#admin_club_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('删除失败!');
            }
        },
        error:function() {
            alert('删除失败!');
        }
    });
});

/**
 * 初始化用户管理
 */
function initUser() {
    $('#admin_user').show();
    initUserTable(1);
}

/**
 * 初始化用户信息表
 * @param pageNumber
 */
function initUserTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_USER'},
        id:'#admin_user_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'phone',
            title: '手机号',
            align: 'center'
        }, {
            field: 'name',
            title: '姓名',
            align: 'center'
        }, {
            field: 'id',
            title: '操作',
            align: 'center',
            formatter: function (value, row, index) {
                var user = escape(JSON.stringify(row));
                return "<button onclick='editUser(\"" + user + "\")' data-toggle=\"modal\" data-target=\"#admin_user_dialog\" class='btn btn-info'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 修改用户信息
 * @param data
 */
function editUser(data) {
    var user = JSON.parse(unescape(data));
    $('#admin_user_dialog_id').val(user.id);
    $('#admin_user_dialog_phone').val(user.phone);
    $('#admin_user_dialog_name').val(user.name);
    $('#admin_user_dialog_pwd').val(new Base64().decode(user.pwd));
}

/**
 * 绑定修改用户信息按钮
 */
$('#admin_user_dialog_ok').click(function () {
    var id = $('#admin_user_dialog_id').val();
    var name = $('#admin_user_dialog_name').val();
    var pwd = $('#admin_user_dialog_pwd').val();
    if ('' == name || '' == pwd) {
        alert('数据无效!');
    } else {
        var data = {
            action:'ACTION_ADMIN_EDIT_USER',
            id:id,
            name:name,
            pwd:pwd
        };
        $.ajax({
            type: 'post',
            url: '/admin',
            dataType: "json",
            data: data,
            success: function (res) {
                if (res) {
                    alert('修改成功!');
                    $('#admin_user_dialog').modal('hide');
                    initUserTable($('#admin_user_table').bootstrapTable('getOptions').pageNumber);
                } else {
                    alert('修改失败!');
                }
            },
            error:function() {
                alert('修改失败!');
            }
        });
    }
});

/**
 * 初始化订单管理
 */
function initOrder() {
    $('#admin_order').show();
    initOrderTable(1);
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
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_ORDER'},
        id:'#admin_order_table',
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
                    return "<button class='btn btn-info' onclick='okOrder(\"" + value + "\")'><span class='glyphicon glyphicon-ok'></span>&nbsp;发货</button>";
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
 * 发货处理
 * @param id
 */
function okOrder(id) {
    var data = {
        action:'ACTION_ADMIN_DEL_ORDER',
        id:id
    };
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: data,
        success: function (res) {
            if (res) {
                alert('发货成功!');
                initOrderTable($('#admin_order_table').bootstrapTable('getOptions').pageNumber);
            } else {
                alert('发货失败!');
            }
        },
        error:function() {
            alert('发货失败!');
        }
    });
}

/**
 * 初始化分类管理
 */
function initSort() {
    $('#admin_nav_sort_add').show();
    $('#admin_sort').show();
    initSortTable(1);
}

/**
 * 初始化分类信息表
 */
function initSortTable(pageNumber) {
    //初始化表格
    var table = new TableInit();
    //配置表格参数
    var parm = {
        url:'/admin',
        data:{action:'ACTION_ADMIN_GET_SORT'},
        id:'#admin_sort_table',
        toolbar:'',
        pageNumber:pageNumber,
        search:true,
        export:false,
        columns:[{
            field: 'bigname',
            title: '一级分类',
            align: 'center'
        },{
            field: 'middlename',
            title: '二级分类',
            align: 'center'
        },{
            field: 'name',
            title: '三级分类',
            align: 'center'
        },{
            field: 'id',
            title: '操作',
            align: 'center',
            width: '200px',
            formatter: function (value, row, index) {
                var sort = escape(JSON.stringify(row));
                return "<div class='btn-group'><button class='btn btn-info' data-toggle=\"modal\" data-target=\"#admin_sort_dialog\" onclick='editSort(\"" + sort + "\")'><span class='glyphicon glyphicon-edit'></span>&nbsp;编辑</button><button class='btn btn-danger' data-toggle=\"modal\" data-target=\"#admin_sort_dialog\" onclick='delSort(\"" + value + "\")'><span class='glyphicon glyphicon-remove'></span>&nbsp;删除</button></div>";
            }
        }]
    };
    //创建表格
    table.Init(parm);
}

/**
 * 初始化分类管理对话框
 */
function initSortDialog() {
    $('#admin_sort_dialog_body').hide();
    $('#admin_sort_dialog_warn').hide();
    $('#admin_sort_dialog_btn_add').hide();
    $('#admin_sort_dialog_btn_edit').hide();
    $('#admin_sort_dialog_btn_del').hide();
}

/**
 * 绑定添加新分类
 */
$('#admin_nav_sort_add').click(function () {
    initSortDialog();
    $('#admin_sort_dialog_body').show();
    $('#admin_sort_dialog_btn_add').show();
    $('#admin_sort_dialog_label').html('添加分类');
    sort = new Array();
    initSortSelect();
});

/**
 * 绑定添加分类
 */
$('#admin_sort_dialog_btn_add').click(function () {
    var one = $('#admin_sort_dialog_sort_one').val();
    var two = $('#admin_sort_dialog_sort_two').val();
    var name = $('#admin_sort_dialog_name').val();
    if ('' == one || '一级分类' == one) {
        alert('请选择一级分类!');
        return;
    }
    if ('' == two || '二级分类' == two) {
        alert('请选择二级分类!');
        return;
    }
    if ('' == name) {
        alert('请输入三级分类!');
        return;
    }
    //数据封装
    var param = {
        action:'ACTION_ADMIN_ADD_SORT',
        name:name,
        middle:two
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('添加成功!');
                //更新列表
                initSortTable(1);
                $('#admin_sort_dialog').modal('hide');
            } else {
                alert('添加失败!');
            }
        },
        error: function () {
            alert('服务器异常，添加失败!');
        }
    });
});

/**
 * 编辑分类
 * @param data
 */
function editSort(data) {
    var sort_data = JSON.parse(unescape(data));
    initSortDialog();
    $('#admin_sort_dialog_body').show();
    $('#admin_sort_dialog_btn_edit').show();
    $('#admin_sort_dialog_label').html('修改分类');
    $('#admin_sort_dialog_id').val(sort_data.id);
    sort = new Array();
    initSortSelect();
    $('#admin_sort_dialog_name').val(sort_data.name);
    //获取一级元素
    var select = document.getElementById("admin_sort_dialog_sort_one");
    //选中一级为指定分类
    for(var i=0; i<select.options.length; i++){
        if(select.options[i].text == sort_data.bigname){
            select.options[i].selected = true;
            break;
        }
    }
    //获取二级分类数据
    var data_middle = sort[$('#admin_sort_dialog_sort_one').children('option:selected').val()].middle;
    //遍历二级分类数据
    $.each(data_middle,function (i,obj) {
        var middle ="<option value='" + obj.id + "'>" + obj.name + "</option>";
        $('#admin_sort_dialog_sort_two').append(middle);
    });
    //获取二级元素
    var middle_select = document.getElementById("admin_sort_dialog_sort_two");
    //选中二级为指定元素
    for(var i=0; i<middle_select.options.length; i++){
        if(middle_select.options[i].text == sort_data.middlename){
            middle_select.options[i].selected = true;
            break;
        }
    }
}

/**
 * 绑定修改分类按钮
 */
$('#admin_sort_dialog_btn_edit').click(function () {
    var id = $('#admin_sort_dialog_id').val();
    var one = $('#admin_sort_dialog_sort_one').val();
    var two = $('#admin_sort_dialog_sort_two').val();
    var name = $('#admin_sort_dialog_name').val();
    if ('' == one || '一级分类' == one) {
        alert('请选择一级分类!');
        return;
    }
    if ('' == two || '二级分类' == two) {
        alert('请选择二级分类!');
        return;
    }
    if ('' == name) {
        alert('请输入三级分类!');
        return;
    }
    //数据封装
    var param = {
        action:'ACTION_ADMIN_EDIT_SORT',
        name:name,
        middle:two,
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('修改成功!');
                //更新列表
                initSortTable($('#admin_sort_table').bootstrapTable('getOptions').pageNumber);
                $('#admin_sort_dialog').modal('hide');
            } else {
                alert('修改失败!');
            }
        },
        error: function () {
            alert('服务器异常，修改失败!');
        }
    });
});

/**
 * 删除分类
 * @param id
 */
function delSort(id) {
    initSortDialog();
    $('#admin_sort_dialog_warn').show();
    $('#admin_sort_dialog_btn_del').show();
    $('#admin_sort_dialog_label').html('删除分类');
    $('#admin_sort_dialog_id').val(id);
}

/**
 * 绑定删除分类按钮
 */
$('#admin_sort_dialog_btn_del').click(function () {
    var id = $('#admin_sort_dialog_id').val();
    //数据封装
    var param = {
        action:'ACTION_ADMIN_DEL_SORT',
        id:id
    };
    //提交数据到后台
    $.ajax({
        type: 'post',
        url: '/admin',
        dataType: "json",
        data: param,
        success: function (res) {
            if (res) {
                alert('删除成功!');
                //更新列表
                initSortTable($('#admin_sort_table').bootstrapTable('getOptions').pageNumber);
                $('#admin_sort_dialog').modal('hide');
            } else {
                alert('删除失败!');
            }
        },
        error: function () {
            alert('服务器异常，删除失败!');
        }
    });
});

/**
 * 初始化分类管理分类选择器
 */
function initSortSelect() {
    $('#admin_sort_dialog_sort_one').empty();
    $('#admin_sort_dialog_sort_one').append('<option>一级分类</option>');
    $('#admin_sort_dialog_sort_two').empty();
    $('#admin_sort_dialog_sort_two').append('<option>二级分类</option>');
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
            //遍历添加分级
            $.each(sort,function (i,obj) {
                //一级分类
                var big="<option value='" + i + "'>" + obj.name + "</option>";
                $('#admin_sort_dialog_sort_one').append(big);
                //监听一级菜单的选择
                $('#admin_sort_dialog_sort_one').change(function () {
                    if ($(this).children('option:selected').val() == '一级分类') {
                        $('#admin_sort_dialog_sort_two').empty();
                        $('#admin_sort_dialog_sort_two').append('<option>二级分类</option>');
                    } else {
                        $('#admin_sort_dialog_sort_two').empty();
                        $('#admin_sort_dialog_sort_two').append('<option>二级分类</option>');
                        var data_middle = sort[$(this).children('option:selected').val()].middle;
                        //遍历二级
                        $.each(data_middle,function (i,obj) {
                            var middle ="<option value='" + obj.id + "'>" + obj.name + "</option>";
                            $('#admin_sort_dialog_sort_two').append(middle);
                        });
                    }
                });
            });
        },
        error: function () {
            alert('获取分类数据失败!');
            $('#admin_sort_dialog').modal('hide');
        }
    });
}

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
 * 获取图片的url
 * @param file
 * @returns {*}
 */
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) {
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) {
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) {
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
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