/*
* @Author: PengFei Yang
* @Date: 2023-02-28 14:15:06
* @Description: 近期成交=>
*/
<template>
	<view class="zuijinPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				近期成交
			</view>
		</fu-custom>
		<view class="MoreGram">
			<fu-tab :tabs="MoreListGame" :current="current" node-title="game_name" node-key="game_id" current-key="game_id" @change="changeTab"></fu-tab>
		</view>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="!lists.length"></fu-empty-ui>
			<block v-else>
				<view style="height: 24rpx;"></view>
          <view class="makeorderPageList">
          	<view class="makeorderPageListItem" @click="gotoZuijinchengjiaoDetail(item.id)" v-for="(item,index) in lists" :key="index">
          		<view class="makeorderPageListItemOrder">
          			<view class="makeorderPageListItemOrderLeft">
          				<view class="makeorderPageListItemOrderLeftImg">
          					<fu-image :src="item.cover_images[0]"></fu-image>
          				</view>
          				<view class="makeorderPageListItemOrderLeftImgMask">
          					<image src="../static/make.png" class="makeorderPageListItemOrderLeftImgMaskCenter"></image>
          				</view>
          			</view>
          			<view class="makeorderPageListItemOrderRight">
          				<view class="makeorderPageListItemOrderRightTitle">
          					<text v-if="item.is_bao == 1">[包赔]</text>
          					 <text>{{item.goods_name}}</text></view>
          				<view class="makeorderPageListItemOrderRightArea">区服：{{item.area_name}}</view>
          				<view class="makeorderPageListItemOrderRightmakePrice">
          					<text>成交价￥{{item.transaction_price}}</text>
          					<text style="margin-left: 30rpx;">售价￥{{item.price}}</text>
          				</view>

          				<view class="makeorderPageListItemOrderRightTime">成交日期：{{item.fixture_date}}</view>
          			</view>
          		</view>
          	</view>
            </view>

				<!-- <fu-waterfall v-model="lists">
				  <template v-slot:left="{ leftList }">
				    <block v-for="(item, index) in leftList" :key="item.id"><fu-goods-simple :info="item"></fu-goods-simple></block>
				  </template>
				  <template v-slot:right="{ rightList }">
				    <block v-for="(item, index) in rightList" :key="item.id"><fu-goods-simple :info="item"></fu-goods-simple></block>
				  </template>
				</fu-waterfall> -->
			</block>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				MoreListGame:[],
				current:0,
				isShowLoading:false,
				currentPages:1,
				totalPages:1,
				lists:[]
			}
		},
		onLoad() {
				this.gamenearlydepreciategamelist();
		},
		onReachBottom(e) {
			if(this.currentPages < this.totalPages) {
				this.currentPages++;
				this.gamenearlydepreciatelist(false);
			}
		},
		methods:{
      gotoZuijinchengjiaoDetail(id) {
      		 this.$urouter.navigateTo("/pages/goods/goodsdetail/goods-detail/index?goods_id=" + id);
      },
			changeTab(e) {
				this.current = e.game_id;
				this.lists = [];
				this.currentPages = 1;
				this.totalPages = 1;
				this.gamenearlydepreciatelist(true);
			},
			gamenearlydepreciategamelist() {
				this.$api.post(global.apiUrls.gamenearlydepreciategamelist).then(res => {
					if(res.data.code == 1) {
						this.MoreListGame = [{
							game_name:'全部',
							game_id:0
						},...res.data.data] || [{
							game_name:'全部',
							game_id:0
						}];
						this.current = 0;
						this.lists = [];
						this.currentPages = 1;
						this.totalPages = 1;
						this.gamenearlydepreciatelist(true);
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gamenearlydepreciatelist(status) {
				if(status) {
					this.isShowLoading = true;
				}
				this.$api.post(global.apiUrls.gamenearlydepreciatelist,{
					game_id:this.current,
					page:this.currentPages,
					list_rows:15
				}).then(res => {
					if(res.data.code == 1) {
						this.totalPages = res.data.data.last_page || 1;
						this.lists = [...this.lists,...res.data.data.data]
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
		}
	}
</script>
<style lang="scss" scope>
	.makeorderPage {
		min-height: 100vh;
		background: #fff;
	}

	.makeorderPageList {
		.makeorderPageListItem {
			padding: 24rpx 24rpx 0;
			.makeorderPageListItemOrder {
				width: 702rpx;
				padding: 16rpx;
				background: #f8f8f8;
				display: flex;
				align-items: center;
				// height: 150rpx;
				.makeorderPageListItemOrderLeft {
					width: 204rpx;
					// height: 100%;
					height: 152rpx;
					position: relative;
					.makeorderPageListItemOrderLeftImg {
						position: absolute;
						top: 0;
						left: 0;
						width: 204rpx;
						// height: 100%;
						height: 152rpx;
						// width: 128rpx;
						// height: 128rpx;

					}

					.makeorderPageListItemOrderLeftImgMask {
						position: absolute;
						top: 0;
						left: 0;
						width: 204rpx;
						height: 152rpx;
						background: rgba(0, 0, 0, .8);

						.makeorderPageListItemOrderLeftImgMaskCenter {
							position: absolute;
							// width: 50rpx;
							// height: 50rpx;
							left: 50%;
							top: 50%;
							width: 128rpx;
							height: 128rpx;
							transform: translate(-50%,-50%);
						}
					}
				}



				.makeorderPageListItemOrderRight {
					flex: 1;
					margin-left: 16rpx;
					.makeorderPageListItemOrderRightTitle {
						width: 450rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						font-size: 28rpx;
					}

					.makeorderPageListItemOrderRightArea {
						margin-top: 6rpx;
						color: #868686;
						font-size: 20rpx;

					}

					.makeorderPageListItemOrderRightmakePrice {
						margin-top: 6rpx;
						color: #868686;
						font-size: 20rpx;
					}

					.makeorderPageListItemOrderRightTime {
						margin-top: 6rpx;
						color: #868686;
						font-size: 20rpx;
					}
				}
			}
		}
	}
</style>
