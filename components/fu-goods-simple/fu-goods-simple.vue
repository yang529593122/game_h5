<template>
  <view class="wrapper" @tap.stop="navToDetail(info)">
    <view class="wrap-box">
      <view class="square-wrap">
        <view class="square-box">
          <fu-image :src="info.cover_images[0]" mode="aspectFit"></fu-image>
        </view>
      </view>
      <view class="content">
        <view class="text-df text-333 text-cut-2">
		<text v-if="info.is_bao == 1" style="color: #659BC7;">[{{'包赔'}}]</text>
		<text v-if="info.is_bao === 0" style="color: #659BC7;">[{{'押证包安'}}]</text>
		{{ info.goods_name }}</view>
				<view class="text-cut-2" style="color: #868686;font-size: 20rpx;margin-top: 16rpx;">区服:{{info.area_name}}</view>
				<view class="text-cut-2" style="color: #868686;font-size: 20rpx;margin-top: 8rpx;">发布时间:{{info.create_time}}</view>
        <view class="flex align-center justify-between text-sm marginTop-16">
          <text class="text-bold">
            <text class="text-sm" style="color: #F55B29;">￥</text>
            <text class="text-lg" style="color: #F55B29;">{{ info.price }}</text>
          </text>
          <!-- <text class=" text-999">{{i18n['月销']}}{{ info.sales_sum | formatNumber(i18n['万']) }}{{i18n['件']}}</text> -->
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    props: {
      info: {
        type: Object
      },
    },
    methods: {
      /**
       * @event
       * @description 跳转到商品详情
       * @param {Object} item - 商品信息
       */
      navToDetail(item) {
        this.$urouter.navigateTo({
          url: '/pages/goods/goodsdetail/goods-detail/index',
          params: {
            sku_id: item.sku_id || 0,
            goods_id: item.id,
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    margin-bottom: 24rpx;
    padding: 0 10rpx;
    .wrap-box {
      background-color: #FFFFFF;
      border-radius: 24rpx;

      .square-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        box-sizing: border-box;
        position: relative;

        .square-box {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          border-radius: 24rpx 24rpx 0 0;
          overflow: hidden;
          image {
            width: 100%;
            height: 100%;
            border-radius: 24rpx 24rpx 0 0;
          }
        }

      }
      .image{
        width: 100%;
        border-radius: 24rpx 24rpx 0 0;
      }
    }

    .content {
      padding: 20rpx;
    }
  }

  .text-cut-2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .text-through {
    text-decoration: line-through;
  }

  .text-333 {
    color: #333333;
  }

  .text-999 {
    color: #999999;
  }

  .name-title {
    position: relative;
  }

  .name-title-label {
    float: left;
  }

  .item-goods-label {
    background:#FF6464;
    padding: 2rpx 5rpx;
    color: #ffffff;
    font-size: 24rpx;
    border-radius: 6rpx;
    margin-right: 9rpx;
  }
  .item-activity-label {
    padding: 0 8rpx;
    height: 32rpx;
    line-height: 30rpx;
    border: 1px solid #FA2033;
    opacity: 1;
    border-radius: 4rpx;
    font-size: 20rpx;
    font-family: PingFang SC;
    font-weight: 400;
    color: #FA2033;
    margin-right: 16rpx;
    &:nth-of-type(1){
      border: 1px solid #0A7CE6;
      color: #0A7CE6;
    }
  }
  .marginTop-16{
    margin-top: 16rpx;
  }
  .marginTop-10{
    margin-top: 10rpx;
  }
  .margin-left-16{
    margin-left: 16rpx;
  }
</style>
