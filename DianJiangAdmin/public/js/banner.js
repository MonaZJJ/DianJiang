var navSettingList = {
    //模板
    GoodsListTemplate: `<ul class="layer_ul_1">
                        {{each CategoryList as value i}}
                            {{if CategoryList[i].Layer == "1"}}
                            <li class="layer-1">
                                <div class="contentBody">
                                    <div class="col-xs-3">{{CategoryList[i].CateId}}</div>
                                    <div class="col-xs-6">
                                        <div class="classify_one">
                                            <i class="icon-jia jia_collapse_one">
                                            {{if CategoryList[i].Haschild == "1"}}
                                            <img src="../public/images/suoqi.png" alt="">
                                            {{else if CategoryList[i].Haschild == "0"}}
                                            <img src="../public/images/zhankai.png" alt="">
                                            {{/if}}
                                            </i>
                                            <i class="iconfont icon-wenjianjia"></i>
                                            {{CategoryList[i].Name}}
                                        </div>
                                    </div>
                                    <div class="col-xs-3">
                                        <span class="pick" data-id={{CategoryList[i].CateId}} data-name="{{CategoryList[i].Name}}">选择</span>
                                    </div>
                                </div>
                                {{each CategoryList as value j}}
                                {{if CategoryList[j].ParentId == CategoryList[i].CateId}}
                                <ul class="layer_ul_2" style="display: none">
                                    <li class="layer-2">
                                        <div class="contentBody">
                                            <div class="col-xs-3">{{CategoryList[j].CateId}}</div>
                                            <div class="col-xs-6">
                                                <div class="classify_two">
                                                    <i class="icon-jia jia_collapse_two">
                                                    {{if CategoryList[j].Haschild == "1"}}
                                                    <img src="../public/images/suoqi.png" alt="">
                                                    {{else if CategoryList[j].Haschild == "0" }}
                                                    <img src="../public/images/zhankai.png" alt="">
                                                    {{/if}}
                                                    </i>
                                                    <i class="iconfont icon-wenjianjia"></i>
                                                    {{CategoryList[j].Name}}
                                                </div>
                                            </div>
                                            <div class="col-xs-3">
                                                <span class="pick" data-id={{CategoryList[j].CateId}} data-name="{{CategoryList[j].Name}}">选择</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                {{/if}}
                                {{/each}}
                            </li>
                            {{/if}}
                           {{/each}}
                        </ul>`,
    init: function () {
        //上传小图标
        uploadIconPic('#small_upload_pick', '#small_icon', '/banner/AdminUploadBannerImg');
        //初始化表格
        navSettingList.initBannerBootstrapTable();
        navSettingList.adminCategoryList();
        //选择商品模态框出现获取数据
        $('#choicePresentModal').on('shown.bs.modal', function () {
            navSettingList.initProBootstrapTable()
        });

        //商品查询
        $('body').on('click', '#prosearchBtn', function () {
            navSettingList.projectProQuery();
        })

        //类型切换的时候
        $('body').on('change', '#type', function () {
            var val = $(this).val();
            if (val == 0) {
                $('#productBox').hide();
                $('#performanceBox').hide();
            } else if (val == 1) {
                $('#productBox').show();
                $('#performanceBox').hide();
            } else if (val == 2) {
                $('#productBox').hide();
                $('#performanceBox').show();
            }
        })

        //商品模态框点击选择
        $('#choicePresentModal').on('click', '.sure_choice', function () {
            //商品名称
            var id = $(this).attr('data-id')
            var txt_name = $(this).parents('tr').find('.goods_name_modal').text();
            $('.goods-name_final').text(txt_name);
            $('.goods-name_final').show();
            $('.goods-name_final').attr('data-id', $(this).attr('data-id'))
            $('#choicePresentModal').modal('hide');
        });

        // 选择商品分类
        $("#selectClassify").on("click", function () {
            $(".mask").show();
        });

        // 关闭商品分类弹窗
        $(".mask").on("click", ".close", function () {
            $(".mask").hide();
        });

        // 选择分类
        $(".mask").on("click", ".pick", function () {
            var id = $(this).attr("data-id");
            var name = $(this).attr("data-name");
            $("#classifyName").attr("data-id", id);
            $("#classifyName").text(name);
            $(".mask").hide();
        });

        //排序更改
        $('body').on('change', '.order-disp', function () {
            var BId = $(this).attr('data-id');
            var DisplayOrder = $(this).val();
            navSettingList.adminChangeNbDisplayOrder(BId, DisplayOrder)
        });
        //保存按钮点击
        $('body').on('click', '#nextStep', function () {
            var Name = $('#consultingName').val();
            var Url = $("#url").val();
            var Img = $('#small_icon').attr('data-src');
            var DisplayOrder = $('#sort').val();
            var State = $('input[name="state"]:checked').val();
            var IsLink = Number($('input[name="link"]:checked').val());

            //咨询名称验证
            if (!Validate.emptyValidateAndFocus("#consultingName", "请输入标题名称", "")) {
                return false;
            }
            //图片验证
            if (Img == null || Img == undefined) {
                Common.showInfoMsg('请先上传图片')
                return false;
            }
            // if (!Validate.emptyValidateAndFocus("#url", "请输入地址", "")) {
            //     return false;
            // }
            //排序验证
            if (!Validate.emptyValidateAndFocus("#sort", "请输入排序", "")) {
                return false;
            }
            // 调用编辑接口这个方法
            navSettingList.adminProvinceList(Name, "", Img, DisplayOrder, State, IsLink);
        });

        //单个删除
        $("body").on("click", ".status_delete", function () {
            var rId = $(this).attr("data-id");
            Common.confirmDialog("确认删除该轮播图吗？", function () {
                navSettingList.deleteAppoint(rId);
            });
        });
    },

    //更改产品排序
    adminChangeNbDisplayOrder: function (BId, DisplayOrder) {
        //请求方法
        var methodName = "/Banner/AdminChangeBannerDisplayOrder";
        var data = {
            "BId": BId,
            "DisplayOrder": DisplayOrder
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('排序成功', function () {
                    //删除成功之后刷新表格
                    navSettingList.projectBannerQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //添加轮播图
    adminProvinceList: function (Name, Url, Img, DisplayOrder, State) {
        var data = {
            "State": State,
            "DisplayOrder": DisplayOrder,
            "Title": Name,
            "Image": Img,
            "Url": Url,
            "JumpType": $('#type').val(),
        };
        //请求方法
        var methodName = "/Banner/AdminAddBanner";
        data.PId = 0
        if ($('#type').val() == 1 && $('#productBox').is(":visible")) {
            data.PId = $('.goods-name_final').attr('data-id')
        } else if ($('#type').val() == 2 && $('#performanceBox').is(":visible")) {
            data.PId = $('#classifyName').attr('data-id')
        } else {
            data.PId = 0
        }
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功', function () {
                    location.href = '/homePage'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    deleteAppoint: function (RId) {
        var methodName = "/Banner/AdminDelBanner";
        var data = {
            BIdList: [RId]
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                navSettingList.projectBannerQuery();
                Common.showSuccessMsg("删除成功");
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台分类列表
    adminCategoryList: function () {
        //请求方法
        var methodName = "/Category/AdminCategoryList";
        var data = {};
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(navSettingList.GoodsListTemplate);
                var html = render(data.Data);
                $('#table_content_classify').html(html);
                navSettingList.initHandle();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //初始化事件
    initHandle: function () {
        //文件收缩  第一层级
        $('.layer_ul_1 .layer-1 .jia_collapse_one').click(function () {
            //$(this).parents('.contentBody').siblings('.layer_ul_2').slideToggle();
            var display_state = $(this).parents('.contentBody').siblings('.layer_ul_2').css('display'); //所以要用行内样式控制

            if (display_state == 'none') {
                $(this).parents('.contentBody').siblings('.layer_ul_2').slideDown();
                $(this).find('img').attr('src', '../public/images/zhankai.png');
            } else {
                $(this).parents('.contentBody').siblings('.layer_ul_2').slideUp();
                $(this).find('img').attr('src', '../public/images/suoqi.png');
            }
        });

        //文件收缩 第二层级
        $('.layer_ul_2 .layer-2 .jia_collapse_two').click(function () {

            var display_state = $(this).parents('.contentBody').siblings('.layer_ul_3').css('display'); //所以要用行内样式控制
            if (display_state == 'none') {
                $(this).parents('.contentBody').siblings('.layer_ul_3').slideDown();
                $(this).find('img').attr('src', '../public/images/zhankai.png');
            } else {
                $(this).parents('.contentBody').siblings('.layer_ul_3').slideUp();
                $(this).find('img').attr('src', '../public/images/suoqi.png');
            }
        });
    },
    //bootstrapTable
    initBannerBootstrapTable: function () {
        $('#brand_box').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/Banner/AdminHomeBannerList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: 10,
            pageNumber: 1,
            pageList: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
            idField: "Id", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            // showColumns: true, //显示隐藏列
            // showRefresh: true, //显示刷新按钮
            singleSelect: false, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: navSettingList.queryBannerParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class\


            responseHandler: navSettingList.responseBannerHandler,
            columns: [
                {
                    field: 'BId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Title',
                    title: '标题',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'State',
                    title: '状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return '<span>开启</span>';
                        } else {
                            return '<span>关闭</span>';
                        }
                    }
                },
                {
                    field: 'Image',
                    title: '广告图',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<img src="' + value + '" style="width: 120px;height: 60px;">'
                        return html;
                    }
                },
                {
                    field: 'DisplayOrder',
                    title: '排序',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<input type="number" class="order-disp" data-id="${row.BId}" value="${value}" style="display: inline-block;padding: 0px 10px;border: 1px solid #ccc;line-height: 35px;border-radius: 5px;width: 50px;text-align: center;min-height: 38px;">`
                        return html;
                    }
                },
                {
                    field: 'BId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<a class="editor" href="/homePage/editBanner?id=' + value + '">编辑</a> &nbsp;&nbsp;';
                        html += "<span class='status_delete' data-id='" + value + "'> 删除</span>";
                        return html;
                    }
                },


            ], //列
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function () {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function () { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function (data) {
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#dishes_list_table').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法
                // console.log(row);
                // console.log(tr);
                // console.log(flied);
            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {

                // for (var i = 0; i < rows.length; i++) {
                //     DishesList.UserIdsList.push(rows[i].User.Id);
                //     DishesList.UserOpenIds.push(rows[i].User.OpenId);
                // }

            },
            onUncheckAll: function (rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function (row) {


            },
            //取消每一个单选框时对应的操作；
            onUncheck: function (row) {


            }
        });
    },
    //bootstrap table post 参数 queryParams
    queryBannerParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/Banner/AdminHomeBannerList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseBannerHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.BannerInfoList,
                "total": res.Data.Total
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    },
    //表格刷新
    projectBannerQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {};
        } else {
            var obj = parame;
        }
        //方法名
        var methodName = "/Banner/AdminHomeBannerList";
        $('#brand_box').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/Banner/AdminHomeBannerList',
                query: obj
            }
        );
    },

    //商品列表bootstrapTable
    initProBootstrapTable: function () {
        $('#choice_goods_tb').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/Product/AdminProductList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: 6,
            pageNumber: 1,
            pageList: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
            idField: "Id", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            // showColumns: true, //显示隐藏列
            // showRefresh: true, //显示刷新按钮
            singleSelect: false, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: navSettingList.proqueryProParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: navSettingList.proresponseProHandler,
            columns: [
                {
                    field: 'Name',
                    title: '商品',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return `<span class="goods_name_modal">${value}</span>`;
                    }
                },
                {
                    field: 'ShopPrice',
                    title: '零售价',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'PId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = "<span class='sure_choice' data-name='" + row.Name + "'  data-id='" + value + "' style='color: #3c8dbc;cursor: pointer;'>选择</span>";
                        return html;
                    }
                }
            ], //列
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function () {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function () { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function (data) {
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#choice_goods_tb').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法

            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {


            },
            onUncheckAll: function (rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function (row) {


            },
            //取消每一个单选框时对应的操作；
            onUncheck: function (row) {
                Array.prototype.remove = function (val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };

            }
        });
    },
    //bootstrap table post 参数 queryParams
    proqueryProParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/Product/AdminProductList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "Name": $("#choice_presentName").val(),
            "CateId": 0,
            Page: {
                PageSize: params.limit,//页面大小,
                PageIndex: (params.offset / params.limit) + 1,//页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    proresponseProHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.ProductList,
                "total": res.Data.Total
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    },
    //表格刷新(直接刷新)
    projectProQuery: function (parame) {
        //方法名
        var methodName = "/Product/AdminProductList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "Name": $("#choice_presentName").val(),
                "CateId": 0,
                Page: {
                    PageSize: 6,
                    PageIndex: 1,
                },
            };
        } else {
            var obj = parame;
        }

        $('#choice_goods_tb').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },


}


$(function () {

    navSettingList.init()

})