$(function () {
    SettingField.init();
})

var SettingField = {
    topicId:0,
    OldList: [],

    bestPageIndex: 1,
    bestPageNum: 0,

    //表格模板
    tableTemplate: `
        <tbody>
            <tr>
                <th>商品名称</th>
                <th>原价</th>                                      
                <th>排序</th>                                      
                <th>操作</th>
            </tr>
            {{each TopicProductsShowList as value i }}
                <tr name="appendlist" style="display: table-row;">
                    <td>{{TopicProductsShowList[i].Name}}</td>
                    <td>¥{{TopicProductsShowList[i].CostPrice}}</td>
                    <td><input type="number" style="text-align: center;" value="{{TopicProductsShowList[i].DisplayOrder}}" data-id="{{TopicProductsShowList[i].PId}}" class="order-disp"></td>
                    <td>
                        <img src="/public/images/icon_close.png" style="cursor: pointer;" alt="删除" data-id="{{TopicProductsShowList[i].PId}}" class="deleteShowPro"/>
                    </td>
                </tr>
            {{/each}}
        </tbody>
    `,

    init: function () {
        //初始化
        SettingField.initBootstrapTable();
        SettingField.initProBootstrapTable();

        //上传小图标
        uploadIconPic('#small_upload_pick', '#small_icon', '/indexDatas/AdminUploadTopicsInfoImg');

        // 更改排序
        $("#fieldTable").on("change", ".order-disp", function () {
            var id = $(this).attr("data-id");
            var num = $(this).val();
            SettingField.ChangeBannerDisplayOrder(id, num);
        });

        // 编辑点击
        $("body").on("click", ".status_edit", function () {
            $("#first").removeClass('active');
            $("#second").addClass("active");
            var id = $(this).attr("data-id");
            SettingField.topicId = id;
            SettingField.getTopicsInfo();
        });

        // 打开商品弹窗
        $("#selectPro").on("click", function () {
            $("#OrdinaryModal").modal("show");
            SettingField.destoryQuery2();
        })
        // 商品列表分页条数
        $("#pagesize_dropdown").on("change", function () {
            SettingField.destoryQuery2();
        });
        //商品查询
        $('body').on('click', '#prosearchBtn', function () {
            SettingField.destoryQuery2();
        })
        // 选择商品确认按钮点击
        $('body').on('click', '#confirmBtn', function () {
            var list = [];
            $('.checkbox').each(function (index, item) {
                if (this.checked) {
                    list.push({
                        PId: $(item).attr('data-id'),
                        DisplayOrder: 0
                    });
                }
            });
            if (list.length > 0) {
                SettingField.getProductShowList(list);
            } else {
                Common.showInfoMsg('请选择商品');
                return false;
            }
        });
        //删除显示的商品
        $("#fieldAddTable1").on("click", ".deleteShowPro", function () {
            var id = $(this).attr("data-id");
            $.each(SettingField.OldList, function (index, value) {
                if (SettingField.OldList[index].PId == id){
                    SettingField.OldList.splice(index, 1);
                    return false;
                }
            })
            SettingField.getProductShowList([]);
        })
        //显示的商品排序
        $("#fieldAddTable1").on("change", ".order-disp", function () {
            var id = $(this).attr("data-id");
            var num = Number($(this).val());
            $.each(SettingField.OldList, function (index, value) {
                if (SettingField.OldList[index].PId == id){
                    SettingField.OldList[index].DisplayOrder = num;
                    return false;
                }
            })
            SettingField.getProductShowList([]);
        });
        //上一页
        $("#btnPrePage1").on("click", function () {
            if (SettingField.bestPageIndex != 1) {
                SettingField.bestPageIndex -= 1;
                SettingField.getProductShowList([]);
            }
        })
        //下一页
        $("#btnNextPage1").on("click", function () {
            if (SettingField.bestPageIndex < SettingField.bestPageNum) {
                SettingField.bestPageIndex += 1;
                SettingField.getProductShowList([]);
            }
        })

        // 保存
        $("#second").on("click", "#submitBtn", function () {
            var Title = $('#Title').val();
            var State = $('input[name="state"]:checked').val();
            var Summary = $('#Summary').val();
            var Type = $('#Type').val();
            var DisplayOrder = $('#sort').val();

            if (!Validate.emptyValidateAndFocus("#Title", "请输入标题名称", "")) {
                return false;
            }
            if ($("#Type").val() == -1) {
                Common.showInfoMsg("请选择类型");
                return false;
            }
            if (SettingField.OldList.length == 0) {
                Common.showInfoMsg("请选择商品");
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#Summary", "请输入简介", "")) {
                return false;
            }
            var Icon = $('#small_icon').attr('data-src');

            if($("#Type").val() == 1){
                //图片验证
                if (Icon == null || Icon == undefined) {
                    Common.showInfoMsg('请先上传图片');
                    return false;
                }
            }

            SettingField.editTopicsInfo(Title,Type,Summary,State,DisplayOrder,Icon);
        })
        //取消
        $("#second").on("click", "#cancelBtn", function () {
            window.location.reload();
        })
    },

    // 更改排序
    ChangeBannerDisplayOrder: function (TId, DisplayOrder) {
        var methodName = "/indexDatas/AdminChangeTopicsInfoDisplayOrder";
        var data = {
            "TopicId": TId,
            "DisplayOrder": DisplayOrder
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("排序成功");
                SettingField.refreshQuery();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //获取详情
    getTopicsInfo: function () {
        var methodName = "/indexDatas/AdminGetTopicsInfo";
        var data = {
            "TopicId": SettingField.topicId
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                $('#small_icon').attr('src', data.Data.AdminTopicsInfos.FullShowImg);
                $('#small_icon').attr('data-src', data.Data.AdminTopicsInfos.ShowImg);
                $('#Type').val(data.Data.AdminTopicsInfos.Type);
                $('#Title').val(data.Data.AdminTopicsInfos.Title);
                $('#Summary').val(data.Data.AdminTopicsInfos.Summary);
                $('#sort').val(data.Data.AdminTopicsInfos.DisplayOrder);
                // 状态
                var stateList = $("#State label");
                for (var i = 0; i < stateList.length; i++) {
                    if (stateList.eq(i).find("input").val() == data.Data.AdminTopicsInfos.State) {
                        stateList.eq(i).find("input").prop("checked", true);
                    }
                }
                var proList1 = [];
                $.each(data.Data.TopicsProductPartInfoList, function (index, value) {
                    proList1.push({
                        PId: value.PId,
                        DisplayOrder: value.DisplayOrder,
                    });
                })
                SettingField.OldList = proList1;

                $("#SpecifyProductBox1").show();
                SettingField.getProductShowList([]);

                if($("#Type").val() == 1){
                    $('#imgBox').show()
                }else{
                    $('#imgBox').hide()
                }

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑详情
    editTopicsInfo:function(Title,Type,Summary,State,DisplayOrder,Icon){
        // var prolist = [];
        // $.each(SettingField.OldList, function (index, value) {
        //     prolist.push(value.PId);
        // })
        var methodName = "/indexDatas/AdminEditTopicsInfo";
        var data = {
            "TopicId": SettingField.topicId,
            "Title": Title,
            "State":  State,
            "ShowImg": Icon,
            "DisplayOrder": DisplayOrder,
            "Summary": Summary,
            "Type": Type,
            "PIdList": SettingField.OldList
        };
        // console.log(data)
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功",function () {
                    window.location.reload();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //获取选中的商品信息表
    getProductShowList: function (list) {
        var methodName = "/product/AdminTopicProductShowList";
        var data = {
            "OldPIdList": SettingField.OldList,
            "NewPIdList": list,
            "Page": {
                "PageSize": 5,
                "PageIndex": SettingField.bestPageIndex
            }
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                if (list.length > 0){
                    // var prolist = [];
                    // $.each(data.Data.TopicProductsInfo.TopicProductsShowList, function (index, value) {
                    //     prolist.push({
                    //         PId: value.PId,
                    //         DisplayOrder: value.DisplayOrder
                    //     });
                    // })
                    SettingField.OldList = SettingField.OldList.concat(list);
                }
                $('#SpecifyProductBox1').show();
                $('#OrdinaryModal').modal('hide');
                SettingField.backProductList(data.Data.TopicProductsInfo);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    backProductList: function (data) {
        var render = template.compile(SettingField.tableTemplate);
        var html = render(data);
        $("#fieldAddTable1").html(html);
        SettingField.bestPageNum = Math.ceil(data.Total / 5);
        // SettingField.bestTotal = data.Total;
        // data.PIdList
        //计算总页数
        $('#bestCurrentIndex').text(SettingField.bestPageIndex);
        $('#totalIndex1').text(SettingField.bestPageNum);
    },

    // 专场列表bootstrapTable
    initBootstrapTable: function () {
        $('#fieldTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/indexDatas/AdminGetTopicsList',
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
            queryParams: SettingField.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class\
            responseHandler: SettingField.responseHandler,
            columns: [
                {
                    field: 'TopicId',
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
                    field: 'Types',
                    title: '类型',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                // {
                //     field: '',
                //     title: '状态',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         return value;
                //     }
                // },
                {
                    field: 'ShowImg',
                    title: '专场主图',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<img src="' + value + '" alt="暂无图片" style ="width: 142px;height: 62px;display: inline-block;">';
                        return html;
                    }
                },
                // {
                //     field: 'DisplayOrder',
                //     title: '排序',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         var html = `<input type="number" style="text-align: center" class="order-disp" data-id="${row.TopicId}" value="${value}">`
                //         return html;
                //     }
                // },
                {
                    field: 'TopicId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = "<span class='status_edit' data-id='" + value + "'>编辑</span>";
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
                $('.caret').remove();
            },
            onLoadError: function (data) {
                $('#fieldTable').bootstrapTable('removeAll');
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
        var methodName = "/indexDatas/AdminGetTopicsList";
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "Name": "",
            "Type": 0,
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.AdminTopicsPartInfoList,
                "total": res.Data.Total
            };
        } else {
            return {
                "rows": [],
                "total": 0
            };
        }
    },
    //表格刷新(先销毁后初始化)
    refreshQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "Name": "",
            };
        } else {
            var obj = parame;
        }
        //方法名
        $('#fieldTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/indexDatas/AdminGetTopicsList',
                query: obj
            }
        );
    },


    //商品列表
    initProBootstrapTable: function () {
        $('#OrdinaryTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/product/AdminGetProductListByType',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $('#pagesize_dropdown').val(),
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
            queryParams: SettingField.queryProParams3, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: SettingField.responseProHandler3,
            columns: [
                {
                    field: 'PId',
                    title: '',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<input type="checkbox" class="checkbox" data-id="' + value + '" style="display: inline-block;">'
                        return html;
                    }
                },
                {
                    field: 'ShowImg',
                    title: '图片',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<img src="' + value + '" style="width: 80px;height: 80px;">'
                        return html;
                    }
                },
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
                    title: '商品价格',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
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
                $('.caret').remove();
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
    queryProParams3: function (params) {
        //配置参数
        //方法名
        var methodName = "/product/AdminGetProductListByType";
        var prolist = [];
        $.each(SettingField.OldList, function (index, value) {
            prolist.push(value.PId);
        })
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "Name": $('#choice_presentName').val(),
            "PIdList": prolist,
            Page: {
                PageSize: params.limit, //页面大小,
                PageIndex: (params.offset / params.limit) + 1, //页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseProHandler3: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.ProductsList,
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
    refreshQuery2: function (parame) {
        //方法名
        var methodName = "/product/AdminGetProductListByType";
        if (parame == "" || parame == undefined) {
            var prolist = [];
            $.each(SettingField.OldList, function (index, value) {
                prolist.push(value.PId);
            })
            var obj = {
                "Name": $('#choice_presentName').val(),
                "PIdList": prolist,
            };
        } else {
            var obj = parame;
        }
        $('#OrdinaryTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格先销毁刷新
    destoryQuery2: function (parame) {
        if (parame == "" || parame == undefined) {
            var prolist = [];
            $.each(SettingField.OldList, function (index, value) {
                prolist.push(value.PId);
            })
            var obj = {
                "Name": $('#choice_presentName').val(),
                "PIdList": prolist,
                Page: {
                    PageSize: $('#pagesize_dropdown').val(), //页面大小,
                    PageIndex: 1, //页码
                }
            };
        } else {
            var obj = parame;
        }
        $('#OrdinaryTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/product/AdminGetProductListByType',
                query: obj
            }
        );
        SettingField.initProBootstrapTable();
    },

}