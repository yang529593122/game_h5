<template>
	<view class="content">
    <view class="" v-if="!details">

    </view>
    <block v-else>

		<view class="examine-status">
			<view class="status-one">
        <!-- ：-1=未申请；0=待审核；1.已通过；2.已拒绝 -->
				<view class="examine-text" v-if="details.status === 0">待审核</view>
        <view class="examine-text" v-if="details.status === 1">已通过</view>
        <view class="examine-text" v-if="details.status === 2">已拒绝</view>
				<view class="btns" v-if="details.status === 1" @click="goShopDetails">查看店铺</view>
        <view class="btns" v-if="details.status === 2" @click="subnew">重新提交</view>
			</view>
		</view>
		<view class="user-info">
			<view class="user-tips">个人信息</view>
			<view class="item-list">
				<view class="user-item">
					<view class="item-tips">联系人姓名</view>
					<view class="item-text">{{ details.name }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">联系人手机</view>
					<view class="item-text">{{ details.mobile }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">联系人身份证</view>
					<view class="item-text">{{ details.idcard_no }}</view>
				</view>
				<view class="card-img">
					<image :src="details.idcard_front" mode="aspectFill"></image>
					<view class="img-text">身份证正面</view>
				</view>
				<view class="card-img">
					<image :src="details.idcard_reverse" mode="aspectFill"></image>
					<view class="img-text">身份证反面</view>
				</view>
			</view>
			<view class="user-tips">银行信息</view>
			<view class="item-list">
				<view class="user-item">
					<view class="item-tips">结算账户</view>
					<view class="item-text">{{ details.bank_account }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">结算开户行</view>
					<view class="item-text">{{ details.opening }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">姓名</view>
					<view class="item-text">{{ details.true_name }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">结算开户银行支行名称</view>
					<view class="item-text">{{ details.subbranch }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">结算开户银行所在地</view>
					<view class="item-text">{{ details.bank_address }}</view>
				</view>
			</view>
			<view class="user-tips">店铺信息</view>
			<view class="item-list">
				<view class="user-item">
					<view class="item-tips">店铺名称</view>
					<view class="item-text">{{  details.shop_name }}</view>
				</view>
				<view class="user-item">
					<view class="item-tips">店铺logo</view>
					<image :src="details.shop_logo" mode="aspectFill"></image>
				</view>
			</view>

		</view>
    </block>
  </view>
</template>

<script>
  export default {
    data(){
      return {
        details:null,
      }
    },
    onLoad() {
      this.init()
    },
    methods:{
      async init(){
        const data = await this.$api.post(global.apiUrls.shop_apply_status)
         const result = data.data
         if (result.code == 1) {
           console.log(result.data)
           this.details = result.data
         } else {
           this.$message.info(result.msg);
         }
      },
      goShopDetails(){
        uni.navigateTo({
        	url:'/pages/tab/my/business/index'
        })
      },
      subnew(){
        uni.navigateTo({
        	url:'/pages/tab/tradingMall/authenticationInfo?id='+this.details.id
        })

      },

    }
  }
</script>

<style lang="scss">
	.content{

		.examine-status {
			background: #fff;
			padding: 32rpx 0;
			.status-one {
				width: 686rpx;
				height: 221rpx;
				margin: 0 auto;
				box-shadow: 0px 3px 12px rgba(0,0,0,0.04);
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				.examine-text {
					color: #295B7B;
					font-size: 32rpx;
				}
				.btns {
					width: 200rpx;
					line-height: 64rpx;
					background: #295B7B;
					color: #fff;
					font-size: 28rpx;
					text-align: center;
					margin-top: 32rpx;
				}
			}
		}
		.user-info {

			.user-tips {
				padding: 20rpx 32rpx;
			}
			.item-list {
				padding: 0 32rpx;
				background: #fff;
				.user-item {
					padding:32rpx 0;
					display: flex;
					justify-content: space-between;
					align-items: center;
					border-bottom: 1rpx solid #eee;
					view{
						font-size: 32rpx;
					}
					image{
						width: 160rpx;
						height: 160rpx;
					}
				}
				.card-img {
					display: flex;
					justify-content: center;
					flex-direction: column;
					align-items: center;
					padding: 52rpx 0;
					image{
						width: 686rpx;
						height: 420rpx;
					}
					view {
						font-size: 32rpx;
						margin-top: 24rpx;
					}
				}
				.card-img:last-child{
					padding-top: 0;
				}
			}
		}
	}
</style>
