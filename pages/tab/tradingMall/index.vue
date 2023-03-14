<template>
	<view class="container">
		<view class="bg-white" style="position: absolute;height: 469rpx;width: 750rpx;"></view>
		<image style="width: 100%;  height: 469rpx;position: absolute;z-index: 0;" src='/static/my-background.png'>
		</image>
		<!-- 头部 -->
		<view class="cu-custom" :style="[{ height: CustomBar + 'px',background:'',backgroundSize: '100%'}]">
			<view class="cu-bar fixed" :style="{
	        height: CustomBar + 'px',
	        paddingTop: StatusBar + 'px',
	        background:''
	        ,backgroundSize: '100%'
	      }">
				<!-- 选择当前位置和自取点位置 保留 -->
			</view>
		</view>
		<!-- 搜索条 -->
		<view class="cu-bar search flex algin-center" :style="[{ 'min-height': '80rpx'}]">
			<view style="margin: 0 30upx 0 0upx !important" class="search-form flex justify-between" @tap="navToSearch">
				<view class="flex align-center">
					<text class="cuIcon-search" style="color: #295B7B;"></text>
					<view class="padding-sm placeholderStyle search-text">{{ searchText }}</view>
				</view>
			</view>

      <view v-if="userInfo && userInfo.user_type ===1" @click="toPath('/pages/tab/my/business/index')" class="settle-in" style="height: 64rpx;margin-right: 32rpx;">
      	<image src="/static/newPage/15.png" mode=""></image>
      	<view>我的店铺</view>
      </view>
      <view v-else @click="toPath('/pages/tab/tradingMall/residencyAgreement')" class="settle-in" style="height: 64rpx;margin-right: 32rpx;">
      	<image src="/static/newPage/15.png" mode=""></image>
      	<view>商家入驻</view>
      </view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-wrap">
			<!-- <view class="swiper-bg"></view> -->
			<swiper class="swiper" circular :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000"
				style="width:100%;height: 421rpx;">
				<swiper-item @click="gotoDetail()" v-for="(item,index) in 10" :key="index"
					style="width:100%;height: 421rpx;">
					<view style="width:100%;height: 421rpx;">
						<image src="/static/newPage/1.png" mode=""></image>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 金刚区 -->
		<view class="tab-list">
			<swiper class="tab-swiper" :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
				<swiper-item>
					<view class="swiper-item">
						<view class="tab">
							<view class="tab-item" @click="toPath('/pages/tab/tradingMall/classification')" v-for="(item,index) in CategoryList" :key="index">
								<image :src="item.thumb" mode=""></image>
								<view>{{ item.name }}</view>
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 精选推荐 -->
		<view class="recommend">
			<view class="recommend-title">
				<image src="/static/newPage/16.png" mode="aspectFill"></image>
				<view>精选推荐</view>
			</view>
			<view class="recommend-list">
				<view class="recommend-item" @click="toPath(`/pages/tab/tradingMall/goodDetail?id=${item.id}`)" v-for="(item,index) in list" :key="index">
					<view class="recommend-item-img">
						<image :src="item.thumb" mode="aspectFill"></image>
						<view v-if="item.is_official === 1">官网</view>
					</view>
					<view class="shop-name">{{ item.name }}</view>
					<view class="shop-price">
						<text>￥</text>
						<text>{{ item.shop_price }}</text>
						<text>￥{{ item.market_price }}</text>
					</view>
					<view class="shop-num">
						<text>好评率{{ item.praise_rate }}%</text>
						<text>销量{{ item.sales_sum }}</text>
					</view>
					<view class="go-shop">
						<text>{{ item.shop_name }} 进店</text>
						<image src="/static/newPage/18.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="homePage-kongKimList">
			<view class="homePage-kongKimListItem" @click="clickDing(item,index)"
				:style="[{background:'url('+item.base64url +')'}]" v-for="(item,index) in kongKimList" :key="index">
				<view class="homePage-kongKimListItemLeft">
					<view class="homePage-kongKimListItemLeftTitle">{{item.title}}</view>
					<view class="homePage-kongKimListItemLeftContent">
						{{item.content}}
					</view>
				</view>
				<view class="homePage-kongKimListItemRight">
					<image :src="item.icon" style="width: 80rpx;height: 80rpx;"></image>
				</view>
			</view>
		</view> -->
		<!-- 网络监测 -->
		<fu-notwork></fu-notwork>
	</view>
</template>

<script>
	export default {
		data() {
			return {
        userInfo:null,
				searchText: '搜索你想要的商品',
        list:[],
        CategoryList:[]
			}
		},
    onLoad() {
      const value = uni.getStorageSync('USER_INFO');
      this.userInfo = value
      this.initData()
      this.getCategoryList()
    },
		methods: {
      initData(){
        this.$api.post(global.apiUrls.shop_goods_list).then(res => {
          if (res.data.code === '1') {
            console.log(res.data.data)
           this.list = [...this.list,...res.data.data.data]
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      getCategoryList(){
        this.$api.get(global.apiUrls.shop_get_category_list,{
          max_level:1
        }).then(res => {
          if (res.data.code === '1') {
            this.CategoryList = res.data.data
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
			toPath(url){
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.settle-in {
			width: 100rpx;
			text-align: center;

			image {
				width: 36rpx;
				height: 34rpx;
			}

			view {
				font-size: 12rpx;
				color: #fff;
			}
		}

		.swiper-wrap {
			position: relative;
			width: 750rpx;
			height: 453rpx;
			padding: 32rpx 24rpx 0rpx;

			.swiper-bg {
				height: 200rpx;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
			}
		}

		.tab-list {
			height: 125rpx;
			margin: 32rpx 0;

			.tab-swiper {
				height: 125rpx;

				swiper-item {
					height: 125rpx;

					.swiper-item {
						padding: 0 24rpx;
						height: 125rpx;

						.tab {
							display: flex;
							justify-content: space-between;
							align-items: center;
							height: 125rpx;

							.tab-item {
								text-align: center;

								image {
									width: 80rpx;
									height: 80rpx;
									margin: 0 auto;
								}

								view {
									font-size: 24rpx;
									margin-top: 16rpx;
								}
							}
						}
					}
				}
			}
		}

		.recommend {
			padding: 0 24rpx;

			.recommend-title {
				text-align: center;
				position: relative;

				image {
					width: 256rpx;
					height: 31rpx;
				}

				view {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					line-height: 35rpx;
					font-size: 32rpx;
					color: #36373D;
					font-weight: bold;
				}
			}

			.recommend-list {
				margin-top: 27rpx;
				display: flex;
				justify-content: space-between;
				align-items: flex-start;
				flex-wrap: wrap;

				.recommend-item {
					width: 341rpx;
					padding: 16rpx;
					background: #fff;
					margin-bottom: 20rpx;

					.recommend-item-img {
						position: relative;

						image {
							width: 309rpx;
							height: 229rpx;
							vertical-align: top;
						}

						view {
							width: 62rpx;
							line-height: 32rpx;
							text-align: center;
							background: #F02525;
							color: #fff;
							position: absolute;
							top: 0;
							left: 0;
							font-size: 20rpx;
						}
					}

					.shop-name {
						font-size: 28rpx;
						color: #36373D;
						line-height: 35rpx;
						height: 70rpx;
						margin-top: 16rpx;
						margin-bottom: 14rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						-webkit-line-clamp: 2;
						display: -webkit-box;
						-webkit-box-orient: vertical;
					}

					.shop-price{
						margin-bottom: 22rpx;
						text:nth-child(1){
							font-size: 24rpx;
							color: #F55B29;
							font-weight: bold;
						}
						text:nth-child(2){
							font-size: 32rpx;
							color: #F55B29;
							font-weight: bold;
						}
						text:nth-child(3){
							font-size: 24rpx;
							color: #919191;
							margin-left: 10rpx;
						}
					}

					.shop-num {
						display: flex;
						justify-content: space-between;
						align-items: center;
						margin-bottom: 8rpx;
						text {
							font-size: 20rpx;
							color: #868686;
						}
					}

					.go-shop {
						display: flex;
						justify-content: flex-start;
						align-items: center;

						text {
							font-size: 20rpx;
							color: #868686;
						}
						image{
							width: 24rpx;
							height: 24rpx;
						}
					}
				}
			}
		}
	}
</style>
