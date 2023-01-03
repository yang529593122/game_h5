<template>
	<view class="solid-top">
		<view class="succ">
			<image src="../../static/succ.png" mode="widthFix"></image>
			<!-- <text class="succ_pa">{{i18n['提交申请成功,等待管理员审核']}}</text> -->
			<text class="succ_pa">{{i18n['提交申请成功']}}</text>
			<!-- <text class="succ_pc">{{i18n['(审核周期1-2个工作日)']}}</text> -->
			<text class="succ_pb">{{i18n['提现方式：']}}{{type}}</text>
			<text class="succ_pb margin0">{{i18n['提现金额：']}}{{money}}{{i18n['元']}}</text>
		</view>
    <!-- <view class="margin-top flex justify-center padding-top">
      <button class="cu-btn round bg-theme text-white" style="width: 360rpx;height: 88rpx;" @click="handleJump" data-url="/pages/user/wallet/withdraw/index" data-type="REDIRECT">{{i18n['继续提现']}}</button>
    </view> -->
    <fu-notwork></fu-notwork>
	</view>
</template>

<script>
  export default {
    data() {
      return {
        type:'',
        money:''
      };
    },
    onLoad(options) {
		this.setNavigationBarTitle(this.i18n['提现申请成功'])
      this.type = options.type
      this.money = options.money
    }

  };
</script>

<style lang="scss">
	page,body,html{
		background: white;
		min-height: 100%;
	}
	.succ{
		width: 100%;
		height: auto;
		overflow: hidden;
		image{
			display: block;
			width: 250upx;
			height: 180upx;
			margin: 185upx auto 0;
		}
		.succ_pa{
			font-size: 32rpx;
			color: #333333;
			margin-top: 40upx;
			display: block;
			text-align: center;
		}
		.succ_pb{
			display: block;
			text-align: center;
			font-size: 28upx;
			color: #666666;
			font-weight: 400;
			margin-top: 32upx;
			&.margin0{
				margin-top: 0;
			}

		}
    .succ_pc{
    	display: block;
    	text-align: center;
    	font-size: 28rpx;
    	color: #666666;
    	margin-top: 10upx;

    }
		.succ_box{
			width: 460upx;
			height: auto;
			overflow: hidden;
			margin: 100upx auto 0;
			text{
				display: block;
				width:200upx;
				height:78upx;
				border:1px solid rgba(191,191,191,1);
				border-radius:39upx;
				font-size: 28upx;
				text-align: center;
				line-height: 78upx;
				float: left;
				&:nth-last-child(1){
					float: right;
					background: $theme;
					border:1px solid rgba(0,0,0,0);
					color: white;
				}
			}
		}
	}
</style>
