<template>
	<view class="content">
		<view class="examine-status">
			<view class="status-one">
				<view class="examine-text">审核通过</view>
				<view class="btns">查看店铺</view>
			</view>
		</view>
		<view class="user-info">
			<view class="user-tips">个人信息</view>
			<view class="item-list">
				<view class="user-item">
					<view class="item-tips">联系人姓名</view>
					<view class="item-text">张三</view>
				</view>
				<view class="user-item">
					<view class="item-tips">联系人手机</view>
					<view class="item-text">15603908653</view>
				</view>
				<view class="user-item">
					<view class="item-tips">联系人身份证</view>
					<view class="item-text">410781100000000</view>
				</view>
				<view class="card-img">
					<image src="/static/add-img.png" mode="aspectFill"></image>
					<view class="img-text">身份证正面</view>
				</view>
				<view class="card-img">
					<image src="/static/add-img.png" mode="aspectFill"></image>
					<view class="img-text">身份证反面</view>
				</view>
			</view>
			<view class="user-tips">银行信息</view>
			<view class="item-list">
				<view class="user-item">
					<view class="item-tips">结算账户</view>
					<view class="item-text">张三</view>
				</view>
				<view class="user-item">
					<view class="item-tips">结算开户行</view>
					<view class="item-text">15603908653</view>
				</view>
				<view class="user-item">
					<view class="item-tips">姓名</view>
					<view class="item-text">410781100000000</view>
				</view>
				<view class="user-item">
					<view class="item-tips">结算开户银行支行名称</view>
					<view class="item-text">410781100000000</view>
				</view>
				<view class="user-item">
					<view class="item-tips">结算开户银行所在地</view>
					<view class="item-text">410781100000000</view>
				</view>
			</view>
			<view class="user-tips">店铺信息</view>
			<view class="item-list">
				<view class="user-item">
					<view class="item-tips">店铺名称</view>
					<view class="item-text">410781100000000</view>
				</view>
				<view class="user-item">
					<view class="item-tips">店铺logo</view>
					<image src="/static/add-img.png" mode=""></image>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.content{
		
		.examine-status {
			background: #fff;
			padding: 32rpx 0;
			.status-one {
				width: 686rpx;
				height: 221rpx;
				margin: 0 auto;
				box-shadow: 0px 3px 12px rgba(0,0,0,0.04);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.examine-text {
					color: #295B7B;
					font-size: 32rpx;
				}
				.btns {
					width: 200rpx;
					line-height: 64rpx;
					background: #295B7B;
					color: #fff;
					font-size: 28rpx;
					text-align: center;
					margin-top: 32rpx;
				}
			}
		}
		.user-info {
			
			.user-tips {
				padding: 20rpx 32rpx;
			}
			.item-list {
				padding: 0 32rpx;
				background: #fff;
				.user-item {
					padding:32rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #eee;
					view{
						font-size: 32rpx;
					}
					image{
						width: 160rpx;
						height: 160rpx;
					}
				}
				.card-img {
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					padding: 52rpx 0;
					image{
						width: 686rpx;
						height: 420rpx;
					}
					view {
						font-size: 32rpx;
						margin-top: 24rpx;
					}
				}
				.card-img:last-child{
					padding-top: 0;
				}
			}
		}
	}
</style>