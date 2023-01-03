<template>
	<fu-popup v-model="show" mode="bottom" :safe-area-inset-bottom="true" :border-radius="24">
		<view class="padding xs_bj">
			<view class="flex justify-between padding-bottom">
				<view class="flex-sub text-center xs_title">
					<text class="xs_circle opacity50"></text>
					<text class="xs_circle"></text>
					<text class="xs_text">{{i18n['优惠']}}</text>
					<text class="xs_circle"></text>
					<text class="xs_circle opacity50"></text>
				</view>
				<view class="close-box" @tap="close"><text class="cuIcon-close"></text></view>
			</view>
			<scroll-view class="container" scroll-y>
				<view class="margin-bottom-sm" v-for="(item, index) in info" :key="index">
          <jd-coupon :discountPrice="item.money" :name="item.name" :time="item.end_time" :limit="item.min_order_money" :isUse="item.is_receive == 1" @click="receive(item,index,item.is_receive)"></jd-coupon>
				</view>
			</scroll-view>
		</view>
	</fu-popup>
</template>

<script>
  import JdCoupon from '../jd-coupon/jd-coupon.vue';
export default {
  components: {
    JdCoupon,
  },
	props: {
		info: {
			type: Array,
			default() {
				return [];
			}
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
		//领取优惠券
		receive(item, index, is_receive) {
			// 前端判断已领取得点击失效
			if (is_receive == 1) {
				return this.$message.info('已领取过该优惠券~');
			}
			this.$api
				.post(global.apiUrls.postReceiveCoupon, {
					cid: item.id
				})
				.then(res => {
					console.log(res.data);
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
					if (res.data.code == 1) {
						// this.info[index].is_receive = 1;
						this.$emit('changeInfo', index);
					}
				});
		},
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		}
	}
};
</script>

<style lang="scss" scoped>
.xs_bj {
	background: #f7f7f7;
	word-break: break-all;
}
.xs_center {
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 250upx;
	// height: 170upx;
}
.xs_price {
	font-size: 36upx;
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
	border-radius: 5px !important;
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
	.xs_price,.xs_full {
		color: #999;
	}
}
.container {
	height: 700rpx;
}
.text-999 {
	color: #999999;
}
.height-150 {
	height: 160rpx;
}
.text-price {
	/* color: red; */
	line-height: 1;
	margin-bottom: 10rpx;
	text-align: center;
}
.card-action {
	justify-content: flex-end;
	width: 100%;
	display: flex;
	align-items: center;
	/* flex: 1; */
	/* height: 100%; */
	padding-bottom: 10rpx;
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
.xs_text {
		margin-top: 10upx;
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
		margin-top: 10upx;
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
