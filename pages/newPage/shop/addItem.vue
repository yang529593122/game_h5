<template>
	<view class="content">
		<view class="add-info-item">
			<view class="add-tips">
				<view class="add-title">商品标题</view>
			</view>
			<textarea class="add-input" placeholder-class="add-input-tips" placeholder="请输入商品标题，如商品品牌+名字等" cols="30" rows="10"></textarea>
		</view>
		<view class="add-info-item">
			<view class="add-tips">
				<view class="add-title">
					<text>商品封面图片</text>
					<text>(请上传尺寸400*400像素的图片)</text>
				</view>
				<text>0/1</text>
			</view>
			<view class="img-list">
				<view class="img-item" v-for="item in 9">
					<image src="/static/add-img.png" mode="aspectFill"></image>
					<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
				</view>
				<image class="add-icon" src="/static/add-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="add-info-item">
			<view class="add-tips">
				<view class="add-title">
					<text>商品视频</text>
				</view>
				<text>0/1</text>
			</view>
			<view class="img-list">
				<view class="img-item">
					<image src="/static/add-img.png" mode="aspectFill"></image>
					<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
				</view>
				<image class="add-icon" src="/static/add-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="add-info-item">
			<view class="add-tips">
				<view class="add-title">
					<text>商品轮播图</text>
					<text>(请上传尺寸400*400像素的图片)</text>
				</view>
				<text>0/9</text>
			</view>
			<view class="img-list">
				<view class="img-item">
					<image src="/static/add-img.png" mode="aspectFill"></image>
					<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
				</view>
				<image class="add-icon" src="/static/add-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="add-info-item">
			<textarea placeholder="请输入商品标题，如商品品牌+名字等" cols="30" rows="10"></textarea>
		</view>
		<view class="add-info-item">
			<view class="add-tips">
				<view class="add-title">
					<text>商品详情图</text>
				</view>
			</view>
			<view class="img-list">
				<view class="img-item">
					<image src="/static/add-img.png" mode="aspectFill"></image>
					<image class="delete-icon" src="/static/newPage/13.png" mode="aspectFill"></image>
				</view>
				<image class="add-icon" src="/static/add-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="item-input" @click="commodity = true">
			<text class="input-tips">商品分类</text>
			<view class="select-input">
				<text>请选择</text>
				<image class="right-icon" src="/static/newPage/66.png" mode=""></image>
			</view>
		</view>
		<view class="item-input">
			<text class="input-tips">是否上架</text>
			<switch color="#659BC7" class="switch" checked="true" @change="" />
		</view>
		<view class="item-input">
			<text class="input-tips">是否开启规格</text>
			<switch color="#659BC7" class="switch" checked="true" @change="" />
		</view>
		<view class="item-input">
			<text class="input-tips">规格选择</text>
			<view class="select-input" @click="getToPath('/pages/newPage/shop/addSku')">
				<text>该商品分类暂无规格  </text>
				<text class="go-add">去添加</text>
				<image class="right-icon" src="/static/newPage/66.png" mode=""></image>
			</view>
		</view>
		<view class="item-input" @click="getToPath('/pages/newPage/shop/skuDetail')">
			<text class="input-tips">规格详情</text>
			<view class="select-input">
				<text>价格、库存</text>
				<image class="right-icon" src="/static/newPage/66.png" mode=""></image>
			</view>
		</view>
		<view class="item-input">
			<text class="input-tips">划线价</text>
			<input class="input-item" type="text" placeholder="请输入商品划线价">
		</view>
		<view class="item-input">
			<text class="input-tips">本店价</text>
			<input class="input-item" type="text" placeholder="请输入商品本店价">
		</view>
		<view class="item-input">
			<text class="input-tips">成本价</text>
			<input class="input-item" type="text" placeholder="请输入成本价">
		</view>
		<view class="item-input">
			<text class="input-tips">总库存</text>
			<input class="input-item" type="text" placeholder="请输入商品库存">
		</view>
		<view class="item-input">
			<text class="input-tips">是否自动发货</text>
			<label class="radio">
				<radio class="radio-item" color="#659BC7" value="radio" /><text>自动发货</text>
				<radio class="radio-item" color="#659BC7" value="radio" /><text>非自动发货</text>
			</label>
		</view>
		<view class="sku-list">
			<view class="sku-item">
				<view class="sku-input">
					<view class="sku-input-item">
						<text class="input-tips">卡号</text>
						<input type="text" placeholder="请输入卡号">
					</view>
					<view class="sku-input-item">
						<text class="input-tips">密码</text>
						<input type="text" placeholder="请输入密码">
					</view>
				</view>
				<image class="delete-icon" src="/static/newPage/67.png" mode="aspectFill"></image>
			</view>
			<view class="add-sku">+添加一组</view>
		</view>
		<view style="height: 220rpx;"></view>
		<view class="confirm-release">
			<view class="confirm-tips">注：订单交易成功将收取1%手续费</view>
			<button class="confirm-btn">确认发布</button>
		</view>
		<!-- 商品分类 -->
		<benben-picker :visible="commodity" :timeout="true" :picker-height="88" :level="2" mode="linkage" :options="option" defaultType="value" :default-props="{ label: 'name', value: 'value', children: 'children' }">
			 
		</benben-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				commodity: false,
				option:[[{label:'地下城',value:1,children:[{name:'登录',value:2}]}],[{label:'等级',value:1}],[{label:'v7',value:1}]]
			}
		},
		methods:{
			getToPath(url){
				uni.navigateTo({
					url:url
				})
			}
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
					
					text:nth-child(2){
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
				text:nth-child(2){
					margin-right: 40rpx;
				}
			}
		}
		
		.sku-list {
			padding:0 32rpx;
			
			background: #fff;
			.sku-item {
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				border-bottom:1px solid #eee;
				padding:32rpx 0;
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
							font-size: 32rpx;
							color: #36373D;
						}
						input {
							height: 60rpx;
							line-height: 60rpx;
							border: 1px solid rgba(101,155,199,0.349);
							font-size: 32rpx;
							padding: 0 24rpx;
							margin-left: 40rpx;
						}
					}
					.sku-input-item:nth-child(1) {
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