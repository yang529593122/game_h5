<template>
	<fu-popup v-model="show" mode="bottom" :safe-area-inset-bottom="true" :border-radius="24">
		<view class="padding xs_bj">
			<view class="flex justify-between padding-bottom">
				<view class="flex-sub text-center xs_title">
					<text class="xs_circle opacity50"></text>
					<text class="xs_circle"></text>
					<text class="xs_text">{{ title }}</text>
					<text class="xs_circle"></text>
					<text class="xs_circle opacity50"></text>
				</view>
				<view class="close-box" @tap="close"><text class="cuIcon-close"></text></view>
			</view>
			<scroll-view class="container" scroll-y>
				<!-- <text>可领取优惠券</text> -->
				<view class="xs_line_height" v-if='!info'>{{i18n['无']}}</view>
				<view class="xs_line_height" v-else v-html="info"></view>
				<!-- <block v-for="(item, index) in info" :key="index"></block> -->
			</scroll-view>
		</view>
	</fu-popup>
</template>

<script>
export default {
	props: {
		info: {
			type: String
		},
		title: {
			type: String
		}
	},
	data() {
		return {
			show: false,
			curTab: 0
		};
	},
	watch: {},
	methods: {
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		}
	},
	mounted() {
		console.log(this.info);
	}
};
</script>

<style lang="scss" scoped>
.xs_bj {
	background: #fff;
}

.xs_center {
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 150upx;
	// height: 170upx;
}
.xs_price {
	font-size: 48upx;
	font-weight: bold;
	color: #ffffff;
}
.text-price::before {
	font-size: 12px;
}
.xs_full {
	font-size: 24upx;
	color: #ffffff;
}
.xs_text {
}
.xs_time {
}
.xs_btn {
	background: #ff6464 !important;
	border-radius: 30px !important;
}
.xs_bl {
	border-left: 1px dotted $theme !important;
}
.xs_b {
	background: #fff !important;
	border: none !important;
}
.xs_back {
	background: #ff6464 !important;
	border-radius: 2px !important;
}
.is_receive {
	background: #ececec !important;
	border-radius: 2px !important;
	.xs_price,
	.xs_full {
		color: #999;
	}
}
.xs_line_height {
	line-height: 2;
}
.container {
	height: 600rpx;
}
.text-999 {
	color: #999999;
}
.height-150 {
	height: 150rpx;
}
.text-price {
	/* color: red; */
	line-height: 1;
	text-align: center;
}
.card-action {
	justify-content: center;
	width: 180rpx;
	display: flex;
	align-items: center;
	/* flex: 1; */
	height: 100%;
	padding-left: 10rpx;
	padding-right: 10rpx;
	.action-btn {
		height: 60rpx;
		width: 140rpx;
		padding: 0;
		border-radius: 20rpx;
		font-size: 24rpx;
		text-align: center;
		line-height: 60rpx;
		color: #ffffff;
		background: #fd100b;
	}
}
.get-after {
	background: #949090 !important;
}
.get-before {
	background: linear-gradient(90deg, rgb(245, 69, 45) 0%, rgb(255, 3, 3) 100%);
}
.left {
	text-align: center;
	width: 140rpx;
	/* background: #FCCE31; */
	background: linear-gradient(90deg, #ff154f 0%, #f12228 100%);
	color: #fff;
	height: 100%;
	line-height: 1;
}
.right {
	width: 360rpx;
}
.border {
	border: 1rpx solid #fbefc7;
	background: #fbefc7;
}
.xs_title {
	font-size: 36upx;
	font-weight: bold;
	color: #333333;
	display: flex;
	align-items: center;
	justify-content: center;
	.xs_text {
		padding: 0 18upx;
	}
	.xs_circle {
		width: 10upx;
		height: 10upx;
		background: #fa2033;
		border-radius: 50%;
		margin: 0 6upx;
	}
	.opacity50 {
		opacity: 0.5;
	}
}
</style>
