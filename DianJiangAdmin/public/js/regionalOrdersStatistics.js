var Equipment = {
    start:"",
    end:"",

    //区域列表
    areaTemplate: `
            <option selected="selected" value="0">请选择区域</option>
            {{each List as value i}}
                <option value="{{List[i].RegionId}}">{{List[i].Name}}</option>
            {{/each}}
`,
    init:function () {

        // $('#daterange').val(moment().subtract('days', 30).format('YYYY/MM/DD') + ' - ' + moment().format('YYYY/MM/DD'));
        $('#daterange').daterangepicker({
            locale: {
                format: 'YYYY/MM/DD', //设置显示格式
                separator: " - ",
                fromLabel: '开始日期',
                toLabel: '结束日期',
            },
            // maxDate: new Date(new Date().getFullYear() + '/' + (new Date().getMonth() + 1) + '/' + (new Date().getDate() + 1)), //双日历允许最大的结束日期
            maxDate: moment(new Date(new Date().getTime() + 24*60*60*1000)), //双日历允许最大的结束日期
            opens: 'left', //日历与输入框的对其方式,当前为右对齐
            showDropdowns: true, //这个属性可以实现下拉选择年
            minDate: "2014/12/01"
        }, function (start, end, label) {
            $('#daterange').val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
            var startTime = start.format('YYYY-MM-DD');
            var endTime = end.format('YYYY-MM-DD');
            Equipment.start = startTime;
            Equipment.end = endTime;
            Equipment.projectQuery();
        });

        //收缩效果
        $(".img_toggle").click(function () {
            $(this).parents().next(".row").find('.chart_1').slideToggle();
            $(this).children().toggle();
        })

        $("#area").on("change",function () {
            Equipment.projectQuery();
        })

        $(".export").on("click",function () {
            Equipment.exportAdminRegionOrderData();
        })

        Equipment.getStoreRegions();
        Equipment.initBootstrapTable();

    },

    //导出
    exportAdminRegionOrderData:function(){
        //请求方法
        var methodName = "/statistics/ExportAdminRegionOrderData";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                location.href = data.Data;

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    // 获取区域列表
    getStoreRegions:function(){
        //请求方法
        var methodName = "/statistics/AdminGetStoreRegions";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(Equipment.areaTemplate);
                var html = render(data.Data);
                $('#area').html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //bootstrapTable
    initBootstrapTable: function () {
        $('#statisticsTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/statistics/AdminGetRegionOrderData',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: false, //在表格底部显示分页工具栏
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
            queryParams: Equipment.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: Equipment.responseHandler,
            columns: [
                {
                    field: 'Name',
                    title: '区域名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StoreCount',
                    title: '门店数',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'OrderCount',
                    title: '订单数',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'OrderAmount',
                    title: '销售额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return "¥"+value;
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
                $('#statisticsTable').bootstrapTable('removeAll');
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
    queryParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/statistics/AdminGetRegionOrderData";
        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            RegionId:$("#area").val(),
            StartTime: Equipment.start,
            EndTime: Equipment.end,
            // Page: {
            //     PageSize: params.limit,//页面大小,
            //     PageIndex: (params.offset / params.limit) + 1,//页码
            // }
        };

        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.List,
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
        var methodName = "/statistics/AdminGetRegionOrderData";

        if (parame == "" || parame == undefined) {
            var obj = {
                RegionId:$("#area").val(),
                StartTime: Equipment.start,
                EndTime: Equipment.end,
            };
        } else {
            var obj = parame;
        }

        $('#statisticsTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新(先销毁后初始化)
    projectQuery: function (parame) {
        //方法名
        var methodName = "/statistics/AdminGetRegionOrderData";

        if (parame == "" || parame == undefined) {
            var obj = {
                RegionId:$("#area").val(),
                StartTime: Equipment.start,
                EndTime: Equipment.end,
                // Page: {
                //     PageSize: 10,//页面大小,
                //     PageIndex: 1,//页码
                // }
            };
        } else {
            var obj = parame;
        }

        $('#statisticsTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );

        Equipment.initBootstrapTable();

    }
}

$(function () {
    Equipment.init();
})