$(function() {
    MemberList.init();
})

var MemberList = {
    objectTypeTpl: `
      <option data-id="0" selected>请选择</option>
       {{each AdminUserRanksList as value i}}
          <option data-id="{{AdminUserRanksList[i].UserRId}}" >{{AdminUserRanksList[i].Title}}</option>
       {{/each}}
`,
    UId: 0,
    init: function() {

        MemberList.getGrade();

        //每页显示数量
        $("#pagesize_dropdown").on("change", function() {
            MemberList.projectQuery();
        });

        //查询
        $("#search").on("click", function() {
            MemberList.projectQuery();
        });

        //积分明细
        $("body").on("click", ".status_detail", function() {
            var id = $(this).attr("data-id");
            location.href = "/integral/integralDetail?id=" + id;
        });

        //货款明细
        $("body").on("click", ".status_loan", function() {
            var id = $(this).attr("data-id");
            location.href = "/integral/moneyDetail?id=" + id;
        });

        //重置
        $("#clear").on("click", function() {
            $("#userName").val("");
            $("#mobile").val("");
            $("#grade").val("-1");
            $("#start").val("");
            $("#end").val("");
        });

        //查看
        $("body").on("click", ".status_see", function() {
            var UId = $(this).attr("data-id");
            location.href = "/member/memberDetailInfo?UId=" + UId;
        });

        //浏览记录
        $("body").on("click", ".status_record", function() {
            var UId = $(this).attr("data-id");
            location.href = "/member/memberRecord?UId=" + UId;
        });
        $('body').on('click', '.editBtn', function() {
                MemberList.uid = $(this).attr('data-id');
                $('#number').val("")
                $('#myModal').modal('show');
            })
            //点击保存按钮
        $('body').on('click', '#conserve', function() {
            //积分
            if (!Validate.emptyValidateAndFocusAndColor("#number", "请输入积分", "")) {
                return false;
            }
            MemberList.adminEditCredit();
        })
        Common.initLaydateWithTime();
        MemberList.initBootstrapTable();
    },

    //获取会员列表分页当前页数(bootstrap分页插件)
    getCurrentPageIndexWithBootstrap: function() {
        var thisPage = $("#memberTableDiv").find(".fixed-table-pagination").find("ul").find(".active").find("a").text();
        return thisPage;
    },

    //修改积分
    adminEditCredit: function() {
        var methodName = "/user/AdminEditCredit";
        var data = {
            "UId": [MemberList.uid],
            "AddOrReduce": $('input[name=saleState]:checked').val(),
            "PayCredits": $('#number').val(),
            "Remark": $('#remark').val()
        };
        SignRequest.set(methodName, data, function(data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('修改成功', function() {
                    MemberList.refreshQuery()
                    $('#myModal').modal('hide');
                })

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //获取等级
    getGrade: function() {
        var methodName = "/user/AdminUserRanksList";
        var data = {};
        SignRequest.set(methodName, data, function(data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(MemberList.objectTypeTpl);
                var html = render(data.Data);
                $("#grade").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //会员列表bootstrapTable
    initBootstrapTable: function() {
        $('#memberTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/user/AdminUserList',
            dataType: "json",
            striped: true, //使表格带有条纹
            pagination: true, //在表格底部显示分页工具栏
            pageSize: $("#pagesize_dropdown").val(),
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
            queryParams: MemberList.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: MemberList.responseHandler,
            columns: [{
                    field: 'UId',
                    title: '会员编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Avatar',
                    title: '头像',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var html = '<img src="' + value + '" style="border-radius:50%;width: 60px;height: 60px;">';
                        return html;
                    }
                },
                {
                    field: 'NickName',
                    title: '微信昵称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'GenderStr',
                    title: '性别',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'LevelName',
                    title: '会员等级',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Integral',
                    title: '积分',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Amount',
                    title: '货款金额',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'OrderCount',
                    title: '订单数',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'AddTimeStr',
                    title: '注册时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'UId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var html = "";
                        html += "<span class='status_see' data-id='" + value + "'>查看</span>";
                        html += "<span class='status_detail' data-id='" + value + "' style='margin-left: 20px; color:#4E70FB;cursor: pointer'>积分明细</span>";
                        html += '<span class="editBtn"  style="color:#4E70FB;cursor: pointer;margin-left: 20px" data-num="' + row.Credit + '"  data-id="' + value + '" >编辑积分</span>';
                        html += "<span class='status_loan' data-id='" + value + "' style='margin-left: 20px; color:#4E70FB;cursor: pointer'>货款明细</span>";
                        html += "<span class='status_record' data-id='" + value + "' style='margin-left: 20px; color:#4E70FB;cursor: pointer'>浏览记录</span>";
                        return html;
                    }
                }
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
                $('#memberTable').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function(row, tr, flied) {
                // 书写自己的方法

            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function(rows) {

                // for (var i = 0; i < rows.length; i++) {
                //     dishes_list.UserIdsList.push(rows[i].User.Id);
                //     dishes_list.UserOpenIds.push(rows[i].User.OpenId);
                // }

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
    queryParams: function(params) {
        //配置参数
        //方法名
        var methodName = "/user/AdminUserList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "UserName": $("#userName").val(),
            "StartTime": $("#start").val(),
            "EndTime": $("#end").val(),
            "LevelId": $("#grade").attr("data-id"),
            Page: {
                PageSize: params.limit, //页面大小,
                PageIndex: (params.offset / params.limit) + 1, //页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function(res) {
        if (res.Data != null) {
            console.log(res);
            return {
                "rows": res.Data.AdminUserList,
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
    refreshQuery: function(parame) {
        //方法名
        var methodName = "/user/AdminUserList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UserName": $("#userName").val(),
                "StartTime": $("#start").val(),
                "EndTime": $("#end").val(),
                "LevelId": $("#grade").attr("data-id"),
            };
        } else {
            var obj = parame;
        }

        $('#memberTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新（先销毁后初始化）
    projectQuery: function(parame) {
        //方法名
        var methodName = "/user/AdminUserList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "UserName": $("#userName").val(),
                "StartTime": $("#start").val(),
                "EndTime": $("#end").val(),
                "LevelId": $("#grade").attr("data-id"),
                Page: {
                    PageSize: $("#pagesize_dropdown").val(), //页面大小,
                    PageIndex: 1, //页码
                }
            };
        } else {
            var obj = parame;
        }
        $('#memberTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );

        MemberList.initBootstrapTable();
    },
}