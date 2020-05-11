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
    //后台添加风格
    adminAddCategory:function(){
        //请求方法
        var methodName = "/product/AdminAddProductStyle";
        var data = {
            "Name": $('#classify_name').val(),
            "DisplayOrder": $('#displayOrder').val(),
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功',function(){
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