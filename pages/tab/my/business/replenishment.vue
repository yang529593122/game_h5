<template>
  <view class="content">
    <view class="list">
      <view class="item">
        <view class="header">
          <view class="title">
            哈萨克都会分开
          </view>
          <view class="time">
            2032-23-32 15:34:45
          </view>
        </view>
        <view class="details">
          <view class="img-box">
            <image src="../../static/bg.png" mode="aspectFill"></image>
          </view>
          <view class="text">
             哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开 哈萨克都会分开
          </view>
        </view>
        <view class="mess">
          哈萨克都会分开哈萨克都会分开
        </view>
      </view>

    </view>
  </view>
</template>

<script>
</script>

<style lang="scss" scoped>
.content{
  min-height: 100vh;
  background: #F8F8F8;
  image{
    display: block;
    width: 100%;
    height: 100%;
  }
  .list{
    padding: 20rpx;
    .item{
      background: #fff;
      padding: 20rpx;
      .header{
        display: flex;
        justify-content: space-between;
        padding: 10rpx 0;

        .title{
          color: #363636 ;
          font-size: 32rpx;
           line-height: 40rpx;
        }
        .time{
          font-size: 24rpx;
          color: #A2A2A2;
          line-height: 40rpx;
        }
      }
      .details{
         display: flex;
         background: yellow;
         .img-box{
            width: 140rpx;
            height: 140rpx;
         }
         .text{
           flex: 1;
           padding-top: 10rpx;
           padding-left: 20rpx;
           color: #A2A2A2;
         }
      }
      .mess{
        padding-top: 20rpx;
        font-size: 24rpx;
        color: #A2A2A2;
      }
    }

  }
}
</style>
