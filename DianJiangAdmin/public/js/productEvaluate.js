$(function () {
    ProductEvaluate.init();
})

var ProductEvaluate = {
    init: function () {
        // 日期控件初始化
        Common.initLaydateWithTime();

        ProductEvaluate.initBootstrapTable();
        //重置按钮点击
        $('body').on('click','#resetBtn',function(){
            $('#PName').val("");
            $('#start').val("");
            $('#end').val("");
        })

        //    点击查询按钮
        $(".tab-content").on("click", "#search", function () {
            var data = {
                "PName": $("#PName").val(),
                "StartTime": $("#start").val(),
                "EndTime": $("#end").val(),
            }
            ProductEvaluate.projectQuery(data);
        })
        //点击删除
        $('.tab-content').on('click', '.status_delete', function () {
            var id = $(this).attr('data-id');
            Common.confirmDialog('是否删除该评价', function () {
                ProductEvaluate.adminDelEvaluate(id);

            })

        });
        // 关闭弹窗
        $(".mask").on("click", ".close", function () {
            $(".mask").hide();
        });
        //    点击列表中的回复
        $(".tab-content").on("click", ".status_reply", function () {
            var pid = $(this).attr('data-id');
            ProductEvaluate.ShowProductReviews(pid);
        })
        //提交回复按钮
        $(".mask").on("click", "#replyBtn", function () {
            var reviewId = $(this).attr('data-id');
            var replyMessage = $("#remark").val();
            ProductEvaluate.replyProductReviews(reviewId, replyMessage);
        })
    },

    //删除评价
    adminDelEvaluate: function (id) {
        //请求方法
        var methodName = "/product/AdminDelProductReviews";
        var data = {
            "ReviewId": id
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('删除成功', function () {
                    //删除成功之后刷新表格
                    ProductEvaluate.projectQuery()
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //显示商品评价
    ShowProductReviews: function (id) {
        //请求方法
        var methodName = "/productreview/AdminProductReviewsInfo";
        var data = {
            "ReviewId": id
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var result = data.Data.ProductReviews;
                var html = "";
                if (result.Star != 0) {
                    for (var i = 0; i < result.Star; i++) {
                        html += '<li><img src="/public/images/star.png"></li>';
                    }
                } else {
                    html += "<li>0</li>"
                }
                $(".starul").html(html);
                var img = "";
                if (result.ReviewImgFullList.length > 0) {
                    for (var i = 0; i < result.ReviewImgFullList.length; i++) {
                        img += '<li><img  class="evaluate-img" src=' + result.ReviewImgFullList[i] + '></li>';
                    }
                } else {
                    img += "<li>暂无晒图</li>"
                }
                $("#message").text(result.Message);
                $("#evaluateImg").html(img);
                // $("#evaluateImg").attr("src",result.PShowImg);
                $("#replyBtn").attr("data-id", result.ReviewId);
                $(".mask").show();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //回复商品评价
    replyProductReviews: function (id, replymessage) {
        //请求方法
        var methodName = "/productreview/AdminReplyProductReviews";
        var data = {
            "ReviewId": id,
            "ReplyMessage": replymessage,
            "UId": 17,
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('回复成功');
                $(".mask").hide();
                //回复商品成功之后刷新表格
                ProductEvaluate.projectQuery()
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //bootstrapTable
    initBootstrapTable: function () {
        $('#evaluateTable').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/product/AdminProductReviewsList',
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
            queryParams: ProductEvaluate.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: ProductEvaluate.responseHandler,
            columns: [
                {
                    field: 'ReviewId',
                    title: '编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'PName',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'UserName',
                    title: '评价用户',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value;
                    }
                },
                {
                    field: 'Message',
                    title: '评价内容',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var e = '<span class="evaluate-content">' + value + '</span>';
                        return e;
                    }
                },
                {
                    field: 'ReviewImgFullList',
                    title: '评价图片',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var img = "";
                        if (value.length > 0) {
                            for (var i = 0; i < value.length; i++) {
                                img += '<li><img style="width: 100px;height: 100px;"  class="evaluate-img" src=' + value[i] + '></li>';
                            }
                        }
                        return img;
                    }
                },

                {
                    field: 'ReviewTime',
                    title: '评论时间',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        return value.replace("T", " ").substring(0, 19);
                    }
                },

                {
                    field: 'ReviewId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = "";
                        html += "<span class='status_delete' data-id='" + value + "' style='margin-left: 10px;'>删除</span>";
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
                // console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#evaluateTable').bootstrapTable('removeAll');
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
        var methodName = "/product/AdminProductReviewsList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            minSize: $("#leftLabel").val(),
            maxSize: $("#rightLabel").val(),
            minPrice: $("#priceleftLabel").val(),
            maxPrice: $("#pricerightLabel").val(),
            PName: $("#PName").val(),
            StartTime: $("#start").val(),
            EndTime: $("#end").val(),
            Page: {
                PageSize: params.limit,//页面大小,
                PageIndex: (params.offset / params.limit) + 1,//页码
            }
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function (res) {
        if (res.Data != null) {
            // console.log(res);
            return {
                "rows": res.Data.ProductReviewsList,
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
        var methodName = "/product/AdminProductReviewsList";

        if (parame == "" || parame == undefined) {
            var obj = {
                PName: $("#PName").val(),
                StartTime: $("#start").val(),
                EndTime: $("#end").val(),
                Page: {
                    PageSize: 10,//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#evaluateTable').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );
    },
    //表格刷新(先销毁后初始化)
    projectQuery: function (parame) {
        //方法名
        var methodName = "/product/AdminProductReviewsList";

        if (parame == "" || parame == undefined) {
            var obj = {
                PName: $("#PName").val(),
                StartTime: $("#start").val(),
                EndTime: $("#end").val(),
                Page: {
                    PageSize: 10,//页面大小,
                    PageIndex: 1,//页码
                }
            };
        } else {
            var obj = parame;
        }

        $('#evaluateTable').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + methodName,
                query: obj
            }
        );

        ProductEvaluate.initBootstrapTable();

    }
}
