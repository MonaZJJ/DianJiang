$(function () {
    ProductRelease.init();
})

var ProductRelease = {
    //获取最多种的组合方式（包含没选中）
    allcombination: {},
    //未选中的列表
    uncheckList: [],
    //未选中的id列表
    uncheckIDList: [],
    //allKeys表示当前选择规格生成的所有种类
    allKeys: {},
    //allsets取得集合的所有子集「幂集」
    allSets: [],
    //allIds
    allIds: {},
    //result(选中的结果，带属性下标)
    result: "",
    //ids id集合
    ids: "",
    //skuid skuid集合
    skuid: "",
    //是否开启规格
    isOpen: false,
    skuAttrTpl: `        
                            {{each AttributesList as value i}}
                            <li class="skuItem">
                                <span class="formitemtitle" style="width:100%;float:left;" data-type="{{AttributesList[i].Name}}" data-id="{{AttributesList[i].AttrId}}">{{AttributesList[i].Name}}：</span>
                                <span class="skuItemList">
                                    <ul style="width:100%;float:left;" class="skuItemListUl">
                                        {{each AttributesList[i].AttrValueList as value j}}
                                        <li style="padding:5px 0;margin-bottom:0;float:left;" class="contentLi">
                                            <div class="checkBoxList">
                                                <input type="checkbox" {{AttributesList[i].AttrValueList[j].IsSign ? 'checked' : '' }} data-id="{{AttributesList[i].AttrValueList[j].AttrValueId}}">
                                                <span style="float:left;display: block">{{AttributesList[i].AttrValueList[j].AttrValue}}</span>
                                            </div>
                                        </li>
                                       {{/each}}
                                        <li style="float:left;overflow:hidden;width:auto;" class="addBox">
                                            <a id="btnadd_53" href="javascript:;"
                                               style="line-height: 1.8; float: left;">添加</a>
                                            <span style="margin-top: 10px; display: none;overflow: hidden" id="sp_53">
                                                <input type="text" id="txt_53" class="form-control"
                                                       style="width:160px;float: left" name="txt_53">
                                                <input type="button" id="btnins_53"
                                                       class="btn btn-primary addSkuValueBtn" value="保存"
                                                       style="margin-left:10px;float: left">
                                            </span>
                                        </li>

                                    </ul>
                                </span>
                            </li>
                            {{/each}}
    `,
    //编辑的时候用到的sku模板
    editSkuTpl: `
         <tr class="SpecificationTh">
                           {{each AttributeList as value i}}
                         <td align="center" class="fieldCell" style="width:50px !important" skuid="{{AttributeList[i].AttrId}}"><span>{{AttributeList[i].Name}}</span></td>
                            {{/each}}
                         <td align="center">商城价</td>
                         <td align="center">成本价</td>
                         <td align="center">VIP价</td>
                         <td align="center" id="storeField"><em>*</em>库存</td>
                         <td align="center">图片(160*145)</td>
                         <td align="center">操作</td>;
        </tr>
        {{each SKu as value i}}
        <tr id="sku_1" rowindex="{{i}}" class="SpecificationTr">
                        {{each SKu[i].AttrValueList as value j}}
                           <td align="center">
                              <div id="skuDisplay_1_20" rowid="{{j}}" skuid="{{SKu[i].AttrValueList[j].AttrId}}" valueid="{{SKu[i].AttrValueList[j].AttrValueId}}" data-valuelist="{{SKu[i].AttrValueStringList}}" data-idslist="{{SKu[i].AttrValueIdList}}" class="specdiv">{{SKu[i].AttrValueList[j].AttrValue}}</div>
                           </td>
                       {{/each}}
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control ShopPrice" value="{{SKu[i].ShopPrice}}" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control CostPrice" value="{{SKu[i].CostPrice}}" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control VipPrice" value="{{SKu[i].VipPrice}}" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control Number" value="{{SKu[i].Number}}" style="width:100px;">
                       </td>
                       <td align="center">
                            <div class="img-containerSku">
                               <img class="select-img" src="{{SKu[i].FullShowImg}}" data-src="{{SKu[i].ShowImg}}">
                               <input class="img-input" type="file"accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                               <img class="close-img" src="/public/images/close.png">
                            </div>
                       </td>
                       <td align="center">
                         <a style="float:left;width:100%;text-algin:center" href="javascript:;" id="deleSku_1">
                           <span style="float:none;color:red" class="glyphicon glyphicon-trash DelectBtn"></span>
                         </a>
                       </td>
         </tr>
         {{/each}}
    `,
    brandTpl: `
        {{each BrandList as value i}}
            <option value="{{BrandList[i].BrandId}}">{{BrandList[i].Name}}</option>
        {{/each}}
    `,
    AttributeTpl: `
         {{each AttributeGroupList as value i}}
            <option value="{{AttributeGroupList[i].AttrGroupId}}">{{AttributeGroupList[i].Name}}</option>
        {{/each}}   
    `,
    imgTpl: `
        {{each imglistData as value i}}
            <div class="img-container">
                <img class="select-img" src="{{imglistData[i].ImgFull}}" data-src="{{imglistData[i].Img}}">
                <input class="img-input" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                <img class="close-img" src="/public/images/close.png" style="width: 100%;height: 100%;">
            </div>
        {{/each}}
        {{if imglistData.length < 10}}
            <div class="img-container">
                <img class="select-img" src="/public/images/addImg.png">
                <input class="img-input" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                <img class="close-img" src="/public/images/close.png">
            </div>
        {{/if}}
    `,
    freightTpl: `
        {{each TemplatesList as value i}}
            <option value="{{TemplatesList[i].TemplateId}}">{{TemplatesList[i].TemplateName}}</option>
        {{/each}}
    `,
    companyTpl: `
        {{each AdminStorePartInfoList as value i}}
            <option  data-id="{{AdminStorePartInfoList[i].StoreId}}" value="{{AdminStorePartInfoList[i].StoreId}}">{{AdminStorePartInfoList[i].StoreName}}</option>
        {{/each}}
    `,
    labelTpl: `
        {{each ProductLabelList as value i}}
            <label class="checkbox-inline">
                <input type="checkbox" data-id="{{ProductLabelList[i].PLId}}" value="{{ProductLabelList[i].PLId}}"> {{ProductLabelList[i].Name}}
            </label>
        {{/each}}
    `,
    //模板
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
                             
                                    </div>
                                </div>
                                {{each CategoryList as value j}}
                                {{if CategoryList[j].ParentId == CategoryList[i].CateId}}
                                <ul class="layer_ul_2" style="display: none">
                                    <li class="layer-2">
                                        <div class="contentBody">
                                            <div class="col-xs-3">{{CategoryList[j].CateId}}</div>
                                            <div class="col-xs-6">
                                                <div class="classify_two">
                                                    <i class="icon-jia jia_collapse_two">
                                                    {{if CategoryList[j].Haschild == "1"}}
                                                    <img src="../public/images/suoqi.png" alt="">
                                                    {{else if CategoryList[j].Haschild == "0" }}
                                                    <img src="../public/images/zhankai.png" alt="">
                                                    {{/if}}
                                                    </i>
                                                    <i class="iconfont icon-wenjianjia"></i>
                                                    {{CategoryList[j].Name}}
                                                </div>
                                            </div>
                                            <div class="col-xs-3">
                                                <span class="pick" data-id={{CategoryList[j].CateId}} data-name="{{CategoryList[j].Name}}">选择</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                                {{/if}}
                                {{/each}}
                            </li>
                            {{/if}}
                           {{/each}}
                        </ul>`,
    isHot: 0,
    //1代表单个图片，2代表多图上传
    Type: "",
    PicPageIndex: 1,
    fileId: "",
    skuImgItem: "",
    AttrTplR: `
      <option selected="selected"  value="0">请选择</option>
      {{each ProductLabelList as value i}}
         <option  value="{{ProductLabelList[i].PLId}}" data-id="{{ProductLabelList[i].PLId}}" data-name="{{ProductLabelList[i].Name}}">{{ProductLabelList[i].Name}}</option>
      {{/each}}  
    `,
    AValueTpl: `
    {{each ProductLabelList as v i}}
        <li data-id="{{ProductLabelList[i].PLId}}">{{ProductLabelList[i].Name}}</li>
    {{/each}}
    `,
    AvalueTabTpl: `
    <span class="label label-default tag" style="margin-right: 5px;margin-bottom: 5px;display: inline-block">
        <span class="text-info">#
            <span class="tabItem" data-id="{{Id}}">{{Name}}</span>#</span>
        <a href="javascript:void(0);" class="delTap">×</a>
    </span>
    `,
    initHeigth:$('.wrapper').height(),
    init: function () {
        // 返回上一页
        $('body').on('click', '.backBtn', function () {
            window.location.href = "/product/productList"
        })
        //查询
        $("#productSearch").on("click", function () {
            var data = {
                "Name": $('#choiceProductName').val(),
                "CateId": $('#choiceCateId').val(),
            }
            ProductRelease.projectDestoryQuery(data);
        });
        //佣金切换
        $("#commissionOne").on('change',function(){
            var sp = $(this).parent().siblings().find(".input-group-addon");
            if($(this).val()==1){
                sp.html('元')
            }else{
                sp.html('%')
            }
        })
        $("#commissionTwo").on('change',function(){
            var sp = $(this).parent().siblings().find(".input-group-addon");
            if($(this).val()==1){
                sp.html('元')
            }else{
                sp.html('%')
            }
        })
        $("#storecommissionOne").on('change',function(){
            var sp = $(this).parent().siblings().find(".input-group-addon");
            if($(this).val()==1){
                sp.html('元')
            }else{
                sp.html('%')
            }
        })
        $("#storecommissionTwo").on('change',function(){
            var sp = $(this).parent().siblings().find(".input-group-addon");
            if($(this).val()==1){
                sp.html('元')
            }else{
                sp.html('%')
            }
        })
        //佣金设置
        $("#switch").on('click',function(){
            if($(this).hasClass("switch-on")){
                $(this).parents(".form-group").siblings().show();
            }else{
                $(this).parents(".form-group").siblings().hide();
            }
        });
        //商品属性改变的时候
        $("#ProductAttribute").on('change', function () {
            if (ProductRelease.isOpen) {
                //标识是不是选择商品属性
                clearData(true);
            } else {
                ProductRelease.attributesList();
            }
        });
        // 分页条数设置
        $("#pageSizeDropDown").on("change", function () {
            var data = {
                "Name": $('#choiceProductName').val(),
                "CateId": $('#choiceCateId').val(),
            }
            ProductRelease.projectDestoryQuery(data);
        });

        //是否热销
        switchEvent("#isHotBtn", function () {
            ProductRelease.isHot = 1;
        }, function () {
            ProductRelease.isHot = 0;
        });

        //初始化富文本编辑器
        var ue = UE.getEditor('hcEditor');
        var ue2 = UE.getEditor('parameterEditor');

        ue.ready(function () {
            ue.setHeight(400);
            ue.execCommand('fontsize', '14px');
            ue2.ready(function () {
                ue2.setHeight(400);
                ue2.execCommand('fontsize', '14px');
                ProductRelease.attributeGroupList();
            });
        });
        //上传小图标
        uploadIconPic('#small_upload_pick', '#small_icon', '/product/AdminUploadProductImg');

        //input失去焦点颜色变回原来
        $('input[type="text"],input[type="number"]').on('blur', function () {
            $(this).css('border', '1px solid #ccc')
        })
        $('input[type="text"],input[type="number"]').on('focus', function () {
            $(this).css('border', '1px solid #3c8dbc')
        })

        // 下一步
        $("#nextStep,#secondBtn").on("click", function () {
            //商品名称
            if (!Validate.emptyValidateAndFocusAndColor("#Name", "请输入商品名称", "")) {
                return false;
            }
            //分类
            if ($("#classifyName").attr("data-id") == "0") {
                Common.showInfoMsg('请选择分类');
                return false;
            }
            //简介说明
            if (!Validate.emptyValidateAndFocusAndColor("#FeeDescription", "请输入简介说明", "")) {
                return false;
            }
            //服务
            if (!Validate.emptyValidateAndFocusAndColor("#ServiceDescription", "请输入服务描述", "")) {
                return false;
            }
            if ($('#cate').val() == 0) {
                Common.showInfoMsg('请选择分类')
                return false
            }
            //排序
            if (!Validate.emptyValidateAndFocusAndColor("#displayOrder", "请输入排序", "")) {
                return false;
            }
            //是否开启佣金
            if($('#switch').hasClass('switch-on')){
                //一级分销
                if (!Validate.emptyValidateAndFocusAndColor("#commissionOnePrice", "请输入VIP一级分销数值", "")) {
                    return false;
                }
                //二级分销
                if (!Validate.emptyValidateAndFocusAndColor("#commissionTwoPrice", "请输入VIP二级分销数值", "")) {
                    return false;
                }
                //一级分销
                if (!Validate.emptyValidateAndFocusAndColor("#storecommissionOnePrice", "请输入店长一级分销数值", "")) {
                    return false;
                }
                //二级分销
                if (!Validate.emptyValidateAndFocusAndColor("#storecommissionTwoPrice", "请输入店长二级分销数值", "")) {
                    return false;
                }

            }

            if (!ProductRelease.isOpen) {
                //商城价
                if (!Validate.emptyValidateAndFocusAndColor("#ShopPrice", "请输入商城价", "")) {
                    return false;
                }
                //成本价
                if (!Validate.emptyValidateAndFocusAndColor("#CostPrice", "请输入成本价", "")) {
                    return false;
                }
                //VIP价
                if (!Validate.emptyValidateAndFocusAndColor("#VipPrice", "请输入VIP价", "")) {
                    return false;
                }
    
                //库存
                if (!Validate.emptyValidateAndFocusAndColor("#Number", "请输入库存", "")) {
                    return false;
                }
                //服务说明
                if (!Validate.emptyValidateAndFocusAndColor("#ServiceDescription", "请输入服务说明", "")) {
                    return false;
                }
            } else {
                //sku处理
                var skuList = [];
                var spliter = '\u2299';

                if ($('#skuBody').find('.specdefault').length > 0) {
                    Common.showInfoMsg('有某一项未选择')
                    return false;
                }
                var flag = false;
                var flag1 = false;
                $('.SpecificationTr').each(function (index, item) {
                    var data = {};
                    if ($(item).find('.ShopPrice').val() == "" || $(item).find('.CostPrice').val() == "" || $(item).find('.VipPrice').val() == ""  || $(item).find('.Number').val() == "" || $(item).find('.select-img').attr('data-src') == "" || $(item).find('.select-img').attr('data-src') == undefined) {
                        flag = true;
                    }
                    data.ShopPrice = $(item).find('.ShopPrice').val();
                    data.CostPrice = $(item).find('.CostPrice').val();
                    data.VipPrice = $(item).find('.VipPrice').val();
                    data.Number = $(item).find('.Number').val();
                    data.showImg = $(item).find('.select-img').attr('data-src');
                    data.AttrValueId = $(item).find('.specdiv').eq(0).attr('data-idslist').split(spliter);
                    skuList.push(data);
                })
                if (flag) {
                    Common.showInfoMsg('规格值不能为空')
                    return false;
                }
                ProductRelease.skuList = skuList;
                if (ProductRelease.skuList.length < 1) {
                    Common.showInfoMsg('规格正在加载中，请稍后操作')
                    return false;
                }
            }


            $("#first").removeClass("active");
            $("#secondHead").addClass("active");
            $("#second").addClass("active");
            $("#typeNav li").eq(0).removeClass("active");
            $("#typeNav li").eq(1).addClass("active");
            var height = $('.wrapper').height();
            $('.sidebar-mini').height(height)
        });

        // 上一步
        $("#lastStep").on("click", function () {
            $("#secondHead").removeClass("active");
            $("#second").removeClass("active");
            $("#first").addClass("active");
            $("#typeNav li").eq(1).removeClass("active");
            $("#typeNav li").eq(0).addClass("active");
            $('.sidebar-mini').height(ProductRelease.initHeigth)
        });

        //完成
        $("#finish").on("click", function () {
            if ($('#small_icon').attr('data-src') == "" || $('#small_icon').attr('data-src') == null) {
                Common.showInfoMsg('请上传封面图')
                return false;
            }
            var PId = Common.getUrlParam("PId");
            if ($('#small_icon').attr('data-src') != "") {
                if (PId != undefined && PId != "") {
                    //编辑
                    ProductRelease.editProduct();
                } else {
                    //添加
                    ProductRelease.addProduct();
                }
            } else {
                Common.showInfoMsg('请上传封面图')
            }

        });

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

        //商品属性改变的时候
        $("#ProductAttribute").on('change', function () {
            if (ProductRelease.isOpen) {
                //标识是不是选择商品属性
                clearData(true);
            } else {
                ProductRelease.attributesList();
            }
        });

        //规格弹窗里面的添加属性按钮
        $('body').on('click', '.addSkuValueBtn', function () {
            var id = $(this).parents('.skuItemList').siblings('.formitemtitle').attr('data-id');
            var name = $(this).siblings('input').val();
            var that = this;
            if (name == "") {
                Common.showInfoMsg('请输入属性名')
                return false
            }
            ProductRelease.addAttributes(id, name, that)
        });
        //批量填充按钮点击
        $('body').on('click', '#btnBatchOk', function () {
            //吊牌价
            var txtBatchShopPrice = $('#txtBatchShopPrice').val();
            //会员价
            var txtBatchCostPrice = $('#txtBatchCostPrice').val();
            //vip价
            var txtBatchVipPrice = $('#txtBatchVipPrice').val();
            //库存
            var txtBatchNumber = $('#txtBatchNumber').val();
            if (txtBatchShopPrice != "") {
                $('.SpecificationTr').find('.ShopPrice').each(function (index, item) {
                    $(item).val(txtBatchShopPrice)
                })
            }
            if (txtBatchCostPrice != "") {
                $('.SpecificationTr').find('.CostPrice').each(function (index, item) {
                    $(item).val(txtBatchCostPrice)
                })
            }
            if (txtBatchVipPrice != "") {
                $('.SpecificationTr').find('.VipPrice').each(function (index, item) {
                    $(item).val(txtBatchVipPrice)
                })
            }
            if (txtBatchNumber != "") {
                $('.SpecificationTr').find('.Number').each(function (index, item) {
                    $(item).val(txtBatchNumber)
                })
            }
        })

        //sku
        // 开启规格
        $('body').on('click', '#openSkuBox', function () {
            //打开模态框
            $('#mySkuBox').modal('show');


        });
        $('body').on('click', '#btnshowSkuValue', function () {
            //打开模态框
            $('#mySkuBox').modal('show');

        });
        //添加规格
        $('body').on('click', '.skuItemList a', function () {
            $(this).hide();
            $(this).siblings('span').show();
        });
        //生成的表中属性的点击
        $('body').on('click', '.specdiv', function () {

            var that = $(this);
            var spliter = '\u2299'
            var id = $(this).attr('valueid');
            var skuid = $(this).attr('skuid');
            var arr = $(this).attr('data-valuelist').split(spliter);
            var idsArr = $(this).attr('data-idslist').split(spliter);
            var top = $(this).offset().top;
            var left = $(this).offset().left;
            var rowindex = $(this).parents('.SpecificationTr').attr('rowindex');
            var rowid = $(this).attr('rowid');
            $('.target_box').each(function (index, item) {
                if ($(item).attr('id') == skuid) {
                    $(item).css("left", left).css('top', top + 50);
                    $(item).attr("rowindex", rowindex);
                    $(item).attr("rowid", rowid);
                    $(item).attr('data-valuelist', that.attr('data-valuelist'));
                    $(item).attr('data-idslist', that.attr('data-idslist'));
                    updateBox($(item), arr, that, false, idsArr);
                    $(item).show()
                } else {
                    $(item).hide()
                }
            })


        });
        //添加的行的请选择点击
        $('body').on('click', '.specdefault', function () {
            var that = $(this);
            var spliter = '\u2299'
            var id = $(this).attr('valueid');
            var skuid = $(this).attr('skuid');
            var arr = $(this).attr('data-valuelist').split(spliter)
            var top = $(this).offset().top;
            var left = $(this).offset().left;
            var rowindex = $(this).parents('.SpecificationTr').attr('rowindex');
            var rowid = $(this).attr('rowid');
            $('.target_box').each(function (index, item) {
                if ($(item).attr('id') == skuid) {
                    $(item).css("left", left).css('top', top + 22);
                    $(item).attr("rowindex", rowindex);
                    $(item).attr("rowid", rowid);
                    $(item).attr('data-valuelist', that.attr('data-valuelist'))
                    $(item).attr('data-idslist', that.attr('data-idslist'))
                    updateBox($(item), arr, that, true);
                    $(item).show()
                } else {
                    $(item).hide()
                }
            })
        });
        //skuBox确认点击，生成组合
        $('body').on('click', '#sureBtn', function () {
            //判断是否有选中，没选中提示

            if ($('#skuItems').find('input[type=checkbox]').length > 0) {
                //并且要有选中
                var flag = false;
                $('#skuItems').find('input[type=checkbox]').each(function (index1, item1) {
                    if (this.checked) {
                        flag = true;
                    }
                })
                if (flag) {
                    //先清除
                    $('.target_box').each(function (index, item) {
                        $(item).remove();
                    })
                    var data = combineAttr();
                    ProductRelease.result = data.values;
                    ProductRelease.ids = data.ids;
                    ProductRelease.skuid = data.skuid;
                    var result = data.values;
                    var ids = data.ids;
                    var skuid = data.skuid;
                    var allcombination = data.allcombination;
                    var allIdcombination = data.allIdcombination;
                    console.log("所有的组合数组", allcombination)
                    console.log("所有的组合数组", allIdcombination)
                    render(result, ids, skuid, allcombination, allIdcombination)
                    //关闭模态框
                    $('#mySkuBox').modal('hide');
                    $('#skuRow').show();
                    $('#specificationsBox').hide();
                    //标识是否开启规格
                    ProductRelease.isOpen = true;
                } else {
                    Common.showInfoMsg('请选择规则属性值')
                }

            } else {
                Common.showInfoMsg('请选择规则属性值')
            }


        });
        //targetBox里面的属性点击
        $('body').on('click', '.specspan', function () {
            //id值
            var valueid = $(this).attr('valueid');
            //属性名
            var text = $(this).text();
            //第几列
            var rowindex = $(this).parent('.target_box').attr('rowindex');
            //第几个
            var rowid = $(this).parent('.target_box').attr('rowid');
            //组合的值 如："红⊙大⊙A"；
            var valueList = $(this).parent('.target_box').attr('data-valuelist');
            var idsList = $(this).parent('.target_box').attr('data-idslist');
            //判断是不是请选择点击的
            var isSelectBox = $(this).attr('isSelectBox');
            $('.SpecificationTr').each(function (index, item) {
                if (index == rowindex) {
                    $(item).find('td').eq(rowid).find('div').attr("valueid", valueid);
                    $(item).find('td').eq(rowid).find('div').text(text);
                    // $(item).find('td').eq(rowid).find('div').attr('class','specdiv');
                    $(item).find('td').eq(rowid).find('div').addClass('notspecspan');
                    var that = $(item).find('td');
                    setallKeys(text, rowid, valueList, rowindex, that, isSelectBox, valueid, idsList)
                }
            });


            $(this).parent('.target_box').hide();

        });
        //添加按钮点击的时候
        $('body').on('click', '#btnAddItem', function () {
            //获取总共有多少行
            var lineLength = $('.SpecificationTr').length;
            renderLine(lineLength)
            ProductRelease.isOpen = true;
        });
        //点击删除按钮
        $('body').on('click', ".DelectBtn", function () {
            //获取删除行的下标
            var index = $(this).parents('.SpecificationTr').attr('rowindex');
            var item = $(this).parents('.SpecificationTr');
            //判断当前行是否是已经选择好的
            var isComplete = !item.hasClass('specdefault');
            //选择好的就可以删除
            if (isComplete) {
                ProductRelease.allKeys.splice(index, 1);
                ProductRelease.allIds.splice(index, 1);

                item.remove();
                $('.SpecificationTr').each(function (index, item) {
                    $(this).attr('rowindex', index);
                })
                //重新计算(未选中的组合)
                screening();
                //说明已经全部删除
                if (ProductRelease.allIds.length == 0) {
                    ProductRelease.isOpen = false;
                }


            } else {
                Common.showInfoMsg("请选择规格")
                return false;
            }


        });
        //点击清空按钮
        $('body').on('click', '#clearData', function () {
            $('#mySkuBox').modal('hide');
            ProductRelease.isOpen = false;
            clearData();

        });
        //点其他地方消失
        $(document).bind('click', function (e) {
            var e = e || window.event; //浏览器兼容性
            var elem = e.target || e.srcElement;
            console.log("元素为", $(elem).attr('class'))
            while (elem) { //循环判断至跟节点，防止点击的是div子元素
                if ($(elem).attr('class') && $(elem).attr('class') == 'specdiv' || $(elem).attr('class') == 'specdiv notspecspan' || $(elem).attr('class') == 'specdefault' || $(elem).attr('class') == 'specdefault notspecspan') {
                    console.log("进来了")
                    return;
                }
                elem = elem.parentNode;
            }
            $('.target_box').each(function (index, item) {
                $(item).hide();
            })
        });

        //对选中的集合重新赋值
        function setallKeys(text, rowid, valueList, rowindex, that, isSelectBox, valueid, idsList) {

            var spliter = '\u2299';
            if (isSelectBox) {

                var array = valueList.split(spliter);
                array[rowid] = text;
                array = array.join(spliter);
                that.siblings('td').find('div').attr('data-valuelist', array);
                var array1 = idsList.split(spliter);
                array1[rowid] = valueid;
                array1 = array1.join(spliter);
                that.siblings('td').find('div').attr('data-idslist', array1);
                //看看是否还有项是未选的,全部都选了的话就向已选中列表添加当前项
                if (array.indexOf("空") > -1) {

                } else {
                    //为已选中列表添加当前项
                    ProductRelease.allKeys.push(array);
                    //为已选中列表添加当前项
                    ProductRelease.allIds.push(array1);
                    $('.SpecificationTr').eq(rowindex).find('.specdefault').attr('class', 'specdiv');
                }

            } else {
                //为生成的项data-valuelist赋值
                ProductRelease.allKeys.forEach(function (item, index) {
                    if (index == rowindex) {
                        console.log(item)
                        var arr = item.split(spliter);
                        arr[rowid] = text;
                        arr = arr.join(spliter);
                        that.siblings('td').find('div').attr('data-valuelist', arr);
                        ProductRelease.allKeys[index] = arr;

                    }
                })
                //为生成的项data-idslist赋值
                ProductRelease.allIds.forEach(function (item, index) {
                    if (index == rowindex) {
                        console.log(item)
                        var arr = item.split(spliter);
                        arr[rowid] = valueid;
                        arr = arr.join(spliter);
                        that.siblings('td').find('div').attr('data-idslist', arr);
                        ProductRelease.allIds[index] = arr;

                    }
                })
            }

            //重新计算未选中的项
            screening()
            console.log(ProductRelease.allKeys)
            console.log(ProductRelease.allIds)

        };

        //计算组合数据
        function combineAttr() {
            var result = {};
            var allcombination = {};
            var allIdcombination = {};
            var selectList = {};
            var selectidList = {};
            var keysLength = $('#skuItems').find('.formitemtitle').length;
            var ids = {};
            var data = {};
            var skuid = [];
            //编辑的时候用到
            var skuSelectList = [];
            //循环规格属性
            for (var i = 0; i < keysLength; i++) {

                //获取当前行
                var $current = $('#skuItems').find('.skuItemListUl').eq(i);
                var key = $('#skuItems').find('.formitemtitle').eq(i).attr('data-type');
                var Id = $('#skuItems').find('.formitemtitle').eq(i).attr('data-id');

                if ($('#skuItems').find('.skuItemListUl').eq(i).find('input[type="checkbox"]:checked').length > 0) {
                    $('#skuItems').find('.skuItemListUl').eq(i).find('input[type="checkbox"]').each(function (index, item) {
                        var key = $(item).parents('.skuItem').find('.formitemtitle').attr('data-type');
                        var Id = $(item).parents('.skuItem').find('.formitemtitle').attr('data-id');
                        // //获取所有的文字组合方式（包括不选中）
                        if (!allcombination[key]) allcombination[key] = [];
                        allcombination[key].push($(item).siblings('span').text());
                        // //获取所有的id组合方式（包括不选中）
                        if (!allIdcombination[key]) allIdcombination[key] = [];
                        allIdcombination[key].push($(item).attr('data-id'));
                        //如：颜色的id是111 =》 111 ：[红,白,蓝]
                        if (!selectList[Id]) selectList[Id] = [];
                        selectList[Id].push($(item).siblings('span').text());
                        //如：颜色的id是111 =》 111 ：[1,2,3]
                        if (!selectidList[Id]) selectidList[Id] = [];
                        selectidList[Id].push($(item).attr('data-id'));
                    })
                }


                $('#skuItems').find('.skuItemListUl').eq(i).find('input[type="checkbox"]').each(function (index, item) {

                    if (this.checked) {

                        if (!result[key]) result[key] = [];
                        result[key].push($(item).siblings('span').text());
                        if (!ids[key]) ids[key] = [];
                        ids[key].push($(item).attr('data-id'));
                        if (skuid.indexOf($('#skuItems').find('.formitemtitle').eq(i).attr('data-id')) > -1) {

                        } else {
                            skuid.push($('#skuItems').find('.formitemtitle').eq(i).attr('data-id'))
                        }

                    }
                })
            }
            ;
            data.values = result;
            data.ids = ids;
            data.skuid = skuid;
            data.allcombination = allcombination;
            data.allIdcombination = allIdcombination;
            ProductRelease.selectList = selectList;
            ProductRelease.selectidList = selectidList;
            console.log("选中的维度", allcombination)
            console.log("选中的维度", allIdcombination)
            return data;
        };

        //渲染的全部组合
        function render(result, ids, skuid, allcombination, allIdcombination) {
            var spliter = '\u2299';
            var keys = [];
            for (var attr_key in result) {
                keys.push(attr_key)
            }
            var allkey = [];
            for (var all_key in allcombination) {
                allkey.push(all_key)
            }

            var array = arrayNested(result, keys);
            var idsList = arrayNested(ids, keys);
            var allcombinationList = arrayNested(allcombination, allkey);
            var allIdcombination = arrayNested(allIdcombination, allkey)
            console.log(allcombinationList)
            console.log("id返回", allIdcombination)
            var html = "";
            //渲染表头
            html += `<tr class="SpecificationTh">`;
            for (var j = 0; j < keys.length; j++) {
                html += `<td align="center" class="fieldCell" style="width:50px !important" skuid="${skuid[j]}"><span>${keys[j]}</span></td>`;
                //创建targetBox
                var box = `<div style="position: absolute; display: none;" id="${skuid[j]}" class="target_box">
                                <span valueid="47" class="sku19values specspan" style="padding:3px;">1.2m</span>
                            </div>`
                $('body').append(box);
            }
            html += `
                         <td align="center">商城价</td>
                         <td align="center">成本价</td>
                         <td align="center">VIP价</td>
                         <td align="center" id="storeField"><em>*</em>库存</td>
                         <td align="center">图片(160*145)</td>
                         <td align="center">操作</td>`;
            html += `</tr>`;
            //获取所有组合
            ProductRelease.allKeys = doExchange(array);
            ProductRelease.allIds = doExchange(idsList);
            ProductRelease.allcombination = doExchange(allcombinationList);
            ProductRelease.allIdcombination = doExchange(allIdcombination);
            console.log("所有的id组合", ProductRelease.allIdcombination)
            //渲染(循环所有组合)
            for (var i = 0; i < ProductRelease.allKeys.length; i++) {
                //内容
                var value = ProductRelease.allKeys[i].split(spliter);
                //id
                var ids = ProductRelease.allIds[i].split(spliter);

                html += `<tr id="sku_${i + 1}" rowindex="${i}" class="SpecificationTr">`;
                for (var k = 0; k < value.length; k++) {
                    html += `<td align="center">
                                <div id="skuDisplay_1_20" rowid="${k}" skuid="${skuid[k]}" valueid="${ids[k]}" data-valueList="${ProductRelease.allKeys[i]}" data-idsList="${ProductRelease.allIds[i]}"class="specdiv">${value[k]}</div>
                             </td>`;
                }
                html += `
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control ShopPrice" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control CostPrice" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control VipPrice"  style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control Number"  style="width:100px;">
                       </td>
                       <td align="center">
                            <div class="img-containerSku">
                               <img class="select-img" src="/public/images/addImg.png">
                               <input class="img-input" type="file"accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                               <img class="close-img" src="/public/images/close.png">
                            </div>
                       </td>
                       <td align="center">
                         <a style="float:left;width:100%;text-algin:center" href="javascript:;" id="deleSku_1">
                          <span style="float:none;color:red" class="glyphicon glyphicon-trash DelectBtn"></span>
                         </a>
                       </td>`;
                html += `</tr>`;
                $('#skuBody').html(html)

            }

        };

        //计算出所有组合
        function doExchange(arr) {
            var spliter = '\u2299'
            var len = arr.length;
            // 当数组大于等于2个的时候
            if (len >= 2) {
                // 第一个数组的长度
                var len1 = arr[0].length;
                // 第二个数组的长度
                var len2 = arr[1].length;
                // 2个数组产生的组合数
                var lenBoth = len1 * len2;
                //  申明一个新数组,做数据暂存
                var items = new Array(lenBoth);
                // 申明新数组的索引
                var index = 0;
                // 2层嵌套循环,将组合放到新数组中
                for (var i = 0; i < len1; i++) {
                    for (var j = 0; j < len2; j++) {
                        items[index] = arr[0][i] + spliter + arr[1][j];
                        index++;
                    }
                }
                // 将新组合的数组并到原数组中
                var newArr = new Array(len - 1);
                for (var i = 2; i < arr.length; i++) {
                    newArr[i - 1] = arr[i];
                }
                newArr[0] = items;
                // 执行回调
                return doExchange(newArr);
            } else {
                return arr[0];
            }
        };

        //数组嵌套
        function arrayNested(result, keys) {
            var arr = Object.keys(result);
            console.log(arr.length)
            if (arr.length > 1) {
                var length = keys.length;
                console.log(length);
                var Inarray = new Array();
                for (var i = 0; i < length; i++) {
                    Inarray[i] = new Array();
                    var len2 = result[keys[i]].length;
                    for (var j = 0; j < len2; j++) {
                        if (result[keys[i]][j] != undefined)
                            Inarray[i][j] = result[keys[i]][j];
                    }
                }
                return Inarray
            } else {
                var oneArray = new Array();
                oneArray[0] = new Array();
                for (var k = 0; k < result[keys[0]].length; k++) {
                    if (result[keys[0]][k] != undefined)
                        oneArray[0][k] = result[keys[0]][k];
                }
                return oneArray
            }


        };

        //为targetBox更新数据
        function updateBox(item, arr, that, isSelectBox, idsArr) {
            var spliter = '\u2299';
            var index = that.attr('rowid');
            var chooseList = that.attr('data-valuelist').split(spliter);
            var chooseIDList = that.attr('data-idslist').split(spliter);
            var skuid = item.attr('id');
            var copy2 = chooseList.slice();
            var copy4 = chooseIDList.slice();
            screening();
            var html = "";
            if (isSelectBox) {
                //获取所有可能存在的文字组合的「幂集」
                var allPowerset = [];
                for (var i = 0; i < ProductRelease.uncheckList.length; i++) {
                    var arr1 = ProductRelease.uncheckList[i].split(spliter);
                    allPowerset = allPowerset.concat(powerset(arr1))
                }
                ProductRelease.allPowerset = unique(allPowerset)
                //获取所有可能存在的id组合的「幂集」
                var allIDPowerset = [];
                for (var i = 0; i < ProductRelease.uncheckIDList.length; i++) {
                    var arr2 = ProductRelease.uncheckIDList[i].split(spliter);
                    allIDPowerset = allIDPowerset.concat(powerset(arr2))
                }
                ProductRelease.allIDPowerset = unique(allIDPowerset)

                var list = copy4.join(spliter);
                var array = list.split(spliter);
                console.log("当前选择的项的数组", array);
                for (var i = 0; i < ProductRelease.selectidList[skuid].length; i++) {
                    var id = ProductRelease.selectidList[skuid][i];
                    var goods = ProductRelease.selectidList[skuid][i];
                    var FLAG1 = false;
                    var length = array.length;
                    var copy3 = array.slice();
                    copy3[index] = goods;
                    var str = copy3.join();
                    var reger = new RegExp("空", "g");
                    var reger1 = new RegExp(",", "g");
                    str = str.replace(reger, "");
                    str = str.replace(reger1, "");
                    console.log("处理后的字符串", str);
                    ProductRelease.allIDPowerset.forEach(function (item1, index1) {
                        var Item1 = item1.join();
                        var reger1 = new RegExp(",", "g");
                        Item1 = Item1.replace(reger1, "");
                        // console.log('所有的id组合的字符串',Item1)
                        if (str == Item1) {
                            console.log('相同的有', Item1)
                            FLAG1 = true;
                        }
                    })

                    if (FLAG1) {
                        html += `<span valueid="${id}" class="sku${skuid}values specspan" isSelectBox="true" style="padding:3px;">${ProductRelease.selectList[skuid][i]}</span>`
                    } else {
                        html += `<span valueid="${id}" class="sku${skuid}values specsna " style="padding:3px;">${ProductRelease.selectList[skuid][i]}</span>`
                    }

                }


            } else {
                for (var i = 0; i < ProductRelease.selectidList[skuid].length; i++) {
                    var flag = false;
                    var copy = chooseIDList.slice();
                    copy[index] = ProductRelease.selectidList[skuid][i];
                    var list = copy.join(spliter);
                    console.log("当前选择的项", list);


                    for (var attr_key in ProductRelease.uncheckIDList) {
                        var id = ProductRelease.selectidList[skuid][i];
                        if (list == ProductRelease.uncheckIDList[attr_key]) {
                            flag = true
                        }
                    }
                    if (flag) {
                        html += `<span valueid="${id}" class="sku${skuid}values specspan" style="padding:3px;">${ProductRelease.selectList[skuid][i]}</span>`
                    } else {
                        html += `<span valueid="${id}" class="sku${skuid}values specsna " style="padding:3px;">${ProductRelease.selectList[skuid][i]}</span>`
                    }

                }
            }

            item.html(html);


        };

        //筛选出未选中的项
        function screening() {
            var spliter = '\u2299';
            //未选中的组合
            ProductRelease.uncheckList = [];
            //未选中的id组合
            ProductRelease.uncheckIDList = [];
            var Copy = ProductRelease.allcombination.slice();
            var Copy1 = ProductRelease.allIdcombination.slice();
            var length = ProductRelease.allcombination.length;
            var length1 = ProductRelease.allIdcombination.length;
            console.log("所有的文字组合", ProductRelease.allcombination);
            console.log("所有的ID组合", ProductRelease.allIdcombination);
            console.log("已选中的组合", ProductRelease.allKeys)
            //所有文字组合处理
            for (var i = 0; i < ProductRelease.allcombination.length; i++) {
                var currentItem = ProductRelease.allcombination[i];
                var Flag = false;
                for (var j = 0; j < ProductRelease.allKeys.length; j++) {
                    var currentSelectItem = ProductRelease.allKeys[j];
                    if (currentItem != currentSelectItem) {

                    } else {
                        Flag = true;
                        break;
                    }
                }
                if (Flag) {
                    var copyLength = Copy.length;
                    var cha = length - copyLength;

                    Copy.splice(i - cha, 1);
                }

            }
            //所有id组合处理
            for (var i = 0; i < ProductRelease.allIdcombination.length; i++) {
                var currentItem1 = ProductRelease.allIdcombination[i];
                var Flag1 = false;
                for (var j = 0; j < ProductRelease.allIds.length; j++) {
                    var currentSelectItem1 = ProductRelease.allIds[j];
                    if (currentItem1 != currentSelectItem1) {

                    } else {
                        Flag1 = true;
                        break;
                    }
                }
                if (Flag1) {
                    var copyLength1 = Copy1.length;
                    var cha1 = length1 - copyLength1;

                    Copy1.splice(i - cha1, 1);
                }

            }
            ProductRelease.uncheckList = Copy;
            console.log("未选中文字的组合", ProductRelease.uncheckList);
            ProductRelease.uncheckIDList = Copy1;
            console.log("未选中ID的组合", ProductRelease.uncheckIDList);
            //获取所有可能存在的文字组合的「幂集」
            var allPowerset = [];
            for (var i = 0; i < ProductRelease.uncheckList.length; i++) {
                var arr1 = ProductRelease.uncheckList[i].split(spliter);
                allPowerset = allPowerset.concat(powerset(arr1))
            }
            ProductRelease.allPowerset = unique(allPowerset)
            //获取所有可能存在的id组合的幂集
            var allIDPowerset = [];
            for (var i = 0; i < ProductRelease.uncheckIDList.length; i++) {
                var arr1 = ProductRelease.uncheckIDList[i].split(spliter);
                allIDPowerset = allIDPowerset.concat(powerset(arr1))
            }
            ProductRelease.allIDPowerset = unique(allIDPowerset)
            console.log("所有可能存在的文字组合的幂集", ProductRelease.allPowerset)
            console.log("所有可能存在的id组合的幂集", ProductRelease.allIDPowerset)


        };

        //渲染增加的行
        function renderLine(length) {
            var spliter = '\u2299'
            var index = length;
            var html = "";
            console.log(ProductRelease.result);
            console.log(ProductRelease.skuid)
            var arr = Object.keys(ProductRelease.result);
            var valuesList = [];
            for (var i = 0; i < arr.length; i++) {
                valuesList.push('空');
            }
            var valuesList = valuesList.join(spliter)
            html += `<tr id="sku_${index}" rowindex="${index}" class="SpecificationTr">`
            for (var i = 0; i < arr.length; i++) {
                html += `<td align="center"><div id="skuDisplay_${index}_${ProductRelease.skuid[i]}" rowid="${i}" skuid="${ProductRelease.skuid[i]}" valueid="" data-valuelist = "${valuesList}" data-idslist="${valuesList}"  class="specdefault">请选择</div></td>`
            }
            html += `
                      <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control ShopPrice" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control CostPrice" style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control VipPrice"  style="width:100px;">
                       </td>
                       <td align="center">
                         <input type="text" class="skuItem_CostPrice form-control Number"  style="width:100px;">
                       </td>
                       <td align="center">
                            <div class="img-containerSku">
                               <img class="select-img" src="/public/images/addImg.png">
                               <input class="img-input" type="file"accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
                               <img class="close-img" src="/public/images/close.png">
                            </div>
                       </td>
                       <td align="center">
                         <a style="float:left;width:100%;text-algin:center" href="javascript:;" id="deleSku_1">
                          <span style="float:none;color:red" class="glyphicon glyphicon-trash DelectBtn"></span>
                         </a>
                       </td>`;
            html += `</tr>`
            $('#skuBody').append(html)

        };

        //取得集合的所有子集「幂集」
        function powerset(arr) {
            // console.log("传进来的数组",arr)
            var ps = [
                []
            ];
            for (var i = 0; i < arr.length; i++) {
                for (var j = 0, len = ps.length; j < len; j++) {
                    ps.push(ps[j].concat(arr[i]));
                }
            }
            return ps;
        };

        //数组去重
        function unique(arr) {
            var result = [],
                hash = {};
            for (var i = 0, elem;
                 (elem = arr[i]) != null; i++) {
                if (!hash[elem]) {
                    result.push(elem);
                    hash[elem] = true;
                }
            }
            return result;
        };

        //数据清空
        function clearData(isChange) {
            $('#skuBody').html("");
            $('#skuItems').find('input[type="checkbox"]').each(function (index, item) {
                if (this.checked) {
                    this.checked = false;
                }
            })
            $('#specificationsBox').show();
            $('#skuRow').hide();
            $('.target_box').each(function (index, item) {
                $(item).remove();
            })
            $('#openSkuBox').show();
            if (isChange) {
                ProductRelease.attributesList();
            }
            ProductRelease.isOpen = false;

        };


    },
    //获取后台品牌列表
    adminBrandList: function () {
        var methodName = "/brand/AdminBrandList";
        var data = {
            "Name": "",
            "Page": {
                "PageSize": 1000,
                "PageIndex": 1
            }
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                console.log(data)
                var render = template.compile(ProductRelease.brandTpl);
                var html = render(data.Data);
                $("#ProductBrand").append(html);
                ProductRelease.attributeGroupList();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取后台属性组列表
    attributeGroupList: function () {
        var methodName = "/productSku/AttributeGroupList";
        var data = {
            "Name": "",
            "Page": {
                "PageSize": 1000,
                "PageIndex": 1
            }
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                console.log(data)
                var render = template.compile(ProductRelease.AttributeTpl);
                var html = render(data.Data);
                $("#ProductAttribute").append(html);
                ProductRelease.adminCategoryList();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取后台属性列表
    attributesList: function (isInit, AttrGroupId, result) {
        var methodName = "/product/ProductAttributesList";
        var data = {
            "AttrGroupId": isInit ? AttrGroupId : $('#ProductAttribute').val(),
            "PId": Common.getUrlParam('PId') ? Common.getUrlParam('PId') : '0',
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                console.log(data)
                //如果长度大于0的话显示开启按钮
                if (data.Data.AttributesList.length > 0) {
                    $('#openSkuBox').show();
                } else {
                    $('#openSkuBox').hide();
                    ProductRelease.isOpen = false;
                }
                var render = template.compile(ProductRelease.skuAttrTpl);
                var html = render(data.Data);
                $("#skuItemsUl").html(html);
                if (isInit) {
                    $('#sureBtn').click();
                    console.log('结果是', result);
                    var render = template.compile(ProductRelease.editSkuTpl);
                    var html = render(result);
                    $("#skuBody").html(html);
                    var allKeys = [];
                    var allIds = [];
                    result.SKu.forEach(function (item, index) {
                        allKeys.push(item.AttrValueStringList);
                        allIds.push(item.AttrValueIdList);
                    })
                    console.log('之前选择的组合', ProductRelease.allKeys);
                    console.log('之前选择的id组合', ProductRelease.allIds);
                    ProductRelease.allKeys = allKeys;
                    ProductRelease.allIds = allIds;
                    console.log('当前选择的组合', ProductRelease.allKeys);
                    console.log('当前选择的id组合', ProductRelease.allIds);
                }

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //后台添加属性
    addAttributes: function (id, name, that) {
        var methodName = "/productSku/AddAttrValue";
        var data = {
            "AttrId": id,
            "AttrValueList": [name],
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                console.log(data)
                var value = $(that).siblings('input[type="text"]').val();
                if (value) {
                    var html = `<li style="padding:5px 0;margin-bottom:0;float:left;" class="contentLi">
                                                    <div class="checkBoxList">
                                                        <input type="checkbox" data-id="${data.Data}">
                                                        <span style="float:left;display: block">${value}</span>
                                                    </div>
                                                </li>`

                    $(that).parents('.skuItemListUl').find('.addBox').before(html);

                } else {
                    Common.showErrorMsg(data.Message);
                }
            }
        });
    },
    //获取门店列表
    adminStoreList: function () {
        var methodName = "/store/AdminGetAllStoreList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                console.log(data)
                var render = template.compile(ProductRelease.companyTpl);
                var html = render(data.Data);
                $("#store").append(html);

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取运费模板列表
    adminTemplatesList: function () {
        var methodName = "/templates/AdminTemplatesList";
        var data = {
            "Page": {
                "PageSize": 1000,
                "PageIndex": 1
            }
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {

                var render = template.compile(ProductRelease.freightTpl);
                var html = render(data.Data);
                $("#TemplateId").append(html);
                var PId = Common.getUrlParam("PId");
                if (PId != undefined && PId != "") {
                    ProductRelease.getProductInfo(PId);
                }
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 新增
    addProduct: function () {

        var methodName = "/product/AdminAddProduct";

        var ue = UE.getEditor('hcEditor');
        var Description = ue.getContent();

        var ue2 = UE.getEditor('parameterEditor');
        var parameter = ue2.getContent();
        var State = $("input[name='state']:checked").val();             //上下架

        var Img = [];
        var imgList = $(".productImg .img-container");
        for (var i = 0; i < imgList.length; i++) {
            var imgSrc = imgList.eq(i).find(".select-img").attr("src");
            if (imgSrc != "/public/images/addImg.png") {
                var dataSrc = imgList.eq(i).find(".select-img").attr("data-src");
                Img.push(dataSrc);
            }
        }

        //AttrIdList
        var AttrIdList = [];
        $('.SpecificationTh').find('.fieldCell').each(function (index, item) {
            AttrIdList.push($(item).attr('skuid'))
        })
        if (!Img.length) {
            Common.showInfoMsg('请上传轮播图')
            return false
        }

        var sku = [

            {
                "ShopPrice": $('#ShopPrice').val(),
                "CostPrice": $('#CostPrice').val(),
                "VipPrice": $('#VipPrice').val(),
                "Number": $('#Number').val(),
                "AttrValueId": [],
                "showImg": "",
            }
        ];
        var data = {
            "CateId": $("#classifyName").attr("data-id"),
            Name: $("#Name").val(),
            AttrGroupId: ProductRelease.isOpen ? $('#ProductAttribute').val() : "0",
            AttrIdList: ProductRelease.isOpen ? AttrIdList : [],
            ServiceDescription: $('#ServiceDescription').val(),
            FeeDescription: $('#FeeDescription').val(),
            DisplayOrder: $('#displayOrder').val(),
            "State": State,
            OpenDistribution:$('#switch').hasClass('switch-on') ? 1 : 0,
            OneType:$('#commissionOne').val(),
            OneValue:$('#commissionOnePrice').val(),
            TwoType:$('#commissionTwo').val(),
            TwoValue:$('#commissionTwoPrice').val(),
            StoreOneType:$('#storecommissionOne').val(),
            StoreOneValue:$('#storecommissionOnePrice').val(),
            StoreTwoType:$('#storecommissionTwo').val(),
            StoreTwoValue:$('#storecommissionTwoPrice').val(),
            SKu: !ProductRelease.isOpen ? sku : ProductRelease.skuList,
            ShowImg: $('#small_icon').attr('data-src'),
            Img: Img,
            Description: Description,
            Summary: parameter,

        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("新增成功", function () {
                    location.href = '/product/productList'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 编辑
    editProduct: function () {
        var methodName = "/product/AdminEditProduct";

        var ue = UE.getEditor('hcEditor');
        var Description = ue.getContent();

        var ue2 = UE.getEditor('parameterEditor');
        var parameter = ue2.getContent();
        var State = $("input[name='state']:checked").val();             //上下架
        var Img = [];
        var imgList = $(".productImg .img-container");
        for (var i = 0; i < imgList.length; i++) {
            var imgSrc = imgList.eq(i).find(".select-img").attr("src");
            if (imgSrc != "/public/images/addImg.png") {
                var dataSrc = imgList.eq(i).find(".select-img").attr("data-src");
                Img.push(dataSrc);
            }
        }

        //AttrIdList
        var AttrIdList = [];
        $('.SpecificationTh').find('.fieldCell').each(function (index, item) {
            AttrIdList.push($(item).attr('skuid'))
        })
        if (!Img.length) {
            Common.showInfoMsg('请上传轮播图')
            return false
        }

        var sku = [

            {
                "ShopPrice": $('#ShopPrice').val(),
                "CostPrice": $('#CostPrice').val(),
                "VipPrice": $('#VipPrice').val(),
                "Number": $('#Number').val(),
                "AttrValueId": [],
                "showImg": "",
            }
        ];
        var data = {
            PId: Common.getUrlParam('PId'),
            "CateId": $("#classifyName").attr("data-id"),
            Name: $("#Name").val(),
            AttrGroupId: ProductRelease.isOpen ? $('#ProductAttribute').val() : "0",
            AttrIdList: ProductRelease.isOpen ? AttrIdList : [],
            "State": State,
            OpenDistribution:$('#switch').hasClass('switch-on') ? 1 : 0,
            OneType:$('#commissionOne').val(),
            OneValue:$('#commissionOnePrice').val(),
            TwoType:$('#commissionTwo').val(),
            TwoValue:$('#commissionTwoPrice').val(),
            StoreOneType:$('#storecommissionOne').val(),
            StoreOneValue:$('#storecommissionOnePrice').val(),
            StoreTwoType:$('#storecommissionTwo').val(),
            StoreTwoValue:$('#storecommissionTwoPrice').val(),
            ServiceDescription: $('#ServiceDescription').val(),
            FeeDescription: $('#FeeDescription').val(),
            DisplayOrder: $('#displayOrder').val(),
            SKu: !ProductRelease.isOpen ? sku : ProductRelease.skuList,
            ShowImg: $('#small_icon').attr('data-src'),
            Img: Img,
            Description: Description,
            Summary: parameter

        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功", function () {
                    location.href = '/product/productList'
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 获取商品信息
    getProductInfo: function (PId) {
        var methodName = "/product/AdminProductInfo";
        var data = {
            PId: PId
        };
        SignRequest.setAsync(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var result = data.Data.ProductInfo;
                $("#Name").val(result.Name);
                $("#classifyName").attr("data-id", result.CateId);
                $("#classifyName").text(result.CateName);
                $("#ProductAttribute").val(result.AttrGroupId);
                $("#displayOrder").val(result.DisplayOrder);
                $("#FeeDescription").val(result.FeeDescription);

                $('#small_icon').attr('data-src', result.ShowImg);
                $('#small_icon').attr('src', result.ShowImgFull);
                $("#ServiceDescription").val(result.ServiceDescription);
                $("#commissionOne").val(result.OneType);
                $("#commissionOnePrice").val(result.OneValue);
                $("#commissionTwo").val(result.TwoType);
                $("#commissionTwoPrice").val(result.TwoValue);
                $("#storecommissionOne").val(result.StoreOneType);
                $("#storecommissionOnePrice").val(result.StoreOneValue);
                $("#storecommissionTwo").val(result.StoreTwoType);
                $("#storecommissionTwoPrice").val(result.StoreTwoValue);
                if(result.OpenDistribution){
                    $("#switch").addClass("switch-on").parents(".form-group").siblings().show();
                    honeySwitch.showOn("#switch")
                }else{
                    $("#switch").removeClass("switch-on").parents(".form-group").siblings().hide();
                    honeySwitch.showOff("#switch")
                }

                if(result.OneType){
                    $("#commissionOnePrice").siblings().html('元');
                }else{
                    $("#commissionOnePrice").siblings().html('%');
                }
                if(result.TwoType){
                    $("#commissionTwoPrice").siblings().html('元');
                }else{
                    $("#commissionTwoPrice").siblings().html('%');
                }

                if(result.StoreOneType){
                    $("#storecommissionOnePrice").siblings().html('元');
                }else{
                    $("#storecommissionOnePrice").siblings().html('%');
                }
                if(result.StoreTwoType){
                    $("#storecommissionTwoPrice").siblings().html('元');
                }else{
                    $("#storecommissionTwoPrice").siblings().html('%');
                }

                // 状态
                var stateList = $("#State label");
                for (var i = 0; i < stateList.length; i++) {
                    if (stateList.eq(i).find("input").val() == result.State) {
                        stateList.eq(i).find("input").prop("checked", true);
                    }
                }
                var imgArr = [];
                for (var i = 0; i < result.Img.length; i++) {
                    var imgData = {
                        Img: result.Img[i],
                        ImgFull: result.ImgFull[i]
                    };
                    imgArr.push(imgData);
                }
                var imgList = {
                    imglistData: imgArr
                };
                var render = template.compile(ProductRelease.imgTpl);
                var html = render(imgList);
                $("#productImg").html(html);

                var ue = UE.getEditor('hcEditor');
                ue.setContent(result.Description);

                var ue2 = UE.getEditor('parameterEditor');
                ue2.setContent(result.Summary);

                if (result.IsSku) {
                    ProductRelease.isOpen = true;
                    $('#specificationsBox').hide();
                    $('#skuRow').show();
                    //生成targetBox
                    result.AttributeList.forEach(function (item, indx) {
                        //创建targetBox
                        var box = `<div style="position: absolute; display: none;" id="${item.AttrId}" class="target_box">
                                <span valueid="47" class="sku19values specspan" style="padding:3px;">1.2m</span>
                            </div>`
                        $('body').append(box);
                    })
                    //代表初始化
                    ProductRelease.attributesList(true, result.AttrGroupId, result);

                } else {
                    $("#ShopPrice").val(result.SKu[0].ShopPrice);
                    $("#CostPrice").val(result.SKu[0].CostPrice);
                    $('#VipPrice').val(result.SKu[0].VipPrice);
                    $('#BigClientPrice').val(result.SKu[0].BigClientPrice);
                    $('#Weight').val(result.SKu[0].Weight);
                    $("#Number").val(result.SKu[0].Number);
                }


            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

    //后台分类列表
    adminCategoryList: function () {
        //请求方法
        var methodName = "/category/AdminCategoryList";
        var data = {};
        console.log(data)
        //请求接口
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render = template.compile(ProductRelease.GoodsListTemplate);
                var html = render(data.Data);
                $('#table_content_classify').html(html);
                ProductRelease.initHandle();
                var PId = Common.getUrlParam("PId");
                if (PId != undefined && PId != "") {
                    ProductRelease.getProductInfo(PId);
                }
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //初始化事件
    initHandle: function () {
        //文件收缩  第一层级
        $('.layer_ul_1 .layer-1 .jia_collapse_one').click(function () {
            //$(this).parents('.contentBody').siblings('.layer_ul_2').slideToggle();
            var display_state = $(this).parents('.contentBody').siblings('.layer_ul_2').css('display'); //所以要用行内样式控制

            if (display_state == 'none') {
                $(this).parents('.contentBody').siblings('.layer_ul_2').slideDown();
                $(this).find('img').attr('src', '../public/images/zhankai.png');
            } else {
                $(this).parents('.contentBody').siblings('.layer_ul_2').slideUp();
                $(this).find('img').attr('src', '../public/images/suoqi.png');
            }
        });

        //文件收缩 第二层级
        $('.layer_ul_2 .layer-2 .jia_collapse_two').click(function () {

            var display_state = $(this).parents('.contentBody').siblings('.layer_ul_3').css('display'); //所以要用行内样式控制
            if (display_state == 'none') {
                $(this).parents('.contentBody').siblings('.layer_ul_3').slideDown();
                $(this).find('img').attr('src', '../public/images/zhankai.png');
            } else {
                $(this).parents('.contentBody').siblings('.layer_ul_3').slideUp();
                $(this).find('img').attr('src', '../public/images/suoqi.png');
            }
        });
    },

};