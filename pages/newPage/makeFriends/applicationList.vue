<template>
	<view class="content">
		<view class="tab-list">
      <view class="tab-item"  v-for="(item,index) in navs" @click="navsChange(item,index)" :key="index" :class="index === active ? 'active' :''">
      	{{ item.title }}<span v-if="index === active"></span>
      </view>
		</view>
		<view style="height: 110rpx;"></view>
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id">
				<view class="time-item">
					<view class="user">
						<image :src="item.head_img" mode="aspectFill"></image>
						<view class="user-info">
							<view class="user-name">{{ item.user_nickname }}</view>
							<view class="user-time">{{ item.create_time }}</view>
						</view>
					</view>
          <!-- 0=待审核；1=已同意；2=已拒绝 -->
					<view style="status" v-if="item.status === 0">待审核</view>
          <view style="status" v-if="item.status === 1">已同意</view>
          <view style="status" v-if="item.status === 2">已拒绝</view>
				</view>
				<view class="resele" >
					<view class="resele-title">
						{{ item.content }}
					</view>
					<view class="resele-img" v-if="item.status===0">
						<image :src="item" v-for="item in item.imgsArr" mode="aspectFill"></image>
					</view>

					<view class="contact-us" v-if="item.status===1">
						<view class="contact-title">
							<text class="vertical-bar"></text>
							<text>联系方式</text>
						</view>
						<view class="contact-item">QQ号码  {{ item.qq }}</view>
						<view class="contact-item">手机号码  {{ item.phone }}</view>
						<view class="contact-item">微信号码  {{ item.wechat }}</view>
					</view>
				</view>

				<view class="btns" v-if="item.status === 0">
					<button class="apply" @click="refuse(item)">拒绝</button>
					<button class="look" @click="agree(item)">同意</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				id:'',
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
    onLoad(options) {
    	this.id = options.id;
      this.init()
    },
		methods:{
      async init(){
         const data = await  this.$api.post(global.apiUrls.friends_my_publish_apply,{
           id:this.id,
           type:this.status
         })
         const result = data.data
         if (result.code == 1) {
           result.data.data.forEach(item =>  {
             let arr = item.images.split(",")
             item.imgsArr = arr
           })
           console.log(result.data)
           this.list = result.data.data
         } else {
           this.$message.info(result.msg);
         }
      },
      // 同意
      async agree(item){
        const data = await  this.$api.post(global.apiUrls.friends_agree_apply,{
          id:item.id,
        })
        const result = data.data
        if (result.code == 1) {
          this.init()
          this.$message.info(result.msg);

        }else{
          this.$message.info(result.msg);
        }
      },
      // 拒绝
      async refuse(item){
        const data = await  this.$api.post(global.apiUrls.friends_refuse_apply,{
          id:item.id,
        })
        const result = data.data
        if (result.code == 1) {
          this.init()
          this.$message.info(result.msg);
        } else {
          this.$message.info(result.msg);
        }
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
					.user {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						image {
							width: 80rpx;
							height: 80rpx;
							margin-right: 24rpx;
						}
						.user-info{
							view {
								line-height: 40rpx;
							}
							.user-name {
								font-size: 28rpx;
							}
							.user-time{
								font-size: 24rpx;
								color: #999;
							}
						}
					}
					.status {
						font-size: 28rpx;
						color: #36373D;
					}
				}
				.resele {
					// display: flex;
					// justify-content: space-between;
					// align-items: flex-start;
					padding-bottom: 24rpx;
					image{
						width: 200rpx;
						height: 148rpx;
					}
					.resele-title {
						font-size: 28rpx;
						color: #36373D;
						font-weight: 500;
					}

					.resele-img {
						margin-top: 24rpx;
						image {
							width: 200rpx;
							height: 200rpx;
							margin-right: 13rpx;
						}
					}
					.contact-us {
						margin-top: 24rpx;
						.contact-title {
							.vertical-bar {
								display: inline-block;
								margin-right: 10rpx;
								width: 6rpx;
								height: 20rpx;
								background: #659BC7;
								border-radius: 3rpx;
							}
							text {
								vertical-align: middle;
								font-size: 28rpx;
								color: #36373D;
								font-weight: 600rpx;
								line-height: 40rpx;
							}
						}
						.contact-item {
							margin-top: 24rpx;
							font-size: 28rpx;
							color: #19212D;
						}
					}
				}
				.btns {
					padding-top: 24rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
          border-top: 0.5px solid #DDDDDD;
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
