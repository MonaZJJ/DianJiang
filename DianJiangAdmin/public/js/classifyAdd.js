var ClassifyAdd = {
    CateTemplate: `
              <option selected="selected" value="0" data-layer="0">请选择选择上级分类</option>
              {{each FirstCategoryList as value i}}
                  {{if FirstCategoryList[i].Layer != "3"}}
                    <option value={{FirstCategoryList[i].CateId}} data-layer="{{FirstCategoryList[i].Layer}}">{{FirstCategoryList[i].Name}}</option>
                  {{/if}}
              {{/each}}
`,
    init: function () {

        ClassifyAdd.adminCategoryList();
        uploadIconPic('#small_upload_pick', '#small_icon', '/category/AdminUploadCategorySmallIcon');
        //cateBox变化的时候
        $('body').on('change','#cateBox',function(){
            //代表上级的二级分类，自己是三级
            if($('#cateBox option:selected').attr('data-layer') == "2"){
                $('#smallBox').show()
                $('#bigBox').hide()
            }
            //代表自己是一级分类
            if($('#cateBox option:selected').attr('data-layer') == "0"){
                $('#bigBox').hide()
                $('#smallBox').hide()
            }
            //代表自己是二级分类
            if($('#cateBox option:selected').attr('data-layer') == "1"){
                $('#bigBox').hide()
                $('#smallBox').show()
            }
        })
        //完成按钮点击
        $('body').on('click','.finish_bth_add',function(){
            var name = $('#classify_name').val();
            var parentsId = $('#cateBox option:selected').val();
            var smallicon = $('#small_icon').attr("data-src");
            if($("#smallBox").is(":visible")){
                var smallicon = $('#small_icon').attr('data-src');
            };
            if($("#bigBox").is(":visible")){
                var bigicon = $('#big_icon').attr('data-src');
            };
            //分类名称
            if (!Validate.emptyValidateAndFocus("#classify_name", "请输入分类名称", "")) {
                return false;
            }
            //排序
            if (!Validate.emptyValidateAndFocus("#displayOrder", "请输入排序", "")) {
                return false;
            }
            ClassifyAdd.adminAddCategory(name,parentsId,smallicon,bigicon)


        });



    },
    //后台分类列表
    adminCategoryList: function () {
        //请求方法
        var methodName = "/category/AdminFirstCategoryList";
        var data = {};
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(ClassifyAdd.CateTemplate);
                var html = render(data.Data);
                $('#cateBox').html(html);
                //初始化搜索下拉框
                $("#cateBox").chosen();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台添加分类
    adminAddCategory:function(name,parentsId,smallicon,bigicon){
        //请求方法
        var methodName = "/category/AdminAddCategory";
        var data = {
            "Name": name,
            "ParentId": parentsId,
            "BigIcon": bigicon != undefined ? bigicon : "",
            "SmallIcon": smallicon != undefined ? smallicon : "",
            "DisplayOrder": $('#displayOrder').val()
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功',function(){

                    location.href="/classify/classifyList?id="+data.Data+""

                })

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

};


$(function () {
    ClassifyAdd.init()

});