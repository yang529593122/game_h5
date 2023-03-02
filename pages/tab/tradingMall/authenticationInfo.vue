<template>
	<view class="content">
		<view class="tips">申请信息</view>
		<view class="authentication-type">
			<view @click="tab=1" :class="{active:tab==1}" class="select-type">公司</view>
			<view @click="tab=2" :class="{active:tab==2}" class="select-type">个人</view>
		</view>
		<view class="info-list" v-if="tab==1">
			<view class="info-item">
				<text>公司名称</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入公司名称">
			</view>
			<view class="info-item">
				<text>公司所在地</text>
				<view class="info-item-text">
					<input type="text" placeholder-class="input-pla" placeholder="请选择省市区">
					<image src="/static/newPage/18.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="info-item">
				<text>公司详情地址</text>
				<input type="text" placeholder-class="input-pla" placeholder="请输入详细地址">
			</view>
			<view class="info-item">
				<text>统一社会信用码</text>
				<input type="text" placeholder-class="input-pla" placeholder="请输入统一社会信用码">
			</view>
			<view class="info-item">
				<text>营业执照</text>
				<image class="add-img" src="/static/add-img.png" mode="aspectFill"></image>
			</view>
		</view>
		<view class="line" v-if="tab==1"></view>
		<view class="info-list">
			<view class="info-item" v-if="tab==1">
				<text>法人姓名</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入姓名">
			</view>
			<view class="info-item" v-if="tab==1">
				<text>法人手机</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入手机号">
			</view>
			<view class="info-item" v-if="tab==1">
				<text>法人身份证</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入身份证号">
			</view>
			<view class="info-item" v-if="tab==2">
				<text>联系人姓名</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入姓名">
			</view>
			<view class="info-item" v-if="tab==2">
				<text>联系人手机</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入手机号">
			</view>
			<view class="info-item" v-if="tab==2">
				<text>联系人身份证</text>
				<input type="text"placeholder-class="input-pla" placeholder="请输入身份证号">
			</view>
			<view class="card-img">
				<view class="card-img-item">
					<image src="/static/newPage/20.png" mode=""></image>
					<view class="">身份证正面</view>
				</view>
				<view class="card-img-item">
					<image src="/static/newPage/21.png" mode=""></image>
					<view class="">（示例）</view>
				</view>
				<view class="card-img-item">
					<image src="/static/newPage/20.png" mode=""></image>
					<view class="">身份证反面</view>
				</view>
				<view class="card-img-item">
					<image src="/static/newPage/22.png" mode=""></image>
					<view class="">（示例）</view>
				</view>
			</view>
		</view>
		<view class="authentication-type btns">
			<view class="step">上一步</view>
			<view class="next" @click="toPath('/pages/tab/tradingMall/settlementInformation')">下一步</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tab:1,
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
		
		.tips {
			font-size: 28rpx;
			color: #0E0E0C;
			padding: 20rpx 32rpx;
		}
		
		.authentication-type {
			background: #fff;
			padding: 32rpx 0;
			display:flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 20rpx;
			
			.select-type {
				width: 240rpx;
				line-height: 64rpx;
				background: #FBFBFB;
				text-align: center;
				font-size: 28rpx;
				color: #333333;
			}
			
			.active {
				background: #295B7B;
				color: #fff;
			}
			
			.step {
				width: 280rpx;
				line-height: 88rpx;
				background-color: #EEEEEE;
				text-align: center;
				font-size: 28rpx;
			}
			
			.next {
				width: 280rpx;
				line-height: 88rpx;
				background-color: #295B7B;
				text-align: center;
				color: #fff;
				font-size: 28rpx;
			}
		}
		
		.info-list {
			background: #fff;
			padding: 0 32rpx;
			.info-item{
				padding:32rpx 0;
				border-bottom: 1rpx solid #EEEEEE;
				display: flex;
				justify-content: space-between;
				align-items: center;
				
				.input-pla {
					color: #BFBFBF;
				}
				
				text {
					font-size: 32rpx;
					color: #333;
				}
				input {
					text-align: right;
				}
				
				.info-item-text {
					display: flex;
					justify-content: flex-end;
					align-items: center;
					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
				
				.add-img {
					width: 160rpx;
					height: 160rpx;
				}
			}
			
			.card-img {
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				
				.card-img-item {
					text-align: center;
					padding-top: 32rpx;
					image{
						width: 314rpx;
						height: 204rpx;
					}
					view{
						font-size: 28rpx;
						color: #333333;
						margin-top: 24rpx;
					}
				}
			}
		}
		
		.line {
			height: 20rpx;
			background: #F8F8F8;
		}
		
		.btns {
			padding-top: 80rpx;
		}
	}
</style>