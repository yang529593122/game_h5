<template>
	<view class="blackinquirePage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				黑号查询
			</view>
		</fu-custom>
		
		<view class="blackinquirePageContent">
			<view class="blackinquirePageContentTitle">黑号验证</view>
			<view class="blackinquirePageContentInput">
				<input class="blackinquirePageContentInputIn" v-model="accountNum" placeholder="请输入手机号、微信号、QQ号"/>
			</view>
			
			<button class="blackinquirePageContentBtn" :loading="IsshowLoading" @click="clickVerification">验证</button>
		</view>
		
		<view class="bottomTextTips" v-if="bottomText">{{bottomText}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IsshowLoading:false,
				accountNum:'',
				bottomText:''
			}
		},
		watch:{
			accountNum() {
				this.bottomText = '';
			}
		},
		methods: {
			clickVerification() {
				if(!this.accountNum) {
					this.$message.info('请输入需要查询的手机号、微信号、QQ号')
					return;
				}
				this.IsshowLoading = true;
				this.$api.post(global.apiUrls.gameBlackAccount,{
					account:this.accountNum
				}).then(res => {
					// if(res.data.code == 1) {
						
					// } else {
						// this.$message.info(res.data.msg);
					// }
					this.bottomText = res.data.msg;
					this.IsshowLoading = false;
				})
				// setTimeout(() =>{
					
				// },700)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.blackinquirePage {
		min-height: 100vh;
		background: #F8F8F8;
	}
	
	.blackinquirePageContent {
		margin-top: 219rpx;
	}
	
	.blackinquirePageContentTitle {
		text-align: center;
		font-size: 32rpx;
		color: #36373D;
		font-weight: 500;
	}
	
	.blackinquirePageContentInput {
		width: 702rpx;
		height: 96rpx;
		background: #FFFFFF;
		border-radius: 4rpx;
		margin-left: 24rpx;
		margin-top: 24rpx;
		
		.blackinquirePageContentInputIn {
			width: 702rpx;
			height: 96rpx;
			background: #FFFFFF;
			border-radius: 4rpx;
			text-align: center;
			font-size: 28rpx;
			color: #5C707E;
			padding: 0 24rpx;
		}
	}
	
	.blackinquirePageContentBtn {
		margin-top: 95rpx;
		height: 88rpx;
		width: 702rpx;
		margin-left: 24rpx;
		background: #295B7B;
		opacity: 1;
		border-radius: 4rpx;
		color: #FFFFFF;
		line-height:88rpx;
		font-size: 28rpx;
	}
	
	.bottomTextTips {
		position: fixed;
		bottom: 172rpx;
		text-align: center;
		left: 50%;
		transform: translateX(-50%);
		font-size: 28rpx;
		color: #CE0028;
	}
</style>