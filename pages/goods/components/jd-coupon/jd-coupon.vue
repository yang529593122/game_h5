<template>
  <view class="coupon-box">
    <view class="item" :class="[!isUse  ? 'canuse' : 'disabled']">
      <view class="wrap" :class="[!isUse  ? 'a' : 'd']">
        <view class="top">
          <view class="roundBox">
            <view class="box" :class="[!isUse  ? 'canuse' : 'disabled']">{{i18n['券']}}</view>
          </view>
          <view class="contentBox flex-sub flex flex-direction justify-between margin-lr-sm text-cut">
            <text class="text-cut">{{ name }}</text>
            <text class="text-sm text-999 text-cut">{{i18n['有效期至']}}：{{ time }}</text>
          </view>
          <view class="text-bold" :class="[!isUse  ? 'canuseText' : 'disabledText']">
            <text class="text-price" style="font-size: 32rpx;"></text>
            <text class="price">{{discountPrice}}</text>
          </view>
        </view>
        <view class="bot solid-top">
          <view class="tit">{{i18n['指定商品可用']}}</view>
          <view class="btn" :class="[!isUse ? 'canuse' : 'disabled']" @tap="handleClick()">{{ isUse ? i18n['已领取'] : i18n['立即领取']}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      discountPrice: {
        type: [String, Number]
      },
      name: {
        type: String
      },
      time: {
        type: String
      },
      limit: {
        type: [String, Number]
      },
      isUse: {
        type: Boolean,
        default: false
      }
    },
    filters: {
      filterPrice(price) {
        return parseFloat(price);
      }
    },
    methods: {
      handleClick() {
        this.$emit('click');
      }
    }
  };
</script>

<style lang="scss" scoped>
.item{
    margin-bottom: 24rpx;
    height: 242rpx;
    border-radius: 16rpx;
    padding: 10rpx;
    .wrap{
      width: 100%;
      height: 100%;
      background-color: #FFFFFF;
      border-radius: 12rpx;
      padding: 0 24rpx;
      display: flex;
      flex-direction: column;
      position: relative;
      .top{
        flex: 1;
        padding: 24rpx 0;
        display: flex;
        align-items: center;
        .roundBox{
          width: 106rpx;
          height: 87rpx;
          overflow: hidden;
          .box{
            width: 106rpx;
            height: 106rpx;
            border-radius: 50%;
            text-align: center;
            line-height: 106rpx;
            color: #FFFFFF;
            font-size: 48rpx;
          }
        }
        .contentBox{
          height: 87rpx;
        }
        .price{
          font-size: 48rpx;
        }
      }
      .bot{
        height: 88rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .tit{
          color: #333333;
          font-size: 24rpx;
        }
        .btn{
          width: 120rpx;
          height: 48rpx;
          border-radius: 48rpx;
          text-align: center;
          line-height: 48rpx;
          font-size: 24rpx;
          color: #FFFFFF;
        }
      }
    }
    .wrap.a::after{
      content: "";
      position: absolute;
      height: 100%;
      width: 10rpx;
      top: 0;
      left: 0;
      background: radial-gradient(circle at 0rpx 30rpx, #FF6464 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 70rpx, #FF6464 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 110rpx, #FF6464 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 150rpx, #FF6464 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 190rpx, #FF6464 10rpx,transparent 0);
    }
    .wrap.d::after{
      content: "";
      position: absolute;
      height: 100%;
      width: 10rpx;
      top: 0;
      left: 0;
      background: radial-gradient(circle at 0rpx 30rpx, #BFBFBF 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 70rpx, #BFBFBF 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 110rpx, #BFBFBF 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 150rpx, #BFBFBF 10rpx,transparent 0),
      radial-gradient(circle at 0rpx 190rpx, #BFBFBF 10rpx,transparent 0);
    }
    }

.canuse{
    background: #FF6464;

  }
  .disabled{
    background: #BFBFBF;
  }
  .canuseText{
    color: $theme;
  }
  .disabledText{
    color: #BFBFBF;
  }
</style>