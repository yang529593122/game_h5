<template>
	<view class="saleaccountPage">
		<view class="saleaccountPageInput" @click="navToSearch" :style="{marginTop:StatusBar+'px'}">
			<view class="cuIcon-search"></view>
			<input class="saleaccountPageInputIn" disabled="true" placeholder="搜索游戏名称／商品编号" placeholder-style="font-size: 28rpx;font-weight: 500;color: #868686;"/>
		</view>

		<view class="MoreGram">
			<fu-tab :tabs="BUY_NAV_DATAS" :current="current" node-key="id" current-key="id" @change="changeTab"></fu-tab>
		</view>
		<fu-loading v-if="isShowloading"></fu-loading>
		<block v-else>
			<fu-empty-ui v-if="allGameListLenght === 0"></fu-empty-ui>
			<block v-else>
				<view class="allGramYouxiList">
					<block v-for="(item,index) in allGameList" :key="index">
						<view class="allGramYouxiItem" @click="gotoDetail(it)" v-for="(it,idx) in item.list" :key="item.value + idx" :class="index + '' + idx">
							<view class="allGramYouxiItemImg">
								<fu-image radius="24" :src="it.logo"></fu-image>
							</view>
							<view class="allGramYouxiItemText">{{it.game_name}}</view>
						</view>
					</block>
				</view>
				<view class="rightAllselect">
					<view style="width: 36rpx;" class="text-center" v-for="(item,index) in allGameList" :key="index" @click="selectCeItem(item,index)">
						<block v-if="item.list.length">
                <block v-if='index ===HOT_GAME '>
                  {{ HOT_GAME_TEXT }}
                </block>
                <block v-else>{{ index }}</block>
            </block>
					</view>
				</view>
			</block>
		</block>
	</view>
</template>

<script>
  import { HOT_GAME,BUY_NAV_DATAS,HOT_GAME_TEXT } from "../../../common/constStatic.js"

	export default {
		data() {
			return {
        HOT_GAME,  // 热门标识
				BUY_NAV_DATAS, // 导航
        HOT_GAME_TEXT,
				current:0,
				allGameList:[],
				isShowloading:false,
				game_name:'',
				allGameListLenght:0
			}
		},
		onLoad() {
			this.gamegamelistmobile(true);
		},
		onShow() {
		},
		methods: {

			gamegamelistmobile(status) {
				if(status) {
					this.isShowloading = true;
				}
				this.$api.post(global.apiUrls.gamegamelistmobile,{
					type:this.current,
					game_name:this.game_name,
				}).then(res => {
					if(res.data.code == 1) {
						this.allGameList = res.data.data;
						let allGameListLenght = 0;
						if(res.data.data) {
							for(let i in res.data.data) {
								if(res.data.data[i].list.length) {
									allGameListLenght+=res.data.data[i].list.length;
									continue;
								}

							}
							this.allGameListLenght = allGameListLenght;
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
				console.log(e.index);
				this.current = e.index;
				this.gamegamelistmobile(true);
			},
			navToSearch() {
			  this.$urouter.navigateTo(
			    "/pages/index/search/search/index"
			  );
			},
			gotoDetail(it) {
				this.$urouter.navigateTo('/pages/index/search/search-list/index?gameId=' + it.game_id);
			},
			selectCeItem(item,zimu) {
				if(item.list.length) {
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
				return;
			}
		}
	}
</script>

<style lang="scss" scoped>

	.saleaccountPageInput {
		width: 702rpx;
		height: 64rpx;
		margin-left: 32rpx;
		background: #F8F8F8;
		border-radius: 4rpx;
		display: flex;
		padding: 0 20rpx;
		align-items: center;

		.saleaccountPageInputIn {
			height: 64rpx;
			line-height: 64rpx;
			width: 100%;
			margin-left: 15rpx;
		}
	}

	.saleaccountPage {
		min-height:100vh;
		background:#FFF;
	}

	.MoreGram {
		height: 100rpx;
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
			margin-right: 0!important;
		}
	}
</style>
