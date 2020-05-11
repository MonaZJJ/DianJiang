$(function () {
    distributorList.init();
})

var distributorList = {
    UId: 0,     //分销员id

    // gradeTpl: `
    //     {{each AdminDistributionGradeList as value i}}
    //         <option value="{{AdminDistributionGradeList[i].GradeId}}">{{AdminDistributionGradeList[i].Title}}</option>
    //     {{/each}}
    // `,

    init: function () {
        // 初始化表格
        distributorList.initBootstrapTable();

        // 表格分页每页显示数据
        $("#pagesize_dropdown").on("change", function () {
            distributorList.projectDestroyQuery();
        });
        // 查询按钮点击
        $('body').on('click', '#search', function () {
            distributorList.projectDestroyQuery();
        })
        // 查看分销明细
        $('body').on('click', '.toSubsidiary', function () {
            var id = $(this).attr('data-id');
            location.href = `/distribution/distributionSubsidiary?id=${id}`
        })
        // 查看佣金明细
        $('body').on('click', '.toCommission', function () {
            var id = $(this).attr('data-id');
            location.href = `/distribution/commissionList?id=${id}`
        })

        // 导出按钮点击
        $('body').on('click', '#exportBtn', function () {
            distributorList.exportAdminDistributionList();
        });

    },
    //导出后台分销员列表
    exportAdminDistributionList: function () {
        var methodName = "/sSplitComm/AdminExportDistributionList";
        var data = {
            "UserName": $('#UserName').val(),
            "Type": 0
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('导出成功', function () {
                    location.href = data.Data;
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //bootstrapTable
    initBootstrapTable: function () {
        $('#productTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/sSplitComm/AdminGetSplitterList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
            pageNumber: 1,
            pageList: [10, 20, 50, 100, 200, 500, 1000, 2000],
            idField: "Id", //标识哪个字段为id主键
            showToggle: false, //名片格式
            cardView: false, //设置为True时显示名片（card）布局
            // showColumns: true, //显示隐藏列
            // showRefresh: true, //显示刷新按钮
            singleSelect: false, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: distributorList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: distributorList.responseHandler,
            columns: [
                {
                    field: 'UId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Avatar',
                    title: '头像',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<img src="${value}" alt="" style="width: 60px;height: 60px;display:inline-block;border-radius: 50%;background-color: #f1f1f1;">`;
                        return html;
                    }
                },
                {
                    field: 'UserName',
                    title: '分销员昵称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                // {
                //     field: 'Title',
                //     title: '等级',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         return value;
                //     }
                // },
                {
                    field: 'DistCount',
                    title: '直接下级数',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<span class="status_view toSubsidiary" data-id="${row.UId}" style="margin-right: 15px">${value}</span>`
                        return html;
                    }
                },
                // {
                //     field: 'TwoSubUserCount',
                //     title: '间接下级数',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         return value;
                //     }
                // },
                {
                    field: 'CommAmount',
                    title: '累计获得佣金',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = `<span class="status_view toCommission" data-id="${row.UId}" style="margin-right: 15px">${value}</span>`
                        return html;
                    }
                },
                // {
                //     field: '',
                //     title: '成为分销员时间',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         return value;
                //     }
                // },
                // {
                //     field: 'UId',
                //     title: '操作',
                //     align: 'center',
                //     valign: 'middle',
                //     formatter: function (value, row, index) {
                //         var html = "";
                //         html += `<span class="status_view adjustGradeBtn" data-title="${row.Title}" data-name="${row.NickName}" data-id="${value}" style="margin-left: 10px;"data-toggle="modal" data-target="#myAdjustModal" >调整等级</span>`;
                //         return html;
                //     }
                // }
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
        var methodName = "/sSplitComm/AdminGetSplitterList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "UserName": $('#UserName').val(),
            "Type": 0,
            PageModel: {
                PageSize: params.limit, //页面大小,
                PageIndex: (params.offset / params.limit) + 1, //页码
            }
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
    projectQuery: function (parame) {
        //方法名
        var methodName = "/sSplitComm/AdminGetSplitterList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UserName": $('#UserName').val(),
                "Type": 0,
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
    projectDestroyQuery: function (parame) {
        //方法名
        var methodName = "/sSplitComm/AdminGetSplitterList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UserName": $('#UserName').val(),
                "Type": 0,
                PageModel: {
                    PageSize: $("#pagesize_dropdown").val(), //页面大小,
                    PageIndex: 1, //页码
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
        distributorList.initBootstrapTable();

    },

    // //调整上级列表
    // //bootstrapTable
    // initAdjustBootstrapTable: function () {
    //     $('#superiorTable').bootstrapTable({
    //         method: 'post',
    //         url: SignRequest.urlPrefix + '/Distribution/AdjustDistUserList',
    //         dataType: "json",
    //         striped: true, //使表格带有条纹
    //         pagination: true, //在表格底部显示分页工具栏
    //         pageSize: 10,
    //         pageNumber: 1,
    //         pageList: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
    //         idField: "Id", //标识哪个字段为id主键
    //         showToggle: false, //名片格式
    //         cardView: false, //设置为True时显示名片（card）布局
    //         // showColumns: true, //显示隐藏列
    //         // showRefresh: true, //显示刷新按钮
    //         singleSelect: false, //复选框只能选择一条记录
    //         search: false, //是否显示右上角的搜索框
    //         clickToSelect: true, //点击行即可选中单选/复选框
    //         sidePagination: "server", //表格分页的位置
    //         queryParams: distributorList.queryAdjustParams, //参数
    //         queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
    //         toolbar: "#toolbar", //设置工具栏的Id或者class
    //         responseHandler: distributorList.responseHandlerForAdjust,
    //         columns: [
    //             {
    //                 field: 'DistUserName',
    //                 title: '分销员',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 formatter: function (value, row, index) {
    //                     return value;
    //                 }
    //             },
    //             {
    //                 field: 'Title',
    //                 title: '分销员等级',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 formatter: function (value, row, index) {
    //                     return value;
    //                 }
    //             },
    //             {
    //                 field: 'DistUserId',
    //                 title: '操作',
    //                 align: 'center',
    //                 valign: 'middle',
    //                 formatter: function (value, row, index) {
    //
    //                     var html = `<span class="status_edit setSuperior" data-id="${value}" style="margin-right: 15px">设为上级</span>
    //                                 `
    //
    //
    //                     return html;
    //                 }
    //             }
    //         ], //列
    //         silent: true, //刷新事件必须设置
    //         formatLoadingMessage: function () {
    //             return "请稍等，正在加载中...";
    //         },
    //         formatNoMatches: function () { //没有匹配的结果
    //             return '无符合条件的记录';
    //         },
    //         onLoadSuccess: function (data) {
    //             $('.caret').remove();
    //             $('#currentUser').text(data.info.UserName)
    //             $('#upUser').text(data.info.DistUserName)
    //
    //         },
    //         onLoadError: function (data) {
    //             $('#productTable').bootstrapTable('removeAll');
    //         },
    //         // 1.点击每行进行函数的触发
    //         onClickRow: function (row, tr, flied) {
    //             // 书写自己的方法
    //
    //         },
    //         //2. 点击前面的复选框进行对应的操作
    //         //点击全选框时触发的操作
    //         //点击全选框时触发的操作
    //         onCheckAll: function (rows) {
    //
    //
    //         },
    //         onUncheckAll: function (rows) {
    //
    //         },
    //         //点击每一个单选框时触发的操作
    //         onCheck: function (row) {
    //
    //
    //         },
    //         //取消每一个单选框时对应的操作；
    //         onUncheck: function (row) {
    //             Array.prototype.remove = function (val) {
    //                 var index = this.indexOf(val);
    //                 if (index > -1) {
    //                     this.splice(index, 1);
    //                 }
    //             };
    //
    //         }
    //     });
    // },
    // //bootstrap table post 参数 queryParams
    // queryAdjustParams: function (params) {
    //     //配置参数
    //     //方法名
    //     var methodName = "/Distribution/AdjustDistUserList";
    //
    //     var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    //         "UId": distributorList.UId,
    //         "DistUserName": $('#user').val(),
    //         PageModel: {
    //             PageSize: params.limit,//页面大小,
    //             PageIndex: (params.offset / params.limit) + 1,//页码
    //         }
    //     };
    //     return temp;
    // },
    // // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    // responseHandlerForAdjust: function (res) {
    //     if (res.Data != null) {
    //         console.log(res);
    //         return {
    //             "rows": res.Data.AdjustDistUserList,
    //             "total": res.Data.Total,
    //             "info": res.Data.AdjustDistUserInfo,
    //         };
    //     } else {
    //         return {
    //             "rows": [],
    //             "total": 0
    //         };
    //     }
    // },
    // //表格刷新(直接刷新)
    // AdjustprojectQuery: function (parame) {
    //     //方法名
    //     var methodName = "/Distribution/AdjustDistUserList";
    //
    //     if (parame == "" || parame == undefined) {
    //         var obj = {
    //             "UId": distributorList.UId,
    //             "DistUserName": $('#user').val(),
    //         };
    //     } else {
    //         var obj = parame;
    //     }
    //
    //     $('#superiorTable').bootstrapTable(
    //         "refresh", {
    //             url: SignRequest.urlPrefix + methodName,
    //             query: obj
    //         }
    //     );
    // },
    // //表格刷新(先销毁后初始化)
    // AdjustprojectDestroyQuery: function (parame) {
    //     //方法名
    //     var methodName = "/Distribution/AdjustDistUserList";
    //
    //     if (parame == "" || parame == undefined) {
    //         var obj = {
    //             "UId": distributorList.UId,
    //             "DistUserName": $('#user').val(),
    //             PageModel: {
    //                 PageSize: $("#pagesize_dropdown").val(),//页面大小,
    //                 PageIndex: 1,//页码
    //             }
    //         };
    //     } else {
    //         var obj = parame;
    //     }
    //
    //     $('#superiorTable').bootstrapTable(
    //         "destroy", {
    //             url: SignRequest.urlPrefix + methodName,
    //             query: obj
    //         }
    //     );
    //
    //     distributorList.initBootstrapTable();
    //
    // }
}