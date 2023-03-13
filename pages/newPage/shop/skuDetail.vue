<template>
  <view class="content">
    <view class="sku-list">
      <view class="sku-item"  v-for="(item,index) in itemGame">
        <view class="sku-input">
          <view class="sku-input-item" >
            <text class="input-tips">规格</text>
            <input type="text" placeholder="请输入规格" v-model='item.specs' >
          </view>
          <view class="sku-input-item" >
            <text class="input-tips">划线价</text>
            <input type="text" placeholder="请输入划线价" v-model='item.market_price' >
          </view>
          <view class="sku-input-item" >
            <text class="input-tips">本店价</text>
            <input type="text" placeholder="请输入本店价" v-model='item.shop_price' >
          </view>
          <view class="sku-input-item" >
            <text class="input-tips">成本价</text>
            <input type="text" placeholder="请输入成本价" v-model='item.cost_price' >
          </view>
          <view class="sku-input-item">
            <text class="input-tips">库存</text>
            <input type="text" placeholder="请输入库存" v-model='item.stock'>
          </view>
        </view>
      </view>
      <view class="add-sku" @click="addSku">+添加一组</view>
    </view>
    <view style="height: 220rpx;"></view>
    <view class="confirm-release">
      <button class="confirm-btn" @click='submitFn'>保存</button>
    </view>
  </view>
</template>

<script>
  import {
    host,
    SERIAL,
    UPLOAD_VIDEO_URL
  } from '@/common/config.js'
  export default {
    data() {
      return {
        itemGame:[  // 规格json字符串（包含字段：sku_id=货品ID编辑时传，specs=规格内容，market_price=划线价，shop_price=本店价，cost_price=成本价，stock=库存）
          {
            sku_id:'',
            specs:"", // 规格内容
            market_price:'', // 划线价
            shop_price:"", // 本店价
            cost_price:"", // 成本价
            stock:"", // 库存
          }
        ]
      }
    },
    onLoad() {

    },
    methods: {

      // 添加一组账号
      addSku(){
        this.itemGame.push({
           sku_id:'',
           specs:"", // 规格内容
           market_price:'', // 划线价
           shop_price:"", // 本店价
           cost_price:"", // 成本价
           stock:"", // 库存
        })
      },
      // 确认发布
      submitFn(){
        console.log(this.itemGame)
      },

    }
  }
</script>

<style lang="scss">
  .content {
    .add-info-item {
      padding: 32rpx;
      background: #fff;
      margin-bottom: 20rpx;

      .add-tips {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24rpx;

        .add-title {
          font-size: 28rpx;
          font-weight: bold;

          text:nth-child(2) {
            font-size: 24rpx;
            color: #B7BAC2;
          }
        }
      }

      .add-input {
        width: 100%;
        height: 100rpx;
        font-size: 28rpx;
        line-height: 35rpx;
      }

      .add-input-tips {
        color: #B7BAC2;
      }

      .img-list {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;

        .img-item {
          width: 140rpx;
          height: 140rpx;
          position: relative;
          margin-right: 15rpx;
          margin-bottom: 15rpx;

          image {
            width: 100%;
            height: 100%;
          }

          .delete-icon {
            width: 32rpx;
            height: 32rpx;
            position: absolute;
            top: -10rpx;
            right: -10rpx;
          }
        }

        .add-icon {
          width: 140rpx;
          height: 140rpx;
        }
      }
    }

    .item-input {
      padding: 32rpx;
      background: #fff;
      border-bottom: 1rpx solid #eee;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input-tips {
        font-size: 32rpx;
        color: #36373D;
        min-width: 300rpx;
      }

      .select-input {
        display: flex;
        justify-content: center;
        align-items: center;

        text {
          font-size: 32rpx;
          color: #868686;
          margin-right: 5rpx;
        }

        image {
          width: 24rpx;
          height: 24rpx;
        }

        .go-add {
          color: #3B82CD;
          margin-right: 5rpx;
        }
      }

      .input-item {
        text-align: right;
      }

      .radio {
        .radio-item {
          transform: scale(0.7);
          vertical-align: middle;
        }

        text {
          vertical-align: middle;
          font-size: 32rpx;
          color: #868686;
          margin-left: 10rpx;
        }

        text:nth-child(2) {
          margin-right: 40rpx;
        }
      }
    }

    .sku-list {
      padding: 0 32rpx;

      background: #fff;

      .sku-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        border-bottom: 1px solid #eee;
        padding: 32rpx 0;

        .delete-icon {
          width: 22rpx;
          height: 25rpx;
        }

        .sku-input {
          .sku-input-item {
            display: flex;
            justify-content: flex-start;
            align-items: center;

            text {
              min-width: 120rpx;
              font-size: 32rpx;
              color: #36373D;
              text-align: right;
            }

            input {
              height: 60rpx;
              line-height: 60rpx;
              border: 1px solid rgba(101, 155, 199, 0.349);
              font-size: 32rpx;
              padding: 0 24rpx;
              margin-left: 40rpx;
            }
          }

          .sku-input-item {
            margin-bottom: 26rpx;
          }
        }
      }

      .add-sku {
        padding: 20rpx 0;
        font-size: 32rpx;
        color: #659BC7;
      }
    }

    .confirm-release {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 100%;
      padding: 24px 32rpx 40rpx;
      background: #fff;
      z-index: 100;

      .confirm-tips {
        font-size: 26rpx;
        color: #36373D;
      }

      .confirm-btn {
        width: 686rpx;
        line-height: 88rpx;
        background: #295B7B;
        color: #fff;
        font-size: 28rpx;
        margin-top: 22rpx;
      }
    }
  }
</style>
