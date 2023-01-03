<template>
	<view class="makeorderPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				近期成交
			</view>
		</fu-custom>
		
		<view class="makeorderPageList">
			<view class="makeorderPageListItem" @click="gotoZuijinchengjiaoDetail(item.id)" v-for="(item,index) in listData" :key="index">
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
			<fu-empty
			    :pagingListLoadedAll="pagingListLoadedAll"
			    :pagingListNoListData="pagingListNoListData"
			    :listDataLength="listDataLength"
			  ></fu-empty>
		</view>
	</view>
</template>

<script>
	import pagingList from '@/common/mixin/paging_list.js';
	export default {
		mixins:[pagingList],
		data() {
			return {
				 minixPagingListsApi: global.apiUrls.gamenearlytransactiongoodslist,
				allowOnloadGetList: false,
			}
		},
		onLoad(options) {
			this.pagingListToggle();
		},
		methods:{
			gotoZuijinchengjiaoDetail(id) {
					 this.$urouter.navigateTo("/pages/goods/goodsdetail/goods-detail/index?goods_id=" + id);
			},
		},
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
					display: flex;
					flex-direction: column;
					justify-content: center;
					// align-items: center;
					height: 150rpx;
					// flex: 1;
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