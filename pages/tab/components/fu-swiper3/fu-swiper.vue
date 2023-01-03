<template>
  <swiper class="swiper-box"  :circular="true"
   :autoplay="true" interval="5000" duration="500" @change="swiperChange" previous-margin="36rpx" next-margin="36rpx">
  	<swiper-item v-for="(item,index) in lists" :key="index" @click="navTo(item.href)">
  		<image :src="item.thumb" mode="aspectFill" class="swiper-img" :class="{ 'active': current == index }"></image>
  	</swiper-item>
  </swiper>
</template>

<script>
	export default {
		data() {
			return {
				cardCur: 0,
				dotStyle: false,
				current:0
			}
		},
		props: {
			lists: {
				type: Array,
				default () {
					return []
				},
			}
		},
		methods: {
			navTo(path) {
				if (path) {
					this.$urouter.navigateTo(path);
				}
			},
			swiperChange(e){
				// this.current = e.detail.current;
				// let rgb = this.lists[e.detail.current].rgb;
				// if(rgb){
				// 	this.$emit('change',rgb);
				// }
			}
		}
	}
</script>

<style lang="scss">
	.swiper-box {
		overflow: hidden;
		border-radius: 16rpx;
		height: 314rpx;
		/* 兼容IOS，否则在swiper组件内的布局都不受border-radius和overflow的约束 */
		transform: translateY(0);
	}

	.swiper-img {
		width: 100%;
		height: 100%;
		overflow: hidden;
		border-radius: 16rpx;
		/* 兼容IOS，否则在swiper组件内的布局都不受border-radius和overflow的约束 */

    transform: translateY(0) scale(0.95);
    transition: transform 0.3s ease-in-out 0s;
    border-radius: 16rpx;

    &.active {
      transform: scale(1);
    }
	}
  .screen-swiper{
    min-height: initial;
    height: 100%;
    border-radius: 16rpx;
    overflow: hidden;
    /* 兼容IOS，否则在swiper组件内的布局都不受border-radius和overflow的约束 */
    transform: translateY(0);
  }

</style>
