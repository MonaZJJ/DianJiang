$(function () {
    NavigationAdd.init();
})

var NavigationAdd = {
    //商品分类模板
    GoodsListTemplate: `<ul class="layer_ul_1">
  {{each CategoryList as value i}}
      {{if CategoryList[i].Layer == "1"}}
      <li class="layer-1">
          <div class="contentBody">
              <div class="col-xs-3">{{CategoryList[i].CateId}}</div>
              <div class="col-xs-6">
                  <div class="classify_one">
                      <i class="icon-jia jia_collapse_one">
                      {{if CategoryList[i].Haschild == "1"}}
                      <img src="../public/images/suoqi.png" alt="">
                      {{else if CategoryList[i].Haschild == "0"}}
                      <img src="../public/images/zhankai.png" alt="">
                      {{/if}}
                      </i>
                      <i class="iconfont icon-wenjianjia"></i>
                      {{CategoryList[i].Name}}
                  </div>
              </div>
              <div class="col-xs-3">
                    <span class="pick" data-id={{CategoryList[i].CateId}} data-name="{{CategoryList[i].Name}}">选择</span>
              </div>
          </div>
<!--          {{each CategoryList as value j}}-->
<!--          {{if CategoryList[j].ParentId == CategoryList[i].CateId}}-->
<!--          <ul class="layer_ul_2" style="display: none">-->
<!--              <li class="layer-2">-->
<!--                  <div class="contentBody">-->
<!--                      <div class="col-xs-3">{{CategoryList[j].CateId}}</div>-->
<!--                      <div class="col-xs-6">-->
<!--                          <div class="classify_two">-->
<!--                              <i class="icon-jia jia_collapse_two">-->
<!--                              {{if CategoryList[j].Haschild == "1"}}-->
<!--                              <img src="../public/images/suoqi.png" alt="">-->
<!--                              {{else if CategoryList[j].Haschild == "0" }}-->
<!--                              <img src="../public/images/zhankai.png" alt="">-->
<!--                              {{/if}}-->
<!--                              </i>-->
<!--                              <i class="iconfont icon-wenjianjia"></i>-->
<!--                              {{CategoryList[j].Name}}-->
<!--                          </div>-->
<!--                      </div>-->
<!--                      <div class="col-xs-3">-->
<!--                          <span class="pick" data-id={{CategoryList[j].CateId}} data-name="{{CategoryList[j].Name}}">选择</span>-->
<!--                      </div>-->
<!--                  </div>-->
<!--              </li>-->
<!--          </ul>-->
<!--          {{/if}}-->
<!--          {{/each}}-->
      </li>
      {{/if}}
     {{/each}}
  </ul>`,

    init: function () {
        NavigationAdd.adminCategoryList();
        // 选择商品分类
        $("#selectClassify").on("click", function () {
            $(".mask").show();
        });
        // 关闭商品分类弹窗
        $(".mask").on("click", ".close", function () {
            $(".mask").hide();
        });
        // 选择分类
        $(".mask").on("click", ".pick", function () {
            var id = $(this).attr("data-id");
            var name = $(this).attr("data-name");
            $("#classifyName").attr("data-id", id);
            $("#classifyName").text(name);
            $(".mask").hide();
        });

        //上传图标
        uploadIconPic('#small_upload_pick', '#small_icon', '/indexDatas/AdminUploadNavigationBarIcon');
        //保存按钮点击
        $('body').on('click', '#submitBtn', function () {
            var Name = $('#Name').val();
            var RelationId = $('#classifyName').attr("data-id");
            var DisplayOrder = $('#DisplayOrder').val();
            var Icon = $('#small_icon').attr('data-src');
            // 名称验证
            if (!Validate.emptyValidateAndFocus("#Name", "请输入标题名称", "")) {
                return false;
            }
            // 商品分类
            if(RelationId == 0 || RelationId == "0" || RelationId == undefined || RelationId == null){
                Common.showInfoMsg("请选择商品分类");
                return false;
            }
            //图片验证
            if (Icon == null || Icon == undefined) {
                Common.showInfoMsg('请先上传图片')
                return false;
            }
            //排序验证
            if (!Validate.emptyValidateAndFocus("#DisplayOrder", "请输入排序", "")) {
                return false;
            }
            NavigationAdd.adminProvinceList(Name, RelationId, Icon, DisplayOrder);
        })

        // 取消按钮
        $('body').on('click', '#cancelBtn', function () {
            location.href = '/platform/navbarList';
        })

    },
    //获取添加接口
    adminProvinceList: function (Name, RelationId, Icon, DisplayOrder) {
        //请求方法
        var methodName = "/indexDatas/AdminAddNavigationBar";
        var data = {
            "Name": Name,
            "Icon": Icon,
            "DisplayOrder": DisplayOrder,
            "RelationId": RelationId
        };
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功', function () {
                    location.href = '/platform/navbarList';
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //后台分类列表
    adminCategoryList: function () {
        //请求方法
        var methodName = "/Category/AdminCategoryList";
        var data = {};
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(NavigationAdd.GoodsListTemplate);
                var html = render(data.Data);
                $('#table_content_classify').html(html);
                // NavigationAdd.initHandle();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //初始化事件
    // initHandle: function () {
    //     //文件收缩  第一层级
    //     $('.layer_ul_1 .layer-1 .jia_collapse_one').click(function () {
    //         //$(this).parents('.contentBody').siblings('.layer_ul_2').slideToggle();
    //         var display_state = $(this).parents('.contentBody').siblings('.layer_ul_2').css('display'); //所以要用行内样式控制
    //         if (display_state == 'none') {
    //             $(this).parents('.contentBody').siblings('.layer_ul_2').slideDown();
    //             $(this).find('img').attr('src', '../public/images/zhankai.png');
    //         } else {
    //             $(this).parents('.contentBody').siblings('.layer_ul_2').slideUp();
    //             $(this).find('img').attr('src', '../public/images/suoqi.png');
    //         }
    //     });
    //
    //     //文件收缩 第二层级
    //     $('.layer_ul_2 .layer-2 .jia_collapse_two').click(function () {
    //         var display_state = $(this).parents('.contentBody').siblings('.layer_ul_3').css('display'); //所以要用行内样式控制
    //         if (display_state == 'none') {
    //             $(this).parents('.contentBody').siblings('.layer_ul_3').slideDown();
    //             $(this).find('img').attr('src', '../public/images/zhankai.png');
    //         } else {
    //             $(this).parents('.contentBody').siblings('.layer_ul_3').slideUp();
    //             $(this).find('img').attr('src', '../public/images/suoqi.png');
    //         }
    //     });
    // },

}