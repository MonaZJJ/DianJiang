$(function () {
    Index.init();
});
var Index = {
    indexBoxTpl: `                        
           <div class="chart-box">
                    <div>
                        <div class="row">
                            <div class="" style="height:30px;overflow:hidden" >
                                <div class="tab-pane active col-md-7 col-sm-12 col-xs-12">
                                    <ul class="nav nav-tabs subChart-type">
                                        <li class="active">
                                            <a data-typeTemp="1">订单金额趋势图(已付款)</a>
                                        </li>                                      
                                    </ul>
                                </div>
                            </div>
                            <div class="row col-md-3 col-sm-12 col-xs-12 timeTemp" style="margin-top: 20px;">
                                <label class="time-input checkbox-inline" data-tip="0">
                                    <input type="radio" checked="checked" name="dataSelect">
                                    最近3天
                                </label>
                                <label class="time-input checkbox-inline" data-tip="1">
                                    <input type="radio" name="dataSelect">
                                    最近7天
                                </label>
                                <label class="time-input checkbox-inline" data-tip="2">
                                    <input type="radio" name="dataSelect">
                                    最近30天
                                </label>
                            </div>
                        </div>
                    </div>
                    <div id="index_order_amount" style="width:100%;height:420px;"></div>                
                </div>
                
               
  `,
    indexBox2Tpl: `
           <div class="chart-box">
                    <div>
                        <div class="row">
                            <div class="" style="height:30px;overflow:hidden" >
                                <div class="tab-pane active col-md-7 col-sm-12 col-xs-12">
                                    <ul class="nav nav-tabs subChart-type">
                                        <li class="active">
                                           <a data-typeTemp="2">客户下单趋势图(已付款)</a>
                                        </li>                                     
                                    </ul>
                                </div>
                            </div>
                            <div class="row col-md-3 col-sm-12 col-xs-12 timeTemp2" style="margin-top: 20px;">
                                <label class="time-input2 checkbox-inline" data-tip2="0">
                                    <input type="radio" checked="checked" name="select">
                                    最近3天
                                </label>
                                <label class="time-input2 checkbox-inline" data-tip2="1">
                                    <input type="radio" name="select">
                                    最近7天
                                </label>
                                <label class="time-input2 checkbox-inline" data-tip2="2">
                                    <input type="radio" name="select">
                                    最近30天
                                </label>
                            </div>
                        </div>
                    </div>                   
                    <div id="index_order_time" style="width:100%;height:420px;"></div>   
                </div>    
    `,

    EndTime: Date.parse(new Date()) / 1000,
    StartTime: Date.parse(new Date()) / 1000 - 24 * 60 * 60 * 3,
    init: function () {
        Index.AdminGetIndexDataInfo();
        setTimeout(function () {
            Index.AdminGetIndexOrderAmountTrend();
            Index.AdminGetIndexOrderCountTrend();
        }, 300)


        //选择时间更换数据
        $("#indexBox").on("click", ".time-input", function () {
            Index.get_time($(this).attr("data-tip"));
            Index.AdminGetIndexOrderAmountTrend();
        });

        //选择时间更换数据
        $("#indexBox2").on("click", ".time-input2", function () {
            Index.get_time($(this).attr("data-tip2"));
            Index.AdminGetIndexOrderCountTrend();
        });
    },
    //页面设置
    AdminGetIndexDataInfo: function () {
        var render = template.compile(Index.indexBoxTpl);
        var html = render();
        $('#indexBox').html(html);
        var render = template.compile(Index.indexBox2Tpl);
        var html2 = render();
        $('#indexBox2').html(html2);
    },
    //获取订单金额趋势数据
    AdminGetIndexOrderAmountTrend: function () {
        //请求方法
        var methodName = "/statistics/AdminGetIndexOrderAmountTrend";
        var data = {
            StartTime: Index.StartTime,
            EndTime: Index.EndTime
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                if (data.Data.List.length > 0) {

                    var Data_list = (Index.HandleEcharts(data));
                    Index.UpdateIndexOrderAmount(Data_list, data.Data, "订单金额趋势(已付款)");
                } else {
                    var index_order_amount_obj = document.getElementById('index_order_amount');
                    if (index_order_amount_obj != null) {
                        var index_order_amount = echarts.init(index_order_amount_obj);
                        index_order_amount.clear();
                    }
                }
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //获取客户下单趋势数据
    AdminGetIndexOrderCountTrend: function () {
        //请求方法
        var methodName = "/statistics/AdminGetIndexOrderCountTrend";
        var data = {
            StartTime: Index.StartTime,
            EndTime: Index.EndTime
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                if (data.Data.List.length > 0) {

                    var Data_list = (Index.HandleEcharts(data));
                    Index.UpdateIndexOrderAmountBus(Data_list, data.Data, "客户下单趋势图(已付款)");
                } else {
                    var index_order_amount_obj = document.getElementById('index_order_time');
                    if (index_order_amount_obj != null) {
                        var index_order_amount = echarts.init(index_order_amount_obj);
                        index_order_amount.clear();
                    }
                }
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //更新数据图表视图
    UpdateIndexOrderAmount: function (Data, ExData, Type) {
        option_curve = {
            title: {
                text: Type,
                textStyle: { //标题内容的样式
                    color: '#216fac', //京东红
                    fontStyle: 'normal', //主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
                    fontWeight: "lighter", //可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                    fontSize: 16 //主题文字字体大小，默认为18px
                },
                left: "center"
            },
            color: ['#347fd5', '#facd89', '#ff2c53', '#479ac8', '#666666', '#dfebde', '#ffe8c4', '#ff728c', '#82d2ff', '#bebebe', '#82d2ff', '#ed99ff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: Data.dataList_Name,
                right: 0,
                top: "center"
            },
            grid: {
                left: '3%',
                right: '14%',
                bottom: '16%',
                top: "8%",
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: Data.dateList,
            }],
            yAxis: [{
                axisLine: {
                    show: false,
                },
                type: 'value'
            }],
            series: Data.Series_list
        };
        var index_order_amount_obj = document.getElementById('index_order_amount');
        if (index_order_amount_obj != null) {
            var index_order_amount = echarts.init(index_order_amount_obj);
        } else {
            return;
        }
        index_order_amount.setOption(option_curve);
    },

    UpdateIndexOrderAmountBus: function (Data, ExData, Type) {
        option_curve = {
            title: {
                text: Type,
                textStyle: { //标题内容的样式
                    color: '#216fac', //京东红
                    fontStyle: 'normal', //主标题文字字体风格，默认normal，有italic(斜体),oblique(斜体)
                    fontWeight: "lighter", //可选normal(正常)，bold(加粗)，bolder(加粗)，lighter(变细)，100|200|300|400|500...
                    fontSize: 16 //主题文字字体大小，默认为18px
                },
                left: "center"
            },
            color: ['#347fd5', '#facd89', '#ff2c53', '#479ac8', '#666666', '#dfebde', '#ffe8c4', '#ff728c', '#82d2ff', '#bebebe', '#82d2ff', '#ed99ff'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: Data.dataList_Name,
                right: 0,
                top: "center"
            },
            grid: {
                left: '3%',
                right: '14%',
                bottom: '16%',
                top: "8%",
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                data: Data.dateList,
            }],
            yAxis: [{
                axisLine: {
                    show: false,
                },
                type: 'value'
            }],
            series: Data.Series_list
        };
        var index_order_amount_obj = document.getElementById('index_order_time');
        if (index_order_amount_obj != null) {
            var index_order_amount = echarts.init(index_order_amount_obj);
        } else {
            return;
        }
        index_order_amount.setOption(option_curve);
    },

    //处理echarts的方法
    HandleEcharts: function (data) {
        console.log(data)
        var Data_List = {};
        //名字列表
        var dataList_Name = [];
        data.Data.List.forEach(function (item, index) {
            dataList_Name.push(item.DataName);
        })
        // //日期
        var dateList = [];
        data.Data.List[0].DataList.forEach(function (item, index) {
            //日期
            dateList.push(item.Date);
        })
        console.log(dateList)
        //名字列表
        Data_List.dataList_Name = dataList_Name;
        //日期
        Data_List.dateList = dateList;
        //series的数据
        var Series_list = []
        data.Data.List.forEach(function (item, index) {
            var Item = {};
            var arr = [];

            Item.name = $(item)[0].DataName;
            Item.type = 'line';
            Item.stack = '总量';
            $(item)[0].DataList.forEach(function (item2, index) {
                arr.push($(item2)[0].Value)
            })
            Item.data = arr;
            Series_list.push(Item);
        })
        //把series的数据加进去
        Data_List.Series_list = Series_list;
        //把对象返回
        return Data_List;
    },

    //获取时间
    get_time: function (whicht) {
        // 获取当前时间戳(以s为单位)
        Index.EndTime = Date.parse(new Date()) / 1000;
        if (whicht == "0") {
            Index.StartTime = Index.EndTime - 24 * 60 * 60 * 3;
        } else if (whicht == "1") {
            Index.StartTime = Index.EndTime - 24 * 60 * 60 * 7;
        } else if (whicht == "2") {
            Index.StartTime = Index.EndTime - 24 * 60 * 60 * 30;
        }
    },

}