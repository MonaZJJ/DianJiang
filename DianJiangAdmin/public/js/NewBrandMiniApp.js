var diy_conitem_action = `<div class="diy-conitem-action">
        <div class="diy-conitem-action-btns">
            <a href="javascript:;" class="diy-conitem-btn diy-Up j-Up">上移</a>
            <a href="javascript:;" class="diy-conitem-btn diy-Down j-Down">下移</a>
            <a href="javascript:;" class="diy-conitem-btn diy-edit j-edit">编辑</a>
            <a href="javascript:;" class="diy-conitem-btn diy-del j-del">删除</a>
        </div>
    </div>`;

var droplist_menu = `<ul class="droplist-menu">
        <li data-val="1">
            <a href="javascript:;" data-toggle="modal" data-target="#selectShop">选择商品</a>
        </li>
        <li data-val="2">
            <a href="javascript:;" data-toggle="modal" data-target="#goodsCategory">选择分类</a>
        </li>
        <li data-val="4">
            <a href="javascript:;">站外链接</a>
        </li>
        <li data-val="5">
            <a href="javascript:;">站内链接</a>
        </li>
    </ul>`;
var droplist_menuProduct = `<ul class="droplist-menu">
        <li data-val="1">
            <a href="javascript:;" data-toggle="modal" data-target="#selectShop">选择商品</a>
        </li>
    </ul>`;
var ctrl_item_list_action = `<div class="ctrl-item-list-actions">
        <a href="javascript:;" title="上移" class="j-moveup">
            <img src="/public/images/turn_top.png" alt="">
        </a>
        <a href="javascript:;" title="下移" class="j-movedown">
            <img src="/public/images/turn_buttom.png" alt="">
        </a>
        <a href="javascript:;" title="删除" class="j-del">
            <img src="/public/images/del_modal.png" alt="">
        </a>
    </div>`;
var ctrl_item_list_action_classify = `<div class="ctrl-item-list-actions">
    
        <a href="javascript:;" title="删除" class="j-del">
            <img src="/public/images/del_modal.png" alt="">
        </a>
    </div>`;

var EditMiniApp = {

    //模块一轮播
    // 轮播图模板（添加到右边的手机那里的模板）
    swiperTpl: `<li class="ui-state-default ui-sortable-handle selected" data-type="1">
        <div class="diy-conitem sweiper">
            <ul>
                <li>
                    <img src="/public/images/mini/13.jpg" alt="">
                </li>
            </ul>
            <ul class="pageList">
                <li style="display:none"></li>
            </ul>
        </div>
        ${diy_conitem_action}
    </li>`,
    //轮播图模板详情（右边可以选择跳转类型的模板）
    swiper_detail_tpl: `<ul class="ctrl-item-list">
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/13.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height: 30px">
                    <label class="fi-name">标题：</label>
                    <div class="form-controls">
                        <input type="text" style="height: 30px" name="title" class="input xlarge" value="">
                        <span class="fi-help-text"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        750*1132
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action}
        </li>
        <li class="ctrl-item-list-add" title="添加">+</li>
    </ul>`,
    //轮播图模板详情 （右边可以选择跳转类型的模板）有数据时
    swiper_detail_tpl2: `<ul class="ctrl-item-list">
        {{each dataset as v i }}
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="{{dataset[i].pic}}">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
                <div class="fl imgnav-info">
                    <div class="formitems">
                        <label class="fi-name">链接到：</label>
                        <div class="form-controls">
                            <div class="droplist droplist-title">
                                <span>{{#dataset[i] | replaceToLink}}</span>
                                    <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                                </a>
                                ${droplist_menu}
                            </div>
                            <input type="hidden" class="j-verify" name="item_id" value="{{dataset[i].Title}}">
                            <span class="fi-help-text j-verify-linkType"></span>
                        </div>
                    </div>
                    <div class="formitems" style="line-height: 30px">
                        <label class="fi-name">标题：</label>
                        <div class="form-controls">
                            <input type="text" style="height: 30px" name="title" class="input xlarge" value="{{dataset[i].Title}}">
                            <span class="fi-help-text"></span>
                        </div>
                    </div>
                    <div class="formitems" style="line-height:28px;">
                        <label class="fi-name">图片尺寸：</label>
                        <div class="form-controls" style="line-height:26px;">
                            750*1132
                        </div>
                    </div>
                </div>
                ${ctrl_item_list_action}
        </li>
        {{/each}}
        <li class="ctrl-item-list-add" title="添加">+</li>
    </ul>`,
    //轮播图添加图片模板(个数不大于等于5个的时候的模板)
    swiper_addPIc_tpl: `<li class="ctrl-item-list-li clearfix">
        <div class="fl">
            <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                <img src="/public/images/mini/13.jpg">
                <span class="imgnav-reselect">选择图片</span>
            </div>
            <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
        </div>
        <div class="fl imgnav-info">
            <div class="formitems">
                <label class="fi-name">链接到：</label>
                <div class="form-controls">
                    <div class="droplist">
                        <a href="javascript:;" class="droplist-title j-droplist-toggle">
                            <span>请选择</span>
                            <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                        </a>
                        ${droplist_menu}
                    </div>
                    <input type="hidden" class="j-verify" name="item_id" value="">
                    <span class="fi-help-text j-verify-linkType"></span>
                </div>
            </div>
            <div class="formitems" style="line-height: 30px">
                <label class="fi-name">标题：</label>
                <div class="form-controls">
                    <input type="text" style="height: 30px" name="title" class="input xlarge" value="">
                    <span class="fi-help-text"></span>
                </div>
            </div>
            <div class="formitems" style="line-height:28px;">
                <label class="fi-name">图片尺寸：</label>
                <div class="form-controls" style="line-height:26px;">
                    750*1132
                </div>
            </div>
        </div>
        ${ctrl_item_list_action}
        </li><li class="ctrl-item-list-add" title="添加">+
    </li>`,
    //轮播图添加图片模板2(个数等于5个的时候的模板)
    swiper_addPIc2_tpl: `<li class="ctrl-item-list-li clearfix">
        <div class="fl">
            <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                <img src="/public/images/mini/13.jpg">
                <span class="imgnav-reselect">选择图片</span>
            </div>
            <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
        </div>
        <div class="fl imgnav-info">
            <div class="formitems">
                <label class="fi-name">链接到：</label>
                <div class="form-controls">
                    <div class="droplist">
                        <a href="javascript:;" class="droplist-title j-droplist-toggle">
                            <span>请选择</span>
                            <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                        </a>
                        ${droplist_menu}
                    </div>
                    <input type="hidden" class="j-verify" name="item_id" value="">
                    <span class="fi-help-text j-verify-linkType"></span>
                </div>
            </div>
            <div class="formitems" style="line-height: 30px">
                <label class="fi-name">标题：</label>
                <div class="form-controls">
                    <input type="text" style="height: 30px" name="title" class="input xlarge" value="">
                    <span class="fi-help-text"></span>
                </div>
            </div>
            <div class="formitems" style="line-height:28px;">
                <label class="fi-name">图片尺寸：</label>
                <div class="form-controls" style="line-height:26px;">
                    750*1132
                </div>
            </div>
        </div>
        ${ctrl_item_list_action}`,
    //模块一轮播结束

    // app3模板(视频模块)右侧手机显示的模板
    app3Tpl: `<li class="ui-state-default ui-sortable-handle selected" data-type="2">
        <div class="diy-conitem">
            <ul class="clearfix">
                <li class="board7 video_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/14.jpg">
                        </a>
                    </span>
                </li>
            </ul>
        </div>
        ${diy_conitem_action}
    </li>`,
    //app3模板详情
    app3_modal_tpl: `<ul class="ctrl-item-list">
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/14.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic">600*324</span>
            </div>
            <div class="fl imgnav-info" style="margin-left: 0">
                <div class="formitems">
                <div class="form-group" id="noVideo" style="overflow: hidden;width: 400px">
                    <label class="col-md-4 control-label">视频上传：</label>
                    <div class="col-md-8">
                        <div class="icon-box_about_classify">
                            <div class="small_con">
                                <img src="/public/images/addImgV.png" alt=""
                                     id="video_icon">
                                <div id="video_upload_pick"
                                     class="webuploader-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="hasVideo" style="display: none;overflow: hidden;width: 400px">
                    <label class="col-md-4 control-label">视频上传： </label>
                    <div class="col-md-8">
                        <video src="" alt="" id="video_real" controls="controls"
                               style="display: none;"></video>
                        <div class="icon-box_about_classify">
                            <div class="video_con" id="videoBtn">
                                <div id="video_icon1">上传</div>
                                <div id="video_upload_pick1"
                                     class="webuploader-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </li>
    </ul>`,
    //app2模板（右边可以选择跳转类型的模板）(视频模块) 有数据时（type为2）
    app3_modal_tpl2:
    // region
        `<ul class="ctrl-item-list">
        {{each dataset as v i }}
                <li class="ctrl-item-list-li clearfix">
                <div class="fl">
                    <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                        <img src="{{dataset[i].pic}}">
                        <span class="imgnav-reselect">选择图片</span>
                    </div>
                    <span class="fi-help-text txtCenter mgt5 j-verify-pic">600*324</span>
                </div>
                <div class="fl imgnav-info" style="margin-left: 0">
                <div class="formitems">
                <div class="form-group" id="noVideo" style="display:{{dataset[i].videoUploadUrl ? 'none' : 'block'}};overflow: hidden;width: 400px">
                    <label class="col-md-4 control-label">视频上传：</label>
                    <div class="col-md-8">
                        <div class="icon-box_about_classify">
                            <div class="small_con">
                                <img src="/public/images/addImgV.png" alt=""
                                     id="video_icon">
                                <div id="video_upload_pick"
                                     class="webuploader-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group" id="hasVideo" style="display:{{dataset[i].videoUploadUrl ? 'block' : 'none'}};overflow: hidden;width: 400px">
                    <label class="col-md-4 control-label">视频上传： </label>
                    <div class="col-md-8">
                        <video src="{{dataset[i].videoUrl}}" data-src="{{dataset[i].videoUploadUrl}}" alt="" id="video_real" controls="controls"
                               style="{{dataset[i].videoUploadUrl ? 'block' : 'none'}}"></video>
                        <div class="icon-box_about_classify">
                            <div class="video_con" id="videoBtn">
                                <div id="video_icon1">上传</div>
                                <div id="video_upload_pick1"
                                     class="webuploader-container"></div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </li>
        {{/each}} 
    </ul>`,
    // endregion
    // app4模板(推荐商品)（type为4）
    app4Tpl: `<li class="ui-state-default ui-sortable-handle selected" data-type="4">
        <div class="diy-conitem">
            <ul class="clearfix" id="classifyBox">
                <li class="board9 title_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/15.jpg">
                        </a>
                    </span>
                </li>
                <li class="board9 small2_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/16.jpg">
                        </a>
                    </span>
                </li>
                <li class="board9 small2_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/16.jpg">
                        </a>
                    </span>
                </li>
                <li class="board9 small2_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/16.jpg">
                        </a>
                    </span>
                </li>
                <li class="board9 small2_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/16.jpg">
                        </a>
                    </span>
                </li>
                <li class="board9 small2_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/16.jpg">
                        </a>
                    </span>
                </li>
                <li class="board9 small2_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/16.jpg">
                        </a>
                    </span>
                </li>
            </ul>
        </div>
       ${diy_conitem_action}
    </li>`,
    // app4模板(推荐商品)（type为4）有数据的时候
    app4DataTpl: `<li class="ui-state-default ui-sortable-handle selected" data-type="4">
        <div class="diy-conitem">
            <ul class="clearfix" id="classifyBox">
                <li class="board9 title_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/15.jpg">
                        </a>
                    </span>
                </li>
                {{each dataset as v i }}
                    {{if i > 0}}
                        <li class="board9 small2_img">
                            <span>
                                <a href="#">
                                    <img src="/public/images/mini/16.jpg">
                                </a>
                            </span>
                        </li>
                    {{/if}}
                {{/each}}
            </ul>
        </div>
       ${diy_conitem_action}
    </li>`,
    //app4模板详情（右边可以选择跳转类型的模板）（热门品类）（type为4）
    app4_modal_tpl:
    // region
        `<ul class="ctrl-item-list">
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/15.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        750*190
                    </div>
                </div>
            </div>
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        204*307
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action_classify}
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                       204*307
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action_classify}
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        204*307
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action_classify}
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        204*307
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action_classify}
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        204*307
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action_classify}
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        204*307
                    </div>
                </div>
            </div>
            ${ctrl_item_list_action_classify}
        </li>
        
        <li class="ctrl-item-list-add" title="添加">+</li>
    </ul>`,
    // endregion
    //app4模板详情（右边可以选择跳转类型的模板）（热门品类） 有数据时（type为4）
    app4_modal_tpl2: `<ul class="ctrl-item-list">
        {{each dataset as v i }}
            <li class="ctrl-item-list-li clearfix">
                <div class="fl">
                    <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                        <img src="{{dataset[i].pic}}">
                        <span class="imgnav-reselect">选择图片</span>
                    </div>
                    <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
                </div>
                <div class="fl imgnav-info">
                    <div class="formitems">
                        <label class="fi-name">链接到：</label>
                        <div class="form-controls">
                            <div class="droplist">
                                <span>{{#dataset[i] | replaceToLink}}</span>
                                    <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                                </a>
                                ${droplist_menuProduct}
                            </div>
                            <input type="hidden" class="j-verify" name="item_id" value="">
                            <span class="fi-help-text j-verify-linkType"></span>
                        </div>
                    </div>
                  <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                    {{if i == 0}}
                        750*190
                    {{else}}
                        204*307
                    {{/if}}   
                    </div>
                   </div>
                </div>
              {{if i == 0}}
                
              {{else}}
                  ${ctrl_item_list_action_classify}
              {{/if}}  
            </li>
        {{/each}}
        <li class="ctrl-item-list-add" title="添加">+</li>
    </ul>`,
    addClassifyTpl: `
        <li class="board9 small2_img">
            <span>
                <a href="#">
                    <img src="/public/images/mini/16.jpg">
                </a>
            </span>
        </li>
    `,
    classify_addPIc_tpl: `
       <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/16.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menuProduct}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        204*307
                    </div>
                </div>
            </div>
             ${ctrl_item_list_action_classify}
        </li>
       </li><li class="ctrl-item-list-add" title="添加">+</li>
    `,


    // app2模板(商品模块)（展示在手机页面）
    app2Tpl: `<li class="ui-state-default ui-sortable-handle selected" data-type="5">
        <div class="diy-conitem">
            <ul class="clearfix">
                <li class="board7 title_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/9.jpg">
                        </a>
                    </span>
                </li>
                <li class="board7 small1_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/10.jpg">
                        </a>
                    </span>
                </li>
                <li class="board7 small1_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/10.jpg">
                        </a>
                    </span>
                </li>
                <li class="board7 mid1_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/11.jpg">
                        </a>
                    </span>
                </li>
                <li class="board7 small1_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/10.jpg">
                        </a>
                    </span>
                </li>
                <li class="board7 small1_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/10.jpg">
                        </a>
                    </span>
                </li>
            </ul>
        </div>
        ${diy_conitem_action}
    </li>`,
    //app2模板（右边可以选择跳转类型的模板）（商品模块） 有数据时（type为5）
    app2_modal_tpl2: `<ul class="ctrl-item-list">
        {{each dataset as v i }}
            <li class="ctrl-item-list-li clearfix">
                <div class="fl">
                    <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                        <img src="{{dataset[i].pic}}">
                        <span class="imgnav-reselect">选择图片</span>
                    </div>
                    <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
                </div>
                <div class="fl imgnav-info">
                    <div class="formitems">
                        <label class="fi-name">链接到：</label>
                        <div class="form-controls">
                            <div class="droplist">
                                <span>{{#dataset[i] | replaceToLink}}</span>
                                    <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                                </a>
                                ${droplist_menu}
                            </div>
                            <input type="hidden" class="j-verify" name="item_id" value="">
                            <span class="fi-help-text j-verify-linkType"></span>
                        </div>
                    </div>
                     {{if i == 3}}
                         <div class="formitems" style="line-height: 30px">
                            <label class="fi-name">主标题：</label>
                            <div class="form-controls">
                                <input type="text" style="height: 30px" name="title" class="input xlarge" value="{{dataset[i].Title}}">
                                <span class="fi-help-text"></span>
                            </div>
                        </div>
                        <div class="formitems" style="line-height: 30px">
                            <label class="fi-name">副标题：</label>
                            <div class="form-controls">
                                <input type="text" style="height: 30px" name="title" class="input xSmall" value="{{dataset[i].smallTitle}}">
                                <span class="fi-help-text"></span>
                            </div>
                        </div>
                    {{/if}}
                  <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                    {{if i == 0}}
                        750*200
                    {{else if i< 3&& i > 0}}
                        372*593
                    {{else if i == 3}}
                        521*880
                    {{else}}
                        372*593
                    {{/if}}   
                    </div>
                </div>
                </div>
            </li>
        {{/each}} 
       
    </ul>`,
    //app2模板详情
    app2_modal_tpl:
    // region
        `<ul class="ctrl-item-list">
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/9.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        750*200
                    </div>
                </div>
            </div>
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/10.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        372*593
                    </div>
                </div>
            </div>
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/10.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        372*593
                    </div>
                </div>
            </div>
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/11.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height: 30px">
                    <label class="fi-name">主标题：</label>
                    <div class="form-controls">
                        <input type="text" style="height: 30px" name="title" class="input xlarge" value="">
                        <span class="fi-help-text"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height: 30px">
                    <label class="fi-name">副标题：</label>
                    <div class="form-controls">
                        <input type="text" style="height: 30px" name="title" class="input xSmall" value="">
                        <span class="fi-help-text"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        521*880
                    </div>
                </div>
            </div>
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/10.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        372*593
                    </div>
                </div>
            </div>
        </li>
        <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/10.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        372*593
                    </div>
                </div>
            </div>
        </li>
    </ul>`,
    // endregion
    // app6模板(自定义文案)
    app6Tpl: `<li class="ui-state-default ui-sortable-handle selected" data-type="6">
        <div class="diy-conitem">
            <ul class="clearfix appUl">
                <li class="board10 auto_img">
                    <span>
                        <a href="#">
                            <img src="/public/images/mini/17.jpg">
                        </a>
                    </span>
                </li>
            </ul>
        </div>
        ${diy_conitem_action}
    </li>`,
    //app6模板详情（自定义文案)
    app6_modal_tpl: `<ul class="ctrl-item-list">
         <li class="ctrl-item-list-li clearfix">
            <div class="fl">
                <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                    <img src="/public/images/mini/17.jpg">
                    <span class="imgnav-reselect">选择图片</span>
                </div>
                <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
            </div>
            <div class="fl imgnav-info">
                <div class="formitems">
                    <label class="fi-name">链接到：</label>
                    <div class="form-controls">
                        <div class="droplist">
                            <a href="javascript:;" class="droplist-title j-droplist-toggle">
                                <span>请选择</span>
                                <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                            </a>
                            ${droplist_menu}
                        </div>
                        <input type="hidden" class="j-verify" name="item_id" value="">
                        <span class="fi-help-text j-verify-linkType"></span>
                    </div>
                </div>
                 <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        高度自适应
                    </div>
                </div>
            </div>
        </li>
    </ul>`,
    //app6模板详情（自定义文案) 有数据时
    app6_modal_tpl2: `<ul class="ctrl-item-list">
        {{each dataset as v i }}
            <li class="ctrl-item-list-li clearfix">
                <div class="fl">
                    <div class="imgnav j-selectimg" data-target="#insertcustom_img" data-toggle="modal">
                        <img src="{{dataset[i].pic}}">
                        <span class="imgnav-reselect">选择图片</span>
                    </div>
                    <span class="fi-help-text txtCenter mgt5 j-verify-pic"></span>
                </div>
                <div class="fl imgnav-info">
                    <div class="formitems">
                        <label class="fi-name">链接到：</label>
                        <div class="form-controls">
                            <div class="droplist">
                                <span>{{#dataset[i] | replaceToLink}}</span>
                                    <img src="/public/images/bottom.png" alt="" style="padding-bottom: 3px;padding-left: 3px;">
                                </a>
                                ${droplist_menu}
                            </div>
                            <input type="hidden" class="j-verify" name="item_id" value="">
                            <span class="fi-help-text j-verify-linkType"></span>
                        </div>
                    </div>
                  <div class="formitems" style="line-height:28px;">
                    <label class="fi-name">图片尺寸：</label>
                    <div class="form-controls" style="line-height:26px;">
                        高度自适应
                    </div>
                </div>
                </div>
            </li>
        {{/each}}
    </ul>`,
    //模板（一级分类）
    GoodsListTemplate: `<ul class="layer_ul_1">
        {{each CategoryList as value i}}
            <li class="layer-1">
                <div class="contentBody">
                    <div class="col-xs-1">{{CategoryList[i].CateId}}</div>
                    <div class="col-xs-7">
                        <div class="classify_one">
                            <i class="iconfont icon-wenjianjia"></i>
                            {{CategoryList[i].Name}}
                        </div>
                    </div>
                    <div class="col-xs-4">
                        <span class="pick" data-id={{CategoryList[i].CateId}} data-name="{{CategoryList[i].Name}}">选择</span>
                    </div>
                </div>
            </li>
        {{/each}}
    </ul>`,
    brandTpl: `
        {{each BrandList as value i}}
            <option value="{{BrandList[i].BrandId}}">{{BrandList[i].Name}}</option>
        {{/each}}
    `,
    labelTpl: `
        {{each ProductLabelList as value i}}
            <label class="checkbox-inline">
                <input type="checkbox" value="{{ProductLabelList[i].PLId}}"> {{ProductLabelList[i].Name}}
            </label>
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
        <div class="img-container">
            <img class="select-img" src="/public/images/addImgV.png">
            <input class="img-input" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
            <img class="close-img" src="/public/images/close.png">
        </div>
    `,
    cateTpl: `
        <option value="0">请选择</option>
        {{each CategoryList as value i}}
            <option value="{{CategoryList[i].CateId}}">{{CategoryList[i].Name}}</option>
        {{/each}}
    `,
    cateBoxTemplate:
        `<li class="newT" data-toggle="modal" data-target="#addGrouping">
        <span class="glyphicon glyphicon-plus"></span>新建分组</li>
        <li class="ImgT a_b" data-id="0">未分组</li>
        {{each List as v i}}
        <li class="ImgT" data-id="{{List[i].CategoryId}}">{{List[i].Name}}</li>
        {{/each}}
    `,
    picBoxTemplate:
        `{{each List as value i}}
        <div class="pin col-md-2" data-id="{{List[i].MaterialId}}">
            <div class="file-item thumbnail box">
                <img style="height:120px"src="{{List[i].FileUrlFull}}" alt="">
            </div>
            <div></div>
        </div>
        {{/each}}
    `,
    moveBoxTemplate:
        `<li class="file_li" data-id="0">
                <i class="glyphicon glyphicon-folder-open" style="color:#bde0e9;margin-right: 10px"></i>未分组
     </li>
     {{each List as value i}}
         <li class="file_li" data-id="{{List[i].CategoryId}}">
                    <i class="glyphicon glyphicon-folder-open" style="color:#bde0e9;margin-right: 10px"></i>{{List[i].Name}}
         </li>
     {{/each}}
    `,
    Type: "",
    PicPageIndex: 1,
    init: function () {
        //使用辅助函数替换链接
        template.defaults.imports.replaceToLink = EditMiniApp.replaceToLink;
        if(Common.getUrlParam('id')){
            EditMiniApp.AdminGetHomeConfig();
        }
        //初始化布局拖动事件
        EditMiniApp.sortableInit();

        //添加模块点击事件
        $("#addModal").on('click', '.j-diy-addModule', function () {
            var modal_type = $(this).attr("data-type");
            //根据不同类型生成不同的模板
            EditMiniApp.generateTpl(modal_type, true);
        });

        $('body').on('click', '.droplist .typeV', function () {
            return false;
        })

        //保存按钮点击
        $('body').on('click','#conserve',function(){
            $('#myBrandModal').modal('show');
        })
        //点击某一模块进行编辑
        $("body").on("click", ".ui-state-default", function () {
            // console.log($(this).attr("data-Type"));
            $(this).addClass("selected").siblings(".ui-state-default").removeClass("selected").find("ul");
            if ($("#sortable .selected").attr("data-dataset") == "" || $("#sortable .selected").attr("data-dataset") == undefined || JSON.parse($("#sortable .selected").attr("data-dataset")).length == 0) {
                EditMiniApp.detailTpl($(this).attr("data-Type"));
            } else {
                console.log($("#sortable .selected").attr("data-dataset"))
                EditMiniApp.isSaveData($(this).attr("data-Type"));
            }

            EditMiniApp.Type = $(this).attr("data-Type");
            $(".diy-conitem").css("border", "none");
            $("#sortable .selected").find(".diy-conitem").css("border", "2px dashed #fa0");
            $(".diy-conitem-action-btns").css("display", "none");
            $("#sortable .selected").find(".diy-conitem-action-btns").css("display", "block");
        });
        $("body").on("mouseover", ".ui-state-default", function () {
            EditMiniApp.Type = $(this).attr("data-Type");
        });

        //删除模块
        $("#sortable").on("click", ".j-del", function (e) {
            e.stopPropagation();
            var _this = $(this)
            Common.confirmDialog("删除后将不可恢复，是否继续？", function () {
                if (_this.parents(".ui-state-default").hasClass("selected")) {
                    var Type = false;
                    EditMiniApp.detailTpl(Type);
                }
                _this.parents(".ui-state-default").remove();
            });
        });

        //模板上移事件绑定
        $("#sortable").on("click", ".j-Up", function () {
            $(this).parent().parent().parent().insertBefore($(this).parent().parent().parent().prev());
            EditMiniApp.UpOrDownShow();

            // if ($("#sortable .selected").attr("data-type") == 1) {
            //     //轮播
            //     $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            // } else if ($("#sortable .selected").attr("data-type") == 2) {
            //     //视频版块
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected #listMa li:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // } else if ($("#sortable .selected").attr("data-type") == 3) {
            //     //热销单品，推荐搭配，本周上新
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected .appUl .board5:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // } else if ($("#sortable .selected").attr("data-type") == 4 || $("#sortable .selected").attr("data-type") == 5) {
            //     //热门品类与各分类商品模块
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected .board7:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // }
        });

        //模板下移事件绑定
        $("#sortable").on("click", ".j-Down", function () {
            $(this).parent().parent().parent().insertAfter($(this).parent().parent().parent().next());
            EditMiniApp.UpOrDownShow();
            // if ($("#sortable .selected").attr("data-type") == 1) {
            //     $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            // } else if ($("#sortable .selected").attr("data-type") == 2) {
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected #listMa li:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // } else if ($("#sortable .selected").attr("data-type") == 3) {
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected .appUl .board5:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // } else if ($("#sortable .selected").attr("data-type") == 4) {
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected .board9:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // }
            // else if ($("#sortable .selected").attr("data-type") == 5) {
            //     $(".ctrl-item-list-li").each(function (index, item) {
            //         $(".selected .board7:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
            //     });
            // }
        });

        //删除图片添加选项
        $("#diy-ctrl").on("click", ".j-del", function () {
            if ($("#sortable .selected").attr("data-type") == 1) {
                $(".selected .pageList li:eq(" + $(this).parents(".ctrl-item-list-li").index() + ")").remove();
                if ($(".ctrl-item-list-li").length < 7) {
                    if ($(".ctrl-item-list-add").length == 0) {
                        console.log($(this).parents(".ctrl-item-list"));
                        $('<li class="ctrl-item-list-add" title="添加">+</li>').appendTo($(this).parents(".ctrl-item-list"));
                    }
                }
                $(this).parents(".ctrl-item-list-li").remove();
                if ($(".ctrl-item-list-li").length == 1 || $(".ctrl-item-list-li").length == 0) {
                    $(".selected .pageList li").hide();
                }
                $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            } else if ($("#sortable .selected").attr("data-type") == 4) {
                //分类删除
                $(".selected #classifyBox li:eq(" + $(this).parents(".ctrl-item-list-li").index() + ")").remove();

                if ($(".ctrl-item-list-add").length == 0) {
                    $('<li class="ctrl-item-list-add" title="添加">+</li>').appendTo($(this).parents(".ctrl-item-list"));
                }

                $(this).parents(".ctrl-item-list-li").remove();

                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected #listMa li:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            }
            EditMiniApp.storageOffside();
        });
        // 上移图片添加选项
        $("#diy-ctrl").on("click", ".j-moveup", function () {
            $(this).parent().parent().insertBefore($(this).parent().parent().prev('.ctrl-item-list-li'));
            EditMiniApp.storageOffside();
            if ($("#sortable .selected").attr("data-type") == 1) {
                $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            } else if ($("#sortable .selected").attr("data-type") == 2) {
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected #listMa li:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            } else if ($("#sortable .selected").attr("data-type") == 3) {
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .appUl .board5:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            } else if ($("#sortable .selected").attr("data-type") == 4 || $("#sortable .selected").attr("data-type") == 5) {
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .board7:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            }
        });
        // 下移图片添加选项
        $("#diy-ctrl").on("click", ".j-movedown", function () {
            $(this).parent().parent().insertAfter($(this).parent().parent().next('.ctrl-item-list-li'));
            EditMiniApp.storageOffside();

            if ($("#sortable .selected").attr("data-type") == 1) {
                $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            } else if ($("#sortable .selected").attr("data-type") == 2) {
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected #listMa li:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            } else if ($("#sortable .selected").attr("data-type") == 3) {
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .appUl .board5:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            } else if ($("#sortable .selected").attr("data-type") == 4 || $("#sortable .selected").attr("data-type") == 5) {
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .board7:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            }
        });

        //选中标签替换链接
        $("#diy-ctrl").on("click", ".droplist-menu li", function () {
            EditMiniApp.dataVal = $(this).attr("data-val");
            EditMiniApp.replaceLink($(this));
            $(this).parents(".droplist-menu").hide();
        });
        //选中标签替换链接
        $("#diy-ctrl").on("mouseover", ".droplist", function () {
            $(this).find(".droplist-menu").show();
        });

        //点击添加图片
        $("#diy-ctrl").on("click", ".ctrl-item-list-add", function () {
            $(".selected .pageList li").show();
            var ulTpl = $(this).parents(".ctrl-item-list");
            var _this = $(this);
            // 选中轮播图
            if ($("#sortable .selected").attr("data-type") == 1) {
                if ($(".ctrl-item-list-li").length < 5) {
                    $(EditMiniApp.swiper_addPIc_tpl).appendTo(ulTpl);
                    _this.remove();
                } else if ($(".ctrl-item-list-li").length == 5) {
                    // 少于4个时添加<li>+</li>
                    $(EditMiniApp.swiper_addPIc2_tpl).appendTo(ulTpl);
                    $(".ctrl-item-list-add").remove();
                }
                $(".selected .pageList").append("<li></li>");
                //当轮播图图片选择少于2个时
                if ($(".ctrl-item-list-li").length == 1 || $(".ctrl-item-list-li").length == 0) {
                    $(".selected .pageList li").hide();
                }
                $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            } else if ($("#sortable .selected").attr("data-type") == 4) {
                // 选中分类的时候
                if ($(".ctrl-item-list-li").length == 0) {
                    $(".diy-ctrl-item").html(EditMiniApp.app4_modal_tpl);
                    return;
                } else {
                    $(EditMiniApp.classify_addPIc_tpl).appendTo(ulTpl);
                    _this.remove();
                }
                $(EditMiniApp.addClassifyTpl).appendTo(".selected #classifyBox");

                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected #listMa li:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            }
            EditMiniApp.storageOffside();
            return false;
        });
        //点击自定义弹窗中的图片，选中与否样式
        $('.wrapper_imgs_box').on('click', '.pin', function () {
            $(this).siblings('.pin').find('.box').siblings('div').removeClass('choice_true_dv');
            $(this).siblings('.pin').removeClass('rm')
            $(this).find('.box').siblings('div').toggleClass('choice_true_dv');
            $(this).toggleClass('rm');
        });

        //选择图片模态框显示
        $('#insertcustom_img').on('show.bs.modal', function (e) {
            EditMiniApp.adminGetCategoryList();
            EditMiniApp.adminGetMaterialList();
            setTimeout(() => {
                if (EditMiniApp.PicTotal > 0) {
                    //初始化分页
                    $.jqPaginator('#pagination2', {
                        totalCounts: EditMiniApp.PicTotal,
                        pageSize: 18,
                        visiblePages: 10,
                        currentPage: 1,
                        prev: '<li class="prev"><a href="javascript:;">&lt;</a></li>',
                        next: '<li class="next"><a href="javascript:;">&gt;</a></li>',
                        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                        onPageChange: function (num, type) {
                            EditMiniApp.PicPageIndex = num;
                            EditMiniApp.adminGetMaterialList();
                            $('#p2').text(type + '：' + num);
                        }
                    });
                }
            }, 200);

        });
        //选择商品模态框显示
        $('#selectShop').on('show.bs.modal', function (e) {
            EditMiniApp.getProductBrand(); //初始化商品品牌
            EditMiniApp.getProductCategory();
            EditMiniApp.selectBootstrapTable();
        });
        //选择分类模态框显示
        $('#goodsCategory').on('show.bs.modal', function (e) {
            EditMiniApp.adminCategoryList(); //初始化商品分类
        });
        //选择商品分类模态框显示
        $('#removeFileModal').on('show.bs.modal', function (e) {
            EditMiniApp.adminGetCategoryList();
        });
        //选择品牌模态框显示
        $('#selectBrand').on('show.bs.modal', function (e) {
            EditMiniApp.brandBootstrapTable();
        });

        //选择商品确定
        $("#addProduct").click(function () {

            var selectContent = $('#productTabel').bootstrapTable('getSelections')[0];
            if (typeof (selectContent) == 'undefined') {
                Common.showErrorMsg("请选择一列数据!");
                return false;
            }
            EditMiniApp.selectLink(EditMiniApp.productName, selectContent);
            $("#selectShop").modal("hide");
        });

        //选择分类点击选择
        $("#goodsCategory").on("click", ".pick", function () {
            EditMiniApp.linkName = $(this).attr("data-name");
            EditMiniApp.pickId = $(this).attr("data-id");
            EditMiniApp.selectLink(EditMiniApp.linkName);
            $('#goodsCategory').modal("hide");
        });

        //选择品牌确定
        $("#addBrand").click(function () {
            var selectContent = $('#brandTabel').bootstrapTable('getSelections')[0];
            if (typeof (selectContent) == 'undefined') {
                Common.showErrorMsg("请选择一列数据!");
                return false;
            }
            EditMiniApp.selectLink(EditMiniApp.brandName, selectContent);
            $("#selectBrand").modal("hide");
        });

        //选择分类移动模态框点击选择
        $(".cebian_ul2").on("click", " .file_li", function () {
            $(this).addClass('file_li_active').siblings('.file_li').removeClass('file_li_active');
            EditMiniApp.fileId = $(this).attr("data-id");
        });

        //移动确认按钮点击
        $('body').on('click', '#remove_file_confirm', function () {
            var list = [];
            $('#ImgBox .pin').each(function (index, item) {
                if ($(item).hasClass("rm")) {
                    list.push(Number($(item).attr('data-id')));
                }
            });
            EditMiniApp.adminMoveMaterial(list, EditMiniApp.fileId);
            $('#removeFileModal').modal("hide");
        });

        //查询
        $("#productSearch").on("click", function () {
            var data = {
                "Name": $('#UserName').val(),
                "CateId": $('#CateId').val(),
                "BrandId": $('#BrandId').val(),
            }
            EditMiniApp.projectSelectQuery(data);
        });

        //点击图片侧边栏的li时候
        $("#picGroup").on("click", '.cebian_ul .ImgT', function () {
            var index = $(this).index();
            var _thisId = $(this).attr("data-id");
            $(this).addClass('a_b').siblings('.ImgT').removeClass('a_b');
            EditMiniApp.adminGetMaterialList();
            setTimeout(() => {
                //初始化分页
                if (EditMiniApp.PicTotal > 0) {
                    $.jqPaginator('#pagination2', {
                        totalCounts: EditMiniApp.PicTotal,
                        pageSize: 18,
                        visiblePages: 10,
                        currentPage: 1,
                        prev: '<li class="prev"><a href="javascript:;">&lt;</a></li>',
                        next: '<li class="next"><a href="javascript:;">&gt;</a></li>',
                        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                        onPageChange: function (num, type) {
                            EditMiniApp.PicPageIndex = num;
                            EditMiniApp.adminGetMaterialList();
                            $('#p2').text(type + '：' + num);
                        }
                    });
                }
            }, 200);
            // EditMiniApp.adminGetCategoryList();
            // UeditorCreate.QueryMediaList();
        });

        //点击创建分组
        $("#creatTabNameBtn").click(function () {
            if ($("#TabName").val() == "") {
                Common.showErrorMsg("分组名字不能为空");
                return;
            }
            EditMiniApp.adminAddCategory($("#TabName").val());
        });

        //排序方式改变
        $('body').on('change', '#timeOrder_box', function () {
            EditMiniApp.adminGetMaterialList();
            setTimeout(() => {
                if (EditMiniApp.PicTotal > 0) {
                    //初始化分页
                    $.jqPaginator('#pagination2', {
                        totalCounts: EditMiniApp.PicTotal,
                        pageSize: 18,
                        visiblePages: 10,
                        currentPage: 1,
                        prev: '<li class="prev"><a href="javascript:;">&lt;</a></li>',
                        next: '<li class="next"><a href="javascript:;">&gt;</a></li>',
                        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                        onPageChange: function (num, type) {
                            EditMiniApp.PicPageIndex = num;
                            EditMiniApp.adminGetMaterialList();
                            $('#p2').text(type + '：' + num);
                        }
                    });
                }
            }, 200);
        });

        //批量删除按钮点击
        $('body').on('click', '.delectAll', function () {
            var list = [];
            $('#ImgBox .pin').each(function (index, item) {
                if ($(item).hasClass("rm")) {
                    list.push(Number($(item).attr('data-id')));
                }
            })
            Common.confirmDialog('确认要删除吗?', function () {
                EditMiniApp.adminBatchDeleteMaterial(list)
            })
        });

        //选择商品表格分页每页显示数据
        $("#pagesize_dropdown").on("change", function () {
            EditMiniApp.projectDectoryQuery();
        });

        //点击地下保存按钮
        $("#j-savePage-app").click(function () {

            //品牌名称
            if (!Validate.emptyValidateAndFocusAndColor("#brandName", "请输入品牌名称", "")) {
                return false;
            }

            var LModules = new Array();
            var pidList = [];
            $("#sortable .ui-state-default").each(function (index, item) {
                console.log($(item).attr("data-dataset"))
                var obj = {};
                obj.type = $(item).attr("data-type");
                obj.sort = index;
                if ($(item).attr("data-dataset") == undefined || $(item).attr("data-dataset") == "") {
                    obj.content = {
                        dataset: ""
                    }
                } else {
                    obj.content = {
                        dataset: JSON.parse($(item).attr("data-dataset"))
                    }
                    //如果是推荐商品模块
                    if(obj.type == 4){
                        var json = JSON.parse($(item).attr("data-dataset"));
                        json.forEach(function(itemInner,index){
                            if(itemInner.PId){
                                pidList.push(itemInner.PId)
                            }
                        })
                    }
                }
                LModules.push(obj);
            });
            console.log(LModules);
            $('#myBrandModal').modal('hide')
            //添加还是编辑
            if(Common.getUrlParam('id')){
                //    编辑
                EditMiniApp.AdminSaveHomeConfig(JSON.stringify(LModules),pidList);
            }else{
                //新增
                EditMiniApp.AdminAddHomeConfig(JSON.stringify(LModules),pidList)
            }
        });

        $("#diy-ctrl").on("click", ".imgnav", function () {
            EditMiniApp.SelectShopIndex = $(this).parents(".ctrl-item-list-li").index();
        });

        //选择图片确认按钮点击事件
        $("#insert_img_btn").click(function () {

            var _src = $(".rm").eq(0).find("img").attr("src");
            $(".ctrl-item-list-li:eq(" + EditMiniApp.SelectShopIndex + ")").find(".imgnav img").attr("src", _src);
            $('#insertcustom_img').modal("hide");
            if ($("#sortable .selected").attr("data-type") == 1) {
                //轮播
                $(".selected .sweiper").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li").eq(0).find(".imgnav img").attr("src"));
            } else if ($("#sortable .selected").attr("data-type") == 2) {
                //视频
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .board7:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });

            } else if ($("#sortable .selected").attr("data-type") == 3) {
                //热销
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .appUl .board5:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            } else if ($("#sortable .selected").attr("data-type") == 4) {
                //品类
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .board9:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });

            } else if ($("#sortable .selected").attr("data-type") == 5) {
                //商品
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .board7:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            } else if ($("#sortable .selected").attr("data-type") == 6) {
                //自定义文案
                $(".ctrl-item-list-li").each(function (index, item) {
                    $(".selected .board10:eq(" + index + ")").find("img").attr("src", $("#diy-ctrl .ctrl-item-list-li:eq(" + index + ")").find(".imgnav img").attr("src"));
                });
            }

            EditMiniApp.storageOffside();
        });

        //详情input失去焦点
        $("#diy-ctrl").on("blur", ".xlarge,.typeV", function () {
            var thisindex = $(this).parents(".ctrl-item-list-li").index();
            var thisval = $(this).val();
            $(".selected #listMa li:eq(" + thisindex + ")").find(".members_nav1_name").text(thisval);
        });
        $("#diy-ctrl").bind("input propertychange", ".xlarge,.typeV", function () {
            EditMiniApp.storageOffside();
        });

        // 重置
        $("#j-resetToInit").click(function () {
            Common.confirmDialog('还原后您编辑的模板将不能保存，确认还原吗?', function () {
                EditMiniApp.AdminGetDefaultConfig();
            })
        });
    },
    // 储存每个对象的方法
    storageOffside: function () {
        //type 1选择商品 2 选择分类 3 选择品牌 4 站外链接 5 站内链接

        var dataset = new Array();
        $("#diy-ctrl .ctrl-item-list-li").each(function (index, item) {
            var obj = {};
            obj.Type = $(item).find(".droplist .typeV").attr("data-val");
            if (obj.Type == undefined) {
                obj.Type = "";
                obj.Title = $(item).find(".xlarge").val();
                obj.videoUrl = $(item).find("#video_real").attr('src') ? $(item).find("#video_real").attr('src') : "";
                obj.videoUploadUrl = $(item).find("#video_real").attr('data-src') ? $(item).find("#video_real").attr('data-src') : "";
            } else if (obj.Type == 4) {
                obj.link = $(item).find(".droplist .typeV").val();
                obj.Title = $(item).find(".xlarge").val();
                obj.smallTitle = $(item).find(".xSmall").val();
            } else if (obj.Type == 5) {
                obj.link = $(item).find(".droplist .typeV").val();
                obj.Title = $(item).find(".xlarge").val();
                obj.smallTitle = $(item).find(".xSmall").val();
            } else if (obj.Type == 1) {
                //选择的是商品的情况下
                obj.link = $(item).find(".droplist .typeV").val();
                obj.PId = $(item).find(".droplist .typeV").attr('data-id');
                obj.showtitle = $(item).find(".droplist .typeV").find(".badge-link").text();
                //数据替换
                obj.price = '$Price_' + $(item).find(".droplist .typeV").attr('data-id') + '$';
                obj.name = '$Name_' + $(item).find(".droplist .typeV").attr('data-id') + '$';
                obj.img = '$Img_' + $(item).find(".droplist .typeV").attr('data-id') + '$';
            } else {
                obj.link = $(item).find(".droplist .typeV").attr("href");
                obj.Title = $(item).find(".xlarge").val();
                obj.smallTitle = $(item).find(".xSmall").val();
                obj.showtitle = $(item).find(".droplist .typeV").find(".badge-link").text();
            }
            obj.pic = $(item).find(".imgnav img").attr("src");
            dataset.push(obj);
        });
        console.log(dataset);
        if ($("#sortable .selected").attr("data-type") == "9" || $("#sortable .selected").attr("data-type") == "10" || $("#sortable .selected").attr("data-type") == "11" || $("#sortable .selected").attr("data-type") == "12") {
            dataset = EditMiniApp.datasetArray;
        }
        $("#sortable .selected").attr("data-dataset", JSON.stringify(dataset));
    },
    //判断是否已经存储数据来生成详情
    isSaveData: function (type) {
        $(".diy-ctrl-item").show();
        var obj = {
            dataset: JSON.parse($("#sortable .selected").attr("data-dataset"))
        }
        console.log(obj);
        if (type == "1") {
            //轮播图
            var render = template.compile(EditMiniApp.swiper_detail_tpl2);
            var html = render(obj);
            $(".diy-ctrl-item").html(html);
            if (obj.dataset.length > 5) {
                $(".ctrl-item-list-add").hide();
            } else {
                $(".ctrl-item-list-add").show();
            }
        } else if (type == "2") {
            //视频模块
            var render = template.compile(EditMiniApp.app3_modal_tpl2);
            var html = render(obj);
            $(".diy-ctrl-item").html(html);
            //上传视频
            uploadIconVideo('#video_upload_pick', '#video_icon', '/HomeConfig/UploadVideo');
            uploadIconVideo('#video_upload_pick1', '#video_icon1', '/HomeConfig/UploadVideo');
        } else if (type == "3") {
            //热销单品 推荐搭配 本周上新
            var render = template.compile(EditMiniApp.app1_modal_tpl2);
            var html = render(obj);
            $(".diy-ctrl-item").html(html);
        } else if (type == "4") {
            //热门品类
            var render = template.compile(EditMiniApp.app4_modal_tpl2);
            var html = render(obj);
            $(".diy-ctrl-item").html(html);
        } else if (type == "5") {
            //商品模块
            var render = template.compile(EditMiniApp.app2_modal_tpl2);
            var html = render(obj);
            $(".diy-ctrl-item").html(html);
        } else if (type == "6") {
            //自定义文案
            var render = template.compile(EditMiniApp.app6_modal_tpl2);
            var html = render(obj);
            $(".diy-ctrl-item").html(html);
        } else if (type == false) {
            $(".diy-ctrl-item").hide();
            return;
        }
        EditMiniApp.repositionCtrl();
    },
    // 替换链接辅助函数
    replaceToLink: function (str) {
        console.log(str)
        //type 1选择商品 2 选择分类 3 选择品牌 4 站外链接 5 站内链接
        if (str.Type == 1) {
            var Str = '<a data-val="' + str.Type + '" data-id="' + str.PId + '" href="' + str.link + '" class="typeV badge badge-success"><span class="select_title">选择商品</span><em class="badge-link ovfEps">' + str.showtitle + '</em></a>';
        } else if (str.Type == 2) {
            var Str = '<a data-val="' + str.Type + '" href="' + str.link + '" class="typeV badge badge-success"><span class="select_title">选择分类</span><em class="badge-link ovfEps">' + str.showtitle + '</em></a>';
        } else if (str.Type == 3) {
            var Str = '<a data-val="' + str.Type + '" href="' + str.link + '" class="typeV badge badge-success"><span class="select_title">选择品牌</span><em class="badge-link ovfEps">' + str.showtitle + '</em></a>';
        } else if (str.Type == 4) {
            var Str = '<input data-Val="' + str.Type + '" type="text" name="customlink" class="typeV input" placeholder="输入完整的URL(以http://或者https://开头)" value="' + str.link + '">';
        } else if (str.Type == 5) {
            var Str = '<input data-Val="' + str.Type + '" type="text" name="customlink" class="typeV input" placeholder="输入小程序页面路径" value="' + str.link + '">';
        }
        if (Str == undefined) {
            return "请选择"
        }
        return Str;
    },
    // 替换链接
    replaceLink: function (_this) {
        console.log(_this.parents(".ctrl-item-list-li").index());
        EditMiniApp.SelectShopIndex = _this.parents(".ctrl-item-list-li").index();
        if (EditMiniApp.dataVal == 1) {
            return;
        } else if (EditMiniApp.dataVal == 2) {
            return;
        } else if (EditMiniApp.dataVal == 3) {
            return;
        }
        EditMiniApp.selectLink();
    },
    // 根据dataVal替换不同链接
    selectLink: function (str, selectContent) {

        if (EditMiniApp.dataVal == 1) {
            var Str = '<a data-Val="1" data-id="' + EditMiniApp.PId + '" href="/pages/productCenter/goodDetail/goodDetail?PId=' + EditMiniApp.PId + '" class="typeV badge badge-success" data-ShowImg="' + EditMiniApp.productShowImgFull + '"><span class="select_title">选择商品</span><em class="badge-link ovfEps">' + str + '</em></a>';
        } else if (EditMiniApp.dataVal == 2) {
            var Str = '<a data-Val="2" href="/pages/productCenter/productList/productList?CateId=' + EditMiniApp.pickId + '" class="typeV badge badge-success"><span class="select_title">选择分类</span><em class="badge-link ovfEps">' + str + '</em></a>';
        } else if (EditMiniApp.dataVal == 3) {
            var Str = '<a data-Val="3" href="/pages/productCenter/productBrand/productBrand?BrandId=' + EditMiniApp.BrandId + '" class="typeV badge badge-success"><span class="select_title">选择品牌</span><em class="badge-link ovfEps">' + str + '</em></a>';
        } else if (EditMiniApp.dataVal == 4) {
            var Str = '<input data-Val="4" type="text" name="customlink" class="typeV input" placeholder="输入完整的URL(以http://或者https://开头)" value="">';
        } else if (EditMiniApp.dataVal == 5) {
            var Str = '<input data-Val="5" type="text" name="customlink" class="typeV input" placeholder="输入小程序页面路径" value="">';
        }
        $(".ctrl-item-list-li:eq(" + EditMiniApp.SelectShopIndex + ")").find(".droplist span").html(Str);
        EditMiniApp.storageOffside();
    },
    //根据不同类型生成不同的模板
    generateTpl: function (type, flag, isClassifyGet) {
        $(".diy-ctrl-item").show();
        $(".ui-state-default").removeClass("selected");
        $(".diy-conitem").css("border", "2px dashed transparent");
        if (type == "1") {
            //轮播
            $(EditMiniApp.swiperTpl).appendTo("#sortable");
            $(".diy-ctrl-item").html(EditMiniApp.swiper_detail_tpl);
        } else if (type == "2") {
            //视频模块
            $(EditMiniApp.app3Tpl).appendTo("#sortable");
            $(".diy-ctrl-item").html(EditMiniApp.app3_modal_tpl);
            //上传视频
            uploadIconVideo('#video_upload_pick', '#video_icon', '/HomeConfig/UploadVideo');
            uploadIconVideo('#video_upload_pick1', '#video_icon1', '/HomeConfig/UploadVideo');
        } else if (type == "3") {
            //热销
            $(EditMiniApp.app1Tpl).appendTo("#sortable");
            $(".diy-ctrl-item").html(EditMiniApp.app1_modal_tpl);
        } else if (type == "4") {
            //品类
            console.log("数据", isClassifyGet)
            if (isClassifyGet) {
                var render = template.compile(EditMiniApp.app4DataTpl);
                var obj = {
                    dataset: isClassifyGet,
                }
                var html = render(obj);
                $(html).appendTo("#sortable");
            } else {
                $(EditMiniApp.app4Tpl).appendTo("#sortable");
            }
            $(".diy-ctrl-item").html(EditMiniApp.app4_modal_tpl);
        } else if (type == "5") {
            //商品模块
            $(EditMiniApp.app2Tpl).appendTo("#sortable");
            $(".diy-ctrl-item").html(EditMiniApp.app2_modal_tpl);
        } else if (type == "6") {
            //自定义文案
            $(EditMiniApp.app6Tpl).appendTo("#sortable");
            $(".diy-ctrl-item").html(EditMiniApp.app6_modal_tpl);
        }
        if (flag == false) {
            return;
        }
        EditMiniApp.detailTpl(type);
    },
    //根据不同类型显示不同的详情
    detailTpl: function (type) {
        $(".diy-ctrl-item").show();
        if (type == "1") {
            //轮播
            $(".diy-ctrl-item").html(EditMiniApp.swiper_detail_tpl);
        } else if (type == "2") {
            //视频
            $(".diy-ctrl-item").html(EditMiniApp.app3_modal_tpl);
            //上传视频
            uploadIconVideo('#video_upload_pick', '#video_icon', '/HomeConfig/UploadVideo');
            uploadIconVideo('#video_upload_pick1', '#video_icon1', '/HomeConfig/UploadVideo');
        } else if (type == "3") {
            //热销
            $(".diy-ctrl-item").html(EditMiniApp.app1_modal_tpl);
        } else if (type == "4") {
            //品类
            $(".diy-ctrl-item").html(EditMiniApp.app4_modal_tpl);
        } else if (type == "5") {
            //商品
            $(".diy-ctrl-item").html(EditMiniApp.app2_modal_tpl);
        } else if (type == "6") {
            //自定义文案
            $(".diy-ctrl-item").html(EditMiniApp.app6_modal_tpl);
        } else if (type == false) {
            $(".diy-ctrl-item").hide();
            return;
        }
        EditMiniApp.repositionCtrl();
    },
    // 新增
    AdminAddHomeConfig: function (obj,pidList) {
        var methodName = "/homeconfig/AdminAddBrandConfig";
        var data = {
            "Title": $('#brandName').val(),
            "PIds":pidList,
            ModulesData: obj
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("新增成功!", function () {
                    location.href = '/miniApp/brandList'
                });

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 编辑
    AdminSaveHomeConfig: function (obj,pidList) {
        var methodName = "/homeconfig/AdminEditBrandConfig";
        var data = {
            "Id": Common.getUrlParam('id'),
            "Title": $('#brandName').val(),
            "PIds":pidList,
            ModulesData: obj
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("编辑成功!", function () {
                    location.href = '/miniApp/brandList'
                });

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取信息
    AdminGetHomeConfig: function () {
        var methodName = "/homeconfig/AdminGetBrandConfigById";
        var data = {
            Id: Common.getUrlParam('id')
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                var obj = JSON.parse(data.Data.ModulesData);
                console.log(obj);
                $('#brandName').val(data.Data.Title)
                if (obj.length == 0) {
                } else {
                    $("#sortable").html("");
                }
                $.each(obj, function (index, item) {

                    if (item.content.dataset == "") {

                    } else {
                        if (item.type == 1) {
                            EditMiniApp.generateTpl(item.type, false);
                            //轮播
                            $(".selected .sweiper").find("img").attr("src", item.content.dataset[0].pic);
                        } else if (item.type == 2) {
                            EditMiniApp.generateTpl(item.type, false);
                            //视频
                            $.each(item.content.dataset, function (index, item) {
                                $(".selected .board7:eq(" + index + ")").find("img").attr("src", item.pic);
                            });
                        } else if (item.type == 3) {
                            EditMiniApp.generateTpl(item.type, false);
                            //热销
                            $.each(item.content.dataset, function (index, item) {
                                $(".selected .appUl .board5:eq(" + index + ")").find("img").attr("src", item.pic);
                            });
                        } else if (item.type == 4) {
                            //分类的做特殊处理
                            EditMiniApp.generateTpl(item.type, false, item.content.dataset);
                            //品类
                            $.each(item.content.dataset, function (index, item) {
                                $(".selected .board9:eq(" + index + ")").find("img").attr("src", item.pic);
                            });


                        } else if (item.type == 5) {
                            EditMiniApp.generateTpl(item.type, false);
                            //商品模块
                            $.each(item.content.dataset, function (index, item) {
                                $(".selected .board7:eq(" + index + ")").find("img").attr("src", item.pic);
                            });
                        } else if (item.type == 6) {
                            EditMiniApp.generateTpl(item.type, false);
                            //自定义文案
                            $.each(item.content.dataset, function (index, item) {
                                $(".selected .board10:eq(" + index + ")").find("img").attr("src", item.pic);
                            });
                        }
                    }
                    $(".diy-ctrl-item").css("display", "none");
                });
                $("#sortable .ui-state-default").each(function (index, item) {
                    $(item).attr("data-dataset", JSON.stringify(obj[index].content.dataset));
                });
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //还原初始模板
    AdminGetDefaultConfig: function () {
        var methodName = "/homeconfig/AdminGetDefaultConfig";
        var data = {
            Type: 2
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            console.log(data);
            if (data.Code == "100") {
                EditMiniApp.AdminSaveHomeConfig(data.Data.ModulesData);
                window.location.reload();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    stateFormatter: function (value, row, index) {
        if (row.state == true)
            return {
                disabled: true, //设置是否可用
                checked: true //设置选中
            };
        return value;
    },
    // 初始化布局拖动事件
    sortableInit: function () {
        $("#diy-phone .drag").sortable({
            revert: true,
            placeholder: "drag-highlight",
            stop: function (event, ui) {
                console.log(ui.item)
                ui.item.addClass("selected").siblings(".ui-state-default").removeClass("selected").find("ul");
                $(".diy-conitem").css("border", "none");
                $("#sortable .selected").find(".diy-conitem").css("border", "2px dashed #fa0");
                $(".diy-conitem-action-btns").css("display", "none");
                $("#sortable .selected").find(".diy-conitem-action-btns").css("display", "block");
                var Type = EditMiniApp.Type;
                if ($("#sortable .selected").attr("data-dataset") == "" || $("#sortable .selected").attr("data-dataset") == undefined || JSON.parse($("#sortable .selected").attr("data-dataset")).length == 0) {
                    EditMiniApp.detailTpl(Type);
                } else {
                    EditMiniApp.isSaveData(Type);
                }
            }
        }).disableSelection();
    },
    //初始化辅助空白slider
    sliderInit: function () {
        // With JQuery 使用JQuery 方式调用

        var myslider = $('#ex1').slider({
            formatter: function (value) {
                return 'Current value: ' + value;
            }
        }).on('slide', function (slideEvt) {
            //当滚动时触发
            //console.info(slideEvt);
            //获取当前滚动的值，可能有重复
            // console.info(slideEvt.value);
            $(".selected .custom-space").css("height", slideEvt.value + "px");
            $(".blank_num").html(slideEvt.value + "px");
            $("#sortable .selected").attr("data-height", slideEvt.value);
        }).on('change', function (e) {
            //当值发生改变的时候触发
            //console.info(e);
            //获取旧值和新值
            // console.info(e.value.oldValue + '--' + e.value.newValue);
        });
        var str = $(".selected .custom-space").css("height");
        var reg = new RegExp("px", "g");
        var theValue = Number(str.replace(reg, ""));
        myslider.slider('setValue', theValue);
        $(".blank_num").html(theValue + "px");
        $(".slider-handle").addClass("ui-slider-handle ui-state-default ui-corner-all").css({
            "position": "relative",
            "top": "3px"
        });
    },
    // 重置ctrl位置
    repositionCtrl: function (conitem, ctrl) {
        var top_conitem = $("#sortable .selected").offset().top;
        var curPosTop = top_conitem - 170;
        $(".diy-ctrl-item").css("marginTop", curPosTop); //设置位置
        $("html,body").animate({
            scrollTop: curPosTop
        }, 300); //滚动页面
    },
    //判断是否显示上移下移
    UpOrDownShow: function () {
        if ($(".drag .diy-conitem-action-btns").length < 2) {
            $(".drag .j-Down").hide();
            $(".drag .j-Up").hide();
        } else if ($(".drag .diy-conitem-action-btns").length == 2) {
            $(".drag .j-Down").eq(0).show();
            $(".drag .j-Up").eq(0).hide();
            $(".drag .j-Down").eq(1).hide();
            $(".drag .j-Up").eq(1).show();
        } else {
            $(".drag .j-Down").show();
            $(".drag .j-Up").show();
            $(".drag .j-Down").eq(0).show();
            $(".drag .j-Up").eq(0).hide();
            $(".drag .j-Down").eq($(".drag .diy-conitem-action-btns").length - 1).hide();
            $(".drag .j-Up").eq($(".drag .diy-conitem-action-btns").length - 1).show();
        }
    },
    //商品选择bootstrapTable
    selectBootstrapTable: function () {
        $('#productTabel').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/product/AdminProductList',
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
            singleSelect: true, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: EditMiniApp.selectQueryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: EditMiniApp.selectResponseHandler,
            columns: [{
                checkbox: true
            },
                {
                    field: 'ShowImgFull',
                    title: '商品图片',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {
                        var html = '<image style="width:50px" src="' + value + '">'
                        return html;
                    }
                },
                {
                    field: 'Name',
                    title: '商品名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {

                        var e = '<span>' + value + '</span>';
                        return e;
                    }
                },
                {
                    field: 'ShopPrice',
                    title: '商品价格',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {

                        var e = '<span>' + value + '</span>';

                        return e;
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
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#dishes_list_table').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法
                // console.log(row);
                // console.log(tr);
                // console.log(flied);
            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {
                // for (var i = 0; i < rows.length; i++) {
                //     DishesList.UserIdsList.push(rows[i].User.Id);
                //     DishesList.UserOpenIds.push(rows[i].User.OpenId);
                // }
            },
            onUncheckAll: function (rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function (row) {
                console.log(row)
                EditMiniApp.productName = row.Name;
                EditMiniApp.productShowImgFull = row.ShowImgFull;
                EditMiniApp.PId = row.PId;
            },
            //取消每一个单选框时对应的操作；
            onUncheck: function (row) {


            }
        });
    },
    //bootstrap table post 参数 queryParams
    selectQueryParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/product/AdminProductList";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            minSize: $("#leftLabel").val(),
            maxSize: $("#rightLabel").val(),
            minPrice: $("#priceleftLabel").val(),
            maxPrice: $("#pricerightLabel").val(),
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            },
            "Name": $('#productName').val(),
            "CateId": $('#CateId').val(),
            "State": 1,
            "BrandId": 0,
            "StyleId": 0,
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    selectResponseHandler: function (res) {
        if (res.Data != null) {
            // console.log(res.Data);
            return {
                "rows": res.Data.ProductList,
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
    projectSelectQuery: function (parame) {
        if (parame == "" ||
            parame == undefined) {
            var obj = {
                "Name": $('#productName').val(),
                "CateId": $('#CateId').val(),
                "State": 1,
                "BrandId": 0,
                "StyleId": 0,
                page: {
                    PageSize: $("#pagesize_dropdown").val(),
                    PageIndex: 1
                },
            };
        } else {
            var obj = parame;
        }

        $('#productTabel').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/product/AdminProductList',
                query: obj
            }
        );

    },
    projectDectoryQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {
                "Name": $('#productName').val(),
                "CateId": $('#CateId').val(),
                "State": 1,
                "BrandId": 0,
                "StyleId": 0,
            };
        } else {
            var obj = parame;
        }
        //方法名
        var methodName = "/product/AdminProductList";


        $('#productTabel').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/product/AdminProductList',
                query: obj
            }
        );
        EditMiniApp.selectBootstrapTable()
    },
    //品牌选择bootstrapTable
    brandBootstrapTable: function () {
        $('#brandTabel').bootstrapTable({
            method: 'post',
            url: SignRequest.urlPrefix + '/homeconfig/AdminGetBrandConfig',
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
            singleSelect: true, //复选框只能选择一条记录
            search: false, //是否显示右上角的搜索框
            clickToSelect: true, //点击行即可选中单选/复选框
            sidePagination: "server", //表格分页的位置
            queryParams: EditMiniApp.brandQueryParams, //参数
            queryParamsType: "limit", //参数格式,发送标准的RESTFul类型的参数请求
            toolbar: "#toolbar", //设置工具栏的Id或者class
            responseHandler: EditMiniApp.brandResponseHandler,
            columns: [{
                checkbox: true
            },
                {
                    field: 'Name',
                    title: '品牌名称',
                    align: 'center',
                    valign: 'middle',
                    formatter: function (value, row, index) {

                        var e = '<span>' + value + '</span>';
                        return e;
                    }
                },
            ], //列
            silent: true, //刷新事件必须设置
            formatLoadingMessage: function () {
                return "请稍等，正在加载中...";
            },
            formatNoMatches: function () { //没有匹配的结果
                return '无符合条件的记录';
            },
            onLoadSuccess: function (data) {
                console.log(data);

                $('.caret').remove()

            },
            onLoadError: function (data) {
                $('#dishes_list_table').bootstrapTable('removeAll');
            },
            // 1.点击每行进行函数的触发
            onClickRow: function (row, tr, flied) {
                // 书写自己的方法
                // console.log(row);
                // console.log(tr);
                // console.log(flied);
            },
            //2. 点击前面的复选框进行对应的操作
            //点击全选框时触发的操作
            //点击全选框时触发的操作
            onCheckAll: function (rows) {
                // for (var i = 0; i < rows.length; i++) {
                //     DishesList.UserIdsList.push(rows[i].User.Id);
                //     DishesList.UserOpenIds.push(rows[i].User.OpenId);
                // }
            },
            onUncheckAll: function (rows) {

            },
            //点击每一个单选框时触发的操作
            onCheck: function (row) {
                console.log(row)
                EditMiniApp.brandName = row.Name;
                EditMiniApp.BrandId = row.Id;
            },
            //取消每一个单选框时对应的操作；
            onUncheck: function (row) {


            }
        });
    },
    //bootstrap table post 参数 queryParams
    brandQueryParams: function (params) {
        //配置参数
        //方法名
        var methodName = "/homeconfig/AdminGetBrandConfig";

        var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            minSize: $("#leftLabel").val(),
            maxSize: $("#rightLabel").val(),
            minPrice: $("#priceleftLabel").val(),
            maxPrice: $("#pricerightLabel").val(),
            Page: {
                PageSize: params.limit,
                PageIndex: (params.offset / params.limit) + 1,
            },
        };
        return temp;
    },
    // 用于server 分页，表格数据量太大的话 不想一次查询所有数据，可以使用server分页查询，数据量小的话可以直接把sidePagination: "server"  改为 sidePagination: "client" ，同时去掉responseHandler: responseHandler就可以了，
    brandResponseHandler: function (res) {
        if (res.Data != null) {
            // console.log(res.Data);
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
    brandSelectQuery: function (parame) {
        if (parame == "" ||
            parame == undefined) {
            var obj = {
                page: {
                    PageSize: $("#pagesize_dropdown").val(),
                    PageIndex: 1
                },
            };
        } else {
            var obj = parame;
        }

        $('#productTabel').bootstrapTable(
            "refresh", {
                url: SignRequest.urlPrefix + '/homeconfig/AdminGetBrandConfig',
                query: obj
            }
        );

    },
    brandDectoryQuery: function (parame) {
        if (parame == "" || parame == undefined) {
            var obj = {};
        } else {
            var obj = parame;
        }
        //方法名
        var methodName = "/homeconfig/AdminGetBrandConfig";


        $('#productTabel').bootstrapTable(
            "destroy", {
                url: SignRequest.urlPrefix + '/homeconfig/AdminGetBrandConfig',
                query: obj
            }
        );
        EditMiniApp.selectBootstrapTable()
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
                var render = template.compile(EditMiniApp.GoodsListTemplate);
                var html = render(data.Data);
                $('#table_content_classify').html(html);
                EditMiniApp.initHandle();
                EditMiniApp.getProductBrand();
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
    // 获取商品品牌
    getProductBrand: function () {
        var methodName = "/brand/AdminBrandList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(EditMiniApp.brandTpl);
                var html = render(data.Data);
                $("#BrandId").append(html);

                EditMiniApp.getProductLabel();
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 获取商品标签
    getProductLabel: function () {
        var methodName = "/productLabel/AdminProductLabelList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(EditMiniApp.labelTpl);
                var html = render(data.Data);
                $("#PlIdList").html(html);

                var PId = Common.getUrlParam("PId");
                if (PId != undefined && PId != "") {
                    EditMiniApp.getProductInfo(PId);
                }

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
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var result = data.Data.ProductInfo;
                $("#classifyName").attr("data-id", result.CateId);
                $("#classifyName").text(result.CateName);
                $("#BrandId").val(result.BrandId);
                $("#Name").val(result.Name);
                $("#Summary").val(result.Summary);
                $("#TemplateId").val(result.TemplateId);
                $("#MarketPrice").val(result.MarketPrice);
                $("#ShopPrice").val(result.ShopPrice);
                $("#CostPrice").val(result.CostPrice);
                $("#PSn").val(result.PSn);
                $("#Number").val(result.Number);
                $("#Limit").val(result.Limit);

                // 状态
                var stateList = $("#State label");
                for (var i = 0; i < stateList.length; i++) {
                    if (stateList.eq(i).find("input").val() == result.State) {
                        stateList.eq(i).find("input").prop("checked", true);
                    }
                }

                // 标签
                var labelList = $("#PlIdList label");
                for (var i = 0; i < result.PlIdList.length; i++) {
                    for (var j = i; j < labelList.length; j++) {
                        if (labelList.eq(j).find("input").val() == result.PlIdList[i]) {
                            labelList.eq(j).find("input").prop("checked", true);
                        }
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
                var render = template.compile(EditMiniApp.imgTpl);
                var html = render(imgList);
                $("#productImg").html(html);

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    // 获取商品分类
    getProductCategory: function () {
        var methodName = "/category/AdminIndexFirstCategoryList";
        var data = {};
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                var render = template.compile(EditMiniApp.cateTpl);
                var html = render(data.Data);
                $("#CateId").html(html);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //查询文件夹列表
    adminGetCategoryList: function () {
        var methodName = "/Material/AdminGetCategoryList";
        var data = {
            "Page": {
                "PageSize": 100,
                "PageIndex": 1
            }
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                var render1 = template.compile(EditMiniApp.cateBoxTemplate);
                var html1 = render1(data.Data);
                $('.cebian_ul').html(html1);
                var render2 = template.compile(EditMiniApp.moveBoxTemplate);
                var html2 = render2(data.Data);
                $('.cebian_ul2').html(html2);
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //创建文件夹接口
    adminAddCategory: function (name) {
        var methodName = "/Material/AdminAddCategory";
        var data = {
            "Name": name
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg('添加成功', function () {
                    $("#addGrouping").modal("hide");
                    EditMiniApp.adminGetCategoryList();
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //确认上传素材
    adminSaveMaterial: function (list) {
        var methodName = "/Material/AdminSaveMaterial";
        var data = {
            "TempImageList": list,
            "CategoryId": $(".a_b").attr("data-id")
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("上传成功!", function () {
                })

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //获取素材库列表
    adminGetMaterialList: function () {
        var methodName = "/Material/AdminGetMaterialList";
        var data = {
            "FileName": $(".ipt_search_message").val(),
            "CategoryId": $(".a_b").attr("data-id"),
            "DisplayOrder": $("#timeOrder_box option:selected").attr("data-value"),
            "IsAsc": $("#timeOrder_box option:selected").attr("data-type"),
            "Page": {
                "PageSize": 18,
                "PageIndex": EditMiniApp.PicPageIndex
            }
        };
        SignRequest.set(methodName, data, function (data) {
            console.log(data)
            if (data.Code == "100") {
                EditMiniApp.PicTotal = data.Data.Total;
                var render = template.compile(EditMiniApp.picBoxTemplate);
                var html = render(data.Data);
                $('#ImgBox').html(html);
                uploadPic_toLibrary2('#FilePicker');
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //批量删除素材接口
    adminBatchDeleteMaterial: function (list) {
        var methodName = "/Material/AdminBatchDeleteMaterial";
        var data = {
            "Ids": list
        };
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("删除成功!", function () {
                    EditMiniApp.adminGetMaterialList();
                    setTimeout(() => {
                        if (EditMiniApp.PicTotal > 0) {
                            //初始化分页
                            $.jqPaginator('#pagination2', {
                                totalCounts: EditMiniApp.PicTotal,
                                pageSize: 18,
                                visiblePages: 10,
                                currentPage: 1,
                                prev: '<li class="prev"><a href="javascript:;">&lt;</a></li>',
                                next: '<li class="next"><a href="javascript:;">&gt;</a></li>',
                                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                                onPageChange: function (num, type) {
                                    EditMiniApp.PicPageIndex = num;
                                    EditMiniApp.adminGetMaterialList();
                                    $('#p2').text(type + '：' + num);
                                }
                            });
                        }
                    }, 200);
                })
            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },
    //移动素材
    adminMoveMaterial: function (cateList, cateid) {
        var methodName = "/Material/AdminMoveMaterial";
        var data = {
            "Ids": cateList,
            "CategoryId": cateid,
        };
        console.log(data)
        SignRequest.set(methodName, data, function (data) {
            if (data.Code == "100") {
                Common.showSuccessMsg("移动成功!", function () {
                    EditMiniApp.adminGetMaterialList();
                    setTimeout(() => {
                        if (EditMiniApp.PicTotal > 0) {
                            //初始化分页
                            $.jqPaginator('#pagination2', {
                                totalCounts: EditMiniApp.PicTotal,
                                pageSize: 18,
                                visiblePages: 10,
                                currentPage: 1,
                                prev: '<li class="prev"><a href="javascript:;">&lt;</a></li>',
                                next: '<li class="next"><a href="javascript:;">&gt;</a></li>',
                                page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
                                onPageChange: function (num, type) {
                                    EditMiniApp.PicPageIndex = num;
                                    EditMiniApp.adminGetMaterialList();
                                    $('#p2').text(type + '：' + num);
                                }
                            });
                        }
                    }, 200);
                })

            } else {
                Common.showErrorMsg(data.Message);
            }
        });
    },

}
$(function () {
    EditMiniApp.init();
});