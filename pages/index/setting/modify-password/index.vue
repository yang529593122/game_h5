<template>
  <view class="page">
    <fu-custom :isBack="true" :isBottom="true" bgColor="bg-white">
			<view slot="content">修改密码</view>
		</fu-custom>
    <view class="per ">
      <!-- 旧密码验证修改 start -->
      <view  @tap="handleJump"  data-url="/pages/index/setting/change-password/index">
        <view class="per_row">
          <text class="text-lg text-black">{{i18n['旧密码验证修改']}}</text>
          <image src="/static/my/arr.png" style="width: 24rpx;height: 24rpx;"  mode="aspectFit"></image>
        </view>
      </view>
      <!-- 旧密码验证修改 end -->
      <!-- 手机号码验证修改 start -->
      <view  @click="handleRoute">
        <view class="per_row">
          <text class="text-lg text-black">{{i18n['手机号验证修改']}}</text>
          <image src="/static/my/arr.png" style="width: 24rpx;height: 24rpx;"  mode="aspectFit"></image>
        </view>
      </view>
      <!-- 手机号码验证修改 end -->
    </view>
	
	<view class="per ">
	  <!-- 旧密码验证修改 start -->
	  <view @tap="handleJump"  data-url="/pages/user/user/authentication/index">
	    <view class="per_row">
	      <text class="text-lg text-black">实名认证</text>
	      <image src="/static/my/arr.png" style="width: 24rpx;height: 24rpx;"  mode="aspectFit"></image>
	    </view>
	  </view>
	  <!-- 旧密码验证修改 end -->
	  <!-- 手机号码验证修改 start -->
	  <view>
	    <view class="per_row" @tap="handleJump" data-url="/pages/user/wallet/alipay-bind/index">
	      <text class="text-lg text-black">绑定支付宝账号</text>
	      <image src="/static/my/arr.png" style="width: 24rpx;height: 24rpx;"  mode="aspectFit"></image>
	    </view>
	  </view>
	  
	  <view>
	    <view class="per_row"  @tap="handleJump" data-url="/pages/user/wallet/wechat-bind/index">
	      <text class="text-lg text-black">绑定微信账号</text>
	      <image src="/static/my/arr.png" style="width: 24rpx;height: 24rpx;"  mode="aspectFit"></image>
	    </view>
	  </view>
	  <!-- 手机号码验证修改 end -->
	</view>

    <!-- 断网监测 start -->
    <fu-notwork></fu-notwork>
    <!-- 断网监测 end -->
  </view>
</template>

<script>
  export default {
    data() {
      return {
        isHavePassword:true,
      };
    },
    computed: {

    },
    onShow() {
      this.is_have_password()

    },
    onLoad() {
      // this.setNavigationBarTitle(this.i18n['修改密码']);
    },
    methods: {
      // 0 没有设置过密码 1 有设置密码
      // is_have_password() {
      //   let that = this;
      //   this.$api
      //     .post(global.apiUrls.postloginIsHavePassword)
      //     .then(res => {
      //       if(res.data.code == 1){
      //         that.isHavePassword =  res.data.data.is_password
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
      // },
      handleRoute(){
        this.$urouter.navigateTo({
          url: '/pages/index/setting/modify-password-verify-phone/index',
          params: {
            type: 2,
          }
        });
      },

    }
  };
</script>

<style lang="scss" scoped>
  // 列表样式 start
  .per {
    padding-bottom: 20rpx;
    font-size: 28upx;
    .per_row {
      padding: 30upx;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #ededed;
      background-color: #fff;
      text {
        &:nth-child(1) {
          width: 100%;
          text {
            width: auto;
            margin-right: 10upx;
            color: #999;
            float: right;
            line-height: 36upx;
          }
        }
      }
      .row_right {
        text-align: right;

        .aa {
          color: #999999;
          display: inline-block;
          margin-right: 10upx;
        }
      }
    }
  }
  // 列表样式 end

</style>
