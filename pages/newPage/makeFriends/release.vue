<template>
	<view class="content" v-if="initData">
		<view class="release-info-up">
			<view class="release-item">
				<input type="text" v-model="title" placeholder="填写标题会有更多人浏览哦~">
			</view>
			<view class="release-item release-items">
				<textarea  placeholder="请填写自我介绍~" v-model="introduce"  cols="30" rows="10"></textarea>
			</view>
			<view class="release-item release-items release-item1">
				<view class="upload-text">上传图片</view>
				<view class="release-img-list">
					<image src="/static/add-img.png" mode="aspectFill"></image>
				</view>
			</view>
		</view>
		<view class="line"></view>
		<view class="release-info-down">
			<view class="release-item" @click="popupShow=true">
				<view>选择标签</view>
				<view class="select-text">
					<text>请选择</text>
					<image src="/static/my/arr.png" mode="aspectFill"></image>
				</view>
			</view>
			<view class="release-item">
				<view><text class="stars">*</text> QQ号码</view>
				<input type="text" v-model="qq" placeholder="请输入">
			</view>
			<view class="release-item">
				<view>手机号码</view>
				<input type="text" v-model="phone" placeholder="请输入">
			</view>
			<view class="release-item">
				<view>微信号码</view>
				<input type="text" v-model="wechat" placeholder="请输入">
			</view>
			<view class="tips">
				说明：为了平台交友安全，交友
				需支付10元交友费，为了平台交友安全，交友
				需支付10元交友费，为了平台交友安全，交友需
				支付10元交友费，为了平台交友安全，交友需支付
				10元交友费，为了平台交友安全，交友需支付10元交友费，
				为了平台交友安全，交友需支付10元交友费，
			</view>
			<button class="btns" @click="subOrder">发布￥{{ initData.publish_price || 0}}</button>
		</view>

		<benben-popup v-model="popupShow" mode="bottom">
			<view class="popup">
				<view class="popup-title">
					<text class="cancel" @click.stop="popupShow=false">取消</text>
					<text class="pop-title">选择标签</text>
					<text class="getyes" @click.stop="getYes">确定</text>
				</view>
				<view class="game-type">
					<view class="type-list" v-for="item in 4" :key="item">
						<view class="types-item">
							<text v-for="item in 3" :key="item">王者荣耀</text>
						</view>
						<image @click="getselect(item)" src="/static/newPage/11.png" mode="aspectFill"></image>
					</view>
				</view>
				<view class="line"></view>
				<view class="my-select">
					<text>我的选择</text>
					<text>至少选择1个，最多选择6个</text>
				</view>
				<view class="select-list">
					<view class="select-item" :class="{'select-active':select==item}" v-for="item in 10" :key="item">
						王者荣耀
						<image src="/static/newPage/13.png" mode="aspectFill"></image>
					</view>
				</view>
			</view>
		</benben-popup>
	</view>
</template>

<script>
	import benbenPopup from '@/components/benben-popup/benben-popup.vue'
	export default {
		components:{benbenPopup},
		data() {
			return {
        initData:null,
        title:'',// 标题
        introduce:"",//介绍
        images:"" ,//图片集
        phone:"",
        qq:'',
        wechat:"",
				tab: 1,
				popupShow:false,
				select:1,
        resultData:null,
			}
		},
    onLoad() {
      this.init()
    },
		methods: {
      // 获取发布配置信息
      init(){
        this.$api.post(global.apiUrls.friends_get_friend_config).then(res=>{
          console.log(res,9999)
          if (res.data.code === '1') {
            const result = res.data.data
            this.initData = result
          } else {
            this.$message.info(res.data.msg);
          }
        })
      },
      // 点击发布
      subOrder(){
        this.$api.post(global.apiUrls.friends_publish, {
          title:'你好',// 标题
          tabs:'1,2',
          introduce:'askdjh',//介绍
          images:"" ,//图片集
          phone:"",
          qq:'529593132',
          wechat:'123',
          price:'0.01' ,
        }).then(res => {
          if (res.data.code === '1') {
            const result = res.data.data
            this.$urouter.navigateTo(`/pages/newPage/makeFriends/pay?orderNo=${result.order_sn}`);
          } else {
            this.$message.info(res.data.msg);
          }
          this.popupShow = false
        })
      },
			getActive(index) {
				this.tab = index;
			},
			getYes(e){
				console.log(e);
			},
			// 选择
			getselect(){

			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #fff;
	}
	.content{

		.release-info-up {
			padding: 0 32rpx;

			.release-item {
				display:flex;
				justify-content: space-between;
				align-items: center;
				padding:32rpx 0;
				border-bottom: 1rpx solid #EEEEEE;

				input {
					font-size: 28rpx;
					color: #333;
					font-weight: 500;
				}
			}

			.release-items{
				border-bottom: none;
			}
			.release-item1 {
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
				align-items: flex-start;

				.upload-text{
					font-size: 28rpx;
					color: #333;
					margin-bottom: 24rpx;
				}

				.release-img-list {
					width: 100%;

					image{
						width: 140rpx;
						height: 140rpx;
					}
				}
			}
		}

		.line {
			height: 20rpx;
			background: #FAFAFC;
		}

		.release-info-down {
			padding: 0 32rpx 32rpx;
			.release-item {
				display:flex;
				justify-content: space-between;
				align-items: center;
				padding:32rpx 0;
				border-bottom: 1rpx solid #EEEEEE;

				input {
					text-align: right;
				}
				view {
					font-size: 32rpx;
					color: #36373D;

					.stars {
						color: #F02525;
						margin-right: 20rpx;
					}
				}
				.select-text {
					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
			}
			.release-item:nth-child(4){
				border-bottom: none;
			}
			.tips {
				font-size: 24rpx;
				color: #999999;
				margin-top: 10rpx;
				margin-bottom: 56rpx;
			}

			.btns {
				width: 100%;
				line-height: 88rpx;
				background: #295B7B;
				color: #fff;
			}
		}

		.popup{
			background: #fff;
			border-radius: 16rpx 16rpx 0 0;

			.popup-title {
				padding: 0 32rpx;
				line-height: 110rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				border-bottom: 1rpx solid #EEEEEE;
				.cancel{
					font-size: 32rpx;
					color: #BFBFBF;
				}
				.pop-title {
					font-size: 32rpx;
					color: #333333;
				}
				.getyes{
					font-size: 32rpx;
					color: #295B7B;
					font-weight: 500;
				}
			}
			.line{
				width: 100%;
				height: 10rpx;
				background: #FAFAFC;
			}
			.game-type{
				padding: 0 32rpx 32rpx;
				.type-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 40rpx;

					.types-item {
						width: 600rpx;
						display: flex;
						justify-content: space-around;
						align-items: center;
						text {
							display: inline-block;
							width: 120rpx;
							color: #333333;
							font-size: 28rpx;
						}
					}

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}
			}
			.my-select {
				padding: 32rpx 24rpx 0;
				text{
					color: #999999;
					font-size: 28rpx;
				}
				text:nth-child(1){
					font-size: 32rpx;
					color: #333333;
					font-weight: 600;
					margin-right: 24rpx;
				}
			}
			.select-list {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				flex-wrap: wrap;
				padding: 32rpx 24rpx;

				.select-item {
					background: #F8F8F8;
					color: #36373D;
					width: 165rpx;
					line-height: 64rpx;
					text-align: center;
					position: relative;
					font-size: 28rpx;
					margin-right: 16rpx;
					margin-bottom: 16rpx;

					image{
						width: 28rpx;
						height: 28rpx;
						position: absolute;
						right: -10rpx;
						top: -10rpx;
					}
				}
				.select-item:nth-child(4n){
					margin-right: 0;
				}
				.select-active {
					background: #295B7B;
					color: #fff;
				}
			}
		}
	}
</style>
