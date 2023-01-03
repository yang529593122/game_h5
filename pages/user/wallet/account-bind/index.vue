<template>
  <view class="page-user solid-top">
    <view class="list">
      <!-- 支付宝 start -->
      <view class="item" @click="handleJump" data-url="/pages/user/wallet/alipay-bind/index">
        <view class="flex align-center">
          <image class="image" src="../../static/zfb.png" mode="aspectFill"></image>
          <view class="text">{{ i18n['绑定支付宝'] }}</view>
        </view>
        <view>
          <text v-if="is_ali" class="Popups_del">{{ i18n['已绑定'] }}</text>
          <text class="cuIcon-right text-gray" style="font-size: 28rpx;"></text>
        </view>
      </view>
      <!-- 支付宝 end -->
      <!-- 微信 start -->
      <view class="item" @click="handleJump" data-url="/pages/user/wallet/wechat-bind/index">
        <view class="flex align-center">
          <image class="image" src="../../static/wx.png" mode="aspectFill"></image>
          <view class="text">{{ i18n['绑定微信'] }}</view>
        </view>
        <view>
          <text v-if="is_wx" class="Popups_del">{{ i18n['已绑定'] }}</text>
          <text class="cuIcon-right text-gray" style="font-size: 28rpx;"></text>
        </view>
      </view>
      <!-- 微信 end -->
      <!-- 银行卡 start -->
      <view class="item" @click="handleJump" data-url="/pages/user/wallet/card-bind/index">
        <view class="flex align-center">
          <image class="image round" src="../../static/ye.png" mode="aspectFill"></image>
          <view class="text">{{ i18n['绑定银行卡'] }}</view>
        </view>
        <view>
          <text v-if="is_card" class="Popups_del">{{ i18n['已绑定'] }}</text>
          <text class="cuIcon-right text-gray" style="font-size: 28rpx;"></text>
        </view>
      </view>
      <!-- 银行卡 end -->
    </view>

    <!-- 断网检查 -->
    <fu-notwork></fu-notwork>
  </view>
</template>

<script>
/**
 * @author 刘畅
 */
export default {
  data() {
    return {
      is_ali: false, // {Boolean} 是否绑定支付宝
      is_wx: false, // {Boolean} 是否绑定微信
      is_card: false // 是否绑定银行卡
    };
  },
  onShow() {
    this.detail(1);
    this.detail(2);
    this.detail(3);
  },
  onLoad() {
    this.setNavigationBarTitle(this.i18n['账号绑定']);
  },
  methods: {
    /**
     * @function
     * @description 是否绑定支付宝or微信
     * @param {Number} type - 1:支付宝；2：微信；
     * @property {Number} account_type - 【账户类型 1 微信 2 支付宝 3 银行卡。类型：tinyint(1)】
     */
    detail(type) {
      this.$api
        .get(global.apiUrls.getWithdrawAccount, {
          account_type: type
        })
        .then(res => {
          res = res.data;
          if (res.code == 1) {
            if (type == 1 && res.data.true_name != '' && res.data.qrcode != '' && res.data.account_id != '') {
              this.is_wx = true;
            } else if (type == 2 && res.data.true_name != '' && res.data.qrcode != '' && res.data.account_id != '') {
              this.is_ali = true;
            } else if(type == 3 && res.data.true_name != '' && res.data.account_id != '') {
              this.is_card = true;
            }
          }
        })
        .catch(err => {
          console.log(err, 'get_withdraw_account');
        });
    }
  }
};
</script>

<style lang="scss">
.Popups_del {
  color: $fu-type-error;
  font-size: 28rpx;
  padding-right: 14rpx;
}
.list {
  background: #ffffff;
  padding: 0 32rpx;
  box-sizing: border-box;
  .item {
    height: 124upx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0rpx;
      right: 0;
      background: #eeeeee;
      display: block;
      height: 1px;
    }

    &:nth-last-child(1):after {
      background: none;
    }
    .image {
      width: 52rpx;
      height: 52rpx;
    }
  }

  .icon_w {
    width: 44upx;
    height: 44upx;

    svg {
      width: 44upx;
      height: 44upx;
    }
  }

  .text {
    margin-left: 16rpx;
    font-size: 32rpx;
    font-family: PingFang-SC-Regular;
    color: #333333;
  }
  .adds {
    width: 18rpx;
    height: 18rpx;
    margin: 0 20rpx;
  }
  .arrow {
    text-align: right;
    color: #000000;
    .iconfont {
      color: #666;
      font-size: 28upx;
    }
  }
}
</style>
