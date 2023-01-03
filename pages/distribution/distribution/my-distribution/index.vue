<template>
  <view class="container">
    <fu-navbar :isBack="true" title="推荐返佣" bgColor="#ffffff"></fu-navbar>
    <!-- 头部 -->
    <view class="header" :style="[{ height: CustomBar + 'px' }]">
      <view class="tui-msg-box">
        <view url="" class="shop_btn" @tap="handleMoney">{{i18n['规则说明']}}</view>
        <view class="flex flex-sub align-center">
			<view class="block-108 round overHidden">
				<fu-image :src="distributionData.head_img || '/static/logo.png'" mode="aspectFill"></fu-image>
			</view>
          <view class="margin-left">
            <view class="text-xl text-blod" style="color: #36373D;">{{ distributionData.user_nickname }}</view>
			<view class="text-sm" style="color: #868686;">推荐码：{{distributionData.invite_code}}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="content_data">
        <view class="flex flex-direction justify-center align-start" style="width: 33.33%;">
			<view style="font-size: 44rpx;color: #F55B29;font-weight: bold;">
				<text>￥</text>
				<text>{{distributionData.user_money}}</text>
			</view>
			<view class="text-sm" style="margin-top: 21rpx;color: #868686;">账户佣金</view>
        </view>
       <view class="flex flex-direction justify-center align-start" style="width: 33.33%;">
       	<view style="font-size: 44rpx;color: #F55B29;font-weight: bold;">
       		<text>￥</text>
       		<text>{{distributionData.yesterday_commission}}</text>
       	</view>
       	<view class="text-sm" style="margin-top: 21rpx;color: #868686;">昨日收益</view>
       </view>
       <view class="flex flex-direction justify-center align-start" style="width: 33.33%;">
       	<view style="font-size: 44rpx;color: #F55B29;font-weight: bold;">
       		<text>￥</text>
       		<text>{{distributionData.total_commission}}</text>
       	</view>
       	<view class="text-sm" style="margin-top: 21rpx;color: #868686;">累计收益</view>
       </view>
    </view>
	
	<view style="width: 686rpx;margin-top: 24rpx;border-radius: 4rpx;padding: 24rpx 40rpx;margin-left: 32rpx;" class="bg-white flex align-center">
		<view class="flex flex-direction justify-center align-center"  @tap="handleJump" data-url="/pages/distribution/distribution/incomeStatistics/index">
			<view style="width: 40.5rpx;height: 44rpx;">
				<image src="../../static/1.png" style="width: 40.5rpx;height: 44rpx;"></image>
			</view>
			<view style="color: #36373D;margin-top: 16rpx;" class="text-center text-sm">收益统计</view>
		</view>
		
		<view class="flex flex-direction justify-center align-center" @tap="handleJump" data-url="/pages/distribution/distribution/promotersOrder/index" style="margin-left: 120rpx;">
			<view style="width: 40.5rpx;height: 44rpx;">
				<image src="../../static/2.png" style="width: 40.5rpx;height: 44rpx;"></image>
			</view>
			<view style="color: #36373D;margin-top: 16rpx;" class="text-center text-sm">订单统计</view>
		</view>
	</view>
    <!-- 九宫格布局 -->
   <!-- <view class="content-center">
      <view class="wrapper">
        <view class="box-block" @tap="handleJump" data-url="/pages/distribution/distribution/promoters/index">
          <image src="../../static/card.png" mode="aspectFit"></image>
          <view class="text-999 desc">{{i18n['我的会员']}}</view>
        </view>
        <view class="box-block" @tap="handleJump" data-url="/pages/distribution/distribution/incomeStatistics/index">
          <image src="../../static/money.png" mode="aspectFit"></image>
          <view class="text-999 desc">{{i18n['收益统计']}}</view>
        </view>
        <view class="box-block" @tap="handleJump" data-url="/pages/distribution/distribution/promotersOrder/index">
          <image src="../../static/order.png" mode="aspectFit"></image>
          <view class="text-999 desc">{{i18n['订单统计']}}</view>
        </view>
      </view>
    </view> -->
    <!-- 规则说明 -->
    <fu-popup ref="coupon" mode="center" width="550rpx" height="700rpx" border-radius="8" :mask-close-able="true" v-model="couponModel" @close="handleClose">
      <view class="rule-box">
        <view class="rule-box-title solid-bottom">
         <view></view> <view>规则说明</view> <view class="cuIcon-close text-999" @click="handleClose"></view>
        </view>
        <scroll-view class="rule-box-content" scroll-y>
          <jyf-parser :html="rulers.content"></jyf-parser>
        </scroll-view>
        <!-- <view class="rule-box-close solid-top" @click="handleClose">
          {{i18n['关闭']}}
        </view> -->
      </view>
    </fu-popup>
  
    <!-- 网络监测 -->
    <fu-notwork></fu-notwork>
  </view>
</template>
<script>
export default {
  data() {
    return {
      rulers: {}, //规则说明
      StatusBar: this.StatusBar,
      CustomBar: this.CustomBar,
      bgColor: this.$store.state.themeColor,
      userInfo: {},
      distributionData: {},
      dataContetn: {},
      couponModel: false
    };
  },
  onShow() {
    this.userInfo = global.userInfo || {};
    if (!global.token) {
      // this.back();
    } else {
      this.getIndeContent();
    }
  },
  onPullDownRefresh() {
    this.userInfo = global.userInfo || {};
    if (!global.token) {
      this.back();
    } else {
      this.getIndeContent();
    }
  },
  methods: {
    // 主数据列表
    getIndeContent() {
      this.$api
        .post(global.apiUrls.gameintroducercommission, {
          user_id: global.userInfo.id || 0,
        })
        .then(res => {
          console.log('主数据', res);
          if (res.data.code == 1) {
            this.distributionData = res.data.data;
          } else {
            this.$message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 返回
    back() {
      uni.navigateBack();
    },
    // 首页数据
    handleMoney() {
      this.$api
        .post(global.apiUrls.postDistributionRuler, {
          user_id: global.userInfo.id || 0,
          category_id: 19
        })
        .then(res => {
          console.log('规则说明', res);
          if (res.data.code == 1) {
            this.rulers = res.data.data;
          } else {
            this.$message.info(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });

      this.couponModel = true;
    },
    handleClose() {
      this.couponModel = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  // background-color: #f8f8f9;
  .header {
    height: 188rpx !important;
    width: 100%;
    background: #fff;
    .tui-msg-box {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-left: 5%;
      padding-top: 36rpx;
      .block-108 {
        width: 108rpx;
        min-width: 108rpx;
        height: 108rpx;
        min-height: 108rpx;
      }
    }
  }
  .content_data {
    background-color: #fff !important;
    margin:24rpx 32rpx;
	width: 686rpx;
	padding: 26rpx 32rpx;
    background-color: white;
    // position: relative;
    // top: 0rpx;
    border-radius: 4rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	
  }
  .content-center {
    width: 90%;
    margin-left: 5%;
    .wrapper {
      display: flex;
      grid-template-columns: 33.33% 33.33% 33.33%;
      position: relative;
      // top: -220rpx;
      .box-block {
        margin-top: 40rpx;
        margin-left: 3%;
        width: 33%;
        background: white;
        height: 180rpx;
        padding: 40rpx 0;
        border-radius: 20rpx;
        text-align: center;
        image {
          width: 70rpx;
          height: 70rpx;
        }
        .desc {
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
          white-space: nowrap; /*规定文本不换行**/
        }
      }
    }
  }
}
.bottom-action {
  position: fixed;
  left: 32rpx;
  right: 32rpx;
  bottom: 32rpx;
  height: 80rpx;
  line-height: 80rpx;
  bottom: calc(32rpx + constant(safe-area-inset-bottom));
  bottom: calc(32rpx + env(safe-area-inset-bottom));
}
.shop_btn {
  position: absolute;
  right: 0;
  top: 70rpx;
  border-radius: 32rpx 0 0rpx 32rpx;
  color: #fff;
  // background: rgba(255,255,255,0.65);
  background: #3C485B;
  width: 148rpx;
  height: 54rpx;
  line-height: 54rpx;
  text-align: center;
  font-size: 24rpx;
  // margin-top: -1.5em;
}
.model-notice-box {
  width: 600rpx;
  background-color: #fdf7e9;
  min-height: 600rpx;
  max-height: 1000rpx;
  overflow-y: scroll;
  .title {
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
    font-size: 30rpx;
    font-family: PingFang SC;
    // font-weight: bold;
    // color: rgba(206, 133, 45, 1);
  }
}
  .content {
    padding: 0 32rpx 20rpx;
    color: #666666;
    font-size: 28rpx;
    margin: 0 auto;

    .desc {
      display: -webkit-box; /* 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。*/
      -webkit-box-orient: vertical; /* 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。*/
      text-overflow: ellipsis; /* 可以用来多行文本的情况下，用省略号“…”隐藏超出范围的文本 。*/
      -webkit-line-clamp: 1;
      overflow: hidden;
      min-height: 40rpx;
      width: 400rpx;
      text-align: left;
      margin: 0 auto;
      line-height: 40rpx;
    }

	}

 // 规则弹窗
  .rule-box{
    width: 100%;
    height: 100%;
    background-color: #fff;
    background: linear-gradient(top,#fcf9df,#fff0c4);
    .rule-box-title{
      height: 100rpx;
      font-size: 32rpx;
      line-height: 100rpx;
      // text-align: center;
	  display: flex;
	  padding: 0 24rpx;
	  align-items: center;
	  justify-content: space-between;
      font-weight: 500;
      color: #36373D;
    }
    .rule-box-content{
      height: calc(100% - 200rpx);
      color: #868686;
      padding: 20rpx;
    }
    .rule-box-close{
      height: 100rpx;
      font-size: 32rpx;
      line-height: 100rpx;
      text-align: center;
      color: #615013;
    }
  }
</style>
