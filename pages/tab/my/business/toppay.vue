<template>
  <view class="content">
    <view class="top">
      <view class="top-item">
        <view class="top-item-title">
          今天
        </view>
        <view class="top-item-time">
          4:00
        </view>
      </view>
      <view class="top-item">
        <view class="top-item-title">
          今天
        </view>
        <view class="top-item-time">
          4:00
        </view>
      </view>
      <view class="top-item">
        <view class="top-item-title">
          今天
        </view>
        <view class="top-item-time">
          4:00
        </view>
      </view>
    </view>

    <view class="top-time">
      <view class="top-time-item" v-for="item in 10">
        <view class="top-time-item-title">
          5:00-9:00
        </view>
        <view class="top-time-item-status">
          越慢
        </view>
      </view>
    </view>

    <view class="list-content">
      <view class="top-time-title">
        选择排名位置
      </view>
      <view class="top-time">
        <view class="top-time-item" v-for="item in 10">
          <view class="top-time-item-title">
            5:00-9:00
          </view>
          <view class="top-time-item-status">
            越慢
          </view>
        </view>
      </view>
    </view>

    <view class="list-content" style="background: transparent;">
      <view class="top-time-title">
        置顶位置介绍
      </view>
      <view class="top-text">
        置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍置顶位置介绍
      </view>
    </view>

    <view class="btns-content">
      <view class="btn-box">
        <view class="price">
          总计:<text style="color: #F55F2E;font-size: 24rpx;padding-left: 10rpx;">¥</text><text style="color: #F55F2E;font-size: 32rpx;padding-left: 10rpx;">4500</text>
        </view>
        <view class="btn">
          去支付
        </view>
      </view>

    </view>

  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
  .content {
    padding: 30rpx 30rpx 100rpx 30rpx;

    .top {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-column-gap: 30rpx;
      background: #fff;

      .top-item {
        border: 1rpx solid red;
        padding: 30rpx 0;

        .top-item-title {
          padding-bottom: 10rpx;
          text-align: center;
        }

        .top-item-time {
          text-align: center;
        }
      }
    }

    .list-content {
      background: #fff;
      margin-top: 30rpx;
      padding: 20rpx;
    }

    .top-time-title {
      font-size: 32rpx;
      padding: 20rpx 0;
    }
    .top-text{
      font-size: 24rpx;
    }

    .top-time {
      padding: 10rpx;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 30rpx;
      grid-row-gap: 30rpx;
      background: #fff;

      .top-time-item {
        height: 100rpx;
        background: #F8F8F8;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #6F7075;

        .top-time-item-title {
          text-align: center;
        }

        .top-time-item-status {
          text-align: center;
        }
      }
    }

    .btns-content{
      width: 100%;
      position: fixed;
      left: 0;
      bottom: 0;
      background: #fff;
      .btn-box{
        width: 100%;
        padding: 10rpx 30rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .btn{
          padding: 10rpx 50rpx;
          color: #fff;
          background: #295B7B ;
        }
      }
    }
  }
</style>
