var setGuideImg = {
    imgTpl:`
        {{each AdminGetPopUpAdvertList as value i}}
            <div class="img-container">
                <img class="select-img" src="{{AdminGetPopUpAdvertList[i].IconFull}}" data-src="{{AdminGetPopUpAdvertList[i].Icon}}">
                <input class="img-input" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                <img class="close-img" src="/public/images/close.png" style="width: 100%;height: 100%;">
            </div>
        {{/each}}
        {{if AdminGetPopUpAdvertList.length < 10}}
            <div class="img-container">
                <img class="select-img" src="/public/images/addImg.png">
                <input class="img-input" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                <img class="close-img" src="/public/images/close.png">
            </div>
        {{/if}}
    `,

    init:function(){
        //点击保存的时候
        $('body').on('click','#save',function(){
            var list = [];
            $('.select-img').each(function(index,item){
                if($(this).attr('data-src') != "" && $(this).attr('data-src') != undefined){
                    list.push($(item).attr('data-src'))
                }
            })
            console.log(list)
            if(list.length<1){
                Common.showInfoMsg('请上传至少一张图片')
                return false;
            }
            setGuideImg.adminSetPopUpAdvertImg(list);
        })


        setGuideImg.adminGetPopUpAdvertList();

    },
    //设置弹窗广告接口
    adminSetPopUpAdvertImg:function(imgList){
        //请求方法
        var methodName = "/indexDatas/AdminSetPopUpAdvertImg";
        var data = {
            "IconList":imgList
        };
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                Common.showSuccessMsg("设置成功");
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取广告列表
    adminGetPopUpAdvertList:function(){
        //请求方法
        var methodName = "/indexDatas/AdminGetPopUpAdvertList";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(setGuideImg.imgTpl);
                var html = render(data.Data);
                $("#productImg").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    }

}
$(function(){

    setGuideImg.init();

})