var OrderList = {
    State: "0",
    // //省id
    // provinceId: "0",
    // //市id
    // cityId: "0",
    // //区域id
    // regionid: "0",
    oSn: "",
    consigNee: "",
    orderState: "",
    userName: "",
    productsName: "",
    startTime: "",
    endTime: "",
    orderSoirce: "0",
    province_template: `
                                   <option selected="selected" value="0">请选择省</option>
                                   {{each RegionsList as value i}}
                                   <option data-id="{{RegionsList[i].RegionId}}">{{RegionsList[i].Name}}</option>
                                   {{/each}}

`,
    city_template: `

                                    <option selected="selected" value="0">请选择市</option>
                                     {{each RegionsList as value i}}
                                    <option data-id="{{RegionsList[i].RegionId}}">{{RegionsList[i].Name}}</option>
                                       {{/each}}
`,
    area_template: `

                                    <option selected="selected" value="0">请选择区/县</option>
                                    {{each RegionsList as value i}}
                                    <option data-id="{{RegionsList[i].RegionId}}">{{RegionsList[i].Name}}</option>
                                    {{/each}}
`,
    street_template: `
                                    <option selected="selected" value="0">请选择街道</option>
                                    {{each RegionsList as value i}}
                                    <option data-id="{{RegionsList[i].RegionId}}">{{RegionsList[i].Name}}</option>
                                    {{/each}}
`,
    storeTemplate: `
                                    {{each OrderStoresList as value i}}
                                    <option value="{{OrderStoresList[i].SId}}">{{OrderStoresList[i].Name}}</option>
                                    {{/each}}
    `,
    //快递公司模板
    expressCompanyTemplate: `
            <option selected="selected" value="0">请选择快递公司</option>
            {{each ShipCompaniesList as value i}}
                <option value="{{ShipCompaniesList[i].Name}}">{{ShipCompaniesList[i].Name}}</option>
            {{/each}}
`,
    //商品模板
    productTemplate: `
                        {{each productList as value i}}
                            <li class="clearfix">
                                <div class="p-name">
                                    <img src="{{productList[i].ShowImg}}">
                                    <div>
                                        <p class="pn-name">{{productList[i].Name}}</p>
                                    </div>
                                </div>
                                <p>{{productList[i].RealCount}}</p>
                                <p>{{productList[i].Subtotal}}</p>
                            </li>
                        {{/each}}
`,
    flag: true,
    init: function () {
        //初始化获取省列表
        OrderList.provinceHandle();
        //导入
        $("#import input").on("change", function () {
            var file = $(this)[0].files[0];
            var url = "/order/BatchUploadAdminAdminOrdesGoods";
            console.log()
            OrderList.setFile(file, url)
        });
        //下载模板按钮点击
        $('body').on('click', '#downloadBtn', function () {
            OrderList.downloadDiseasesUploadTemplate();
        })
        //重置按钮点击
        $('body').on('click', '#resetBtn', function () {
            $('#order_num').val("");
            $('#account_name').val("");
            $('#phone').val("");
            $('#state_box').val(0);
            $('#start_time').val("");
            $('#end_time').val("");
            $('#storeName').val("");
            $('#UserName').val("");
            $('#pay_box').val(0);
            $('#send_box').val(0);
            OrderList.regionid = 0;
            OrderList.provinceId = 0;
            OrderList.cityId = 0;
        })


        if (localStorage.getItem('PageIndex')) {
            if (localStorage.getItem('PageSize')) {
                $('#pagesize_dropdown').val(localStorage.getItem('PageSize'))
            }
            OrderList.initBootstrapTable();
            setTimeout(function () {
                $('.pagination').find('.page-number').each(function (index, item) {
                    $(item).removeClass('active');
                    if ($(item).find('a').text() == localStorage.getItem('PageIndex')) {
                        // $(item).addClass('active');
                        $(item).click();
                    }
                })
            }, 1000)

            console.log("进来了")
        } else {
            //初始化表格
            OrderList.initBootstrapTable();
        }

        //查看按钮点击
        $('body').on('click', '.seeBtn', function () {
            var id = $(this).attr('data-id');
            var page = 1;
            $('.pagination').find('.page-number').each(function (index, item) {
                if ($(item).hasClass('active')) {
                    page = $(item).find('a').text()
                }
            })
            var size = $('#pagesize_dropdown').val();
            localStorage.setItem('PageIndex', page);
            localStorage.setItem('PageSize', size);
            location.href = '/order/integrationOrderListDetail?id=' + id + '';
        })

        //订单筛选时间
        laydate.render({
            elem: '#start_time', //指定元素
            type: 'datetime'
        });
        laydate.render({
            elem: '#end_time', //指定元素
            type: 'datetime'
        });
        //tab切换
        $('body').on('click', '.tabs_orderList_ul li', function () {
            var state = $(this).attr('data-state');
            localStorage.setItem('PageIndex', 1)
            localStorage.setItem('PageSize', "10")
            $(this).addClass('active').siblings().removeClass('active')
            OrderList.State = state;
            location.href = '/order/orderList?type=' + state + '';
            OrderList.projectDestoryQuery();
        })
        //全选效果
        $('#check_total_operation_all').click(function () {
            // var check_is = this.checked;
            if (this.checked) {
                $('#orderBox input[type="checkbox"]').each(function (index, val) {
                    this.checked = true;
                });
            } else {
                $('#orderBox input[type="checkbox"]').each(function (index, val) {
                    this.checked = false;
                });
            }
        });
        //关闭弹窗
        $(".mask").on("click", ".close", function () {
            $(".mask").hide();
        });
        //订单类型
        $('body').on('change', '#state_box', function () {
            OrderList.State = $('#state_box option:selected').val();
        })
        //查询按钮点击事件
        $('body').on('click', '#seachBtn', function () {
            localStorage.setItem('PageIndex', 1);
            OrderList.projectDestoryQuery();
        });

        // 分页条数设置
        $("#pagesize_dropdown").on("change", function () {
            OrderList.projectDestoryQuery();
        });

        //省改变时
        $('body').on('change', '#province_box', function () {
            var id = $('#province_box option:selected').attr('data-id');
            OrderList.provinceId = id;
            OrderList.cityId = 0;
            OrderList.regionid = 0;
            OrderList.cityHandle(id);
            $('#city_box').val(0)
            $('#area_box').html('<option selected="selected" value="0">请选择区/县</option>')
            $('#street_box').html('<option selected="selected" value="0">请选择街道</option>')
            if ($('#province_box option:selected').val() == "0") {
                OrderList.provinceId = 0;
            } else {

            }
        })
        //市改变时
        $('body').on('change', '#city_box', function () {
            var id = $('#city_box option:selected').attr('data-id');
            OrderList.cityId = id;
            OrderList.regionid = 0;
            OrderList.areaHandle(id);
            $('#area_box').val(0)
            $('#street_box').html('<option selected="selected" value="0">请选择街道</option>')
        })
        //区改变时
        $('body').on('change', '#area_box', function () {
            var id = $('#area_box option:selected').attr('data-id');
            // OrderList.streetHandle(id);
            OrderList.regionid = id;
            $('#street_box').val(0)
        })
        // //街道改变时
        // $('body').on('change', '#street_box', function () {
        //     var id = $('#street_box option:selected').attr('data-id');
        //     OrderList.regionid = id;
        // })

        //操作按钮点击
        $('body').on('click', '.actionBtn', function () {
            var id = $(this).attr('data-id');
            var state = $(this).attr('data-state');
            OrderList.adminOperateOrder(id, state);
        })
        //删除按钮点击时
        $('body').on('click', '.all_delete_box', function () {
            var ids = [];
            $('.order_checkbox').each(function (index, item) {
                if (this.checked) {
                    ids.push($(item).attr('data-id'));
                }
            })
            Common.confirmDialog('是否要删除?', function () {
                OrderList.adminDelOrders(ids)
            })

        });
        //导出列表按钮点击
        $('body').on('click', '.all_output', function () {
            OrderList.exportAdminOrdesList();
        })
        //点击发货按钮(快递)
        $('body').on('click', '.sendProduct', function () {
            $('.mask').show();
            $('.deliverBox').show();
            localStorage.setItem('oid', $(this).attr('data-id'));
            $('#expressNumber').val("");
            $('#logisticsCompany').val(0);
            OrderList.adminGetDeliveryList();

        });
        //发货里面的弹窗去确认点击
        $('body').on('click', '#deliver', function () {
            //快递单号验证
            if (!Validate.emptyValidateAndFocus("#expressNumber", "请输入快递单号", "")) {
                return false;
            }
            //快递公司
            if ($('#logisticsCompany').val() == "0") {
                Common.showErrorMsg("请选择快递公司!");
                return false;
            }
            //调用确认发货接口
            OrderList.adminOperateOrder(localStorage.getItem('oid'),100);
        })

        //点击发货按钮（自提）
        $('body').on('click', '.sendProductSelf', function () {
            localStorage.setItem('oid', $(this).attr('data-id'));
            Common.confirmDialog('确认发货吗?', function () {
                OrderList.adminSendGoods();
            })
        });

    },
    //上传模板
    setFile: function (file, url) {
        var formData = new FormData();
        formData.append('file', file);
        Common.showUploading();
        $.ajax({
            url: SignRequest.urlPrefix + url,
            type: "post",
            dataType: "json",
            data: formData,
            cache: false,
            processData: false,
            contentType: false
        }).done(function (data) {
            swal.close()
            if (data.Code == "100") {
                Common.showSuccessMsg("发货成功", function () {
                    //进行刷新操作==>
                    OrderList.projectDestoryQuery()
                })
                $("#importFile").val("");
            } else {
                $("#importFile").val("");
                Common.showErrorMsg(data.Message);
            }
        }).fail(function () {
            swal.close()
            $("#importFile").val("");
            Common.showErrorMsg("上传文件失败");
        })
    },
    //下载模板
    downloadDiseasesUploadTemplate: function () {
        var methodName = "/order/ExportAdminOrdesGoodsList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                location.href = data.Data;
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // //获取门店列表
    // getStoreList: function () {
    //     var methodName = "/stores/OrderStoreList";
    //     var data = {};
    //     SignRequest.set(methodName, data, function (data) {
    //         if (data.Code == "100") {
    //             var render = template.compile(OrderList.storeTemplate);
    //             var html = render(data.Data);
    //             $("#storeBox").append(html);
    //
    //         } else {
    //             Common.showErrorMsg(data.Message);
    //         }
    //     });
    //
    // },
    //获取发货订单基本信息
    adminGetDeliveryList: function () {
        var methodName = "/Order/AdminGetDeliveryList";
        var data = {
            "OId": localStorage.getItem('oid'),
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                $('#orderAddress').text(data.Data.DeliveryList[0].address);
                $('#buymarker').text(data.Data.DeliveryList[0].buyerRemark);
                $('#orderUser').text(data.Data.DeliveryList[0].consignee)
                $('#orderPhone').text(data.Data.DeliveryList[0].phone)

                var render = template.compile(OrderList.expressCompanyTemplate);
                var html = render(data.Data);
                $('#logisticsCompany').html(html);

                var render1 = template.compile(OrderList.productTemplate);
                var html1 = render1(data.Data.DeliveryList[0]);
                $('.pl-table').html(html1);

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //发货
    adminSendGoods: function () {
        var methodName = "/Order/AdminOrdersGoods";
        var data = {
            "OId": localStorage.getItem('oid'),
            "ShipCode": $('#expressNumber').val() ? $('#expressNumber').val() : "",
            "ShipFriendName": $('#logisticsCompany').val() != 0 ? $('#logisticsCompany').val() : ""
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('发货成功', function () {
                    OrderList.projectQuery();
                    $('#expressNumber').val("");
                    $('#logisticsCompany').val(0);
                    $('.mask').hide();
                })

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //操作订单
    adminOperateOrder: function (id, state) {
        var methodName = "/Order/AdminOperateOrder";
        var data = {
            "OId": id,
            "actionType": state,
            "actionDes": "",
            "ShipCode": $('#expressNumber').val() ? $('#expressNumber').val() : "",
            "ShipFriendName": $('#logisticsCompany').val() != 0 ? $('#logisticsCompany').val() : ""
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                if (state == "80") {
                    Common.showSuccessMsg('确认收款成功!', function () {
                        OrderList.projectQuery();
                    })
                } else if (state == "60") {
                    Common.showSuccessMsg('确认收货!', function () {
                        OrderList.projectQuery();
                    })
                } else if (state == "160") {
                    Common.showSuccessMsg('取消订单成功!', function () {
                        OrderList.projectQuery();
                    })
                } else if (state == "100") {
                    Common.showSuccessMsg('发货成功', function () {
                        OrderList.projectQuery();
                        $('#expressNumber').val("");
                        $('#logisticsCompany').val(0);
                        $('.mask').hide();
                    })
                }else {
                    Common.showSuccessMsg('操作成功')
                    OrderList.projectQuery();
                }
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //删除订单
    adminDelOrders: function (oids) {
        var methodName = "/Order/AdminDelOrders";
        var data = {
            oid: oids
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('删除成功', function () {
                    OrderList.projectDestoryQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台导出订单列表
    exportAdminOrdesList: function (list) {
        var methodName = "/Order/ExportAdminOrderList";
        var data = {
            "OrderType": 2,
            "OSn": $('#order_num').val(),
            "NickName": $('#account_name').val(),
            "StoreName": $('#storeName').val(),
            "PayMode": $('#pay_box').val(),
            "OrderState": $('#state_box').val(),
            "UserName": $('#UserName').val(),
            "ShipType": $('#send_box').val(),
            "StartTime": $('#start_time').val(),
            "EndTime": $('#end_time').val(),
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
    //bootstrapTable
    initBootstrapTable: function () {
        $('#orderBox').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/Order/AdminOrderList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
            pageNumber: OrderList.flag ? localStorage.getItem('PageIndex') : 1,
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
            queryParams: OrderList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: OrderList.responseHandler,
            columns: [

                {
                    field: 'OSn',
                    title: '订单号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var e = '<span style="display:block;position: relative"><a style="color:#44b8fd" href="/order/orderListDetail?id=' + row.OId + '">' + value + '</a></span>';
                        return e;
                    }
                },
                {
                    field: 'UserName',
                    title: '会员昵称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Mobile',
                    title: '手机号码',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StoreName',
                    title: '门店名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'ShipTypeDesc',
                    title: '配送类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Addtimes',
                    title: '提交时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'PayTimes',
                    title: '支付时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        // var value = moment(value).format('YYYY.MM.DD');
                        if (value == "1900-01-01 00:00:00" || value == "" || value == null) {
                            var html = '暂未付款';
                        } else {
                            var html = value;
                        }
                        var e = '<span style="display:block;">' + html + '</span>';
                        return e;
                    }
                },
                {
                    field: 'SurplusMoney',
                    title: '支付金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Credit',
                    title: '支付积分',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'PayTypesDesc',
                    title: '支付类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'OrderStateDesc',
                    title: '订单状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'OId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        if (row.OrderState == "20") {
                            var html =
                                '<a class="seeBtn" href="javascript:void(0)" style="color:#44b8fd;cursor: pointer;margin-right: 5px"  data-id="' + value + '" >查看</a>' +
                                '<span style="padding: 0 6px;color:#44b8fd;cursor: pointer" data-state="' + 160 + '" class="closeOrder actionBtn" data-id="' + value + '">取消订单</span>';
                        } else if (row.OrderState == "65") {
                            var html =
                                '<a class="seeBtn" href="javascript:void(0)" style="color:#44b8fd;cursor: pointer;margin-right: 5px"  data-id="' + value + '" >查看</a>' +
                                '<span style="padding: 0 6px;color:#44b8fd;cursor: pointer" data-state="100" class="sendProduct"  data-id="' + row.OId + '">发货</span>';
                        } else {
                            var html = '<a class="seeBtn" href="javascript:void(0)" style="color:#44b8fd;cursor: pointer;margin-right: 5px"   data-id="' + value + '" >查看</a>';
                        }

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
                $('.amount').html(data.amount);
                $('.number2').html(data.total)
                if (OrderList.flag) {
                    OrderList.flag = false
                }
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
    queryParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/Order/AdminOrderList";
        if (OrderList.flag) {
            var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                "OrderType": 2,
                "OSn": $('#order_num').val(),
                "NickName": $('#account_name').val(),
                "StoreName": $('#storeName').val(),
                "PayMode": $('#pay_box').val(),
                "OrderState": $('#state_box').val(),
                "UserName": $('#UserName').val(),
                "ShipType": $('#send_box').val(),
                "StartTime": $('#start_time').val(),
                "EndTime": $('#end_time').val(),
                "Page": {
                    "PageSize": params.limit,
                    "PageIndex": localStorage.getItem('PageIndex') ? localStorage.getItem('PageIndex') : 1,
                },
            };
        } else {
            var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
                "OrderType": 2,
                "OSn": $('#order_num').val(),
                "NickName": $('#account_name').val(),
                "StoreName": $('#storeName').val(),
                "PayMode": $('#pay_box').val(),
                "OrderState": $('#state_box').val(),
                "UserName": $('#UserName').val(),
                "ShipType": $('#send_box').val(),
                "StartTime": $('#start_time').val(),
                "EndTime": $('#end_time').val(),
                "Page": {
                    "PageSize": params.limit,
                    "PageIndex": (params.offset / params.limit) + 1,
                },
            }
        }


        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.OrderList,
                "total": res.Data.Total,
                'amount': res.Data.TotalAmount
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    },
    //表格刷新
    projectQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "OrderType": 2,
                "OSn": $('#order_num').val(),
                "NickName": $('#account_name').val(),
                "StoreName": $('#storeName').val(),
                "PayMode": $('#pay_box').val(),
                "OrderState": $('#state_box').val(),
                "UserName": $('#UserName').val(),
                "ShipType": $('#send_box').val(),
                "StartTime": $('#start_time').val(),
                "EndTime": $('#end_time').val(),
            };
        } else {
            var obj = parame;
        }

        $('#orderBox').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/Order/AdminOrderList',
                query: obj
            }
        );

    },
    //表格先销毁刷新
    projectDestoryQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "OrderType": 2,
                "OSn": $('#order_num').val(),
                "NickName": $('#account_name').val(),
                "StoreName": $('#storeName').val(),
                "PayMode": $('#pay_box').val(),
                "OrderState": $('#state_box').val(),
                "UserName": $('#UserName').val(),
                "ShipType": $('#send_box').val(),
                "StartTime": $('#start_time').val(),
                "EndTime": $('#end_time').val(),
                Page: {
                    PageSize: $("#pagesize_dropdown").val(),//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#orderBox').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/Order/AdminOrderList',
                query: obj
            }
        );
        OrderList.initBootstrapTable();
    },
    //调用获取省列表
    provinceHandle: function () {
        var methodName = "/Tool/ProvinceList";
        var data = {
            "Type": 1,
            "ParentId": 0
        };
        SignRequest.setNoAdmin(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(OrderList.province_template);
                var html = render(data.Data);
                $("#province_box").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //调用获取市列表
    cityHandle: function (id) {
        var methodName = "/Tool/CityList";
        var data = {
            "Type": 1,
            "ParentId": id
        };
        SignRequest.setNoAdmin(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(OrderList.city_template);
                var html = render(data.Data);
                $("#city_box").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //调用获取区列表
    areaHandle: function (id) {
        var methodName = "/Tool/MunicipalDistrictList";
        var data = {
            "Type": 1,
            "ParentId": id
        };
        SignRequest.setNoAdmin(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(OrderList.area_template);
                var html = render(data.Data);
                $("#area_box").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

};

$(function () {
    OrderList.init();
});