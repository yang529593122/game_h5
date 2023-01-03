<template>
	<fu-popup v-model="show" mode="bottom" :safe-area-inset-bottom="true" :border-radius="24">
		<view class="padding bg-white">
			<view class="flex justify-between padding-bottom">
				<view class="flex-sub text-center xs_title">
					<text class="xs_circle opacity50"></text>
					<text class="xs_circle"></text>
					<text class="xs_text">{{i18n['配送至']}}</text>
					<text class="xs_circle"></text>
					<text class="xs_circle opacity50"></text>
				</view>
				<view class="close-box" @tap="close"><text class="cuIcon-close"></text></view>
				<!-- <view class="close-box" @tap="close">
					<image class="" src="./static/address-copn.png" />
				</view> -->
			</view>
			<scroll-view class="container" scroll-y>
				<block v-for="(item, index) in addrs" :key="item.address_id">
					<view class="flex align-center padding-sm" :class="{ 'text-bold': curTab == item.address_id }" @tap="selectAddress(index)">
						<view class="margin-right-sm text-999" :class="{ 'text-theme': curTab == item.address_id }">
							<image v-if="curTab == item.address_id" class="xs_icon" src="./static/select.png" mode=""></image>
							<image v-else class="xs_icon" src="./static/address.png" mode=""></image>
						</view>
						<view class="text-df">
							<view class="xs_province">{{ item.province }}{{ item.city }}{{ item.district }}{{ item.address }}</view>
							<!-- <view class="xs_address">{{ item.address }}</view> -->
						</view>
					</view>
				</block>
			</scroll-view>
			<!-- <view class="margin-top">
				<button class="cu-btn bg-theme block round height-88 text-white" @click="navToAddAddress">{{i18n['新增地址']}}</button>
			</view> -->
		</view>
	</fu-popup>
</template>

<script>
export default {
	props: {
		addrs: {
			type: Array,
			default() {
				return [];
			}
		},
		'auto-close': {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			show: false,
			curTab: 0
		};
	},
	watch: {
		addrs(val) {
			if (val.length != 0) {
				let cur = val.find(item => item.is_default == 1);
				if (cur) {
					this.curTab = cur.address_id;
					this.$emit('change', cur);
				} else {
					this.curTab = val[0].address_id;
					this.$emit('change', val[0]);
				}
			}
		}
	},
	methods: {
		open() {
			this.show = true;
		},
		close() {
			this.show = false;
		},
		selectAddress(index) {
			this.curTab = this.addrs[index].address_id;
			this.$emit('change', this.addrs[index]);
			if (this['auto-close']) {
				this.close();
			}
		},
		// 去添加新地址
		navToAddAddress() {
      this.$urouter.navigateTo('/pages/user/address/address-add/index');
    }
	}
};
</script>

<style lang="scss" scoped>
.xs_icon {
	width: 24upx;
	height: 30upx;
}
.container {
	height: 600rpx;
}
.text-999 {
	color: #999999;
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
		background: $theme;
		border-radius: 50%;
		margin: 0 6upx;
	}
	.opacity50 {
		opacity: 0.5;
	}
}
.text-df {
	.xs_province {
		font-size: 28upx;
		font-weight: bold;
		color: #333333;
	}
	.xs_address {
		font-size: 24upx;
		font-weight: 400;
		color: #666666;
		margin-top: 16upx;
	}
}
</style>
