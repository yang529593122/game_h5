<template>
	<view class="onlineAccountPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				在线估号
			</view>
		</fu-custom>

		<view class="onlineAccountPageInfo">
			在线估号业务介绍
		</view>

		<view class="onlineAccountPageContent">
			<jyf-parser :html="onlineAccountPageContent"></jyf-parser>
		</view>

		<!-- 账号信息 start -->
		<view class="onlineAccountPageContentAccount">
			填写账号信息
		</view>

		<view class="onlineAccountPageItem">
			<!-- 账号信息 end -->
			<!-- <uni-data-select
			      v-model="value"
				  :placeholder="'请选择游戏'"
			      :localdata="range"
			      @change="change"
				  ref="select"
				  :select="1"
			    ></uni-data-select> -->
				<view style="position: absolute;width: 100%;height: 36px;" @click="changeShowYouxi">
					<view style="width: 100%;height: 36px;padding: 0 24rpx;" class="flex align-center justify-between">
						<!-- selectYouxiName -->
						<view style="color: #333;font-size: 14px;" v-if="selectYouxiName">{{selectYouxiName}}</view>
						<view style="color: #6a6a6a;font-size: 14px;" v-else>请选择游戏</view>

						<view style="width: 40rpx;height: 40rpx;">
							<image src="/static/home/bottom.png" v-if="isShowYouxiList" style="width: 40rpx;height: 40rpx;transform: rotate(180deg);" mode=""></image>
							<image src="/static/home/bottom.png" style="width: 40rpx;height: 40rpx;" v-else mode=""></image>
						</view>
					</view>
				</view>

				<view class="kendingTanchuang" v-if="isShowYouxiList">
					<scroll-view scroll-y="true" style="width: 702rpx;height: 300rpx;">
						 <view class="" style="width: 702rpx;font-size: 14px;height: 36px;line-height:36px;padding: 0 24rpx;" @click="selectConfirmYouxiName(item)" v-for="(item,index) in youxiliebiao" :key="index">{{item.game_name}}</view>
				</scroll-view>

				</view>
		</view>

		<view class="onlineAccountPageItem">
			<!-- 账号信息 end -->
			<!-- <uni-data-select
			      v-model="gramevalue"
				  :placeholder="'请选择游戏大区'"
			      :localdata="range"
				   :select="2"
				   ref="clearValSelect"
			      @change="changeGame"
			    ></uni-data-select> -->
				<view style="position: absolute;width: 100%;height: 36px;" @click="onpenYouxiDaqu">
					<view style="width: 100%;height: 36px;padding: 0 24rpx;" class="flex align-center justify-between">
						<view style="color: #333;font-size: 14px;" v-if="selectYouxiDaqu">{{selectYouxiDaqu}}</view>
						<view style="color: #6a6a6a;font-size: 14px;" v-else>请选择游戏大区</view>
						<view style="width: 40rpx;height: 40rpx;">
							<image src="/static/home/bottom.png" v-if="isShowYouxiDaqu" style="width: 40rpx;height: 40rpx;transform: rotate(180deg);" mode=""></image>
							<image src="/static/home/bottom.png" style="width: 40rpx;height: 40rpx;" v-else mode=""></image>
						</view>
					</view>
				</view>

				<view class="kendingTanchuang" v-if="isShowYouxiDaqu">
					<scroll-view scroll-y="true" style="width: 702rpx;height: 300rpx;">
						 <view v-for="(item,index) in daquList" :key="index" @click="selectConfirmYouxiDaqu(item)" style="width: 702rpx;font-size: 14px;height: 36px;line-height:36px;padding: 0 24rpx;">{{item.area_name}}</view>

				</scroll-view>

				</view>
		</view>

		<!-- 输入游戏账号 -->
		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input type="text" style="width: 100%;" v-model="account" placeholder="输入游戏账号" placeholder-style="color: #6a6a6a!important;font-size: 14px;">
			</view>
		</view>

		<!-- 输入游戏密码 -->
		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input :type="oldpasswordShow ? 'password' : 'text' " class="passwordInput" style="width: 100%;" v-model="password" placeholder="输入游戏密码" placeholder-class="placeHolderStyleScoLor">
				<view style="width: 34rpx;" @click="changeShowPassword">
					<image src="../static/open.png" v-if="oldpasswordShow" mode="widthFix" style="width: 34rpx;"></image>
					<image src="../static/close.png" v-else mode="widthFix"  style="width: 34rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 请再次输入游戏密码 -->
		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input :type="newpasswordShow ? 'password' : 'text'" class="passwordInput" style="width: 100%;" v-model="nextpassword" placeholder="请再次输入游戏密码" placeholder-class="placeHolderStyleScoLor">
				<view style="width: 34rpx;" @click="changeShowPasswords">
					<image src="../static/open.png" v-if="newpasswordShow" mode="widthFix" style="width: 34rpx;"></image>
					<image src="../static/close.png" v-else mode="widthFix"  style="width: 34rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 输入手机号码 -->
		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input type="number" v-model="mobile" maxlength="11" style="width: 100%;" placeholder="输入联系手机" placeholder-style="color: #6a6a6a;font-size: 14px;">
			</view>
		</view>

		<!-- 输入QQ号码 -->
		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input type="number" style="width: 100%;" v-model="qqNum" maxlength="20" placeholder="输入联系QQ" placeholder-style="color: #6a6a6a;font-size: 14px;">
			</view>
		</view>

		<!-- 输入微信号码 -->
		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input type="text" style="width: 100%;" v-model="wechat" maxlength="25" placeholder="输入联系微信" placeholder-style="color: #6a6a6a;font-size: 14px;">
			</view>
		</view>

		<view class="onlineAccountPageItem">
			<view class="flex align-center" style="padding:0 15px;min-height: 36px;">
				<input type="text" style="width: 100%;" v-model="remark" placeholder="号主留言" placeholder-style="color: #6a6a6a;font-size: 14px;">
			</view>
		</view>



	<!-- 	<view style="padding: 30rpx;" class="text-999 text-sm">
			<view>1、选择其他大区的请详细备注好所在大区名。</view>
			<view style="margin-top: 10rpx;">2、网页估号可联系客服手动充值后使用余额支付即可。</view>
		</view> -->

    <view style="padding:  30rpx;">商品截图</view>
    <view class="" style="padding: 0rpx 30rpx  100rpx 30rpx">
      <view style="display: grid; grid-template-columns: repeat(3, 1fr);
   grid-column-gap: 10rpx;
   grid-row-gap: 10rpx; ">
          <block v-if="idcard_front" >
            <image v-for="item in idcard_front" :src="item"  mode="aspectFit" style="width: 226rpx;height: 226rpx;"></image>
          </block>
           <image src="/static/add-img.png" style="width: 226rpx;height: 226rpx;" @click="uploadScreenshot"></image>
      </view>

    </view>


		<!-- 重新编辑 按钮 -->
		<button type="default" v-if="false" class="onlinePayBottomBtn" :loading="loading" @click="myGua">重新编辑</button>
		<!--重新编辑 按钮   -->
		<!-- 底部按钮 -->
		<view class="onlineAccountPageBottom">
			<view class="onlineAccountPageBottomContent" v-if="isEdit === 0">
				<view class="onlineAccountPageBottomContentLeft">
					<text class="onlineAccountPageBottomContentLeftText">估价</text>
					<text class="onlineAccountPageBottomContentLeftPriceFu">￥</text>
					<text class="onlineAccountPageBottomContentLeftPriceFuPrice">{{gujiaPrice}}</text>
				</view>
				<view style="display: flex;" >
          <button type="default" class="onlineAccountPageBottomContentRight onlineAccountPageBottomContentRightCg" :loading="confirmPayLoadingnew" @click="confirmPay(2)">保存草稿</button>
          <button type="default" class="onlineAccountPageBottomContentRight" :loading="confirmPayLoading" @click="confirmPay(0)">确认支付</button>
        </view>

			</view>
			<view class="onlineAccountPageBottomContent" v-else>
				<!-- <view ></view> -->
				<button type="default" class="onlineAccountPageBottomContentRight" style="width: 702rpx;" :loading="confirmPayLoading" @click="confirmEditBack">确认修改</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {validate,UploadImage} from '@/common/utils/index.js'
	// import uniDataSelect from '../components/uni-data-select/uni-data-select.vue'
	export default {
		components:{
			// uniDataSelect
		},
		data() {
			return {
				loading:false,
				confirmPayLoading:false,
        confirmPayLoadingnew:false,
				pages:1,
				isShowYouxiList:false,
				selectYouxiName:'',
				selectYouxiNameId:'',
				selectYouxiDaqu:'',
				selectYouxiDaquId:'',
				isShowYouxiDaqu:false,
				youxiliebiao:[],//游戏列表
				daquList:[],//大区列表
				onlineAccountPageContent:``,
				gujiaPrice:'0.00',
				account:'',//账号
				password:'',//密码
				nextpassword:'',//请再次输入密码
				mobile:'',//手机号
				qqNum:'',//qq号
				wechat:'',//请输入微信号码
				isEdit:0,
				editId:0,
				oldpasswordShow:true,
				newpasswordShow:true,
				remark:'',
        idcard_front:[]
			}
		},
		onLoad(options) {
			this.pages = 1;
			this.gamesystemarticleinfo();
			this.gamegamelist();
			this.isEdit = options.isEdit == 1 ? 1 : 0;
				if(options.isEdit == 1) {
					this.editId = options.id;
					this.gameevaluateinfo();
				}

        uni.$on("uPicCropper", (path) => {
          this.uploadUserImg(path);
        });
		},
		onShow() {
				// 获取游戏列表

		},
    onUnload() {
      // 关闭当前页面的监听事件
      uni.$off("uPicCropper");
    },
		methods:{
			changeShowPasswords() {
				this.newpasswordShow = !this.newpasswordShow;
			},
			changeShowPassword() {
				this.oldpasswordShow = !this.oldpasswordShow;
			},
			gameevaluateinfo() {
				this.$api.post(global.apiUrls.gameevaluateinfo,{
					id:this.editId
				}).then(res => {
					if(res.data.code == 1) {
						this.selectYouxiName=res.data.data.game_name;
						this.selectYouxiNameId=res.data.data.game_id;
						this.gamegamearealist();
						this.selectYouxiDaqu=res.data.data.area_name;
						this.selectYouxiDaquId=res.data.data.area_id;
						this.account=res.data.data.account;//账号
						this.password=res.data.data.password;//密码
						this.nextpassword = res.data.data.password;
						this.mobile=res.data.data.mobile;//手机号
						this.qqNum=res.data.data.qq;//qq号
						this.wechat = res.data.data.wechat;//请输入微信号码
						this.remark = res.data.data.remark || '';
            this.idcard_front = res.data.data.goods_images || '',
            this.status = res.data.data.status
					} else {
						this.$message.info(res.data.msg)
					}
				})
			},
			// 提交估价
			gameonlineestimationaccount(status) {
				if(!this.selectYouxiNameId) {
					this.$message.info('请选择游戏')
					return;
				}
				if(!this.selectYouxiDaquId) {
					this.$message.info('请选择游戏大区')
					return;
				}

				if(!this.account.trim()) {
					this.$message.info('请输入游戏账号')
					return;
				}

				if(!this.password.trim()) {
					this.$message.info('请输入游戏密码')
					return;
				}
				if(!this.mobile) {
					this.$message.info('请输入联系手机')
					return;
				}

				if(!validate(this.mobile,'phone')) {
					this.$message.info('手机号格式有误,请重新输入')
					return;
				}

				if(!this.qqNum) {
					this.$message.info('请输入联系QQ')
					return;
				}

				if(!this.wechat) {
					this.$message.info('请输入联系微信')
					return;
				}
        if(status===0){
          this.confirmPayLoading = true;
        }else{
          this.confirmPayLoadingnew = true
        }
				this.$util.throttle(() => {
					this.$api.post(global.apiUrls.gameonlineestimationaccount,{
						game_id:this.selectYouxiNameId,
						account:this.account,
						mobile:this.mobile,
						area_id:this.selectYouxiDaquId,
						password:this.password,
						qq:this.qqNum,
						wechat:this.wechat,
						remark:this.remark,
            status:status,
            goods_images:this.idcard_front ? this.idcard_front.join() : "",
					}).then(res => {
						if(res.data.code == 1) {
							setTimeout(() => {
                if(status === 0){
                  this.confirmPayLoading = false;
                  this.$urouter.navigateTo('/pages/makeorder/onlinepay/index?orderNo=' + res.data.data.order_no + '&price=' + this.gujiaPrice);
                }else{
                  this.confirmPayLoadingnew = false
                  this.$urouter.navigateTo('/pages/order/order-list/guindex');
                }
							},700)
						} else {
							this.$message.info(res.data.msg);
						}
						this.confirmPayLoading = false;
					})
				},2000)

			},
			selectConfirmYouxiDaqu(item) {
				this.selectYouxiDaqu = item.area_name;
				this.selectYouxiDaquId = item.area_id;
				this.isShowYouxiDaqu = false;
			},
			// 确认修改
			confirmEditBack() {
				if(!this.selectYouxiNameId) {
					this.$message.info('请选择游戏')
					return;
				}
				if(!this.selectYouxiDaquId) {
					this.$message.info('请选择游戏大区')
					return;
				}

				if(!this.account.trim()) {
					this.$message.info('请输入游戏账号')
					return;
				}

				if(!this.password.trim()) {
					this.$message.info('请输入游戏密码')
					return;
				}

				if(!this.nextpassword.trim()) {
					this.$message.info('请再次输入游戏密码')
					return;
				}

				if(this.password != this.nextpassword) {
					this.$message.info('两次输入密码不一致')
					return;
				}
				if(!this.mobile) {
					this.$message.info('请输入联系手机')
					return;
				}

				if(!validate(this.mobile,'phone')) {
					this.$message.info('手机号格式有误,请重新输入')
					return;
				}

				if(!this.qqNum) {
					this.$message.info('请输入联系QQ')
					return;
				}

				if(!this.wechat) {
					this.$message.info('请输入联系微信')
					return;
				}
				this.confirmPayLoading = true;
				this.$util.throttle(() => {
					this.$api.post(global.apiUrls.gameevaluateedit,{
						id:this.editId,
						game_id:this.selectYouxiNameId,
						account:this.account,
						mobile:this.mobile,
						area_id:this.selectYouxiDaquId,
						password:this.password,
						qq:this.qqNum,
						wechat:this.wechat,
						remark:this.remark,
            status:this.status,
            goods_images:this.idcard_front ? this.idcard_front.join() : "",
					}).then(res => {
						if(res.data.code == 1) {
							this.confirmPayLoading = false;
							uni.navigateBack({
								delta:1
							})
							uni.$emit('updatelist',1)
						} else {
							this.$message.info(res.data.msg);
						}
						this.confirmPayLoading = false;
					})
				},2000)

			},
			// 估价
			gameonlineestimationprice() {
				this.$api.post(global.apiUrls.gameonlineestimationprice).then(res => {
					if(res.data.code == 1) {
						this.gujiaPrice = parseFloat(res.data.data).toFixed(2);
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			// 估价介绍
			gamesystemarticleinfo() {
				this.$api.post(global.apiUrls.gamesystemarticleinfo,{
					article_id:20
				}).then(res => {
					if(res.data.code == 1) {
						this.onlineAccountPageContent = res.data.data.content;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			// 选择游戏名称
			selectConfirmYouxiName(item) {
				this.selectYouxiName = item.game_name;
				this.selectYouxiNameId = item.game_id;
				// if(this.gujiaPrice == 0) {
					this.selectYouxiDaqu = '',
					this.selectYouxiDaquId = '',
					this.gameonlineestimationprice();
				// }
				this.gamegamearealist();
				this.isShowYouxiList = false;
			},
			// 获取游戏大区
			gamegamearealist() {
				this.$api.post(global.apiUrls.gamegamearealist,{
					game_id:this.selectYouxiNameId,
					// game_name:this.selectYouxiName
				}).then(res => {
					if(res.data.code == 1) {
						this.daquList = res.data.data;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			// 打开游戏列表
			changeShowYouxi() {
				this.isShowYouxiList = !this.isShowYouxiList;
			},
			// 打开游戏大区
			onpenYouxiDaqu() {
				if(!this.selectYouxiName) {
					this.$message.info('请先选择游戏');
					return;
				}

				if(!this.daquList.length) {
					this.$message.info('该游戏暂无大区');
					return;
				}
				this.isShowYouxiDaqu = !this.isShowYouxiDaqu;
			},

			gamegamelist() {
				this.$api.post(global.apiUrls.gamegamelist,{
					type:0,//全部
					page:this.pages,
					list_rows:200,
					is_evaluation:1
				}).then(res => {
					if(res.data.code == 1) {
						this.youxiliebiao = res.data.data.data;
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			myGua() {
				this.loading = true;
				setTimeout(() =>{
					this.loading = false;
				},700)
			},
			change(e) {
				this.value = e;
				this.$refs.select.current= this.$refs.select.formatItemName(this.range[e])
			},
			changeGame(e) {
				if(this.value == -1) {
					this.gramevalue = -1;
					// this.$refs.clearValSelect.clearVal();
					this.$message.info('请先选择游戏类型')
					return;
				}
				this.gramevalue = e;
				this.$refs.clearValSelect.current= this.$refs.clearValSelect.formatItemName(this.range[e])
			},

			// 确认支付
			confirmPay(status) {
				this.gameonlineestimationaccount(status);
				// this.confirmPayLoading = true;

			},
      // 上传商品截图
      uploadScreenshot() {
          uni.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ["album"], // 可以指定来源是相册还是相机，默认二者都有
            success: (res) => {
              // 跳转到图片裁切页面
              uni.navigateTo({
                url: `/pages/user/user/avatar-cropping/index?rectHeight=200&rectWidth=200&fileType=jpg&myImgUrl=${res.tempFilePaths[0]}`,
                animationDuration: 0,
              });
            },
          });

      },
      uploadUserImg(blob) {
        uni.showLoading();
        let _this = this;
        // 开始上传
        new UploadImage([blob], {
          complete: function (res) {
            uni.hideLoading();
            if (res.length) {
              _this.idcard_front =[..._this.idcard_front,res[0].path]

            }
          },
        });
      },

		}
	}
</script>

<style scoped lang="scss">

	.onlineAccountPage {
		min-height: 100vh;
		background: #FAFAFC;
	}

	.onlineAccountPageInfo {
		padding: 24rpx;
		background: #fff;
		font-size: 32rpx;
		font-weight: 500;
		color: #36373D;
	}


	.kendingTanchuang {
		position: absolute;
		top: 36px;
		width: 702rpx;
		left: 0;
		background: #ffffff;
		border-radius: 6px;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		z-index: 999;
	}

	.onlineAccountPageContent {
		padding: 0 24rpx;
		font-size: 28rpx;
		color: #36373D;
		background: #fff;
	}

	.onlineAccountPageContentAccount {
		padding: 40rpx 24rpx 24rpx;
		background: #fff;
		font-size: 32rpx;
		font-weight: 500;
		color: #36373D;
	}

	.onlineAccountPageItem {
		position: relative;
		margin-top: 24rpx;
		width: 702rpx;
		background: #fff;
		height: 36px;
		border-radius: 4rpx;
		margin-left: 24rpx;
	}


	.onlineAccountPageBottom {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding-bottom: 0;
		padding-bottom: constant(safe-area-inset-bottom);
		padding-bottom: env(safe-area-inset-bottom);
		background-color: #ffffff;
	}

	.onlineAccountPageBottomContent {
		height: 98rpx;
		display: flex;
		width: 100%;
		align-items: center;
		justify-content: space-between;
		padding: 0 24rpx;
	}

	.onlineAccountPageBottomContentLeft {
		.onlineAccountPageBottomContentLeftText {
			font-size: 28rpx;
			color: #19212D;
		}

		.onlineAccountPageBottomContentLeftPriceFu {
			font-size: 28rpx;
			font-weight: bold;
			font-family: Helvetica Neue;
			color: #F55B29;
		}

		.onlineAccountPageBottomContentLeftPriceFuPrice {
			font-size: 40rpx;
			color: #F55B29;
			font-weight: bold;
		}
	}

	.onlineAccountPageBottomContentRight {
		width: 200rpx;
		height: 78rpx;
		background: #295B7B;
		font-size: 28rpx;
		font-weight: 500;
		font-family: PingFang SC;
		color: #FFFFFF;
		text-align: center;
		line-height: 78rpx;
		border-radius: 0;
	}
  .onlineAccountPageBottomContentRightCg {
    background: #EA8E12;
    margin-right: 10rpx;
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

	.passwordInput {
		    outline: none;
		    border: none;
		    padding: 0;
		    margin: 0;
		    text-decoration: inherit;
			font: inherit;
			// color: #6a6a6a!important;
			    line-height: inherit;
			    letter-spacing: inherit;
			    text-align: inherit;
			    text-indent: inherit;
			    text-transform: inherit;
			    text-shadow: inherit;
	}

	.placeHolderStyleScoLor {
		color: #6a6a6a!important;
		font-size: 14px!important;
	}
</style>
