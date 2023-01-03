<template>
	<view class="myStatusDetailPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				查看回收
			</view>
			<view slot="right" v-if="audit_status === 2" @click="gotoEdit()">
				重新编辑
			</view>
		</fu-custom>
		<!--  -->
		<fu-loading v-if="isShowLoading"></fu-loading>
		<block v-else>
			<!-- 状态 -->
			<!-- 审核通过 -->
			<view class="statusacross" v-if="audit_status === 1">
				<view class="statusacrossImg">
					<image src="../static/1.png"></image>
				</view>
				<view class="statusacrossStatus">审核通过</view>
				<view class="statusacrossRelative">请等待客服联系您</view>
			</view>
			
			<!-- 审核中 -->
			<view class="statusacross" style="background: #F4F5F6;" v-if="audit_status === 0">
				<view class="statusacrossImg">
					<image src="../static/2.png"></image>
				</view>
				<view class="statusacrossStatus" style="color: #B7BAC2;">审核中</view>
				<!-- <view class="statusacrossRelative">请等待客服联系您</view> -->
			</view>
			
			<!-- 审核失败 -->
			<view class="statusacross" style="background: #FDDEDE;"  v-if="audit_status === 2">
				<view class="statusacrossImg">
					<image src="../static/3.png"></image>
				</view>
				<view class="statusacrossStatus" style="color: #F02525;">审核不通过</view>
				<view class="statusacrossRelative" style="color: #E8625B;">{{reject_info}}</view>
			</view>
			
			<!-- 游戏 -->
			<view class="myStatusDetailPageGoods">
				<view class="myStatusDetailPageGoodsImg">
					<fu-image :src="game_logo"></fu-image>
				</view>
				<view class="myStatusDetailPageGoodsRight">
					<view class="text-cut myStatusDetailPageGoodsRightTop">{{game_name}}</view>
					<view class="text-cut myStatusDetailPageGoodsRightBottom">{{area_name}}</view>
				</view>
			</view>
			
			<!-- 账号信息 -->
			<!-- 账号来源 -->
			<view class="myStatusDetailPageItems" v-if="source">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">账号来源</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{source}}</view>
			</view>
			<!-- 其他属性 -->
			
			<view class="myStatusDetailPageItems" v-if="is_pretty">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">是否为靓号</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{is_pretty}}</view>
			</view>
			
			<view class="myStatusDetailPageItems" v-if="is_appeal">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">是否有申诉能力</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{is_appeal}}</view>
			</view>
			
			<block v-if="sourceId == 1">
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
						<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">在手时长</view>
					</view>
					<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{hours}}</view>
				</view>
				
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
						<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">经哪个中介交易获得</view>
					</view>
					<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{agency}}</view>
				</view>
				
				<view class="myStatusDetailPageItems">
					<view class="myStatusDetailPageItemsLeft">
						<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
						<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">购买时流程方式</view>
					</view>
					<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{procedure}}</view>
				</view>
			</block>
			
			<!-- attr_values -->
			<!-- <block v-if="attr_values.length">
				<view class="myStatusDetailPageItems" v-for="(item,index) in attr_values" :key="index">
					<view class="myStatusDetailPageItemsLeft">
						<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
						<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">{{item.attr_name}}</view>
					</view>
					<view class="text-sm" style="color: #36373D;line-height: 42rpx;" v-if="item.type == 1">{{item.value_name}}</view>
					<view class="text-sm" style="color: #36373D;line-height: 42rpx;" v-if="item.type == 2">{{item.value}}</view>
				</view>
			</block> -->
			<!-- 游戏账号 -->
			<view class="myStatusDetailPageItems" v-if="game_accout">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">游戏账号</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{game_accout}}</view>
			</view>
			<!-- 游戏密码 -->
			<view class="myStatusDetailPageItems" v-if="game_password">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">游戏密码</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{game_password}}</view>
			</view>
			<!-- 角色ID -->
			<!-- <view class="myStatusDetailPageItems" v-if="role_id">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">角色ID</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{role_id}}</view>
			</view> -->
			<!-- 手机号码 -->
			<view class="myStatusDetailPageItems">
				<view class="myStatusDetailPageItemsLeft" v-if="mobile">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">手机号码</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{mobile}}</view>
			</view>
			<!-- qq号码 -->
			<view class="myStatusDetailPageItems" v-if="qqNum">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">qq号码</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{qqNum}}</view>
			</view>
			<!-- 微信号码 -->
			<view class="myStatusDetailPageItems" v-if="wechat">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">微信号码</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{wechat}}</view>
			</view>
			
			<!-- 号主留言 -->
			<view class="myStatusDetailPageItems" v-if="remark">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#FAFAFC;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">号主留言</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;width: 500rpx;">{{remark}}</view>
			</view>
			<!-- 推荐码 -->
			<view class="myStatusDetailPageItems" v-if="introducer_no">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#FAFAFC;line-height: 42rpx;">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">推荐码</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;">{{introducer_no}}</view>
			</view>
		</block>
		<!-- 扩展 start -->
		<block v-for="(item,index) in attr_data" :key="index">
			<view class="myStatusDetailPageItems">
				<view class="myStatusDetailPageItemsLeft">
					<view class="" style="color:#F02525;line-height: 42rpx;" v-if="item.is_must">*</view>
					<view class="text-sm" style="color: #868686;margin-left: 12rpx;line-height: 42rpx;">{{item.attr_name}}</view>
				</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;" v-if="item.type == 1">{{item.value_name}}</view>
				<view class="text-sm" style="color: #36373D;line-height: 42rpx;" v-else>{{item.value}}</view>
			</view>
		</block>
		<!-- 扩展 end -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isShowLoading:false,
				goods_id:0,
				audit_status:'',
				reject_info:'',//驳回原因
				game_name:'',
				area_name:'',
				game_logo:'',
				source:'',//账号来源
				game_accout:'',//游戏账号
				game_password:'',//游戏密码
				role_id:'',//角色id
				mobile:'',//手机号码
				qqNum:'',//qq
				wechat:'',//微信
				introducer_no:'',//推荐码
				attr_values:[],
				selectGameAreaId:0,//区域id
				selectGameServerId:0,//服务id
				gameId:0,
				is_pretty:'',
				is_appeal:'',
				remark:'',
				hours:'',
				sourceId:0,
				agency:'',
				procedure:'',
				attr_data:[]
			}
		},
		onLoad(options) {
			this.goods_id = options.goodsId || 0;
		},
		onShow() {
			this.gamerecycledetail();
		},
		methods:{
			gotoEdit() {
				this.goodsInfo = {
					game_id:this.gameId,
					game_name:this.game_name,
					game_logo:this.game_logo,
					area_name:this.area_name,
					area_id:this.selectGameAreaId,
					service_name:'',
					service_id:this.selectGameServerId
				}
				this.$urouter.navigateTo('/pages/makeorder/publishgoods/index?type=1&goodId='+this.goods_id+'&goodsInfo=' + JSON.stringify(this.goodsInfo));
			},
			gamerecycledetail() {
				this.isShowLoading = true;
				this.$api.post(global.apiUrls.gameuserrecyleinfo,{
					id:this.goods_id
				}).then(res => {
					if(res.data.code == 1) {
						this.audit_status = res.data.data.audit_status;
						this.reject_info = res.data.data.reject_info;
						this.game_name = res.data.data.game_name;
						this.area_name = res.data.data.area_name;
						this.game_logo = res.data.data.logo;
						this.sourceId =res.data.data.source;
						
						this.source = res.data.data.source === 0 ? '自己注册申请一手号' : '早期/近期购买、他人赠送';
						this.is_pretty = res.data.data.is_pretty === 0 ? '否' : '是';
						this.is_appeal = res.data.data.is_appeal === 0 ? '否' :res.data.data.is_appeal == 1 ? '是' : '不清楚';
						this.game_accout = res.data.data.game_account;//游戏账号
						this.game_password = res.data.data.game_password;//游戏密码
						this.hours = res.data.data.hours;
						this.agency = res.data.data.agency;
						// this.procedure = '';
						if(res.data.data.procedure === 0) {
							this.procedure = '不挂不压'
						} else if(res.data.data.procedure === 1) {
							this.procedure = '挂ip'
						}else if(res.data.data.procedure === 2) {
							this.procedure = '押证包安'
						} else {
							this.procedure = '包赔'
						}
						// this.role_id = res.data.data.role_id;//角色id
						this.mobile = res.data.data.mobile;//手机号码
						this.qqNum = res.data.data.qq;//qq
						this.wechat = res.data.data.wechat;//微信
						this.remark = res.data.data.remark;
						this.attr_data = res.data.data.attr_data;
						// this.introducer_no = res.data.data.introducer_no;
						// this.attr_values = res.data.data.attr_values;
						this.selectGameAreaId = res.data.data.area_id;//区域id
						
						this.gameId = res.data.data.game_id || 0;
						this.selectGameServerId = res.data.data.service_id;//服务id
					} else {
						this.$message.info(res.data.msg);
					}
					this.isShowLoading = false;
				})
			},
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
		padding: 30rpx 24rpx 0;
		display: flex;
		align-items: center;
		
		.myStatusDetailPageItemsLeft {
			display: flex;
			align-items: center;
			width: 204rpx;
		}
	}
</style>