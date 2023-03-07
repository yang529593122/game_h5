<template>
	<view class="content">
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="time-item">
					<view class="times">提交日期：{{ item.create_time }}</view>
          <!-- 0=待审核；1=已同意；2=已拒绝 -->
					<view style="status" v-if="item.status === 0">待对方确认</view>
          <view style="status" v-if="item.status === 1">对方已同意</view>
          <view style="status" v-if="item.status === 2">对方已拒绝</view>
				</view>
				<view class="resele">
					<view class="resele-title">
						{{ item.title }}
					</view>
				</view>
				<view class="btns">
          <button class="apply refuse" v-if="item.status === 1"  @click="handleJump(item)">查看详情</button>
					<button class=" look" v-if="item.status === 1" @click="handleComment(item)">去评价</button>
					<button class="look" v-if="item.status === 0 || item.status === 2" @click="handleJump(item)">查看详情</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list:[],
			}
		},
    onLoad() {
      this.init();
    },
		methods:{
      async init(){
         const data = await this.$api.post(global.apiUrls.friends_my_apply,{
           type:"-1",
         })
         const result = data.data
         if (result.code == 1) {
           console.log(result.data)
           this.list = result.data.data
         } else {
           this.$message.info(result.msg);
         }
      },
      handleJump(item){
        this.$urouter.navigateTo(`/pages/newPage/makeFriends/socialContactdetail?id=${item.id}&from=myjy`);
      },
      handleComment(item){
        this.$urouter.navigateTo(`/pages/newPage/makeFriends/socialContactdetail?id=${item.id}&from=myjy`);
      }


    }
	}
</script>

<style lang="scss">
	.content {



		.list {
			padding: 24rpx;
			.item {
				background: #fff;
				border-radius: 4px;
				padding: 24rpx;
				margin-bottom: 24rpx;
				.time-item {
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 24rpx;
					.times {
						font-size: 28rpx;
						color: #8C9199;
					}
					.status {
						font-size: 28rpx;
						color: #36373D;
					}
				}
				.resele {
					display: flex;
					justify-content: space-between;
					align-items: flex-start;
					padding-bottom: 24rpx;
					border-bottom: 1rpx solid #DDDDDD;
					image{
						width: 200rpx;
						height: 148rpx;
					}
					.resele-title {
						font-size: 28rpx;
						color: #36373D;
						font-weight: 500;
					}
				}
				.btns {
					padding-top: 24rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					.apply {
						width: 160rpx;
						line-height: 60rpx;
						background: #F8F8F8;
						font-size: 24rpx;
						margin-right: 24rpx;
					}
					.look {
						width: 160rpx;
						line-height: 60rpx;
						background: #295B7B;
						font-size: 24rpx;
						color: #fff;
					}
				}
			}
		}
	}
</style>
