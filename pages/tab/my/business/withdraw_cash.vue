<template>
  <view class="content">
    <view class="header">
      <view class="text">
        输入提现金额24小时内到账
      </view>
      <view class="num-box">
        
      </view>
      <view class="text info">
        起提金额 50，提取收取1%的手续费
      </view>
    </view>
  </view>
</template>

<script>
</script>

<style scoped lang="scss">
  .content{
    min-height: 100vh;
    background: #F8F8F8;
    image{
      display: block;
      width: 100%;
      height: 100%;
    }
    .header{
      margin-top: 20rpx;
      padding: 20rpx;
      background: #fff;
      .text{
        font-weight: bold;
        &.info{
          border-top: 1rpx solid red;
          font-weight: normal;
          font-size: 24rpx;
          padding: 20rpx 0 8rpx 0;
        }
      }
    }
  }
</style>
