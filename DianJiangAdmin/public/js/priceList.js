var priceList = {
    init:function(){
        priceList.initBootstrapTable();
        //全选
        $("#check_delete_all").on("change",function(){
            if($(this).is(':checked')){
                $(".checkbox").prop("checked",true);
            }
            else{
                $(".checkbox").prop("checked",false);
            }
        });
        //单个点击删除
        $('body').on('click','.status_delete',function(){
            var id = $(this).attr('data-id');
            var Rid = [];
            Rid.push(id);
            Common.confirmDialog('确认要删除?',function(){
                priceList.delAttributeGroup(Rid);
            })
        });
        //多个删除
        $("#all_delte_box").on("click",function(){
            Common.confirmDialog("确认对选中的数据进行删除吗？",function(){
                priceList.delAttributeGroup(priceList.getSelectedData());
            });
        });
        //排序更改
        $('body').on('change','.order-disp',function(){
            var Rid = $(this).attr('data-id');
            var DisplayOrder = $(this).val();
            priceList.changeDisplayOrder(Rid,DisplayOrder);
        });

    },

    // 获取选中的数据
    getSelectedData:function(){
        var list = $("#orderBox .checkbox");
        var RId = [];
        for(var i=0;i<list.length;i++){
            if(list.eq(i).is(':checked')){
                RId.push(list.eq(i).attr("data-pid"));
            }
        }
        return RId;
    },
    //删除接口
    delAttributeGroup:function(id){
        var methodName = "/ranges/AdminDelRangesInfo";
        var data = {
            "RecordIdList": id
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                Common.showSuccessMsg('删除成功',function(){
                    priceList.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //更改排序
    changeDisplayOrder:function (rid,DisplayOrder) {
        var methodName = "/ranges/AdminEditRangesDisplayOrder";
        var data = {
            "RecordId": rid,
            "DisplayOrder": DisplayOrder
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('排序成功',function(){
                    priceList.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //bootstrapTable
    initBootstrapTable: function () {
        $('#orderBox').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/ranges/AdminGetRangesList',
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
            queryParams: priceList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: priceList.responseHandler,
            columns: [
                {
                    field: 'RecordId',
                    title: '',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<input type="checkbox" class="checkbox" data-pid="' + value + '">';
                        return html;
                    }
                },
                {
                    field: 'RecordId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'Name',
                    title: '折扣名称',
                    align: 'center',
                    valign: 'middle',
                },
                {
                    field: 'DisplayOrder',
                    title: '显示顺序',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html ='<input type="number" class="order-disp" data-id="'+row.RecordId+'" value="'+value+'">';
                        return html;
                    }
                },
                {
                    field: 'RecordId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html ='<a  href="/classify/priceEdit?id=' + value + '" class="status_edit" style="margin-right: 15px">编辑</a>' +
                            '<span class="status_delete" data-id="' + value + '">删除</span>';
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
                // $('.amount').html(data.amount);
                // $('.number2').html(data.total)
                $('.caret').remove();
            },
            onLoadError: function (data) {
                $('#orderBox').bootstrapTable('removeAll');
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
        var methodName = "/ranges/AdminGetRangesList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "Name": "",
            "Type": 1,
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            },
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.AdminRangesPartInfoList,
                "total": res.Data.Total,
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
                "Name": "",
                "Type": 1,
            };
        } else {
            var obj = parame;
        }
        $('#orderBox').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/ranges/AdminGetRangesList',
                query: obj
            }
        );

    },
    //表格先销毁刷新
    projectDestoryQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "Name": "",
                "Type": 1,
                Page: {
                    PageSize: 10,//页面大小,
                    PageIndex: 1,//页码
                },
            };
        } else {
            var obj = parame;
        }
        $('#orderBox').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/ranges/AdminGetRangesList',
                query: obj
            }
        );
        priceList.initBootstrapTable();
    },
};

$(function () {
    priceList.init();
});