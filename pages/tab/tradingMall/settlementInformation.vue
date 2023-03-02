<template>
	<view class="content">
		<view class="input-item">
			<text>结算账户</text>
			<input type="text" placeholder-class="input-pla" placeholder="请输入银行卡号">
		</view>
		<view class="input-item">
			<text>结算开户行</text>
			<input type="text" placeholder-class="input-pla" placeholder="请输入银行卡开户名">
		</view>
		<view class="input-item">
			<text>姓名</text>
			<input type="text" placeholder-class="input-pla" placeholder="请输入姓名">
		</view>
		<view class="input-item">
			<text>结算开户银行支行名称</text>
			<input type="text" placeholder-class="input-pla" placeholder="请输入银行支行名称">
		</view>
		<view class="input-item">
			<text>结算开户银行所在地</text>
			<input type="text" placeholder-class="input-pla" placeholder="请输入银行所在地">
		</view>
		<view class="btns">
			<view>上一步</view>
			<view class="next" @click="toPath('/pages/tab/tradingMall/storeInfo')">下一步</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{}
		},
		methods:{
			// 路由跳转
			toPath(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.content{
		.input-item{
			padding: 32rpx;
			background: #fff;
			border-bottom: 1px solid #eee;
			display: flex;
			justify-content: space-between;
			align-items: center;
			text {
				font-size: 28rpx;
				color: #333;
			}
			input{
				text-align: right;
			}
			.input-pla {
				color: #BFBFBF;
			}
		}
		
		.btns {
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 32rpx;
			left: 0;
			width: 100%;
			view{
				width: 280rpx;
				line-height: 88rpx;
				background: #EEEEEE;
				text-align: center;
			}
			
			.next {
				background: #295B7B;
				color: #fff;
			}
		}
	}
</style>