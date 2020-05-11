$(function() {
    StoreEdit.init();
})

var StoreEdit = {
    //区域id
    regionid: "",
    //lat
    lat: '',
    //lng
    lng: '',


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


    init: function() {
        //上传图片
        uploadIconPic("#small_upload_pick", "#small_icon", "/shipper/AdminUploadStoreIcon");

        StoreEdit.adminProvinceList(function() {

        });
        //获取门店信息
        StoreEdit.adminStoreInfo();

        var geocoder, map, marker = null;
        var init = function() {
            var center = new qq.maps.LatLng(34.754504, 113.706663);
            StoreEdit.map = new qq.maps.Map(document.getElementById('Map'), {
                center: center,
                zoom: 18
            });
            geocoder = new qq.maps.Geocoder({
                complete: function(result) {
                    StoreEdit.map.setCenter(result.detail.location);
                    var marker = new qq.maps.Marker({
                        map: StoreEdit.map,
                        position: result.detail.location
                    });
                    StoreEdit.lat = result.detail.location.lat.toFixed(6);
                    StoreEdit.lng = result.detail.location.lng.toFixed(6);
                }
            });
            var label;

            function setLabelPoi(lab, latlng) {
                lab.setMap(StoreEdit.map);
                //根据地理坐标获取相对地图容器的像素坐标。
                var point = StoreEdit.map.fromLatLngToContainerPixel(latlng);
                var pointN = new qq.maps.Point(
                    point.getX() + 15,
                    point.getY() + 30
                );
                //根据相对地图容器的像素坐标获取地理坐标。
                var gl = StoreEdit.map.fromContainerPixelToLatLng(pointN);
                lab.setPosition(gl);
                lab.setContent(
                    latlng.getLat().toFixed(6) + "," + latlng.getLng().toFixed(6)
                );
            };
        };
        init();
        //省改变时
        $('body').on('change', '#province_box', function() {
                var id = $('#province_box option:selected').attr('data-id');
                StoreEdit.regionid = id;
                StoreEdit.cityHandle(id, function() {

                });
                $('#city_box').val(0)
                $('#area_box').html('<option selected="selected" value="0">请选择区/县</option>')
                getAddres()
            })
            //市改变时
        $('body').on('change', '#city_box', function() {
                var id = $('#city_box option:selected').attr('data-id');
                StoreEdit.regionid = id;
                StoreEdit.areaHandle(id, function() {

                });
                $('#area_box').val(0)
                getAddres()
            })
            //区改变时
        $('body').on('change', '#area_box', function() {
                var id = $('#area_box option:selected').attr('data-id');
                StoreEdit.regionid = id;
                $('#street_box').val(0)
                getAddres()
            })
            //详细地址改变
        $('body').on('blur', '#detailAddress', function() {
            getAddres()
        });

        // 选择店长
        $("#selectClassify").on("click", function() {
            $(".mask").show();
            StoreEdit.initBootstrapTable();
        });

        //查询按钮点击
        $('body').on('click', '#searchBtn', function() {
            StoreEdit.projectQuery();
        });

        // 关闭选择店长弹窗
        $(".mask").on("click", ".close", function() {
            $(".mask").hide();
        });

        // 选择店长
        $(".mask").on("click", ".status_choose", function() {
            var id = $(this).attr("data-id");
            var name = $(this).attr("data-name");
            $("#managerName").attr("data-id", id);
            $("#managerName").text(name);
            $('.cancelBtn').show();
            $(".mask").hide();
        });

        //保存
        $('body').on('click', '#nextStep', function() {
            //门店名称
            if (!Validate.emptyValidateAndFocus("#storeName", "请输入门店名称", "")) {
                return false;
            }

            if ($('#province_box').val() == "0" || $('#city_box').val() == "0" || $('#area_box').val() == "0") {
                Common.showErrorMsg("请选择省市区")
                return false;
            }
            //详细地址
            if (!Validate.emptyValidateAndFocus("#detailAddress", "请输入详细地址", "")) {
                return false;
            }

            StoreEdit.editStoreInfo();
        });

        //获取地址
        function getAddres() {
            var province = $('#province_box option:selected').val() == 0 ? '' : $('#province_box option:selected').val();
            var city = $('#city_box option:selected').val() == 0 ? '' : $('#city_box option:selected').val();
            var area = $('#area_box option:selected').val() == 0 ? '' : $('#area_box option:selected').val();
            var detail = $('#detailAddress').val();
            var address = province + city + area + detail;
            geocoder.getLocation(address);
        }
    },

    //获取省列表接口
    adminProvinceList: function(callback) {
        //请求方法
        var methodName = "/regions/AdminProvinceList";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                var render = template.compile(StoreEdit.province_template);
                var html = render(data.Data);
                $("#province_box").html(html);
                callback()
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //调用获取市列表
    cityHandle: function(id, callback) {
        var methodName = "/regions/AdminCityList";
        var data = {
            "Type": 1,
            "ParentId": id
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                var render = template.compile(StoreEdit.city_template);
                var html = render(data.Data);
                $("#city_box").html(html);
                callback()
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //调用获取区列表
    areaHandle: function(id, callback) {
        var methodName = "/regions/AdminMunicipalDistrictList";
        var data = {
            "Type": 1,
            "ParentId": id
        };
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                var render = template.compile(StoreEdit.area_template);
                var html = render(data.Data);
                $("#area_box").html(html);
                callback()
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //编辑门店接口
    editStoreInfo: function() {
        //请求方法
        var methodName = "/shipper/AdminEditStore";
        var data = {
            "SId": Common.getUrlParam('id'),
            "StoreName": $('#storeName').val(),
            "StoreUserName": $("#storeUserName").val(),
            "StoreMobile": $("#phone").val(),
            "Avatar": $("#small_icon").attr("data-src"),
            "UId": $("#managerName").attr("data-id"),
            "Password": $("#pwd").val() ? $("#pwd").val() : "",
            "RegionId": StoreEdit.regionid,
            "StoreAddress": $('#detailAddress').val(),
            "Latitude": StoreEdit.lat,
            "Longitude": StoreEdit.lng,

        };
        //请求接口
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('编辑门店成功', function() {
                    location.href = '/store/storeList'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取门店信息
    adminStoreInfo: function() {
        //请求方法
        var methodName = "/shipper/AdminStoreInfo";
        var data = {
            "SId": Common.getUrlParam('id'),
        };
        //请求接口
        SignRequest.set(methodName, data, function(data) {
            if (data.Code == "100") {
                //门店名称
                $("#storeName").val(data.Data.StoreName);
                $("#storeUserName").val(data.Data.StoreUserName)
                $('#phone').val(data.Data.StoreMobile);
                $("#small_icon").attr("data-src", data.Data.Avatar)
                $("#small_icon").attr("src", data.Data.AvatarFull)
                StoreEdit.adminProvinceList(function() {
                    $('#province_box option').each(function(index, item) {
                        if ($(item).attr('data-id') == data.Data.ProvinceId) {
                            $(item).attr('selected', 'selected');
                        }
                    })
                });
                StoreEdit.cityHandle(data.Data.ProvinceId, function() {
                    $('#city_box option').each(function(index, item) {
                        if ($(item).attr('data-id') == data.Data.CityId) {
                            $(item).attr('selected', 'selected');
                        }
                    })
                });
                StoreEdit.areaHandle(data.Data.CityId, function() {
                    $('#area_box option').each(function(index, item) {
                        if ($(item).attr('data-id') == data.Data.RegionId) {
                            $(item).attr('selected', 'selected');
                        }
                    })
                });
                //详细地址
                $('#detailAddress').val(data.Data.StoreAddress);

                //店长
                if (data.Data.UserName != "" && data.Data.UserName != null) {
                    $('#managerName').attr('data-id', data.Data.UId);
                    $('#managerName').text(data.Data.UserName);
                    $('.cancelBtn').show();
                } else {
                    $('#managerName').attr('data-id', 0)
                    $('#managerName').text("")
                }
                //经纬度
                StoreEdit.lat = data.Data.Latitude;
                StoreEdit.lng = data.Data.Longitude;

                //地图定位
                StoreEdit.mapHandle();
                StoreEdit.regionid = data.Data.RegionId;


            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //bootstrapTable
    initBootstrapTable: function() {
        $('#table_content_classify').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/shipper/AdminNoStoreUserList',
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
            queryParams: StoreEdit.queryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: StoreEdit.responseHandler,
            columns: [{
                    field: 'UId',
                    title: '店长编号',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {

                        var html = `${value}`

                        return html;
                    }
                },
                {
                    field: 'UserName',
                    title: '店长名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {

                        var e = '<span>' + value + '</span>';

                        return e;
                    }
                },
                {
                    field: 'Mpbile',
                    title: '手机号码',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {

                        var e = '<span>' + value + '</span>';
                        return e;
                    }
                },
                {
                    field: 'UId',
                    title: '操作',
                    align: 'center',
                    valign: 'middle',
                    formatter: function(value, row, index) {

                        var html = '<span style="padding: 0 6px;cursor: pointer;color: #1792e7;" class="status_choose" data-id="' + value + '" data-name="' + row.UserName + '">选择</span>';


                        return html;
                    }
                },


            ],
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
                $('#dishes_list_table').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function(row, tr, flied) {
                // 书写自己的方法
                // console.log(row);
                // console.log(tr);
                // console.log(flied);
            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function(rows) {

                // for (var i = 0; i < rows.length; i++) {
                //     DishesList.UserIdsList.push(rows[i].User.Id);
                //     DishesList.UserOpenIds.push(rows[i].User.OpenId);
                // }

            },
            onUncheckAll: function(rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function(row) {


            },
            //取消每一个单选框时对应的操作；
            onUncheck: function(row) {


            }
        });
    },
    //bootstrap table post 参数 queryParams
    queryParams: function(params) {
        //配置参数
        //方法名
        var methodName = "/shipper/AdminShipperUserList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            },
            "UserName": $("#Name").val(),
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    responseHandler: function(res) {
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
    //表格刷新
    projectQuery: function(parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "UserName": $("#Name").val(),
            };
        } else {
            var obj = parame;
        }
        //方法名
        var methodName = "/shipper/AdminShipperUserList";


        $('#table_content_classify').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/shipper/AdminShipperUserList',
                query: obj
            }
        );
    },
    //地图定位
    mapHandle: function() {
        StoreEdit.map.panTo(new qq.maps.LatLng(StoreEdit.lat, StoreEdit.lng));
        var marker = new qq.maps.Marker({
            map: StoreEdit.map,
            position: new qq.maps.LatLng(StoreEdit.lat,
                StoreEdit.lng)
        });
    },
}