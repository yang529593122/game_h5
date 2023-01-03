<template>
	<view class="wrap" v-if="lists.length > 0">
		<view v-if="showTitle" class="title  text-bold text-center flex justify-center align-center">
			<!-- <image :src="require('./static/l.png')" mode="aspectFit"></image> -->
			{{titleNone}}
			<!-- <image :src="require('./static/r.png')" mode="aspectFit"></image> -->
		</view>
		<fu-waterfall v-model="lists">
			<template v-slot:left="{leftList}">
				<block v-for="(item,index) in leftList" :key="item.id">
					<FuGoodsBlock :info="item"></FuGoodsBlock>
				</block>
			</template>
			<template v-slot:right="{rightList}">
				<block v-for="(item,index) in rightList" :key="item.id">
					<FuGoodsBlock :info="item"></FuGoodsBlock>
				</block>
			</template>
		</fu-waterfall>
		<uni-load-more :status="status" v-if="lists.length > 5"></uni-load-more>
	</view>
</template>

<script>
	/**
	 * @description
	 * @param {String} type = index: 首页推荐 userCenter: 个人中心 cart: 购物车 goodsDetail: 商品详情 orderDetail: 订单详情
	   * @property {Boolean} showTitle - 是否显示title
	 * */
	import FuGoodsBlock from '../fu-goods-block3/fu-goods-block.vue'  
	import FuWaterfall from '../fu-waterfall3/fu-waterfall.vue';
	export default {
		components: {
			FuWaterfall,
			FuGoodsBlock
		},
		props: {
			num: {
				type: Number,
				default: 10
			},
			titleNone: {
				type: String,
				default: '为你推荐'
			},
			type: {
				type: String,
				default: 'index'
			},
			showTitle: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				lists: [],
				status: 'more',
				page: 1,
				size: 10,
			};
		},
		methods: {
			loadData() {
				if (this.status != 'more') return;
				this.status = 'loading';
				this.$api.post(global.apiUrls.postRecommentGoods, {
					businessSign: this.type,
					page: this.page,
					list_rows: this.num || this.size,
				})
					.then(res => {
						console.log("推荐商品", res);
						if (res.data.code == 1) {
              let total = res.data.data.total;
              let list = res.data.data.goods_list;
							if (this.page == 1) this.lists = [];
							this.lists.push(...list);
							if (this.lists.length >= total) {
								this.status = 'noMore';
							} else {
								this.status = 'more';
								this.page++;
							}
							uni.stopPullDownRefresh();
						} else {
							this.status = 'more';
							uni.stopPullDownRefresh();
						}
					})
					.catch(err => {
						console.log("获取推荐列表 ERROR => ", err);
						this.status = 'more';
						uni.stopPullDownRefresh();
					})
			},
			refresh() {
				this.page = 1;
				this.status = 'more';
				this.loadData();
			}
		},
	}
</script>

<style lang="scss" scoped>
	.wrap {
		width: 100%;
		.title {
			height: 120rpx;
			line-height: 120rpx;
			font-size: 40rpx;
			image {
				width: 48rpx;
				height: 32rpx;
				margin: 0 24rpx;
			}
		}
		.content {
			padding: 0 20rpx;
		}
	}
</style>
