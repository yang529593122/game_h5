<template>
  <uni-popup ref="spec" type="bottom" :maskClick="true" class="popup">
    <view class="wrap" @tap.stop.prevent @touchmove.stop.prevent>
      <view class="flex justify-between">
        <view class="margin-right">
			<view class="block-150 radius overHidden picture " @click="preview(info.thumb)">
				<fu-image :src="info.thumb" mode="aspectFill"></fu-image>
			</view>
        </view>
        <view class="flex-sub flex flex-direction justify-end">
          <view class="text-theme text-bold">
            <text class="text-price">{{ info | filterGoodsPrice }}</text>
          </view>
          <!-- <view class="text-sm text-999 margin-top-xs">{{i18n['库存']}} {{ stock }}</view> -->
          <view
              style="height: 80rpx"
              class="text-sm  text-999 margin-top-xs text-cut-2"
            >
            <text class="text-sm text-666 margin-right-24" >
            {{i18n['库存']}}: {{ stock }}
            </text>
              
              <block v-if="info.is_spec == 1">
                {{i18n['已选']}}: {{ selectSpecStr }}
              </block>
            </view>
        </view>
        <view class="close-box">
          <text class="cuIcon-close" @tap="close"></text>
        </view>
      </view>
      <scroll-view class="speclist-max-height" scroll-y="true">
        <view  v-if="speclist.length > 0">
          <block v-for="(item, index) in speclist" :key="index">
            <view class="margin-top">
              <view class="text-sm text-333 text-bold padding-bottom-sm">{{
                item.name
              }}</view>
              <view class="item">
                <block v-for="(item2, index2) in item.spec_value" :key="index2">
                  <view
                    class="item-tag"
                    :class="{'active': selectIndex[index] == index2,'disable': item2.disabled == true}"
                    @tap="selectSpec(item2, index, $event, index2)"
                  >
                  <!-- 为了解决小程序直接取值取不到 item2.disabled 的bug -->
                  {{ item2.item }} <text v-if="false">{{JSON.stringify(item2.disabled)}}</text>
                  </view>
                </block>
              </view>
            </view>
          </block>
        </view>
        <view class="margin-top">
          <view class="flex justify-between align-center padding-tb-sm">
            <view class="text-333 text-sm text-bold">{{i18n['数量']}}</view>
            <uni-number-box
              :value="number"
              :min="min"
              :max="max"
              @change="setnumber"
              :step="1"
            ></uni-number-box>
          </view>
          <view class="text-right text-theme text-sm" v-if="limit > 0"
            >{{i18n['此商品限购']}}{{ limit }}{{i18n['件']}}</view
          >
        </view>
      </scroll-view>
      <view class="margin-top flex round overHidden">
        <view
        v-if="(type == 'all') && dataSource !== 1"
        class="flex-sub btn color1"
        @tap.stop="handleAddCart"
        >{{i18n['加入购物车']}}</view
      >
      <view
        v-if="type == 'all' "
        class="flex-sub btn color2"
        @tap.stop="handleBuyNow"
        ><text>{{i18n['立即购买']}}</text></view
      >
      <view
      v-if=" type == 'cart'"
      class="flex-sub btn color2"
      @tap.stop="handleAddCart"
      ><text>{{i18n['确定']}}</text></view
    >
        <view
        v-if=" type == 'buy'"
        class="flex-sub btn color2"
        @tap.stop="handleBuyNow"
        ><text>{{i18n['确定']}}</text></view
      >
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  props: {
    // spu规格列表
    speclist: {
      type: Array,
      default() {
        return [];
      },
    },
    // sku列表
    skulist: {
      type: Array,
      default() {
        return [];
      },
    },
    //
    currentId: {
      type: [String, Number],
      default: 0,
    },
    //
    info: {
      type: Object,
    },
    //
    //判断要处理的数据来源  1 代表来着 积分兑换
    dataSource: {
      type: [String, Number],
      default: 0,
    },
    //
    limit: {
      type: Number,
      default: 0,
    },
    //
    isCart: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      /**
       * 加入类型
       * 点击加购物车打开弹窗,只展示加购物车按钮 (type: cart)
       * 点击立即购买打开痰喘,只展示立即购买按钮 (type: buy)
       * 点击规格栏目打开弹窗,两个按钮都展示 (type: all)
       * */
      type: "all", // 按钮展示模式
      shopItemInfo: {}, // 匹配字典
      selectArr: [], // 选中的id
      selectArrVal: [], // 选中的值
      selectIndex: [], // 选中的index
      selectShop: {}, // 选中的商品
      number: 1, // 选择数量
      stock: 0,
      min: 1,
      max: 99,
      selectAll: {},
    };
  },
  computed: {
    selectSpecStr(){
      return this.selectArrVal.filter(ele => ele).join(",")
    },
  },
  watch: {
    info(val) {
      if (this.limit == 0) {
        this.max = val.stock;
      } else {
        this.max = this.limit > val.stock ? val.stock : this.limit;
      }
      this.stock = val.stock;
    },
    limit(val) {
      if (val) {
        this.max = val;
      }
    },
  },
  methods: {
    // 规格预览图片
    preview(urls) {
      uni.previewImage({
        current: urls,
        urls: [urls],
      });
    },
    // 初始化规格
    init() {
      this.selectArr = []; // 选中的id
      this.selectArrVal = []; // 选中的值
      this.selectIndex = []; // 选中的index
      this.selectShop = {}; // 选中的商品
      this.shopItemInfo = {}; // 匹配字典
      this.speclist.forEach((item) => {
        this.selectArr.push("");
        this.selectArrVal.push("");
        this.selectIndex.push(-1);
      });
      this.checkItem(); // 计算sku里面的规格形成路径
      this.checkInpath(-1); // 检查生成的路径
      this.autoClickSku(); // 自动选择sku策略
    },
    // 计算有多少种可选路径
    checkItem() {
      let result = this.skulist.reduce(
        (arrs, items) => {
          return arrs.concat(
            items.sku_spec.reduce(
              (arr, item) => {
                return arr.concat(
                  arr.map((item2) => {
                    // 结果去重
                    if (
                      !this.shopItemInfo.hasOwnProperty([...item2, item]) &&
                      items.stock != 0
                    ) {
                      this.shopItemInfo[[...item2, item]] = items;
                    }
                    return [...item2, item];
                  })
                );
              },
              [[]]
            )
          );
        },
        [[]]
      );
    },
    // 循环所有属性判断哪些属性可选
    // 当前选中的兄弟节点和已选中属性不需要循环
    checkInpath(clickIndex) {
      for (let i = 0, len = this.speclist.length; i < len; i++) {
        if (i == clickIndex) {
          continue;
        }
        let len2 = this.speclist[i].spec_value.length;
        for (let j = 0; j < len2; j++) {
          if (this.selectIndex[i] != -1 && this.selectIndex[i] == j) {
            continue;
          }
          let choose_copy = [...this.selectArr];
          this.$set(choose_copy, i, this.speclist[i].spec_value[j].id);
          let choose_copy2 = choose_copy.filter(
            (item) => item !== "" && typeof item != "undefined"
          );
          if (this.shopItemInfo.hasOwnProperty(choose_copy2)) {
            // console.log('允许选择', this.speclist[i].spec_value[j]);
            this.$set(this.speclist[i].spec_value[j], "disabled", false);
          } else {
            // console.log('不允许选择', this.speclist[i].spec_value[j]);
            this.$set(this.speclist[i].spec_value[j], "disabled", true);
          }
        }
      }
    },
    // 选择规格
    selectSpec(item, index, $event, index2) {
      if (item.disabled) return;
      if (this.selectArr[index] != item.id) {
        this.$set(this.selectArr, index, item.id);
        this.$set(this.selectArrVal, index, item.item);
        this.$set(this.selectIndex, index, index2);
        if (item.thumb && this.selectArr.every((item) => item != "")) {

          this.shopItemInfo[this.selectArr].thumb = item.thumb;
        }
      } else {
        this.$set(this.selectArr, index, "");
        this.$set(this.selectArrVal, index, "");
        this.$set(this.selectIndex, index, -1);
      }
      this.checkInpath(index);
      // 如果全部选完
      this.checkSelectShop();
    },
    // 检测是否已经选择完sku
    checkSelectShop() {
      if (this.selectArr.every((item) => item != "")) {
        this.selectShop = this.shopItemInfo[this.selectArr];
        this.setStock(this.shopItemInfo[this.selectArr]);
        this.$emit("changeSpec", this.selectShop);
      } else {
        this.selectShop = {};
      }
    },
    // 检测sku选项是否已全部选完,且有库存
    checkSelectComplete() {
      return new Promise((resolve, reject) => {
        const { selectShop } = this;
        // 判断如果存在规格 is_spec =1 存在
        console.log(this.info,"this.info")
        if (this.info.is_spec == 1) {
          if (!selectShop || !selectShop.sku_id) {
            this.$message.info(this.i18n["请先选择规格"]);
            reject && reject();
          } else {
            resolve && resolve();
          }
        } else {
          resolve && resolve();
        }
      });
    },
    // 设置数量
    setnumber(e) {
      this.number = e;
      this.$emit("changeNumber", e);
    },
    // 确定选择
    handleConfirmChange(e) {
      this.checkSelectComplete()
        .then(() => {
          this.close();
          this.$emit("confirmChange", e);
        })
        .catch(() => {});
    },
    // 设置库存
    setStock(skuInfo) {
      const { stock } = skuInfo;
      this.stock = stock;
      let limit = this.limit;
      if (limit == 0) {
        this.max = stock;
      } else {
        let n = stock > limit ? limit : stock;
        this.max = n;
      }
    },
    // 自动选择sku策略
    autoClickSku() {
      let skuInfo = this.skulist.find((item) => item.sku_id == this.currentId);
      if (!skuInfo || skuInfo.stock == 0) {
        skuInfo = this.skulist.find((item) => item.stock > 0);
      }
      if (skuInfo) {
        let selectSpecId = skuInfo.sku_spec;
        this.speclist.forEach((item, index) => {
          if (item.spec_value.length != 0) {
            let item2 = item.spec_value.find(
              (ele) => ele.id == selectSpecId[index]
            );
            let index2 = item.spec_value.findIndex(
              (ele) => ele.id == selectSpecId[index]
            );
            this.selectSpec(item2, index, {}, index2);
          }
        });
      }
    },
    // 打开弹窗
    open(type) {
      this.type = type || "all";
      this.$refs.spec.open();
    },
    // 关闭弹窗
    close() {
      this.$refs.spec.close();
    },
    // 加入购物车
    handleAddCart() {
      this.checkSelectComplete()
        .then((res) => {
          this.close();
          this.$emit("addCart");
        })
        .catch(() => {});
    },
    // 立即购买
    handleBuyNow() {
      this.checkSelectComplete()
        .then((res) => {
          this.close();
          this.$emit("buyNow");
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  padding-bottom: 0;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .close-box {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999999;
    font-size: 28rpx;
    font-weight: bold;
  }

  .item {
    display: flex;
    flex-wrap: wrap;

    .item-tag {
      display: inline-block;
      font-size: 24rpx;
      color: #333;
      background-color: #f5f5f5;
      padding: 12rpx 24rpx;
      border-radius: 100rpx;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border: 2rpx solid #f5f5f5;
    }

    .item-tag.active {
      background-color: #fff2ef;
      color: $theme;
      border-color: $theme;
    }

    .item-tag.disable {
      color: #cccccc !important;
    }
  }

  .btn {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    color: #ffffff;
  }
}

.block-150 {
  width: 200rpx;
  height: 200rpx;
  min-width: 200rpx;
  min-height: 200rpx;
}

.color1 {
  background-color: #FFA264;
  margin-right: 4rpx;
}

.color2 {
  background: linear-gradient(180deg, #F97676 0%, #FF6464 100%);
}

.overHidden {
  overflow: hidden;
}

.popup /deep/.uni-popup__wrapper-box {
  max-height: 100% !important;
}

.speclist-max-height {
  // #ifndef MP-WEIXIN
  max-height: 800rpx;
  // #endif
  // #ifdef MP-WEIXIN
  max-height: 650rpx;
  // #endif
}
.picture{
  margin-top: -88rpx;
  border-radius: 16rpx;
}
.margin-right-24{
  margin-right: 24rpx;
}
</style>
