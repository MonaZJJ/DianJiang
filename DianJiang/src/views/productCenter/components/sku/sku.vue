<template>
  <div>
    <div id="skuBox"></div>
  </div>
</template>

<script>
export default {
  name: "sku",
  props: {
    jsonData: {
      type: Object
    }
  },
  data() {
    return {
      //规格类型总和
      keys: [],
      //处理后的数据
      deal: "",
      //分隔符号
      spliter: "\u2299",
      //选中的数组
      selectedCache: [],
      result: {},
      items: [],
      res: {},
      skuId: "0",
      ProNumber: 0,
      ShopPrice: 0,
      isSelect: true,
      skuStr:'',
    };
  },
  component: {},
  computed: {},
  methods: {
    //处理后台的数据
    dealData: function(data) {
      var vm = this;
      var list = [];
      if (data.length > 0) {
        data.forEach(function(item, index) {
          var innerItem = {};
          item.LinearArraySpecificInfoList.forEach(function(item1, index1) {
            innerItem[item1.AttrName] = item1.AttrValue;
          });
          list.push(innerItem);
        });
        vm.deal = list;
      }
    },
    //获取规格类型总和
    getKeys: function() {
      var vm = this;
      for (var attr_key in vm.deal[0]) {
        if (!vm.deal[0].hasOwnProperty(attr_key)) continue;
        if (
          attr_key != "skuId" &&
          attr_key != "ShowImg" &&
          attr_key != "CostPrice" &&
          attr_key != "MemberPrice" &&
          attr_key != "Number" &&
          attr_key != "ShopPrice" &&
          attr_key != "StoreMPrice" &&
          attr_key != "ToSnapUpPrice" &&
          attr_key != "GroupPrice"
        ) {
          vm.keys.push(attr_key);
        }
      }
    },
    //计算组合数据
    combineAttr: function(data, keys) {
      var vm = this;
      var allKeys = [];
      var result = {};

      for (var i = 0; i < data.length; i++) {
        var item = data[i];
        var values = [];

        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          if (!result[key]) result[key] = [];
          if (result[key].indexOf(item[key]) < 0) result[key].push(item[key]);
          values.push(item[key]);
        }
        allKeys.push({
          path: values.join(vm.spliter),
          sku: item["skuId"],
          Number: item["Number"],
          ShopPrice: item["ShopPrice"],
          ToSnapUpPrice: item["ToSnapUpPrice"],
          GroupPrice: item["GroupPrice"],
          ShowImg: item["ShowImg"]
        });
      }
      //            return {
      //              result: result,
      //              items: allKeys
      //            }
      vm.result = result;
      vm.items = allKeys;
    },
    //获取所有的组合以数组形式["红⊙大⊙A","白⊙大⊙A","白⊙中⊙B","蓝⊙小⊙C"]
    getAllKeys: function(arr) {
      var result = [];
      for (var i = 0; i < arr.length; i++) {
        result.push(arr[i].path);
      }
      return result;
    },
    //取得集合的所有子集「幂集」
    powerset: function(arr) {
      var vm = this;
      var ps = [[]];
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0, len = ps.length; j < len; j++) {
          ps.push(ps[j].concat(arr[i]));
        }
      }
      return ps;
    },
    trimSpliter: function(str, spliter) {
      // ⊙abc⊙ => abc
      // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
      var reLeft = new RegExp("^" + spliter + "+", "g");
      var reRight = new RegExp(spliter + "+$", "g");
      var reSpliter = new RegExp(spliter + "+", "g");
      return str
        .replace(reLeft, "")
        .replace(reRight, "")
        .replace(reSpliter, spliter);
    },
    //生成所有子集是否可选、库存状态 map
    buildResult: function(items) {
      var vm = this;
      var allKeys = vm.getAllKeys(items);

      for (var i = 0; i < allKeys.length; i++) {
        var curr = allKeys[i];
        var sku = items[i].sku;
        var Number = items[i].Number;
        var ShopPrice = items[i].ShopPrice;
        var ToSnapUpPrice = items[i].ToSnapUpPrice;
        var GroupPrice = items[i].GroupPrice;
        var ShowImg = items[i].ShowImg;
        var values = curr.split(vm.spliter);
        var allSets = vm.powerset(values);

        // 每个组合的子集
        for (var j = 0; j < allSets.length; j++) {
          var set = allSets[j];
          var key = set.join(vm.spliter);

          if (vm.res[key]) {
            vm.res[key].skus.push(sku);
            vm.res[key].Number.push(Number);
            vm.res[key].ShopPrice.push(ShopPrice);
            vm.res[key].ToSnapUpPrice.push(ToSnapUpPrice);
            vm.res[key].GroupPrice.push(GroupPrice);
            vm.res[key].ShowImg.push(ShowImg);
          } else {
            vm.res[key] = {
              skus: [sku],
              Number: [Number],
              ShopPrice: [ShopPrice],
              ToSnapUpPrice: [ToSnapUpPrice],
              GroupPrice: [GroupPrice],
              ShowImg: [ShowImg]
            };
          }
        }
      }
    },
    //渲染 DOM 结构
    render: function(data) {
      var vm = this;
      var output = "";
      for (var i = 0; i < vm.keys.length; i++) {
        var key = vm.keys[i];
        var items = data[key];

        output +=
          '<div data-type="' +
          key +
          '" data-idx="' +
          i +
          '" class="info-item block-box clearfix skuTr">';
        output += "<label>" + key + ":</label>";
        output += '<div class="clearfix">';
        for (var j = 0; j < items.length; j++) {
          var item = items[j];
          var cName = j == 0 ? "block-active" : "";
          if (j == 0) {
            vm.selectedCache.push(item);
          }
          output +=
            '<button data-title="' +
            item +
            '" class="' +
            cName +
            ' item-block " value="' +
            item +
            '">' +
            item +
            "</button> ";
        }
        output += "</div>";
        output += "</div>";
      }
      output += "</div>";

      $("#skuBox").html(output);
    },
    //获取当前选中的属性
    getSelectedItem: function() {
      var vm = this;
      var result = [];
      $(".skuTr").each(function() {
        var $selected = $(this).find(".block-active");
        if ($selected.length) {
          result.push($selected.val());
        } else {
          result.push("");
        }
      });
      return result;
    },
    //更新所有属性状态
    updateStatus: function(selected) {
      var vm = this;
      for (var i = 0; i < vm.keys.length; i++) {
        var key = vm.keys[i];
        var data = vm.result[key];
        var copy = selected.slice();

        for (var j = 0; j < data.length; j++) {
          var item = data[j];
          if (selected[i] == item) continue;
          copy[i] = item;

          var curr = vm.trimSpliter(copy.join(vm.spliter), vm.spliter);
          var $item = $(".skuTr")
            .filter('[data-type="' + key + '"]')
            .find('[value="' + item + '"]');

          var titleStr = "[" + copy.join("-") + "]";

          if (vm.res[curr]) {
            $item.removeClass("disabled");
          } else {
            $item
              .addClass("disabled")
              .attr("title", titleStr + " 无此属性搭配");
          }
        }
      }
    },
    //绑定事件
    bindEvent: function() {
      var vm = this;
      $("#skuBox")
        .undelegate()
        .delegate(".item-block", "click", function(e) {
          var $this = $(this);
          var isActive = $this.hasClass("block-active");
          var isDisable = $this.hasClass("disabled");
          if (!isActive) {
            vm.handleNormalClick($this);

            if (isDisable) {
              vm.handleDisableClick($this);
            } else {
              vm.selectedCache[
                $this
                  .parents(".skuTr")
                  .eq(0)
                  .data("idx")
              ] = $this.val();
            }
            vm.updateStatus(vm.getSelectedItem());
            vm.getSkuId();
          }
        });

      $(".item-block").each(function() {
        var value = $(this).val();

        if (!vm.res[value] && !$(this).hasClass("block-active")) {
          $(this).addClass("disabled");
        }
      });
    },
    //获取skuid
    getSkuId: function() {
      var vm = this;

      var result = vm.getSelectedItem();
      var s = [];
      for (var i = 0; i < result.length; i++) {
        var item = result[i];
        if (!!item) {
          s.push(item);
        }
      }
      if (s.length == vm.keys.length) {
        vm.isSelect = true;
        console.log("获取了", vm.selectedCache);
        var curr = vm.res[s.join(vm.spliter)];

        if (curr) {
          vm.skuId = curr.skus[0];
          vm.ProNumber = curr.Number[0];
          vm.ShopPrice = curr.ShopPrice[0];
          vm.ToSnapUpPrice = curr.ToSnapUpPrice[0];
          vm.GroupPrice = curr.GroupPrice[0];
          vm.PicUrl = curr.ShowImg[0];
          vm.skuStr = s.join(',')
        }
      } else {
        vm.isSelect = false;
      }
      //传数据到父组件
      vm.dataHandle();
    },
    //正常属性点击
    handleNormalClick: function($this) {
      var vm = this;
      $this.siblings().removeClass("block-active");
      $this.addClass("block-active");
    },
    //无效属性点击
    handleDisableClick: function($this) {
      var vm = this;
      var $currAttr = $this.parents(".skuTr").eq(0);
      var idx = $currAttr.data("idx");
      var type = $currAttr.data("type");
      var value = $this.val();

      $this.removeClass("disabled");
      vm.selectedCache[idx] = value;

      //        // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
      $(".skuTr")
        .not($currAttr)
        .find(".item-block")
        .removeClass("block-active");
      vm.updateStatus(vm.getSelectedItem());

      for (var i = 0; i < vm.keys.length; i++) {
        var item = vm.keys[i];
        var $curr = $('.skuTr[data-type="' + item + '"]');
        if (item == type) continue;

        var $lastSelected = $curr.find(
          '.item-block[value="' + vm.selectedCache[i] + '"]'
        );

        // 缓存的已选属性没有 disabled (可以被选择)
        if (!$lastSelected.hasClass("disabled")) {
          $lastSelected.addClass("active");
          vm.updateStatus(vm.getSelectedItem());
        }
      }
    },
    //触发处理器
    dataHandle: function() {
      var vm = this;
      let data = {
        skuId: vm.skuId,
        ProNumber: vm.ProNumber,
        ShopPrice: vm.ShopPrice,
        isSelect: vm.isSelect,
        ToSnapUpPrice: vm.ToSnapUpPrice,
        GroupPrice: vm.GroupPrice,
        PicUrl: vm.PicUrl,
        skuStr:vm.skuStr,
      };
      vm.$emit("sku-data", data);
    }
  },
  watch: {},
  created() {},
  mounted() {
    var vm = this;
    //处理数据
    vm.dealData(vm.jsonData.LinearArray);
    //获取规格类型总和
    vm.getKeys();
    //计算组合数据
    vm.combineAttr(vm.deal, vm.keys);
    vm.render(vm.result);
    vm.buildResult(vm.items);

    vm.updateStatus(vm.getSelectedItem());
    vm.getSkuId();
    vm.bindEvent();
  }
};
</script>

<style>
#skuBox {
  overflow: hidden;
}
.info-item {
  padding-left: 16px;
  margin-top: 10px;
  font-size: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.info-item label {
  width: 13%;
  line-height: 28px;
  color: #999999;
  float: left;
  font-size: 12px;
}

.info-item > div {
  width: 87%;
  float: right;
  font-size: 12px;
}

.item-block {
  height: 28px;
  padding: 0 15px;
  line-height: 28px;
  border: 1px solid #ccc;
  color: #666666;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 12px;
  border-radius: 14px;
}

.block-active {
  border: 1px solid #56BD6B;
  font-size: 12px;
  color: #fff;
  background: #56BD6B;
}

.disabled {
  color: #999;
  background: #ccc;
  font-size: 12px;
}

button {
  font-size: 12px;
  background-color: transparent;
  border: 0;
  outline: 0;
}
</style>
