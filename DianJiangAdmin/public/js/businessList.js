$(function() {
    MemberList.init();
})

var MemberList = {
    sid: 0,
    init: function() {
        //添加模态框
        $("#addItem").click(function() {
            $("#addBusiness").modal("show");
        });

        //添加
        $("#submitBtn").click(function() {

            if (!Validate.emptyValidateAndFocus("#addName", "请输入联系人", "")) {
                return false;
            }

            if (!Validate.emptyValidateAndFocus("#addPhone", "请输入联系方式", "")) {
                return false;
            }

            if (!Validate.emptyValidateAndFocus("#addCompany", "请输入单位", "")) {
                return false;
            }

            if (!Validate.emptyValidateAndFocus("#addDistance", "请输入经营范围", "")) {
                return false;
            }

            if (!Validate.emptyValidateAndFocus("#addWay", "请输入合作方式", "")) {
                return false;
            }

            if (!Validate.emptyValidateAndFocus("#addBrand", "请输入品牌名称", "")) {
                return false;
            }

            MemberList.addMember();
        });


        //编辑
        $("body").on("click", ".status_edit", function() {
            $("#editBusiness").modal("show");
            MemberList.sid = $(this).attr("data-id");
            MemberList.getMember(MemberList.sid);
        });

        //编辑
        $("#editBtn").click(function() {
            MemberList.editMember();
        });

        //每页显示数量
        $("#pagesize_dropdown").on("change", function() {
            MemberList.projectQuery();
        });

        //查询
        $("#search").on("click", function() {
            MemberList.projectQuery();
        });

        //重置
        $("#clear").on("click", function() {
            $("#userName").val("");
            $("#mobile").val("");
            $("#grade").val("-1");
            $("#start").val("");
            $("#end").val("");
        });

        //点击通过
        $("body").on("click", ".status_pass", function() {
            var id = $(this).attr("data-id");
            Common.confirmDialog("确认通过该申请吗？",function () {
                MemberList.passMember(id);
            })
        });

        //点击不通过
        $("body").on("click", ".status_refuse", function() {
            var id = $(this).attr("data-id");
            Common.confirmDialog("确认拒绝该申请吗？",function () {
                MemberList.refuseMember(id);
            })
        });

        //删除
        $("#memberTable").on("click", ".status_delete", function() {
            var SId = [$(this).attr("data-id")];
            Common.confirmDialog("确认删除该门店吗？", function() {
                MemberList.deleteMember(SId);
            });
        });

        MemberList.initBootstrapTable();
    },

    //获取会员列表分页当前页数(bootstrap分页插件)
    getCurrentPageIndexWithBootstrap: function() {
        var thisPage = $("#memberTableDiv").find(".fixed-table-pagination").find("ul").find(".active").find("a").text();
        return thisPage;
    },

    //通过接口
    passMember: function(id) {
        var methodName = "/user/AdminEditorSuppliersStatus";
        var data = {
            "SId": id,
            "CheckState": 1,
            "Remark": ""
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("设置成功", function() {
                    MemberList.refreshQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //不通过接口
    refuseMember: function(id) {
        var methodName = "/user/AdminEditorSuppliersStatus";
        var data = {
            "SId": id,
            "CheckState": 2,
            "Remark": ""
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("设置成功", function() {
                    MemberList.refreshQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //删除接口
    deleteMember: function(id) {
        var methodName = "/user/AdminDelSupplier";
        var data = {
            "SId": id
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("删除成功", function() {
                    MemberList.projectQuery();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //详情接口
    getMember: function(id) {
        var methodName = "/user/AdminSupplierInfo";
        var data = {
            "SId": id
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                $("#editCompany").val(data.Data.Company);
                $("#editName").val(data.Data.Name);
                $("#editPhone").val(data.Data.Mobile);
                $("#editDistance").val(data.Data.BusinessScope);
                $("#editWay").val(data.Data.CooperationMode);
                $("#editBrand").val(data.Data.BrandName);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑接口
    editMember: function(id) {
        var methodName = "/user/AdminEditSupplier";
        var data = {
            "ShareId": MemberList.sid,
            "Name": $("#editName").val(),
            "Mobile": $("#editPhone").val(),
            "Company": $("#editCompany").val(),
            "BusinessScope": $("#editDistance").val(),
            "CooperationMode": $("#editWay").val(),
            "BrandName": $("#editBrand").val()
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功", function() {
                    MemberList.refreshQuery();
                    $("#editBusiness").modal("hide");
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //添加接口
    addMember: function(id) {
        var methodName = "/user/AdminAddSupplier";
        var data = {
            "Mobile": $("#addPhone").val(),
            "Name": $("#addName").val(),
            "Company": $("#addCompany").val(),
            "BusinessScope": $("#addDistance").val(),
            "CooperationMode": $("#addWay").val(),
            "BrandName": $("#addBrand").val(),
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("添加成功", function() {
                    MemberList.projectQuery();
                    $("#addBusiness").modal("hide");
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //会员列表bootstrapTable
    initBootstrapTable: function() {
        $('#memberTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/user/AdminSupplierList',
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
                    field: 'SId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Company',
                    title: '单位全称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Name',
                    title: '供应商',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Mobile',
                    title: '手机',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },

                {
                    field: 'BusinessScope',
                    title: '经营范围',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'CooperationMode',
                    title: '合作方式',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'BrandName',
                    title: '品牌名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Remark',
                    title: '备注',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'StateDes',
                    title: '审核状态',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'CreateTimeStr',
                    title: '创建时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'SId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {
                        var html = "";
                        if (row.State == 0) {
                            html += "<span class='status_pass' data-id='" + value + "' style='margin-right:20px;'>通过</span>";
                            html += "<span class='status_refuse' data-id='" + value + "' style='margin-right:20px;'>拒绝</span>";
                        }
                        html += "<span class='status_edit' data-id='" + value + "' style='margin-right:20px;'>编辑</span>";
                        html += "<span class='status_delete' data-id='" + value + "'>删除</span>";
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
        var methodName = "/user/AdminSupplierList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            "Company": $("#company").val(),
            "Mobile": $("#phone").val(),
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
                "rows": res.Data.AdminSupplierList,
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
        var methodName = "/user/AdminSupplierList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "Company": $("#company").val(),
                "Mobile": $("#phone").val(),
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
        var methodName = "/user/AdminSupplierList";

        if (parame == "" || parame == undefined) {
            var obj = {
                "Company": $("#company").val(),
                "Mobile": $("#phone").val(),
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