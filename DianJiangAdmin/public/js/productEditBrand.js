var ProductBrand = {

    init:function(){
        if(Common.getUrlParam('id')){
            //获取编辑的资料
            ProductBrand.adminBrandInfo()
            $('.editText').text('编辑')
        }else{
            $('.editText').text('新增')
        }
        //图片上传按钮
        uploadFoodPic('#brandbox','#uploader_food_btn','/brand/AdminUploadBrandSmallIcon');
        uploadFoodPic('#zhubox','#uploader_zhu_btn','/brand/AdminUploadBrandSmallIcon');
        //编辑里面的编辑按钮点击
        $('body').on('click','#submit',function(){
            var name = $('#add_brand_name').val();
            var src = $('#brandbox').attr('data-src');
            //品牌名验证
            if (!Validate.emptyValidateAndFocus("#add_brand_name", "请输入品牌名", "")) {
                return false;
            }
            //图片验证
            // if($('#brandbox').attr('data-src') == null || $('#brandbox').attr('data-src') == ""){
            //     Common.showErrorMsg("请上传图片!")
            //     return false;
            // }
            if(Common.getUrlParam('id')){
                ProductBrand.adminEditBrand()
            }else{
                ProductBrand.adminAddBrand()
            }

        })

    },
    //后台新增品牌
    adminAddBrand:function(){
        //请求方法
        var methodName = "/brand/AdminAddBrand";
        var data = {
            "Name": $('#add_brand_name').val(),
            "Logo": $('#brandbox').attr('data-src') ? $('#brandbox').attr('data-src') : '',
            "Image":$('#zhubox').attr('data-src') ? $('#zhubox').attr('data-src') : '',
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功',function(){
                    location.href='/product/brandList'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台编辑品牌
    adminEditBrand:function(){
        //请求方法
        var methodName = "/brand/AdminEditBrand";
        var data = {
            "BrandId": Common.getUrlParam('id'),
            "Name": $('#add_brand_name').val(),
            "Logo": $('#brandbox').attr('data-src') ? $('#brandbox').attr('data-src') : '',
            "Image":$('#zhubox').attr('data-src') ? $('#zhubox').attr('data-src') : '',
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg('编辑成功',function(){
                    location.href='/product/brandList'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台品牌信息
    adminBrandInfo:function(){
        //请求方法
        var methodName = "/brand/AdminBrandInfo";
        var data = {
            "BrandId": Common.getUrlParam('id')
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                $('#add_brand_name').val(data.Data.Name);
                // $('#sort_name').val(data.Data.DisplayOrder);
                $('#brandbox').attr('src',data.Data.LogoFull);
                $('#brandbox').attr('data-src',data.Data.Logo);
                $('#zhubox').attr('src',data.Data.ImageFull);
                $('#zhubox').attr('data-src',data.Data.Image);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },




}



$(function () {

    ProductBrand.init()

})