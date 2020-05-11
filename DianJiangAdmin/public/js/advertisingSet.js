$(function () {
    AdvertisingSet.init();
})

var AdvertisingSet = {
    bid: 0, //广告id

    init: function () {
        AdvertisingSet.initBootstrapTable();

        //选择商品模态框出现获取数据
        $('#choicePresentModal').on('shown.bs.modal', function () {
            AdvertisingSet.initProBootstrapTable();
        });
        //商品模态框点击选择
        $('body').on('click', '.sure_choice', function () {
            //商品名称
            var id = $(this).attr('data-id');
            var txt_name = $(this).attr('data-name');
            if (AdvertisingSet.bid == 0) {
                $('.goods-name_final').show();
                $('.goods-name_final').text(txt_name);
                $('.goods-name_final').attr('data-id', id);
                $('#choicePresentModal').modal('hide');
            } else {
                $('.goods-name_final3').show();
                $('.goods-name_final3').text(txt_name);
                $('.goods-name_final3').attr('data-id', id);
                $('#choicePresentModal').modal('hide');
            }
        });

        //商品查询
        $('body').on('click', '#prosearchBtn', function () {
            AdvertisingSet.projectProQuery();
        })

        //编辑
        $("#bannerTable").on("click", ".status_edit", function () {
            //打开模态框
            $('#editModal').modal('show');
            var id = $(this).attr("data-id");
            AdvertisingSet.bid = id;
            AdvertisingSet.getAdminBannerInfo();
        });

        //上传图片
        uploadIconPic('#small_upload_pick', '#small_icon', '/Banner/AdminUploadBannerImg');
        uploadIconPic('#small_upload_pick3', '#small_icon3', '/Banner/AdminUploadBannerImg');

        //单个删除
        $("#bannerTable").on("click", ".status_delete", function () {
            var id = $(this).attr("data-id");
            var IdArr = [];
            IdArr.push(id);
            Common.confirmDialog("确认进行删除吗？", function () {
                AdvertisingSet.delAdminBanner(IdArr);
            });
        });

        //排序更改
        $('body').on('change', '.order-disp', function () {
            var id = $(this).attr('data-id');
            var num = $(this).val();
            AdvertisingSet.changeBannerDisplayOrder(id, num);
        })

        // 添加
        $("#confirmBtn").on("click", function () {
            if ($("#title2").val() == "") {
                Common.showInfoMsg("请输入标题");
                return false;
            }
            // if ($('.goods-name_final').attr('data-id') == 0 || $('.goods-name_final').attr('data-id') == null || $('.goods-name_final').attr('data-id') == undefined) {
            //     Common.showInfoMsg("请选择商品");
            //     return false;
            // }
            // if ($("#type2").val() == -1) {
            //     Common.showInfoMsg("请选择链接类型");
            //     return false;
            // }
            if ($("#state2").val() == -1) {
                Common.showInfoMsg("请选择状态");
                return false;
            }
            if ($("#displayOrder2").val() == "") {
                Common.showInfoMsg("请输入排序");
                return false;
            }
            if ($('#small_icon').attr('data-src') == "" || $('#small_icon').attr('data-src') == null) {
                Common.showInfoMsg('请上传广告图');
                return false;
            }
            AdvertisingSet.addAdminBanner();
        })

        //编辑确认按钮点击
        $('body').on('click', '#editConfirmBtn', function () {
            if ($("#title3").val() == "") {
                Common.showInfoMsg("请输入标题");
                return false;
            }
            // if ($('.goods-name_final3').attr('data-id') == 0 || $('.goods-name_final3').attr('data-id') == null || $('.goods-name_final3').attr('data-id') == undefined) {
            //     Common.showInfoMsg("请选择商品");
            //     return false;
            // }
            // if ($("#type3").val() == -1) {
            //     Common.showInfoMsg("请选择链接类型");
            //     return false;
            // }
            if ($("#state3").val() == -1) {
                Common.showInfoMsg("请选择状态");
                return false;
            }
            if ($("#displayOrder3").val() == "") {
                Common.showInfoMsg("请输入排序");
                return false;
            }
            if ($('#small_icon3').attr('data-src') == "" || $('#small_icon3').attr('data-src') == null) {
                Common.showInfoMsg('请上传广告图');
                return false;
            }
            AdvertisingSet.editAdminBanner();
        })

    },

    //获取广告信息
    getAdminBannerInfo: function () {
        //请求方法
        var methodName = "/Banner/AdminBannerInfo";
        var data = {
            "BId": AdvertisingSet.bid
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                AdvertisingSet.bid = data.Data.AdminBannerInfos.BId;
                $("#small_icon3").attr("src", data.Data.AdminBannerInfos.ImageFull);
                $("#small_icon3").attr("data-src", data.Data.AdminBannerInfos.Image);
                $("#title3").val(data.Data.AdminBannerInfos.Title);
                $("#state3").val(data.Data.AdminBannerInfos.State);
                // $("#type3").val(data.Data.AdminBannerInfos.Type);
                $("#displayOrder3").val(data.Data.AdminBannerInfos.DisplayOrder);

                $('.goods-name_final3').show();
                $('.goods-name_final3').text(data.Data.AdminBannerInfos.Name);
                $('.goods-name_final3').attr('data-id', data.Data.AdminBannerInfos.PId);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //编辑广告信息
    editAdminBanner: function () {
        var methodName = "/Banner/AdminEditBanner";
        var data = {
            "BId": AdvertisingSet.bid,
            "State": $("#state3").val(),
            "DisplayOrder": $("#displayOrder3").val(),
            "Title": $("#title3").val(),
            "Image": $("#small_icon3").attr("data-src"),
            "Url": "",
            "PId": $('.goods-name_final3').attr('data-id'),
            "Type": 0,
            // "Type": $("#type3").val(),
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功", function () {
                    AdvertisingSet.bid = 0;
                    $('.goods-name_final3').text("");
                    $('.goods-name_final3').attr('data-id', 0);
                    $(".goods-name_final3").hide();

                    $("#small_icon3").attr("src", "/public/images/addImg.png");
                    $("#small_icon3").attr("data-src", "");
                    $("#title3").val("");
                    $("#state3 option[value='" + -1 + "']").attr("selected", "selected");
                    // $("#type3 option[value='" + -1 + "']").attr("selected", "selected");
                    $("#displayOrder3").val("");
                    AdvertisingSet.refreshQuery();
                    $("#editModal").modal("hide");
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //添加广告
    addAdminBanner: function () {
        var methodName = "/Banner/AdminAddBanner";
        var data = {
            "State": $("#state2").val(),
            "DisplayOrder": $("#displayOrder2").val(),
            "Title": $("#title2").val(),
            "Image": $("#small_icon").attr("data-src"),
            "Url": "",
            "PId": $('.goods-name_final').attr('data-id'),
            "Type": 0,
            // "Type": $("#type2").val(),
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg("添加成功", function () {
                    location.reload();
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //删除广告
    delAdminBanner: function (id) {
        var methodName = "/Banner/AdminDelBanner";
        var data = {
            "BIdList": id
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("删除成功", function () {
                    AdvertisingSet.projectQuery();
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //排序广告
    changeBannerDisplayOrder: function (id, num) {
        var methodName = "/Banner/AdminChangeBannerDisplayOrder";
        var data = {
            "BId": id,
            "DisplayOrder": num
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("修改成功", function () {
                    AdvertisingSet.refreshQuery();
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },


    //列表bootstrapTable
    initBootstrapTable: function () {
        $('#bannerTable').bootstrapTable({
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
            queryParams: AdvertisingSet.queryProParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: AdvertisingSet.responseProHandler,
            columns: [
                {
                    field: 'BId',
                    title: '',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<input type="checkbox" class="checkbox" data-pid="' + value + '">'
                        return html;
                    }
                },
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
                    field: 'TypeDesc',
                    title: '类型',
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
                        var html = "";
                        html += "<span class='status_edit' style='margin-right: 10px;' data-id='" + value + "'>编辑</span>";
                        html += "<span class='status_delete'  data-id='" + value + "'>删除</span>";
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
                $('#recoveryTable').bootstrapTable('removeAll');
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
    queryProParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/Banner/AdminHomeBannerList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            Page: {
                PageSize: params.limit,//页面大小,
                PageIndex: (params.offset / params.limit) + 1,//页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseProHandler: function (res) {
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
    //表格刷新(直接刷新)
    refreshQuery: function (parame) {
        //方法名
        var methodName = "/Banner/AdminHomeBannerList";

        if (parame == "" || parame == undefined) {
            var obj = {};
        } else {
            var obj = parame;
        }

        $('#bannerTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新(先销毁后初始化)
    projectQuery: function (parame) {
        //方法名
        var methodName = "/Banner/AdminHomeBannerList";

        if (parame == "" || parame == undefined) {
            var obj = {
                Page: {
                    PageSize: 10,//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#bannerTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
        AdvertisingSet.initBootstrapTable();
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
            queryParams: AdvertisingSet.proqueryProParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: AdvertisingSet.proresponseProHandler,
            columns: [
                // {
                //     field: 'ShowImg',
                //     title: '图片',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         var html = '<img src="' + value + '" style="width: 80px;height: 80px;">'
                //         return html;
                //     }
                // },
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
                // {
                //     field: 'SupplyPrice',
                //     title: '供应价',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         return value;
                //     }
                // },
                // {
                //     field: 'DropPrice',
                //     title: '吊牌价',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         return value;
                //     }
                // },
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