$(function () {
    ProductList.init();
})

var ProductList = {
    cateTpl: `
        {{each List as value i}}
            <option value="{{List[i].CouponTypeId}}">{{List[i].Name}}</option>
        {{/each}}
    `,
    flag: true,

    init: function () {
        $('body').on('click', '.addBtnClick', function () {
            location.href = '/integrateProduct/integralProductAdd'
        })
        if (localStorage.getItem('PageIndex')) {
            if (localStorage.getItem('PageSize')) {
                $('#pagesize_dropdown').val(localStorage.getItem('PageSize'))
            }
            ProductList.initBootstrapTable();
            setTimeout(function () {
                $('.pagination').find('.page-number').each(function (index, item) {
                    $(item).removeClass('active');
                    if ($(item).find('a').text() == localStorage.getItem('PageIndex')) {
                        $(item).addClass('active');
                    }
                })
            }, 1000)
            console.log("进来了")
        } else {
            ProductList.initBootstrapTable();
        }
        //重置按钮点击
        $('body').on('click', '#resetBtn', function () {
            $('#Name').val("");
            $('#type').val(0);
            $('#stateBox').val(-1);
            // ProductList.projectQuery();
        })
        // 查詢
        $("#search").on("click", function () {
            // localStorage.setItem('PageIndex', 1)
            ProductList.projectQuery();
        });
        //导出列表按钮点击
        $('body').on('click', '.all_output', function () {
            ProductList.exportAdminOrdesList();
        })
        //排序更改
        $('body').on('change', '.order-disp', function () {
            var id = $(this).attr('data-id');
            var index = $(this).val();
            ProductList.adminEditProductDisplayOrder(id, index);
        })

        //全选
        $("#selAll").on("change", function () {
            if ($(this).is(':checked')) {
                $(".checkbox").prop("checked", true);
            }
            else {
                $(".checkbox").prop("checked", false);
            }
        });

        //编辑
        $("#productTable").on("click", ".status_edit", function () {
            var PId = $(this).attr("data-id");
            var page = 1;
            $('.pagination').find('.page-number').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    page = $(item).find('a').text()
                }
            })
            var size = $('#pagesize_dropdown').val();
            localStorage.setItem('PageIndex', page);
            localStorage.setItem('PageSize', size);
            location.href = "/integrateProduct/integralProductAdd?PId=" + PId;
        });

        //单个删除
        $("#productTable").on("click", ".status_delete", function () {
            var PId = $(this).attr("data-id");
            Common.confirmDialog("确认进行删除吗？", function () {
                ProductList.deleteProduct(PId);
            });
        });

        //多个删除
        $("#delete").on("click", function () {
            Common.confirmDialog("确认对选中的数据进行删除吗？", function () {
                ProductList.deleteProduct(ProductList.getSelectedData());
            });
        });

        //上下架状态改变
        $('body').on('change', '.stateBox', function () {
            var id = $(this).attr('data-id');
            var state = $(this).attr('data-state');
            var PIdArr = [];
            PIdArr.push(id);
            if (state == 2) {
                //当前是下架状态
                ProductList.onSaleProduct(PIdArr);
            } else {
                //当前为上架状态
                ProductList.outSaleProduct(PIdArr);
            }
        })

        //下架
        $("#productTable").on("click", ".status_close", function () {
            var PId = $(this).attr("data-id");
            var PIdArr = [];
            PIdArr.push(PId);
            Common.confirmDialog("确认进行下架操作吗？", function () {
                ProductList.outSaleProduct(PIdArr);
            });
        });
        //上架
        $("#productTable").on("click", ".status_add", function () {
            var PId = $(this).attr("data-id");
            var PIdArr = [];
            PIdArr.push(PId);
            Common.confirmDialog("确认进行上架操作吗？", function () {
                ProductList.onSaleProduct(PIdArr);
            });
        });

        //表格分页每页显示数据
        $("#pagesize_dropdown").on("change", function () {
            ProductList.projectQuery();
        });
    },
    //后台导出订单列表
    exportAdminOrdesList: function () {
        var methodName = "/Product/ExportAdminProductList";
        var data = {
            "State": $('#stateBox').val(),
            "CateId": $('#CateId').val(),
            "Name": $("#Name").val(),
            "BarCode": $('#BarCode').val(),
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                location.href = data.Data

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台编辑商品排序
    adminEditProductDisplayOrder: function (PId, DisplayOrder) {
        var methodName = "/creditProduct/AdminEditProductDisplayOrder";
        var data = {
            "PId": PId,
            "DisplayOrder": DisplayOrder
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("修改成功", function () {
                    ProductList.refreshQuery();
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 获取选中的数据
    getSelectedData: function () {
        var list = $("#productTable .checkbox");
        var PId = [];
        for (var i = 0; i < list.length; i++) {
            if (list.eq(i).is(':checked')) {
                PId.push(list.eq(i).attr("data-pid"));
            }
        }
        return PId;
    },
    // 删除
    deleteProduct: function (PId) {
        var methodName = "/product/AdminDelProduct";
        var data = {
            PId: [PId]
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                ProductList.projectQuery();
                Common.showSuccessMsg("删除成功");
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 下架
    outSaleProduct: function (PId) {
        var methodName = "/product/AdminOutSaleProduct";
        var data = {
            PId: PId
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {

                ProductList.refreshQuery();

                Common.showSuccessMsg("下架成功");
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //上架
    onSaleProduct: function (PId) {
        var methodName = "/product/AdminOnSaleProduct";
        var data = {
            PId: PId
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {

                ProductList.refreshQuery();

                Common.showSuccessMsg("上架成功");
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 获取优惠券类型列表
    adminCouponMiniListMethod: function () {
        var methodName = "/creditMall/AdminCouponMiniList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(ProductList.cateTpl);
                var html = render(data.Data);
                $("#CateId").append(html);

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //bootstrapTable
    initBootstrapTable: function () {
        $('#productTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/product/AdminCreditProductList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
            pageNumber: ProductList.flag ? localStorage.getItem('PageIndex') ? localStorage.getItem('PageIndex') : 1 : 1,
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
            queryParams: ProductList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: ProductList.responseHandler,
            columns: [
                {
                    field: 'PId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Name',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle',
                    width: 300,
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Credit',
                    title: '兑换积分商品所需积分',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Count',
                    title: '库存',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'State',
                    title: '商品状态',
                    align: 'center',
                    valign: 'middle',
                    width: 100,
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            var html = `<select class="form-control stateBox" data-id="${row.PId}" data-state="${row.State}">
                                        <option  value="1" selected>上架</option>
                                        <option  value="2">下架</option>
                                     </select>`
                        } else {
                            var html = `<select class="form-control stateBox" data-id="${row.PId}" data-state="${row.State}">
                                        <option  value="1" >上架</option>
                                        <option  value="2" selected>下架</option>
                                     </select>`
                        }
                        return html
                    }
                },
                {
                    field: 'DisplayOrder',
                    title: '显示顺序',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<input type="number" class="order-disp" data-id="${row.PId}" value="${value}">`
                        return html;
                    }
                },
                {
                    field: 'PId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = "";
                        html += "<span class='status_edit' style='margin-right: 15px' data-id='" + value + "'>编辑</span>";
                        html += "<span class='status_delete' data-id='" + value + "'>删除</span>";
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
                if (ProductList.flag) {
                    ProductList.flag = false
                }
            },
            onLoadError: function (data) {
                $('#productTable').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法

            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {

                // for (var i = 0; i < rows.length; i++) {
                //     dishes_list.UserIdsList.push(rows[i].User.Id);
                //     dishes_list.UserOpenIds.push(rows[i].User.OpenId);
                // }

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
    queryParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/product/AdminCreditProductList";

        if (ProductList.flag) {
            var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                "State": $('#stateBox').val(),
                "Name": $('#Name').val(),
                Page: {
                    PageSize: params.limit,//页面大小,
                    PageIndex: localStorage.getItem('PageIndex') ? localStorage.getItem('PageIndex') : 1,//页码
                }
            };
        } else {
            var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                "State": $('#stateBox').val(),
                "Name": $('#Name').val(),
                Page: {
                    PageSize: params.limit,//页面大小,
                    PageIndex: (params.offset / params.limit) + 1,//页码
                }
            };
        }

        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
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
    refreshQuery: function (parame) {
        //方法名
        var methodName = "/product/AdminCreditProductList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "State": $('#stateBox').val(),
                "Name": $('#Name').val(),
            };
        } else {
            var obj = parame;
        }

        $('#productTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新(先销毁后初始化)
    projectQuery: function (parame) {
        //方法名
        var methodName = "/product/AdminCreditProductList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "State": $('#stateBox').val(),
                "Name": $('#Name').val(),
                Page: {
                    PageSize: $("#pagesize_dropdown").val(),//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#productTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
        ProductList.initBootstrapTable();
    }
}