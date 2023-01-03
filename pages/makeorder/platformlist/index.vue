<template>
	<view class="homeWorkPage">
		<fu-custom isBack bgColor="bg-white">
			<view slot="content">
				平台公告
			</view>
		</fu-custom>
		
		<fu-loading v-if="showLoading"></fu-loading>
		<view class="homeWorkPagelist" v-else>
			<fu-empty-ui v-if="!listDataList.length"></fu-empty-ui>
			<block v-else>
				<view class="homeWorkPageItem" v-for="(item,index) in listDataList" :key="index" @click="gotoHomeWorkDetail(item)">
					<view class="text-df homeWorkPageItem-Title text-cut-2">{{item.title}}</view>
					<view class="homeWorkPageItem-Content text-cut-2">{{item.synopsis}}</view>
					<view class="homeWorkPageItem-Time">{{item.create_time}}</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showLoading:false,
				pages:1,
				totalPages:1,
				listDataList:[]
			}
		},
		onLoad() {
			
			this.OperationgetNoticeList()
		},
		onReachBottom() {
			if(this.pages < this.totalPages) {
				this.pages = this.pages + 1;
				this.OperationgetNoticeList()
			}
		},
		methods:{
			gotoHomeWorkDetail(item) {
				this.$urouter.navigateTo('/pages/makeorder/platformdetail/index?id=' + item.id);
			},
			OperationgetNoticeList() {
				if(this.pages == 1) {
					this.showLoading = true;
				}
				this.$api.post(global.apiUrls.gameallarticlelist, {
				  page:this.pages,
				  pagesize:15,
				  category_id:5
				}).then(res => {
				  this.showLoading = false;
				  this.totalPages = res.data.data.last_page || 1;
				  if(this.pages == 1) {
					  this.listDataList = res.data.data.data;
				  } else {
					  this.listDataList = [...this.listDataList,...res.data.data.data]
				  }
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	
	.homeWorkPage {
		min-height: 100vh;
		background: #FAFAFC;
	}
	
	.homeWorkPagelist {
		padding: 24rpx;
		
		.homeWorkPageItem {
			background: #fff;
			margin-bottom: 20rpx;
			padding: 24rpx;
			border-radius: 8rpx;
			
			.homeWorkPageItem-Title {
				font-weight: 500;
				color: #36373D;
			}
			
			.homeWorkPageItem-Content {
				margin-top: 20rpx;
				font-size: 24rpx;
				color: #868686;
				 display: -webkit-box;/*弹性伸缩盒子模型显示*/
				    -webkit-box-orient: vertical;   /*排列方式*/ 
				    -webkit-line-clamp: 3;/*显示文本行数*/
				    overflow: hidden;/*溢出隐藏*/
		
			}
		}
	}
	
	.homeWorkPageItem-Time {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		// line-height: 36px;
		margin-top: 20rpx;
		color: #5C707E;
	}
</style>