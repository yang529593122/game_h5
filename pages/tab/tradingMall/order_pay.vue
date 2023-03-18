<template>
  <view>
    <view class="sp-box" v-if="details">
      <view class="shop-item">
        <image :src="details.thumb" mode="aspectFill"></image>
        <view style="flex: 1;padding-left: 20rpx;">
          <view class="title" style="color: #36373D;">
            {{ details.name }}
          </view>
          <view class="" style="font-size: 12rpx;color: #868686;">
            <text>好评率{{ details.praise_rate }}%</text>
            <text style="padding-left: 40rpx;">销量{{ details.sales_sum }}</text>
          </view>
          <view style="margin-top: 10rpx;display: flex;justify-content: space-between;">
            <text style="font-size: 32rpx;color: #F55B29;">¥ {{ details.shop_price }}</text>
            <text style="font-size: 24rpx;color: #919191;padding-left: 13rpx;">x 1</text>
          </view>
        </view>
      </view>
    </view>
    <view class="list">
      <view class="item">
        <view class="item-title">
          充值账号
        </view>
        <view class="input">
          <input type="text" value="" placeholder="请输入充值账号" />
        </view>
      </view>
      <view class="item">
        <view class="item-title">
          账号密码
        </view>
        <view class="input">
          <input type="text" value="" placeholder="请输入账号密码" />
        </view>
      </view>
      <view class="item">
        <view class="item-title">
          游戏大厅
        </view>
        <view class="input">
          <input type="text" value="" placeholder="请选择游戏大厅" />
        </view>
      </view>
      <view class="item">
        <view class="item-title">
          系统
        </view>
        <view class="input">
          <input type="text" value="" placeholder="请选择系统" />
        </view>
      </view>
      <view class="item">
        <view class="item-title">
          留言
        </view>
        <view class="input">
          <input type="text" value="" placeholder="建议留言前先与商家沟通" />
        </view>
      </view>

    </view>

    <view class="list">
      <view class="item no-margin">
        <view class="item-title">
          共1件 合计
        </view>
        <view class="input">
         ¥ 100
        </view>
      </view>
      <view class="item no-margin">
        <view class="item-title">
          手续费
        </view>
        <view class="input">
         ¥ 99
        </view>
      </view>
    </view>


    <view class="btn-box">
      <view class="content">
        <view class="">
          <text>总计</text>
          <text style="color: #F55B29;padding-right: 10rpx;">¥ </text>
          <text style="color: #F55B29;font-size: 32rpx;">100</text>
        </view>
        <view class="btn-sub" @click="onSubmitEvent">
          提交订单
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        id: null,
        details: null
      };
    },
    onLoad(opt) {
      this.id = opt.id
      this.initData()
    },
    methods: {
      initData() {
        this.$api.post(global.apiUrls.shop_goods_detail, {
          goods_id: this.id
        }).then(res => {
          if (res.data.code === '1') {
            console.log(res.data.data)
            this.details = res.data.data
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      onSubmitEvent(){
        uni.navigateTo({
          url:'/pages/tab/tradingMall/pay'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-box{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    .content{
      background: #fff;
      display: flex;
      justify-content: space-between;
      padding: 20rpx;
      .btn-sub{
        color: #fff;
        font-size: 32rpx;
        background: #295B7B;
        padding: 10rpx 20rpx;
      }
    }
  }


  .list{
    padding: 20rpx;
    .item {
      padding: 20rpx 20rpx;
      display: flex;
      justify-content: space-between;
      background: #fff;
      margin-bottom: 20rpx;
      &.no-margin{
        margin-bottom: 0;
        padding: 10rpx 20rpx;
      }
      .input {
        flex: 1;
        text-align: right;
      }
    }
  }


  .sp-box {
    .shop-item {
      display: flex;
      margin-bottom: 24rpx;
      background: #fff;
      padding: 12rpx;

      image {
        display: block;
        width: 204rpx;
        height: 190rpx;
      }

      .title {
        margin-bottom: 24rpx;
        color: #36373D;
        overflow: hidden;
        /*将对象作为弹性伸缩盒子模型显示*/
        display: -webkit-box;
        /*设置子元素排列方式*/
        -webkit-box-orient: vertical;
        /*设置显示的行数，多出的部分会显示为...*/
        -webkit-line-clamp: 2;
      }
    }
  }
</style>
