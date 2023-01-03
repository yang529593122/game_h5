<template>
	<view class="box">
		<view class="titles">
			<view class="flex align-center">
				<image class="nz-img" :src='require("./static/nz.png")'></image>
				<text class="text-333 text-lg text-bold">限时秒杀</text>
				<ben-count-down ref="count" class="margin-left-sm" @refresh="init"></ben-count-down>
			</view>
			<navigator url="/pages/activity/seckill/seckill-list/index">
				<view class="flex align-center">
					<text class="text-sm" style="color: #BFBFBF;">更多</text>
					<text class="cuIcon-right margin-left-xs" style="font-size: 24rpx; color: #BFBFBF;margin-top: 4rpx;"></text>
				</view>
			</navigator>
		</view>
		<view class="top-tab">
			<block v-for="(item,index) in nowTabs" :key="index">
				<view class="tab-item" :class="[index == curIndex ? 'current' : '']" @click="tabSelect(index)">
					<text class="number">{{item.model}}</text>
					<text class="text">{{index == 0 ? '抢购中' : '即将开始'}}</text>
				</view>
			</block>
		</view>
		<view>
			<view class="margin-top-sm" v-if="lists.length > 0">
				<block v-for="(item,index) in lists" :key="index">
					<view class="list-item padding-tb-sm flex solid-bottom" @click="navToDetail(item)">
						<view class="block-246 margin-right-sm">
							<image class="radius-16" :src="item.thumb" mode="aspectFill" lazy-load></image>
							<view class="tag">
								<ben-tag text="疯抢"></ben-tag>
							</view>
						</view>
						<view class="flex-sub flex flex-direction justify-between overHidden">
							<view class="text-df text-333 text-cut-2 ">{{item.name}}</view>
							<view class="flex align-center" v-if="curIndex == 0">
								<view class="cu-progress round xs" style="width: 65%;">
									<view class="bg-theme" :style="{ width: item.rate + '%' }"></view>
								</view>
								<!-- <text class="text-999 text-xs margin-left-sm">{{item.rate + '%'}}</text> -->
							</view>
							<view class="text-xs text-999 text-cut" v-if="curIndex == 0">
								<text>{{item.sales_sum}}人成功秒杀</text>
								<text v-if="(item.sales_sum != 0) && (item.discounts != 0)" class="margin-left-xs">
									成功为他们省了{{item.sales_sum * item.discounts | filterPrice}}元
								</text>
							</view>
              <view class="text-through text-sm text-999">
              	<text class="text-price">{{item.market_price}}</text>
              </view>
							<view class="flex align-center justify-between">
								<view class="flex flex-direction overHidden">
									<view class="text-cut flex align-center">
										<view>
											<text class="text-price text-sm color1"></text>
											<text class="text-xl color1 text-bold text-cut">{{item |
												filterGoodsPrice}}</text>
										</view>
                    <view class=" flex f-money">
                      <view class="f">返</view>
                      <view class="text-bold f-info-money"> {{item.discounts | filterPrice}}元</view>
                    </view>
									</view>

								</view>
								<view class="action" v-if="curIndex == 0">
									<!-- <view class="left">
										<text>返</text>
										<text class="text-bold">{{item.discounts}}</text>
									</view> -->
									<view class="right" v-if="item.rate !== 100">
										<text class="title">马上抢</text>
									</view>
									<view class="right" v-else @tap.stop="">
										<text class="title">抢光了</text>
									</view>
								</view>
								<view v-else class="btn">
									<view class="btn1" v-if="!(item.message_notify && item.message_notify == 'true')">
										<text class="title" @click.stop="handleRemind(item)">提醒我</text>
									</view>
									<view class="btn2" v-else>
										<text class="title" @click.stop="handleUnRemind(item)">取消提醒</text>
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
			<view v-else class="empty-box">
				亲，这个时间段没有要秒杀的商品噢~
			</view>
		</view>
	</view>
</template>

<script>
	import benCountDown from '../ben-count-down3/ben-count-down.vue';
	const _tabs = [{
		model: '00:00',
		text: '即将开始',
		start: 0
	},
	{
		model: '02:00',
		text: '即将开始',
		start: 2
	},
	{
		model: '04:00',
		text: '即将开始',
		start: 4
	},
	{
		model: '06:00',
		text: '即将开始',
		start: 6
	},
	{
		model: '08:00',
		text: '即将开始',
		start: 8
	},
	{
		model: '10:00',
		text: '即将开始',
		start: 10
	},
	{
		model: '12:00',
		text: '即将开始',
		start: 12
	},
	{
		model: '14:00',
		text: '即将开始',
		start: 14
	},
	{
		model: '16:00',
		text: '即将开始',
		start: 16
	},
	{
		model: '18:00',
		text: '即将开始',
		start: 18
	},
	{
		model: '20:00',
		text: '即将开始',
		start: 20
	},
	{
		model: '22:00',
		text: '即将开始',
		start: 22
	},
	];
	export default {
		components: {
			benCountDown,
		},
		data() {
			return {
				lists: [],
				tabs: Object.freeze(_tabs),
				nowTabs: [],
				curIndex: 0,
				start: null
			}
		},
		methods: {
			init() {
				let nowDate = new Date();
				let _hour = nowDate.getHours();
				let _count;
				if (_hour % 2 === 0) {
					_count = _hour;
				} else {
					_count = _hour - 1;
				}
				let _startIndex = _count / 2;
				const _tabs = this.tabs.filter((item, index) => {
					return index >= _startIndex && index <= _startIndex + 4
				})
				if (_tabs.length < 5) {
					let _len = 5 - _tabs.length;
					for (let i = 0; i < _len; i++) {
						_tabs.push(this.tabs[i])
					}
				}
				this.nowTabs = _tabs;
				this.start = this.nowTabs[0].start;
				this.getSeckill();
			},
			// 获取秒杀活动
			getSeckill() {
				let data = {
					start_time: this.start,
					end_time: this.start + 2,
					page: 1,
					size: 5,
					type: 1,
					user_id: global.userInfo && global.userInfo.id || 0,
				}
				this.$api.post(global.apiUrls.postSeckillList, data)
					.then(res => {
						console.log("秒杀", res.data);
						if (res.data.code == 1) {
							this.lists = res.data.data.list;
						} else if (res.code == 0) {
							this.lists = [];
						}
					})
			},
			// 去详情
			navToDetail(item) {
				if (this.curIndex != 0) return;
				this.$urouter.navigateTo({
					url: '/pages/activity/seckill/seckill-detail/index',
					params: {
						goods_id: item.id,
						activity_id: item.activity_id || 0,
						sku_id: item.sku_id,
					}
				})
			},
			tabSelect(index, start) {
				this.curIndex = index;
				this.start = this.nowTabs[index].start;
				this.getSeckill();
			},
			refresh() {
				this.init();
				this.$refs.count.refresh();
			},
			// 发送通知
			handleRemind(item) {
				const {
					goods_id,
					activity_id,
					activity_type,
					sku_id
				} = item;
				this.$util.actionAuth(() => {
					let _notifyTime = (Math.abs(this.start - 1)).toString().padStart(2, '0') + ':57'
					// #ifdef MP-WEIXIN
					uni.requestSubscribeMessage({
						tmplIds: ['x3ljpUAnxYgi-u6iQcaRuP-Z3fVoJ5o22KTDqiNhPMk'],
						complete: () => {
							this.$api.post(global.apiUrls.postSendNotice, {
								goodsId: goods_id,
								pageUrl: `/pages/activity/seckill/seckill-detail?id=${goods_id}&sku_id=${sku_id}&activity_id=${activity_id}`,
								type: 1,
								notifyTime: _notifyTime,
							})
								.then(res => {
									res = res.data;
									console.log('消息通知', res);
									if (res.code == 1) {
										this.$message.info('设置成功,将在开抢前三分钟收到提醒');
										this.getSeckill();
									} else {
										this.$message.info(res.msg);
									}
								})
								.catch(err => {
									this.$message.info('该功能暂未开发');
									console.log(err);
								})
						},
					})
					// #endif
					// #ifdef APP-PLUS
					this.$api.post(global.apiUrls.postSendNotice, {
						goodsId: goods_id,
						pageUrl: `/pages/activity/seckill/seckill-detail?id=${goods_id}&sku_id=${sku_id}&activity_id=${activity_id}`,
						type: 2,
						notifyTime: _notifyTime,
					})
						.then(res => {
							res = res.data;
							console.log('消息通知', res);
							if (res.code == 1) {
								this.$message.info('设置成功,将在开抢前三分钟收到提醒');
								this.getSeckill();
							} else {
								this.$message.info(res.msg);
							}
						})
						.catch(err => {
							this.$message.info('该功能暂未开发');
							console.log(err);
						})

					// #endif
					// #ifdef H5
					this.$message.info('H5不支持推送功能');
					// #endif
				})
			},
			// 取消通知
			handleUnRemind(item) {
				const { goods_id } = item;
				this.$util.actionAuth(() => {
					let _notifyTime = (Math.abs(this.start - 1)).toString().padStart(2, '0') + ':57'
					this.$api.post(global.apiUrls.postCancelNotice, {
						goodsId: goods_id,
						// #ifdef MP-WEIXIN
						type: 1,
						// #endif
						// #ifdef APP-PLUS
						type: 2,
						// #endif
						notifyTime: _notifyTime,
					})
						.then(res => {
							console.log('取消通知', res);
							res = res.data;
							if (res.code == 1) {
								this.$message.info('秒杀提醒已取消,您可能会抢不到哟~');
								this.getSeckill();
							} else {
								this.$message.info(res.msg);
							}
						})
						.catch(err => {
							console.log(err);
						})
				})
			},
		},
		filters: {
    filterPrice(price) {
      return parseFloat(price);
    }
  },
		created() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		background-color: #FFFFFF;
		/* border-radius: 24rpx; */
		padding: 0 32rpx;

		.titles {
			height: 100rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.top-tab {
			display: flex;
			align-items: center;
			.tab-item {
				flex: 1;
				display: flex;
				flex-direction: column;

				/* align-items: center; */
				/* justify-content: center; */
				.number {
					font-size: 30rpx;
					font-weight: bold;
					color: #373737;
					text-align: center;
				}

				.text {
					text-align: center;
					display: inline-block;
					font-size: 20rpx;
					color: #999999;
					border-radius: 20rpx;
					// padding: 10rpx 10rpx 5rpx;
          margin-top: 10rpx;
				}
			}

			.tab-item.current {
				.number {
					color: #F02325;
					font-size: 40rpx;
				}

				.text {
					color: #FFFFFF;
					width: 120rpx;
					height: 32rpx;
					line-height: 32rpx;
					background: linear-gradient(126deg, #F3180E 0%, #FF6530 100%);
          margin-top: 6rpx;
				}
			}
		}

		.list-item {
			overflow: hidden;

			.action {
				// margin-top: 12rpx;
				width: 144rpx;
				min-width: 144rpx;
				height: 52rpx;
				line-height: 52rpx;
				/* background: url('./static/rob.png'); */
				background: linear-gradient(126deg, #FF1450 0%, #FF4517 100%);
				border-radius: 26rpx;
				text-align: center;
				color: #FEF7BA;
				/* background-size: cover;
				background-repeat: no-repeat; */
				display: flex;

				.right {
					text-align: center;
					width: 100%;
				}

				/* .left{
					width: 70rpx;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					font-size: 20rpx;
					color: #B16E05;
				}
				.right{
					flex: 1;
					padding-left: 24rpx;
					font-size: 26rpx;
					color: #FFFFFF;
					font-weight: bold;
					line-height: 66rpx;
					text-align: center;
					.title{
						animation: heart 1s infinite;
					}
				} */
			}

			.btn1 {
				min-width: 144rpx;
				height: 52rpx;
				line-height: 52rpx;
				background: linear-gradient(126deg, #FF1450 0%, #FF4517 100%);
				border-radius: 26rpx;
				text-align: center;
				color: #FEF7BA;
				display: flex;
				align-items: center;
				justify-content: center;
			}

			.btn2 {
				min-width: 144rpx;
				height: 52rpx;
				line-height: 52rpx;
				border-radius: 8rpx;
				background: linear-gradient(126deg, #FF1450 0%, #FF4517 100%);
				border-radius: 26rpx;
				text-align: center;
				color: #FEF7BA;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		// .list-item+.list-item {
		// 	border-top: 1rpx solid rgba(0, 0, 0, .1);
		// }
		.empty-box {
			width: 100%;
			height: 150rpx;
			line-height: 50rpx;
			font-size: 24rpx;
			color: #999999;
			text-align: center;
			font-weight: bold;
			color: rgba(191, 191, 191, 1);
		}
	}

	.block-246 {
		width: 234rpx;
		height: 234rpx;
		min-width: 234rpx;
		min-height: 234rpx;
		background-color: #F8F8F8;
		position: relative;

		image {
			width: 100%;
			height: 100%;
		}

		.tag {
			position: absolute;
			top: 0;
			right: 24rpx;
		}
	}

	.color1 {
		color: $theme;
	}

	.color2 {
		color: #FA9C24;
	}

	@keyframes heart {
		0% {
			font-size: 20rpx;
		}

		50% {
			font-size: 26rpx;
		}

		100% {
			font-size: 20rpx;
		}
	}

	.radius-16 {
		border-radius: 16rpx;
	}

	.nz-img {
		width: 34rpx;
		height: 34rpx;
		margin-right: 22rpx;
	}
	.f-money{
		min-width: 96rpx;
		height: 32rpx;
		background: #FFF2CC;
		border-radius: 6rpx;
		font-size: 24rpx;
		line-height: 32rpx;
		text-align: center;
		margin-left: 12rpx;
		.f{
		color: #fff;
			width: 32rpx;
			height: 32rpx;
			background: #FAAA1E;
			border-radius: 6rpx 0px 0px 6rpx;
		}
		.f-info-money{
			color: #C67403;
			margin:0 10rpx;
		}
	}
</style>
