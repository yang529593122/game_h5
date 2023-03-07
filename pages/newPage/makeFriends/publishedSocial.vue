<template>
	<view class="content">
		<view class="tab-list">
			<view class="tab-item"  v-for="(item,index) in navs" @click="navsChange(item,index)" :class="index === active ? 'active' :''">
				{{ item.title }}<span v-if="index === active"></span>
			</view>
			<!-- <view class="tab-item" @click="getTab(2)" :class="{active:active==2}">
				待审核<span v-if="active==2"></span>
			</view>
			<view class="tab-item" @click="getTab(3)" :class="{active:active==3}">
				已同意<span v-if="active==3"></span>
			</view>
			<view class="tab-item" @click="getTab(4)" :class="{active:active==4}">
				已拒绝<span v-if="active==4"></span>
			</view> -->
		</view>
		<view style="height: 110rpx;"></view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="time-item">
					<view class="times">提交日期：{{ item.create_time }}</view>
           <!-- 0待审核；1=已通过；2=已拒绝 -->
					<view style="status" v-if="item.status===0">待审核</view>
          <view style="status" v-if="item.status===1">已同意</view>
          <view style="status" v-if="item.status===2">已拒绝</view>
				</view>
				<view class="resele">
					<image v-if="item.cover" :src="item.cover" mode="aspectFill"></image>
          <image v-else src="/static/logo.png" mode="aspectFill"></image>
					<view class="resele-title">
						{{ item.title }}
					</view>
				</view>
				<view class="btns">
					<button class="apply" v-if="item.status === 1" @click="handleJump"	:data-url="`/pages/newPage/makeFriends/applicationList?id=${item.id}`">申请列表</button>
					<button class="apply refuse" v-if="item.status === 2">拒绝原因</button>
					<button class="look" @click="handleJump" :data-url="`/pages/newPage/makeFriends/postingDetails?id=${item.id}`">查看详情</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				active:0,
        navs:[
          {
            id:0,
            title:'全部',
            status:'-1',
          },
          {
            id:1,
            title:'待审核',
            status:'0',
          },
          {
            id:2,
            title:'已同意',
            status:'1',
          },
          {
            id:3,
            title:'已拒绝',
            status:'2',
          },
        ],
        list:[],
        status:"-1"
			}
		},
    onLoad(){
      this.init()
    },
		methods:{
      // 我发布的社交 list
      init(){
        this.$api.post(global.apiUrls.friends_my_publish, {
        	status: this.status
        }).then(res => {
        	if (res.data.code == 1) {
        		const result = res.data.data
            this.list = result.data
            console.log(result)
        	}
        })
      },
			navsChange(item,index){
				// 切换tab
				this.active = index;
        this.status = item.status
        this.init()
			}
		}
	}
</script>

<style lang="scss">
	.content {

		.tab-list {
			display: flex;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			position: fixed;
			/* #ifdef APP-PLUS */
			top: 0;
			/* #endif */
			/* #ifdef H5 */
			top: 88rpx;
			/* #endif */
			left: 0;
			width: 100%;
			z-index: 1024;
			.tab-item {
				font-size: 28rpx;
				color: #868686;
				font-weight: 500;
				line-height: 88rpx;
				position: relative;
				span {
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
					display: inline-block;
					width: 40rpx;
					height: 6rpx;
					border-radius: 3rpx;
					background: #36373D;
				}
			}
			.active {
				font-size: 32rpx;
				color: #36373D;
				font-weight: 700;
			}
		}

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
						width: 430rpx;
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
