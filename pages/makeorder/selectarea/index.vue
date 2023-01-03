<template>
	<view class="selectAreaPage">

		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				选择区服
			</view>
		</fu-custom>

		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<view style="padding: 16rpx 24rpx 40rpx;" class="flex align-center bg-white">
				<view style="width: 128rpx;height: 128rpx;">
					<fu-image :src="game_logo"></fu-image>
				</view>
				<view style="margin-left: 32rpx;color: #36373D;" class="text-lg text-weight-500">{{game_name}}</view>
			</view>

			<!-- 游戏大区 start -->
			<view class="flex align-center justify-between bg-white" @click="changeshowPopup"
				style="margin-left:24rpx;margin-top:32rpx;width: 702rpx;height: 80rpx;padding: 0 20rpx;border-radius: 4rpx;">
				<view class="text-df" style="color: #36373D;">游戏大区</view>
				<view class="text-df flex algin-center">
					<view style="line-height: 32rpx;" :style="{color:selectGameArea== '请选择' ? '#B7BAC2' : '#333'}">
						{{selectGameArea}}</view>
					<!-- <view style="width: 32rpx;height: 32rpx;"> -->
					<image src="/static/my/arr.png" style="width: 32rpx;height: 32rpx;margin-left: 8rpx;"
						mode="aspectFit"></image>
					<!-- </view> -->
				</view>
			</view>
			<!-- 游戏大区 end -->
			<fu-popup mode="bottom" v-model="showPopup">
				<view class="bg-white">
					<view class="flex align-center justify-between" style="height: 109rpx;padding: 32rpx;">
						<view></view>
						<view class="text-lg text-weight-500" style="color: #36373D;">选择游戏大区</view>
						<view class="cuIcon-close" @click="changeshowPopup"></view>
					</view>
					<picker-view :value="value" @change="bindChange" class="picker-view" indicator-class="slectyansecolor">
						<picker-view-column>
							<view style="width: 750rpx;" class="text-center"
								:class="[index === value[0] ? 'slectyansecolor' : 'noslectyansecolor']"
								v-for="(item,index) in gameList" :key="index">{{item.area_name}}</view>
						</picker-view-column>
					</picker-view>

					<view style="padding:32rpx;" class="flex algin-center justify-between">
						<view class="flex align-center justify-center" style="width: 333rpx;
			height: 88rpx;border-radius: 4rpx;color: #36373D;background: #F8F8F8 ;" @click="changeshowPopup">
							取消
						</view>

						<view class="flex align-center justify-center text-df" style="width: 333rpx;
								 height: 88rpx;border-radius: 4rpx;color: #fff;background: #295B7B;" @click="confirmSelect(1)">
							确认
						</view>
					</view>
				</view>
			</fu-popup>
			<!-- 游戏服务器 start -->
			<view @click="changShowPopupServe" class="flex align-center justify-between bg-white"
				style="margin-left:24rpx;margin-top:32rpx;width: 702rpx;height: 80rpx;padding: 0 20rpx;border-radius: 4rpx;">
				<view class="text-df" style="color: #36373D;">游戏服务器</view>
				<view class="text-df flex algin-center">
					<view style="line-height: 32rpx;" :style="{color:selectGameServer == '请选择' ? '#B7BAC2' : '#333'}">
						{{selectGameServer}}</view>
					<!-- <view style="width: 32rpx;height: 32rpx;"> -->
					<image src="/static/my/arr.png" style="width: 32rpx;height: 32rpx;margin-left: 8rpx;"
						mode="aspectFit"></image>
					<!-- </view> -->
				</view>
			</view>

			<fu-popup mode="bottom" v-model="showPopupserve">
				<view class="bg-white">
					<view class="flex align-center justify-between" style="height: 109rpx;padding: 32rpx;">
						<view></view>
						<view class="text-lg text-weight-500" style="color: #36373D;">选择服务器</view>
						<view class="cuIcon-close" @click="changeshowPopup"></view>
					</view>
					<picker-view :value="servevalue" @change="bindChanges" class="picker-view">
						<picker-view-column>
							<view style="width: 750rpx;" class="text-center"
								:style="[{color:index == servevalue[0] ? '#659BC7' : '#868686'}]"
								v-for="(item,index) in gameServer" :key="index">{{item.service_name}}</view>
						</picker-view-column>
					</picker-view>

					<view style="padding:32rpx;" class="flex algin-center justify-between">
						<view class="flex align-center justify-center" style="width: 333rpx;
					height: 88rpx;border-radius: 4rpx;color: #36373D;background: #F8F8F8 ;" @click="changShowPopupServe">
							取消
						</view>

						<view class="flex align-center justify-center text-df" style="width: 333rpx;
										 height: 88rpx;border-radius: 4rpx;color: #fff;background: #295B7B;" @click="confirmSelect(2)">
							确认
						</view>
					</view>
				</view>
			</fu-popup>
			<!-- 游戏服务器 end -->

			<button type="default" @click="comfirmPay" class="onlinePayBottomBtn"
				:loading="confirmPayLoading">下一步</button>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				confirmPayLoading: false,
				showPopup: false,
				showPopupserve: false,
				isShowLoading: false,
				value: [0],
				servevalue: [0],
				gameList: [],
				gameServer: [],
				selectGameArea: '请选择',
				selectGameServer: '请选择',
				type: '1', //1平台回收 2平台代售卖
				gameId: '',
				game_name: '',
				game_logo: '',
				selectGameAreaId:'',//选择大区的id
				selectGameServerId:'',//服务器id
				goodsInfo:{},
			}
		},
		onLoad(options) {
			this.type = options.type;
			this.gameId = options.gameId;
			this.selectGameArea = '请选择';
			this.selectGameServer = '请选择';
			this.value = [0];
			this.servevalue = [0];
			this.gamegameinfo();
		},
		methods: {
			gamegamearealist() {
				this.$api.post(global.apiUrls.gamegamearealist, {
					game_id: this.gameId
				}).then(res => {
					if (res.data.code == 1) {
						this.gameList = res.data.data;
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
			gamegameinfo() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gamegameinfo, {
					game_id: this.gameId
				}).then(res => {
					if (res.data.code == 1) {
						this.game_name = res.data.data.game_name;
						this.game_logo = res.data.data.logo;
						this.gamegamearealist();
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
			changeshowPopup() {
				if(!this.gameList.length) {
					return this.$message.info('暂无可选的游戏大区')
				}
				this.showPopup = !this.showPopup;
			},
			changShowPopupServe() {
				
				if (this.selectGameArea == '请选择') {
					return this.$message.info('请选择游戏大区')
				}
				if(!this.gameServer.length) {
					return this.$message.info('暂无可选的游戏服务器')
				}
				this.showPopupserve = !this.showPopupserve;
			},
			bindChange(e) {
				// this.value[0] = e.detail.value[0];
				this.$set(this.value,0,e.detail.value[0])
				console.log(e.detail.value[0])
			},

			bindChanges(e) {
				// this.servevalue[0] = e.detail.value[0];
				this.$set(this.servevalue,0,e.detail.value[0])
				console.log(e.detail.value[0])
			},
			// 确定选择
			confirmSelect(idx) {
				switch (idx) {
					case 1:
						this.selectGameArea = this.gameList[this.value[0]].area_name;
						this.selectGameAreaId = this.gameList[this.value[0]].area_id;
						this.gamegameareaservicelist();
						this.changeshowPopup();
						break;
					case 2:
						this.selectGameServer = this.gameServer[this.servevalue[0]].service_name;
						this.selectGameServerId = this.gameServer[this.servevalue[0]].service_id;
						this.changShowPopupServe();
						break;
				}
			},
			gamegameareaservicelist() {
					this.$api.post(global.apiUrls.gamegameareaservicelist,{
						area_id:this.selectGameAreaId
					}).then(res => {
						if(res.data.code == 1) {
							this.gameServer= res.data.data;
						} else {
							this.$message.info(res.data.msg);
						}
					})
			},
			comfirmPay() {
				if (this.selectGameArea == '请选择') {
					return this.$message.info('请选择游戏大区')
				}
				// if (this.selectGameServer == '请选择') {
				// 	return this.$message.info('请选择服务器')
				// }
				this.goodsInfo = {
					game_id:this.gameId,
					game_name:this.game_name,
					game_logo:this.game_logo,
					area_name:this.selectGameArea,
					area_id:this.selectGameAreaId,
					service_name:this.selectGameServer == '请选择' ? '' : this.selectGameServer,
					service_id:this.selectGameServerId === '' ? '' : this.selectGameServerId
				}
				// console.log(this.goodsInfo);
				// return;
				this.confirmPayLoading = true;
				setTimeout(() => {
					this.$urouter.navigateTo('/pages/makeorder/publishgoods/index?type=' + this.type +'&goodsInfo=' + JSON.stringify(this.goodsInfo));
					this.confirmPayLoading = false;
					// this.selectGameArea = '请选择';
					// this.selectGameServer = '请选择';
					// this.value = [0];
					// this.servevalue = [0];
				}, 700)
			},
		}
	}
</script>

<style scoped lang="scss">
	/deep/ .slectyansecolor {
		color: #659BC7;
	}
	
	/deep/ .noslectyansecolor {
		color: #868686;
	}
	.onlinePayBottomBtn {
		position: fixed;
		bottom: 40rpx;
		left: 32rpx;
		width: 686rpx;
		height: 88rpx;
		line-height: 88rpx;
		text-align: center;
		background: #295B7B;
		border-radius: 0;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
	}

	.picker-view {
		height: 400rpx;
	}
</style>
