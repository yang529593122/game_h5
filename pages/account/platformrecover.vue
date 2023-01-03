<template>
	<view class="saleaccountPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				平台回收
			</view>
		</fu-custom>

		<view class="saleaccountPageSwiper">
			<swiper circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000"
				class="saleaccountPageSwiper">
				<swiper-item class="saleaccountPageSwiper" v-for="(item,index) in swpierList" :key="index">
					<view class="saleaccountPageSwiper">
						<fu-image :src="item.thumb"></fu-image>
						<!-- <image src="/static/logo.png" class="saleaccountPageSwiper"></image> -->
					</view>
				</swiper-item>
			</swiper>
		</view>

		<!-- <view style="width: 400rpx;margin-left: 175rpx;margin-top: 20rpx;"> -->
		<fu-tab :tabs="MoreListGame" @change="changeTab" bottom="0" :current="current" node-key="id" current-key="id"
			:scrollspy="true" size="28" inactive-color="#36373D" active-color="#295B7B"></fu-tab>
		<!-- <fu-tab :tabs="MoreListGame" :current="current" node-key="id" current-key="id" @change="changeTab" scrollspy="true"></fu-tab> -->
		<!-- </view> -->
		<fu-loading v-if="isShowloading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="allGameListLenght === 0"></fu-empty-ui>
			<block v-else>
				<view class="allGramYouxiList">
					<block v-for="(item,index) in allGameList" :key="index">
						<view class="allGramYouxiItem" @click="gotoSaleAccount(it)" v-for="(it,idx) in item.list"
							:key="item.value + idx" :class="index + '' + idx">
							<view class="allGramYouxiItemImg">
								<fu-image radius="24" :src="it.logo"></fu-image>
							</view>
							<view class="allGramYouxiItemText">{{it.game_name}}</view>
						</view>
					</block>
				</view>
				<view class="rightAllselect">
					<view style="width: 36rpx;" class="text-center" v-for="(item,index) in allGameList" :key="index"
						@click="selectCeItem(item,index)">
						<block v-if="item.list.length">{{index}}</block>
					</view>
				</view>
			</block>
		</block>
		<fu-popup v-model="showRules" mode="center">
			<view class="bg-white" style="width: 580rpx;height: 461rpx;border-radius: 8rpx;">
				<view class="flex align-center justify-between" style="height: 125rpx;padding: 0 35rpx;">
					<view></view>
					<view class="text-lg" style="color: #36373D;font-weight: 500;">选择出售方式</view>
					<view class="cuIcon-close" @click="closePopup"></view>
				</view>

				<view class="" style="padding: 0 38rpx;height: 249rpx;">
					<view @click="SelectPlatform" class="flex flex-direction justify-center align-center"
						style="width: 100%;height: 142rpx;background: #659BC7;border-radius: 4px;">
						<view class="text-lg text-white" style="font-weight: 500;">
							平台回收
						</view>

						<view class="text-sm text-white" style="font-weight: 500;color: #B7BAC2;margin-top: 16rpx;">
							回收账号，安保无忧
						</view>
					</view>

					<view @click="SelectPlatformDetail" class="flex flex-direction justify-center align-center"
						style="width: 100%;height: 142rpx;background: #659BC7;border-radius: 4px;margin-top: 24rpx;">
						<view class="text-lg text-white" style="font-weight: 500;">
							平台代售
						</view>

						<view class="text-sm text-white" style="font-weight: 500;color: #B7BAC2;margin-top: 16rpx;">
							代售账号，安保无忧
						</view>
					</view>
				</view>
			</view>
		</fu-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showRules: false,
				current: 2,
				MoreListGame: [{
					name: '手游',
					id: 2
				}, {
					name: '端游',
					id: 1
				}],
				allGameList: [],
				isShowloading: false,
				game_name: '',
				allGameListLenght: 0,
				swpierList: []
			}
		},
		onShow() {
			// this.showRules = true;
			console.log(this.current)
			this.pingtaihuishoulunbotu();
		},
		onLoad() {
			this.gamegamelistmobile(true);
		},
		methods: {
			pingtaihuishoulunbotu() {
				this.$api.post(global.apiUrls.pingtaihuishoulunbotu,{
					type:2
				}).then(res => {
					if (res.data.code == 1) {
						this.swpierList = res.data.data;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamegamelistmobile(status) {
				if (status) {
					this.isShowloading = true;
				}
				this.$api.post(global.apiUrls.gamegamelistmobile, {
					type: this.current,
					game_name: this.game_name,
					is_recycle:1
				}).then(res => {
					if (res.data.code == 1) {
						this.allGameList = res.data.data;
						let allGameListLenght = 0;
						if (res.data.data) {
							for (let i in res.data.data) {
								console.log(i);
								console.log(res.data.data[i].list)
								if (res.data.data[i].list.length) {
									// res.data.data[i].list.forEach(k => {
									// 	allGameListLenght++;
									// })
									allGameListLenght += res.data.data[i].list.length;
									continue;
								}

							}
							this.allGameListLenght = allGameListLenght;
							// console.log(this.allGameListLenght + '33322222222222')
						} else {
							this.allGameListLenght = 0
						}
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowloading = false;
				})
			},
			changeTab(e) {
				console.log(e.id);
				// return;
				this.current = e.id;
				this.gamegamelistmobile(true);
			},
			selectCeItem(item, zimu) {
				if (item.list.length) {
					let query = uni.createSelectorQuery();
					query.select('.' + zimu + '0').boundingClientRect(pos => {
						setTimeout(() => {
							// console.log(res, "滚动高度");
							// this.scrollTop = res.top - res.height;
							uni.pageScrollTo({
								duration: 0,
								// scrollTop: pos.top
								scrollTop: pos.top
							});
						}, 300)
					}).exec()
				}
				// uni
				//   .createSelectorQuery()
				//   .in(this)
				//   .select('.' + item.value + 0)
				//   .boundingClientRect(pos => {
				// 	  console.log(pos)
				//     let posTop = Math.round(pos.top);
				//     if (posTop == 0 && nowScrollTop != 0) return;
				//     uni.pageScrollTo({
				//       duration: 0,
				//       scrollTop: pos.top
				//     });
				//   })
				//   .exec();
			},
			closePopup() {
				this.showRules = false;
			},
			gotoSaleAccount(it) {
				this.$urouter.navigateTo('/pages/makeorder/selectarea/index?type=1&gameId=' + it.game_id);
			},
			SelectPlatform() {

				// #ifdef H5
				window.location.href = 'https://tb.53kf.com/code/client/4e95fe55f5c40933ac8357081c7667c21/1';
				// #endif
			},
			SelectPlatformDetail() {
				this.showRules = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.saleaccountPage {
		min-height: 100vh;
		background: #fff;
	}

	.saleaccountPageSwiper {
		height: 300rpx;
		width: 100%;
	}

	.allGramYouxiList {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		padding: 40rpx 28rpx;

		.allGramYouxiItem {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			width: 160rpx;
			margin-right: 19rpx;
			margin-bottom: 40rpx;

			.allGramYouxiItemImg {
				width: 128rpx;
				height: 128rpx;
			}

			.allGramYouxiItemText {
				width: 128rpx;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
				margin-top: 16rpx;
			}
		}

		.allGramYouxiItem:nth-child(4n) {
			margin-right: 0 !important;
		}
	}

	.rightAllselect {
		position: fixed;
		bottom: 212rpx;
		right: 0;
		width: 36rpx;
		// height: 658rpx;
		background: #F6F6F7;
		color: #36373D;
		font-size: 20rpx;
		border-radius: 12rpx 0px 0px 14rpx;
	}
</style>
