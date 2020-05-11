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
        //获取风格信息
        ClassifyAdd.adminProductStyleInfo();
        //完成按钮点击
        $('body').on('click','.finish_bth_add',function(){
            //风格名称
            if (!Validate.emptyValidateAndFocus("#classify_name", "请输入风格名称", "")) {
                return false;
            }
            //排序
            if (!Validate.emptyValidateAndFocus("#displayOrder", "请输入排序", "")) {
                return false;
            }

            ClassifyAdd.adminAddCategory()


        });



    },
    //后台编辑风格
    adminProductStyleInfo:function(){
        //请求方法
        var methodName = "/product/AdminProductStyleInfo";
        var data = {
            "StyleId": Common.getUrlParam('id'),
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                $('#classify_name').val(data.Data.AdminProductStyleInfos.Name)
                $('#displayOrder').val(data.Data.AdminProductStyleInfos.DisplayOrder)
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台编辑风格
    adminAddCategory:function(){
        //请求方法
        var methodName = "/product/AdminEditProductStyle";
        var data = {
            "StyleId": Common.getUrlParam('id'),
            "Name": $('#classify_name').val(),
            "DisplayOrder": $('#displayOrder').val(),
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('编辑成功',function(){
                    location.href="/product/styleList"
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