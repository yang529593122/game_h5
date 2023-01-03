<template>
  <view class="page">
    <!-- topbar -->
    <view class="cu-custom bg-white" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
      <view class="cu-bar bg-white fixed" :style="[{ height: CustomBar + 'px', paddingTop: StatusBar + 'px' }]">
        <view class="action" @click="back"><text class="cuIcon-back fu-fs36"></text></view>
        <!-- #ifdef H5 -->
        <view class="fu-fs32" style="color: #000; font-weight: 700">{{i18n['发布问题']}}</view>
        <!-- #endif -->
        <!-- #ifndef H5 -->
        <view class="fu-fs32">{{i18n['发布问题']}}</view>
        <!-- #endif -->
        <view class="action  text-333" @click="navGoPublish">{{i18n['发布']}}</view>
      </view>
    </view>
    <view>
      <view class="goods-info  flex align-center" @click="navGogoodsDetail(goodsInfo)">
        <view class="goods-img">
          <view class="goods-img">
            <fu-image radius="18rpx" :src="goodsInfo.goods_thumb" mode="aspectFill" />
          </view>
        </view>
        <text class="text-cut-2 text-info">{{ goodsInfo.goods_name }}</text>
      </view>
      <view class="textarea" :style="{ height: scrollHeight }">
        <textarea
          v-model="issue"
          placeholder-style="color:#BFBFBF;font-size: 28rpx;font-weight: 400;"
          :placeholder="i18n['说出你的问题，已购买的人会帮你解答哦~']"
          maxlength="180"
          :adjust-position="false"
        />
      </view>
    </view>
    <!-- 发布成功弹框 -->
    <fu-popup v-model="show" mode="center" :safe-area-inset-bottom="true" :border-radius="24" :maskCloseAble="false">
      <view class="padding bt-white content">
        <view class="text-center ">
          <text class="fu-iconfont success-icon">&#xe6d2;</text>
          <view class="text-lg text-weight-500 text-333">{{i18n['发布成功']}}</view>
        </view>
        <view class="content-info">{{i18n['等待后台审核，审核通过后可以去我的回答里查看已发布的回答']}}</view>

        <view class="affirm-wrap"><view class="affirm" @click="close">{{i18n['我知道了']}}</view></view>
      </view>
    </fu-popup>
    <!-- 吸键盘布局 -->
    <view class="ask-info-absorb" :style="{ bottom: keyboardheight + 'px' }">
      <!--  <text class="text" @click="goChangeAnonymity()">
        <text class="fu-iconfont icon" v-if="!isAnonymity"> &#xe7e6; </text>
        <text class="fu-iconfont icon" v-if="isAnonymity"> &#xe7e9; </text>
        匿名提问
      </text> -->
      <text class="margin-left">{{ issue.length }} / 180</text>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      issue: '',
      isAnonymity: false, // 是否匿名
      show: false, // 显示弹框
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      goods_id: '', // 商品id
      activity_id: '', // 活动id
      keyboardheight: 0, // 键盘高度
      goodsInfo: {} // 商品详情
    };
  },
  onLoad(options) {
    uni.onKeyboardHeightChange(res => {
      console.log('键盘监听', res);
      this.keyboardheight = res.height;
    });
    const { goods_id, activity_id } = options;
    this.goods_id = goods_id;
    this.activity_id = activity_id;
    this.loadData();
  },
  computed: {
    scrollHeight() {
      // let safeHeight = uni.getSystemInfoSync().safeAreaInsets.bottom;
      return `calc(100vh - ${this.CustomBar}px - 128rpx - 96rpx)`;
    }
  },
  methods: {
    // 去商品详情
    navGogoodsDetail(item) {
      console.log(item);
      this.$urouter.navigateTo({
        url: '/pages/goods/goodsdetail/goods-detail/index',
        params: {
          goods_id: item.goods_id,
          activity_id: item.activity_id
        }
      });
    },
    // 获取商品详情
    loadData() {
      this.$api
        .get(global.apiUrls.getGoodsDetail, {
          goods_id: this.goods_id,
          activity_id: this.activity_id
        })
        .then(res => {
          if (res.data.code == 1) {
            console.log('goods detail', res.data.data);
            let data = res.data.data;
            // 插入临时商品信息
            this.goodsInfo = {
              goods_name: data.name,
              goods_price: data.shop_price,
              goods_thumb: data.thumb,
              goods_id: this.goods_id,
              activity_id: this.activity_id
            };
          }
        });
    },
    goChangeAnonymity() {
      this.isAnonymity = !this.isAnonymity;
    },
    // 关闭弹框，返回列表
    close() {
      this.show = false;
      this.issue = '';
      this.back();
    },
    back() {
      uni.navigateBack();
    },
    // 提问接口
    navGoPublish() {
      // 判断是否输入内容
      if (!this.issue.trim()) {
        return this.$message.info(this.i18n['请输入问题']);
      }
      this.$api
        .post(global.apiUrls.goodsQuestion, {
          goods_id: this.goods_id,
          content: this.issue.trim(),
          is_anonymous: this.isAnonymity ? 1 : 0
        })
        .then(res => {
          console.log('发布结果', res.data);
          if (res.data.code == 1) {
            this.show = true;
          }
        });
    }
  }
};
</script>

<style lang="scss">
page {
  height: 100%;
}
.page {
  min-height: 100%;
  background: #f8f8f8;
}

.content {
  width: 510rpx;
  height: 502rpx;
  background: #ffffff;
  border: 1px solid #707070;
  border-radius: 24rpx;
  position: relative;
}

.success-icon {
  font-size: 66rpx;
  color: #5fc59d;
}

.affirm-wrap {
  position: absolute;
  bottom: 48rpx;
  width: calc(100% - 60rpx);
  display: flex;
  justify-content: center;
}

.affirm {
  text-align: center;
  width: 304rpx;
  height: 72rpx;
  line-height: 72rpx;
  background: linear-gradient(90deg, #fa2033 0%, #ff6530 100%);
  border-radius: 36rpx;
  color: #fff;
  font-size: 30rpx;
  font-weight: 400;
}

.content-info {
  font-size: 24rpx;
  color: #999;
  margin: 48rpx 0 0;
  padding: 0 40rpx;
  text-align: center;
  line-height: 40rpx;
  font-weight: 500;
}

.goods-info {
  font-size: 28rpx;
  padding: 24rpx 24rpx 32rpx;
  font-weight: 400;
  color: #333333;
  .goods-img {
    width: 72rpx;
    height: 72rpx;
    border-radius: 18rpx;
  }

  .text-info {
    width: 100%;
    margin-left: 24rpx;
  }
}

.textarea {
  font-size: 28rpx;
  padding: 0 24rpx;
  textarea {
    width: 100%;
    font-size: 28rpx;
    background: #ffffff;
    border-radius: 16rpx;
    padding: 24rpx;
    height: 100%;
  }
}
.ask-info-absorb {
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #b7b7b7;
  line-height: 96rpx;
  height: 96rpx;
  background: #f8f8f8;
  .text {
    color: #999;
    margin-left: 24rpx;
  }
  .icon {
    font-size: 24rpx;
    margin-right: 6rpx;
  }
}
.text-center {
  line-height: 1.5;
}
</style>
