<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item" @click="getTab(1)" :class="{'active-tab':tabs==1}">
				<image :src="tabs==1?'/static/newPage/47.png':'/static/newPage/53.png'" mode="aspectFill"></image>
				<view>首页</view>
			</view>
			<view class="tab-item" @click="getTab(2)" :class="{'active-tab':tabs==2}">
				<image :src="tabs==2?'/static/newPage/52.png':'/static/newPage/46.png'" mode="aspectFill"></image>
				<view>全部商品</view>
			</view>
			<view class="tab-item" @click="getTab(3)" :class="{'active-tab':tabs==3}">
				<image :src="tabs==3?'/static/newPage/51.png':'/static/newPage/45.png'" mode="aspectFill"></image>
				<view>商品分类</view>
			</view>
			<view class="tab-item" @click="getTab(4)" :class="{'active-tab':tabs==4}">
				<image :src="tabs==4?'/static/newPage/50.png':'/static/newPage/48.png'" mode="aspectFill"></image>
				<view>店铺评价</view>
			</view>
			<view class="tab-item">
				<image src="/static/newPage/44.png" mode="aspectFill"></image>
				<view>联系客服</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:'Footer',
		props:['tab'],
		data() {
			return {
				tabs:this.tab,
			}
		},
		methods:{
			getTab(index){
				this.tabs = index;
				this.$emit('getTab',this.tabs);
			}
		}
	}
</script>

<style lang="scss">
	.content {
		
		.tab-list{
			display: flex;
			justify-content: space-around;
			align-items: center;
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #fff;
			padding: 14rpx 0 10rpx;
			
			.tab-item {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: center;
				image {
					width: 40rpx;
					height: 40rpx;
					margin-bottom: 6rpx;
				}
				view {
					line-height: 30rpx;
					font-size: 22rpx;
					color: #36373D;
				}
			}
			
			.active-tab {
				
				view {
					line-height: 30rpx;
					font-size: 22rpx;
					color: #659BC7;
				}
			}
		}
	}
</style>