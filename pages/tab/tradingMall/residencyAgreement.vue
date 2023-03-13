<template>
	<view class="content">
		<view class="agreement">
			<rich-text :nodes="content"></rich-text>
		</view>
		<view class="agreement-select">
			<view class="agreement-tips">
				<image v-if="!status" src="/static/newPage/19.png" mode="aspectFill" @click="changStatus"></image>
        <image v-else src="/static/newPage/12.png" mode="aspectFill" @click="changStatus"></image>
				<text>我已阅读并同意以上协议</text>
			</view>
			<view class="btns" @click="toPath('/pages/tab/tradingMall/authenticationInfo')"> 我已阅读并同意该协议</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				content:'',
        status: true
			}
		},
    onLoad() {
      this.init()
    },
		methods:{
      async init(){
        const data = await this.$api.post(global.apiUrls.operation_get_column,{
          category_id:30,
         })
         const result = data.data
         if (result.code == 1) {
           this.content = result.data.content
         } else {
           this.$message.info(result.msg);
         }
      },
      changStatus(){
        this.status = !this.status
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

	.content{
		.agreement {
			padding: 32rpx;
		}
		.agreement-select {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			background: #F8F8F8;
			padding: 32rpx 0;

			.agreement-tips {
				text-align: center;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-bottom: 40rpx;
				image {
					width: 24rpx;
					height: 24rpx;
					margin-right: 10rpx;
				}
				text{
					font-size: 24rpx;
					color: #5C707E;
				}
			}

			.btns {
				width: 686rpx;
				line-height: 88rpx;
				background-color: #295B7B;
				color: #fff;
				text-align: center;
				margin: 0 auto;
				font-size: 28rpx;
			}
		}
	}

</style>
