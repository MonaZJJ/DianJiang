$(function() {
    editspecialSetting.init();

})

var editspecialSetting = {
    BestList: [],
    NewList: [],
    NewPageIndex: 1,
    BestPageIndex: 1,
    BestTotalIndex: 0,
    NewTotalIndex: 0,

    //表格模板
    tableTemplate: `
                                <tbody>
                                    <tr>
                                        <th>商品名称</th>
                                        <th>原价</th>                                      
                                        <th>操作</th>
                                    </tr>
                                    {{each TopicProductsShowList as value i }}
                                        <tr name="appendlist" style="display: table-row;">
                                            <td>{{TopicProductsShowList[i].Name}}</td>
                                            <td>¥{{TopicProductsShowList[i].CostPrice}}</td>
                                            <td>
                                                <input type="hidden" value="204" id="hidProduct_204">
                                                <span class="icon_close icon_close_pro" data-id="{{TopicProductsShowList[i].PId}}" data-type="{{Type}}"></span>
                                            </td>
                                        </tr>
                                    {{/each}}
                                </tbody>
    `,
    init: function() {
        //上传小图标
        uploadIconPic('#small_upload_pick', '#small_icon', '/topics/AdminUploadTopicsInfoImg');
        // editspecialSetting.initProBootstrapTable();
        //获取Id
        var TopicId = Common.getUrlParam("id");
        //获取轮播信息 
        editspecialSetting.adminGetTopicsInfo(TopicId);
        //选择商品模态框出现获取数据


        // 分页条数设置
        $("#pagesize_dropdown").on("change", function () {
            editspecialSetting.projectDestoryQuery3();
        });
        $('#OrdinaryModal').on('shown.bs.modal', function() {
            editspecialSetting.type = $(this).attr('data-type');
            editspecialSetting.initProBootstrapTable()
        });
        //商品查询
        $('body').on('click', '#prosearchBtn', function() {
            editspecialSetting.projectProQuery();
        })

        //专场查询
        $('body').on('click', '#performanceBtn', function() {
                editspecialSetting.projectPerformanceQuery();
            })
            //品牌查询
        $('body').on('click', '#BrandBtn', function() {
            editspecialSetting.projectQuery();
        })

        // 选择商品确认按钮点击
        $('body').on('click', '#confirmBtn', function() {
            var list = [];
            $('.checkbox').each(function(index, item) {
                if (this.checked) {
                    list.push($(item).attr('data-id'));
                }
            });
            if (list.length > 0) {
                editspecialSetting.couponProductShowList(list);
            } else {
                Common.showInfoMsg('请选择商品');
                return false;
            }
        });
        $('body').on('click', '#btnPrePage1', function () {
            //获取当前页面
            var PageIndex = editspecialSetting.BestPageIndex;
            if (PageIndex > 1) {
                //大于一才减
                editspecialSetting.BestPageIndex = PageIndex - 1;
                //调用获取数据的接口
                editspecialSetting.couponProductShowList([], 2);
            } else {
                return false;
            }
        });
        $('body').on('click', '#btnNextPage1', function () {
            //获取当前页面
            var PageIndex = editspecialSetting.BestPageIndex;
            //算一个总页数
            var totalIndex = editspecialSetting.BestTotalIndex;
            if (PageIndex < totalIndex) {
                //不大于总页数才增加
                editspecialSetting.BestPageIndex = PageIndex + 1;
                //调用获取数据的接口
                editspecialSetting.couponProductShowList([], 2);
            } else {
                return false;
            }
        });
        //商品删除按钮点击
        $('body').on('click', '.icon_close_pro', function () {
            var id = $(this).attr('data-id');
            var type =2;
            if (type == 2) {
                var BestList = editspecialSetting.BestList;
                var Index = 0;
                BestList.forEach(function (item, index) {
                    if (item == id) {
                        Index = index
                    }
                })
                BestList.splice(Index, 1)
                editspecialSetting.BestList = BestList
            } else {
                var NewList = editspecialSetting.NewList;
                var Index = 0;
                NewList.forEach(function (item, index) {
                    if (item == id) {
                        Index = index
                    }
                })
                NewList.splice(Index, 1)
                editspecialSetting.NewList = NewList;
            }
            editspecialSetting.couponProductShowList([], type);
        });

        //保存按钮点击
        $('body').on('click', '#nextStep', function() {
            var Title = $('#Title').val();
            var Summary = $('#Summary').val();
            var Type = $('#Type').val();
            var State = $('input[name="state"]:checked').val();
            var DisplayOrder = $('#sort').val();
            var Img = $('#small_icon').attr('data-src');

            //图片验证
            if (Img == null || Img == undefined) {
                Common.showInfoMsg('请先上传图片')
                return false;
            }
            if (!Validate.emptyValidateAndFocus("#Summary", "请输入简介", "")) {
                return false;
            }
            //排序验证
            if (!Validate.emptyValidateAndFocus("#sort", "请输入排序", "")) {
                return false;
            }
            // 调用编辑接口这个方法
            editspecialSetting.adminEditTopicsInfo(TopicId, Title, Type, State, DisplayOrder, Img, Summary);
        });

    },
    //获取编辑接口
    adminEditTopicsInfo: function(TopicId, Title, Type, State, DisplayOrder, Img, Summary) {
        //请求方法
        var data = {
            "TopicId": TopicId,
            "Title": Title,
            "State": State,
            "Type": Type,
            "DisplayOrder": DisplayOrder,
            "ShowImg": Img,
            "Summary": Summary,
            "PIdList": editspecialSetting.BestList
        };
        //请求方法
        var methodName = "/topics/AdminEditTopicsInfo";

        //请求接口
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('编辑成功', function() {
                    location.href = '/product/SpecialSetting'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取轮播信息     
    adminGetTopicsInfo: function(TopicId) {
        var methodName = "/topics/AdminGetTopicsInfo";
        var data = {
            "TopicId": TopicId,
        }
        SignRequest.set(methodName, data, function(data) {
            console.log(data)
            if (data.Code == "100") {
                $('#small_icon').attr('src', data.Data.AdminTopicsInfos.FullShowImg);
                $('#small_icon').attr('data-src', data.Data.AdminTopicsInfos.ShowImg);

                $('#Type').val(data.Data.AdminTopicsInfos.Type)
                $('#Title').val(data.Data.AdminTopicsInfos.Title)
                $('#Summary').val(data.Data.AdminTopicsInfos.Summary)
                $('#sort').val(data.Data.AdminTopicsInfos.DisplayOrder)
                    // 状态
                var stateList = $("#State label");
                for (var i = 0; i < stateList.length; i++) {
                    if (stateList.eq(i).find("input").val() == data.Data.AdminTopicsInfos.State) {
                        stateList.eq(i).find("input").prop("checked", true);
                    }
                }
                var proList1 = [];
                $.each(data.Data.TopicsProductPartInfoList, function(index, value) {
                    proList1.push(value.PId);
                })
                editspecialSetting.BestList = proList1;

                $("#SpecifyProductBox1").show();
                editspecialSetting.couponProductShowList([], 2);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    backProductList: function(data, id) {
        var render = template.compile(editspecialSetting.tableTemplate);
        var html = render(data);
        $(id).html(html);
        editspecialSetting.BestTotalIndex = Math.ceil(data.Total / 5);
        editspecialSetting.BestList = data.PIdList;
        //计算总页数
        $('#bestCurrentIndex').text(editspecialSetting.BestPageIndex);
        $('#totalIndex1').text(editspecialSetting.BestTotalIndex);

    },
    couponProductShowList: function(list, type) {
        //请求方法
        console.log(list, type, editspecialSetting.BestList, editspecialSetting.NewList)
        var type = type ? type : editspecialSetting.type
        var methodName = "/product/AdminTopicProductShowList";
        var data = {
            "OldPIdList": type == 2 ? editspecialSetting.BestList : editspecialSetting.NewList,
            "NewPIdList": list,
            "Type": type,
            "Page": {
                "PageSize": 5,
                "PageIndex": type == 2 ? editspecialSetting.BestPageIndex : editspecialSetting.NewPageIndex
            }
        };

        console.log(data)
            //请求接口
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                $('#SpecifyProductBox1').show();
                $('#OrdinaryModal').modal('hide');
                editspecialSetting.backProductList(data.Data.TopicProductsInfo, "#fieldAddTable1");


            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //商品列表
    initProBootstrapTable: function() {
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
            queryParams: editspecialSetting.queryProParams3, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: editspecialSetting.responseProHandler3,
            columns: [{
                    field: 'PId',
                    title: '',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var html = '<input type="checkbox" class="checkbox" data-id="' + value + '"  style="display: inline-block;">'
                        return html;
                    }
                },
                {
                    field: 'ShowImg',
                    title: '图片',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var html = '<img src="' + value + '" style="width: 80px;height: 80px;">'
                        return html;
                    }
                },
                {
                    field: 'Name',
                    title: '商品',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return `<span class="goods_name_modal">${value}</span>`;
                    }
                },
                {
                    field: 'ShopPrice',
                    title: '商品价格',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
            ], //列
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function() {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function() { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function(data) {
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function(data) {
                $('#recoveryTable').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function(row, tr, flied) {
                // 书写自己的方法

            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function(rows) {


            },
            onUncheckAll: function(rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function(row) {


            },
            //取消每一个单选框时对应的操作；
            onUncheck: function(row) {
                Array.prototype.remove = function(val) {
                    var index = this.indexOf(val);
                    if (index > -1) {
                        this.splice(index, 1);
                    }
                };

            }
        });
    },
    //bootstrap table post 参数 queryParams
    queryProParams3: function(params) {
        //配置参数
        //方法名
        var methodName = "/product/AdminGetProductListByType";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "Type": editspecialSetting.type || 0,
            "Name": $('#choice_presentName').val(),
            "PIdList": editspecialSetting.type == 2 ? editspecialSetting.BestList : editspecialSetting.NewList,

            Page: {
                PageSize: params.limit, //页面大小,
                PageIndex: (params.offset / params.limit) + 1, //页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseProHandler3: function(res) {
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
    projectProQuery: function(parame) {
        //方法名
        var methodName = "/product/AdminGetProductListByType";

        if (parame == "" || parame == undefined) {
            var obj = {
                "Name": $('#Name').val(),
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
    projectDestoryQuery3: function(parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "Name": $('#Name').val(),
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
        editspecialSetting.initProBootstrapTable();
    },



}