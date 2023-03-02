<template>
	<view class="myStatusDetailPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				我的估价
			</view>
			<view slot="right" @click="gotoEditGu" v-if="evaluate_status === 0">
				修改信息
			</view>
		</fu-custom>
		<!--  -->
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<!-- 状态 -->

			<view class="statusacross" style="background: #F4F5F6;" v-if="status === 2">
				<view class="statusacrossImg">
					<image src="../static/2.png"></image>
				</view>
				<view class="statusacrossStatus" style="color: #B7BAC2;">草稿</view>
				<!-- <view class="statusacrossRelative">请等待客服联系您</view> -->
			</view>
      <block v-else>
        <!-- 评估中 -->

        <view class="statusacross" style="background: #F4F5F6;" v-if="evaluate_status === 0">
        	<view class="statusacrossImg">
        		<image src="../static/2.png"></image>
        	</view>
        	<view class="statusacrossStatus" style="color: #B7BAC2;">评估中</view>
        	<!-- <view class="statusacrossRelative">请等待客服联系您</view> -->
        </view>

        <!-- 已评估-->
        <view class="statusacross" style="background: #E4ECF5;" v-else>
        	<view class="statusacrossImg">
        		<image src="../static/xz.png"></image>
        	</view>
        	<view class="statusacrossStatus" style="color: #659BC7;">已评估</view>
        	<!-- <view class="statusacrossRelative" style="color: #E8625B;">您的账号不不存在，请重新修改</view> -->
        </view>
      </block>


			<!-- 游戏 -->
			<!-- <view class="myStatusDetailPageGoods">
				<view class="myStatusDetailPageGoodsImg">
					<fu-image></fu-image>
				</view>
				<view class="myStatusDetailPageGoodsRight">
					<view class="text-cut myStatusDetailPageGoodsRightTop">天龙八部怀旧服天龙八部怀旧服天龙八部怀旧服</view>
					<view class="text-cut myStatusDetailPageGoodsRightBottom">怀旧一区 / 半城烟沙 </view>
				</view>
			</view> -->

			<!-- 账号信息 -->
			<!-- 已经评估 start -->
			<view style="" v-if="evaluate_status === 1">
				<view style="padding: 40rpx 0;" class="flex flex-direction justify-center align-center">
					<view class="" style="color: #F55B29;">
						<text class="text-df text-weight-500">￥</text>
						<text class="text-weight-500" style="font-size: 48rpx;">{{evaluate_price}}</text>
					</view>
					<view style="margin-top: 11rpx;color: #868686;" class="text-sm">账号评估价格</view>
				</view>

				<view class="bg-white" style="border-radius: 8rpx;padding: 0 24rpx;width: 702rpx;margin-left: 24rpx;">
					<view style="color: #36373D;padding: 24rpx 0 24rpx;" class="text-df text-weight-500">账号评估反馈</view>
					<view style="height: 1px;width: 100%;background: #DDDDDD;"></view>
					<view style="margin-top: 24rpx;color: #868686;line-height: 42rpx;" class="text-sm">
						反馈结果：{{evaluate_info}}
					</view>
					<view style="height: 24rpx;"></view>
				</view>
			</view>
			<!-- 已经评估 end -->

			<view class="bg-white" style="width: 702rpx;padding: 24rpx 24rpx;margin-top: 24rpx;margin-left: 24rpx;">
				<view style="color: #36373D;padding: 0 0 24rpx;" class="text-df text-weight-500">账号信息</view>
				<view style="height: 1px;width: 100%;background: #DDDDDD;"></view>
				<!-- 选择游戏 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">选择游戏</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{game_name}}</view>
				</view>
				<!-- 游戏大区 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">游戏大区</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{area_name}}</view>
				</view>
				<!-- 游戏账号 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">游戏账号</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{account}}</view>
				</view>
				<!-- 游戏密码 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">游戏密码</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{password}}</view>
				</view>
				<!-- 手机号码 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">手机号码</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{mobile}}</view>
				</view>
				<!-- QQ号码 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">QQ号码</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{qqNum}}</view>
				</view>
				<!-- 微信号码 -->
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<!-- <view class="" style="color:#F02525;line-height: 42rpx;">*</view> -->
						<view class="text-sm" style="color: #36373D;margin-left: 12rpx;line-height: 42rpx;">微信号码</view>
					</view>
					<view class="text-sm" style="color: #868686;line-height: 42rpx;">{{wechat}}</view>
				</view>
			</view>
		</block>
		<!--  -->

		<!-- <view class="onlinePayBottomBtn">我要挂号</view> -->
		<button type="default" class="onlinePayBottomBtn" v-if="evaluate_status === 1" :loading="loading" @click="myGua">我要挂号</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLoading:false,
				loading:false,
				id:0,
				evaluate_status:0,
				game_name:'',//游戏名称
				area_name:'',//区服
				account:'',//游戏账号
				password:'',//游戏密码
				mobile:'',//手机号
				qqNum:'',//qq号码
				wechat:'',//微信号码
				evaluate_price:'',
				evaluate_info:'',
        status:'',
			}
		},
		onLoad(options) {
			this.id = options.id;
		},
		onShow() {
			this.gameevaluateinfo();
		},
		methods:{
			gameevaluateinfo() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gameevaluateinfo,{
					id:this.id
				}).then(res => {
					if(res.data.code == 1) {
						this.evaluate_status = res.data.data.evaluate_status;
						if(res.data.data.evaluate_status == 1) {
							this.evaluate_price = res.data.data.evaluate_price;
							this.evaluate_info = res.data.data.evaluate_info;
						}
						this.game_name = res.data.data.game_name;
						this.area_name = res.data.data.area_name;
						this.account = res.data.data.account;
						this.password = res.data.data.password;
						this.mobile = res.data.data.mobile;
						this.qqNum = res.data.data.qq;
						this.wechat = res.data.data.wechat;
            this.status= res.data.data.status
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
			myGua() {
				this.loading = true;
				setTimeout(() =>{
					uni.switchTab({
						url:'/pages/tab/sellaccount/index'
					})
					this.loading = false;
				},700)
			},


			gotoEditGu() {
				this.$urouter.navigateTo('/pages/makeorder/onlineaccount/index?isEdit=1&id=' + this.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myStatusDetailPage {
		min-height: 100vh;
		background: #FAFAFC;
	}

	.statusacross {
		height: 72rpx;
		width: 100%;
		padding: 0 32rpx;
		display: flex;
		align-items: center;
		background: #E2F6E5;
		.statusacrossImg {
			width: 24rpx;
			height: 24rpx;
			image {
				width: 24rpx;
				height: 24rpx;
			}
		}

		.statusacrossStatus {
			margin-left: 24rpx;
			margin-right: 24rpx;
			font-size: 28rpx;
			font-weight: 500;
			color: #3EC155;
		}

		.statusacrossRelative {
			font-size: 24rpx;
			color: #3EC155;
		}
	}

	.myStatusDetailPageGoods {
		padding: 40rpx 24rpx;
		background: #fff;
		display: flex;
		align-items: center;
		.myStatusDetailPageGoodsImg {
			width: 128rpx;
			height: 128rpx;
		}

		.myStatusDetailPageGoodsRight {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			height: 128rpx;
			padding: 15rpx 0;
			margin-left: 32rpx;

			.myStatusDetailPageGoodsRightTop {
				font-size: 32rpx;
				font-weight: 500;
				color: #36373D;
				width: 550rpx;
			}

			.myStatusDetailPageGoodsRightBottom {
				font-size: 24rpx;
				font-weight: 400;
				color: #36373D;
				width: 550rpx;
				color: #868686;
			}
		}
	}

	.myStatusDetailPageItems {
		padding: 30rpx 0 0;
		display: flex;
		align-items: center;

		.myStatusDetailPageItemsLeft {
			display: flex;
			align-items: center;
			width: 164rpx;
		}
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
</style>
