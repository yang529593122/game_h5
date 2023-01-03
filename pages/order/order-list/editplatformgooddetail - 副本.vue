<template>
	<view class="editplatformGooddetailPages">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				发布商品
			</view>
		</fu-custom>
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<view style="padding: 16rpx 24rpx 40rpx;" class="flex align-center bg-white justify-between">
				<view class="flex align-center">
					<view style="width: 128rpx;height: 128rpx;">
						<fu-image :src="goodsInfo.game_logo"></fu-image>
					</view>
					<view class="flex flex-direction justify-between"
						style="padding: 15rpx 0;margin-left: 32rpx;height: 128rpx;">
						<view class="text-lg text-weight-500 text-cut" style="width: 552rpx;color: #36373D;">
							{{goodsInfo.game_name}}
						</view>
						<view class="text-sm" style="color: #868686;">{{goodsInfo.area_name}} /
							{{goodsInfo.service_name}} </view>
					</view>
				</view>

				<!-- <view class="flex align-center justify-center" @click="gotoBack" style="width: 171rpx;
			height: 48rpx;
			background: #659BC7;border-radius: 26rpx;">
					<image src="../static/100.png" style="width: 28rpx;height: 28rpx;" mode=""></image>
					<view class="text-sm text-white">重新修改</view>
				</view> -->
				<view></view>
				<!-- <view style="margin-left: 32rpx;color: #36373D;" class="text-lg text-weight-500">天龙八部怀旧服</view> -->
			</view>

			<!-- 商品信息 -->
			<view style="width: 702rpx;margin-top: 24rpx;margin-left: 24rpx;" class="bg-white">
				<view style="padding: 24rpx;color: #36373D;" class="text-df text-weight-500">商品信息</view>
				<view style="width: 654rpx;height: 1px;background: #eee;margin: 0 auto;"></view>
				<view v-if="source" style="padding: 32rpx 24rpx 0;" class="flex align-center">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>账号来源</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{source}}</view>
				</view>
				
				
				<!-- 商品标题 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="goods_name">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>商品标题</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{goods_name}}</view>
				</view>
				<!-- 商品单价 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>商品单价</text>
					</view>
					<view style="width: 502rpx;" class="text-sm">
						<input placeholder="请输入商品单价" v-model="price" type="digit" style="font-size: 24rpx;color: #333;" placeholder-style="color: #B7BAC2;font-size:24rpx"  />
					</view>
				</view>
				<!-- 商品描述 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<!-- <text style="color: #F02525;padding-right: 8rpx;">*</text> -->
						<text>留言备注</text>
					</view>
					<view style="width: 502rpx;" class="text-sm">
						<input placeholder="请输入留言备注" v-model="detail" style="font-size: 24rpx;color: #333;" placeholder-style="color: #B7BAC2;font-size:24rpx"  />
					</view>
				</view>
				<!-- 商品截图 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>商品截图</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm flex algin-center flex-wrap">
						<view @click="preveImg(index,detail_images)" v-for="(item,index) in detail_images" :key="index" style="width: 80rpx;height: 80rpx;position: relative;margin-right: 8rpx;margin-bottom: 8rpx;">
							<image :src="item.thumb" style="width: 80rpx;height: 80rpx;"></image>
						</view>
						<view style="width: 80rpx;height: 80rpx;" @click="dianjishangchuanTupian">
							<image src="../static/7.png" style="width: 80rpx;height: 80rpx;"></image>
						</view>
					</view>
				</view>
				<!-- 游戏账号 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="game_accout">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>游戏账号</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{game_accout}}</view>
				</view>
				<!-- 游戏密码 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="game_password">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>游戏密码</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{game_password}}</view>
				</view>
				<!-- 角色id -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="role_id">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>角色ID</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{role_id}}</view>
				</view>
				<!-- 推荐码 -->
				
				<view style="height: 24rpx;"></view>
			</view>
			
			<!-- 联系方式 -->
			<view style="width: 702rpx;margin-top: 24rpx;margin-left: 24rpx;" class="bg-white">
				<view style="padding: 24rpx;color: #36373D;" class="text-df text-weight-500">联系方式</view>
				<view style="width: 654rpx;height: 1px;background: #eee;margin: 0 auto;"></view>
				<!-- 手机号码 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="mobile">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>手机号码</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{mobile}}</view>
				</view>
				<!-- QQ号码 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="qqNum">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>QQ号码</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{qqNum}}</view>
				</view>
				<!-- 微信号码 -->
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="wechat">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<text style="color: #F02525;padding-right: 8rpx;">*</text>
						<text>微信号码</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{wechat}}</view>
				</view>
				<view style="padding: 32rpx 24rpx 0;" class="flex align-center" v-if="introducer_no">
					<view class="text-sm" style="color: #36373D;width: 152rpx;">
						<!-- <text style="color: #FFF;padding-right: 8rpx;">*</text> -->
						<text>推荐码</text>
					</view>
					<view style="width: 502rpx;color: #868686;" class="text-sm">{{introducer_no}}</view>
				</view>
				<view style="height: 24rpx;"></view>
			</view>
			
			<!-- 信息条款 -->
			<view style="width: 702rpx;margin-top: 24rpx;margin-left: 24rpx;" class="bg-white">
				<view style="padding: 24rpx;color: #36373D;" class="text-df text-weight-500">信息条款</view>
				<view style="width: 654rpx;height: 1px;background: #eee;margin: 0 auto;"></view>
				<view @click="changeXuanze(index)" style="width: 702rpx;padding: 20rpx;margin-left: 24rpx;border-radius: 4rpx;margin-bottom: 16rpx;"
					class="bg-white flex align-center" v-for="(item,index) in ruleList" :key="index">
					<view style="" style="width: 36rpx;height: 36rpx;">
						<image src="../static/xz.png" style="width: 36rpx;height: 36rpx;" v-if="item.select" mode=""></image>
						<image src="../static/mxz.png" style="width: 36rpx;height: 36rpx;" v-else mode=""></image>
					</view>
					<view class="text-sm" style="margin-left: 22rpx;" :style="[{
						color:item.select ? '#659BC7' :'#868686'
					}]">
							{{item.content}}
					</view>
				</view>
			</view>
			
		
<button type="default" :loading="isBtnLoading" @click="confirmSubmit()" style="width: 702rpx;
height: 88rpx;
background: #295B7B;margin-top: 40rpx;margin-left: 24rpx;border-radius: 4rpx;color: #fff!important;"  class="flex align-center justify-center text-lg">提交</button>
<view style="height: 24rpx;"></view>
		</block>
	</view>
</template>

<script>
	import {UploadImage} from '@/common/utils/index.js';
	export default {
		data() {
			return {
				isShowLoading: false,
				goodId: 0,
				goodsInfo:{},
				source:'',
				goods_name:'',
				price:'',
				detail:'',
				detail_images:[],
				game_accout:'',
				game_password:'',
				ruleList:[],
				role_id:'',
				introducer_no: '',
				mobile:'',
				qqNum:'',
				wechat:'',
				isBtnLoading:false
			}
		},
		onLoad(options) {
			this.goodId = options.goodId || 0;
			this.gameusereditgoods();
			this.gameplatformhelpsellmsg();
		},
		methods: {
			confirmSubmit() {
				let isShowQuanxuan =this.ruleList.every(i => i.select);
				console.log(isShowQuanxuan)
				if(!isShowQuanxuan) {
										 this.$message.info('请选择信息条款');
											return;
				}
				if(!this.price) {
					this.$message.info('请输入商品单价')
					return;
				}
				if(parseFloat(this.price) < 0) {
					this.$message.info('商品单价不能小于零');
					return;
				}
				
				// if(!this.detail) {
					// this.$message.info('请输入商品描述');
					// return;
				// }
				
				if(!this.detail_images.length) {
					this.$message.info('请上传游戏截图');
					return;
				}
				this.isBtnLoading = true;
				this.$api.post(global.apiUrls.gameusereditgoods,{
					goods_id:this.goodId,
					type:2,
					price:this.price,
					detail:this.detail,
					client_type:2,
					detail_images:this.detail_images.map(i => i.thumb).join(',')
				}).then(res => {
					if(res.data.code == 1) {
						uni.navigateBack({
							delta:1
						})
						uni.$emit('updateList',1)
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			preveImg(idx,urls) {
				let imags = urls.map(i => i.thumb);
				uni.previewImage({
					urls:imags,
					current:idx
				})
			},
			changeXuanze(idx) {
				// this.qingxuanze = idx;
				this.$set(this.ruleList[idx],'select',!this.ruleList[idx].select)
			},
			dianjishangchuanTupian() {
				let that = this;
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						// console.log(JSON.stringify(res.tempFilePaths));
						new UploadImage(res.tempFilePaths,{
							complete:function(result) {
								console.log(result)
								that.detail_images.push(...result)
							}
						})
					}
				});
			},
			gameplatformhelpsellmsg() {
				this.$api.post(global.apiUrls.gameplatformhelpsellmsg).then(res =>{
					if(res.data.code == 1) {
						// this.ruleList = res.data.data.rule;
						this.ruleList = res.data.data.rule.map(i => ({
							content:i,
							select:false
						}));
					} else {
						this.$message.info(res.data.msg);
					}
				})
			},
			gameusereditgoods() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gameusereditgoods, {
					goods_id: this.goodId,
					type:1
				}).then(res => {
					if (res.data.code == 1) {
						this.goodsInfo = {
							game_logo:res.data.data.cover_images[0],
							game_name:res.data.data.game_name,
							area_name:res.data.data.area_name.split(' ')[0],
							service_name:res.data.data.area_name.split(' ')[1],
						}
						this.source = res.data.data.source;//账号来源
						this.goods_name = res.data.data.goods_name;//商品标题
						this.price = res.data.data.price;
						this.detail = res.data.data.detail;
						if(res.data.data.detail_images.length) {
							this.detail_images = res.data.data.detail_images.map(i => ({
								id:'ssss'+i,
								path:i,
								thumb:i
							}));
						}
						
						this.game_accout = res.data.data.game_accout;
						this.game_password = res.data.data.game_password;
						this.role_id = res.data.data.role_id;
						this.introducer_no = res.data.data.introducer_no;
						this.mobile = res.data.data.mobile;
						this.qqNum = res.data.data.qq;
						this.wechat = res.data.data.wechat;
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			}
		}
	}
</script>

<style>
</style>
