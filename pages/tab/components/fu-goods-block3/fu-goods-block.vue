<template>
  <view class="wrapper" @tap.stop="navToDetail(info)">
    <view class="wrap-box">
      <view class="square-wrap">
        <view class="square-box">
          <image :src="info.thumb" mode="aspectFill" lazy-load></image>
        </view>
      </view>
      <view class="content">
        <view class="text-df text-333 text-cut-2" >
          <block v-if='info.goods_label'>
            <text  class="item-goods-label" v-for='(item,index) in info.goods_label' :key="index">
              {{ item }}
            </text>
          </block>
          {{ info.name }}
        </view>
        <view class="margin-top-xs">
          <view class="text-bold text-333 flex">
            <view>
              <text class="text-price text-sm text-red"></text>
              <text class="text-lg text-red">{{ info | filterGoodsPrice }}</text>
            </view>
            <!-- <text v-if="info.discounts && Number(info.discounts)">
              <text class="margin-lr-xs">/</text>
              <text class="text-sm text-theme">返{{info.discounts}}</text>
            </text> -->
            <view class=" flex f-money" v-if="info.discounts && Number(info.discounts)">
              <view class="f">返</view>
              <view class="text-bold f-info-money">{{info.discounts | filterPrice}}元</view>
            </view>
          </view>
        </view>
        <view class="flex justify-between align-center text-sm text-999 margin-top-sm">
          <text class="text-price text-through">{{ info.market_price }}</text>
          <text>月销量{{ info.sales_sum  | formatNumber('万')}}</text>
        </view>
      </view>
      <view class="bottom-share " v-if="Number(info.share_award_money)">
        <view class="bottom">
        	<image style="width: 20rpx;height: 20rpx;margin-right: 10rpx;" :src="require('./static/share3.png')" mode="aspectFill"
        	 lazy-load></image>
        	<view class="flex align-center justify-center text-df">

            <text class="before text-df "  >分享</text>
        		<view class="animate-box text-df">
        			赚
        			<text class="before text-df" :style="{'animation-delay': index*0.25 + 's'}">赚</text>
        			<text class="after text-df" :style="{'animation-delay': index*0.25 + 's'}">赚</text>
        		</view>
        		￥{{info.share_award_money}}
        	</view>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <button class="share-btn" open-type="share" :data-info="info" @click.stop></button>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script>
/**
 * @author 刘畅
 * @description 商品双列布局
 * @param {Object} info - 商品信息
 */
  export default {
    props: {
      info: {
        type: Object
      },
      index: {
      	type: Number,
      	default: 0,
      }
    },
    filters: {
    filterPrice(price) {
      return parseFloat(price);
    }
  },
    methods: {
      /**
       * @event
       * @description 跳转到商品详情
       * @param {Object} item - 商品信息
       */
      navToDetail(item) {
        this.$urouter.navigateTo({
          url: '/pages/goods/goodsdetail/goods-detail/index',
          params: {
            sku_id: item.sku_id || 0,
            goods_id: item.id,
          }
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .wrapper {
    overflow: hidden;
    margin-bottom: 20rpx;
    padding: 0 10rpx;
    .wrap-box {
      background-color: #FFFFFF;
      border-radius: 24rpx;
      .square-wrap {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        box-sizing: border-box;
        position: relative;

        .square-box {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          border-radius: 24rpx 24rpx 0 0;

          image {
            width: 100%;
            height: 100%;
            border-radius: 24rpx 24rpx 0 0;
          }
        }

      }
      .image{
        width: 100%;
        border-radius: 24rpx 24rpx 0 0;
      }
    }

    .content {
      padding: 20rpx;
    }
    .bottom {
    	margin: 0 20rpx;
    	height: 64rpx;
    	/* background-image: url('./static/fire.png'); */
    	/* background-size: cover; */
    	font-weight: bold;
    	font-size: 22rpx;
    	color: #FEECBA;
    	line-height: 64rpx;
    	text-align: center;
    	display: flex;
    	align-items: center;
    	justify-content: center;
    	overflow: hidden;

    	&>image {
    		width: 24rpx;
    		height: 24rpx;
    		min-width: 24rpx;
    		min-height: 24rpx;
    	}

    	.animate-box {
    		display: inline-block;
    		position: relative;
    		color: rgba(255, 255, 255, 0);

    		.before {
    			position: absolute;
    			top: 0;
    			left: 0;
    			color: #FEECBA;
    			animation: animateTop 2s ease-in-out infinite;
    		}

    		.after {
    			position: absolute;
    			top: 64rpx;
    			left: 0;
    			color: #FEECBA;
    			animation: animateBot 2s ease-in-out infinite;
    		}
    	}
    }
  }

  .item-goods-label {
    background-color: $theme;
    padding: 2rpx 8rpx;
    color: #ffffff;
    font-size: 24rpx;
    border-radius: 6rpx;
    margin-right: 9rpx;
  }
  .item-activity-label {
    padding: 2rpx 5rpx;
    /* margin: 5rpx; */
    font-size: 24rpx;
    border-radius: 6rpx;
    border: 1px solid;
    margin: 0rpx 1px 0px;
    display: inline-block;
    transform:scale(.8)
  }
  .bottom-share{
    position: relative;
    height: 64rpx;
    background: linear-gradient(117deg, #FA545A 0%, #FA2428 100%);
    border-radius: 0px 0px 16rpx 16rpx;
    .share-btn{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0;

    }
  }

  @keyframes animateTop {
  	0% {
  		top: 0rpx
  	}

  	75% {
  		top: 0rpx
  	}

  	100% {
  		top: -64rpx
  	}
  }

  @keyframes animateBot {
  	0% {
  		top: 64rpx
  	}

  	75% {
  		top: 64rpx
  	}

  	100% {
  		top: 0px
  	}
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
