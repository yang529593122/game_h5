<template>
	<view class="content">
		<view class="input-item">
			<text>店铺名称</text>
			<input type="text" placeholder-class="input-pla" placeholder="请输入店铺名称">
		</view>
		<view class="input-item">
			<text>店铺logo（72*72）</text>
			<image src="/static/add-img.png" mode="aspectFill"></image>
		</view>
		
		<view class="btns">
			<view>上一步</view>
			<view class="next" @click="toPath('/pages/tab/tradingMall/informationAudit')">下一步</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
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
			image{
				width: 160rpx;
				height: 160rpx;
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